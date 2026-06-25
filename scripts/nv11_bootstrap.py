#!/usr/bin/env python3
"""Bootstrap NV11 — copia assets NV9/NV10 para estrutura NV11 enquanto pipeline gera o restante."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NV9 = ROOT / "public" / "assets" / "nv9"
NV10 = ROOT / "public" / "assets" / "nv10"
NV11 = ROOT / "public" / "assets" / "nv11"

IMG_MAP = {
    "nv10-bg-hero-aurora.webp": "nv11-img-001-hero-aurora.webp",
    "nv10-bg-neural-field.webp": "nv11-img-007-neural-field.webp",
    "nv10-bg-convergence.webp": "nv11-img-019-cta-convergence.webp",
    "nv9-img-hero-first.webp": "nv11-img-001-hero-aurora.webp",
    "nv9-img-owl-hero.webp": "nv11-img-002-owl-poster.webp",
    "nv9-img-vision-first.webp": "nv11-img-002-owl-poster.webp",
    "nv9-img-hero-energy.webp": "nv11-img-003-problem-chaos.webp",
    "nv9-img-mock-crm.webp": "nv11-img-005-demo-machine.webp",
    "nv9-img-mock-dashboard.webp": "nv11-img-011-analytics-holo.webp",
}

VID_MAP = {
    "nv9-vid-hero-bg.mp4": "nv11-vid-loop-001-hero-energy.mp4",
    "nv9-vid-owl-loop.mp4": "nv11-vid-loop-002-owl-breath.mp4",
    "nv9-vid-vision.mp4": "nv11-vid-f2f-001-owl-eyes.mp4",
    "nv9-vid-demo-ambient.mp4": "nv11-vid-loop-005-demo-corridor.mp4",
}

F2F_MAP = {
    "NV9-F2F-001": ("NV11-F2F-001", 90),
}


def copy_if_missing(src: Path, dest: Path) -> bool:
    if not src.exists():
        return False
    if dest.exists():
        return False
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    print(f"  copy {src.name} -> {dest.name}")
    return True


def main() -> int:
    img_out = NV11 / "images"
    vid_out = NV11 / "videos"
    f2f_out = NV11 / "f2f"
    img_out.mkdir(parents=True, exist_ok=True)
    vid_out.mkdir(parents=True, exist_ok=True)

    for src_name, dest_name in IMG_MAP.items():
        for base in (NV10 / "images", NV9 / "images"):
            copy_if_missing(base / src_name, img_out / dest_name)

    for src_name, dest_name in VID_MAP.items():
        copy_if_missing(NV9 / "videos" / src_name, vid_out / dest_name)

    for src_seq, (dest_seq, max_frames) in F2F_MAP.items():
        src_dir = NV9 / "f2f" / src_seq
        dest_dir = f2f_out / dest_seq
        if not src_dir.exists():
            continue
        dest_dir.mkdir(parents=True, exist_ok=True)
        frames = sorted(src_dir.glob("frame_*.webp"))[:max_frames]
        if not frames:
            continue
        if (dest_dir / "manifest.json").exists():
            print(f"  skip F2F {dest_seq}")
            continue
        for i, f in enumerate(frames, 1):
            shutil.copy2(f, dest_dir / f"frame_{i:04d}.webp")
        (dest_dir / "manifest.json").write_text(
            json.dumps({"id": dest_seq, "count": len(frames), "fps": 25}, indent=2)
        )
        print(f"  F2F {src_seq} -> {dest_seq} ({len(frames)} frames)")

    print("\nBootstrap NV11 OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
