# KORUVISION x FlowIA — DIRETRIZ MASTER v3.0
## Experiencia Cinematografica Continua · GSAP · Scroll Storytelling

> ⚠️ **Filosofia de mídia atualizada pela v4:** ver `docs/KORUVISION-Master-Directive-v4.md`  
> v4 restaura vídeo + F2F em abundância. v3 permanece válida para narrativa contínua e Motion System.

> Substitui abordagem "Frame -> Video -> Frame" **desconectada** (não elimina vídeo).
> Principio: **uma unica corrente visual** atravessa as 19 secoes.

---

# PARTE I — ANALISE DE REFERENCIAS E TECNOLOGIA

## 1.1 O que sites premium fazem (padroes extraidos)

| Referencia | Profundidade | Narrativa | Scroll | GSAP | Video |
|------------|--------------|-----------|--------|------|-------|
| Lando Norris | Frame scrub + pin | Biografica linear | Scrub = camera | ScrollTrigger pin, sequencias | Frames, nao MP4 scrub |
| Apple | Camadas produto 3D fake | Reveal produto | Snap sections + scrub curto | Pouco GSAP publico | Video loop ambiente raro |
| Stripe | Gradientes mesh, parallax sutil | Modular por bloco | Reveal on enter | Leve | Quase zero |
| Linear | Tipografia, espaco | Minimal | Fade/stagger | Minimo | Zero |
| Vercel | Grid, clareza | Tecnica | Scroll suave | Leve | Zero |
| Shopify Editions | Capitulos pinned | Evento anual | Scrollytelling pesado | Timelines + pin | Seletivo cinematic |
| Arc / Raycast | Glass, depth, glow | Produto craft | Micro parallax | CSS+leve JS | Zero |
| Awwwards/FWA | Variado | Story first | Pin + horizontal | GSAP dominante | So quando necessario |

**Conclusao:** Os melhores NAO dependem de video no scroll. Usam:
- **ScrollTrigger scrub** em timelines (nao em MP4)
- **Camadas PNG/WebP** com parallax independente
- **React/UI real** para produto
- **SVG animado** para fluxos e conexoes
- **Frame sequences** apenas como **sequencia de imagens scrubbed** — idealmente **pintadas/desenhadas por camada**, nao "video exportado e fatiado"

## 1.2 Ecossistema GSAP — papel de cada plugin

| Plugin | Funcao na landing | Secoes |
|--------|-------------------|--------|
| ScrollTrigger | Pin, scrub, batch reveal, horizontal | Todas |
| ScrollSmoother | Desktop only, lerp scroll | Global desktop |
| Timeline + nested | Orquestrar atos por secao | S01-S19 |
| SplitText / split-type | Headlines cinematicas | S01,S05,S19 |
| Flip | Continuidade entre secoes (mesmo elemento) | S03,S15,S17 |
| MorphSVG | Transformacao organica icones/paths | S03,S09,S16 |
| MotionPath | Card funil, orbitas, callouts | S08,S07,S14 |
| DrawSVG | Workflow, escudo, data river | S09,S16,+thread global |
| Draggable | Before/after, carousel | S11,S06 |
| Observer | Mouse parallax, pause off-screen | S01,S14,S19 |
| ScrollToPlugin | Nav jump suave | Navbar |
| matchMedia | Desktop vs mobile tiers | Global |

**Nao usar por padrao:** InertiaPlugin (mobile), ScrollSmoother (mobile)

## 1.3 Tecnologias complementares — decisao critica

| Tech | Quando SIM | Quando NAO |
|------|------------|------------|
| React+GSAP | UI produto, demo, inbox, kanban | Backgrounds estaticos |
| Canvas 2D | Particulas, F2F scrub | UI com texto |
| WebP sequences | Scrub cinematico **desenhado** | Substituir UI |
| Lenis | Alternativa ScrollSmoother | Com ScrollSmoother junto |
| Three.js/R3F | Hero particles 3D opcional tier A | 17/19 secoes |
| Lottie | Icones complexos pontuais | Hero inteiro |
| Video MP4 | Loop ambiente **sem** scrub | Narrativa scroll |
| Kling/IA video | Gerar **keyframes fonte** OU loops BG | UI legivel |

## 1.4 Principio anti-"assistir videos"

**PROIBIDO como padrao:** scroll = reproduzir clipes MP4

