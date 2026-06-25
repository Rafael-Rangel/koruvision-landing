# KORUVISION — Análise Crítica de Motion Design v2
## Revisão Senior · GSAP · Interação · Profundidade · Conversão

> Complementa: `KORUVISION-Master-Directive-v3.md`, `KORUVISION-Motion-System.md`  
> Referência viva: `demo/s04.html`

---

# I. DIAGNÓSTICO HONESTO DO ESTADO ATUAL

## O que já está em nível premium

| Área | Status | Nota |
|------|--------|------|
| Narrativa scroll (BUILD/PEAK/EXIT) | Implementado S04 | 9/10 |
| Continuidade câmera entre atos | S04 | 8/10 |
| UI real vs imagem estática | Diretriz v3 | 9/10 |
| Anti-padrão vídeo no scroll | Diretriz v3 | 10/10 |
| Fio condutor data-river | Planejado global | 7/10 (não implementado) |
| Motion identity por seção | Planejado v3 | 6/10 (genérico ainda) |

## Lacunas críticas identificadas

1. **Scroll domina, mouse é coadjuvante** — S04 tem parallax leve; falta camada de exploração pós-PEAK.
2. **Plugins GSAP subutilizados** — Flip, MorphSVG, DrawSVG, MotionPath definidos no papel, quase ausentes no protótipo.
3. **Hover systems inexistentes** — zero magnetic buttons, tilt cards, glow dinâmico.
4. **Pseudo-3D só no device shell** — dashboards são flat dentro do frame 3D.
5. **Mesmo vocabulário de motion** — stagger + opacity + translateY em tudo; falta identidade por seção.
6. **Sem tier mobile de interação** — Observer/Draggable precisam de fallback touch.
7. **Sem orquestração global** — master timeline com labels por seção não existe ainda.

## Veredito

A **direção narrativa** está correta e acima da média. O **teto visual atual** é ~75% do potencial GSAP. O gap não é mais conceito — é **camada de interação**, **plugin specificity** e **motion identity**.

---

# II. MAPA GSAP — ONDE USAR (E ONDE NÃO)

## ScrollTrigger — já core, elevar com:

- `snap` em seções pinned (S04, S03) — snap nos labels PEAK, não no meio do BUILD
- `batch()` com `interval` para S02, S10, S13 — stagger on enter sem pin
- `horizontal: true` — S06, S12 (já planejado)
- `pinSpacing: false` só em elementos auxiliares, nunca na UI legível
- **Técnica premiada:** `ScrollTrigger.matchMedia()` com 3 tiers: `desktop`, `tablet`, `mobile-reduced`

## ScrollSmoother — desktop only

```
wrapper: #smooth-wrapper
content: #smooth-content
effects: true (parallax data-speed em layers)
```

- Usar em **todas** as seções não-pinned para fluidez Apple-level
- **Não** combinar com Lenis
- Mobile: desligado; usar scroll nativo + animações mais curtas

## Flip — alto ROI, baixo risco

| Transição | Elemento | Efeito |
|-----------|----------|--------|
| S02→S03 | 4 cards dor → 4 pilares | WOW #1 da landing |
| S04 peak | Chip → Agent panel | Morph de estado |
| S15 | Card agência → fullscreen tenants | Portal |
| S17 | Toggle mensal/anual | Preços sem jump |

**Regra:** Flip só em elementos que existem nos dois estados. Nunca Flip em texto longo.

## MorphSVG — seções âncora

- S03: ícone ✗ → ✓
- S09: node workflow expande
- S16: escudo se fecha
- **S04 upgrade:** bolha chat → retângulo card (path simples, 2 paths)

**Limite mobile:** fallback para `scale + crossfade` se path complexo.

## MotionPath

- S04 ato 3: card Maria (já parcial — migrar para `motionPath` SVG curva, não left/top)
- S07: callouts orbitam inbox
- S08: card no funil com `align: "self"`
- S14: logos em órbita elíptica 3D CSS + MotionPath

## DrawSVG

- **Global:** data-river 0–100% scroll (prioridade máxima)
- S09: workflow desenha
- S16: escudo + hex grid
- S05: QR code + linha de scan

## SplitText (ou split-type open-source)

- S01 headline, S05 números, S19 CTA
- **Somente** na fase BUILD; congelar no PEAK
- Mobile: palavras inteiras, não chars

