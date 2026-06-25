#!/usr/bin/env python3
"""Aguarda videos e roda F2F extract automaticamente."""
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VID = ROOT / "public" / "assets" / "nv5" / "videos"
EXPECTED = 15


def count_videos():
    return len(list(VID.glob("nv5-vid-*.mp4")))


def main():
    print("Aguardando videos Kling...", flush=True)
    while count_videos() < EXPECTED:
        n = count_videos()
        print(f"  {n}/{EXPECTED} videos...", flush=True)
        time.sleep(60)
    print("Todos videos prontos. Extraindo F2F...", flush=True)
    subprocess.run([sys.executable, str(ROOT / "scripts" / "nv5_pipeline.py"), "--f2f"], check=False)
    subprocess.run([sys.executable, str(ROOT / "scripts" / "nv5_pipeline.py"), "--status"], check=False)


if __name__ == "__main__":
    main()