**SUBSTITUIR POR:**
1. **Master Timeline Global** — SVG `data-river` path que atravessa S01-S19 (DrawSVG progress)
2. **Shared Elements** — mesma bolha de chat (Flip) vira card Kanban vira evento agenda
3. **Scrub de propriedades CSS/GSAP** — camera = `translateZ + scale + rotateX` em camadas
4. **F2F como ilustracao scrubbed** — sequencia **curada** (30-90 frames), nao extracao cega de video

---

# PARTE II — FIO CONDUTOR NARRATIVO

**Metáfora:** O visitante **mergulha no olhar da coruja KORUVISION** — um rio de dados roxo/ouro que nasce no caos (S01) e converge em receita previsivel (S19).

**Arco emocional:**
- S01-S02: Tensao (frio, vermelho residual)
- S03-S04: Revelacao (transicao violacea)
- S05-S15: Maestria (UI viva, verde sucesso pontual)
- S16-S18: Racional (confianca, preco)
- S19: Convergencia (ouro + convite)

**Elemento continuo:** `#data-river` SVG fixo em `position:fixed` opacity 0.15, `stroke-dashoffset` ligado ao scroll global 0-100%.

**Temperatura de cor por ato:**
- Ato1: `#4B5E80` dominante
- Ato2: `#9D4EDD` dominante  
- Ato3: `#FFB700` + `#10B981` acentos

---

# PARTE III — TABELA COMPLETA DAS 19 SECOES

Colunas: Narrativa | Animacao | GSAP | Profundidade | Video | F2F | PNG layers | SVG | React | Three | Impacto | Complex | Custo | Perf Desktop | Perf Mobile

---

## S01 — HERO · "O Olhar se Abre"

**Narrativa:** Usuario emerge no void KORUVISION. Particulas convergem como visao de coruja. Headline materializa. O rio de dados nasce. Mockup do produto surge do fundo em perspectiva.

| Campo | Valor |
|-------|-------|
| Animacao | Hibrido: GSAP + Canvas particles + CSS 3D layers + SplitText |
| GSAP | ScrollTrigger, SplitText, Observer, ScrollSmoother(desktop) |
| Profundidade | Fake 3D — 6 camadas (void, grid, particles, glow, device, copy) |
| Video | Opcional: loop ambiente 6s **muted, sem scrub** — BG camada 2 |
| F2F | Nao — profundidade via layers scrubbed com GSAP |
| PNG layers | bg-void, grid-SVG, particle-canvas, device-M01, glow-overlay |
| SVG | grid perspectiva animado |
| React | Shell mockup holder apenas |
| Three.js | Opcional tier A: particulas WebGL — impacto +2, perf -1 |
| Impacto visual | 9/10 |
| Complexidade | 8/10 |
| Custo producao | Medio |

**Perf Desktop:** lazy particles 80 max; ScrollSmoother lerp 0.08; will-change so no stage
**Perf Mobile:** sem Smoother; 20 particulas; SplitText -> fade simples; sem WebGL

**CTA:** Comecar gratis | Ver demonstracao

---

## S02 — PROBLEMA · "O Abismo do Caos"

**Narrativa:** O rio de dados tropega, fica vermelho. Quatro portais mostram dores (WhatsApp, planilha, bot, pipeline). Cards emergem de Z negativo como se caidos no abismo. Stat 78% pulsa.

| Campo | Valor |
|-------|-------|
| Animacao | GSAP stagger 3D + Ken Burns sutil em imagens |
| GSAP | ScrollTrigger batch, counter |
| Profundidade | Fake 3D cards perspective 800px |
| Video | Nao |
| F2F | Nao — I-05 a I-08 estaticos com transform GSAP |
| PNG layers | 4 cards + I-30 bg + vignette vermelha overlay |
| SVG | icones alerta pulse |
| React | Nao |
| Three.js | Nao |
| Impacto | 8/10 |
| Complexidade | 5/10 |
| Custo | Baixo |

**Transicao -> S03:** cards comprimem no centro (scale 0.5) + chromatic aberration CSS

---

## S03 — BRIDGE · "Atravessia"

**Narrativa:** Usuario **atravessa** um tunel de luz — nao assiste video. Os 4 cards do S02 **Flip** para posicoes dos 4 pilares. MorphSVG: X -> check. Cor: danger -> success/purple. O rio de dados muda de vermelho para roxo.

