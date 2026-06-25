#!/usr/bin/env python3
"""Gera assets KORUVISION via FLUX.2 Pro/Dev + logo como style reference."""

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
OUTPUT_DIR = ROOT / "assets" / "images"
LOGO_PATH = ROOT / "assets" / "refs" / "koruvision-logo-master.png"
API_BASE = "https://api.replicate.com/v1"

BIBLE = (
    "KORUVISION brand aesthetic, premium dark mode SaaS, true black background #000000, "
    "vibrant purple glow #9D4EDD and metallic gold accents #FFB700, polished chrome silver "
    "rim lighting #E0E0E0, cinematic volumetric lighting, subtle amber and purple bokeh "
    "particles, hyper-realistic metallic textures, intelligent visionary mood, "
    "8K commercial quality, crushed blacks warm gold highlights cool purple midtones. "
    "Match the color mood and lighting style of the reference image. "
)

BIBLE_NO_LOGO = BIBLE + "No logos no brand names no watermarks on screen. "

ANATOMY = (
    "If any human hands appear they must be anatomically perfect with exactly five fingers "
    "on each hand, natural proportions, no extra digits, no fused fingers, no deformed limbs. "
)

NO_PEOPLE = "No people no hands no fingers no body parts visible. "

NEGATIVE = (
    "extra fingers, six fingers, seven fingers, deformed hands, malformed hands, too many fingers, "
    "missing fingers, fused fingers, text, letters, words, watermark, signature, "
    "bright white background, stock photo, cartoon, blurry, deformed"
)

