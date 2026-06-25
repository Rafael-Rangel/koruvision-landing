# KORUVISION x FlowIA — Upgrade Cinematografico v1.0

> Camada de motion premium: scroll scrub F2F, profundidade 3D, transicoes fly-through
> Complementa: docs/KORUVISION-Landing-Oficial-v2.md
> Principio: **descoberta a cada scroll** — cada ato entrega um efeito novo

---

## ESTRATEGIA GLOBAL UPGRADE

### Pilares cinematicos

1. **Scroll como camera** — dolly, push-in, pull-out, orbit simulados via camadas Z
2. **F2F onde o tempo importa** — transicoes, morphs, reveals (nao UI estatica legivel)
3. **React onde o texto importa** — telas SaaS montadas em camadas GSAP (nao frames com texto)
4. **Hibrido por padrao** — F2F + GSAP + React na mesma secao, fases distintas do pin
5. **Progressive enhancement** — Desktop: experiencia completa | Mobile: video loop + GSAP simplificado

### Orcamento F2F expandido (desktop)

| Bloco | Frames est. | Peso lazy |
|-------|-------------|-----------|
| S01 Hero | 120 | ~1.6 MB |
| S02 Problema | 80 | ~1.0 MB |
| S03 Bridge | 150 | ~2.0 MB |
| S04 Demo | 450 | ~6.0 MB |
| S05 Setup | 90 | ~1.2 MB |
| S06-S15 (pontuais) | 280 | ~3.5 MB |
| S19 CTA | 100 | ~1.3 MB |
| **Total** | **~1270** | **~16 MB** (lazy por secao, nunca tudo junto) |

Meta performance: carregar F2F da secao atual + preload da proxima apenas.

### Tier mobile (automatico)

- F2F scrub OFF → MP4 concatenado por secao pinned OU GSAP-only
- Particulas reduzidas 80%
- ScrollSmoother OFF
- WebGL OFF

---

## TABELA MESTRA — 19 SECOES

Legenda complexidade: L Baixa | M Media | H Alta | VH Muito Alta
Impacto visual / performance: Baixo | Medio | Alto | Muito Alto

| Secao | Tipo de animacao | Tecnologia | Video loop | F2F scrub | Complexidade | Impacto visual | Impacto performance |
|-------|------------------|------------|------------|-----------|--------------|----------------|---------------------|
| S01 Hero | Push-in dolly + split reveal + ambient depth | F2F + GSAP + Canvas particles + CSS 3D | Sim V-01 | Sim 120f V-02 | VH | Muito Alto | Medio (lazy) |
| S02 Problema | Cards emergem do Z + micro-cenas stress scrub | F2F + GSAP + imagens I-05-08 | Nao | Sim 80f (4x20) | H | Alto | Baixo-Medio |
| S03 Bridge | Fly-through tunnel + morph orbs caos->ordem | F2F + MorphSVG + Flip + GSAP pin | Opcional V-04 | Sim 150f | VH | Muito Alto | Medio |
| S04 Demo | Camera atravessa UI; montagem peca a peca; morph CRM->Kanban->Agenda | React + F2F + GSAP pin + layer 3D | Nao UI | Sim 450f transicoes | VH | Muito Alto | Alto (mitigado lazy) |
| S05 Como funciona | Numeros gigantes em Z; QR scan cinematic | F2F + GSAP + SplitText + MorphSVG | Opcional V-10 | Sim 90f | H | Alto | Medio |
| S06 Agentes IA | Split screen scrub + carousel horizontal | F2F + GSAP horizontal + React chat | Opcional V-11 | Sim 60f comparativo | H | Alto | Medio |
| S07 Inbox | Wake-up interface + callouts orbit | React + F2F intro + MotionPath | Nao | Sim 45f intro | M | Alto | Baixo-Medio |
| S08 Funil | Card journey cinematic + confetti | React + F2F snap 40f + MotionPath | Nao | Sim 40f momentos | H | Muito Alto | Medio |
| S09 Automacoes | Pipeline energia + draw + particles path | DrawSVG + F2F 90f + GSAP | Opcional loop | Sim 90f | H | Alto | Medio |
| S10 Beneficios | Grid stagger + agency hero build | GSAP + F2F 30f card agencia | Nao | Leve 30f | M | Medio | Baixo |
| S11 Antes/Depois | Scrub morph caos->controle + draggable | F2F 80f + Draggable + I-14/15 | Nao | Sim 80f | H | Muito Alto | Medio |
| S12 Cases | Horizontal dolly + depth parallax 3 camadas | GSAP horizontal + F2F 20f/card | Nao | Sim 100f total | H | Alto | Medio |
| S13 Social | Counters + marquee + growth scrub BG | GSAP + F2F 45f + V-17 loop | Opcional V-17 | Sim 45f BG | M | Alto | Baixo-Medio |
| S14 Integracoes | Orbit 3D simulado + fly central node | MotionPath + CSS 3D + GSAP | Opcional V-18 | Nao* | H | Alto | Medio |
| S15 Agencia | Portal warp impersonation | Flip + F2F 50f warp + React | Opcional V-19 | Sim 50f | H | Muito Alto | Medio |
| S16 Seguranca | Escudo assemble + hex field | DrawSVG + F2F 40f + MorphSVG | Nao | Sim 40f | M | Alto | Baixo |
| S17 Planos | Cards rise + flip toggle | GSAP Flip + ScrollTrigger | Nao | Nao | M | Medio | Baixo |
| S18 FAQ | Accordion spring | GSAP + CSS | Nao | Nao | L | Baixo | Muito Baixo |
| S19 CTA Final | Pull-out epico + conversas->deals scrub | F2F 100f + V-20 loop + SplitText | Sim V-20 | Sim 100f entrada | VH | Muito Alto | Medio |

