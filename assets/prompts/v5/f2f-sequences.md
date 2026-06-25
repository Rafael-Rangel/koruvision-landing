# NV5 — Frame-by-Frame Sequences · L10 Canvas Scrub

> **Pipeline:** MP4 Kling → FFmpeg extract → WebP q82 → Canvas `drawImage` → GSAP ScrollTrigger scrub  
> **Camada:** L10 (F2F scrub) — ver `docs/KORUVISION-Master-Directive-v4.md`  
> **Orçamento desktop:** ~1.930 frames nominal (meta doc v4: ~1.850) · lazy load seção atual + N+1 · ≤4MB memória ativa

## Config extract

```bash
# Padrão scroll (maioria das seções)
ffmpeg -i NV5-VID-XXX.mp4 -vf "fps=FRAME_RATE,scale=1920:-1" -q:v 82 frame_%04d.webp

# Hero / Bridge alta qualidade
ffmpeg -i NV5-VID-001.mp4 -vf "fps=25,scale=2560:-1" -q:v 80 frame_%04d.webp
```

**Naming output:** `assets/f2f/NV5-F2F-XXX/frame_%04d.webp`

---

## NV5-F2F-001 — S01 Hero

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-001 |
| **Seção** | S01 Hero |
| **Source vídeo** | NV5-VID-001 |
| **Frame count** | 150 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 400 |
| **Extract fps** | 25fps (full 6s clip) |

**Descrição:** Portal push-in épico — névoa violeta parte, anéis cyan do gateway neural pulsam, câmera atravessa threshold com filamentos de dados. Scrub 0% = abismo wide; 100% = atravessou portal, void luminoso à frente. Sincronizar com BUILD (0–48%) e EXIT (72–100%) do Motion System. Combinar com L1 loop NV5-VID-015 em parallax -300Z.

---

## NV5-F2F-002 — S02 Problema

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-002 |
| **Seção** | S02 Problema |
| **Source vídeo** | NV5-VID-002 |
| **Frame count** | 100 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 280 |
| **Extract fps** | 25fps |

**Descrição:** 4 micro-cenas de stress (25f cada) extraídas da transição S01→S02 — ordem caos→instabilidade: (1) filaments cyan estagnados, (2) danger-fog invade bordas, (3) painéis vidro em ângulos caóticos, (4) névoa espessa pulso vermelho. Scrub por card de dor via `data-f2f-offset` ou segmentos em timeline GSAP. Sem texto legível nos frames.

---

## NV5-F2F-003 — S03 Bridge

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-003 |
| **Seção** | S03 Bridge |
| **Source vídeo** | NV5-VID-003 |
| **Frame count** | 180 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 350 |
| **Extract fps** | 30fps |

**Descrição:** Fly-through túnel de orbs — scrub contínuo caos vermelho → ordem cyan-gold. Frames 0–60: orbs instáveis danger-fog. 60–120: cascata transformação diagonal. 120–180: túnel sincronizado, aceleração para void ordenado. Full-bleed sob MorphSVG pilares. Pin 350vh com Flip cards dor → pilares no PEAK.

---

## NV5-F2F-004 — S04 Demo

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-004 |
| **Seção** | S04 Demo |
| **Source vídeo** | NV5-VID-004 + NV5-VID-005 |
| **Frame count** | 500 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 620 |
| **Extract fps** | 35fps (VID-004) + 44fps (VID-005) |

**Descrição:** 5 transições entre atos da demo (100f cada) sobre UI React no EXIT de cada ato:

| Ato | Frames | Source | Momento |
|-----|--------|--------|---------|
| 1→2 | 0–99 | VID-004 | Mergulho WhatsApp abstrato → núcleo IA |
| 2→3 | 100–199 | VID-004 | IA processa → colunas Kanban |
| 3→4 | 200–299 | VID-004/005 | Crossfade Kanban → anel agenda |
| 4→5 | 300–399 | VID-005 | Agenda gold pulse → dashboard wide |
| 5 hold | 400–499 | VID-005 | Pull-back métricas ascendentes |

Canvas F2F com `mix-blend-mode: screen` sobre stage 3D. Vídeo energia L1 opcional 30% opacity entre transições.

---

## NV5-F2F-005 — S05 Setup

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-005 |
| **Seção** | S05 Como funciona |
| **Source vídeo** | NV5-VID-006 |
| **Frame count** | 120 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 360 |
| **Extract fps** | 24fps |