## Observer

- Pausar partículas/loops quando off-screen
- Hero: tilt suave do device com `deltaX/deltaY`
- S14: órbita acelera com movimento do mouse
- **PEAK S04:** após composição completa, Observer ativa "modo exploração"

## Draggable + InertiaPlugin

- S11: before/after (essencial)
- S06: gallery horizontal com inércia (desktop)
- Mobile: drag nativo touch, sem Inertia

## ScrollToPlugin

- Navbar âncoras com offset do header
- Pós-S04 CTA "Ver demonstração" → scroll suave

## Timelines aninhadas — arquitetura alvo

```
masterTimeline (scrub global leve)
├── act1Timeline (S01-S02)
├── act2Timeline (S03-S04) ← nested 5 atos S04
├── act3Timeline (S05-S15)
└── act4Timeline (S16-S19)

dataRiverProgress → masterTimeline.progress()
```

## Técnicas premiadas pouco exploradas no plano atual

| Técnica | Onde | Plugin |
|---------|------|--------|
| **Scrub proxy** | Câmera multi-layer | ScrollTrigger + quickSetter |
| **Flip fit** | Continuidade cross-section | Flip |
| **SVG filters displacement** | Transição S03 túnel | GSAP + SVG feDisplacementMap leve |
| **CSS `transform-style: preserve-3d` stack** | UI SaaS pseudo-3D | GSAP puro |
| **Magnetic cursor field** | CTAs globais | Observer + quickTo |
| **Progress-linked counters** | S08, S13, S15 | ScrollTrigger onUpdate |
| **Clip-path morph** | S11 | GSAP attrPlugin / CSS |
| **Stagger from center** | S10 constelação | gsap.utils.wrap |
| **Random reveal seed** | S01 partículas | custom, não plugin |
| **GSAP context() + cleanup** | Next.js | obrigatório |

---

# III. SISTEMA GLOBAL DE INTERAÇÃO

## Três modos de interação

```
┌─────────────────────────────────────────┐
│  MODO SCROLL (primário)                 │
│  BUILD → PEAK → EXIT por seção          │
├─────────────────────────────────────────┤
│  MODO PEAK (secundário)                 │
│  Durante PEAK: hover, drag, explore     │
│  Observer ativo, scroll scrub pausa     │
│  leve ou desacopla micro-animações      │
├─────────────────────────────────────────┤
│  MODO IDLE (terciário)                  │
│  Loops sutis: glow pulse, data-river,   │
│  partículas quando seção em viewport    │
└─────────────────────────────────────────┘
```

**Inovação S04:** No PEAK de cada ato, scroll continua mas **micro-interações** respondem ao mouse (bolha destaca, barra do gráfico sobe no hover). Isso não compete com o Motion System — complementa.

## Hover System — componentes reutilizáveis

### `MagneticButton`
- `strength: 0.35`, `radius: 120px`
- GSAP `quickTo` no ticker
- Ripple: pseudo-element scale on click
- Gradient: `background-position` follow cursor

### `TiltCard`
- `rotateX/Y` max ±8°
- `translateZ` filhos: foreground +20px, bg -10px
- Glow: radial-gradient posição = cursor %
- **S10, S12, S17** — cards benefícios, cases, planos

### `DepthImage`
- 3 layers PNG (fg/mg/bg) com parallax interno 0.03–0.08
- **S02** pain cards, **S12** cases

### `LiveDashboard` (S04 peak, S05, S07)
- Barras: `scaleY` on hover com `elastic.out(1, 0.5)`
- Métricas: count-up on hover
- Tooltip: Flip from origin

### `GlowField` (global)
- Um único canvas ou div `mix-blend-mode: screen`
- Cursor = luz roxa/ouro sutil, opacity 0.15 max

## Performance budget interação

| Efeito | Desktop | Mobile |
|--------|---------|--------|
| Magnetic buttons | Sim | Não (tap feedback CSS) |
| Tilt 3D cards | Sim | CSS `:active` scale only |
| Glow follow cursor | Sim | Desligado |
| Observer loops | Sim | Pausado |
| Draggable | Sim | Touch scroll |
| Partículas hover | Max 12 | 0 |

---

# IV. REGRAS 3D — ANÁLISE HONESTA

## Onde 3D AGREGa valor

