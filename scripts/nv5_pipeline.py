#!/usr/bin/env python3
"""
NV5 Pipeline — FLUX imagens · Kling vídeos · F2F WebP extract
Output: public/assets/nv5/
Usa Replicate REST API (sem SDK — compatível Python 3.14)
"""
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
PROMPTS = ROOT / "assets" / "prompts" / "v5"
OUT = ROOT / "public" / "assets" / "nv5"
OUT_IMG = OUT / "images"
OUT_VID = OUT / "videos"
OUT_KEY = OUT / "keyframes"
OUT_F2F = OUT / "f2f"

API_BASE = "https://api.replicate.com/v1"
FLUX_MODEL = "black-forest-labs/flux-schnell"
KLING_MODEL = "kwaivgi/kling-v2.5-turbo-pro"

GLOBAL_PREFIX = (
    "Névoa Neural aesthetic, KORUVISION premium dark universe, absolute void #010208, "
    "volumetric purple mist #B24BFF and liquid gold rim #FFC233, neural cyan accents #2EE8C0, "
    "holographic glass panels, oblique cinematic camera 28 degrees, subsurface scattering, "
    "anamorphic bokeh, 8K commercial quality. No logos no brand names no watermarks. "
    "No people no hands. No readable text."
)

# F2F: seq_id -> (video_file, max_frames, fps)
F2F_MAP = {
    "NV5-F2F-001": ("nv5-vid-001.mp4", 150, 25),
    "NV5-F2F-002": ("nv5-vid-002.mp4", 100, 25),
    "NV5-F2F-003": ("nv5-vid-003.mp4", 180, 30),
    "NV5-F2F-004": ("nv5-vid-004.mp4", 250, 25),
    "NV5-F2F-005": ("nv5-vid-006.mp4", 120, 24),
    "NV5-F2F-006": ("nv5-vid-002.mp4", 80, 24),
    "NV5-F2F-007": ("nv5-vid-004.mp4", 60, 24),
    "NV5-F2F-008": ("nv5-vid-007.mp4", 60, 24),
    "NV5-F2F-009": ("nv5-vid-008.mp4", 120, 24),
    "NV5-F2F-010": ("nv5-vid-010.mp4", 40, 20),
    "NV5-F2F-011": ("nv5-vid-009.mp4", 100, 24),
    "NV5-F2F-012": ("nv5-vid-010.mp4", 120, 24),
    "NV5-F2F-013": ("nv5-vid-010.mp4", 60, 20),
    "NV5-F2F-014": ("nv5-vid-012.mp4", 70, 24),
    "NV5-F2F-015": ("nv5-vid-008.mp4", 80, 24),
    "NV5-F2F-016": ("nv5-vid-014.mp4", 120, 20),
}

ASPECT_MP = {
    "21:9": "21:9", "16:9": "16:9", "4:3": "4:3", "3:4": "3:4",
    "1:1": "1:1", "3:2": "3:2", "2:3": "2:3",
}


def api_request(token: str, method: str, path: str, data: dict | None = None, timeout: int = 600) -> dict:
    url = f"{API_BASE}{path}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Prefer": "wait",
    }
    body = json.dumps(data).encode() if data is not None else None
    req = Request(url, data=body, headers=headers, method=method)
    with urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode())


def wait_prediction(token: str, prediction_id: str) -> dict:
    while True:
        result = api_request(token, "GET", f"/predictions/{prediction_id}", timeout=60)
        status = result.get("status")
        if status in ("succeeded", "failed", "canceled"):
            return result
        print(f"    ... {status}", flush=True)
        time.sleep(3)


def run_model(token: str, model: str, params: dict, timeout: int = 600, retries: int = 3) -> object:
    last_err = None
    for attempt in range(retries):
        try:
            result = api_request(token, "POST", f"/models/{model}/predictions", {"input": params}, timeout=timeout)
            if result.get("status") not in ("succeeded",):
                if result.get("id"):
                    result = wait_prediction(token, result["id"])
                else:
                    raise RuntimeError(f"Resposta inesperada: {result}")
            if result.get("status") == "failed":
                raise RuntimeError(result.get("error", "Predicao falhou"))
            return result.get("output")
        except Exception as e:
            last_err = e
            wait = 5 * (attempt + 1)
            print(f"    retry {attempt + 1}/{retries} in {wait}s: {e}", flush=True)
            time.sleep(wait)
    raise last_err  # type: ignore


