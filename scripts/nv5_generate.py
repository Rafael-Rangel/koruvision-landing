#!/usr/bin/env python3
"""NV5 asset generation — nova direcao Névoa Neural. Nao reutiliza assets antigos."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROMPTS = ROOT / "assets" / "prompts" / "v5"
OUT_IMG = ROOT / "assets" / "nv5" / "images"
OUT_VID = ROOT / "assets" / "nv5" / "videos"
OUT_F2F = ROOT / "assets" / "nv5" / "f2f"

# Placeholder registry — expand from flux-images.md / kling-videos.md
ASSETS = {
    "NV5-IMG-001": {"file": "hero-observatory-corridor-wide.webp", "type": "flux"},
    "NV5-VID-001": {"file": "hero-portal-loop.mp4", "type": "kling"},
}


def main():
    if len(sys.argv) < 2:
        print("Uso: python scripts/nv5_generate.py --list | NV5-IMG-001 | --all-images")
        print(f"Output: {OUT_IMG}")
        return 0
    arg = sys.argv[1]
    if arg == "--list":
        for k, v in ASSETS.items():
            print(f"{k} -> {v['file']} ({v['type']})")
        print("\nPrompts completos: assets/prompts/v5/")
        return 0
    print("Implementar integracao Replicate usando prompts em assets/prompts/v5/")
    print("Ver flux-images.md para prompts FLUX completos.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
