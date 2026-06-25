# KORUVISION x FlowIA — DIRETRIZ MASTER v4.0
## Experiência Híbrida Máxima · GSAP + Vídeo + F2F · Cinematográfica Total

> **Substitui a filosofia "menos vídeo" da v3.**  
> Nova regra: **máximo potencial GSAP + vídeo juntos**, organizado e performático.  
> v3 permanece válida em: Motion System (BUILD/PEAK/EXIT), Depth System, narrativa contínua.

---

# REGRA PRINCIPAL

Não economizar animações nem vídeos por padrão.

Criar a **melhor experiência visual possível**, com performance **excelente** (não minimalista).

| Prioridade | Ordem |
|------------|-------|
| 1 | Clareza + conversão (UI legível no PEAK) |
| 2 | Performance excelente (lazy, tiers, não remover efeitos) |
| 3 | Impacto visual máximo |
| 4 | Manutenção razoável |

**A página deve parecer viva do início ao fim.**

---

# PARTE I — FILOSOFIA HÍBRIDA

## O que queremos em abundância

- Muito GSAP · Muito vídeo · Muito motion design
- Muitas microinterações · Muitas camadas de profundidade
- Muitas transformações · Muito storytelling visual
- Muito efeito descoberta · Muito efeito "wow"

## O que NÃO queremos

- Landing minimalista ou "demo técnica sem alma"
- Vídeo solto desconectado (Frame → Vídeo → Frame sem ponte)
- UI legível gerada por IA em frames
- Carregar 16MB de F2F de uma vez

## Equilíbrio inteligente

```
COMPLEXIDADE VISUAL ALTA  +  ORQUESTRAÇÃO ESTRITA  +  LAZY LOADING  =  Premium sustentável
```

---

# PARTE II — STACK DE 10 CAMADAS (POR SEÇÃO)

Cada seção pinned pode combinar **simultaneamente**:

| # | Camada | Tecnologia | Função |
|---|--------|------------|--------|
| L1 | Vídeo cinematográfico | Kling MP4 / loop WebM | Ambiente, energia, atmosfera |
| L2 | GSAP UI | React + ScrollTrigger scrub | Produto legível, montagem |
| L3 | SVG vivo | DrawSVG, MorphSVG | Fluxos, conexões, data-river |
| L4 | Partículas | Canvas 2D / WebGL tier A | Energia, IA, dados |
| L5 | Parallax | ScrollSmoother + data-speed | Profundidade scroll |
| L6 | Fake 3D | CSS preserve-3d + translateZ | Mockup, CRM, dashboards |
| L7 | Mouse | Observer, magnetic, glow | Descoberta, exploração |
| L8 | Hover | Tilt, depth, live graphs | Microinterações premium |
| L9 | Motion graphics | GSAP timelines, SplitText | Headlines, counters |
| L10 | F2F scrub | MP4→WebP→Canvas→ST | Transições épicas, câmera |

**Nem toda seção usa as 10.** Seções racional (S17–S18) usam 3–4 camadas. Hero, Bridge, Demo, CTA usam 8–10.

---

# PARTE III — GSAP COMO SISTEMA NERVOSO

## Plugins — uso intensivo

| Plugin | Papel global |
|--------|--------------|
| ScrollTrigger | Pin, scrub, snap, horizontal, batch — **todas** |
| ScrollSmoother | Desktop — fluidez entre seções |
| Flip | Continuidade DOM entre estados/seções |
| MorphSVG | Transformações orgânicas |
| MotionPath | Cards, órbitas, partículas em path |
| SplitText | Headlines cinematográficas |
| Observer | Mouse, pause off-screen, peak explore |
| DrawSVG | Data-river global, workflows, escudo |
| Draggable + Inertia | Sliders, galleries (desktop) |
| ScrollToPlugin | Nav âncoras |
| matchMedia | desktop / tablet / mobile-reduced |
| Nested Timelines | Master TL + TL por seção + TL por ato |

## Master Timeline Global

```
masterTL (scrub 0–100% página)
├── label: S01 … S19
├── dataRiver.progress → masterTL.progress
├── cameraRig shared vars
└── nested: s04ActsTL (5 atos), s03TunnelTL, etc.
```

