# KORUVISION — Especificações Profundas por Cena (19 Seções)

> **Versão:** 2.1 · Complemento de [Matriz de Protagonistas](KORUVISION-Protagonists-Matrix.md)  
> **Padrão:** Cada cena segue a mesma estrutura de spec do Hero — conceito, camadas, mouse, scroll, GSAP, assets, handoffs, fallback.  
> **Continuidade:** [Cadeia Narrativa](KORUVISION-Narrative-Continuity-Chain.md)

---

## Índice

| # | Cena | Protagonista | Tipo |
|---|------|--------------|------|
| [C01](#c01--hero--despertar) | Hero | Núcleo KoruVision | HYB 3D+F2F |
| [C02](#c02--coruja--visão-) | Coruja ★ | Olhos mecânicos | F2F |
| [C03](#c03--problema--caos) | Problema | Fragmentos caóticos | 3D |
| [C04](#c04--pilares--virada) | Pilares | Quatro pilares | 3D |
| [C05](#c05--demo--máquina) | Demo | CRM despertar | HYB F2F+3D |
| [C06](#c06--setup--portais) | Setup | Três portais | 3D |
| [C07](#c07--agentes-ia) | Agentes IA | Cérebro neural | 3D |
| [C08](#c08--inbox) | Inbox | Deck omnichannel | 3D+LIVE |
| [C09](#c09--funil) | Funil | Pipeline magnético | 3D |
| [C10](#c10--automações) | Automações | Motor sináptico | 3D |
| [C11](#c11--analytics) | Analytics | Evolução de dados | F2F+LIVE |
| [C12](#c12--benefícios) | Benefícios | Constelação | 3D |
| [C13](#c13--antesdepois) | Antes/Depois | Divisor universos | 3D |
| [C14](#c14--cases) | Cases | Totens verticais | 3D |
| [C15](#c15--social-proof) | Social | Mural confiança | LOOP+LIVE |
| [C16](#c16--integrações) | Integrações | Nexus orbital | 3D |
| [C17](#c17--agência) | Agência | Portal multi-tenant | 3D |
| [C18](#c18--planos) | Planos | Monólitos pricing | 3D |
| [C19](#c19--cta-final) | CTA | Convergência | HYB F2F+3D |

---

## Template de leitura (aplica a todas)

Cada cena contém:
- **Conceito** — o que o visitante sente e por quê
- **Camadas** — stack visual back→front com z, opacity, função
- **Impacto 3s** — o que captura atenção imediatamente
- **Mouse** — tabela input→resposta
- **Scroll** — timeline progress 0→1
- **GSAP** — pin, scrub, plugins, snippets
- **Handoffs** — frame entrada (da cena anterior) e saída (para próxima)
- **Assets** — IDs NV11 completos
- **Implementação** — componente React, path
- **Mobile** — fallback e reduções
- **Performance** — limites GPU/partículas

---

# C01 — Hero · Despertar

| Meta | Valor |
|------|-------|
| ID DOM | `#s01` |
| Ato | I — Despertar |
| Hue | `265` |
| Tipo protagonista | `HYB` 3D + F2F |
| Pin | Não (hero viewport full) |
| Layout | Copy esquerda 42% · Protagonista direita 58% |

### Conceito
O visitante **tocará** o núcleo de inteligência da KORUVISION antes de ler uma linha. O orbe contém a identidade coruja (anel iris) sem ser foto — é um objeto vivo que respira, gira com o mouse e, ao rolar, **revela o CRM** como se brotasse do próprio centro. Sensação: manipular algo real, premium, futurista.

### Copy
- **Eyebrow:** CRM com IA · Atendimento omnichannel
- **Headline:** O CRM que vê cada lead e fecha por você.
- **Sub:** WhatsApp, IA, funil e automações numa só plataforma viva.

### Protagonista: Núcleo KoruVision
Orbe IA + anel iris owl + 12–16 filamentos de dados + partículas orbitais + CRM holográfico emergente.

### Camadas (back → front)

| # | Layer | z-transform | Opacity | Função |
|---|-------|-------------|---------|--------|
| 0 | `NV11-IMG-001` aurora BG | 0 | 0.28 | Atmosfera diagonal gold+violet |
| 1 | `NV11-VID-LOOP-001` energy | 0 | 0.18 | Pulso energia neural |
| 2 | `HeroOrbitalParticles` SVG | 20px | 0.7 | 24 partículas 3 anéis |
| 3 | `nv11-png-001` core orb | 60px | 1.0 | Esfera amber/violet |
| 4 | `HeroIrisRing` SVG | 80px | 0.95 | Anel chrome mecânico |
| 5 | Filamentos 3D CSS | 100px | 0.85 | 16 linhas dados |
| 6 | `NV11-F2F-000` overlay | 110px | 0→0.6 scroll | Orbe abre → painéis |
| 7 | `ProductCommandCenter` | 140px | 0→0.9 scroll | CRM React legível |
| 8 | Cursor particles canvas | 160px | 0.5 | Seguem mouse lag 80ms |
| 9 | Luz dinâmica `::after` | — | 0.12 | radial-gradient cursor |

### Impacto nos primeiros 3 segundos
1. Orbe pulsa (scale 0.98↔1.02, 3s loop)
2. Iris rim acende gold em 0.6s
3. Partículas começam órbita lenta
4. Ao mover mouse: tilt imediato — visitante sente controle

### Interações mouse

| Input | Resposta |
|-------|----------|
| `mousemove` | `rotationY: (mx-0.5)*18deg`, `rotationX: (my-0.5)*-12deg` em `.hero-core-stage` |
| `mousemove` | `--light-x/y` atualiza radial-gradient no core |
| `mousemove` | Partículas desviam até 40px em direção ao cursor (stagger 0.02) |
| `mouseenter` stage | Rim glow 0.4→0.85 em 0.4s; filamentos brightness +15% |
| `mouseleave` | Elastic return rotate 0,0 duration 0.8s `ease: elastic.out(1,0.4)` |
| Scroll 0→0.45 | Mouse influence máxima — tilt ±12° |
| Scroll 0.45→1 | Influence reduz; CRM domina foco visual |

### Scroll timeline

| Progress | Ação visual | Copy |
|----------|-------------|------|
| 0.00 | Core scale 0.85, partículas lentas | — |
| 0.15 | SplitText headline | Headline reveal |
| 0.30 | CTAs fade in | Botões |
| 0.50 | F2F scrub 0→0.5; filamentos expandem | Sub copy |
| 0.70 | CRM hologram opacity 0→0.85; Flip emerge | KPI widgets |
| 0.90 | KPI stagger: Pipeline R$ 152k | — |
| 1.00 | Flash gold central 200ms | Handoff → C02 |

### GSAP
```js
gsap.to(crmLayer, { y: 0, opacity: 1, scale: 1, scrollTrigger: { trigger: hero, start: "top top", end: "+=120%", scrub: PREMIUM_SCRUB } });
gsap.quickTo(core, "rotationY", { duration: 0.6 });
Flip.from(core, { targets: crmLayer, duration: 0.8, scrollTrigger: { scrub: 0.5 } });
```

### Handoffs
- **Entrada:** Primeira cena — fade from void
- **Saída:** Flash gold centro (x:50%, y:45%) → frame 0 C02 olhos fechados no mesmo ponto

### Assets
| ID | Arquivo | Papel |
|----|---------|-------|
| NV11-IMG-001 | hero-aurora.webp | BG |
| NV11-VID-LOOP-001 | hero-energy.mp4 | Ambiente |
| NV11-VID-LOOP-002 | owl-breath.mp4 | Ambiente secundário 0.12 |
| NV11-F2F-000 | hero-core (72f) | Overlay scroll |
| NV11-PNG-001/002 | core-orb, iris-ring | 3D layers |
| NV11-SVG-002/003 | particles, iris | SVG animado |

### Implementação
- `components/hero/KoruVisionCore.tsx`
- `sections/SectionHero.tsx`
- Hook: `usePointerParallax({ maxTiltX: 12, maxTiltY: 18 })`

### Mobile fallback
- Poster `NV11-IMG-001` + core CSS pulse
- Sem F2F; `ProductCommandCenter` estático abaixo fold
- Tilt `deviceorientation` ±6° se permitido
- 0 partículas canvas

### Performance
- Max 80 partículas desktop
- 1 canvas cursor + SVG only (sem WebGL obrigatório)
- F2F pause quando off-screen

---

# C02 — Coruja · Visão ★

| Meta | Valor |
|------|-------|
| ID DOM | `#s02-vision` |
| Ato | I — Despertar |
| Hue | `265` → `8` (transição saída) |
| Tipo | `F2F` |
| Pin | **280vh** |
| Layout | Full bleed cinematográfico · copy overlay bottom-left |

### Conceito
Referência visual **ouro** do projeto. Macro extremo dos olhos mecânicos da coruja — a metáfora central da KORUVISION ("ver cada lead"). O scroll **abre os olhos** como se a inteligência despertasse. Ao final, o olhar penetra a névoa e inaugura o caos do problema.

### Copy
- **Headline:** (herda v9) Visão que enxerga o que outros perdem
- **Sub:** A inteligência que transforma dados em decisão.

### Protagonista: Olhos mecânicos abrindo
Sequência F2F 90 frames — pupila amber, chrome brow, reflexos de dados na íris.

### Camadas (back → front)

| # | Layer | Opacity | Função |
|---|-------|---------|--------|
| 0 | Void `#010208` | 1 | Base absoluta |
| 1 | `NV11-IMG-002` poster | 0.15 | Textura macro pré-F2F |
| 2 | `NV11-F2F-001` canvas 90f | 1.0 | **Protagonista** |
| 3 | `handoff-glow` gold residual C01 | 0→0.55→0 | Flash entrada |
| 4 | `VisionTunnelMask` SVG | — | Saída: névoa pupila |
| 5 | Vignette scrim | 0.4 | Legibilidade copy |
| 6 | Copy overlay | 1 | Bottom-left safe zone |

### Impacto nos primeiros 3 segundos
1. Dois pontos amber (olhos fechados) no centro — eco do flash C01
2. Tremor sutil pálpebras (frames 0–8)
3. Brilho interno aumenta — curiosidade
4. Copy fade in após 1.2s de scroll

### Interações mouse

| Input | Resposta |
|-------|----------|
| `mousemove` | Parallax owl layer: `x: (mx-0.5)*8px`, `y: (my-0.5)*5px` |
| `mousemove` | Reflexo specular na pupila segue cursor (CSS `background-position`) |
| Scroll | **Única interação principal** — scrub frames 0→89 |
| `prefers-reduced-motion` | Poster frame 45 (semi-aberto) + fade copy |

### Scroll timeline

| Progress | Frame | Ação |
|----------|-------|------|
| 0.00 | 0 | Olhos fechados + flash gold C01 |
| 0.15 | 13 | Tremor pálpebras |
| 0.35 | 32 | Semi-abertos; dados refletem |
| 0.65 | 58 | Olhos abertos; iris amber intensa |
| 0.85 | 76 | Pupila contrai — foco |
| 1.00 | 89 | Tunnel mask expand radius 5%→45% |

### GSAP
```js
ScrollTrigger.create({
  trigger: section, start: "top top", end: "+=280%", pin: true, scrub: PREMIUM_SCRUB,
  onUpdate: (self) => setFrame(Math.floor(self.progress * 89)),
});
gsap.to(tunnel, { attr: { r: "45%" }, scrollTrigger: { start: "bottom 80%", scrub: 0.5 } });
```

### Handoffs
- **Entrada:** Flash gold C01 → olhos fechados mesmo centro (50%, 45%)
- **Saída:** Pupila fixa → névoa vermelha irradia da pupila → C03

### Assets
| ID | Arquivo |
|----|---------|
| NV11-F2F-001 | owl-eyes 90f @ 25fps |
| NV11-IMG-002 | owl-poster.webp |
| NV11-SVG-004 | VisionTunnelMask |

### Implementação
- `sections/SectionVisionBridge.tsx`
- `components/motion/FrameScrubber.tsx`

### Mobile
- Pin 200vh (reduzido)
- Frames pré-extraídos webp; scrub mantido
- Sem parallax mouse

### Performance
- Canvas 1920w max; lazy decode frames
- `IntersectionObserver` pause off-screen

---

# C03 — Problema · Caos

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-problema` |
| Ato | I — Despertar |
| Hue | `8` (danger) |
| Tipo | `3D` |
| Pin | **200vh** |
| Layout | Copy esquerda · Protagonista direita centro |

### Conceito
A névoa vermelha da pupila C02 **explode** em fragmentos de vidro holográfico — cada shard representa uma dor operacional (WhatsApp solto, planilha, lead frio). O visitante **repele** fragmentos com o cursor (sensação de caos invasivo) e, ao rolar, vê tudo convergir — preparando os pilares.

### Copy
- **Headline:** Seus leads esfriam **na névoa operacional.**
- **Points:** Conversas perdidas · Sem funil · Resposta lenta · Equipe apagando incêndio

### Protagonista: Campo de Fragmentos Caóticos
12 shards glass 3D + partículas danger + névoa vermelha volumétrica.

### Camadas

| # | Layer | z | Opacity | Função |
|---|-------|---|---------|--------|
| 0 | `NV11-IMG-003` chaos BG | 0 | 0.32 | Névoa danger |
| 1 | `NV11-VID-LOOP-003` drift | 0 | 0.20 | Partículas caóticas |
| 2 | `ProblemFragments` SVG ×12 | -40~80px | 0.7 | Shards decor |
| 3 | `ChaosFragmentField` 3D ×12 | variável | 1.0 | **Protagonista** |
| 4 | Danger pulse overlay | — | 0.08 | Hue `#FF4D6A` breathe |
| 5 | Scrim + copy | — | — | Esquerda |

### Impacto 3s
1. Névoa vermelha irradia do centro (continua pupila C02)
2. 12 shards explodem outward em 0.8s
3. Shake sutil no container (amplitude 2px)
4. Copy danger hue accent

### Interações mouse

| Input | Resposta |
|-------|----------|
| `mousemove` | Shards num raio 120px **fogem** do cursor (push +z 40px) |
| `mouseenter` shard | Shake amplitude 4px; rim danger intensifica |
| `mousemove` stage | Tilt cena ±6° (menor que hero — sensação instável) |
| Scroll | Convergência progressiva ao centro |

### Scroll timeline

| Progress | Ação |
|----------|------|
| 0.00 | Névoa expande da pupila (mask C02) |
| 0.20 | Explosão shards outward |
| 0.45 | Copy + points stagger reveal |
| 0.70 | Shards começam drift lento inward |
| 1.00 | 4 clusters no centro (pré-pilares C04) |

### GSAP
```js
gsap.from(shards, { x: () => gsap.utils.random(-200,200), opacity: 0, stagger: 0.05, scrollTrigger: { scrub: 0.5 } });
gsap.to(shards, { x: clusterPos[i], y: 0, scale: 0.3, scrollTrigger: { start: "60%", end: "100%", scrub: true } });
```

### Handoffs
- **Entrada:** Névoa vermelha da pupila C02
- **Saída:** 4 clusters comprimidos → Flip morph pilares C04

### Assets
NV11-IMG-003 · NV11-VID-LOOP-003 · NV11-SVG-005 · `ChaosFragmentField.tsx`

### Implementação
`components/3d/nv11/ChaosFragmentField.tsx` · `sections/v10/scenes.tsx` SceneProblem

### Mobile
8 shards (não 12); sem repulsão mouse — auto-drift
Poster `NV11-IMG-003` + CSS shake leve

### Performance
12 elementos CSS 3D max; sem canvas

---

# C04 — Pilares · Virada

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-pilares` |
| Ato | II — Máquina |
| Hue | `200` |
| Tipo | `3D` |
| Pin | **220vh** |

### Conceito
Do caos emerge **ordem**: quatro colunas de luz materializam os pilares do produto (Atendimento, IA, Pipeline, Automação). O visitante sente a **virada narrativa** — de problema para solução. Zoom final entra no pilar central e transporta para dentro do CRM (C05).

### Copy
- **Headline:** Quatro pilares **substituem quatro dores.**
- **Pilares:** Atendimento · Inteligência · Pipeline · Automação

### Protagonista: Monólito Quatro Pilares
4 colunas isométricas glass com capitals gold, hub central rotativo.

### Camadas

| # | Layer | Função |
|---|-------|--------|
| 0 | NV11-IMG-004 pillars BG | Chão reflexivo |
| 1 | NV11-VID-LOOP-004 pulse | Pilares pulsam |
| 2 | PillarEnergyColumns SVG | Energia sobe |
| 3 | FourPillars3D | **Protagonista** |
| 4 | Pillar labels DOM | 4 títulos pilares |
| 5 | Hub central glow | Conexão entre pilares |

### Impacto 3s
Flip morph dos 4 clusters C03 → pilares erguem-se (scaleY 0→1)
Energia gold sobe primeira coluna

### Interações mouse

| Input | Resposta |
|-------|----------|
| `mousemove` | Hub central tilt ±8° |
| `hover` pilar | Glow accent; label sobe 8px; energia sobe coluna |
| `hover` pilar | Outros pilares dim opacity 0.6 |
| Scroll | Sequência acendimento 1→2→3→4 |

### Scroll timeline

| Progress | Ação |
|----------|------|
| 0.00 | Flip clusters → pilares |
| 0.40 | Pilares scaleY 0→1 stagger 0.15 |
| 0.70 | Energia sobe; spine DrawSVG |
| 1.00 | Zoom pilar 2 (IA) scale 1.4; void violet interior |

### GSAP
```js
Flip.from(clusters, { targets: pillars, duration: 1, scrollTrigger: { scrub: 0.8 } });
gsap.to(camera, { scale: 1.4, z: 200, scrollTrigger: { start: "85%", scrub: 0.5 } });
```

### Handoffs
- **Entrada:** 4 clusters C03
- **Saída:** Interior void pilar → ponto luz C05 F2F frame 0

### Assets
NV11-IMG-004 · NV11-VID-LOOP-004 · NV11-SVG-006 · FourPillars3D.tsx

### Mobile
4 pilares flat isometric CSS; zoom simplificado crossfade

### Performance
`preserve-3d` scene única; 4 meshes CSS

---

# C05 — Demo · Máquina

| Meta | Valor |
|------|-------|
| ID DOM | `#s04` |
| Ato | II — Máquina |
| Hue | `220` |
| Tipo | `HYB` F2F + 3D + LIVE |
| Pin | **480vh** |

### Conceito
O clímax da demonstração de produto. CRM **desperta** de um ponto de luz (continuação do void C04) em sequência F2F de 120 frames, depois transiciona para `ProductCommandCenter` **vivo** com 5 atos de câmera. Lead **Maria S. R$ 2.400** introduzida aqui — persiste até C11.

### Copy
- **Headline:** Cinco atos, **um único fluxo.**
- **Sub:** Do primeiro 'oi' no WhatsApp ao deal fechado.

### Protagonista: Despertar CRM + Device Stack 3D
F2F holográfico → mockup React operacional com Explorer mode no PEAK.

### Camadas

| # | Layer | Função |
|---|-------|--------|
| 0 | NV11-IMG-005 machine interior | Corredor neural |
| 1 | NV11-VID-LOOP-005 corridor | Ambiente 10s |
| 2 | NV11-F2F-002 120f | CRM desperta **F2F** |
| 3 | Device stack 3D tilt | Laptop/tablet frame |
| 4 | ProductCommandCenter LIVE | **Protagonista PEAK** |
| 5 | Camera rig GSAP | 5 atos movimento |

### Impacto 3s
Ponto de luz branco pulsa no void → onda expansiva frame 0–15

### Interações mouse

| Input | Resposta |
|-------|----------|
| PEAK ato 3–4 | `Observer` Explorer: hover módulos CRM destaca |
| `mousemove` device | Tilt device ±5° |
| `hover` pipeline col | Coluna glow + deal count |
| Scroll | 5 atos + F2F scrub ato 1 |

### Scroll timeline — 5 atos

| Ato | Progress | Visual |
|-----|----------|--------|
| 1 Despertar | 0.00–0.20 | Void + F2F 0→24f |
| 2 Pipeline | 0.20–0.40 | F2F 24→48f; colunas pipeline |
| 3 IA Chat | 0.40–0.60 | F2F 48→72f; chat ativo; Maria aparece |
| 4 Métricas | 0.60–0.80 | F2F 72→96f; KPIs LIVE count-up |
| 5 Conectar | 0.80–1.00 | F2F 96→120f; botão glow cyan |

### GSAP
Camera rig por ato; `scrollTrigger` markers `ato-1`…`ato-5`
```js
gsap.to(camera, { x: atoTargets[i].x, y: atoTargets[i].y, scale: atoTargets[i].z, scrollTrigger: { scrub: PREMIUM_SCRUB } });
```

### Handoffs
- **Entrada:** Ponto luz void C04
- **Saída:** Botão "Conectar WhatsApp" glow → portal C06 mesma XY

### Assets
NV11-F2F-002 · NV11-IMG-005 · NV11-VID-LOOP-005 · SectionDemo.tsx

### Mobile
Pin 320vh; F2F → poster frame 60; ProductCommandCenter simplificado

### Performance
F2F pause off-screen; 1 device 3D layer

---

# C06 — Setup · Portais

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-setup` |
| Ato | II — Máquina |
| Hue | `175` |
| Tipo | `3D` |
| Pin | **200vh** |

### Conceito
Onboarding em 3 passos como **portais de dimensão** — conectar WhatsApp, ativar IA, importar contatos. O primeiro portal nasce exatamente onde estava o botão C05. Energia viaja pelo portal central até o cérebro C07.

### Copy
- **Headline:** No ar em **5 minutos.**
- **Steps:** 01 Conecte WhatsApp · 02 Ative agente · 03 Importe contatos

### Protagonista: Três Portais de Conexão
Anéis ellipses isométricas em profundidade Z com energia teal.

### Camadas
NV11-IMG-006 · NV11-VID-LOOP-006 · SetupPortalRings SVG · OnboardingPortals3D · SetupSteps DOM

### Impacto 3s
Portal 1 materializa no ponto do botão C05 (match cut) com ripple cyan

### Interações mouse

| Input | Resposta |
|-------|----------|
| `hover` portal | Anel intensifica; partículas fluem pelo anel |
| `mousemove` | Portais inclinam levemente para cursor (perspectiva) |
| `click` portal (opcional) | Step checklist marca ✓ |
| Scroll | Portais 1→2→3 ativam sequencial |

### Scroll timeline

| Progress | Ação |
|----------|------|
| 0.00 | Portal 1 match cut botão C05 |
| 0.33 | Portal 2 materializa z:-200→0 |
| 0.66 | Portal 3 + checklist UI stagger |
| 1.00 | Energia portal central → partícula MotionPath → C07 |

### Handoffs
- **Entrada:** Botão Conectar glow C05
- **Saída:** Violet trail → cérebro C07

### Assets
NV11-IMG-006 · NV11-VID-LOOP-006 · NV11-SVG-007 · OnboardingPortals3D.tsx

### Mobile
3 portais empilhados vertical; sem MotionPath — fade energia

---

# C07 — Agentes IA

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-agentes` |
| Ato | III — Produto |
| Hue | `265` |
| Tipo | `3D` |
| Pin | **240vh** |

### Conceito
O **cérebro neural** da operação — hub central com 4 agentes orbitais (SDR, Closer, Suporte, Analytics). Partículas são **atraídas** pelo cursor (inverso do caos C03). Node WhatsApp expande para fullscreen → inbox C08.

### Copy
- **Headline:** Agentes de IA que **vendem como seu melhor closer.**

### Protagonista: Cérebro Neural Comando
Hub violeta + 4 agentes + 20 synapse lines + NeuralMesh SVG.

### Camadas
NV11-IMG-007 · NV11-VID-LOOP-007 · NeuralMesh SVG · NeuralBrainHub3D

### Impacto 3s
Energia C06 chega → hub explode luz violeta → synapses acendem radial

### Interações mouse

| Input | Resposta |
|-------|----------|
| `mousemove` | Partículas **atraídas** ao cursor (raio 150px) |
| `hover` agente node | Card agente expand; synapse pulse downstream |
| `hover` hub | Rotação lenta acelera 2× |
| Scroll | Nodes acendem ordem: SDR→Closer→Suporte→Analytics |

### Scroll timeline

| Progress | Ação |
|----------|------|
| 0.00 | Partícula energia C06 chega |
| 0.25 | Cérebro acende |
| 0.50 | 4 agentes orbitam (360°/20s base) |
| 0.75 | Node WA preview expand |
| 1.00 | WA node scale 1→3 fullscreen → C08 |

### Handoffs
- **Entrada:** Violet trail C06
- **Saída:** WhatsApp node fullscreen → inbox C08

### Assets
NV11-IMG-007 · NV11-VID-LOOP-007 · NV11-SVG-008 · NeuralBrainHub3D.tsx

### Mobile
Hub + 4 ícones flat; orbita CSS simplificada

---

# C08 — Inbox · Omnichannel

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-inbox` |
| Ato | III — Produto |
| Hue | `150` |
| Tipo | `3D` + `LIVE` |
| Pin | **220vh** |

### Conceito
Deck de comando 3D inclinado com inbox **vivo** — mensagens de Maria entram em tempo real, IA sugere resposta. O deal card R$ 2.400 desliza para a direita → funil C09.

### Copy
- **Headline:** Toda conversa, **uma só caixa de comando.**

### Protagonista: Deck Omnichannel 3D + Inbox LIVE
Painel 3D `rotateX(12deg) rotateY(-8deg)` + 3 canais flutuantes + thread React.

### Camadas
NV11-IMG-008 · NV11-VID-LOOP-008 · InboxMessageStreams SVG · InboxCommand3D · InboxWidget LIVE

### Impacto 3s
WA node C07 colapsa → painel inbox expande; primeira mensagem Maria slide in

### Interações mouse

| Input | Resposta |
|-------|----------|
| `mousemove` | Tilt device ±6° |
| `hover` row mensagem | Highlight teal; context panel |
| `hover` canal (WA/IG/Email) | Preview mensagens canal |
| Timer 3s | Nova mensagem mock entra stagger |

### Scroll timeline

| Progress | Ação |
|----------|------|
| 0.00 | WA expandido → painel |
| 0.40 | Mensagens stagger 5 msgs |
| 0.70 | IA sugere resposta (typing indicator) |
| 1.00 | Deal card R$ 2.400 translateX 120px → C09 |

### Handoffs
- **Entrada:** WA node C07
- **Saída:** Deal card → topo funil C09

### Assets
NV11-IMG-008 · NV11-VID-LOOP-008 · NV11-SVG-009 · InboxCommand3D.tsx

### Mobile
Inbox flat sem tilt; mensagens mantidas LIVE

---

# C09 — Funil · Pipeline

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-funil` |
| Ato | III — Produto |
| Hue | `42` |
| Tipo | `3D` |
| Pin | **260vh** |

### Conceito
**Vórtice magnético** — deal Maria percorre 5 estágios com snap magnético. Gravidade gold puxa deals para baixo. Fechamento pulsa → automações C10.

### Copy
- **Headline:** Cada deal avança **com gravidade própria.**

### Protagonista: Vórtice Pipeline Magnético
5 estágios isométricos + deal card Maria + FunnelGravityPaths SVG + orbs MotionPath.

### Camadas
NV11-IMG-009 · NV11-VID-LOOP-009 · NV11-PNG-003 blocks · FunnelGravityPaths · SalesPipeline3D

### Impacto 3s
Card Maria Flip do C08 → snap estágio "Lead" com som visual (gold flash)

### Interações mouse

| Input | Resposta |
|-------|----------|
| `drag` deal card | Snap magnético entre estágios (GSAP Draggable) |
| `hover` estágio | Deals count badge pulse |
| Scroll | Card desce estágios automaticamente se não drag |

### Scroll timeline

| Progress | Estágio |
|----------|---------|
| 0.00–0.20 | Lead |
| 0.20–0.40 | Qualificação |
| 0.40–0.60 | Proposta |
| 0.60–0.80 | Negociação |
| 0.80–1.00 | Fechado — pulse gold → C10 |

### Handoffs
- **Entrada:** Deal card C08
- **Saída:** Pulse fechado → node Lead C10

### Assets
NV11-IMG-009 · NV11-VID-LOOP-009 · NV11-PNG-003 · SalesPipeline3D.tsx

### Mobile
Scroll-only sem drag; 5 estágios verticais

---

# C10 — Automações

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-automacoes` |
| Ato | III — Produto |
| Hue | `210` |
| Tipo | `3D` |
| Pin | **200vh** |

### Conceito
**Sistema nervoso** comercial — 5 nodes (Lead, Qualificar, Email, Notificar, Venda) conectados por filamentos orgânicos. Energia percorre o fluxo como impulso nervoso. Hover dispara pulso downstream.

### Copy
- **Headline:** O sistema nervoso **do seu comercial.**

### Protagonista: Motor Sináptico de Fluxo
5 nodes 3D + AutomationSynapseWeb SVG (MorphSVG idle→active).

### Impacto 3s
Pulso gold C09 ativa node "Lead" → onda percorre primeira conexão

### Interações mouse

| Input | Resposta |
|-------|----------|
| `hover` node | Expand scale 1.15; pulso viaja nodes downstream 0.6s |
| `mousemove` | Filamentos ondulam (sine displacement) |
| Scroll | Fluxo completa Lead→Venda sequencial |

### Scroll timeline

| Progress | Ação |
|----------|------|
| 0.00 | Pulso C09 ativa Lead |
| 0.50 | Energia percorre todos nodes |
| 1.00 | Convergência centro → ponto gráfico C11 |

### Handoffs
- **Entrada:** Pulse fechado C09
- **Saída:** Nodes convergem → origem gráfico C11 F2F frame 0

### Assets
NV11-IMG-010 · NV11-VID-LOOP-010 · NV11-SVG-011 · AutomationSynapse3D.tsx

---

# C11 — Analytics

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-analytics` |
| Ato | III — Produto |
| Hue | `285` |
| Tipo | `F2F` + `LIVE` |
| Pin | **300vh** |

### Conceito
Dados **evoluem** — gráficos quase vazios ganham vida via F2F 96 frames enquanto KPIs fazem count-up em React. Maria R$ 2.400 aparece no dashboard. Zoom out final → constelação C12.

### Copy
- **Headline:** Decisões guiadas por **dados que respiram.**

### Protagonista: Evolução de Dados (F2F) + Dashboard LIVE
NV11-F2F-003 + AnalyticsChartWire SVG sync + KPI widgets.

### Camadas
NV11-IMG-011 · NV11-VID-LOOP-011 · NV11-F2F-003 96f · AnalyticsChartWire · AnalyticsWidget LIVE

### Impacto 3s
Ponto central C10 → primeira barra cresce frame 0–8

### Interações mouse

| Input | Resposta |
|-------|----------|
| PEAK 0.5–0.8 | Hover KPI: tooltip expand; chart highlight |
| Scroll | F2F scrub + SVG bars sync progress |

### Scroll timeline

| Progress | F2F frame | LIVE |
|----------|-----------|------|
| 0.00 | 0 vazio | KPIs 0 |
| 0.35 | 34 | Count-up 50% |
| 0.65 | 62 | Pipeline R$ 47.8k |
| 1.00 | 95 denso | Zoom out inicia → C12 |

### Handoffs
- **Entrada:** Convergência nodes C10
- **Saída:** KPI positions → estrelas C12

### Assets
NV11-F2F-003 · NV11-IMG-011 · NV11-VID-LOOP-011 · NV11-SVG-012

---

# C12 — Benefícios

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-beneficios` |
| Ato | IV — Prova |
| Hue | `230` |
| Tipo | `3D` |
| Pin | **200vh** |

### Conceito
8 benefícios como **constelação 3D** — cada estrela é um ganho real. KPIs C11 mapeiam para posições estelares. Hover desenha linhas entre estrelas relacionadas.

### Copy
- **Headline:** Uma constelação de **ganhos reais.**

### Protagonista: Constelação de Ganhos
8 estrelas 3D + BenefitsConstellation SVG + labels DOM.

### Impacto 3s
Estrelas emergem stagger das posições KPI C11 (0.08s cada)

### Interações mouse

| Input | Resposta |
|-------|----------|
| `hover` estrela | Scale 1.2; DrawSVG linhas para vizinhos; card benefício |
| `mousemove` | Parallax céu ±4° |
| Scroll | Batch entrance completa até 0.5 |

### Scroll timeline

| Progress | Ação |
|----------|------|
| 0.00 | Map KPI→star positions |
| 0.50 | 8 estrelas visíveis |
| 1.00 | Hemisférios split → C13 |

### Handoffs
- **Entrada:** Zoom out KPIs C11
- **Saída:** Split constelação → slider C13

### Assets
NV11-IMG-012 · NV11-VID-LOOP-012 · NV11-SVG-013 · BenefitsConstellation3D.tsx

---

# C13 — Antes/Depois

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-antes-depois` |
| Ato | IV — Prova |
| Hue | `190` |
| Tipo | `3D` |
| Pin | **240vh** |

### Conceito
**Dois universos** divididos por slider draggable — esquerda caos vermelho (fragmentos C03 echo), direita ordem teal (fluxos organizados). MorphSVG ícones X→✓. Auto-drift scroll empurra para "depois".

### Copy
- **Headline:** O mesmo negócio, **dois universos.**

### Protagonista: Divisor de Dois Universos
BeforeAfterSplit3D + BeforeAfterSplitLine SVG + Draggable handle.

### Camadas
NV11-IMG-013a/b · NV11-VID-LOOP-013 · caos 3D left · ordem 3D right · split line

### Impacto 3s
Slider no centro 50%; esquerda shake sutil; direita calm pulse

### Interações mouse

| Input | Resposta |
|-------|----------|
| `drag` handle | clip-path split 10%–90% |
| `mousemove` esquerda | Fragmentos caóticos intensificam |
| `mousemove` direita | Fluxos aceleram |
| Scroll 0.5→1 | Auto drift handle 50%→65% |

### Handoffs
- **Entrada:** Split constelação C12
- **Saída:** Lado depois 75% → totens C14

### Assets
NV11-IMG-013a/b · NV11-VID-LOOP-013 · NV11-SVG-014 · BeforeAfterSplit3D.tsx

### Mobile
Drag mantido touch; universos simplificados

---

# C14 — Cases

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-cases` |
| Ato | IV — Prova |
| Hue | `160` |
| Tipo | `3D` |
| Pin | **220vh** |

### Conceito
5 **totens verticais** representam verticais de mercado com métricas reais (+38%, 3x, −65%, R$128k, +27%). Parallax horizontal no scroll. Métricas voam ao centro → social C15.

### Copy
- **Headline:** Cinco mercados, **um mesmo fluxo que vende.**

### Protagonista: Galeria Totem Vertical
5 totens depth Z + CASES data + VerticalTotems3D.

### Impacto 3s
Wipe reveal da direita; primeiro totem (Saúde) ergue scaleY 0→1

### Interações mouse

| Input | Resposta |
|-------|----------|
| `hover` totem | Scale 1.08; métrica pulse gold; copy expand |
| `mousemove` | Parallax horizontal totens ±15px depth |
| Scroll | Subtle parallax Z |

### Handoffs
- **Entrada:** Wipe C13 75%
- **Saída:** 5 métricas MotionPath → stats C15

### Assets
NV11-IMG-014 · NV11-VID-LOOP-014 · VerticalTotems3D.tsx

---

# C15 — Social Proof

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-social` |
| Ato | IV — Prova |
| Hue | `48` |
| Tipo | `LOOP` + `LIVE` |
| Pin | **180vh** |

### Conceito
Única cena com **loop como protagonista ambiente** — partículas gold convergem (trust). Stats LIVE count-up (+2.400 equipes, 12M+ msgs). Depoimentos com tilt 3D no hover.

### Copy
- **Headline:** +2.400 equipes **já cruzaram a linha.**

### Protagonista: Mural de Confiança Vivo
NV11-VID-LOOP-015 (10s warm gather) + SOCIAL_STATS count-up + TESTIMONIALS cards.

### Camadas
NV11-IMG-015 · **NV11-VID-LOOP-015 opacity 0.35** · stats orbit · testimonial cards

### Impacto 3s
4 stats fade in; count-up inicia; partículas warm loop visível

### Interações mouse

| Input | Resposta |
|-------|----------|
| `hover` depoimento | Tilt 3D card ±4°; quote highlight |
| `hover` stat | Orbit pause; stat scale 1.1 |
| Enter viewport | Count-up 0→valor em 1.8s |

### Scroll timeline

| Progress | Ação |
|----------|------|
| 0.00 | Métricas C14 chegam |
| 0.50 | Count-up completo |
| 1.00 | Stats formam círculo orbital → C16 |

### Handoffs
- **Entrada:** Métricas voando C14
- **Saída:** Círculo stats → anel Nexus C16

### Assets
NV11-IMG-015 · **NV11-VID-LOOP-015** · SOCIAL_STATS · TESTIMONIALS

### Mobile
Loop mantido 0.25 opacity; count-up mantido

---

# C16 — Integrações

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-integracoes` |
| Ato | IV — Prova |
| Hue | `205` |
| Tipo | `3D` |
| Pin | **220vh** |

### Conceito
**Nexus orbital** — core CRM emite filamentos para 8 integrações em 2 anéis. Velocidade órbita responde ao scroll. Hover ícone: linha energia ao core.

### Copy
- **Headline:** Tudo orbita **o seu CRM.**

### Protagonista: Nexus Orbital CRM
IntegrationNexus3D + IntegrationsOrbitPaths SVG + 8 ícones.

### Impacto 3s
Anel C15 morph → órbita interna; core pulsa; primeiro ícone (WhatsApp) acende

### Interações mouse

| Input | Resposta |
|-------|----------|
| `hover` ícone | Filament draw ao core 0.4s; ícone forward Z+30 |
| `drag` anel externo | Rotação manual (Draggable) |
| Scroll | Velocidade órbita += progress × 2 |

### Handoffs
- **Entrada:** Círculo stats C15
- **Saída:** Zoom core → portal C17

### Assets
NV11-IMG-016 · NV11-VID-LOOP-016 · NV11-SVG-015 · IntegrationNexus3D.tsx

---

# C17 — Agência

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-agencia` |
| Ato | V — Conversão |
| Hue | `270` |
| Tipo | `3D` |
| Pin | **240vh** |

### Conceito
**Portal multi-tenant** — iris 8 segmentos abre para grid de clientes white-label. MRR count-up R$ 128k. Portal revela sala de planos C18.

### Copy
- **Headline:** Multi-tenant, white-label **e MRR previsível.**

### Protagonista: Portal Multi-Tenant
AgencyPortal3D + AgencyPortalIris SVG MorphSVG + tenant grid cards.

### Impacto 3s
Core C16 morph portal; iris tremor pré-abertura

### Interações mouse

| Input | Resposta |
|-------|----------|
| `hover` tenant card | Depth Z+40; preview white-label mini |
| Scroll | Iris open 0→100%; MRR count-up 0.4→0.7 |

### Handoffs
- **Entrada:** Zoom core C16
- **Saída:** Portal abre sala ampla → monólitos C18

### Assets
NV11-IMG-017 · NV11-VID-LOOP-017 · NV11-SVG-016 · AgencyPortal3D.tsx

---

# C18 — Planos

| Meta | Valor |
|------|-------|
| ID DOM | `#cena-planos` |
| Ato | V — Conversão |
| Hue | `250` |
| Tipo | `3D` |
| Pin | **260vh** |

### Conceito
3 **monólitos glass** flutuam (Starter, Pro, Enterprise) — Pro em destaque gold. Magnetic hover. Cards dissolvem em partículas → CTA C19.

### Copy
- **Headline:** Escolha seu plano. **Escale quando quiser.**

### Protagonista: Monólitos de Pricing
PricingMonoliths3D ×3 + PLANS data React + PlansDecisionPaths SVG.

### Impacto 3s
3 monólitos emergem do portal C17; Pro já com glow gold

### Interações mouse

| Input | Resposta |
|-------|----------|
| `mousemove` card | Magnetic pull ±12px toward cursor |
| `hover` Pro | Forward Z+60; glow intensify; features stagger |
| `hover` outros | Dim 0.7 opacity |

### Scroll timeline

| Progress | Ação |
|----------|------|
| 0.00 | Monólitos emerge dolly out C17 |
| 0.40 | Pro scale 1.05 highlight |
| 0.80 | Feature lists stagger |
| 1.00 | Dissolve partículas gold → C19 |

### Handoffs
- **Entrada:** Portal sala C17
- **Saída:** Partículas → void C19 F2F frame 0

### Assets
NV11-IMG-018 · NV11-VID-LOOP-018 · NV11-SVG-017 · PricingMonoliths3D.tsx

---

# C19 — CTA Final

| Meta | Valor |
|------|-------|
| ID DOM | `#s-cta-eco` |
| Ato | V — Conversão |
| Hue | `265` + gold climax |
| Tipo | `HYB` F2F + 3D |
| Pin | **300vh** |

### Conceito
**Clímax cinematográfico** — rios gold e violet convergem; silhueta owl abstrata em partículas; CRM compacto operacional; CTAs magnetic. Sensação de chegada e decisão.

### Copy
- **CTA Primary:** Começar grátis — sem cartão
- **CTA Secondary:** Falar com especialista

### Protagonista: Convergência F2F + Owl pulse 3D + CRM compact
NV11-F2F-004 80f + CtaConvergenceRays SVG + CTA buttons magnetic.

### Camadas
NV11-IMG-019 · NV11-VID-LOOP-019 · NV11-F2F-004 · CtaConvergenceRays · CTA ecosystem compact

### Impacto 3s
Partículas C18 convergem; primeiro raio gold draw

### Interações mouse

| Input | Resposta |
|-------|----------|
| `mousemove` CTA | Magnetic pull buttons ±8px |
| `hover` primary CTA | Scale 1.05; glow gold ring expand |
| Scroll | F2F scrub convergência; owl silhouette forma 0.5 |

### Scroll timeline

| Progress | Ação |
|----------|------|
| 0.00 | Partículas dispersas pós C18 |
| 0.35 | Rios luz convergem |
| 0.55 | Owl silhouette partículas |
| 0.75 | Clímax luminoso |
| 0.85 | CTAs scale in |
| 1.00 | Hold estável loop |

### Handoffs
- **Entrada:** Dissolve partículas C18
- **Saída:** Fim jornada — loop hold ou scroll footer

### Assets
NV11-F2F-004 · NV11-IMG-019 · NV11-VID-LOOP-019 · NV11-SVG-018 · SectionEcosystemCta.tsx

### Mobile
Pin 200vh; F2F poster frame 60 no reduced-motion; CTAs full width

### Performance
Último F2F pinned — unload frames cenas anteriores

---

## Checklist de aprovação por cena

Para cada C01–C19, validar antes de produção:

- [ ] Conceito alinhado ao roteiro do ato
- [ ] Camadas documentadas com opacity e z
- [ ] Mouse: ≥3 interações definidas
- [ ] Scroll: timeline 0→1 completa
- [ ] Handoff entrada e saída na continuity chain
- [ ] Assets NV11 listados com IDs
- [ ] Componente React nomeado
- [ ] Mobile fallback definido
- [ ] Performance budget respeitado

---

## Documentos relacionados

- [Matriz resumida](KORUVISION-Protagonists-Matrix.md)
- [Continuidade frame-a-frame](KORUVISION-Narrative-Continuity-Chain.md)
- [Prompts imagem](../assets/prompts/v11/image-prompts.md)
- [Prompts vídeo](../assets/prompts/v11/video-prompts.md)
- [SVGs](../assets/prompts/v11/svg-specs.md)
- [Animações GSAP](../assets/prompts/v11/animation-specs.md)
- [3D interativo](../assets/prompts/v11/3d-interactive-specs.md)