| Elemento | Tipo | Por quê |
|----------|------|---------|
| Device shell S01/S04 | Fake 3D CSS | Produto = objeto físico premium |
| Kanban cards S04/S08 | Z-offset por coluna | Hierarquia pipeline |
| Inbox 3 colunas S07 | translateZ por coluna | Sala de comando |
| Órbita integrações S14 | preserve-3d | Ecossistema espacial |
| Hero partículas | Canvas 2D (não Three) | Profundidade sem bundle WebGL |

## Onde 3D PREJUDICA

| Elemento | Por quê |
|----------|---------|
| Texto de pricing S17 | Legibilidade + conversão |
| FAQ S18 | Conteúdo racional |
| Tabelas comparativas S11 | Leitura side-by-side |
| Copy lateral longa | Não competir com stage |
| Mobile inteiro | Performance + touch |

## Fake 3D vs Three.js

| Cenário | Vencedor |
|---------|----------|
| 6 camadas parallax | **GSAP + CSS** |
| Partículas hero | **Canvas 2D** |
| Órbita logos | **CSS 3D + MotionPath** |
| Volumetric fog | Three.js (opcional tier A) |
| UI SaaS legível | **React flat com Z-offset sutil** |

**Veredito Three.js:** 1 uso opcional (S01 particles upgrade). Não expandir.

## Stack pseudo-3D para UI SaaS (S04 upgrade)

```
device-shell (preserve-3d)
├── layer-z-0  status bar
├── layer-z-10 header
├── layer-z-20 chat body
├── layer-z-30 floating chips
└── layer-z-40 modals/tooltips

scroll scrub → camera rig
hover peak   → layer-z independent quickTo
```

Cada camada `translateZ` diferente + `scale` compensatório (`scale: 1 + z*0.001`).

---

# V. MOTION IDENTITY — 19 SEÇÕES (SEM REPETIR PADRÃO)

| # | Identidade motion | Plugin protagonista | Interação mouse |
|---|-------------------|---------------------|-----------------|
| S01 | **Emergência + SplitText** | SplitText, Observer | Device tilt, particles attract |
| S02 | **Queda 3D** | ScrollTrigger batch, tilt | Cards tilt + glow vermelho |
| S03 | **Morph + Flip** | Flip, MorphSVG | Túnel parallax mouse |
| S04 | **Scrub cinematográfico + UI viva** | Nested TL, MotionPath | **PEAK explore mode** |
| S05 | **Draw + reveal** | DrawSVG | QR pulse on hover |
| S06 | **Horizontal + compare** | Draggable, horizontal ST | Toggle robot/human drag |
| S07 | **Orbit callouts** | MotionPath | Coluna hover expand |
| S08 | **Física funil** | MotionPath, snap | Card drag preview |
| S09 | **SVG vivo** | DrawSVG, MotionPath particles | Node hover expand |
| S10 | **Constelação tilt** | batch, TiltCard | Star map hover |
| S11 | **Clip morph** | Draggable, clip-path | Slider drag |
| S12 | **Dolly horizontal** | horizontal ST, DepthImage | Card depth parallax |
| S13 | **Counter + marquee** | counter, infinite | Avatar hover stories |
| S14 | **Órbita 3D** | MotionPath, Observer | Logo zoom orbit |
| S15 | **Portal Flip** | Flip | Tenant card magnetic |
| S16 | **Construção escudo** | DrawSVG, MorphSVG | Hex hover lock |
| S17 | **Flip pricing** | Flip | Plan card tilt |
| S18 | **Spring racional** | spring accordion | Search focus glow |
| S19 | **Convergência** | SplitText, shockwave SVG | CTA magnetic + particles |

**Regra:** Nenhuma seção usa o mesmo plugin como *protagonista* da anterior.

---

# VI. S04 — OPORTUNIDADES CONCRETAS DE UPGRADE

Estado atual `demo/s04.html`: excelente narrativa scroll; interação = parallax glow apenas.

## Upgrade tier 1 (baixo custo, alto impacto)

1. **PEAK Explore Mode** — quando `phase === 'peak'`, habilitar: ✅ `demo/s04.html`
   - Hover em bolhas → scale 1.02 + glow
   - Hover em barras dashboard → `scaleY` elastic
   - Magnetic no CTA final