*S14: orbit puro em GSAP 3D layers; video opcional so como textura de fundo sem scrub.

---

## DETALHAMENTO POR SECAO — PROPOSTAS OUSADAS

### S01 — HERO: "Entrada na maquina"

**Conceito:** Usuario atravessa um portal de luz roxo/ouro ate o produto.

| Fase scroll | Efeito | Tech |
|-------------|--------|------|
| 0-30% | V-01 loop + particulas mouse + headline SplitText | Video A + Canvas |
| 30-70% | F2F V-02 scrub: caos WhatsApp -> dashboard glow (camera pull-out) | F2F 120f |
| 70-100% | M-01 em CSS 3D: rotateX leve + float + rim light gold | GSAP + layers |

**3D layers (5):** void | grid SVG | particulas | F2F/mockup | copy
**Mouse:** particulas atraidas ao cursor; glow radial segue mouse
**Transicao saida:** mask circular expand + blur dinamico -> S02

---

### S02 — PROBLEMA: "Queda no abismo"

**Conceito:** Quatro micro-historias; cada card e uma janela para um mundo stress.

- Cada card: **20 frames F2F** loop scrub ao hover ou ao entrar no viewport (I-05-08 animados sutilmente via Ken Burns F2F)
- Cards entram de **Z=-500px** perspectiva com rotacao X 15deg
- Stat 78%: counter com shake camera leve
- **Saida:** tela comprime horizontalmente (scaleX 0.8) + chromatic aberration CSS -> S03

---

### S03 — BRIDGE: "Atravessar o tunel"

**Conceito:** Usuario **voa** por um tunel de orbs vermelhos que viram verdes.

- Pin **250vh**
- F2F **150 frames** full-bleed (V-04 ou gerado): orbs passando pela camera
- Sincronizado: Flip cards + MorphSVG no meio do tunel (50-75% scroll)
- **Fly-through:** scale tunnel walls 1->3; opacity orbs trail
- Paleta scrub: desaturado vermelho -> electric purple/gold

---

### S04 — DEMO: "Montagem do produto no ar" (PIECE DE RESISTANCE)

**Conceito:** Camera avanca **atraves** de camadas de UI; cada step monta o SaaS peca a peca.

