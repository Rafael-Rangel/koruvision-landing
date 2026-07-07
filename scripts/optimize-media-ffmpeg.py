#!/usr/bin/env python3
"""
Otimiza midia nv11 ativa com ffmpeg:
- MP4 -> WebM (VP9, qualidade visual preservada)
- WebP frames/imagens recompressao lossy leve
- PNG mockups -> WebP
"""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NV11 = ROOT / "public" / "assets" / "nv11"
MOCKUPS = ROOT / "public" / "assets" / "mockups"
BRAND = ROOT / "public" / "assets" / "brand"

FFMPEG = shutil.which("ffmpeg") or "ffmpeg"


def run(cmd: list[str], timeout: int = 3600) -> None:
    print(">", " ".join(cmd))
    subprocess.run(cmd, check=True, timeout=timeout)


def mb(path: Path) -> float:
    return path.stat().st_size / (1024 * 1024)


def convert_video(mp4: Path) -> None:
    webm = mp4.with_suffix(".webm")
    if webm.exists() and webm.stat().st_mtime >= mp4.stat().st_mtime:
        print(f"skip video (webm ok): {mp4.name}")
        return

    tmp = webm.with_name(f"{webm.stem}.tmp.webm")
    if tmp.exists():
        try:
            tmp.unlink()
        except OSError:
            pass

    run(
        [
            FFMPEG,
            "-y",
            "-i",
            str(mp4),
            "-an",
            "-vf",
            "scale='min(1920,iw)':-2:flags=lanczos",
            "-c:v",
            "libvpx-vp9",
            "-crf",
            "33",
            "-b:v",
            "0",
            "-row-mt",
            "1",
            "-threads",
            "0",
            "-deadline",
            "realtime",
            "-cpu-used",
            "4",
            str(tmp),
        ],
        timeout=7200,
    )

    if not tmp.exists():
        raise RuntimeError(f"ffmpeg nao gerou {tmp}")

    if mb(tmp) > mb(mp4) * 0.95:
        print(f"aviso: webm nao menor o suficiente para {mp4.name} — mantendo mp4")
        tmp.unlink()
        return

    tmp.replace(webm)
    print(f"video {mp4.name}: {mb(mp4):.2f}MB -> {mb(webm):.2f}MB")


def recompress_webp(path: Path, quality: int = 82) -> None:
    tmp = path.with_name(f"{path.stem}.opt.webp")
    run(
        [
            FFMPEG,
            "-y",
            "-i",
            str(path),
            "-c:v",
            "libwebp",
            "-quality",
            str(quality),
            "-compression_level",
            "6",
            "-preset",
            "picture",
            str(tmp),
        ],
        timeout=120,
    )
    before = path.stat().st_size
    after = tmp.stat().st_size
    if after < before * 0.98:
        tmp.replace(path)
        print(f"webp {path.name}: {before // 1024}KB -> {after // 1024}KB")
    else:
        tmp.unlink()
        print(f"skip webp (sem ganho): {path.name}")


def png_to_webp(png: Path, quality: int = 85) -> None:
    webp = png.with_suffix(".webp")
    if webp.exists() and webp.stat().st_mtime >= png.stat().st_mtime:
        return
    run(
        [
            FFMPEG,
            "-y",
            "-i",
            str(png),
            "-c:v",
            "libwebp",
            "-quality",
            str(quality),
            str(webp),
        ],
        timeout=120,
    )
    print(f"mockup {png.name} -> {webp.name} ({mb(webp):.2f}MB)")


def main() -> int:
    os.chdir(ROOT)
    videos_dir = NV11 / "videos"
    if not videos_dir.is_dir():
        print("pasta de videos nv11 nao encontrada", file=sys.stderr)
        return 1

    mp4s = sorted(videos_dir.glob("*.mp4"))
    print(f"=== {len(mp4s)} videos nv11 ===")
    for mp4 in mp4s:
        convert_video(mp4)

    f2f_dir = NV11 / "f2f" / "NV11-F2F-001"
    if f2f_dir.is_dir():
        frames = sorted(f2f_dir.glob("frame_*.webp"))
        print(f"=== {len(frames)} frames F2F ===")
        for i, frame in enumerate(frames, 1):
            recompress_webp(frame, quality=80)
            if i % 15 == 0:
                print(f"  ... {i}/{len(frames)}")

    images_dir = NV11 / "images"
    if images_dir.is_dir():
        print("=== imagens nv11 ===")
        for img in sorted(images_dir.glob("*.webp")):
            recompress_webp(img, quality=84)

    if MOCKUPS.is_dir():
        print("=== mockups ===")
        for png in sorted(MOCKUPS.glob("*.png")):
            png_to_webp(png)

    if BRAND.is_dir():
        for png in sorted(BRAND.glob("*.png")):
            png_to_webp(png, quality=88)

    print("=== concluido ===")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
