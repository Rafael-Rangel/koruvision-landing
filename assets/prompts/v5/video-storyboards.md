# NV5 — Storyboards de Vídeo (15 clipes)

> Cada vídeo: **Frame inicial · Frame intermediário · Frame final · Movimento · Config · Objetivo narrativo**

---

## NV5-VID-001 · S01 Hero Portal

| Campo | Especificação |
|-------|---------------|
| **Duração** | 6s · 24fps · 144 frames source |
| **Resolução** | 3840×2160 → deliver 1920×1080 H.265 |
| **Keyframe start** | NV5-KEY-001 |
| **Keyframe end** | NV5-KEY-002 |
| **F2F extract** | NV5-F2F-001 · 150f @ 25fps |
| **Camada** | L10 scrub + L1 loop VID-015 @ -300Z |

### Storyboard

| Beat | Tempo | Frame ref | Composição | Movimento câmera | Narrativa |
|------|-------|-----------|------------|------------------|-----------|
| 1 | 0–2s | KEY-001 | Wide abyss, god-rays, filaments distantes | Static gimbal | Escala — "universo KORUVISION" |
| 2 | 2–5s | 50% blend | Portal forma no centro, anéis cyan pulsam | Dolly push-in 1.5m suave | Convite — portal se abre |
| 3 | 5–6s | KEY-002 | Atravessa threshold, filaments rush | Aceleração leve +12% | Transição — entrar na jornada |

**Movimento detalhado:** Yaw 28° fixo · Pitch 12° · Roll 0° · Easing dolly: `power2.inOut` · Filaments: velocity blur radial

**Objetivo narrativo:** Estabelecer escala premium e convite irresistível ao scroll.

**Config Kling:** `mode: pro` · `duration: 6` · `cfg: 0.5` · `aspect: 16:9`

---

## NV5-VID-002 · S01→S02 Transição

| Campo | Especificação |
|-------|---------------|
| **Duração** | 4s · 24fps |
| **Keyframes** | KEY-003 → KEY-004 |
| **F2F** | NV5-F2F-002 · 100f (4×25f por pain card) |

### Storyboard

| Beat | Tempo | Composição | Movimento | Narrativa |
|------|-------|------------|-----------|-----------|
| 1 | 0–1.5s | Corredor ordenado cyan-gold | Drift lateral direita 40cm | Ordem ainda presente |
| 2 | 1.5–2.5s | Danger-fog invade bordas | Micro push-in | Tensão — algo quebra |
| 3 | 2.5–4s | Névoa espessa, gold dim | Pullback 30cm | Handoff para S02 |

**Objetivo:** Ponte emocional hero → problema sem corte seco.

---

## NV5-VID-003 · S03 Bridge

| Duração | 6s · KEY-005 → KEY-006 · F2F-003 180f @ 30fps |

| Beat | Tempo | Visual | Câmera | Narrativa |
|------|-------|--------|--------|-----------|
| 1 | 0–2s | Orbs vermelhos caóticos | Forward slow | Caos ainda presente |
| 2 | 2–4s | Cascata red→violet→cyan | Forward medium | Transformação |
| 3 | 4–6s | Túnel sincronizado gold | Forward fast→ease | Alívio — controle |

**Objetivo:** Alívio emocional pós-S02; preparar S04.

---

## NV5-VID-004 · S04 Demo A (atos 1–3)

| Duração | 8s · KEY-007 → KEY-008 · F2F-004 part 1 (280f) |

| Beat | Tempo | Visual | UI overlay | Narrativa |
|------|-------|--------|------------|-----------|
| 1 | 0–2.5s | Void stage + energia WhatsApp abstrata | UIWhatsApp BUILD | Lead chega |
| 2 | 2.5–5s | Núcleo IA violet pulse | UIAgentPanel | IA responde |
| 3 | 5–8s | Colunas kanban energéticas | UIKanban | Pipeline move |

**Câmera:** Interpola CAM_CONFIGS S04 atos 0→2 · scrub 2.8

---

## NV5-VID-005 · S04 Demo B (atos 4–5)

| Duração | 5s · KEY-009 → KEY-010 · F2F-004 part 2 (220f) |

| Beat | Tempo | Visual | UI | Narrativa |
|------|-------|--------|-----|-----------|
| 1 | 0–2s | Anel agenda gold | UICalendar | Agendamento |
| 2 | 2–5s | Pull-back métricas | UIDashboard | Visão negócio |

---

## NV5-VID-006 · S05 Setup

| Duração | 5s · KEY-011 → KEY-012 · F2F-005 120f |

| Beat | Tempo | Visual | Sync GSAP |
|------|-------|--------|-----------|
| 1 | 0–1.5s | Monolito 01 grid cyan | DrawSVG QR start |
| 2 | 1.5–3s | Scan line gold | QR 0→100% |
| 3 | 3–5s | Três portais linkados | Monolitos 02–03 enter |

---

## NV5-VID-007 · S08 Funil

| Duração | 4s · KEY-013 → KEY-014 · F2F-008 60f (15f/gate) |

Movimento: card desce funil isométrico · snap magnético em 4 gates gold · confetti frame 45–60.

---

## NV5-VID-008 · S09 Automações

| Duração | 6s · KEY-015 → KEY-016 · F2F-009 120f (20f/node) |

Movimento: pacote cyan percorre path SVG · nodes acendem sequencialmente.

---

## NV5-VID-009 · S11 Antes/Depois

| Duração | 5s · KEY-017 → KEY-018 · F2F-011 100f |

Movimento: morph crossfade caos→controle · sync Draggable slider progress.

---

## NV5-VID-010 · S13 Social (loop)

| Duração | 6s loop · KEY-019 · F2F-013 60f BG scrub |

Movimento: partículas ascendentes Brownian · loop seamless t=0=t=6s.

---

## NV5-VID-011 · S14 Órbita (loop)

| Duração | 5s loop · KEY-021 · L1 only (sem F2F) |

Movimento: satellites orbitam 3 anéis elípticos · core pulse 0.8–1.0 scale sine.

---

## NV5-VID-012 · S15 Agência

| Duração | 5s · KEY-023 → KEY-024 · F2F-014 70f |

| Beat | Tempo | Visual |
|------|-------|--------|
| 1 | 0–1s | Íris abre |
| 2 | 1–3.5s | Warp circular tenant layers |
| 3 | 3.5–5s | Stage comando |

---

## NV5-VID-013 · S19 CTA Ambient (loop)

| Duração | 8s loop · KEY-025 · L1 |

Partículas convergem center-right · nunca merge completo (loop-safe).

---

## NV5-VID-014 · S19 Pull-out

| Duração | 6s · KEY-027 → KEY-028 · F2F-016 120f |

| Beat | Tempo | Câmera |
|------|-------|--------|
| 1 | 0–2s | Macro bubbles |
| 2 | 2–4s | Fast pull-back |
| 3 | 4–6s | Wide observatory hold |

---

## NV5-VID-015 · S01 Hero Ambient (loop)

| Duração | 8s loop · KEY-029 · L1 @ -300Z |

Zero camera movement · só atmosfera · suporte F2F-001.

---

## Config global Replicate/Kling

```yaml
model: kling-v2.5-turbo-pro
resolution: 1080p  # ou 4K tier premium
fps: 24
motion_strength: 0.65  # 0.5 ambient, 0.75 action
seed: document per clip in ASSET-MANIFEST
negative: [flat lighting, white background, text, hands, watermark]
```