ASSETS = [
    {"id": "I-01", "file": "hero-bg-glow.webp", "model": "pro", "aspect_ratio": "16:9",
     "prompt": "Abstract dark technology background, true black void, massive radial glow from top center, vibrant purple #9D4EDD core bleeding into deep violet #7B2CBF, metallic gold accent particles scattered sparingly, chrome silver perspective grid lines at 4% opacity converging to vanishing point, amber-purple bokeh orbs, dark vignette corners, pure abstract cinematic technology, no UI no people"},
    {"id": "I-02", "file": "hero-particles.webp", "model": "pro", "aspect_ratio": "16:9",
     "prompt": "Abstract particle constellation on pure black background, hundreds of luminous dots white gold #FFB700 and purple #9D4EDD, ultra-thin filament lines neural network effect, soft glow halos, denser upper center, pure black background for overlay use, synaptic connections aesthetic"},
    {"id": "I-03", "file": "hero-noise-texture.webp", "model": "dev", "aspect_ratio": "1:1",
     "prompt": "Pure film grain texture, fine analog noise, monochromatic gray, cinematic 16mm film grain tileable, uniform noise only, no shapes no objects, Kodak Portra style grain for overlay blending"},
    {"id": "I-04", "file": "hero-product-env.webp", "model": "pro", "aspect_ratio": "4:3",
     "prompt": "Isometric 3D render of sleek dark mode software dashboard floating in black void, 30-degree isometric perspective, CRM inbox three panels with blurred illegible interface text, screen glows purple and gold UI accents, soft drop shadows, chrome rim light on device edges, deep black background with purple glow halo behind device, premium SaaS product photography, no readable text"},
    {"id": "I-05", "file": "pain-whatsapp-chaos.webp", "model": "pro", "aspect_ratio": "3:4",
     "prompt": NO_PEOPLE + "Close-up macro of smartphone lying on wooden desk in dim room, dark mode messaging app dozens of unanswered messages, red unread badge, cold purple screen glow, desaturated moody blue-gray grade, stress and chaos, documentary photography shallow depth of field, no hands no faces no readable text"},
    {"id": "I-06", "file": "pain-spreadsheet-chaos.webp", "model": "pro", "aspect_ratio": "3:4",
     "prompt": "Overhead close-up laptop messy spreadsheet hundreds of rows red yellow highlights, sticky notes coffee mug business cards scattered, cold fluorescent lighting desaturated teal-gray, manual CRM chaos, editorial photography no readable data"},
    {"id": "I-07", "file": "pain-chatbot-generic.webp", "model": "pro", "aspect_ratio": "3:4",
     "prompt": NO_PEOPLE + "Smartphone lying flat on dark desk showing robotic chatbot conversation white clinical interface on screen only, thumb swipe gesture implied by motion blur on screen edge not by visible hands, cold harsh screen light, desaturated grade rejection frustration, f/1.8 bokeh, blurred Portuguese chat interface text on screen"},
    {"id": "I-08", "file": "pain-empty-pipeline.webp", "model": "pro", "aspect_ratio": "3:4",
     "prompt": "Dark mode monitor empty Kanban columns zero cards ghost placeholders flat zero revenue chart, dim office at night cold purple screen glow on desk, coffee cup scattered papers, emptiness uncertainty chiaroscuro lighting no readable text"},
    {"id": "I-14", "file": "lifestyle-before.webp", "model": "pro", "aspect_ratio": "4:3",
     "prompt": "Cinematic wide chaotic small business workspace at night, messy desk sticky notes three smartphones notification badges open laptop disorganized spreadsheet, cold fluorescent and screen glow, desaturated blue-gray film noir, no people environmental storytelling chaos stress"},
    {"id": "I-15", "file": "lifestyle-after.webp", "model": "pro", "aspect_ratio": "4:3",
     "prompt": "Cinematic wide minimal home office golden hour, clean desk single ultrawide monitor showing dark CRM dashboard with green metrics purple-gold ambient glow, smartphone face-down, succulent plant clean coffee, warm amber window light mixed cool monitor glow, calm control prosperity no people"},
    {"id": "I-16", "file": "case-clinic.webp", "model": "pro", "aspect_ratio": "4:3",
     "prompt": "Premium medical clinic reception minimalist white soft blue, dark mode tablet on desk showing blurred appointment calendar green indicators, natural window light fresh flowers, clean clinical atmosphere, no staff faces commercial interior photography"},
    {"id": "I-17", "file": "case-realestate.webp", "model": "pro", "aspect_ratio": "4:3",
     "prompt": "Elegant real estate agency office floor-to-ceiling windows city skyline, presentation screen dark mode property catalog blurred, glass desk laptop Kanban pipeline, warm corporate lighting no faces warm tones purple screen accent"},
    {"id": "I-18", "file": "case-consulting.webp", "model": "pro", "aspect_ratio": "4:3",
     "prompt": "Modern consultant private office dark wood leather, monitor dark CRM pipeline green forecast chart, second screen blurred chat, leather notebook warm desk lamp, moody optimistic amber purple contrast no faces"},
    {"id": "I-19", "file": "case-agency.webp", "model": "pro", "aspect_ratio": "4:3",
     "prompt": "Creative digital agency loft exposed brick industrial tech, multiple dark monitors client dashboards blurred, cool purple LED strips warm pendant lights plants, organized multi-client operations no faces wide lens"},
    {"id": "I-20", "file": "case-ecommerce.webp", "model": "pro", "aspect_ratio": "4:3",
     "prompt": "Modern e-commerce fulfillment center warm lighting, tablet showing blurred WhatsApp AI conversations, shipping boxes laptop order dashboard green badges, professional small business no faces"},
    {"id": "I-21", "file": "abstract-dataflow.webp", "model": "pro", "aspect_ratio": "16:9",
     "prompt": "Abstract digital art thousands of glowing particles flowing curved streams through black void, purple #9D4EDD at origins gold #FFB700 at convergence center white particle edges, motion blur velocity, data converging into intelligence generative art background"},
    {"id": "I-22", "file": "abstract-neural-network.webp", "model": "pro", "aspect_ratio": "16:9",
     "prompt": "Abstract 3D neural network glowing spherical nodes connected luminous threads purple and gold pulsing, deep indigo void depth of field bokeh, golden light pulse along highlighted path, scientific visualization no text no labels"},
    {"id": "I-23", "file": "abstract-orbital-system.webp", "model": "pro", "aspect_ratio": "16:9",
     "prompt": "Abstract cosmic orbital system bright central node radiating purple energy, concentric orbital rings thin glowing blue violet lines, small luminous satellites motion blur trails, deep space black faint purple nebula low opacity majestic technology ecosystem"},
    {"id": "I-24", "file": "abstract-growth-success.webp", "model": "pro", "aspect_ratio": "16:9",
     "prompt": "Abstract exponential growth glowing ascending lines and 3D bar charts made of light, deep purple base to emerald green #10B981 peaks, dark void, upward arrow from converging gold light beams, optimism success momentum no text no numbers"},
    {"id": "I-25", "file": "abstract-security-shield.webp", "model": "pro", "aspect_ratio": "1:1",
     "prompt": "Elegant abstract shield emblem floating black void, luminous geometric hexagonal lines purple and chrome white force field glow, concentric energy rings, small lock symbol center golden light, subtle grid 2% opacity cybersecurity aesthetic no text"},
    {"id": "I-26", "file": "avatar-clinic-owner.webp", "model": "pro", "aspect_ratio": "1:1",
     "prompt": "Professional headshot confident Brazilian woman late 30s warm smile white medical coat, dark background subtle purple bokeh, studio lighting front-right key light, LinkedIn quality 85mm portrait photorealistic no text"},
    {"id": "I-27", "file": "avatar-sales-consultant.webp", "model": "pro", "aspect_ratio": "1:1",
     "prompt": "Professional headshot confident Brazilian man early 40s dark suit open collar, dark background purple gold rim light, direct eye contact executive portrait 85mm photorealistic no text"},
    {"id": "I-28", "file": "avatar-agency-founder.webp", "model": "pro", "aspect_ratio": "1:1",
     "prompt": "Professional creative director headshot Brazilian woman early 30s dark blazer, agency office blurred background, warm creative lighting blue purple rim light, genuine smile 85mm portrait photorealistic"},
    {"id": "I-29", "file": "avatar-real-estate.webp", "model": "pro", "aspect_ratio": "1:1",
     "prompt": "Professional real estate headshot Brazilian man late 40s dark suit, modern office blurred glass walls, corporate portrait lighting trustworthy expression 85mm photorealistic no text"},
    {"id": "I-30", "file": "bg-problem-section.webp", "model": "dev", "aspect_ratio": "16:9",
     "prompt": "Abstract dark oppressive background near-black #030410, subtle red-orange embers very low density, barely visible cage-like grid, strong vignette edges pure black, tension constriction low contrast readable text overlay suitable"},
    {"id": "I-31", "file": "bg-benefits-section.webp", "model": "dev", "aspect_ratio": "16:9",
     "prompt": "Subtle premium dark texture deep black base, faint hexagonal honeycomb 3% opacity purple tint, subtle gradient center lighter microscopic noise, uniform functional background no focal point"},
    {"id": "I-32", "file": "bg-cta-final.webp", "model": "pro", "aspect_ratio": "16:9",
     "prompt": "Epic abstract cinematic background deep space darkness massive convergence event center, thousands tiny glowing purple gold particles streaming inward transforming to emerald green at center, golden-white radiance, edges fade pure black epic scale generative art"},
    {"id": "D-01", "file": "demo-plate-messaging.webp", "model": "pro", "aspect_ratio": "9:16",
     "prompt": "Premium dark product photography backdrop for smartphone mockup, matte black surface soft purple gold rim lighting from behind, subtle reflection, empty center space for UI overlay, studio void aesthetic no device no text"},
    {"id": "D-02", "file": "demo-plate-dashboard.webp", "model": "pro", "aspect_ratio": "16:9",
     "prompt": "Premium dark environment for ultrawide monitor mockup, black desk subtle purple ambient glow gold accent particles floating, chrome edge highlights, empty screen area for UI composite, cinematic product staging no monitor content no text"},
    {"id": "D-03", "file": "demo-plate-ambient.webp", "model": "pro", "aspect_ratio": "16:9",
     "prompt": "Abstract premium dark demo section background, soft purple radial glow center-bottom, gold particle streams, black void upper area for text overlay, subtle depth layers for SaaS product demo section"},
]

