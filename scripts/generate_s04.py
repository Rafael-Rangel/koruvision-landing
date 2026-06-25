#!/usr/bin/env python3
"""Gera assets de ambiente S04 (v3) — sem frames start/end, sem video."""
import base64
import json
import os
import sys
import time
from pathlib import Path
from urllib.request import Request, urlopen

import requests
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "images"
LOGO = ROOT / "assets" / "refs" / "koruvision-logo-master.png"
API = "https://api.replicate.com/v1"

BIBLE = (
    "KORUVISION brand aesthetic, premium dark mode SaaS, true black background #000000, "
    "vibrant purple glow #9D4EDD and metallic gold accents #FFB700, polished chrome silver "
    "rim lighting #E0E0E0, cinematic volumetric lighting, 8K commercial quality. "
    "No logos no brand names no watermarks. No people no hands. No readable text. "
    "No devices no screens no UI elements."
)

ASSETS = [
    (
        "S04-VOID",
        "s04-stage-void.webp",
        BIBLE
        + "Deep black void environment plate, soft radial purple nebula center, "
        "gold dust motes, abstract depth haze layers, bokeh particles, "
        "cinematic stage backdrop for floating product demo, 16:9 ultrawide.",
    ),
]


def api(token: str, method: str, path: str, data=None):
    url = f"{API}{path}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Prefer": "wait",
    }
    body = json.dumps(data).encode() if data else None
    req = Request(url, data=body, headers=headers, method=method)
    with urlopen(req, timeout=600) as resp:
        return json.loads(resp.read().decode())


def wait_pred(token: str, pid: str):
    while True:
        r = api(token, "GET", f"/predictions/{pid}")
        if r.get("status") in ("succeeded", "failed", "canceled"):
            return r
        time.sleep(3)


def flux(token: str, prompt: str, logo_uri: str) -> str:
    payload = {
        "input": {
            "prompt": prompt,
            "aspect_ratio": "16:9",
            "output_format": "webp",
            "output_quality": 92,
            "resolution": "1 MP",
            "input_images": [logo_uri],
        }
    }
    r = api(token, "POST", "/models/black-forest-labs/flux-2-pro/predictions", payload)
    if r.get("status") != "succeeded":
        r = wait_pred(token, r["id"])
    if r.get("status") == "failed":
        raise RuntimeError(r.get("error"))
    out = r["output"]
    return out[0] if isinstance(out, list) else out


def main():
    load_dotenv(ROOT / ".env")
    token = os.environ.get("API_KEY") or os.environ.get("REPLICATE_API_TOKEN")
    if not token:
        print("Defina API_KEY no .env")
        return 1

    force = "--force" in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    logo_uri = f"data:image/png;base64,{base64.b64encode(LOGO.read_bytes()).decode()}"

    for aid, fname, prompt in ASSETS:
        dest = OUT / fname
        if dest.exists() and not force:
            print(f"pular {aid} (existe, use --force)")
            continue
        print(f"gerando {aid}...")
        url = flux(token, prompt, logo_uri)
        dest.write_bytes(requests.get(url, timeout=120).content)
        print(f"ok -> {dest}")

    print("\nS04 v3: UI no demo/s04.html — nao gere video para esta secao.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