2. **MotionPath no card Kanban** — path SVG + `getPointAtLength` ✅ `demo/s04.html`
3. **Flip chip1 → agentCard** — mesmo elemento DOM nos atos 0→1
4. **Layer Z no device** — separar status/header/body em divs com translateZ

## Upgrade tier 2 (médio)

5. **MorphSVG** bolha → card (ato 1→2)
6. **DrawSVG** connector entre 5 steps (progress path lateral)
7. **Snap ScrollTrigger** nos 5 atos (labels `act1`…`act5`)

## Upgrade tier 3 (polish)

8. **Cursor glow** roxo no stage durante PEAK
9. **Inertia** drag horizontal entre atos (opcional desktop)
10. **GSDevTools** em dev para tuning de slots

## O que NÃO adicionar no S04

- Three.js dentro do device
- Draggable no scroll scrub (conflita UX)
- SplitText em UI WhatsApp (legibilidade)
- Partículas em excesso no peak

---

# VII. 15 NOVOS MOMENTOS WOW (ALÉM DOS 10 v3)

| # | Momento | Seção | Técnica |
|---|---------|-------|---------|
| 11 | Cards dor Flip para pilares | S03 | Flip |
| 12 | Exploração livre no peak da demo | S04 | Observer + hover |
| 13 | QR desenha + flash conexão | S05 | DrawSVG |
| 14 | Toggle personalidade drag | S06 | Draggable |
| 15 | Callout orbita inbox | S07 | MotionPath |
| 16 | Snap magnético no funil | S08 | MotionPath + snap |
| 17 | Partículas percorrem workflow | S09 | MotionPath |
| 18 | Slider revela dois mundos | S11 | Draggable + clip |
| 19 | Logo entra em órbita 3D | S14 | CSS 3D + MotionPath |
| 20 | Portal agência fullscreen | S15 | Flip |
| 21 | Escudo se fecha | S16 | MorphSVG |
| 22 | Preço Flip mensal/anual | S17 | Flip |
| 23 | Data-river completa jornada | Global | DrawSVG |
| 24 | CTA magnetic + shockwave | S19 | Observer + SVG |
| 25 | Cursor glow global | Global | Canvas 2D leve |

---

# VIII. ARQUITETURA TÉCNICA NEXT.JS

```
lib/gsap/
  register.ts           # plugins por tier
  motion-system.ts      # BUILD/PEAK/EXIT, elementState
  match-media.ts        # desktop | tablet | mobile
  master-timeline.ts    # orquestração global

components/motion/
  MagneticButton.tsx
  TiltCard.tsx
  DepthLayer.tsx
  DataRiver.tsx         # DrawSVG global
  PeakExplore.tsx       # wrapper Observer pós-peak
  ParallaxLayer.tsx

hooks/
  useScrollAct.ts       # pin + phases
  useMagnetic.ts
  useTilt.ts
  useGsapContext.ts     # cleanup Next.js
```

**Bundle GSAP Club:** Flip, MorphSVG, DrawSVG, SplitText, ScrollSmoother, Inertia → ~$99/ano.  
**Alternativa open:** split-type, path morph manual, CSS clip, Lenis free.

---

# IX. PRIORIZAÇÃO ANTES DA ARQUITETURA FINAL

## Fazer agora (validação)

1. S04 PEAK explore mode + MotionPath card
2. Data-river DrawSVG global (protótipo)
3. MagneticButton + TiltCard (2 componentes base)
4. S03 Flip S02→S03 (segundo protótipo)

## Fazer na build Next.js

5. ScrollSmoother desktop
6. matchMedia 3 tiers
7. Master timeline labels
8. Hover systems por seção conforme tabela V

## Adiar / opcional

9. Three.js hero
10. InertiaPlugin mobile
11. GSDevTools produção
12. Snap em todas seções pinned

---

# X. MÉTRICAS DE SUCESSO

| Métrica | Alvo |
|---------|------|
| LCP | < 2.5s mobile |
| INP | < 200ms (hover não bloqueia main thread) |
| Scroll jank | 0 layout shift em pin |
| Legibilidade PEAK | 100% elementos principais opacity 1 |
| Interação descoberta | ≥1 hover delight por seção |
| Conversão | CTAs magnetic S01/S04/S19 |
| Identidade motion | 0 seções adjacentes com mesmo protagonista |

---

*Análise Motion v2 — KORUVISION x FlowIA · Jun 2026*