MODELS = {
    "pro": "black-forest-labs/flux-2-pro",
    "dev": "black-forest-labs/flux-2-dev",
}


def load_logo_data_uri() -> str:
    raw = LOGO_PATH.read_bytes()
    return f"data:image/png;base64,{base64.b64encode(raw).decode()}"


def api_request(token: str, method: str, path: str, data: dict | None = None) -> dict:
    url = f"{API_BASE}{path}"
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json", "Prefer": "wait"}
    body = json.dumps(data).encode() if data is not None else None
    req = Request(url, data=body, headers=headers, method=method)
    with urlopen(req, timeout=300) as resp:
        return json.loads(resp.read().decode())


def wait_prediction(token: str, prediction_id: str) -> dict:
    while True:
        result = api_request(token, "GET", f"/predictions/{prediction_id}")
        if result.get("status") in ("succeeded", "failed", "canceled"):
            return result
        time.sleep(2)


def generate(token: str, asset: dict, logo_uri: str, use_ref: bool = True) -> str:
    model_key = asset.get("model", "pro")
    model = MODELS[model_key]
    full_prompt = BIBLE_NO_LOGO + asset["prompt"] + ". " + ANATOMY + " Avoid: " + NEGATIVE

    params: dict = {
        "prompt": full_prompt,
        "aspect_ratio": asset.get("aspect_ratio", "16:9"),
        "output_format": "webp",
        "output_quality": 92,
        "resolution": "1 MP",
    }
    if use_ref and model_key == "pro":
        params["input_images"] = [logo_uri]

    payload = {"input": params}
    result = api_request(token, "POST", f"/models/{model}/predictions", payload)

    if result.get("status") not in ("succeeded",):
        if result.get("id"):
            result = wait_prediction(token, result["id"])
        else:
            raise RuntimeError(str(result))

    if result.get("status") == "failed":
        raise RuntimeError(result.get("error", "failed"))

    output = result.get("output")
    if isinstance(output, list):
        output = output[0]
    if not output:
        raise RuntimeError("no output")
    return output