## Motion System (herdado v3)

BUILD (0–48%) → PEAK (48–72%) → EXIT (72–100%) por ato/seção pinned.  
Durante PEAK: UI legível + hover explore ativo.

---

# PARTE IV — VÍDEO COMO CAMADA NARRATIVA

## Vídeos NÃO são só decoração

Participam da história:

- Ambientes cinematográficos
- Transições épicas entre atos
- Fluxos de energia / IA / neural
- Crescimento, automações, fluxos empresariais
- Profundidade (BG layer com parallax)

## Pipeline vídeo

```
Kling I2V (keyframes FLUX) → MP4 master
├── Uso A: loop ambiente (muted, L1)
├── Uso B: extract F2F → WebP sequence → Canvas scrub (L10)
└── Uso C: transição pontual entre seções (crossfade GSAP)
```

## Catálogo de vídeos (expandido v4)

| ID | Seção | Duração | Uso |
|----|-------|---------|-----|
| V-01 | S01 Hero | 8s loop | Ambiente void + partículas |
| V-02 | S01 Hero | 6s | F2F source — portal entrada |
| V-03 | S01→S02 | 4s | Transição tensão |
| V-04 | S03 Bridge | 6s | Túnel luz + F2F |
| V-05 | S04 Demo | 8s | Transições entre atos UI |
| V-06 | S04 Demo | 5s | Energia IA entre telas |
| V-07 | S05 Setup | 5s | QR / conexão |
| V-08 | S08 Funil | 4s | Card voo cinematic |
| V-09 | S09 Auto | 6s | Pipeline energia |
| V-10 | S11 Antes/Depois | 5s | Morph caos/controle BG |
| V-11 | S13 Social | 6s loop | Growth ambient |
| V-12 | S14 Orbita | 5s loop | Espaço integrações |
| V-13 | S15 Agência | 5s | Portal warp |
| V-14 | S19 CTA | 8s loop | Convergência ouro |
| V-15 | S19 CTA | 6s | F2F pull-out épico |

**Total: ~15 clipes Kling** + loops onde indicado.

---

# PARTE V — FRAME-BY-FRAME (EXPANDIDO)

## Pipeline obrigatório

```
MP4 (Kling ou export) → FFmpeg extract → WebP q82 → Canvas drawImage → GSAP ScrollTrigger scrub
```

Preload: **seção atual + próxima** apenas. Descarregar seções >2 atrás.

## Orçamento F2F v4 (desktop)

| Seção | Frames | Uso |
|-------|--------|-----|
| S01 Hero | 150 | Portal push-in, void depth |
| S02 Problema | 100 | 4 micro-cenas stress |
| S03 Bridge | 180 | Fly-through túnel |
| S04 Demo | 500 | 5 transições entre atos + depth |
| S05 Setup | 120 | Monolitos + QR |
| S06 Agentes | 80 | Comparativo scrub |
| S07 Inbox | 60 | Wake-up intro |
| S08 Funil | 60 | Card journey moments |
| S09 Automações | 120 | Pipeline draw + energy |
| S10 Benefícios | 40 | Agency card |
| S11 Antes/Depois | 100 | Scrub morph |
| S12 Cases | 120 | 5×24f por vertical |
| S13 Social | 60 | Growth BG |
| S15 Agência | 70 | Portal warp |
| S16 Segurança | 50 | Escudo build |
| S19 CTA | 120 | Convergência épica |
| **TOTAL** | **~1.850** | ~22MB lazy (nunca tudo junto) |

Meta: **≤4MB em memória** por momento (seção ativa + preload).

---

# PARTE VI — PROFUNDIDADE CINEMATOGRÁFICA

## 6 planos espaciais (Depth System v1 expandido)

| Plano | Z aprox | Conteúdo |
|-------|---------|----------|
| Background | -500 | Void image + vídeo L1 |
| Atmosphere | -300 | Fog, grid-floor, orbs far |
| Midground | -100 | Glow, river SVG, partículas |
| Device / Stage | +50–120 | Mockup stack |
| UI layers | +20–80 | Status, header, content, cards |
| Foreground | +140–200 | Float panels, chips, tooltips |