**5 acts pinned 500vh:**

| Step | F2F (transicao) | React (hold) | Efeito 3D |
|------|-----------------|--------------|-----------|
| 1 WhatsApp | 50f push-in tela | Chat monta bubbles | Layer z: notch, status, chat, input |
| 2 IA | 50f neural burst | Agent panel + typing | Split depth: chat | brain viz |
| 3 Kanban | 50f card fly | Card slide colunas | Board em perspectiva isometrica |
| 4 Agenda | 50f calendar bloom | Event drop | Flip calendario 3D |
| 5 Dashboard | 50f pull-out wide | Metrics count up | Camera orbit 15deg |

**Morph fluido:** Dashboard layer no final **decompoe** em modulos que viram icones S10
**Particulas:** stream roxo entre steps durante F2F
**Mobile:** 1 video MP4 de 30s com chapters OU swipe tabs sem F2F

---

### S05 — SETUP: "Tres portais"

- Numeros 01/02/03 em **Z-space** — passam pela camera como placas
- F2F QR: scan -> explosion verde -> WhatsApp connected (90f)
- MorphSVG numero no cruzamento de chapters

---

### S06 — AGENTES: "Duelo de personalidades"

- Horizontal pin 300vw
- F2F **60f** scrub no toggle: lado esquerdo robo glitch | direito IA calorosa
- Chat React com depth: bubbles em Z alternado

---

### S07 — INBOX: "Sala de comando acorda"

- F2F **45f** intro: tela off -> ping -> inbox ilumina
- Depois React full; callouts em **orbit** 3D ao redor do mockup
- Mensagens entram de Z negativo

---

### S08 — FUNIL: "Gravidade do deal"

- MotionPath card + **40f F2F** no snap de cada coluna (motion blur frames)
- Confetti WebGL/canvas burst no Fechado
- Pipeline counter com camera shake micro

---

### S09 — AUTOMACOES: "Sistema nervoso"

- DrawSVG progressivo + **90f F2F** energia percorrendo nodes
- Particulas seguem path em loop apos completo
- Isometric 3D CSS no diagrama

---

### S10 — BENEFICIOS: "Constelacao de features"

- Grid stagger padrao
- Card Agencia: **30f F2F** mini painel montando + expand accordion
- Hover: tilt 3D per card (vanilla + GSAP quickTo)

---

### S11 — ANTES/DEPOIS: "Linha do tempo visual"

- Draggable + **F2F 80f** scrub entre I-14 e I-15 (crossfade profundo, nao so wipe)
- Scroll adicional move divider 50->80%
- Tabela comparativa surge do chao (translateZ)

---

### S12 — CASES: "Galeria orbital"

- Horizontal scroll com **parallax 3 camadas** por card (foto | texto | metricas)
- **20f F2F** Ken Burns por case ao focar
- Transicao entre cards: push lateral com motion blur CSS

---

### S13 — SOCIAL: "Mural de provas"

- Counters epic
- Marquee duplo
- V-17 loop OU **45f scrub** growth lines atras dos numeros

---

### S14 — INTEGRACOES: "Ecossistema em orbita"

- **CSS 3D preserve-3d** — 3 aneis em rotacao diferente
- Logos em MotionPath; hover: zoom camera para logo
- Sem F2F obrigatorio; impacto via profundidade simulada

---

### S15 — AGENCIA: "Portal entre clientes"

- F2F **50f** circular warp ao clicar tenant (como portal)
- Flip para dashboard do cliente
- V-19 opcional como textura ambiente

---

### S16 — SEGURANCA: "Fortaleza digital"

- Escudo DrawSVG + **40f F2F** hex grid ativando
- Pecas puzzle lock-in com glow green

---

### S17 — PLANOS: "Escolha do caminho"

- GSAP Flip toggle; cards rise
- Sem F2F — respiro visual antes do CTA final

---

### S18 — FAQ: "Clareza"

- Accordion spring; busca filter
- Pausa cinematica intencional — contraste com S19