def download_url(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    r = requests.get(url, timeout=180)
    r.raise_for_status()
    dest.write_bytes(r.content)
    print(f"    OK {dest.relative_to(ROOT)} ({len(r.content) // 1024} KB)")


def upload_file_replicate(token: str, path: Path) -> str:
    """Upload local file to Replicate, return serving URL."""
    headers = {"Authorization": f"Bearer {token}"}
    last_err = None
    for attempt in range(3):
        try:
            with open(path, "rb") as f:
                r = requests.post(
                    f"{API_BASE}/files",
                    headers=headers,
                    files={"content": (path.name, f, "application/octet-stream")},
                    timeout=120,
                )
            r.raise_for_status()
            data = r.json()
            urls = data.get("urls", {})
            return urls.get("get") or data.get("url") or str(data)
        except Exception as e:
            last_err = e
            time.sleep(3 * (attempt + 1))
    raise last_err  # type: ignore


def parse_flux_images() -> list[dict]:
    text = (PROMPTS / "flux-images.md").read_text(encoding="utf-8")
    blocks = re.split(r"### (NV5-IMG-\d+)", text)[1:]
    items = []
    for i in range(0, len(blocks), 2):
        img_id = blocks[i]
        body = blocks[i + 1]
        file_m = re.search(r"\*\*Arquivo\*\* \| `([^`]+)`", body)
        ratio_m = re.search(r"\*\*Aspect ratio\*\* \| `([^`]+)`", body)
        prompt_m = re.search(r"\*\*Prompt FLUX\.2:\*\*\s*\n\n(.+?)(?=\n---|\n## |\Z)", body, re.S)
        if not file_m or not prompt_m:
            continue
        items.append({
            "id": img_id,
            "file": file_m.group(1),
            "aspect_ratio": ASPECT_MP.get(ratio_m.group(1) if ratio_m else "16:9", "16:9"),
            "prompt": prompt_m.group(1).strip(),
        })
    return items


def parse_videos() -> list[dict]:
    text = (PROMPTS / "kling-videos.md").read_text(encoding="utf-8")
    blocks = re.split(r"## (NV5-VID-\d+)", text)[1:]
    items = []
    for i in range(0, len(blocks), 2):
        vid_id = blocks[i]
        body = blocks[i + 1]

        def field(name):
            m = re.search(rf"\*\*{re.escape(name)}\*\* \| (.+)", body)
            return m.group(1).strip().rstrip(" |") if m else ""

        prompt_m = re.search(r"```\s*\n(.+?)\n```", body, re.S)
        dur = field("Duração")
        duration = 10 if "10" in dur else 5
        if "8s" in dur or "8 s" in dur:
            duration = 10
        if "6s" in dur or "4s" in dur:
            duration = 5

        items.append({
            "id": vid_id,
            "file": f"{vid_id.lower()}.mp4",
            "key_start": field("Keyframe start").split()[0] if field("Keyframe start") else "",
            "key_end": field("Keyframe end").split()[0] if field("Keyframe end") else "",
            "duration": duration,
            "prompt": prompt_m.group(1).strip() if prompt_m else "",
        })
    return items


def parse_keyframes() -> list[dict]:
    text = (PROMPTS / "kling-keyframes.md").read_text(encoding="utf-8")
    blocks = re.split(r"## (NV5-KEY-\d+)", text)[1:]
    items = []
    for i in range(0, len(blocks), 2):
        kid = blocks[i]
        body = blocks[i + 1]
        file_m = re.search(r"\*\*Arquivo\*\* \| `([^`]+)`", body)
        prompt_m = re.search(r"\*\*Prompt:\*\* (.+?)(?=\n---|\n## |\Z)", body, re.S)
        if not prompt_m:
            continue
        items.append({
            "id": kid,
            "file": file_m.group(1) if file_m else f"{kid.lower()}.webp",
            "prompt": f"{GLOBAL_PREFIX} {prompt_m.group(1).strip()}",
            "aspect_ratio": "16:9",
        })
    return items


KEY_ALIASES = {
    "NV5-KEY-020": "NV5-KEY-019",
    "NV5-KEY-022": "NV5-KEY-021",
    "NV5-KEY-026": "NV5-KEY-025",
    "NV5-KEY-030": "NV5-KEY-029",
}

KEY_ALIAS_FILES = {
    "NV5-KEY-020": "key-020-social-growth-loop.webp",
    "NV5-KEY-022": "key-022-orbit-halo-loop.webp",
    "NV5-KEY-026": "key-026-cta-converge-loop.webp",
    "NV5-KEY-030": "key-030-hero-ambient-loop.webp",
}


def copy_keyframe_aliases():
    import shutil
    keyframes_by_id = {x["id"]: x for x in parse_keyframes()}
    for alias_id, source_id in KEY_ALIASES.items():
        src_kf = keyframes_by_id.get(source_id)
        src_file = OUT_KEY / src_kf["file"] if src_kf else OUT_KEY / KEY_ALIAS_FILES.get(source_id, "")
        if not src_file.exists():
            for f in OUT_KEY.glob(f"*{source_id.split('-')[-1]}*"):
                src_file = f
                break
        dest = OUT_KEY / KEY_ALIAS_FILES[alias_id]
        if src_file.exists() and not dest.exists():
            shutil.copy2(src_file, dest)
            print(f"  [{alias_id}] alias copy from {source_id}")


def generate_flux_image(token: str, item: dict, force: bool = False) -> str | None:
    dest = OUT_IMG / item["file"]
    if dest.exists() and not force:
        print(f"  [{item['id']}] skip {item['file']}")
        return None

    print(f"  [{item['id']}] FLUX -> {item['file']} ...", flush=True)
    output = run_model(token, FLUX_MODEL, {
        "prompt": item["prompt"],
        "aspect_ratio": item.get("aspect_ratio", "16:9"),
        "megapixels": "1",
        "output_format": "webp",
        "output_quality": 90,
        "num_inference_steps": 4,
        "num_outputs": 1,
        "go_fast": True,
    })
    url = output[0] if isinstance(output, list) else output
    download_url(url, dest)
    return url


def generate_keyframe(token: str, item: dict, force: bool = False) -> str | None:
    dest = OUT_KEY / item["file"]
    if dest.exists() and not force:
        print(f"  [{item['id']}] skip key {item['file']}")
        with open(dest, "rb") as f:
            pass
        return upload_file_replicate(token, dest) if dest.stat().st_size else None

    print(f"  [{item['id']}] KEY -> {item['file']} ...", flush=True)
    output = run_model(token, FLUX_MODEL, {
        "prompt": item["prompt"],
        "aspect_ratio": item.get("aspect_ratio", "16:9"),
        "megapixels": "1",
        "output_format": "webp",
        "output_quality": 92,
        "num_inference_steps": 4,
        "num_outputs": 1,
        "go_fast": False,
    })
    url = output[0] if isinstance(output, list) else output
    download_url(url, dest)
    return url


def resolve_key_url(token: str, key_id: str, keyframes: dict, key_urls: dict) -> str | None:
    if key_id in key_urls:
        return key_urls[key_id]
    dest = OUT_KEY / KEY_ALIAS_FILES.get(key_id, "")
    if dest.exists():
        url = upload_file_replicate(token, dest)
        key_urls[key_id] = url
        return url
    kf = keyframes.get(key_id)
    if not kf and key_id in KEY_ALIASES:
        alias_src = KEY_ALIASES[key_id]
        return resolve_key_url(token, alias_src, keyframes, key_urls)
    if not kf:
        return None
    dest = OUT_KEY / kf["file"]
    if dest.exists():
        url = upload_file_replicate(token, dest)
        key_urls[key_id] = url
        return url
    url = generate_keyframe(token, kf)
    if url:
        key_urls[key_id] = url
    elif dest.exists():
        url = upload_file_replicate(token, dest)
        key_urls[key_id] = url
    return url


def generate_video(token: str, item: dict, keyframes: dict, key_urls: dict, force: bool = False) -> None:
    dest = OUT_VID / item["file"]
    if dest.exists() and not force:
        print(f"  [{item['id']}] skip {item['file']}")
        return

    print(f"  [{item['id']}] Kling -> {item['file']} ({item['duration']}s) ...", flush=True)
    params: dict = {
        "prompt": item["prompt"][:2500],
        "duration": item["duration"],
        "aspect_ratio": "16:9",
        "negative_prompt": "text, watermark, logo, hands, people, white background, blurry, cartoon",
    }

    start_url = resolve_key_url(token, item["key_start"], keyframes, key_urls) if item["key_start"] else None
    end_url = resolve_key_url(token, item["key_end"], keyframes, key_urls) if item["key_end"] else None

    if start_url:
        params["start_image"] = start_url
    if end_url and end_url != start_url:
        params["end_image"] = end_url

    output = run_model(token, KLING_MODEL, params, timeout=900)
    url = output if isinstance(output, str) else (output[0] if isinstance(output, list) else str(output))
    download_url(url, dest)


def extract_f2f(seq_id: str, force: bool = False) -> int:
    if seq_id not in F2F_MAP:
        print(f"  [{seq_id}] sem mapeamento F2F")
        return 0

    video_name, max_frames, fps = F2F_MAP[seq_id]
    mp4 = OUT_VID / video_name
    dest = OUT_F2F / seq_id
    manifest = dest / "manifest.json"

    if manifest.exists() and not force:
        data = json.loads(manifest.read_text(encoding="utf-8"))
        print(f"  [{seq_id}] skip {data.get('count', 0)} frames")
        return data.get("count", 0)

    if not mp4.exists():
        print(f"  [{seq_id}] vídeo ausente: {video_name}")
        return 0

    dest.mkdir(parents=True, exist_ok=True)
    pattern = str(dest / "frame_%04d.webp")
    cmd = [
        "ffmpeg", "-y", "-i", str(mp4),
        "-vf", f"fps={fps},scale=1920:-1",
        "-frames:v", str(max_frames),
        "-c:v", "libwebp", "-quality", "82",
        pattern,
    ]
    print(f"  [{seq_id}] extract {max_frames}f @ {fps}fps ...")
    subprocess.run(cmd, check=True, capture_output=True)
    frames = sorted(dest.glob("frame_*.webp"))
    manifest.write_text(json.dumps({
        "id": seq_id, "count": len(frames), "fps": fps, "source": video_name,
    }, indent=2), encoding="utf-8")
    print(f"  [{seq_id}] OK {len(frames)} frames")
    return len(frames)


def phase_images(token: str, force: bool, only: list[str] | None) -> None:
    items = parse_flux_images()
    if only:
        items = [x for x in items if x["id"] in only or x["file"] in only]
    print(f"\n=== IMAGENS FLUX ({len(items)}) ===")
    ok, fail = 0, 0
    for item in items:
        try:
            generate_flux_image(token, item, force)
            ok += 1
            time.sleep(0.3)
        except Exception as e:
            print(f"  [{item['id']}] ERRO: {e}")
            fail += 1
    print(f"Imagens: {ok} ok, {fail} fail")


def phase_keyframes(token: str, force: bool) -> dict:
    items = parse_keyframes()
    kf_dict = {x["id"]: x for x in items}
    key_urls: dict[str, str] = {}
    print(f"\n=== KEYFRAMES ({len(items)}) ===")
    for item in items:
        try:
            url = generate_keyframe(token, item, force)
            if url:
                key_urls[item["id"]] = url
            elif (OUT_KEY / item["file"]).exists():
                key_urls[item["id"]] = upload_file_replicate(token, OUT_KEY / item["file"])
            time.sleep(0.3)
        except Exception as e:
            print(f"  [{item['id']}] ERRO: {e}")
    copy_keyframe_aliases()
    return kf_dict, key_urls


def phase_videos(token: str, force: bool, kf_dict: dict, key_urls: dict) -> None:
    items = parse_videos()
    print(f"\n=== VIDEOS KLING ({len(items)}) ===")
    ok, fail = 0, 0
    for item in items:
        try:
            generate_video(token, item, kf_dict, key_urls, force)
            ok += 1
            time.sleep(2)
        except Exception as e:
            print(f"  [{item['id']}] ERRO: {e}")
            fail += 1
    print(f"Videos: {ok} ok, {fail} fail")


def phase_f2f(force: bool) -> None:
    print(f"\n=== F2F EXTRACT ({len(F2F_MAP)}) ===")
    total = 0
    for seq_id in F2F_MAP:
        try:
            total += extract_f2f(seq_id, force)
        except Exception as e:
            print(f"  [{seq_id}] ERRO: {e}")
    print(f"Total frames: {total}")


def phase_priority(token: str, force: bool) -> None:
    """Hero + transições críticas primeiro."""
    priority_imgs = [
        "NV5-IMG-001", "NV5-IMG-002", "NV5-IMG-003", "NV5-IMG-005",
        "NV5-IMG-009", "NV5-IMG-012", "NV5-IMG-036", "NV5-IMG-048",
    ]
    phase_images(token, force, priority_imgs)
    kf_dict, key_urls = phase_keyframes(token, force)
    for vid in ["NV5-VID-001", "NV5-VID-015", "NV5-VID-002", "NV5-VID-014"]:
        vids = parse_videos()
        for item in vids:
            if item["id"] == vid:
                try:
                    generate_video(token, item, kf_dict, key_urls, force)
                except Exception as e:
                    print(f"  [{vid}] ERRO: {e}")
    for seq in ["NV5-F2F-001", "NV5-F2F-002", "NV5-F2F-016"]:
        extract_f2f(seq, force)


def main() -> int:
    load_dotenv(ROOT / ".env")
    token = os.environ.get("REPLICATE_API_TOKEN") or os.environ.get("API_KEY")
    if not token:
        print("Defina REPLICATE_API_TOKEN no .env")
        return 1

    for d in (OUT_IMG, OUT_VID, OUT_KEY, OUT_F2F):
        d.mkdir(parents=True, exist_ok=True)

    args = sys.argv[1:]
    force = "--force" in args
    args = [a for a in args if a != "--force"]

    if not args or args[0] == "--all":
        phase_images(token, force, None)
        kf_dict, key_urls = phase_keyframes(token, force)
        phase_videos(token, force, kf_dict, key_urls)
        phase_f2f(force)
        return 0

    phase = args[0]
    if phase == "--images":
        only = args[1:] if len(args) > 1 else None
        phase_images(token, force, only)
    elif phase == "--keyframes":
        phase_keyframes(token, force)
    elif phase == "--videos":
        kf_dict, key_urls = phase_keyframes(token, force)
        phase_videos(token, force, kf_dict, key_urls)
    elif phase == "--f2f":
        phase_f2f(force)
    elif phase == "--priority":
        phase_priority(token, force)
    elif phase == "--status":
        print(f"Imagens: {len(list(OUT_IMG.glob('*.webp')))}/48")
        print(f"Keyframes: {len(list(OUT_KEY.glob('*.webp')))}/30")
        print(f"Vídeos: {len(list(OUT_VID.glob('*.mp4')))}/15")
        f2f_count = sum(1 for d in OUT_F2F.iterdir() if d.is_dir() and (d / "manifest.json").exists())
        print(f"F2F seq: {f2f_count}/16")
    else:
        print("Uso: nv5_pipeline.py [--all|--images|--keyframes|--videos|--f2f|--priority|--status] [--force]")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
