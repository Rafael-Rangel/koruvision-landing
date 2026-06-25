# KORUVISION x FlowIA — PRODUCTION BIBLE v5
## Documento Definitivo · Pronto para Implementacao

> **Codinome visual:** NEVOA NEURAL  
> **Regra:** Zero reutilizacao de assets anteriores (I-*, D-*, s04-*, etc.)  
> **Filosofia motion:** `KORUVISION-Master-Directive-v4.md`  
> **Motion System:** BUILD 48% / PEAK 24% / EXIT 28%  
> **Prompts:** `assets/prompts/v5/`  
> **Asset Map (fonte única):** `docs/KORUVISION-Asset-Map-Master.md`

---

# INDICE

1. [Fase 1 — Estrategia e Narrativa](#fase-1)
2. [Fase 2 — Direcao de Arte](#fase-2)
3. [Fase 3 — Planejamento de Assets](#fase-3)
4. [Fase 4 — Motion Design](#fase-4)
5. [Fase 5 — 19 Secoes Completas](#fase-5)
6. [Fase 6 — Performance](#fase-6)
7. [Roadmap de Implementacao](#roadmap)

---

<a name="fase-1"></a>
# FASE 1 — ESTRATEGIA E NARRATIVA

## 1.1 Proposta de valor

**FlowIA** = CRM + IA para WhatsApp. O visitante sai entendendo: conversas viram receita previsivel.

## 1.2 Jornada emocional (5 atos)

| Ato | Secoes | Emocao | Cor dominante |
|-----|--------|--------|---------------|
| I Emergencia | S01-S02 | Curiosidade + tensao | void + danger-fog |
| II Revelacao | S03-S04 | Alivio + desejo | violet-core + cyan |
| III Maestria | S05-S11 | Controle + confianca | neural-cyan + success |
| IV Prova | S12-S16 | Validacao racional | chrome + violet |
| V Decisao | S17-S19 | Urgencia positiva | gold-liquid |

## 1.3 Fio condutor visual

**Data River** (NV5-SVG-001): path SVG DrawSVG 0-100% scroll. Nasce em S01, tropega vermelho S02, cura S03, atravessa produto S04-S15, converge ouro S19.

## 1.4 Objetivos de conversao

| CTA | Posicao scroll | Meta |
|-----|----------------|------|
| Comecar gratis | S01 15%, S04 30%, S19 55% | Trial signup |
| Ver demonstracao | S01 ghost, S04 | Scroll to S04 |
| Escolher plano | S17 | Paid conversion |

## 1.5 Hierarquia de conteudo

1. Headline (1 ideia/secao)
2. Prova visual (mockup/video/F2F)
3. Copy suporte (2-3 linhas)
4. CTA contextual
5. Microcopy confianca

---

<a name="fase-2"></a>
# FASE 2 — DIRECAO DE ARTE

Ver `docs/KORUVISION-Visual-Bible-v5.md` completo.

## Resumo NEVOA NEURAL

- **Void:** #010208 com nevo volumetrica
- **Acentos:** violet #B24BFF, gold #FFC233, cyan #2EE8C0
- **Camera:** obliqua 28°, macro alternado com wide
- **Materiais:** vidro holografico, rios de luz liquida, fibras neurais
- **Logo:** `koruvision-logo-master.png` — React/Pillow only
- **UI:** React golden screens — nunca texto em FLUX/Kling

## Sistema de profundidade (6 planos)

Z-500 void/video | Z-300 atmosphere | Z-100 glow | Z+80 device | Z+140 UI | Z+200 floats

---

<a name="fase-3"></a>
# FASE 3 — PLANEJAMENTO DE ASSETS

## Inventario total v5 (NOVOS)

| Tipo | Qtd | Arquivo manifest |
|------|-----|------------------|
| Imagens FLUX | 48 | `assets/prompts/v5/flux-images.md` |
| Keyframes FLUX | 30 | `assets/prompts/v5/kling-videos.md` (NV5-KEY-*) |
| Videos Kling | 15 | `assets/prompts/v5/kling-videos.md` |
| Sequencias F2F | 16 (~1930f) | `assets/prompts/v5/f2f-sequences.md` |
| SVG animados | 28 | `assets/prompts/v5/svg-specs.md` |
| Componentes React | 38 | `assets/prompts/v5/react-components.md` |
| Mockup device | 1 | Pillow NV5-M-01 (novo script) |

## Custo estimado Replicate DIY

| Item | USD |
|------|-----|
| 48 imgs + 30 keyframes FLUX | 12-18 |
| 15 videos Kling | 28-42 |
| **Total** | **40-60** |

---

<a name="fase-4"></a>
# FASE 4 — MOTION DESIGN GLOBAL

## 4.1 Arquitetura GSAP

```
ScrollSmoother (desktop)
└── #smooth-content
    ├── masterTL (labels S01–S19)
    │   ├── dataRiver.progress
    │   └── cameraRig vars
    └── sections[]
        ├── nestedTL per pinned section
        └── actTL[] (ex: S04 × 5 atos)
```

## 4.2 Plugins por função

| Função | Plugin | Secoes principais |
|--------|--------|-------------------|
| Scroll scrub | ScrollTrigger | Todas |
| Fluidez | ScrollSmoother | Global desktop |
| Continuidade DOM | Flip | S02→S03, S15, S17 |
| Paths organicos | MorphSVG | S03, S09, S16 |
| Trajetorias | MotionPath | S04, S07, S08, S14 |
| Texto cinematico | SplitText | S01, S05, S19 |
| Desenho | DrawSVG | Global river, S05, S09, S16 |
| Mouse | Observer | S01, S04 peak, S14, S19 |
| Drag | Draggable | S06, S11 |
| Responsive | matchMedia | Global |

## 4.3 Motion System (todas secoes pinned)

| Fase | % local | Regra |
|------|---------|-------|
| BUILD | 0–48% | Entrada staggered |
| PEAK | 48–72% | Tudo legivel + hover explore |
| EXIT | 72–100% | Transform/morph/F2F handoff |

## 4.4 Stack hibrido por intensidade

| Tier | Secoes | Camadas tipicas |
|------|--------|-----------------|
| MAX | S01,S03,S04,S19 | L1–L10 |
| HIGH | S02,S05,S08,S09,S11,S15 | L1–L8 |
| MEDIUM | S06,S07,S12,S13,S14,S16 | L2–L7 |
| LIGHT | S10,S17,S18 | L2,L5,L9 |

## 4.5 Microinteracoes globais

- MagneticButton: CTAs
- MouseGlow: S01, S04, S19 stages
- TiltCard: S02, S10, S12, S17
- LiveGraph: S04, S08, S13
- Cursor custom: desktop tier full

## 4.6 Referencia implementada

`demo/s04.html` — arquitetura S04 (atualizar assets para NV5 + F2F canvas L10).

---

<a name="fase-5"></a>
# FASE 5 — 19 SECOES COMPLETAS

**Especificacao detalhada:** `docs/KORUVISION-Sections-v5.md`

## Mapa resumo

| # | Secao | Pin | F2F | Video | Protagonista motion |
|---|-------|-----|-----|-------|---------------------|
| S01 | Observatorio | 400vh | 150f | V-001/002 | F2F portal + SplitText |
| S02 | Nevoa Vermelha | 280vh | 100f | V-003 | 3D card drop + F2F |
| S03 | Atravessia | 350vh | 180f | V-004 | Flip + tunnel F2F |
| S04 | Demo | 620vh | 500f | V-005/006 | React + F2F + depth |
| S05 | Tres Portais | 360vh | 120f | V-007 | DrawSVG QR |
| S06 | Agentes | 300h | 80f | — | Horizontal + drag |
| S07 | Inbox | 280vh | 60f | — | MotionPath callouts |
| S08 | Funil | 320vh | 60f | V-008 | MotionPath card |
| S09 | Automacoes | 300vh | 120f | V-009 | DrawSVG + particles |
| S10 | Constelacao | — | 40f | — | Tilt grid |
| S11 | A Linha | 280vh | 100f | V-010 | Draggable + F2F |
| S12 | Cases | 350h | 120f | — | Horizontal dolly |
| S13 | Social | — | 60f | V-011 | Counters + F2F BG |
| S14 | Orbita | 280vh | — | V-012 | MotionPath 3D |
| S15 | Portal | 300vh | 70f | V-013 | Flip fullscreen |
| S16 | Fortaleza | — | 50f | — | DrawSVG shield |
| S17 | Planos | — | — | — | Flip pricing |
| S18 | FAQ | — | — | — | Spring accordion |
| S19 | Convergencia | 350vh | 120f | V-014/015 | SplitText + F2F |

---

<a name="fase-6"></a>
# FASE 6 — PERFORMANCE E OTIMIZACAO

## 6.1 Lazy loading

| Recurso | Estrategia |
|---------|------------|
| F2F WebP | 1 seq secao ativa + preload N+1 |
| Video | IntersectionObserver play/pause |
| FLUX imgs | next/image + WebP q82 |
| React sections | dynamic import por secao |
| GSAP plugins | register sob demanda mobile |

## 6.2 Compressao

- Imagens: WebP q80-85, max 1920w
- F2F frames: WebP q78-82, 1280w max
- Video: H.265/WebM dual source
- SVG: svgo, paths <120 pts

## 6.3 Tiers matchMedia

| Tier | Viewport | Experiencia |
|------|----------|-------------|
| full | desktop ≥1024 | 10 camadas, F2F, Smoother |
| reduced | tablet | F2F reduzido, sem glow cursor |
| minimal | mobile | MP4 capitulos OU GSAP light |

## 6.4 Metas

- LCP desktop <2.8s | mobile <3.2s
- INP <200ms desktop
- FPS scroll ≥55
- Memoria F2F ativa ≤4MB

## 6.5 Pipeline F2F

```
Kling MP4 → FFmpeg extract → cwebp → manifest.json → FrameScrubber.tsx
```

Script: `scripts/nv5_extract_f2f.py` (a criar)

---

<a name="roadmap"></a>
# ROADMAP DE IMPLEMENTACAO

## Semana 1 — Fundacao
- [ ] Next.js 15 + tokens v5
- [ ] GSAP register + masterTL shell
- [ ] Gerar NV5-IMG batch 001-012 (hero+problem)
- [ ] Migrar demo/s04 → SectionDemo com tokens v5

## Semana 2 — Hero + Bridge
- [ ] S01 completa (F2F+video+depth)
- [ ] S02 + S03 Flip bridge
- [ ] Keyframes NV5-KEY + Kling V-001–004

## Semana 3 — Demo + Produto
- [ ] S04 React golden UI (5 telas)
- [ ] F2F 500f S04
- [ ] S05-S08

## Semana 4 — Prova + Social
- [ ] S09-S16
- [ ] SVG pack implementacao

## Semana 5 — Conversao + Polish
- [ ] S17-S19
- [ ] Performance audit
- [ ] Mobile tiers
- [ ] QA cross-browser

---

# HIERARQUIA DOCUMENTAL v5

| Documento | Papel |
|-----------|-------|
| **Production Bible v5** (este) | Indice mestre |
| **Sections v5** | 19 secoes detalhadas |
| **Visual Bible v5** | Direcao de arte |
| **Master Directive v4** | Filosofia hibrida |
| **Motion System** | BUILD/PEAK/EXIT |
| **Depth System** | Stack Z |
| **assets/prompts/v5/** | Todos os prompts |

---

*Production Bible v5 — KORUVISION x FlowIA — Jun 2026*