| Campo | Valor |
|-------|-------|
| Animacao | Hibrido: Flip + MorphSVG + colorProps + parallax tunel |
| GSAP | ScrollTrigger pin 250vh scrub, Flip, MorphSVG |
| Profundidade | Fake 3D tunel — 5 aneis elipse SVG scale scrub |
| Video | Nao |
| F2F | Opcional 40 frames tunel abstrato — preferir **SVG aneis** |
| PNG layers | aneis tunel SVG + cards + pillars |
| SVG | tunel + morph icons |
| React | Nao |
| Three.js | Nao |
| Impacto | 10/10 |
| Complexidade | 9/10 |
| Custo | Medio-Alto |

**WOW #2:** Flip continuo dos mesmos DOM nodes S02->S03

---

## S04 — DEMO · "Dentro da Maquina" (SECAO PROVA)

**Narrativa:** Camera **mergulha** no produto. Cinco atos pinned. Cada ato: UI React monta peca a peca (status bar, chat, kanban...). Entre atos: **transicao de camera** via GSAP layers (nao video). O rio de dados flui **atraves** das telas.

| Campo | Valor |
|-------|-------|
| Animacao | React state machine + GSAP ScrollTrigger pin 500vh + CSS 3D |
| GSAP | pin, scrub, timeline por step, SplitText step titles |
| Profundidade | Fake 3D — cada UI layer translateZ independente |
| Video | Nao para UI |
| F2F | Nao — **proibido** texto em frames |
| PNG layers | D-01 plate + UI component layers |
| SVG | progress connector entre steps |
| React | UIWhatsApp, UIAgent, UIKanban, UICalendar, UIDashboard |
| Three.js | Nao |
| Impacto | 10/10 |
| Complexidade | 10/10 |
| Custo | Alto |

**Scroll 0-20%:** pin engage, step1 UI layers enter from Z
**20-40%:** step2 IA panel + typing simulation
**40-60%:** step3 card flies MotionPath
**60-80%:** step4 calendar drop
**80-100%:** step5 dashboard metrics count + CTA spring

**Perf Desktop:** React memo; animate only visible step; preload next step assets
**Perf Mobile:** pin 200vh; tabs swipe OR video chaptered single MP4 **sem scrub**

---

## S05 — SETUP · "Tres Portais"

**Narrativa:** Numeros 01/02/03 passam pela camera como monolitos. QR code **DrawSVG** + scan line GSAP. Conexao WhatsApp pulsa verde.

| Campo | Valor |
|-------|-------|
| Animacao | GSAP pin + MorphSVG numeros + DrawSVG QR |
| GSAP | pin 360vh, SplitText, MorphSVG |
| Profundidade | Fake 3D numeros Z-space |
| Video | Nao |
| F2F | Nao |
| PNG/SVG | numeros SVG, QR SVG, wizard UI React leve |
| React | wizard steps simplificado |
| Three.js | Nao |
| Impacto | 8/10 |
| Complexidade | 7/10 |
| Custo | Medio |

---

## S06 — AGENTES · "Personalidade"

**Narrativa:** Horizontal gallery. Chats simulados com personalidade. Toggle compara tom robotico vs humano — **mesma conversa**, dois estilos, scrub horizontal.

| Campo | Valor |
|-------|-------|
| Animacao | GSAP horizontal + React chat timelines |
| GSAP | horizontal ScrollTrigger, Observer pause |
| Profundidade | Parallax leve cards |
| Video | Nao |
| F2F | Nao |
| React | Chat sim, agent cards, toggle |
| Impacto | 8/10 |
| Complexidade | 7/10 |
| Custo | Medio |

---

## S07 — INBOX · "Sala de Comando"

**Narrativa:** Inbox acende modulo por modulo (como ligar consoles). Callouts orbitam em MotionPath. Handoff IA-humano pulsa amber.

| Campo | Valor |
|-------|-------|
| Animacao | React UIInbox + GSAP callouts + message loop |
| GSAP | ScrollTrigger stagger, MotionPath |
| Profundidade | Fake 3D tilt mockup |
| Video | Nao |
| React | UIInboxThreeColumn completo |
| Impacto | 8/10 |
| Complexidade | 7/10 |
| Custo | Medio |

---

## S08 — FUNIL · "Gravidade do Deal"

**Narrativa:** Card Maria percorre pipeline com **fisica**. Snap magnetico em cada coluna. Confetti canvas no Fechado. Counter R$ sobe.

| Campo | Valor |
|-------|-------|
| Animacao | MotionPath + React Kanban + canvas confetti |
| GSAP | MotionPath, counter, ScrollTrigger |
| Profundidade | Isometric CSS board |
| Video | Nao |
| React | UIKanbanBoard |
| Impacto | 9/10 |
| Complexidade | 8/10 |
| Custo | Medio |

---