Cada plano: parallax scroll `factor` + parallax mouse `depth × 0.04`.

## Fake 3D avançado — produto SaaS

CRM, Inbox, Kanban, Agenda, Dashboard:

- `preserve-3d` em cada módulo
- Colunas Kanban em `translateZ` diferente
- Camera push/pull no scroll entre atos
- Orbit leve no PEAK (Observer)

Referência implementada: `demo/s04.html` (depth stack + peak explore).

---

# PARTE VII — HOVER SYSTEMS (MÁXIMO)

Quase todo elemento importante reage:

| Sistema | Elementos | Seções |
|---------|-----------|--------|
| MagneticButton | CTAs | Global |
| MouseGlow | Stage | S01, S04, S19 |
| TiltCard | Cards | S02, S10, S12, S17 |
| DepthHover | Mockup layers | S04, S07, S08 |
| LiveGraph | Barras, métricas | S04, S08, S13 |
| FloatPanel hover | Mini painéis | S04, S07 |
| OrbitZoom | Logos | S14 |
| FlipToggle | Preços | S17 |

Mobile: tap feedback + scroll; sem magnetic/glow.

---

# PARTE VIII — TABELA MESTRA 19 SEÇÕES v4

Legenda camadas: ● = ativo | ○ = leve | — = não

| # | Seção | L1 Video | L2 GSAP/React | L3 SVG | L4 Part. | L5 Para | L6 3D | L7 Mouse | L8 Hover | L9 Motion | L10 F2F | Pin vh |
|---|-------|----------|---------------|--------|----------|---------|-------|----------|----------|-----------|---------|--------|
| S01 | Hero | ● V-01 | ● | ● | ● | ● | ● | ● | ● | ● | ● 150f | 400 |
| S02 | Problema | ○ V-03 | ● | ○ | ○ | ● | ● | ● | ● | ● | ● 100f | 280 |
| S03 | Bridge | ● V-04 | ● | ● | ● | ● | ● | ● | ○ | ● | ● 180f | 350 |
| S04 | Demo | ● V-05/06 | ● | ● | ○ | ● | ● | ● | ● | ● | ● 500f | 620 |
| S05 | Setup | ● V-07 | ● | ● | ○ | ● | ● | ● | ● | ● | ● 120f | 360 |
| S06 | Agentes | ○ | ● | ○ | — | ● | ○ | ● | ● | ● | ● 80f | 300H |
| S07 | Inbox | ○ | ● | ● | ○ | ● | ● | ● | ● | ● | ● 60f | 280 |
| S08 | Funil | ● V-08 | ● | ○ | ● | ● | ● | ● | ● | ● | ● 60f | 320 |
| S09 | Automações | ● V-09 | ● | ● | ● | ● | ○ | ● | ● | ● | ● 120f | 300 |
| S10 | Benefícios | — | ● | ○ | — | ● | ○ | ● | ● | ● | ○ 40f | — |
| S11 | Antes/Depois | ● V-10 | ● | ○ | — | ● | ● | ● | ● | ○ | ● 100f | 280 |
| S12 | Cases | — | ● | — | ○ | ● | ● | ● | ● | ● | ● 120f | 350H |
| S13 | Social | ● V-11 | ● | ○ | ● | ○ | — | ● | ○ | ● | ● 60f | — |
| S14 | Integrações | ● V-12 | ● | ● | ○ | ● | ● | ● | ● | ● | — | 280 |
| S15 | Agência | ● V-13 | ● | ○ | ● | ● | ● | ● | ● | ● | ● 70f | 300 |
| S16 | Segurança | — | ● | ● | ○ | ○ | ○ | ○ | ○ | ● | ● 50f | — |
| S17 | Planos | — | ● | — | — | ○ | — | ○ | ● | ● | — | — |
| S18 | FAQ | — | ● | — | — | — | — | — | ○ | ○ | — | — |
| S19 | CTA | ● V-14/15 | ● | ● | ● | ● | ● | ● | ● | ● | ● 120f | 350 |

