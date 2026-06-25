#!/usr/bin/env python3
"""NV11 pipeline — FLUX + Kling + F2F · prompts em assets/prompts/v11/"""
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
IMG_PROMPTS = ROOT / "assets" / "prompts" / "v11" / "image-prompts.md"
VID_PROMPTS = ROOT / "assets" / "prompts" / "v11" / "video-prompts.md"
OUT_IMG = ROOT / "public" / "assets" / "nv11" / "images"
OUT_VID = ROOT / "public" / "assets" / "nv11" / "videos"
OUT_F2F = ROOT / "public" / "assets" / "nv11" / "f2f"
API = "https://api.replicate.com/v1"
FLUX = "black-forest-labs/flux-1.1-pro"
KLING = "kwaivgi/kling-v2.5-turbo-pro"

GLOBAL_SUFFIX = (
    "Névoa Neural aesthetic, KORUVISION premium dark universe, absolute void #010208, "
    "volumetric purple mist #8B5CF6 and liquid gold rim #FFC233, neural cyan accents #2EE8C0, "
    "holographic glass depth, oblique cinematic camera 28 degrees, 8K commercial quality. "
    "No logos, no text, no people, no hands."
)

F2F_MAP = {
    "NV11-F2F-000": ("nv11-vid-f2f-000-hero-core.mp4", 72, 24),
    "NV11-F2F-001": ("nv11-vid-f2f-001-owl-eyes.mp4", 90, 25),
    "NV11-F2F-002": ("nv11-vid-f2f-002-crm-awaken.mp4", 120, 24),
    "NV11-F2F-003": ("nv11-vid-f2f-003-data-evolution.mp4", 96, 24),
    "NV11-F2F-004": ("nv11-vid-f2f-004-cta-convergence.mp4", 80, 25),
}

PRIORITY_IMG = {f"NV11-IMG-{i:03d}" for i in range(1, 8)}
PRIORITY_VID = {"NV11-F2F-000", "NV11-F2F-001", "NV11-VID-LOOP-001", "NV11-VID-LOOP-002", "NV11-VID-LOOP-003"}


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


def run_model(token: str, model: str, inp: dict) -> str:
    r = api(token, "POST", f"/models/{model}/predictions", {"input": inp}, timeout=120)
    if r.get("status") != "succeeded" and r.get("id"):
        r = wait_pred(token, r["id"])
    if r.get("status") == "failed":
        raise RuntimeError(r.get("error", "failed"))
    out = r.get("output")
    return out[0] if isinstance(out, list) else str(out)


def parse_images(text: str) -> list[dict]:
    blocks = re.split(r"## (NV11-IMG-\d+[ab]?)", text)[1:]
    items = []
    for i in range(0, len(blocks), 2):
        item_id = blocks[i]
        body = blocks[i + 1]
        file_m = re.search(r"\*\*Arquivo:\*\* `([^`]+)`", body)
        prompt_m = re.search(r"```\n(.+?)\n```", body, re.S)
        if not file_m or not prompt_m:
            continue
        prompt = prompt_m.group(1).strip()
        if "GLOBAL_SUFFIX" in prompt:
            prompt = prompt.replace("GLOBAL_SUFFIX", GLOBAL_SUFFIX)
        items.append({"id": item_id, "file": file_m.group(1), "prompt": prompt})
    return items


def parse_videos(text: str) -> list[dict]:
    items = []
    for m in re.finditer(
        r"## (NV11-(?:F2F|VID-LOOP)-\d+)[^\n]*\n(?:[^\n]*\n)*?\*\*Arquivo[^`]*`([^`]+)`[^`]*`?([^\n]*)",
        text,
    ):
        item_id = m.group(1)
        filename = m.group(2).strip()
        section_start = m.start()
        section = text[section_start : section_start + 2500]
        prompt_m = re.search(r"### Prompt Kling.*?\n```\n(.+?)\n```", section, re.S)
        if not prompt_m:
            prompt_m = re.search(r"## [^\n]+\n\*\*Arquivo:\*\*[^\n]+\n```\n(.+?)\n```", section, re.S)
        if not prompt_m:
            continue
        prompt = prompt_m.group(1).strip()
        if "GLOBAL_VIDEO_SUFFIX" in prompt:
            prompt = prompt.replace("GLOBAL_VIDEO_SUFFIX", GLOBAL_SUFFIX)
        dur = 10 if "10s" in section else 5
        items.append({"id": item_id, "file": filename, "prompt": prompt, "duration": dur})
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
    if not token and "--f2f-only" not in sys.argv and "--bootstrap-only" not in sys.argv:
        print("REPLICATE_API_TOKEN ausente — rode nv11_bootstrap.py ou configure .env")
        return 1

    priority = "--priority" in sys.argv
    force = "--force" in sys.argv
    only_f2f = "--f2f-only" in sys.argv

    if "--bootstrap-only" in sys.argv:
        import nv11_bootstrap
        return nv11_bootstrap.main()

    OUT_IMG.mkdir(parents=True, exist_ok=True)
    OUT_VID.mkdir(parents=True, exist_ok=True)

    if not only_f2f and token:
        images = parse_images(IMG_PROMPTS.read_text(encoding="utf-8"))
        videos = parse_videos(VID_PROMPTS.read_text(encoding="utf-8"))
        if priority:
            images = [x for x in images if x["id"] in PRIORITY_IMG or x["id"].startswith("NV11-IMG-00")]
            videos = [x for x in videos if any(x["id"].endswith(n) for n in ("001", "002", "003", "000", "001"))]

        print(f"\n=== IMAGENS ({len(images)}) ===")
        for item in images:
            dest = OUT_IMG / item["file"]
            if dest.exists() and not force:
                print(f"  skip {dest.name}")
                continue
            print(f"  [{item['id']}] -> {dest.name}")
            try:
                url = run_model(token, FLUX, {
                    "prompt": item["prompt"][:2800],
                    "aspect_ratio": "16:9",
                    "output_format": "webp",
                    "output_quality": 85,
                })
                dest.write_bytes(requests.get(url, timeout=180).content)
                print(f"    OK {dest.stat().st_size // 1024} KB")
            except Exception as e:
                print(f"    ERRO {e}")
            time.sleep(0.5)

        print(f"\n=== VIDEOS ({len(videos)}) ===")
        for item in videos:
            dest = OUT_VID / item["file"]
            if dest.exists() and not force:
                print(f"  skip {item['file']}")
                continue
            print(f"  [{item['id']}] -> {item['file']}")
            dur = 10 if item.get("duration", 5) > 5 else 5
            try:
                url = run_model(token, KLING, {
                    "prompt": item["prompt"][:2500],
                    "duration": dur,
                    "aspect_ratio": "16:9",
                    "negative_prompt": "text, watermark, cartoon, blurry, people",
                })
                dest.write_bytes(requests.get(url, timeout=300).content)
                print(f"    OK {dest.stat().st_size // 1024} KB")
            except Exception as e:
                print(f"    ERRO {e}")
            time.sleep(1.2)

    print("\n=== F2F EXTRACT ===")
    for seq_id in F2F_MAP:
        extract_f2f(seq_id, force)

    print("\nOK public/assets/nv11/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