## S09 — AUTOMACOES · "Sistema Nervoso"

**Narrativa:** Workflow se desenha. Particulas percorrem path = automacao viva. Nodes acendem em sequencia.

| Campo | Valor |
|-------|-------|
| Animacao | DrawSVG + MotionPath particles |
| GSAP | DrawSVG, ScrollTrigger scrub draw progress |
| Profundidade | Isometric 2.5D CSS |
| Video | Nao |
| SVG | workflow completo |
| Impacto | 8/10 |
| Complexidade | 6/10 |
| Custo | Baixo-Medio |

---

## S10 — BENEFICIOS · "Constelacao"

**Narrativa:** 12 estrelas-features acendem. Card Agencia expande. Hover tilt 3D convida exploracao.

| Campo | Valor |
|-------|-------|
| Animacao | GSAP batch + CSS tilt |
| GSAP | ScrollTrigger batch |
| Profundidade | tilt per card |
| Video | Nao |
| React | card agencia expand |
| Impacto | 6/10 |
| Complexidade | 4/10 |
| Custo | Baixo |

---

## S11 — ANTES/DEPOIS · "A Linha"

**Narrativa:** Slider entre dois mundos. Scroll move divisor. Mesmo espaco, duas realidades. Tabela comparativa sobe do chao.

| Campo | Valor |
|-------|-------|
| Animacao | Draggable + GSAP scrub + clip-path morph |
| GSAP | Draggable, ScrollTrigger scrub |
| Profundidade | Parallax 2 layers I-14/I-15 |
| Video | Nao |
| F2F | Nao — clip-path + crossfade GSAP superior |
| PNG | I-14, I-15 layered |
| Impacto | 9/10 |
| Complexidade | 7/10 |
| Custo | Baixo |

---

## S12 — CASES · "Mercados"

**Narrativa:** Dolly horizontal por 5 verticais. Cada card = mundo proprio. Metricas contam ao focar.

| Campo | Valor |
|-------|-------|
| Animacao | horizontal scroll + parallax 3-layer |
| GSAP | horizontal pin, counter |
| Profundidade | 3-layer parallax per card |
| Video | Nao |
| PNG | I-16 a I-20 |
| Impacto | 7/10 |
| Complexidade | 6/10 |
| Custo | Baixo |

---

## S13 — SOCIAL · "Prova"

**Narrativa:** Numeros epicos. Marquee infinito duplo. Avatares humanizam.

| Campo | Valor |
|-------|-------|
| Animacao | counters + marquee |
| GSAP | counter, infinite repeat |
| Video | Nao |
| Impacto | 7/10 |
| Complexidade | 4/10 |
| Custo | Baixo |

---

## S14 — INTEGRACOES · "Orbita"

**Narrativa:** Ecossistema orbita o nucleo FlowIA. Logos em MotionPath 3D CSS. Hover zoom.

| Campo | Valor |
|-------|-------|
| Animacao | MotionPath + CSS preserve-3d |
| GSAP | MotionPath, Observer |
| Profundidade | Fake 3D orbit 3 aneis |
| Video | Nao |
| SVG | logos |
| Impacto | 8/10 |
| Complexidade | 7/10 |
| Custo | Medio |

---

## S15 — AGENCIA · "Portal"

**Narrativa:** Flip impersonation — card expande fullscreen. Portal warp CSS. MRR counter.

| Campo | Valor |
|-------|-------|
| Animacao | Flip + React tenants |
| GSAP | Flip, counter |
| Profundidade | warp scale radial gradient |
| Video | Nao |
| React | UIAgencyTenants |
| Impacto | 9/10 |
| Complexidade | 8/10 |
| Custo | Medio |

---

## S16 — SEGURANCA · "Fortaleza"

**Narrativa:** Escudo se constrói. Pecas encaixam. Hex grid ativa.

| Campo | Valor |
|-------|-------|
| Animacao | DrawSVG + MorphSVG |
| GSAP | DrawSVG scrub |
| Video | Nao |
| SVG | escudo, hex grid |
| Impacto | 7/10 |
| Complexidade | 5/10 |
| Custo | Baixo |

---

## S17 — PLANOS · "Escolha"

**Narrativa:** Respiro visual. Cards sobem. Toggle Flip precos. Popular glow.

| Campo | Valor |
|-------|-------|
| Animacao | GSAP Flip + stagger |
| Video | Nao |
| React | PricingCards |
| Impacto | 6/10 |
| Complexidade | 5/10 |
| Custo | Baixo |

---

## S18 — FAQ · "Clareza"

