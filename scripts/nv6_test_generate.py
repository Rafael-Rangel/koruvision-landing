#!/usr/bin/env python3
"""Gera 4 imagens v6 de teste (S01 + S04) via Replicate FLUX."""
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
PROMPTS = ROOT / "assets" / "prompts" / "v6" / "flux-images.md"
OUT = ROOT / "public" / "assets" / "nv6" / "images"
API = "https://api.replicate.com/v1"
MODEL = "black-forest-labs/flux-schnell"

# Apenas preview S01 + S04
TEST_IDS = {"NV6-IMG-001", "NV6-IMG-002", "NV6-IMG-012", "NV6-IMG-013"}

ASPECT = {"21:9": "21:9", "16:9": "16:9", "4:3": "4:3", "3:4": "3:4", "8:8": "1:1"}


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
        time.sleep(3)


def run_flux(token: str, prompt: str, aspect: str) -> str:
    r = api(token, "POST", f"/models/{MODEL}/predictions", {"input": {"prompt": prompt, "aspect_ratio": aspect}}, timeout=120)
    if r.get("status") != "succeeded" and r.get("id"):
        r = wait_pred(token, r["id"])
    if r.get("status") == "failed":
        raise RuntimeError(r.get("error", "failed"))
    out = r.get("output")
    if isinstance(out, list):
        return out[0]
    return str(out)


def parse_v6() -> list[dict]:
    text = PROMPTS.read_text(encoding="utf-8")
    blocks = re.split(r"### (NV6-IMG-\d+)", text)[1:]
    items = []
    for i in range(0, len(blocks), 2):
        img_id = blocks[i]
        if img_id not in TEST_IDS:
            continue
        body = blocks[i + 1]
        file_m = re.search(r"\*\*Arquivo\*\* \| `([^`]+)`", body)
        ratio_m = re.search(r"\*\*Aspect ratio\*\* \| `([^`]+)`", body)
        prompt_m = re.search(r"\*\*Prompt:\*\* (.+?)(?=\n---|\Z)", body, re.S)
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


def main() -> int:
    load_dotenv(ROOT / ".env")
    token = os.getenv("REPLICATE_API_TOKEN") or os.getenv("API_KEY") or ""
    if not token:
        print("REPLICATE_API_TOKEN ausente")
        return 1

    items = parse_v6()
    OUT.mkdir(parents=True, exist_ok=True)
    print(f"Gerando {len(items)} imagens v6 teste -> {OUT}\n")
    for item in items:
        dest = OUT / item["file"]
        if dest.exists():
            print(f"  [{item['id']}] skip {item['file']}")
            continue
        print(f"  [{item['id']}] FLUX -> {item['file']} ...", flush=True)
        url = run_flux(token, item["prompt"], item["aspect_ratio"])
        r = requests.get(url, timeout=180)
        r.raise_for_status()
        dest.write_bytes(r.content)
        print(f"    OK {dest.relative_to(ROOT)} ({len(r.content) // 1024} KB)")
        time.sleep(0.5)
    print("\nAbra http://localhost:3000/test")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
