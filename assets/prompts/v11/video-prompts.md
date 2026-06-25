# NV11 — Prompts de Vídeo (Kling 2.5)

> **Pipeline:** Kling → MP4 → (F2F) ffmpeg extract webp frames → poster webp  
> **Duração Kling:** 5s ou 10s apenas  
> **Loop-safe:** frame 0 ≈ frame final para LOOP; F2F narrativo = **não** precisa loop  
> **Output:** `public/assets/nv11/videos/` + `public/assets/nv11/posters/`

## Constantes globais

```
GLOBAL_VIDEO_SUFFIX:
KORUVISION premium dark universe, void black #010208, gold #FFC233 violet #8B5CF6 cyan #2EE8C0,
cinematic volumetric lighting, oblique camera 28 degrees, commercial quality, smooth motion,
no logos, no readable text, no people, no hands, no watermarks.

GLOBAL_VIDEO_NEGATIVE:
static image, freeze frame, text on screen, UI text, logos, watermark, people, hands,
white background, stock footage, jerky motion, visible loop cut, daylight
```

---

# PARTE A — Sequências F2F (Scroll-Controlled)

## NV11-F2F-000 — Hero: Núcleo → CRM
| Campo | Valor |
|-------|-------|
| Cena | C01 Hero |
| Frames | 72 @ 24fps |
| Duração fonte | 10s Kling |
| Pin | 360vh |
| Arquivo fonte | `nv11-vid-f2f-000-hero-core.mp4` |
| Seq pasta | `f2f/NV11-F2F-000/` |

### Roteiro cinematográfico
| Tempo | Ação |
|-------|------|
| 0.0s | Orbe fechado, filamentos retraídos, void total |
| 2.0s | Filamentos expandem; anel iris chrome acende purple rim |
| 4.0s | Core abre como mecanismo floral; luz amber irradia |
| 6.5s | Painéis holográficos brotam do core (sem texto legível) |
| 9.5s | Composição estabiliza — CRM holográfico completo em luz |
| 10.0s | Hold — flash gold central (**handoff C02**) |

### Prompt Kling (completo)
```
Cinematic scroll story: starts with closed luminous intelligence orb in absolute darkness,
golden amber core #FFC233 inside violet shell #8B5CF6, mechanical iris ring closed,
then orb slowly opens like a mechanical flower, light filaments extend outward,
holographic CRM dashboard panels materialize from light particles without readable text,
camera slow push-in 5 percent, oblique 28 degree angle, volumetric god rays,
ends with bright gold flash at center for seamless transition to owl eyes scene.
GLOBAL_VIDEO_SUFFIX
```

### Câmera / Luz / Atmosfera
- **Câmera:** Push-in lento 5%, sem pan
- **Luz:** Key superior direita; rim gold no core
- **Atmosfera:** Partículas finas, névoa violeta 15%

---

## NV11-F2F-001 — Coruja: Olhos Abrindo ★
| Campo | Valor |
|-------|-------|
| Cena | C02 Visão |
| Frames | 90 @ 25fps |
| Base existente | `nv9-vid-vision.mp4` (upgrade NV11) |
| Arquivo fonte | `nv11-vid-f2f-001-owl-eyes.mp4` |

### Roteiro
| Tempo | Ação |
|-------|------|
| 0.0s | Olhos fechados (recebe flash gold C01) |
| 1.5s | Pálpebras tremem; brilho amber interno |
| 3.5s | Olhos semi-abertos; dados refletem na pupila |
| 6.0s | Olhos abertos; iris amber intensa |
| 8.5s | Pupila contrai — foco |
| 10.0s | Olhar fixo; névoa começa na pupila (**handoff C03**) |

### Prompt Kling
```
Extreme macro mechanical owl eyes in darkness, eyelids slowly opening revealing glowing
amber iris #FFC233 with digital data reflections in pupil, chrome brow ridges with purple
neon rim #8B5CF6, volumetric mist, camera static macro, cinematic shallow depth of field,
starts eyes fully closed matching previous scene gold flash, ends eyes wide open pupil focused,
red fog begins emanating from pupil at end for transition.
GLOBAL_VIDEO_SUFFIX
```

---