**Descrição:** Monolitos de vidro + scan QR abstrato — 0–40f: grid cyan aparece no monolito esquerdo. 40–80f: feixe gold varre → explosão verde conexão. 80–120f: três monolitos linkados por rio de dados gold. Sincronizar SplitText nos números gigantes (React, não nos frames).

---

## NV5-F2F-006 — S06 Agentes

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-006 |
| **Seção** | S06 Agentes IA |
| **Source vídeo** | NV5-VID-002 (segmento reutilizado) |
| **Frame count** | 80 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 300H |
| **Extract fps** | 20fps |

**Descrição:** Comparativo scrub no toggle — 0–40f: lado caos (danger-fog, filaments erráticos, extraído de VID-002 instabilidade). 40–80f: lado controle (cyan ordenado, gold rim estável — segmento pós-transformação de VID-003). Scroll horizontal pinned. UI chat React no PEAK.

---

## NV5-F2F-007 — S07 Inbox

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-007 |
| **Seção** | S07 Inbox |
| **Source vídeo** | NV5-VID-001 (segmento macro) |
| **Frame count** | 60 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 280 |
| **Extract fps** | 15fps |

**Descrição:** Wake-up intro — 0–20f: void escuro, névoa mínima. 20–40f: primeiro pulso cyan (ping neural). 40–60f: interface stage ilumina por baixo (crossfade para React Inbox no PEAK). Frames abstratos apenas — glow e partículas, zero UI legível.

---

## NV5-F2F-008 — S08 Funil

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-008 |
| **Seção** | S08 Funil |
| **Source vídeo** | NV5-VID-007 |
| **Frame count** | 60 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 320 |
| **Extract fps** | 15fps |

**Descrição:** Card journey cinematic — scrub nos snap de cada coluna do funil (15f × 4 gates). Card de vidro cyan percorre anéis gold; confetti no frame 45–60. MotionPath React no PEAK; F2F apenas nos momentos de transição entre colunas.

---

## NV5-F2F-009 — S09 Automações

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-009 |
| **Seção** | S09 Automações |
| **Source vídeo** | NV5-VID-008 |
| **Frame count** | 120 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 300 |
| **Extract fps** | 20fps |

**Descrição:** Pipeline energia percorrendo nodes — sincronizado com DrawSVG progressivo. 20f por node × 6 nodes = 120f. Pacote cyan viaja, cada esfera glass acende gold rim ao receber. Partículas L4 seguem mesmo path. Vídeo L1 VID-008 em loop 40% opacity no BG.

---

## NV5-F2F-010 — S10 Benefícios

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-010 |
| **Seção** | S10 Benefícios |
| **Source vídeo** | NV5-VID-012 (segmento reduzido) |
| **Frame count** | 40 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | — (não pinned) |
| **Extract fps** | 10fps |

**Descrição:** Card agência mini-build — 40f de painéis glass montando em stack (extraído dos primeiros 3s de VID-012 sem warp portal). Ativa no accordion "Agência" ou scroll reveal. Leve — preload sob demanda.

---

## NV5-F2F-011 — S11 Antes/Depois

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-011 |
| **Seção** | S11 Antes/Depois |
| **Source vídeo** | NV5-VID-009 |
| **Frame count** | 100 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 280 |
| **Extract fps** | 20fps |

**Descrição:** Scrub morph caos→controle full-bleed — 0–50f estado caos (danger-fog, painéis desalinhados). 50–100f estado controle (grid ordenado, cyan rivers). Acoplar ao Draggable slider: `scrub.progress = slider.position`. Crossfade profundo, não wipe simples.

---

## NV5-F2F-012 — S12 Cases

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-012 |
| **Seção** | S12 Cases |
| **Source vídeo** | NV5-VID-010 + NV5-VID-011 (Ken Burns composto) |
| **Frame count** | 120 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 350H |
| **Extract fps** | 12fps |

**Descrição:** 5 verticais × 24f cada — Ken Burns sutil em cenas abstratas por case (mist + glass + filaments temáticos por cor). Scroll horizontal dolly; F2F ativa no card focado. Composto de segmentos dos loops social/orbit com color grade por vertical.

---

