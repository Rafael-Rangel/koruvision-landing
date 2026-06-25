# -*- coding: utf-8 -*-
"""Gera docs/KORUVISION-Asset-Map-Master.md — fonte única da verdade."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "KORUVISION-Asset-Map-Master.md"
PROMPTS = ROOT / "assets" / "prompts" / "v5"

GLOBAL_PREFIX = (
    "Névoa Neural aesthetic, KORUVISION premium dark universe, absolute void #010208, "
    "volumetric purple mist #B24BFF and liquid gold rim #FFC233, neural cyan accents #2EE8C0, "
    "holographic glass panels, oblique cinematic camera 28 degrees, subsurface scattering, "
    "anamorphic bokeh, 8K commercial quality. No logos no brand names no watermarks. "
    "No people no hands. No readable text."
)

SECTIONS = {
    "S01": {"title": "Hero · O Observatório se Abre", "slug": "s01-hero", "pin": "360vh", "ato": "I Emergência"},
    "S02": {"title": "Problema · Névoa Vermelha", "slug": "s02-problema", "pin": "240vh", "ato": "I Tensão"},
    "S03": {"title": "Transformação · Atravessia Neural", "slug": "s03-bridge", "pin": "320vh", "ato": "II Alívio"},
    "S04": {"title": "Demo · Dentro da Máquina", "slug": "s04-demo", "pin": "480vh", "ato": "II Desejo"},
    "S05": {"title": "Setup · Três Portais", "slug": "s05-setup", "pin": "280vh", "ato": "III Maestria"},
    "S06": {"title": "Agentes · Personalidade IA", "slug": "s06-agentes", "pin": "260H", "ato": "III"},
    "S07": {"title": "Inbox · Sala de Comando", "slug": "s07-inbox", "pin": "240vh", "ato": "III"},
    "S08": {"title": "Funil · Gravidade do Deal", "slug": "s08-funil", "pin": "260vh", "ato": "III"},
    "S09": {"title": "Automações · Sistema Nervoso", "slug": "s09-automacoes", "pin": "240vh", "ato": "III"},
    "S10": {"title": "Benefícios · Constelação", "slug": "s10-beneficios", "pin": "—", "ato": "IV Prova"},
    "S11": {"title": "Antes/Depois · A Linha", "slug": "s11-linha", "pin": "240vh", "ato": "IV"},
    "S12": {"title": "Cases · Cinco Mercados", "slug": "s12-cases", "pin": "300H", "ato": "IV"},
    "S13": {"title": "Social Proof", "slug": "s13-social", "pin": "—", "ato": "IV"},
    "S14": {"title": "Integrações · Órbita", "slug": "s14-orbita", "pin": "220vh", "ato": "IV"},
    "S15": {"title": "Agência · Portal", "slug": "s15-agencia", "pin": "260vh", "ato": "IV"},
    "S16": {"title": "Segurança · Fortaleza", "slug": "s16-seguranca", "pin": "—", "ato": "IV"},
    "S17": {"title": "Planos · Escolha seu Portal", "slug": "s17-planos", "pin": "—", "ato": "V Decisão"},
    "S18": {"title": "FAQ · Clareza", "slug": "s18-faq", "pin": "—", "ato": "V Pausa"},
    "S19": {"title": "CTA Final · Convergência", "slug": "s19-cta", "pin": "320vh", "ato": "V Clímax"},
}

# Asset assignment per section (IDs only — details from prompt files)
SECTION_ASSETS = {
    "GLOBAL": {
        "img": ["NV5-IMG-048"],
        "svg": ["NV5-SVG-001", "NV5-SVG-002", "NV5-SVG-022", "NV5-SVG-027", "NV5-SVG-028"],
        "react": ["NV5-R-001", "NV5-R-002", "NV5-R-003", "NV5-R-004", "NV5-R-005", "NV5-R-010"],
        "other": ["koruvision-logo-master.png"],
    },
    "S01": {
        "img": ["NV5-IMG-001", "NV5-IMG-002", "NV5-IMG-003", "NV5-IMG-004", "NV5-IMG-039"],
        "mock": ["NV5-M-01", "NV5-M-02"],
        "vid": ["NV5-VID-001", "NV5-VID-015"],
        "f2f": ["NV5-F2F-001"],
        "svg": ["NV5-SVG-003"],
        "react": ["NV5-R-021", "NV5-R-006", "NV5-R-007", "NV5-R-008", "NV5-R-009"],
        "key": ["NV5-KEY-001", "NV5-KEY-002", "NV5-KEY-029", "NV5-KEY-030"],
    },
    "S02": {
        "img": ["NV5-IMG-005", "NV5-IMG-006", "NV5-IMG-007", "NV5-IMG-008", "NV5-IMG-043"],
        "vid": ["NV5-VID-002"],
        "f2f": ["NV5-F2F-002"],
        "svg": ["NV5-SVG-004", "NV5-SVG-005", "NV5-SVG-006", "NV5-SVG-007"],
        "react": ["NV5-R-022", "NV5-R-005"],
        "key": ["NV5-KEY-003", "NV5-KEY-004"],
    },
    "S03": {
        "img": ["NV5-IMG-009", "NV5-IMG-010", "NV5-IMG-011", "NV5-IMG-046"],
        "vid": ["NV5-VID-003"],
        "f2f": ["NV5-F2F-003"],
        "svg": ["NV5-SVG-008", "NV5-SVG-009"],
        "react": ["NV5-R-023"],
        "key": ["NV5-KEY-005", "NV5-KEY-006"],
    },
    "S04": {
        "img": ["NV5-IMG-012", "NV5-IMG-013", "NV5-IMG-014", "NV5-IMG-040"],
        "mock": ["NV5-M-01", "NV5-M-02", "NV5-M-03", "NV5-M-04", "NV5-M-05", "NV5-M-06"],
        "vid": ["NV5-VID-004", "NV5-VID-005"],
        "f2f": ["NV5-F2F-004"],
        "svg": ["NV5-SVG-010", "NV5-SVG-011"],
        "react": ["NV5-R-024", "NV5-R-011", "NV5-R-012", "NV5-R-013", "NV5-R-014", "NV5-R-015", "NV5-R-008"],
        "key": ["NV5-KEY-007", "NV5-KEY-008", "NV5-KEY-009", "NV5-KEY-010"],
    },
    "S05": {
        "img": ["NV5-IMG-015", "NV5-IMG-016"],
        "vid": ["NV5-VID-006"],
        "f2f": ["NV5-F2F-005"],
        "svg": ["NV5-SVG-012", "NV5-SVG-023"],
        "react": ["NV5-R-025"],
        "key": ["NV5-KEY-011", "NV5-KEY-012"],
    },
    "S06": {
        "img": ["NV5-IMG-017", "NV5-IMG-018"],
        "f2f": ["NV5-F2F-006"],
        "react": ["NV5-R-026", "NV5-R-012"],
    },
    "S07": {
        "img": ["NV5-IMG-019", "NV5-IMG-042"],
        "f2f": ["NV5-F2F-007"],
        "svg": ["NV5-SVG-024"],
        "react": ["NV5-R-027", "NV5-R-016", "NV5-M-07"],
    },
    "S08": {
        "img": ["NV5-IMG-020", "NV5-IMG-021", "NV5-IMG-047"],
        "vid": ["NV5-VID-007"],
        "f2f": ["NV5-F2F-008"],
        "svg": ["NV5-SVG-011", "NV5-SVG-024"],
        "react": ["NV5-R-028", "NV5-R-013", "NV5-R-015"],
        "key": ["NV5-KEY-013", "NV5-KEY-014"],
    },
    "S09": {
        "img": ["NV5-IMG-022", "NV5-IMG-023"],
        "vid": ["NV5-VID-008"],
        "f2f": ["NV5-F2F-009"],
        "svg": ["NV5-SVG-013", "NV5-SVG-014", "NV5-SVG-023"],
        "react": ["NV5-R-029", "NV5-R-017", "NV5-M-08"],
        "key": ["NV5-KEY-015", "NV5-KEY-016"],
    },
    "S10": {
        "img": ["NV5-IMG-024", "NV5-IMG-041"],
        "f2f": ["NV5-F2F-010"],
        "svg": ["NV5-SVG-022"],
        "react": ["NV5-R-030", "NV5-R-005"],
    },
    "S11": {
        "img": ["NV5-IMG-025", "NV5-IMG-026"],
        "vid": ["NV5-VID-009"],
        "f2f": ["NV5-F2F-011"],
        "svg": ["NV5-SVG-025"],
        "react": ["NV5-R-031"],
        "key": ["NV5-KEY-017", "NV5-KEY-018"],
    },
    "S12": {
        "img": ["NV5-IMG-027", "NV5-IMG-028", "NV5-IMG-029", "NV5-IMG-030", "NV5-IMG-031"],
        "vid": ["NV5-VID-010"],
        "f2f": ["NV5-F2F-012"],
        "react": ["NV5-R-032", "NV5-R-005"],
        "key": ["NV5-KEY-019", "NV5-KEY-020"],
    },
    "S13": {
        "img": ["NV5-IMG-032"],
        "vid": ["NV5-VID-010"],
        "f2f": ["NV5-F2F-013"],
        "svg": ["NV5-SVG-024"],
        "react": ["NV5-R-033"],
    },
    "S14": {
        "img": ["NV5-IMG-033"],
        "vid": ["NV5-VID-011"],
        "svg": ["NV5-SVG-015", "NV5-SVG-016", "NV5-SVG-017", "NV5-SVG-021"],
        "react": ["NV5-R-034"],
        "key": ["NV5-KEY-021", "NV5-KEY-022"],
    },
    "S15": {
        "img": ["NV5-IMG-034"],
        "vid": ["NV5-VID-012"],
        "f2f": ["NV5-F2F-014"],
        "svg": ["NV5-SVG-026"],
        "react": ["NV5-R-035", "NV5-R-018", "NV5-M-09"],
        "key": ["NV5-KEY-023", "NV5-KEY-024"],
    },
    "S16": {
        "img": ["NV5-IMG-035"],
        "f2f": ["NV5-F2F-015"],
        "svg": ["NV5-SVG-018", "NV5-SVG-019"],
        "react": ["NV5-R-036"],
    },
    "S17": {
        "img": ["NV5-IMG-044"],
        "svg": ["NV5-SVG-022"],
        "react": ["NV5-R-037", "NV5-R-019", "NV5-M-10"],
    },
    "S18": {
        "img": ["NV5-IMG-045"],
        "react": ["NV5-R-020"],
    },
    "S19": {
        "img": ["NV5-IMG-036", "NV5-IMG-037", "NV5-IMG-038"],
        "vid": ["NV5-VID-013", "NV5-VID-014"],
        "f2f": ["NV5-F2F-016"],
        "svg": ["NV5-SVG-020"],
        "react": ["NV5-R-038", "NV5-R-004"],
        "key": ["NV5-KEY-025", "NV5-KEY-026", "NV5-KEY-027", "NV5-KEY-028"],
    },
}

GSAP_SPEC = {
    "S01": {
        "timeline": "tlS01",
        "pin": "360vh", "scrub": 1.2, "snap": "peak 0.60",
        "protagonist": "SplitText + F2F portal",
        "plugins": ["ScrollTrigger", "SplitText", "Observer", "DrawSVG segment"],
        "build": "void→particles→headline words→device NV5-M-01→chips→CTA",
        "peak": "headline+device+CTA opacity 1 · Observer tilt device · river 0–8%",
        "exit": "device scale 0.94 · danger-fog vignette IMG-043 bleed · F2F 108–150f · handoff S02",
        "micro": "MagneticButton CTAs · scroll hint bob · MouseGlow stage",
        "hover": "CTA magnetic · device rim glow TiltCard",
    },
    "S02": {
        "timeline": "tlS02", "pin": "240vh", "scrub": 1.0,
        "protagonist": "3D card drop + MorphSVG icons",
        "plugins": ["ScrollTrigger", "MorphSVG", "batch"],
        "build": "4 pain cards Z-400 stagger · stat 0→78% · F2F 25f/card · river danger",
        "peak": "4 dores legíveis · stat pulsa · cards stable · Ken Burns IMG BG",
        "exit": "cards compress center · chromatic aberration · Flip prep S03 · F2F 75–100f",
        "micro": "TiltCard +3° · icon shake · stat hover replay",
        "hover": "TiltCard danger glow red rim",
    },
    "S03": {
        "timeline": "tlS03", "pin": "320vh", "scrub": 1.2, "snap": "peak",
        "protagonist": "Flip pain→pillar + MorphSVG X→✓",
        "plugins": ["ScrollTrigger", "Flip", "MorphSVG", "colorProps"],
        "build": "tunnel rings scale · F2F 0–60f caos · Flip cards S02 DOM · river heal",
        "peak": "4 pilares + checks · tunnel stable · Flip complete",
        "exit": "F2F 120–180f accelerate · portal open S04 · pillars dissolve",
        "micro": "pillar glow cyan focus",
        "hover": "pillar rim pulse",
    },
    "S04": {
        "timeline": "tlS04 nested actTL[0-4]", "pin": "480vh", "scrub": 2.4, "snap": "5 PEAKs",
        "protagonist": "Nested scrub + MotionPath + F2F exits",
        "plugins": ["ScrollTrigger", "MotionPath", "Flip", "DrawSVG", "Observer"],
        "build": "per act: UI layers enter · camera CAM_CONFIGS · F2F segment on EXIT",
        "peak": "UI 100% · explore mode hover bubbles/bars · act-copy legível",
        "exit": "F2F screen blend · chip morph · camera glide next act",
        "micro": "PEAK explore · magnetic CTA act5 · float panel lift",
        "hover": "bubbles · bars elastic · k-col · metrics · float panels",
    },
    "S05": {
        "timeline": "tlS05", "pin": "280vh", "scrub": 1.0,
        "protagonist": "DrawSVG QR + SplitText numbers",
        "plugins": ["ScrollTrigger", "DrawSVG", "SplitText"],
        "build": "monolito 01 pass · QR DrawSVG 0→100% · scan gold · F2F 0–80f",
        "peak": "3 portais linkados · step ativo cyan · WhatsApp pulse",
        "exit": "monolito 03 unfold · river gold · handoff S06",
        "micro": "portal rim glow · QR shimmer",
        "hover": "step pills cyan · portal gates glow",
    },
    "S06": {
        "timeline": "tlS06 horizontal", "pin": "260H", "scrub": 1.0,
        "protagonist": "Horizontal scroll + toggle chat",
        "plugins": ["ScrollTrigger horizontal", "Draggable", "timeline chat"],
        "build": "cards enter X · chat typewriter · F2F toggle 0–80f",
        "peak": "conversation legível both toggle states",
        "exit": "gallery slide · chat compress chip S07",
        "micro": "toggle spring · personality color shift",
        "hover": "agent card tilt scale 1.05",
    },
    "S07": {
        "timeline": "tlS07", "pin": "240vh", "scrub": 1.0,
        "protagonist": "MotionPath callouts orbit",
        "plugins": ["ScrollTrigger", "MotionPath", "stagger"],
        "build": "cols acendem seq · F2F wake 0–60f · callouts orbit enter",
        "peak": "UIInboxThreeCol complete · handoff amber pulse",
        "exit": "callouts retract · highlight deal → S08",
        "micro": "thread row highlight",
        "hover": "callout lift · DepthHover columns",
    },
    "S08": {
        "timeline": "tlS08", "pin": "260vh", "scrub": 1.2,
        "protagonist": "MotionPath deal card + snap gates",
        "plugins": ["MotionPath", "ScrollTrigger snap", "counter"],
        "build": "card enter col1 · snap gates gold · F2F 15f/gate · R$ counter",
        "peak": "card Fechado · confetti · kanban legível",
        "exit": "card lift → S09 node · vortex pull-back",
        "micro": "col magnetic preview · LiveGraph pulse",
        "hover": "col hover snap preview · bar pulse",
    },
    "S09": {
        "timeline": "tlS09", "pin": "240vh", "scrub": 1.0,
        "protagonist": "DrawSVG workflow + path particles",
        "plugins": ["DrawSVG", "MotionPath", "ScrollTrigger"],
        "build": "path DrawSVG 0→100% · cyan packet 20f/node · F2F sync",
        "peak": "workflow iluminado · node ativo gold corona",
        "exit": "success wave · path glow → S10",
        "micro": "node expand tooltip",
        "hover": "node hover expand · path segment highlight",
    },
    "S10": {
        "timeline": "tlS10 batch", "pin": "—",
        "protagonist": "Radial batch + Flip agência",
        "plugins": ["ScrollTrigger batch", "Flip", "TiltCard"],
        "build": "12 stars stagger 0.08s · gold filaments connect",
        "peak": "12 nodes ativos · agência card collapsed",
        "exit": "Agência Flip expand preview S15",
        "micro": "F2F-010 on accordion",
        "hover": "TiltCard star tooltip · agência expand spring",
    },
    "S11": {
        "timeline": "tlS11", "pin": "240vh", "scrub": 1.0,
        "protagonist": "Draggable slider + F2F sync",
        "plugins": ["Draggable", "ScrollTrigger", "attrPlugin clip"],
        "build": "slider 30% caos · F2F 0–50f · table rows stagger",
        "peak": "both sides legíveis · draggable free",
        "exit": "auto-slide 30→70% · F2F 50–100f · divider gold flash",
        "micro": "divider handle glow",
        "hover": "row highlight · handle scale",
    },
    "S12": {
        "timeline": "tlS12 horizontal", "pin": "300H", "scrub": 1.0,
        "protagonist": "Horizontal dolly + counter",
        "plugins": ["ScrollTrigger horizontal", "counter", "TiltCard"],
        "build": "cards enter X · metrics count on focus · F2F 24f/card",
        "peak": "center card scale 1 · metrics stable",
        "exit": "blur lateral · central hold",
        "micro": "CTA slide-in on focus",
        "hover": "TiltCard case · metric replay",
    },
    "S13": {
        "timeline": "tlS13", "pin": "—",
        "protagonist": "Counter scrub + marquee",
        "plugins": ["counter", "DrawSVG sparkline", "infinite repeat"],
        "build": "counters 0→target · marquee start · F2F particles BG",
        "peak": "numbers stable · marquee fluid",
        "exit": "marquee decel → S14",
        "micro": "marquee pause hover",
        "hover": "counter replay · quote lift",
    },
    "S14": {
        "timeline": "tlS14", "pin": "220vh", "scrub": 1.0,
        "protagonist": "MotionPath orbit 3D",
        "plugins": ["MotionPath", "Observer", "ScrollTrigger"],
        "build": "rings DrawSVG · satellites stagger · VID-011 loop",
        "peak": "órbita PAUSED · logos legíveis · core steady",
        "exit": "satellites accelerate · core beam → S15",
        "micro": "OrbitZoom +150%",
        "hover": "logo tooltip · ring speed change",
    },
    "S15": {
        "timeline": "tlS15", "pin": "260vh", "scrub": 1.0,
        "protagonist": "Flip portal fullscreen",
        "plugins": ["Flip", "counter", "ScrollTrigger"],
        "build": "card Flip expand · portal iris F2F 0–20f · tenants stagger",
        "peak": "UIAgencyTenants · MRR stable",
        "exit": "portal warp F2F 20–70f · handoff S16",
        "micro": "tenant click F2F trigger",
        "hover": "tenant color shift · portal rim pulse",
    },
    "S16": {
        "timeline": "tlS16 scrub", "pin": "—",
        "protagonist": "DrawSVG + MorphSVG shield",
        "plugins": ["DrawSVG", "MorphSVG", "ScrollTrigger"],
        "build": "hex DrawSVG 0→100% · shield morph wire→solid · F2F sync",
        "peak": "escudo cyan pulse · badges legíveis",
        "exit": "radial pulse · calm handoff S17",
        "micro": "badge expand detail",
        "hover": "hex ripple · shield rim glow",
    },
    "S17": {
        "timeline": "tlS17 stagger", "pin": "—",
        "protagonist": "Flip pricing toggle",
        "plugins": ["Flip", "ScrollTrigger stagger", "TiltCard"],
        "build": "cards rise stagger · toggle enter · tier glow BG",
        "peak": "3 planos legíveis · popular glow pulse",
        "exit": "cards float subtle · CTA magnetic prep",
        "micro": "Flip mensal/anual prices",
        "hover": "TiltCard plans · Popular gold shimmer",
    },
    "S18": {
        "timeline": "tlS18 spring", "pin": "—",
        "protagonist": "Spring accordion + search",
        "plugins": ["spring accordion", "ScrollTrigger fade"],
        "build": "accordion stagger · search focus glow · fog clarify L→R",
        "peak": "open item 100% legível",
        "exit": "fog dissipate · prep S19",
        "micro": "chevron rotate spring · filter highlight",
        "hover": "row bg · search instant filter",
    },
    "S19": {
        "timeline": "tlS19", "pin": "320vh", "scrub": 1.2,
        "protagonist": "SplitText + F2F pull-out + shockwave",
        "plugins": ["SplitText", "MorphSVG", "Observer", "DrawSVG river 100%"],
        "build": "particles converge · F2F 0–40f · SplitText · river 92→100% gold",
        "peak": "headline+CTAs gold pulse · shockwave hold",
        "exit": "F2F 40–120f observatory wide · shockwave expand · footer fade",
        "micro": "MagneticButton strong · particle burst click",
        "hover": "CTA magnetic max · shockwave ripple",
    },
}

USAGE_RULES = {
    "S01": "River nasce 0%. Device NV5-M-01 exclusivo hero — reutilizado S04/S07. VID-015 loop L1 -300Z. Bridge OUT: danger-fog → S02.",
    "S02": "Cards dor DOM persistente para Flip S03. VID-002 só EXIT S01/ENTRY. IMG-043 multiply overlay. Não reutilizar imgs hero.",
    "S03": "Flip consome cards S02 — mesmos elementos DOM. F2F fly-through contínuo. Portal handoff abre S04 void IMG-012.",
    "S04": "NV5-M-01 shell + golden UI R-011–015. F2F-004 só EXIT fases. VID-004/005 ambiente entre acts. Não scrub vídeo narrativo.",
    "S05": "Monolitos exclusivos. QR SVG DrawSVG — não FLUX. F2F sync scan line.",
    "S06": "F2F-006 segmento reutilizado de VID-002/003 — scrub toggle only. Sem vídeo dedicado.",
    "S07": "Inbox UI React legível PEAK. F2F intro only BUILD. IMG-019 BG 21:9.",
    "S08": "MotionPath card → handoff node S09. VID-007 snaps only. IMG-047 foreground parallax.",
    "S09": "DrawSVG + F2F sync same progress. VID-008 loop L1 40%.",
    "S10": "Respiro narrativo — sem pin. F2F-010 on-demand accordion.",
    "S11": "IMG-025/026 slider layers. F2F = slider.progress. VID-009 full bleed.",
    "S12": "5 imgs niche exclusivos. F2F Ken Burns per card focus. VID-010 loop reuse S13.",
    "S13": "Counters + marquee rational. F2F BG scrub slow. VID-010 shared S12.",
    "S14": "VID-011 loop L1 only. Orbit pause PEAK. Logos React slots not FLUX.",
    "S15": "Flip from S10 agência card optional. F2F on tenant click.",
    "S16": "Rational pause. Shield SVG primary — IMG-035 BG optional.",
    "S17": "Zero motion excess. IMG-044 blur BG only. Flip toggle prices.",
    "S18": "Minimal motion. IMG-045 fog clarify. FAQ React only.",
    "S19": "Echo S01 IMG-001/038 observatory. River 100% gold. VID-013 loop + VID-014 climax.",
}


def strip_field(val):
    return val.rstrip(" |").strip() if val else ""


def parse_svgs():
    text = (PROMPTS / "svg-specs.md").read_text(encoding="utf-8")
    svgs = {}
    for line in text.splitlines():
        if not line.startswith("| NV5-SVG-"):
            continue
        parts = [p.strip() for p in line.split("|") if p.strip()]
        if len(parts) >= 5:
            svgs[parts[0]] = {
                "file": parts[1],
                "section": parts[2],
                "tipo": parts[3],
                "plugin": parts[4],
            }
    return svgs


def parse_react():
    text = (PROMPTS / "react-components.md").read_text(encoding="utf-8")
    react = {}
    for line in text.splitlines():
        if not line.startswith("| NV5-R-"):
            continue
        parts = [p.strip() for p in line.split("|") if p.strip()]
        if len(parts) >= 2:
            react[parts[0]] = {
                "name": parts[1],
                "detail": parts[2] if len(parts) > 2 else "",
            }
    return react


def parse_mockups():
    text = (PROMPTS / "mockups-device.md").read_text(encoding="utf-8")
    blocks = re.split(r"## (NV5-M-\d+)", text)[1:]
    mocks = {}
    for i in range(0, len(blocks), 2):
        mid = blocks[i]
        body = blocks[i + 1]

        def field(name):
            m = re.search(rf"\*\*{re.escape(name)}\*\* \| (.+)", body)
            return strip_field(m.group(1)) if m else ""

        comp_m = re.search(r"\*\*Componente\*\* \| (.+)", body)
        comp_line = re.search(r"Componente (NV5-R-\d+[^\n]*)", body)
        output_m = re.search(r"\*\*Output\*\* \| `([^`]+)`", body)
        uso_m = re.search(r"\*\*Uso\*\* \| (.+)", body)
        content_m = re.search(r"\*\*Conteúdo PT-BR\*\* \| (.+)", body)
        layers = re.findall(r"^\d+\. (.+)$", body, re.M)

        mocks[mid] = {
            "tipo": field("Tipo") or ("React golden screen" if "Componente" in body else ""),
            "output": output_m.group(1) if output_m else strip_field(field("Output")),
            "uso": strip_field(uso_m.group(1)) if uso_m else "",
            "componente": strip_field(comp_m.group(1)) if comp_m else strip_field(comp_line.group(1) if comp_line else ""),
            "conteudo": strip_field(content_m.group(1)) if content_m else "",
            "camadas": layers,
        }
    return mocks


def parse_keyframes():
    text = (PROMPTS / "kling-keyframes.md").read_text(encoding="utf-8")
    blocks = re.split(r"## (NV5-KEY-\d+)", text)[1:]
    keys = {}
    for i in range(0, len(blocks), 2):
        kid = blocks[i]
        body = blocks[i + 1]
        file_m = re.search(r"\*\*Arquivo\*\* \| `([^`]+)`", body)
        prompt_m = re.search(r"\*\*Prompt:\*\* (.+?)(?=\n---|\n## |\Z)", body, re.S)
        video_m = re.search(r"\*\*Vídeo\*\* \| (.+)", body)
        momento_m = re.search(r"\*\*Momento\*\* \| (.+)", body)
        keys[kid] = {
            "file": file_m.group(1) if file_m else "",
            "video": strip_field(video_m.group(1)) if video_m else "",
            "momento": strip_field(momento_m.group(1)) if momento_m else "",
            "prompt": prompt_m.group(1).strip() if prompt_m else "",
        }
    return keys


def parse_flux_images():
    text = (PROMPTS / "flux-images.md").read_text(encoding="utf-8")
    blocks = re.split(r"### (NV5-IMG-\d+)", text)[1:]
    imgs = {}
    for i in range(0, len(blocks), 2):
        img_id = blocks[i]
        body = blocks[i + 1]
        file_m = re.search(r"\*\*Arquivo\*\* \| `([^`]+)`", body)
        ratio_m = re.search(r"\*\*Aspect ratio\*\* \| `([^`]+)`", body)
        sec_m = re.search(r"\*\*Seção\*\* \| (.+?)(?:\s*\|\s*$|\s*$)", body, re.M)
        prompt_m = re.search(r"\*\*Prompt FLUX\.2:\*\*\s*\n\n(.+?)(?=\n---|\n## |\Z)", body, re.S)
        unique = ""
        if prompt_m:
            full = prompt_m.group(1).strip()
            unique = full.replace(GLOBAL_PREFIX, "").strip()
            if unique.startswith("Névoa Neural"):
                parts = full.split(". No logos")
                if len(parts) > 1:
                    unique = parts[1].split("No readable text.", 1)
                    unique = unique[1].strip() if len(unique) > 1 else parts[0]
        imgs[img_id] = {
            "file": file_m.group(1) if file_m else "",
            "ratio": ratio_m.group(1) if ratio_m else "",
            "section": sec_m.group(1).strip() if sec_m else "",
            "prompt_unique": unique,
            "prompt_full": prompt_m.group(1).strip() if prompt_m else "",
        }
    return imgs


def parse_videos():
    text = (PROMPTS / "kling-videos.md").read_text(encoding="utf-8")
    blocks = re.split(r"## (NV5-VID-\d+)", text)[1:]
    vids = {}
    for i in range(0, len(blocks), 2):
        vid_id = blocks[i]
        body = blocks[i + 1]
        def field(name):
            m = re.search(rf"\*\*{re.escape(name)}\*\* \| (.+)", body)
            return strip_field(m.group(1)) if m else ""
        prompt_m = re.search(r"```\s*\n(.+?)\n```", body, re.S)
        vids[vid_id] = {
            "section": field("Seção"),
            "duration": field("Duração"),
            "key_start": field("Keyframe start"),
            "key_end": field("Keyframe end"),
            "f2f": field("F2F extract"),
            "prompt": prompt_m.group(1).strip() if prompt_m else "",
        }
    return vids


def parse_f2f():
    text = (PROMPTS / "f2f-sequences.md").read_text(encoding="utf-8")
    blocks = re.split(r"## (NV5-F2F-\d+)", text)[1:]
    f2fs = {}
    for i in range(0, len(blocks), 2):
        fid = blocks[i]
        body = blocks[i + 1]
        def field(name):
            m = re.search(rf"\*\*{re.escape(name)}\*\* \| (.+)", body)
            return strip_field(m.group(1)) if m else ""
        desc_m = re.search(r"\*\*Descrição:\*\* (.+?)(?=\n---|\n## |\Z)", body, re.S)
        f2fs[fid] = {
            "section": field("Seção"),
            "source": field("Source vídeo"),
            "frames": field("Frame count"),
            "pin": field("Scroll pin vh"),
            "fps": field("Extract fps"),
            "desc": desc_m.group(1).strip() if desc_m else "",
        }
    return f2fs


def img_for_section(sec_key, imgs):
    ids = SECTION_ASSETS.get(sec_key, {}).get("img", [])
    return [(i, imgs[i]) for i in ids if i in imgs]


def render_svg(sid, svgs):
    s = svgs.get(sid, {})
    if not s:
        return f"- **{sid}** — ver `svg-specs.md`"
    return (
        f"- **{sid}** `{s['file']}` — {s['tipo']} · Seções: {s['section']} · "
        f"Plugin: {s['plugin']}"
    )


def render_react(rid, react):
    r = react.get(rid, {})
    if not r:
        return f"- **{rid}** — ver `react-components.md`"
    detail = f" · {r['detail']}" if r.get("detail") else ""
    return f"- **{rid}** `{r.get('name', '')}`{detail}"


def render_mockup(mid, mocks):
    m = mocks.get(mid, {})
    lines = [f"#### {mid}"]
    if m.get("tipo"):
        lines.append(f"- **Tipo:** {m['tipo']}")
    if m.get("output"):
        out = m["output"]
        if not out.startswith("assets/"):
            out = f"mockups/{out}" if not out.startswith("mockups/") else out
        lines.append(f"- **Output:** `assets/nv5/{out.lstrip('assets/nv5/')}`")
    if m.get("uso"):
        lines.append(f"- **Uso:** {m['uso']}")
    if m.get("componente"):
        lines.append(f"- **Componente:** {m['componente']}")
    if m.get("conteudo"):
        lines.append(f"- **Conteúdo PT-BR:** {m['conteudo']}")
    if m.get("camadas"):
        lines.append("- **Camadas Pillow:**")
        for layer in m["camadas"]:
            lines.append(f"  {layer}")
    if len(lines) == 1:
        lines.append("- ver `mockups-device.md`")
    return "\n".join(lines)


def render_keyframe(kid, keys):
    k = keys.get(kid, {})
    if not k:
        return kid
    desc = k.get("prompt", "")[:280]
    file_part = f" · `{k['file']}`" if k.get("file") else ""
    return f"{kid}{file_part} — {desc}{'…' if len(k.get('prompt', '')) > 280 else ''}"


def main():
    imgs = parse_flux_images()
    vids = parse_videos()
    f2f = parse_f2f()
    svgs = parse_svgs()
    react = parse_react()
    mocks = parse_mockups()
    keys = parse_keyframes()

    lines = [
        "# KORUVISION FlowIA — Asset Map Master",
        "## Fonte única da verdade · Produção · Design · Motion · Dev",
        "",
        "> **Versão:** 5.0 · Névoa Neural · S01–S19  ",
        "> **Path output:** `assets/nv5/`  ",
        "> **Status binários:** ver `docs/KORUVISION-Production-Delivery-Status.md`",
        "",
        "---",
        "",
        "## Índice",
        "",
        "- [Global](#global)",
    ]
    for k in SECTIONS:
        lines.append(f"- [{k} — {SECTIONS[k]['title']}](#{k.lower()})")
    lines += [
        "- [Totais](#totais)",
        "- [Prefixo FLUX global](#prefixo-flux-global)",
        "",
        "---",
        "",
        "<a name=\"global\"></a>",
        "## GLOBAL — Ativos transversais",
        "",
        "### Regras globais",
        "- **Data River** NV5-SVG-001: DrawSVG 0→100% scroll · cor interpolada violet→danger→heal→gold",
        "- **Atmosphere:** IMG-048 grain 4% · fog canvas · grid SVG-002",
        "- **Nav progress:** SVG-027 · MagneticButton R-004 em todos CTAs primários",
        "- **Logo:** `assets/refs/koruvision-logo-master.png` — nunca IA",
        "",
        "### Imagens global",
        "",
    ]

    for img_id in SECTION_ASSETS["GLOBAL"]["img"]:
        im = imgs.get(img_id, {})
        lines += [
            f"#### {img_id} · `{im.get('file','')}`",
            f"- **Função:** Film grain tile · overlay 4% multiply todas seções",
            f"- **Ratio:** {im.get('ratio','')}",
            f"- **Reutilização:** Global exclusivo",
            f"- **Prompt completo:** {im.get('prompt_full', GLOBAL_PREFIX)}",
            "",
        ]

    lines += ["### SVG global", ""]
    svg_global = [
        ("NV5-SVG-001", "data-river-global.svg", "Path neural S01→S19", "DrawSVG master"),
        ("NV5-SVG-002", "grid-perspective.svg", "Chão perspectiva S01/S04", "DrawSVG + parallax"),
        ("NV5-SVG-022", "divider-glow.svg", "Separadores capítulo", "DrawSVG fade"),
        ("NV5-SVG-027", "nav-progress.svg", "Barra progresso nav", "DrawSVG scroll"),
        ("NV5-SVG-028", "cursor-trail.svg", "Decor cursor desktop", "CSS only"),
    ]
    for sid, fn, fn2, pl in svg_global:
        lines.append(render_svg(sid, svgs) or f"- **{sid}** `{fn}` — {fn2} · Plugin: {pl}")

    lines += ["", "### React global", ""]
    for r in SECTION_ASSETS["GLOBAL"]["react"]:
        lines.append(render_react(r, react))

    lines += ["", "---", ""]

    for sec_key, meta in SECTIONS.items():
        assets = SECTION_ASSETS.get(sec_key, {})
        gsap = GSAP_SPEC.get(sec_key, {})
        anchor = sec_key.lower()
        lines += [
            f"<a name=\"{anchor}\"></a>",
            f"## {sec_key} — {meta['title']}",
            "",
            f"| Campo | Valor |",
            f"|-------|-------|",
            f"| Slug | `{meta['slug']}` |",
            f"| Ato narrativo | {meta['ato']} |",
            f"| Pin scroll | {meta['pin']} |",
            f"| Headline | ver `KORUVISION-Sections-v5.md` |",
            "",
            "### Regras de uso",
            f"{USAGE_RULES.get(sec_key, '')}",
            "",
            "### 1. Imagens",
            "",
        ]

        section_imgs = img_for_section(sec_key, imgs)
        if not section_imgs:
            lines.append("*Sem imagens FLUX dedicadas — UI/React/depth only.*")
            lines.append("")
        else:
            for img_id, im in section_imgs:
                lines += [
                    f"#### {img_id} · `{im['file']}`",
                    f"| Campo | Valor |",
                    f"|-------|-------|",
                    f"| Tipo | Background / ilustração / parallax / overlay |",
                    f"| Ratio | `{im['ratio']}` |",
                    f"| Função | {im['section']} |",
                    f"| Reutilização | Exclusivo seção (salvo nota parallax) |",
                    f"| Path | `assets/nv5/images/{im['file']}` |",
                    "",
                    "**Descrição visual:**",
                    im["prompt_unique"][:500] + ("…" if len(im["prompt_unique"]) > 500 else ""),
                    "",
                    "**Prompt completo FLUX.2:**",
                    "```",
                    im["prompt_full"] or GLOBAL_PREFIX,
                    "```",
                    "",
                ]

        if assets.get("mock"):
            lines += ["### Mockups / UI (React — não FLUX)", ""]
            for m in assets["mock"]:
                lines.append(render_mockup(m, mocks))
                lines.append("")

        section_keys = assets.get("key", [])
        if section_keys:
            lines += ["### Keyframes I2V (FLUX → Kling)", ""]
            for kid in section_keys:
                k = keys.get(kid, {})
                lines += [
                    f"#### {kid} · `{k.get('file', '')}`",
                    f"- **Vídeo:** {k.get('video', '—')}",
                    f"- **Momento:** {k.get('momento', '—')}",
                    f"- **Path:** `assets/nv5/keyframes/{k.get('file', '')}`",
                    "",
                    "**Prompt FLUX keyframe:**",
                    "```",
                    f"{GLOBAL_PREFIX} {k.get('prompt', '')}".strip(),
                    "```",
                    "",
                ]

        lines += ["### 2. Vídeos", ""]
        if not assets.get("vid"):
            lines.append("*Nenhum vídeo Kling dedicado — F2F segment reuse ou estático.*")
            lines.append("")
        else:
            for vid_id in assets["vid"]:
                v = vids.get(vid_id, {})
                vtype = "Loop cinematográfico" if "loop" in v.get("duration", "").lower() else (
                    "Transição" if "→" in v.get("section", "") else (
                        "Hero background" if "ambient" in v.get("section", "").lower() or vid_id == "NV5-VID-015"
                        else "CTA / narrativo"
                    )
                )
                if vid_id in ("NV5-VID-014",):
                    vtype = "CTA final pull-out"
                if vid_id in ("NV5-VID-001",):
                    vtype = "Hero portal narrativo"
                ks = v.get("key_start", "")
                ke = v.get("key_end", "")
                ks_desc = render_keyframe(ks.split()[0] if ks else "", keys) if ks else "—"
                ke_desc = render_keyframe(ke.split()[0] if ke else "", keys) if ke else "—"
                lines += [
                    f"#### {vid_id} · `{vid_id.lower()}.mp4`",
                    f"| Campo | Valor |",
                    f"|-------|-------|",
                    f"| Tipo | {vtype} |",
                    f"| Duração | {v.get('duration', '')} |",
                    f"| Frame inicial | {ks_desc} |",
                    f"| Frame final | {ke_desc} |",
                    f"| F2F extract | {v.get('f2f', '—')} |",
                    f"| Path | `assets/nv5/videos/{vid_id.lower()}.mp4` |",
                    "",
                    "**Direção de movimento:** ver `video-storyboards.md` · seção " + vid_id,
                    "",
                    "**Prompt completo Kling:**",
                    "```",
                    v.get("prompt", "ver kling-videos.md")[:3000],
                    "```",
                    "",
                ]

        lines += ["### 3. Sequências Frame-by-Frame", ""]
        if not assets.get("f2f"):
            lines.append("*Sem F2F — seção estática ou MP4 chapter mobile.*")
            lines.append("")
        else:
            for fid in assets["f2f"]:
                f = f2f.get(fid, {})
                lines += [
                    f"#### {fid}",
                    f"| Campo | Valor |",
                    f"|-------|-------|",
                    f"| Seção | {f.get('section', sec_key)} |",
                    f"| Source | {f.get('source', '')} |",
                    f"| Frames | {f.get('frames', '')} |",
                    f"| FPS extract | {f.get('fps', '')} |",
                    f"| Pin vh | {f.get('pin', meta['pin'])} |",
                    f"| Canvas layer | L10 · `FrameScrubber` NV5-R-008 |",
                    f"| Path | `assets/nv5/f2f/{fid}/frame_NNNN.webp` |",
                    "",
                    f"**Objetivo:** {f.get('desc', '')}",
                    "",
                    "**Integração ScrollTrigger:**",
                    f"- `ScrollTrigger.create({{ trigger: '#{meta['slug']}-pin', scrub: {gsap.get('scrub', 1.0)}, onUpdate: (s) => f2fScrubber.seek(s.progress) }})`",
                    "- Lazy: preload sequência N+1 · unload N-2",
                    "- Mobile tier: MP4 chapter ou desligado",
                    "",
                ]

        if assets.get("svg"):
            lines += ["### SVG animados", ""]
            for sid in assets["svg"]:
                lines.append(render_svg(sid, svgs))
            lines.append("")

        if assets.get("react"):
            lines += ["### Componentes React", ""]
            for rid in assets["react"]:
                lines.append(render_react(rid, react))
            lines.append("")

        lines += ["### 4. Animações GSAP", ""]
        if gsap:
            lines += [
                f"| Item | Especificação |",
                f"|------|---------------|",
                f"| Timeline | `{gsap.get('timeline', '')}` |",
                f"| ScrollTrigger pin | `{gsap.get('pin', meta['pin'])}` |",
                f"| Scrub | {gsap.get('scrub', '—')} |",
                f"| Snap | {gsap.get('snap', '—')} |",
                f"| Protagonista | {gsap.get('protagonist', '')} |",
                f"| Plugins | {', '.join(gsap.get('plugins', []))} |",
                "",
                "**BUILD (12–48%):** " + gsap.get("build", ""),
                "",
                "**PEAK (48–72%):** " + gsap.get("peak", ""),
                "",
                "**EXIT (82–100%):** " + gsap.get("exit", ""),
                "",
                "**Microinterações:** " + gsap.get("micro", ""),
                "",
                "**Hover:** " + gsap.get("hover", ""),
                "",
            ]

        lines += ["---", ""]

    lines += [
        "<a name=\"totais\"></a>",
        "## Totais consolidados",
        "",
        "| Categoria | Quantidade |",
        "|-----------|------------|",
        "| Imagens FLUX NV5-IMG | 48 |",
        "| Keyframes NV5-KEY | 30 |",
        "| Vídeos NV5-VID | 15 |",
        "| Sequências F2F | 16 (1.930 frames) |",
        "| SVG NV5-SVG | 28 |",
        "| Mockups NV5-M | 10 |",
        "| React NV5-R | 38 |",
        "",
        "<a name=\"prefixo-flux-global\"></a>",
        "## Prefixo FLUX global",
        "",
        "Prepended to every NV5-IMG and NV5-KEY prompt:",
        "",
        "```",
        GLOBAL_PREFIX,
        "```",
        "",
        "---",
        "",
        "*Gerado por `scripts/build_asset_map_master.py` · Referências: `assets/prompts/v5/*`*",
    ]

    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Written {OUT} ({len(lines)} lines, {OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
