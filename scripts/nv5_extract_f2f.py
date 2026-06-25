#!/usr/bin/env python3
"""Extrai frames de MP4 Kling para sequencias F2F WebP (NV5)."""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "nv5" / "f2f"


def extract(mp4: Path, seq_id: str, fps: int = 24) -> int:
    dest = OUT / seq_id
    dest.mkdir(parents=True, exist_ok=True)
    pattern = str(dest / "frame_%04d.webp")
    cmd = [
        "ffmpeg", "-y", "-i", str(mp4),
        "-vf", f"fps={fps}",
        "-c:v", "libwebp", "-quality", "80",
        pattern,
    ]
    print(" ".join(cmd))
    subprocess.run(cmd, check=True)
    frames = sorted(dest.glob("frame_*.webp"))
    manifest = {"id": seq_id, "count": len(frames), "fps": fps}
    (dest / "manifest.json").write_text(
        __import__("json").dumps(manifest, indent=2), encoding="utf-8"
    )
    print(f"{seq_id}: {len(frames)} frames -> {dest}")
    return len(frames)


def main():
    if len(sys.argv) < 3:
        print("Uso: python scripts/nv5_extract_f2f.py NV5-F2F-004 path/to/video.mp4 [fps]")
        return 1
    seq_id, mp4 = sys.argv[1], Path(sys.argv[2])
    fps = int(sys.argv[3]) if len(sys.argv) > 3 else 24
    if not mp4.exists():
        print(f"Arquivo nao encontrado: {mp4}")
        return 1
    extract(mp4, seq_id, fps)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