H = scroll horizontal pinned.

---

# PARTE IX — S04 DEMO (REFERÊNCIA + UPGRADE v4)

**Estado atual `demo/s04.html`:** GSAP + depth 6 planos + peak explore + MotionPath + floats.  
**Upgrade v4 S04:**

1. Canvas F2F scrub entre 5 atos (500f) **sobre** UI React no EXIT de cada ato
2. V-05 vídeo energia entre transições (blend mode screen, 30% opacity)
3. Flip chip → agentCard (continuidade DOM)
4. ScrollSmoother wrapper global
5. Snap nos 5 labels PEAK

---

# PARTE X — PERFORMANCE (SEM CORTAR EFEITOS)

## Estratégias

| Técnica | Como |
|---------|------|
| Lazy F2F | Carregar sequência por seção |
| Preload | N+1 seção apenas |
| Video | `preload="metadata"`, loops H.265/WebM |
| Canvas | Um canvas ativo por vez |
| will-change | Só stage pinned ativo |
| matchMedia | 3 tiers: full / reduced / minimal |
| Off-screen | Observer pause vídeos/partículas |
| Mobile | MP4 capítulo por seção OU GSAP simplificado |

## Metas

| Métrica | Desktop | Mobile |
|---------|---------|--------|
| LCP | < 2.8s | < 3.2s |
| INP | < 200ms | < 250ms |
| FPS scroll | ≥ 55 | ≥ 50 |
| Memória F2F | ≤ 4MB ativo | ≤ 1.5MB |

---

# PARTE XI — CUSTO FERRAMENTAS v4 (DIY)

| Item | USD est. |
|------|----------|
| FLUX.2 imagens (40+) | 8–15 |
| Kling clipes (~15) | 25–40 |
| FFmpeg local | 0 |
| GSAP Club (opcional) | 99/ano |
| **Total produção assets** | **$35–55** |

---

# PARTE XII — ARQUITETURA NEXT.JS

```
app/
  layout.tsx              # ScrollSmoother wrapper
  page.tsx                # 19 sections
components/
  motion/
    VideoLayer.tsx        # L1
    FrameScrubber.tsx     # L10 Canvas+F2F
    DepthStage.tsx        # L6 stack
    ParticleField.tsx     # L4
    DataRiver.tsx         # L3 DrawSVG
    MagneticButton.tsx    # L8
    PeakExplore.tsx       # L7
  sections/ S01–S19.tsx
lib/gsap/
  register.ts
  master-timeline.ts
  motion-system.ts        # BUILD/PEAK/EXIT
  match-media.ts
```

---

# PARTE XIII — 15 MOMENTOS WOW v4

1. Portal Hero F2F + vídeo void  
2. Cards dor Flip → pilares S03  
3. Túnel vídeo + F2F + MorphSVG S03  
4. Camera mergulha WhatsApp + floats S04  
5. F2F transição ato IA → Kanban S04  
6. Card MotionPath + vídeo energia S08  
7. Pipeline DrawSVG + partículas + vídeo S09  
8. Slider F2F caos/controle S11  
9. Dolly horizontal depth S12  
10. Órbita 3D + vídeo loop S14  
11. Portal Flip agência S15  
12. Data-river 0–100% global  
13. Escudo MorphSVG build S16  
14. Convergência SplitText + shockwave S19  
15. Cursor glow + magnetic CTA global  

---

# HIERARQUIA DE DOCUMENTOS

| Doc | Status |
|-----|--------|
| **v4 (este)** | Fonte da verdade — filosofia híbrida máxima |
| v3 | Narrativa contínua, anti-corte Frame/Vídeo/Frame |
| Motion System | BUILD/PEAK/EXIT |
| Depth System | Stack Z espacial |
| Motion Upgrade Analysis | Interações + plugins |
| Cinematic Upgrade v1 | Orçamento F2F detalhado (atualizar para v4) |

---

*Diretriz Master v4 — Máximo GSAP + Máximo Vídeo · Organizado · Premium · Jun 2026*