## NV11-F2F-002 — Demo: CRM Despertar
| Campo | Valor |
|-------|-------|
| Cena | C05 Demo |
| Frames | 120 @ 24fps |
| Pin | 480vh |
| Arquivo | `nv11-vid-f2f-002-crm-awaken.mp4` |

### Roteiro
| Tempo | Ação |
|-------|------|
| 0.0s | Void total; ponto de luz branco central (continua C04) |
| 1.5s | Onda de luz expande; contorno de painéis surge |
| 3.5s | Colunas de pipeline aparecem como hologramas |
| 5.5s | Chat IA e métricas como formas de luz (sem texto) |
| 8.0s | CRM quase completo; partículas ativas |
| 10.0s | CRM operacional; botão inferior em glow cyan (**handoff C06**) |

### Prompt Kling
```
Cinematic CRM awakening from single point of light in void darkness, holographic glass panels
gradually assembling, sales pipeline columns appearing as light structures, AI chat area
glowing violet, metrics as abstract light bars without numbers, camera slow orbit 8 degrees,
gold and violet volumetric rays, ends with cyan glow at bottom center suggesting connect button.
GLOBAL_VIDEO_SUFFIX
```

---

## NV11-F2F-003 — Analytics: Evolução de Dados
| Campo | Valor |
|-------|-------|
| Cena | C11 Analytics |
| Frames | 96 @ 24fps |
| Arquivo | `nv11-vid-f2f-003-data-evolution.mp4` |

### Roteiro
| Tempo | Ação |
|-------|------|
| 0.0s | Um ponto de dados; gráfico quase vazio |
| 2.5s | Barras crescem; linha começa traçar |
| 5.0s | Densidade média; partículas ativas |
| 7.5s | Dashboard holográfico rico |
| 10.0s | Peak luminosidade — zoom out começa (**handoff C12**) |

### Prompt Kling
```
Holographic analytics evolution timelapse in dark void, bar chart light sculptures growing
from sparse to dense, line graph drawing itself in cyan #2EE8C0 and gold #FFC233,
abstract data points multiplying, no readable numbers or text, camera slow pull back
at end, cinematic data visualization atmosphere.
GLOBAL_VIDEO_SUFFIX
```

---

## NV11-F2F-004 — CTA: Convergência Final
| Campo | Valor |
|-------|-------|
| Cena | C19 CTA |
| Frames | 80 @ 25fps |
| Pin | 300vh |
| Arquivo | `nv11-vid-f2f-004-cta-convergence.mp4` |

### Roteiro
| Tempo | Ação |
|-------|------|
| 0.0s | Void; partículas gold dispersas (pós C18) |
| 2.5s | Rios de luz convergem ao centro |
| 5.0s | Silhueta owl abstrata em partículas |
| 7.5s | Clímax luminoso gold+violet |
| 10.0s | Hold estável para loop suave |

### Prompt Kling
```
Cinematic finale convergence, streams of liquid gold #FFC233 and violet #8B5CF6 light
flowing toward center in dark void, abstract owl silhouette forming from light particles,
god rays, rising embers, starts scattered particles ends stable luminous climax,
seamless hold at end, no text no logos.
GLOBAL_VIDEO_SUFFIX
```

---

# PARTE B — Loops Ambiente (19 cenas)

> Opacity na página: **0.12–0.22** (ambiente). Protagonista = 3D/F2F/LIVE.  
> Todos: **loop perfeito** (frame 0 = frame final)