## NV5-F2F-013 — S13 Social

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-013 |
| **Seção** | S13 Social proof |
| **Source vídeo** | NV5-VID-010 |
| **Frame count** | 60 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | — |
| **Extract fps** | 10fps |

**Descrição:** Growth scrub BG — partículas ascendentes cyan-gold atrás dos counters GSAP. Scrub lento 0–100% da seção (não pin). Loop VID-010 em L1 simultâneo; F2F adiciona parallax extra em L10 com opacity 60%.

---

## NV5-F2F-014 — S15 Agência

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-014 |
| **Seção** | S15 Agência |
| **Source vídeo** | NV5-VID-012 |
| **Frame count** | 70 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 300 |
| **Extract fps** | 14fps |

**Descrição:** Portal warp impersonation — 0–20f: íris abre. 20–50f: warp circular através de camadas tenant (color shift). 50–70f: painéis tenant orbitam stage comando. Dispara no Flip click tenant. Circular distortion shader opcional em Canvas.

---

## NV5-F2F-015 — S16 Segurança

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-015 |
| **Seção** | S16 Segurança |
| **Source vídeo** | NV5-VID-003 (segmento hex) |
| **Frame count** | 50 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | — |
| **Extract fps** | 10fps |

**Descrição:** Escudo hex build — 50f de hex grid glass ativando progressivamente (extraído do node network de VID-003/008). Sincronizar com DrawSVG escudo e MorphSVG. Cyan pulse radial frame 40–50.

---

## NV5-F2F-016 — S19 CTA

| Campo | Valor |
|-------|-------|
| **ID** | NV5-F2F-016 |
| **Seção** | S19 CTA Final |
| **Source vídeo** | NV5-VID-014 |
| **Frame count** | 120 |
| **Canvas layer** | L10 |
| **Scroll pin vh** | 350 |
| **Extract fps** | 20fps |

**Descrição:** Pull-out épico entrada — bolhas cyan-gold convergem (0–40f macro merge), câmera revela observatório neural (40–90f), wide majestoso com god-rays (90–120f). Combinar L1 loop VID-013. SplitText headline no PEAK; shockwave SVG frame 100+. Magnetic CTA no foreground L8.

---

## Tabela resumo

| ID | Seção | Source | Frames | Pin vh |
|----|-------|--------|--------|--------|
| NV5-F2F-001 | S01 Hero | NV5-VID-001 | 150 | 400 |
| NV5-F2F-002 | S02 Problema | NV5-VID-002 | 100 | 280 |
| NV5-F2F-003 | S03 Bridge | NV5-VID-003 | 180 | 350 |
| NV5-F2F-004 | S04 Demo | NV5-VID-004/005 | 500 | 620 |
| NV5-F2F-005 | S05 Setup | NV5-VID-006 | 120 | 360 |
| NV5-F2F-006 | S06 Agentes | NV5-VID-002 | 80 | 300H |
| NV5-F2F-007 | S07 Inbox | NV5-VID-001 | 60 | 280 |
| NV5-F2F-008 | S08 Funil | NV5-VID-007 | 60 | 320 |
| NV5-F2F-009 | S09 Automações | NV5-VID-008 | 120 | 300 |
| NV5-F2F-010 | S10 Benefícios | NV5-VID-012 | 40 | — |
| NV5-F2F-011 | S11 Antes/Depois | NV5-VID-009 | 100 | 280 |
| NV5-F2F-012 | S12 Cases | NV5-VID-010/011 | 120 | 350H |
| NV5-F2F-013 | S13 Social | NV5-VID-010 | 60 | — |
| NV5-F2F-014 | S15 Agência | NV5-VID-012 | 70 | 300 |
| NV5-F2F-015 | S16 Segurança | NV5-VID-003 | 50 | — |
| NV5-F2F-016 | S19 CTA | NV5-VID-014 | 120 | 350 |
| **TOTAL** | **16 seq** | | **1.930** | |

## Lazy load map

```
S01 carrega: F2F-001 + preload F2F-002
S02 carrega: F2F-002 + preload F2F-003
…
S18 carrega: — + preload F2F-016
S19 carrega: F2F-016
```

Descarregar sequências >2 seções atrás. Meta memória: ≤4MB desktop · ≤1.5MB mobile (tier reduced: MP4 capítulos sem F2F).

---

*Orçamento alinhado a `KORUVISION-Master-Directive-v4.md` · Visual v5 Névoa Neural*