def download(url: str, dest: Path) -> None:
    r = requests.get(url, timeout=120)
    r.raise_for_status()
    dest.write_bytes(r.content)


def main() -> int:
    load_dotenv(ROOT / ".env")
    token = os.environ.get("API_KEY") or os.environ.get("REPLICATE_API_TOKEN")
    if not token:
        print("Defina API_KEY no .env")
        return 1

    if not LOGO_PATH.exists():
        print(f"Logo nao encontrada: {LOGO_PATH}")
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    logo_uri = load_logo_data_uri()

    only = [a for a in sys.argv[1:] if not a.startswith("--")]
    force = "--force" in sys.argv
    assets = ASSETS
    if only:
        assets = [a for a in ASSETS if a["id"] in only or a["file"] in only]

    print(f"KORUVISION — {len(assets)} imagens via FLUX.2")
    print(f"Output: {OUTPUT_DIR}\n")

    ok, fail = 0, 0
    for asset in assets:
        dest = OUTPUT_DIR / asset["file"]
        if dest.exists() and not force:
            print(f"  [{asset['id']}] skip {dest.name}")
            ok += 1
            continue
        try:
            print(f"  [{asset['id']}] gerando {asset['file']} ({asset.get('model','pro')})...")
            url = generate(token, asset, logo_uri)
            download(url, dest)
            print(f"  [{asset['id']}] ok -> {dest.name}")
            ok += 1
            time.sleep(0.5)
        except Exception as exc:
            print(f"  [{asset['id']}] ERRO: {exc}")
            fail += 1

    print(f"\nConcluido: {ok} ok, {fail} falhas")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