## NV11-VID-LOOP-001 — C01 Hero ambiente
**Arquivo:** `nv11-vid-loop-001-hero-energy.mp4` · 5s
```
Golden energy pulses traveling through neural network lines in dark void, fine particles
flowing along paths, subtle breathing rhythm, seamless perfect loop, very slow motion.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-002 — C01 Hero owl breath
**Arquivo:** `nv11-vid-loop-002-owl-breath.mp4` · 5s
```
Macro owl eyes closed with subtle amber glow breathing pulse in darkness, minimal eyelid
movement, seamless loop, meditative powerful.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-003 — C03 Caos
**Arquivo:** `nv11-vid-loop-003-chaos-drift.mp4` · 5s
```
Chaotic red-tinted data particles drifting aimlessly in fog, disconnected motion,
tense atmosphere, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-004 — C04 Pilares
**Arquivo:** `nv11-vid-loop-004-pillars-pulse.mp4` · 5s
```
Four light pillars pulsing energy upward in synchronized rhythm, reflective dark floor,
gold violet, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-005 — C05 Demo interior
**Arquivo:** `nv11-vid-loop-005-demo-corridor.mp4` · 10s
```
Neural machine corridor ambient light slowly moving along glass walls, data reflections,
cinematic slow drift, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-006 — C06 Setup portais
**Arquivo:** `nv11-vid-loop-006-portals-flow.mp4` · 5s
```
Energy flowing through three gateway rings in depth, teal gold, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-007 — C07 IA neural
**Arquivo:** `nv11-vid-loop-007-neural-pulse.mp4` · 5s
```
Neural network nodes pulsing light traveling along connections, brain hub glow, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-008 — C08 Inbox streams
**Arquivo:** `nv11-vid-loop-008-inbox-streams.mp4` · 5s
```
Abstract message light streams flowing left to right in teal, communication channels, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-009 — C09 Funil orbs
**Arquivo:** `nv11-vid-loop-009-funnel-orbs.mp4` · 5s
```
Glowing orbs slowly descending through funnel stages in gold light, gravity, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-010 — C10 Sinapses
**Arquivo:** `nv11-vid-loop-010-synapse-burst.mp4` · 5s
```
Synaptic energy bursts traveling along curved filaments purple gold, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-011 — C11 Charts breathe
**Arquivo:** `nv11-vid-loop-011-charts-breathe.mp4` · 5s
```
Holographic bar chart light sculptures gently oscillating height breathing, line chart wave, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-012 — C12 Constelação
**Arquivo:** `nv11-vid-loop-012-stars-pulse.mp4` · 5s
```
Constellation nodes connected by faint pulsing lines, slow drift, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-013 — C13 Split névoa
**Arquivo:** `nv11-vid-loop-013-split-mist.mp4` · 5s
```
Left red chaos mist vs right teal order mist separated by vertical light line, subtle motion, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-014 — C14 Cases pulse
**Arquivo:** `nv11-vid-loop-014-verticals-pulse.mp4` · 5s
```
Five vertical light columns pulsing at different rhythms, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-015 — C15 Social warm (PROTAGONISTA AMBIENTE)
**Arquivo:** `nv11-vid-loop-015-trust-gather.mp4` · 10s
```
Warm gold particles slowly gathering toward center, community trust mood, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-016 — C16 Órbita
**Arquivo:** `nv11-vid-loop-016-orbit-filaments.mp4` · 5s
```
Central core emitting data filaments to orbiting light points, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-017 — C17 Portal tenants
**Arquivo:** `nv11-vid-loop-017-portal-grid.mp4` · 5s
```
Portal interior grid lights activating sequentially in loop pattern, seamless.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-018 — C18 Planos rings
**Arquivo:** `nv11-vid-loop-018-decision-rings.mp4` · 5s
```
Concentric rings expanding and contracting softly in gold violet, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

## NV11-VID-LOOP-019 — C19 CTA rivers
**Arquivo:** `nv11-vid-loop-019-gold-rivers.mp4` · 10s
```
Gold light rivers flowing toward bright center in dark void, seamless loop.
GLOBAL_VIDEO_SUFFIX
```

---

## FFmpeg — extração F2F

```bash
# Exemplo NV11-F2F-001
ffmpeg -i nv11-vid-f2f-001-owl-eyes.mp4 -vf "fps=25,scale=1920:-1" f2f/NV11-F2F-001/frame_%04d.webp

# Poster
ffmpeg -i nv11-vid-loop-001-hero-energy.mp4 -vframes 1 -q:v 80 posters/nv11-poster-loop-001.webp
```

## Checklist vídeo

- [ ] 5 F2F fonte MP4
- [ ] 19 LOOP MP4
- [ ] 24 posters webp
- [ ] 5 sequências F2F extraídas
- [ ] Loop verificado frame 0 ≈ end (loops only)
- [ ] Handoffs F2F validados contra continuity chain