**Narrativa:** Pausa intencional. Accordion spring. Busca filter.

| Campo | Valor |
|-------|-------|
| Animacao | GSAP spring accordion |
| Video | Nao |
| React | FAQ search |
| Impacto | 4/10 |
| Complexidade | 3/10 |
| Custo | Baixo |

---

## S19 — CTA · "Convergencia"

**Narrativa:** O rio de dados **converge** no centro. Headline explode. Shockwave SVG. CTAs gold pulse. Universo inteiro respira convite.

| Campo | Valor |
|-------|-------|
| Animacao | SplitText + SVG shockwave + canvas particles + Observer |
| GSAP | SplitText, ScrollTrigger, Observer |
| Profundidade | parallax BG layers + pull-out camera |
| Video | Opcional loop ambiente **sem scrub** full-bleed |
| F2F | Nao — convergencia via SVG particles + GSAP |
| PNG | I-32 bg + particle canvas |
| React | CTAs |
| Impacto | 10/10 |
| Complexidade | 8/10 |
| Custo | Medio |

---

# PARTE IV — 10 MOMENTOS WOW

| # | Momento | Secao | Implementacao | Tech | Impacto | Custo |
|---|---------|-------|---------------|------|---------|-------|
| 1 | Headline nasce palavra a palavra | S01 | SplitText stagger | GSAP | Alto | Baixo |
| 2 | Mesmos cards dor viram solucao | S03 | Flip DOM persistente | Flip | Muito alto | Medio |
| 3 | Tunel de aneis atravessado | S03 | SVG scale scrub pin | GSAP+SVG | Muito alto | Medio |
| 4 | Camera mergulha no WhatsApp | S04 | UI layers translateZ | React+GSAP | Muito alto | Alto |
| 5 | Card voa pelo funil | S08 | MotionPath magnetic | GSAP | Alto | Medio |
| 6 | Slider caos/controle | S11 | Draggable+scrub | GSAP | Alto | Baixo |
| 7 | Portal agencia | S15 | Flip fullscreen warp | Flip+React | Alto | Medio |
| 8 | Data river completa jornada | Global | DrawSVG 0-100% scroll | SVG+ST | Alto | Medio |
| 9 | QR explosion conexao | S05 | DrawSVG+flash green | GSAP | Medio | Baixo |
| 10 | Convergencia final CTA | S19 | SplitText+shockwave | GSAP+SVG | Muito alto | Medio |

---

# PARTE V — ONDE F2F E VIDEO AINDA FAZEM SENTIDO

## Video MP4 (loop, sem scrub): OPCIONAL
- S01 BG ambiente sutil
- S19 BG ambiente
- **Total: 0-2 loops** — nunca narrativa principal

## F2F scrub: REDUZIDO vs plano anterior
- **Removido** de S04 UI (substituido por React)
- **Removido** de S11 (clip-path)
- **Opcional** S03 tunel se SVG insuficiente (40-60 frames pintados)
- **Total projeto: 0-60 frames** vs 1270 anterior

## Substituto universal: GSAP scrub em propriedades
`progress 0->1` controla: translateZ, scale, rotateX, opacity, strokeDashoffset, morph progress, Flip progress

---

# PARTE VI — ARQUITETURA TECNICA

```
app/
  components/
    motion/     FrameScrubber, ParallaxLayer, DataRiver, ParticleField
    ui/         5 golden screens + inbox + kanban + agency
    sections/   S01.tsx ... S19.tsx
  lib/
    gsap/       registerPlugins, matchMedia tiers, useScrollProgress
  styles/
    tokens.css  KORUVISION palette
```

**Master ScrollTimeline:** um `gsap.timeline({ scrollTrigger: { trigger: 'main', start:'top top', end:'bottom bottom', scrub: 1 }})` com labels por secao.

---

# PARTE VII — CUSTO REPLICATE REVISADO (v3)

| Item | USD |
|------|-----|
| 30 imgs FLUX (cenas, sem UI texto) | 3-6 |
| 0-2 loops video ambiente | 1-2 |
| **Total** | **$5-10** |

Economia massiva vs plano F2F+video pesado.

---

*Diretriz Master v3 — Narrativa continua · GSAP-first · React para UI · Video opcional*

**Motion System:** ver `docs/KORUVISION-Motion-System.md` (BUILD / PEAK / EXIT)

**Depth System:** ver `docs/KORUVISION-Depth-System.md`

**Análise crítica interação/3D/hover:** ver `docs/KORUVISION-Motion-Upgrade-Analysis.md`