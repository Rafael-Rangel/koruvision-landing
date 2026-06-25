#!/usr/bin/env python3
"""NV9 pipeline — FLUX + Kling + F2F extract · KORUVISION brand."""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path
from urllib.request import Request, urlopen

import requests
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
PROMPTS = ROOT / "assets" / "prompts" / "v9" / "manifest.md"
OUT_IMG = ROOT / "public" / "assets" / "nv9" / "images"
OUT_BRAND = ROOT / "public" / "assets" / "brand"
OUT_VID = ROOT / "public" / "assets" / "nv9" / "videos"
OUT_F2F = ROOT / "public" / "assets" / "nv9" / "f2f"
API = "https://api.replicate.com/v1"
FLUX = "black-forest-labs/flux-1.1-pro"
KLING = "kwaivgi/kling-v2.5-turbo-pro"
ASPECT = {"21:9": "21:9", "16:9": "16:9", "4:3": "4:3", "3:4": "3:4", "1:1": "1:1"}

F2F_MAP = {
    "NV9-F2F-001": ("nv9-vid-vision.mp4", 90, 24),
}

PRIORITY_IMG = {"NV9-IMG-BRAND", "NV9-IMG-001", "NV9-IMG-002", "NV9-IMG-003", "NV9-IMG-004", "NV9-IMG-005"}
PRIORITY_VID = {"NV9-VID-001", "NV9-VID-002", "NV9-VID-003"}


def api(token: str, method: str, path: str, data: dict | None = None, timeout: int = 120) -> dict:
    req = Request(
        f"{API}{path}",
        data=json.dumps(data).encode() if data else None,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method=method,
    )
    with urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode())


def wait_pred(token: str, pid: str) -> dict:
    while True:
        r = api(token, "GET", f"/predictions/{pid}", timeout=60)
        if r.get("status") in ("succeeded", "failed", "canceled"):
            return r
        print(f"    ... {r.get('status')}", flush=True)
        time.sleep(4)


def kling_duration(raw: int) -> int:
    """Kling v2.5 turbo pro aceita 5 ou 10 segundos."""
    return 10 if raw > 5 else 5


def run_model(token: str, model: str, inp: dict) -> str:
    r = api(token, "POST", f"/models/{model}/predictions", {"input": inp}, timeout=120)
    if r.get("status") != "succeeded" and r.get("id"):
        r = wait_pred(token, r["id"])
    if r.get("status") == "failed":
        raise RuntimeError(r.get("error", "failed"))
    out = r.get("output")
    return out[0] if isinstance(out, list) else str(out)


def parse_items(text: str, prefix: str) -> list[dict]:
    blocks = re.split(rf"### ({prefix}(?:-\w+)?)", text)[1:]
    items = []
    for i in range(0, len(blocks), 2):
        item_id = blocks[i]
        body = blocks[i + 1]
        file_m = re.search(r"\*\*Arquivo\*\* \| `([^`]+)`", body)
        folder_m = re.search(r"\*\*Pasta\*\* \| `([^`]+)`", body)
        ratio_m = re.search(r"\*\*Aspect ratio\*\* \| `([^`]+)`", body)
        dur_m = re.search(r"\*\*Duração\*\* \| `(\d+)`", body)
        prompt_m = re.search(r"\*\*Prompt:\*\* (.+?)(?=\n---|\n### |\n## |\Z)", body, re.S)
        if not file_m or not prompt_m:
            continue
        item = {"id": item_id, "file": file_m.group(1), "prompt": prompt_m.group(1).strip()}
        if folder_m:
            item["folder"] = folder_m.group(1)
        if ratio_m:
            item["aspect_ratio"] = ASPECT.get(ratio_m.group(1), "16:9")
        if dur_m:
            item["duration"] = int(dur_m.group(1))
        items.append(item)
    return items


