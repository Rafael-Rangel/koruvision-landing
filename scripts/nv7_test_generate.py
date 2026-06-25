#!/usr/bin/env python3
"""Gera assets v7 de teste (coruja + demo) via Replicate FLUX + Kling."""
from __future__ import annotations

import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.request import Request, urlopen

import requests
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
PROMPTS = ROOT / "assets" / "prompts" / "v7" / "test-assets.md"
OUT_IMG = ROOT / "public" / "assets" / "nv7" / "images"
OUT_VID = ROOT / "public" / "assets" / "nv7" / "videos"
API = "https://api.replicate.com/v1"
FLUX = "black-forest-labs/flux-1.1-pro"
KLING = "kwaivgi/kling-v2.5-turbo-pro"

ASPECT = {"21:9": "21:9", "16:9": "16:9", "4:3": "4:3", "3:4": "3:4", "8:8": "1:1", "1:1": "1:1"}


def api(token: str, method: str, path: str, data: dict | None = None, timeout: int = 120) -> dict:
    req = Request(
        f"{API}{path}",
        data=json.dumps(data).encode() if data else None,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method=method,
    )
    with urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode())


def wait_pred(token: str, pid: str, label: str = "") -> dict:
    while True:
        r = api(token, "GET", f"/predictions/{pid}", timeout=60)
        st = r.get("status")
        if st in ("succeeded", "failed", "canceled"):
            return r
        print(f"    ... {label} {st}", flush=True)
        time.sleep(4)


def run_model(token: str, model: str, inp: dict, timeout: int = 600) -> str | list:
    r = api(token, "POST", f"/models/{model}/predictions", {"input": inp}, timeout=120)
    if r.get("status") != "succeeded" and r.get("id"):
        r = wait_pred(token, r["id"], model.split("/")[-1])
    if r.get("status") == "failed":
        raise RuntimeError(r.get("error", "failed"))
    out = r.get("output")
    if isinstance(out, list):
        return out[0] if len(out) == 1 else out
    return out


def download(url: str, dest: Path) -> None:
    r = requests.get(url, timeout=300)
    r.raise_for_status()
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(r.content)


def parse_images(text: str) -> list[dict]:
    blocks = re.split(r"### (NV7-IMG-\d+)", text)[1:]
    items = []
    for i in range(0, len(blocks), 2):
        img_id = blocks[i]
        body = blocks[i + 1]
        file_m = re.search(r"\*\*Arquivo\*\* \| `([^`]+)`", body)
        ratio_m = re.search(r"\*\*Aspect ratio\*\* \| `([^`]+)`", body)
        prompt_m = re.search(r"\*\*Prompt:\*\* (.+?)(?=\n---|\n## |\Z)", body, re.S)
        if not file_m or not prompt_m:
            continue
        ar = ratio_m.group(1) if ratio_m else "16:9"
        items.append({
            "id": img_id,
            "file": file_m.group(1),
            "aspect_ratio": ASPECT.get(ar, "16:9"),
            "prompt": prompt_m.group(1).strip(),
        })
    return items


def parse_videos(text: str) -> list[dict]:
    blocks = re.split(r"### (NV7-VID-\d+)", text)[1:]
    items = []
    for i in range(0, len(blocks), 2):
        vid_id = blocks[i]
        body = blocks[i + 1]
        file_m = re.search(r"\*\*Arquivo\*\* \| `([^`]+)`", body)
        dur_m = re.search(r"\*\*Duração\*\* \| `(\d+)`", body)
        prompt_m = re.search(r"\*\*Prompt:\*\* (.+?)(?=\n---|\n## |\Z)", body, re.S)
        if not file_m or not prompt_m:
            continue
        items.append({
            "id": vid_id,
            "file": file_m.group(1),
            "duration": int(dur_m.group(1)) if dur_m else 5,
            "prompt": prompt_m.group(1).strip(),
        })
    return items


def gen_image(token: str, item: dict, force: bool) -> None:
    dest = OUT_IMG / item["file"]
    if dest.exists() and not force:
        print(f"  [{item['id']}] skip {item['file']}")
        return
    print(f"  [{item['id']}] FLUX 1.1 Pro -> {item['file']} ...", flush=True)
    url = run_model(token, FLUX, {
        "prompt": item["prompt"][:2800],
        "aspect_ratio": item["aspect_ratio"],
        "output_format": "webp",
        "output_quality": 90,
    })
    download(str(url), dest)
    print(f"    OK {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")


def gen_video(token: str, item: dict, poster: Path | None, force: bool) -> None:
    dest = OUT_VID / item["file"]
    if dest.exists() and not force:
        print(f"  [{item['id']}] skip {item['file']}")
        return
    print(f"  [{item['id']}] Kling {item['duration']}s -> {item['file']} ...", flush=True)
    params: dict = {
        "prompt": item["prompt"][:2500],
        "duration": item["duration"],
        "aspect_ratio": "16:9",
        "negative_prompt": "text, watermark, logo, cartoon, blurry, white background, nebula, fog soup",
    }
    if poster and poster.exists():
        files = {"content": (poster.name, poster.read_bytes(), "image/webp")}
        up = requests.post(
            f"{API}/files",
            headers={"Authorization": f"Bearer {token}"},
            files=files,
            timeout=120,
        )
        up.raise_for_status()
        start_url = up.json().get("urls", {}).get("get")
        if start_url:
            params["start_image"] = start_url
    url = run_model(token, KLING, params, timeout=900)
    download(str(url), dest)
    print(f"    OK {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")


def main() -> int:
    load_dotenv(ROOT / ".env")
    token = os.getenv("REPLICATE_API_TOKEN") or os.getenv("API_KEY") or ""
    if not token:
        print("REPLICATE_API_TOKEN ausente no .env")
        return 1

    force = "--force" in sys.argv
    only_vid = "--videos-only" in sys.argv
    only_img = "--images-only" in sys.argv

    text = PROMPTS.read_text(encoding="utf-8")
    images = parse_images(text)
    videos = parse_videos(text)

    OUT_IMG.mkdir(parents=True, exist_ok=True)
    OUT_VID.mkdir(parents=True, exist_ok=True)

    if not only_vid:
        print(f"\n=== IMAGENS NV7 ({len(images)}) ===\n")
        for item in images:
            try:
                gen_image(token, item, force)
                time.sleep(0.5)
            except Exception as e:
                print(f"  [{item['id']}] ERRO: {e}")

    if not only_img:
        owl_poster = OUT_IMG / "nv7-img-owl-poster.webp"
        print(f"\n=== VÍDEOS KLING ({len(videos)}) ===\n")
        for item in videos:
            try:
                poster = owl_poster if "owl" in item["file"] else None
                gen_video(token, item, poster, force)
                time.sleep(1)
            except Exception as e:
                print(f"  [{item['id']}] ERRO: {e}")

    print("\nOK Assets em public/assets/nv7/")
    print("  Abra http://localhost:3000/test/v7")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