---

### S19 — CTA: "Convergencia"

- **100f F2F scrub entrada:** bolhas convergindo (V-20 frames)
- Ao completar scrub -> V-20 loop seamless
- Headline explode; shockwave SVG
- Pull-out camera: copy zoom 1->0.95 enquanto BG expande
- Particulas mouse gold nesta secao

---

## MATRIZ TECNOLOGIA POR SECAO

| Secao | 1 Loop video | 2 F2F scrub | 3 3D layers | 4 GSAP+SVG | 5 React+GSAP | Hibrido recomendado |
|-------|-------------|-------------|-------------|------------|--------------|---------------------|
| S01 | V-01 | V-02 120f | 5 camadas | SplitText, grid | M-01 holder | **1+2+3+4+5** |
| S02 | — | 80f | cards Z | stagger, counter | — | **2+3+4** |
| S03 | V-04 opt | 150f | tunnel | Flip, MorphSVG | — | **1+2+3+4** |
| S04 | — | 450f | UI layers | pin, scrub | 5 UIs | **2+3+4+5** |
| S05 | V-10 opt | 90f | numeros Z | MorphSVG | wizard | **2+3+4+5** |
| S06 | V-11 opt | 60f | split depth | horizontal | chat | **1+2+4+5** |
| S07 | — | 45f intro | callout orbit | MotionPath | inbox | **2+3+4+5** |
| S08 | — | 40f snaps | isometric | MotionPath | kanban | **2+3+4+5** |
| S09 | loop opt | 90f | isometric | DrawSVG | — | **1+2+3+4** |
| S10 | — | 30f | card tilt | stagger | agencia | **3+4+5** |
| S11 | — | 80f | slider Z | Draggable | — | **2+3+4** |
| S12 | — | 100f | 3-layer | horizontal | cards | **2+3+4** |
| S13 | V-17 | 45f | — | marquee, counter | — | **1+2+4** |
| S14 | V-18 opt | — | orbit 3D | MotionPath | tooltips | **1+3+4** |
| S15 | V-19 opt | 50f | warp | Flip | tenants | **1+2+3+4+5** |
| S16 | — | 40f | — | DrawSVG, Morph | — | **2+4** |
| S17 | — | — | card lift | Flip | pricing | **3+4+5** |
| S18 | — | — | — | accordion | search | **4+5** |
| S19 | V-20 | 100f | parallax | SplitText | CTAs | **1+2+3+4+5** |

---

## SEQUENCIA DE "WOW" (por que continuar rolando)

| Ordem scroll | Momento wow |
|--------------|-------------|
| 1 | Headline materializa palavra a palavra |
| 2 | Camera mergulha no produto (F2F hero) |
| 3 | Cards de dor saem do abismo 3D |
| 4 | Tunel de transformacao (fly-through) |
| 5 | UI se monta ao vivo — 5 capitulos |
| 6 | QR explode em conexao |
| 7 | IA vs robo split scrub |
| 8 | Card voa pelo funil |
| 9 | Energia no workflow |
| 10 | Slider caos/controle |
| 11 | Cases em dolly horizontal |
| 12 | Portal agencia |
| 13 | Explosao final CTA |

---

## CUSTO REPLICATE UPGRADE

| Item | Estimativa |
|------|------------|
| 30 imgs regen FLUX.2 | US$ 3-6 |
| Videos fonte F2F (~15 clipes x 5-8s) | US$ 8-18 |
| Re-takes 2x | US$ 10-15 |
| **Total upgrade cinematico** | **US$ 35-50** |

---

## ORDEM DE IMPLEMENTACAO (upgrade)

1. FramePlayer engine + preload inteligente
2. S01 + S19 (bookends cinematicos)
3. S04 (demo — maior ROI)
4. S03 + S11 (transicoes narrativas)
5. S02, S05-S08, S12, S15
6. Restante + mobile tier
7. Performance pass + reduced-motion

---

*Documento upgrade cinematico — complementa Landing Oficial v2.0*