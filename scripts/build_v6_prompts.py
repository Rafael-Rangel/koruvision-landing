#!/usr/bin/env python3
"""Gera prompts v6 Product Canvas em assets/prompts/v6/."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "prompts" / "v6"

PREFIX = (
    "Premium SaaS product marketing, dark void #03060F, subtle blue #3B82F6 and violet #8B5CF6 "
    "ambient light, frosted glass, shallow depth of field, Stripe Linear Framer commercial style. "
    "Generous negative space for text overlay. No cosmos, no space, no stars, no nebula, no neural "
    "corridors, no sci-fi halls, no liquid data rivers. No logos, no watermarks, no brand names. "
    "No readable text on screens."
)

IMAGES = [
    # S01 Hero
    ("NV6-IMG-001", "hero-studio-gradient-left.webp", "21:9", "S01", "Wide dark studio backdrop, soft blue-violet gradient on right third only, left two-thirds empty negative space for headline, subtle floor reflection, product photography lighting, minimal"),
    ("NV6-IMG-002", "hero-device-glow-niche.webp", "16:9", "S01", "Soft glow behind smartphone silhouette area center-right, blurred CRM chat interface shapes, green message bubble hints, no readable text, shallow DOF"),
    ("NV6-IMG-003", "hero-metric-chips-ambient.webp", "16:9", "S01", "Abstract floating glass chips with blurred chart shapes, pipeline metric hints, gold and cyan accent dots, very subtle, supports UI overlay"),
    ("NV6-IMG-004", "hero-depth-bokeh-blue.webp", "4:3", "S01", "Macro bokeh blue and violet circles on black, 8% visibility layer for depth, no objects"),
    # S02 Problem
    ("NV6-IMG-005", "problem-scattered-notifications-blur.webp", "3:4", "S02", "Chaotic stack of blurred notification cards and chat bubbles, red accent #EF4444 haze, messy desktop metaphor, no readable text, tension"),
    ("NV6-IMG-006", "problem-spreadsheet-chaos-blur.webp", "3:4", "S02", "Blurred spreadsheet grid breaking apart, cells misaligned, dull red warning glow, operational chaos metaphor"),
    ("NV6-IMG-007", "problem-empty-pipeline-blur.webp", "3:4", "S02", "Empty kanban columns blurred, faded cards falling, cold desaturated blue, lost leads metaphor"),
    ("NV6-IMG-008", "problem-vignette-red-soft.webp", "16:9", "S02", "Soft red vignette mask on dark void, edge darkening only, no objects, overlay layer"),
    # S03 Bridge
    ("NV6-IMG-009", "bridge-split-chaos-order.webp", "21:9", "S03", "Horizontal split composition: left third chaotic red blurred notifications, right third clean blue ordered grid, smooth transition band in center"),
    ("NV6-IMG-010", "bridge-calm-gradient.webp", "16:9", "S03", "Unified calm blue-violet gradient after transformation, subtle green success hint bottom right, relief mood"),
    ("NV6-IMG-011", "bridge-glass-pillars-soft.webp", "16:9", "S03", "Four frosted glass vertical panels evenly spaced, soft internal glow, represents four pillars, minimal"),
    # S04 Demo
    ("NV6-IMG-012", "demo-studio-backdrop-soft.webp", "21:9", "S04", "Dark product photography studio, single soft spotlight on center-right stage, empty pedestal area for device mockup, black seamless backdrop"),
    ("NV6-IMG-013", "demo-messaging-atmosphere.webp", "16:9", "S04", "Blurred WhatsApp-style chat column shapes, green accent, supports act 1 UI overlay"),
    ("NV6-IMG-014", "demo-pipeline-atmosphere.webp", "16:9", "S04", "Blurred kanban columns with one gold highlighted card shape, pipeline act atmosphere"),
    # S05 Setup
    ("NV6-IMG-015", "setup-welcome-gradient.webp", "16:9", "S05", "Clean onboarding welcome screen atmosphere, centered soft glow, three step indicators as blurred dots, friendly blue"),
    ("NV6-IMG-016", "setup-qr-glow-niche.webp", "16:9", "S05", "Soft square glow area for QR code placement, green WhatsApp hint, minimal"),
    # S06 Agents
    ("NV6-IMG-017", "agents-tone-palette-abstract.webp", "16:9", "S06", "Five vertical color bands abstract: teal gold violet green white, personality palette metaphor, no faces"),
    ("NV6-IMG-018", "agents-chat-tone-glow.webp", "16:9", "S06", "Blurred chat bubbles in different tonal temperatures side by side, brand voice metaphor"),
    # S07 Inbox
    ("NV6-IMG-019", "inbox-soft-blue-glow.webp", "21:9", "S07", "Command center atmosphere, cool blue ambient behind three-column layout area, subtle scan lines"),
    ("NV6-IMG-020", "inbox-handoff-hint.webp", "16:9", "S07", "Blurred handoff arrow between bot and human icon shapes, amber and cyan, no text"),
    # S08 Funnel
    ("NV6-IMG-021", "funnel-pipeline-glow.webp", "16:9", "S08", "Kanban pipeline with magnetic lane glow, one card trail motion blur gold, revenue metaphor"),
    ("NV6-IMG-022", "funnel-deal-card-gold.webp", "16:9", "S08", "Single featured deal card shape with gold border glow, blurred name field, R$ value area abstract"),
    # S09 Automation
    ("NV6-IMG-023", "automation-node-grid-bg.webp", "16:9", "S09", "Dark canvas with faint node grid, workflow blueprint atmosphere, cyan connection hints"),
    ("NV6-IMG-024", "automation-pulse-path.webp", "16:9", "S09", "Curved light path connecting six node circles, energy flow metaphor, one node brighter"),
    # S10 Benefits
    ("NV6-IMG-025", "benefits-dark-grid-ambient.webp", "21:9", "S10", "Subtle dot grid on dark surface, constellation anchor points faint, 12 node positions hinted"),
    ("NV6-IMG-026", "benefits-agency-card-glow.webp", "16:9", "S10", "White-label portal card shape with soft violet border, agency mode hint"),
    # S11 Before/After
    ("NV6-IMG-027", "before-messy-desk-blur.webp", "16:9", "S11", "Messy desk with multiple screens notifications spreadsheets all blurred, warm red stress lighting"),
    ("NV6-IMG-028", "after-clean-dashboard-blur.webp", "16:9", "S11", "Clean single dashboard screen blurred, cool blue calm lighting, organized metaphor"),
    # S12 Cases - 5 verticals
    ("NV6-IMG-029", "case-health-clinic-soft.webp", "3:4", "S12", "Blurred modern clinic reception with phone on desk, healthcare context, shallow DOF, no faces"),
    ("NV6-IMG-030", "case-property-office-soft.webp", "3:4", "S12", "Blurred real estate office with laptop showing property list shapes, professional context"),
    ("NV6-IMG-031", "case-consulting-desk-soft.webp", "3:4", "S12", "Consulting workspace laptop calendar shapes blurred, strategy context"),
    ("NV6-IMG-032", "case-agency-studio-soft.webp", "3:4", "S12", "Creative agency open office multiple monitors blurred, multi-client context"),
    ("NV6-IMG-033", "case-commerce-fulfillment-soft.webp", "3:4", "S12", "E-commerce operator with order dashboard blurred, recovery cart metaphor"),
    # S13 Social
    ("NV6-IMG-034", "social-team-success-soft.webp", "21:9", "S13", "Small team celebrating at desk laptops visible blurred, backs to camera, authentic startup office, shallow DOF"),
    # S14 Integrations
    ("NV6-IMG-035", "integrations-hub-glow.webp", "16:9", "S14", "Central hub circle with soft connection lines radiating outward, orbit metaphor minimal"),
    # S15 Agency
    ("NV6-IMG-036", "agency-portal-threshold-clean.webp", "16:9", "S15", "Clean portal gateway frame, multiple tenant tiles blurred inside, MRR dashboard hint"),
    # S16 Security
    ("NV6-IMG-037", "security-shield-minimal.webp", "16:9", "S16", "Minimal shield outline glow cyan on dark, lattice pattern faint, trust metaphor"),
    # S17 Pricing
    ("NV6-IMG-038", "pricing-tier-glow.webp", "21:9", "S17", "Three vertical tier columns as soft light pillars, center pillar brighter, pricing metaphor"),
    # S18 FAQ
    ("NV6-IMG-039", "faq-calm-gradient.webp", "16:9", "S18", "Calm neutral gradient pause before CTA, minimal noise, clarity mood"),
    # S19 CTA
    ("NV6-IMG-040", "cta-conversion-spotlight.webp", "21:9", "S19", "Dark stage with warm gold spotlight center bottom, conversion climax, empty for CTA buttons"),
    ("NV6-IMG-041", "cta-trial-glow.webp", "16:9", "S19", "Soft green success glow hint, 14-day trial mood, subtle"),
    ("NV6-IMG-042", "cta-handshake-abstract.webp", "16:9", "S19", "Abstract handshake light shapes, partnership trust, very subtle blurred"),
    # Depth plates (global)
    ("NV6-IMG-043", "depth-left-text-safe.webp", "16:9", "GLOBAL", "Pure dark gradient darker on right, left third safest for text, overlay"),
    ("NV6-IMG-044", "depth-film-grain-subtle-tile.webp", "8:8", "GLOBAL", "Seamless subtle film grain tile 2% opacity texture"),
    ("NV6-IMG-045", "depth-blue-rim-accent.webp", "16:9", "GLOBAL", "Thin blue rim light accent streak for parallax layer"),
    ("NV6-IMG-046", "depth-violet-rim-accent.webp", "16:9", "GLOBAL", "Thin violet rim accent for IA sections"),
    ("NV6-IMG-047", "depth-success-green-mist.webp", "16:9", "GLOBAL", "Soft green success mist for conversion moments"),
    ("NV6-IMG-048", "depth-danger-red-mist.webp", "16:9", "GLOBAL", "Soft red mist for problem section accents only"),
]

VIDEOS = [
    ("NV6-VID-001", "nv6-vid-001.mp4", "S01", 5, "Slow drift of subtle UI particle dots on dark gradient, no camera travel, ambient hero loop"),
    ("NV6-VID-002", "nv6-vid-002.mp4", "S02", 5, "Blurred notification cards stacking chaotically, red pulse, no readable text, slow"),
    ("NV6-VID-003", "nv6-vid-003.mp4", "S03", 5, "Horizontal wipe from chaotic red blur to clean blue grid, smooth transition"),
    ("NV6-VID-004", "nv6-vid-004.mp4", "S04", 10, "Slow pan across blurred CRM dashboard mockup on desk, studio lighting, product demo"),
    ("NV6-VID-005", "nv6-vid-005.mp4", "S05", 5, "Three onboarding steps lighting up sequentially, progress bar filling, blur UI"),
    ("NV6-VID-006", "nv6-vid-006.mp4", "S08", 5, "Kanban card sliding one column right with gold glow trail, pipeline metaphor"),
    ("NV6-VID-007", "nv6-vid-007.mp4", "S09", 5, "Light pulse traveling through six workflow nodes connected by lines, cyan"),
    ("NV6-VID-008", "nv6-vid-008.mp4", "S11", 5, "Wipe reveal from messy desk blur to clean dashboard blur, left to right"),
    ("NV6-VID-009", "nv6-vid-009.mp4", "S12", 8, "Quick montage of five blurred workplace contexts cross-dissolve, verticals"),
    ("NV6-VID-010", "nv6-vid-010.mp4", "S14", 5, "App icons as soft circles connecting with thin lines to center hub, orbit"),
    ("NV6-VID-011", "nv6-vid-011.mp4", "S15", 5, "Grid of tenant tiles lighting up one by one, agency multi-client"),
    ("NV6-VID-012", "nv6-vid-012.mp4", "S19", 5, "Slow gold gradient shift on dark void, minimal CTA ambient loop"),
]


def write_flux():
    lines = [
        "# NV6 — FLUX.2 Image Prompts · Product Canvas\n",
        "> **48 assets** · Direção v6 SaaS mockup · Substitui Névoa Neural v5\n\n",
        "## Prefixo global\n\n```\n" + PREFIX + "\n```\n\n---\n",
    ]
    for img_id, fname, ar, sec, desc in IMAGES:
        lines.append(f"### {img_id}\n\n")
        lines.append(f"| Campo | Valor |\n|-------|-------|\n")
        lines.append(f"| **Arquivo** | `{fname}` |\n")
        lines.append(f"| **Aspect ratio** | `{ar}` |\n")
        lines.append(f"| **Seção** | {sec} |\n\n")
        lines.append(f"**Prompt:** {PREFIX} {desc}\n\n---\n")
    (OUT / "flux-images.md").write_text("".join(lines), encoding="utf-8")


def write_kling():
    lines = [
        "# NV6 — Kling Video Prompts · Product Canvas\n\n",
        "> **12 vídeos** · Movimento lento · UI/mockup blur · Sem cenas espaciais\n\n",
        f"## Prefixo global\n\n```\n{PREFIX}\n```\n\n---\n",
    ]
    for vid_id, fname, sec, dur, desc in VIDEOS:
        lines.append(f"### {vid_id}\n\n")
        lines.append(f"| Campo | Valor |\n|-------|-------|\n")
        lines.append(f"| **Arquivo** | `{fname}` |\n")
        lines.append(f"| **Duração** | {dur}s |\n")
        lines.append(f"| **Seção** | {sec} |\n\n")
        lines.append(f"**Prompt:** {PREFIX} {desc}. Slow cinematic motion, commercial SaaS ad quality.\n\n")
        lines.append(f"**Keyframe IN:** first frame static — {desc.split(',')[0]}.\n")
        lines.append(f"**Keyframe OUT:** last frame — motion complete, hold calm.\n\n---\n")
    (OUT / "kling-videos.md").write_text("".join(lines), encoding="utf-8")


def write_readme():
    text = """# NV6 Prompts · Product Canvas

Direção visual v6 para FlowIA — SaaS de mockups CRM + IA WhatsApp.

## Documentação mestre

- **Script visual:** `docs/FlowIA-Visual-Script-v6.md`
- **Substitui:** `assets/prompts/v5/` (Névoa Neural)

## Gerar prompts

```bash
python scripts/build_v6_prompts.py
```

## Gerar binários (quando pipeline nv6 estiver configurado)

```bash
# Copiar nv5_pipeline.py → nv6_pipeline.py e ajustar paths para nv6
python scripts/nv5_pipeline.py --images   # temporário: editar output para public/assets/nv6
```

## .env após geração

```
NEXT_PUBLIC_ASSET_BASE=/assets/nv6
NEXT_PUBLIC_ENABLE_F2F=false
NEXT_PUBLIC_ENABLE_VIDEO=true
```

## Política F2F v6

F2F desativado por padrão. UI React é a fonte da verdade do produto.
"""
    (OUT / "README.md").write_text(text, encoding="utf-8")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    write_flux()
    write_kling()
    write_readme()
    print(f"OK: {len(IMAGES)} images, {len(VIDEOS)} videos -> {OUT}")


if __name__ == "__main__":
    main()
