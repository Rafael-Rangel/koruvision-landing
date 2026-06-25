#!/usr/bin/env python3
"""Gera assets NV8 priority via Replicate (FLUX 1.1 Pro + Kling)."""
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
PROMPTS = ROOT / "assets" / "prompts" / "v8" / "manifest.md"
OUT_IMG = ROOT / "public" / "assets" / "nv8" / "images"
OUT_VID = ROOT / "public" / "assets" / "nv8" / "videos"
API = "https://api.replicate.com/v1"
FLUX = "black-forest-labs/flux-1.1-pro"
KLING = "kwaivgi/kling-v2.5-turbo-pro"
ASPECT = {"21:9": "21:9", "16:9": "16:9", "4:3": "4:3", "3:4": "3:4", "1:1": "1:1"}


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


def run_model(token: str, model: str, inp: dict, timeout: int = 900) -> str:
    r = api(token, "POST", f"/models/{model}/predictions", {"input": inp}, timeout=120)
    if r.get("status") != "succeeded" and r.get("id"):
        r = wait_pred(token, r["id"])
    if r.get("status") == "failed":
        raise RuntimeError(r.get("error", "failed"))
    out = r.get("output")
    return out[0] if isinstance(out, list) else str(out)


def parse_items(text: str, prefix: str) -> list[dict]:
    blocks = re.split(rf"### ({prefix}-\d+)", text)[1:]
    items = []
    for i in range(0, len(blocks), 2):
        item_id = blocks[i]
        body = blocks[i + 1]
        file_m = re.search(r"\*\*Arquivo\*\* \| `([^`]+)`", body)
        ratio_m = re.search(r"\*\*Aspect ratio\*\* \| `([^`]+)`", body)
        dur_m = re.search(r"\*\*Duração\*\* \| `(\d+)`", body)
        prompt_m = re.search(r"\*\*Prompt:\*\* (.+?)(?=\n---|\n### |\Z)", body, re.S)
        if not file_m or not prompt_m:
            continue
        item = {
            "id": item_id,
            "file": file_m.group(1),
            "prompt": prompt_m.group(1).strip(),
        }
        if ratio_m:
            item["aspect_ratio"] = ASPECT.get(ratio_m.group(1), "16:9")
        if dur_m:
            item["duration"] = int(dur_m.group(1))
        items.append(item)
    return items


def main() -> int:
    load_dotenv(ROOT / ".env")
    token = os.getenv("REPLICATE_API_TOKEN") or os.getenv("API_KEY") or ""
    if not token:
        print("REPLICATE_API_TOKEN ausente")
        return 1

    force = "--force" in sys.argv
    only_img = "--images-only" in sys.argv
    only_vid = "--videos-only" in sys.argv
    text = PROMPTS.read_text(encoding="utf-8")
    images = parse_items(text, "NV8-IMG")
    videos = parse_items(text, "NV8-VID")
    OUT_IMG.mkdir(parents=True, exist_ok=True)
    OUT_VID.mkdir(parents=True, exist_ok=True)

    if not only_vid:
        print(f"\n=== IMAGENS ({len(images)}) ===\n")
        for item in images:
            dest = OUT_IMG / item["file"]
            if dest.exists() and not force:
                print(f"  skip {item['file']}")
                continue
            print(f"  [{item['id']}] -> {item['file']}")
            url = run_model(token, FLUX, {
                "prompt": item["prompt"][:2800],
                "aspect_ratio": item.get("aspect_ratio", "16:9"),
                "output_format": "webp",
                "output_quality": 90,
            })
            r = requests.get(url, timeout=180)
            r.raise_for_status()
            dest.write_bytes(r.content)
            print(f"    OK {dest.stat().st_size // 1024} KB")
            time.sleep(0.5)

    if not only_img:
        print(f"\n=== VIDEOS ({len(videos)}) ===\n")
        for item in videos:
            dest = OUT_VID / item["file"]
            if dest.exists() and not force:
                print(f"  skip {item['file']}")
                continue
            print(f"  [{item['id']}] -> {item['file']}")
            url = run_model(token, KLING, {
                "prompt": item["prompt"][:2500],
                "duration": item.get("duration", 5),
                "aspect_ratio": "16:9",
                "negative_prompt": "text, watermark, logo, cartoon, blurry",
            }, timeout=900)
            dest.write_bytes(requests.get(url, timeout=300).content)
            print(f"    OK {dest.stat().st_size // 1024} KB")
            time.sleep(1)

    print("\nOK -> public/assets/nv8/  |  /test/v8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