def extract_f2f(seq_id: str, force: bool = False) -> int:
    if seq_id not in F2F_MAP:
        return 0
    video_name, max_frames, fps = F2F_MAP[seq_id]
    mp4 = OUT_VID / video_name
    dest = OUT_F2F / seq_id
    manifest = dest / "manifest.json"
    if manifest.exists() and not force:
        return json.loads(manifest.read_text()).get("count", 0)
    if not mp4.exists():
        print(f"  F2F skip {seq_id}: {video_name} ausente")
        return 0
    dest.mkdir(parents=True, exist_ok=True)
    pattern = str(dest / "frame_%04d.webp")
    subprocess.run(
        ["ffmpeg", "-y", "-i", str(mp4), "-vf", f"fps={fps},scale=1920:-1",
         "-frames:v", str(max_frames), "-c:v", "libwebp", "-quality", "82", pattern],
        check=True, capture_output=True,
    )
    frames = sorted(dest.glob("frame_*.webp"))
    manifest.write_text(json.dumps({"id": seq_id, "count": len(frames), "fps": fps}, indent=2))
    print(f"  F2F {seq_id}: {len(frames)} frames")
    return len(frames)


def main() -> int:
    load_dotenv(ROOT / ".env")
    token = os.getenv("REPLICATE_API_TOKEN") or os.getenv("API_KEY") or ""
    if not token:
        print("REPLICATE_API_TOKEN ausente")
        return 1

    priority = "--priority" in sys.argv
    force = "--force" in sys.argv
    only_f2f = "--f2f-only" in sys.argv
    text = PROMPTS.read_text(encoding="utf-8")
    images = parse_items(text, "NV9-IMG")
    videos = parse_items(text, "NV9-VID")
    OUT_IMG.mkdir(parents=True, exist_ok=True)
    OUT_BRAND.mkdir(parents=True, exist_ok=True)
    OUT_VID.mkdir(parents=True, exist_ok=True)

    if not only_f2f:
        if priority:
            images = [x for x in images if x["id"] in PRIORITY_IMG]
            videos = [x for x in videos if x["id"] in PRIORITY_VID]

        print(f"\n=== IMAGENS ({len(images)}) ===")
        for item in images:
            dest = (OUT_BRAND if item.get("folder") == "brand" else OUT_IMG) / item["file"]
            if dest.exists() and not force:
                print(f"  skip {dest.name}")
                continue
            print(f"  [{item['id']}] -> {dest.name}")
            url = run_model(token, FLUX, {
                "prompt": item["prompt"][:2800],
                "aspect_ratio": item.get("aspect_ratio", "16:9"),
                "output_format": "webp", "output_quality": 90,
            })
            r = requests.get(url, timeout=180)
            r.raise_for_status()
            dest.write_bytes(r.content)
            print(f"    OK {dest.stat().st_size // 1024} KB")
            time.sleep(0.4)

        print(f"\n=== VIDEOS ({len(videos)}) ===")
        for item in videos:
            dest = OUT_VID / item["file"]
            if dest.exists() and not force:
                print(f"  skip {item['file']}")
                continue
            print(f"  [{item['id']}] -> {item['file']}")
            dur = kling_duration(item.get("duration", 5))
            try:
                url = run_model(token, KLING, {
                    "prompt": item["prompt"][:2500],
                    "duration": dur,
                    "aspect_ratio": "16:9",
                    "negative_prompt": "text, watermark, cartoon, blurry",
                })
            except Exception as exc:
                print(f"    ERRO {exc} — tentando duration=5")
                url = run_model(token, KLING, {
                    "prompt": item["prompt"][:2500],
                    "duration": 5,
                    "aspect_ratio": "16:9",
                    "negative_prompt": "text, watermark, cartoon, blurry",
                })
            dest.write_bytes(requests.get(url, timeout=300).content)
            print(f"    OK {dest.stat().st_size // 1024} KB")
            time.sleep(1)

    print("\n=== F2F EXTRACT ===")
    for seq_id in F2F_MAP:
        extract_f2f(seq_id, force)

    print("\nOK public/assets/nv9/  |  /test/v9")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
