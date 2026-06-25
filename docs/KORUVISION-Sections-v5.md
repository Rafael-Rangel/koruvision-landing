# KORUVISION FlowIA — Especificação de Seções v5
## Codinome: Névoa Neural · S01–S19

> **Versão:** 5.0 · UTF-8  
> **Motion:** BUILD 48% / PEAK 24% / EXIT 28% (`KORUVISION-Motion-System.md`)  
> **Camadas L1–L10:** video · gsap · svg · particles · parallax · 3d · mouse · hover · motion · f2f  
> **Fio condutor:** NV5-SVG-001 Data River (DrawSVG global S01→S19)  
> **Referência S04:** `demo/s04.html` (grid 38% narrativa + 62% stage 3D, 5 atos pinned)

---

## Legenda camadas

| Camada | Função |
|--------|--------|
| L1 video | Loop MP4 ambiente (muted, sem scrub narrativo) |
| L2 gsap | ScrollTrigger, timelines, React state |
| L3 svg | DrawSVG, MorphSVG, MotionPath paths |
| L4 particles | Canvas / ParticleField WebGL |
| L5 parallax | Scroll + mouse depth factors |
| L6 3d | preserve-3d, camera-rig, translateZ stack |
| L7 mouse | Observer, MouseGlow, magnetic |
| L8 hover | TiltCard, DepthHover, microinterações |
| L9 motion | BUILD/PEAK/EXIT, SplitText, Flip |
| L10 f2f | Canvas FrameScrubber (NV5-F2F-*) |

**Ativo:** ● pleno · ○ reduzido · — desligado

---

## S01 — Hero · "O Observatório se Abre"

| Campo | Valor |
|-------|-------|
| **Slug** | `s01-hero-observatorio` |
| **Objetivo psicológico** | Despertar curiosidade premium + sensação de escala ("universo KORUVISION"). Posicionar FlowIA como CRM+IA inevitável. Conversão imediata: trial sem fricção. |
| **Headline** | **Suas conversas viram receita previsível.** |
| **Subheadline** | CRM com IA para WhatsApp — qualifique leads, feche deals e veja tudo num painel que pensa com você. |
| **CTA primário** | Começar grátis — 14 dias, sem cartão |
| **CTA secundário** | Ver demonstração ↓ |
| **Layout** | `grid 12col`: col 1–6 copy + CTAs; col 7–12 `DepthStage` full-bleed. Stack Z: void → device M-01 → float chips. Nav fixa + scroll hint. |
| **Assets** | IMG: NV5-IMG-001, 002, 003, 004, 039 · VID: NV5-VID-001, 015 · F2F: NV5-F2F-001 · SVG: NV5-SVG-001, 002, 003, 027 · R: NV5-R-021, 006, 007, 009, 010, 004 |
| **Camadas** | video ● · gsap ● · svg ● · particles ● · parallax ● · 3d ● · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | ScrollTrigger, ScrollSmoother (desktop), SplitText, Observer |
| **Motion BUILD** | Void emerge; partículas convergem (visão coruja); SplitText headline palavra a palavra; Data River stroke 0→8%; F2F portal push-in 0→48%; device sobe translateZ -200→+90. |
| **Motion PEAK** | Headline legível 100%; mockup estável; MouseGlow ativo; river pulse suave; câmera sem drift. |
| **Motion EXIT** | Device scale 1→0.94 + chromatic aberration leve; névoa danger-fog entra nas bordas; F2F frames 108–150; river tinge vermelho. |
| **Hover/micro** | MagneticButton CTAs; TiltCard device rim glow; scroll hint bob; CTA gold shadow expand. |
| **Desktop** | Pin **400vh** · scrub 1.2 · F2F-001 150f · VID-015 loop L1 -300Z · ScrollSmoother lerp 0.08 |
| **Mobile** | Pin 240vh · sem Smoother · 20 partículas · SplitText→fade · F2F tier reduced (MP4 capítulo VID-001) · scrub 0.8 |
| **Impacto** | 10 · **Complexidade** | 9 |

---

## S02 — Problema · "Névoa Vermelha"

| Campo | Valor |
|-------|-------|
| **Slug** | `s02-problema-nevoa-vermelha` |
| **Objetivo psicológico** | Validar dor do ICP (caos operacional). Criar tensão identificável antes da solução. Stat 78% ancora urgência. |
| **Headline** | **Sua operação está perdida na névoa.** |
| **Subheadline** | WhatsApp solto, planilhas quebradas, bots sem alma e pipeline vazio — o lead esfria enquanto você apaga incêndio. |
| **CTA** | Quero sair do caos → (scroll S03) |
| **Layout** | `grid 2×2` cards dor + col lateral stat counter. BG vignette full-bleed. Cards perspective 800px, stagger Z negativo. |
| **Assets** | IMG: NV5-IMG-005, 006, 007, 008, 043 · VID: NV5-VID-002 · F2F: NV5-F2F-002 · SVG: NV5-SVG-004, 005, 006, 007, 001 · R: NV5-R-022, 005 |
| **Camadas** | video ○ · gsap ● · svg ○ · particles ○ · parallax ● · 3d ● · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | ScrollTrigger, batch, counter |
| **Motion BUILD** | 4 cards caem de Z-400 com stagger 0.12s; ícones MorphSVG pulse danger; F2F micro-cenas 25f/card; river vermelho tropega; stat 0→78%. |
| **Motion PEAK** | 4 dores legíveis; stat pulsa; cards estáveis; Ken Burns sutil nas IMG. |
| **Motion EXIT** | Cards comprimem centro scale 1→0.5; chromatic aberration; river stroke flicker; prep Flip S03. |
| **Hover/micro** | TiltCard +3° cada dor; ícone shake leve; stat glow vermelho no hover. |
| **Desktop** | Pin **280vh** · F2F-002 100f segmentado por card · batch stagger on enter |
| **Mobile** | Pin 180vh · cards stack vertical · F2F off · fade stagger · sem 3D tilt |
| **Impacto** | 8 · **Complexidade** | 6 |

---

## S03 — Bridge · "Atravessia Neural"

| Campo | Valor |
|-------|-------|
| **Slug** | `s03-bridge-atravessia` |
| **Objetivo psicológico** | Alívio emocional — caos vira ordem. WOW Flip: mesmos elementos, nova narrativa. Preparar desejo pelo produto. |
| **Headline** | **Atravesse. Do caos ao controle.** |
| **Subheadline** | Quatro pilares substituem quatro dores — o rio de dados volta a fluir em violeta e ouro. |
| **CTA** | Entrar na máquina → (scroll S04) |
| **Layout** | Pin full-viewport: túnel SVG central + 4 pilares nos cantos. Cards S02 Flip para posições pilar. Grid overlay 4col labels. |
| **Assets** | IMG: NV5-IMG-009, 010, 011, 046 · VID: NV5-VID-003 · F2F: NV5-F2F-003 · SVG: NV5-SVG-008, 009, 001 · R: NV5-R-023 |
| **Camadas** | video ● · gsap ● · svg ● · particles ● · parallax ● · 3d ● · mouse ● · hover ○ · motion ● · f2f ● |
| **GSAP plugins** | ScrollTrigger pin scrub, Flip, MorphSVG, colorProps |
| **Motion BUILD** | Anéis túnel scale scrub 0→5; F2F fly-through 0–60f caos; Flip cards dor→pilares; MorphSVG X→✓; river danger→violet. |
| **Motion PEAK** | Túnel sincronizado cyan-gold; 4 pilares com check; Flip completo; câmera estável no centro do túnel. |
| **Motion EXIT** | Aceleração F2F 120–180f; pilares dissolvem para void; portal abre para S04; river gold pulse. |
| **Hover/micro** | Pilares glow cyan no focus; anéis ripple ao passar scroll threshold. |
| **Desktop** | Pin **350vh** · F2F-003 180f · Flip DOM persistente S02→S03 · snap no PEAK |
| **Mobile** | Pin 220vh · Flip simplificado · F2F off, SVG anéis only · scrub 1.0 |
| **Impacto** | 10 · **Complexidade** | 9 |

---

## S04 — Demo · "Dentro da Máquina"

| Campo | Valor |
|-------|-------|
| **Slug** | `s04-demo-dentro-maquina` |
| **Objetivo psicológico** | Prova visceral do produto — "eu quero isso". Cinco atos = jornada lead→receita. CTA trial no ato 5. |
| **Headline** | **Dentro da máquina.** |
| **Subheadline** | Do WhatsApp ao pipeline — cinco atos, um único fluxo. Você controla a câmera. |
| **CTA** | Começar grátis agora (visível ato 5, PEAK) |
| **Layout** | Ref. `demo/s04.html`: `grid minmax(280px,38%) 1fr` · esquerda: eyebrow + headline + act-nav (5 pips) + act-copy + CTA · direita: `stage-zone` → `camera-rig` → 6 depth layers + `device-stack` + 5 `ui-screen` · float panels orbitais. |
| **Assets** | IMG: NV5-IMG-012, 013, 014, 040 · VID: NV5-VID-004, 005 · F2F: NV5-F2F-004 · SVG: NV5-SVG-010, 011, 001 · R: NV5-R-024, 006, 008, 011, 012, 013, 014, 015, 004 |
| **Camadas** | video ● · gsap ● · svg ● · particles ○ · parallax ● · 3d ● · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | ScrollTrigger pin scrub, MotionPath, SplitText, Observer, Flip (chips) |
| **5 Atos** | **A1** Lead WhatsApp · UIWhatsApp · CAM z:-40 · F2F 0–99 · **A2** IA personalidade · UIAgentPanel · z:50 · F2F 100–199 · **A3** Kanban Maria · UIKanbanBoard · z:80 · MotionPath card · F2F 200–299 · **A4** Agenda auto · UICalendarView · z:35 · F2F 300–399 · **A5** Dashboard · UIDashboard · z:-30 pull-back · F2F 400–499 |
| **Motion BUILD** | Por ato: UI layers enter translateZ stagger; bubbles/cards `elementState()`; camera interpola `CAM_CONFIGS`; river DrawSVG segmento. |
| **Motion PEAK** | Tela UI 100% montada; act-copy legível; float panels estáveis; explore orbit Observer ±8°. |
| **Motion EXIT** | F2F screen blend sobre UI; morph chip→próximo elemento; camera glide para próximo CAM_CONFIG; nunca opacity-only. |
| **Hover/micro** | DepthHover mockup layers; float panels lift Z+20; CTA spring ato 5; act-pips scrub feedback. |
| **Desktop** | Pin **620vh** · scrub 2.8 · F2F-004 500f · snap 5 labels PEAK · preload step N+1 |
| **Mobile** | Pin 380vh · scrub 1.6 · tabs swipe OU MP4 capítulo único · F2F off · UI simplificada |
| **Impacto** | 10 · **Complexidade** | 10 |

---

## S05 — Setup · "Três Portais"

| Campo | Valor |
|-------|-------|
| **Slug** | `s05-setup-tres-portais` |
| **Objetivo psicológico** | Reduzir medo de implementação — "é rápido". Ritual 01→02→03 cria confiança procedural. |
| **Headline** | **Três portais. Cinco minutos. Pronto.** |
| **Subheadline** | Conecte o WhatsApp, configure seu agente e importe contatos — o rio de dados começa a fluir sozinho. |
| **CTA** | Conectar meu WhatsApp |
| **Layout** | Pin: 3 monolitos glass em perspectiva Z + wizard React lateral. Números gigantes 01/02/03 SplitText. QR center stage. |
| **Assets** | IMG: NV5-IMG-015, 016 · VID: NV5-VID-006 · F2F: NV5-F2F-005 · SVG: NV5-SVG-012, 023 · R: NV5-R-025 |
| **Camadas** | video ● · gsap ● · svg ● · particles ○ · parallax ● · 3d ● · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | ScrollTrigger pin, SplitText, DrawSVG, MorphSVG |
| **Motion BUILD** | Monolito 01 passa câmera Z; QR DrawSVG 0→100%; scan line gold; explosão verde conexão; F2F 0–80f. |
| **Motion PEAK** | Três portais linkados; passo ativo iluminado cyan; números legíveis; WhatsApp pulse verde. |
| **Motion EXIT** | Monolito 03 unfold panels; rio gold conecta os três; F2F 80–120f; handoff S06. |
| **Hover/micro** | Portal gates rim glow; step pills hover cyan; QR shimmer on hover. |
| **Desktop** | Pin **360vh** · F2F-005 120f · SplitText números scrub-synced |
| **Mobile** | Pin 220vh · wizard accordion vertical · F2F off · DrawSVG QR estático |
| **Impacto** | 8 · **Complexidade** | 7 |

---

## S06 — Agentes · "Personalidade IA"

| Campo | Valor |
|-------|-------|
| **Slug** | `s06-agentes-personalidade` |
| **Objetivo psicológico** | Diferenciar de bots genéricos — IA com tom humano configurável. Toggle robô vs humano = prova instantânea. |
| **Headline** | **IA que fala como sua marca.** |
| **Subheadline** | Cinco personalidades prontas ou a sua — o lead não percebe que é automação. |
| **CTA** | Criar meu agente |
| **Layout** | Scroll horizontal pin: gallery 5 agent cards + chat sim duplicado (toggle). Track 300vw. Identity core macro center. |
| **Assets** | IMG: NV5-IMG-017, 018 · F2F: NV5-F2F-006 · SVG: NV5-SVG-001 · R: NV5-R-026, 012 |
| **Camadas** | video ○ · gsap ● · svg ○ · particles — · parallax ● · 3d ○ · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | ScrollTrigger horizontal, Observer pause, timeline chat |
| **Motion BUILD** | Cards enter stagger X; chat bubbles typewriter; toggle scrub F2F caos→controle 0–80f. |
| **Motion PEAK** | Conversa completa legível ambos lados toggle; agent card focado scale 1.05. |
| **Motion EXIT** | Gallery slide out; chat compress → chip S07; personality core pulse. |
| **Hover/micro** | Agent card tilt + personality color shift; toggle spring; chat bubble highlight. |
| **Desktop** | Pin **300vh** horizontal · F2F-006 80f no toggle scrub · Observer pause off-screen |
| **Mobile** | Swipe carousel · toggle tap · F2F off · chat estático |
| **Impacto** | 8 · **Complexidade** | 7 |

---

## S07 — Inbox · "Sala de Comando"

| Campo | Valor |
|-------|-------|
| **Slug** | `s07-inbox-sala-comando` |
| **Objetivo psicológico** | Sensação de controle total — war room. Handoff IA→humano reduz medo de "perder o toque". |
| **Headline** | **Sua sala de comando.** |
| **Subheadline** | Inbox unificado, tags inteligentes e handoff suave — nenhuma conversa se perde. |
| **CTA** | Ver inbox ao vivo |
| **Layout** | `grid 7col`: mockup 3-col inbox 5col + callouts MotionPath orbit 2col. Command deck BG 21:9. |
| **Assets** | IMG: NV5-IMG-019, 042 · F2F: NV5-F2F-007 · SVG: NV5-SVG-001, 024 · R: NV5-R-027, 016 |
| **Camadas** | video ○ · gsap ● · svg ● · particles ○ · parallax ● · 3d ● · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | ScrollTrigger stagger, MotionPath, Observer |
| **Motion BUILD** | Módulos acendem sequência (lista→thread→painel); F2F wake 0–60f; callouts orbit enter. |
| **Motion PEAK** | UIInboxThreeCol completo; handoff amber pulse; callouts legíveis; tilt mockup estável. |
| **Motion EXIT** | Callouts retract; highlight deal card → handoff S08; river segment glow. |
| **Hover/micro** | FloatPanel callouts lift; thread row highlight; DepthHover inbox columns. |
| **Desktop** | Pin **280vh** · F2F-007 60f intro · message loop GSAP |
| **Mobile** | Stack vertical · callouts tooltip · F2F off · stagger reduzido |
| **Impacto** | 8 · **Complexidade** | 7 |

---

## S08 — Funil · "Gravidade do Deal"

| Campo | Valor |
|-------|-------|
| **Slug** | `s08-funil-gravidade-deal` |
| **Objetivo psicológico** | Visualizar pipeline como física inevitável — deals "caem" para fechamento. Dopamina no confetti. |
| **Headline** | **Gravidade do deal.** |
| **Subheadline** | Maria percorre o funil com snap magnético — de lead frio a contrato fechado num gesto. |
| **CTA** | Organizar meu pipeline |
| **Layout** | Isometric Kanban 4 colunas + card hero MotionPath. BG vortex + lanes. Counter R$ overlay. |
| **Assets** | IMG: NV5-IMG-020, 021, 047 · VID: NV5-VID-007 · F2F: NV5-F2F-008 · SVG: NV5-SVG-011, 024 · R: NV5-R-028, 013, 015 |
| **Camadas** | video ● · gsap ● · svg ○ · particles ● · parallax ● · 3d ● · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | MotionPath, ScrollTrigger snap, counter, canvas confetti |
| **Motion BUILD** | Card Maria enter col 1; snap gates gold sequencial; F2F 15f/gate; counter R$ 0→valor. |
| **Motion PEAK** | Card em "Fechado"; confetti canvas; métricas estáveis; kanban legível. |
| **Motion EXIT** | Card lift → automation node S09; vortex pull-back; sparkline draw. |
| **Hover/micro** | Coluna hover magnetic snap preview; card drag ghost; LiveGraph bars pulse. |
| **Desktop** | Pin **320vh** · F2F-008 60f nos snaps · MotionPath spline |
| **Mobile** | Pin 200vh · card auto-animate sem drag · confetti reduzido · F2F off |
| **Impacto** | 9 · **Complexidade** | 8 |

---

## S09 — Automações · "Sistema Nervoso"

| Campo | Valor |
|-------|-------|
| **Slug** | `s09-automacoes-sistema-nervoso` |
| **Objetivo psicológico** | Automação como organismo vivo — não fluxograma morto. Confiança em escala sem equipe extra. |
| **Headline** | **O sistema nervoso do seu CRM.** |
| **Subheadline** | Triggers, condições e ações — energia percorre cada nó enquanto você dorme. |
| **CTA** | Automatizar agora |
| **Layout** | Workflow canvas isometric 2.5D + node constellation BG. DrawSVG path overlay. 6 nodes hex layout. |
| **Assets** | IMG: NV5-IMG-022, 023 · VID: NV5-VID-008 · F2F: NV5-F2F-009 · SVG: NV5-SVG-013, 014, 023 · R: NV5-R-029, 017 |
| **Camadas** | video ● · gsap ● · svg ● · particles ● · parallax ● · 3d ○ · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | DrawSVG scrub, MotionPath, ScrollTrigger |
| **Motion BUILD** | Path DrawSVG 0→100%; pacote cyan 20f/node; particles L4 seguem path; F2F sync 120f. |
| **Motion PEAK** | Workflow completo iluminado; UIWorkflowCanvas interativo; node ativo gold corona. |
| **Motion EXIT** | Pulse success wave; path glow fade; filament web BG brighten → S10. |
| **Hover/micro** | Node hover expand + tooltip; path segment highlight; trigger pill ripple. |
| **Desktop** | Pin **300vh** · VID-008 loop L1 40% · F2F-009 120f · DrawSVG scrub |
| **Mobile** | Pin 180vh · animação linear sem scrub · particles off · 4 nodes visíveis |
| **Impacto** | 8 · **Complexidade** | 6 |

---

## S10 — Benefícios · "Constelação"

| Campo | Valor |
|-------|-------|
| **Slug** | `s10-beneficios-constelacao` |
| **Objetivo psicológico** | Consolidar valor racional — 12 benefícios memoráveis. Card Agência expande para segmento secundário. |
| **Headline** | **Doze estrelas. Um sistema.** |
| **Subheadline** | Cada benefício é um nó da constelação FlowIA — passe o mouse e descubra. |
| **CTA** | Explorar benefícios |
| **Layout** | Radial grid 12 nodes em círculo + card Agência expand center-bottom. Constellation platform BG. |
| **Assets** | IMG: NV5-IMG-024, 041 · F2F: NV5-F2F-010 · SVG: NV5-SVG-001, 022 · R: NV5-R-030, 005 |
| **Camadas** | video — · gsap ● · svg ○ · particles — · parallax ● · 3d ○ · mouse ● · hover ● · motion ● · f2f ○ |
| **GSAP plugins** | ScrollTrigger batch, Flip (card agência) |
| **Motion BUILD** | Estrelas acendem batch stagger 0.08s; gold filaments connect; bokeh parallax enter. |
| **Motion PEAK** | 12 nodes ativos; card Agência collapsed legível; constellation estável. |
| **Motion EXIT** | Card Agência Flip expand preview S15; nodes dim exceto 3 âncoras. |
| **Hover/micro** | TiltCard cada estrela + tooltip benefit; Agência card expand spring; icon glow. |
| **Desktop** | Sem pin · batch on enter · F2F-010 40f on Agência accordion only |
| **Mobile** | Grid 3×4 · tap expand tooltip · sem tilt · F2F off |
| **Impacto** | 6 · **Complexidade** | 4 |

---

## S11 — Antes/Depois · "A Linha"

| Campo | Valor |
|-------|-------|
| **Slug** | `s11-antes-depois-linha` |
| **Objetivo psicológico** | Contraste visceral caos vs controle — decisão racional emocionalmente carregada. Slider = agência do usuário. |
| **Headline** | **A linha entre o caos e o controle.** |
| **Subheadline** | Mesmo negócio, dois universos — arraste e veja onde você está hoje. |
| **CTA** | Quero o lado direito |
| **Layout** | Full-bleed split slider Draggable + tabela comparativa 6 rows abaixo. Clip-path morph divider. |
| **Assets** | IMG: NV5-IMG-025, 026 · VID: NV5-VID-009 · F2F: NV5-F2F-011 · SVG: NV5-SVG-025 · R: NV5-R-031 |
| **Camadas** | video ● · gsap ● · svg ○ · particles — · parallax ● · 3d ● · mouse ● · hover ● · motion ○ · f2f ● |
| **GSAP plugins** | Draggable, ScrollTrigger scrub, attrPlugin clip |
| **Motion BUILD** | Slider default 30% caos; F2F scrub 0–50f caos; tabela rows rise stagger. |
| **Motion PEAK** | Qualquer posição slider legível; ambos lados nítidos no viewport; tabela visível. |
| **Motion EXIT** | Auto-slide 30→70% no scroll; F2F 50–100f controle; divider gold flash. |
| **Hover/micro** | Divider handle glow + scale; row hover highlight; antes/depois labels pulse. |
| **Desktop** | Pin **280vh** · F2F-011 100f sync slider.progress · Draggable free |
| **Mobile** | Pin 180vh · preset buttons Caos/Controle · F2F off · crossfade GSAP |
| **Impacto** | 9 · **Complexidade** | 7 |

---

## S12 — Cases · Mercados (horizontal)

| Campo | Valor |
|-------|-------|
| **Slug** | `s12-cases-horizontal` |
| **Objetivo psicológico** | Prova por vertical — "funciona no meu mercado". Métricas concretas geram identificação. |
| **Headline** | **Cinco mercados. Um fluxo.** |
| **Subheadline** | Saúde, imóveis, consultoria, agências e e-commerce — resultados reais em cada vertical. |
| **CTA** | Ver case completo |
| **Layout** | Horizontal scroll pin 5 cards × 80vw. Cada card: niche IMG + métricas 3-up + quote slot. Dolly parallax 3-layer. |
| **Assets** | IMG: NV5-IMG-027, 028, 029, 030, 031 · F2F: NV5-F2F-012 · SVG: NV5-SVG-022 · R: NV5-R-032, 005 |
| **Camadas** | video — · gsap ● · svg — · particles ○ · parallax ● · 3d ● · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | ScrollTrigger horizontal pin, counter |
| **Motion BUILD** | Cards enter X stagger; métricas count on focus; F2F Ken Burns 24f/card no foco. |
| **Motion PEAK** | Card central scale 1; métricas estáveis; niche BG legível; quote visible. |
| **Motion EXIT** | Blur lateral cards; central card hold; river branch por vertical. |
| **Hover/micro** | TiltCard case card; métrica hover count replay; CTA slide-in on focus. |
| **Desktop** | Pin **350vh** horizontal · F2F-012 120f (5×24f) · snap center card |
| **Mobile** | Swipe snap carousel · métricas estáticas · F2F off · 1 card viewport |
| **Impacto** | 7 · **Complexidade** | 6 |

---

## S13 — Social Proof

| Campo | Valor |
|-------|-------|
| **Slug** | `s13-social-proof` |
| **Objetivo psicológico** | Validação social numérica + humanização. Marquee infinito = momentum. |
| **Headline** | **+2.400 equipes já cruzaram.** |
| **Subheadline** | Números que falam, depoimentos que convencem — a névoa neural tem dono. |
| **CTA** | Juntar-se a elas |
| **Layout** | Row counters 4-up epic + dual marquee logos/quotes + cluster proof center. Growth particles BG. |
| **Assets** | IMG: NV5-IMG-032 · VID: NV5-VID-010 · F2F: NV5-F2F-013 · SVG: NV5-SVG-024 · R: NV5-R-033 |
| **Camadas** | video ● · gsap ● · svg ○ · particles ● · parallax ○ · 3d — · mouse ● · hover ○ · motion ● · f2f ● |
| **GSAP plugins** | counter, infinite repeat marquee, ScrollTrigger |
| **Motion BUILD** | Counters 0→target stagger; marquee start; F2F particles rise scrub; sparkline draw. |
| **Motion PEAK** | Números estáveis legíveis; marquee fluido; proof cluster glow. |
| **Motion EXIT** | Counters hold; marquee decelerate; fade to orbit S14. |
| **Hover/micro** | Counter hover replay; quote card subtle lift; marquee pause on hover. |
| **Desktop** | Sem pin · F2F-013 60f BG scrub 0–100% section · VID-010 loop L1 |
| **Mobile** | Counters simplified 2-up · marquee single row · F2F off · particles CSS only |
| **Impacto** | 7 · **Complexidade** | 4 |

---

## S14 — Integrações · Órbita

| Campo | Valor |
|-------|-------|
| **Slug** | `s14-integracoes-orbita` |
| **Objetivo psicológico** | Ecossistema — FlowIA não é ilha. Órbita 3D reduz objeção "não integra". |
| **Headline** | **Tudo orbita o seu CRM.** |
| **Subheadline** | WhatsApp, pagamentos, calendário, webhooks e mais — conectados por filamentos de dados. |
| **CTA** | Ver integrações |
| **Layout** | Centro: core orb gold. 3 anéis elípticos MotionPath + 12 satellite logo slots. BG halo 16:9. |
| **Assets** | IMG: NV5-IMG-033 · VID: NV5-VID-011 · SVG: NV5-SVG-015, 016, 017, 021 · R: NV5-R-034 |
| **Camadas** | video ● · gsap ● · svg ● · particles ○ · parallax ● · 3d ● · mouse ● · hover ● · motion ● · f2f — |
| **GSAP plugins** | MotionPath, Observer, ScrollTrigger |
| **Motion BUILD** | Anéis DrawSVG; satellites enter orbit stagger; core pulse; VID-011 loop start. |
| **Motion PEAK** | Órbita estável; logos legíveis; 3 rings parallax; core gold steady. |
| **Motion EXIT** | Satellites accelerate; core beam → portal S15; rings collapse inward. |
| **Hover/micro** | OrbitZoom logo +150% + tooltip; ring hover speed change; core ripple. |
| **Desktop** | Pin **280vh** · VID-011 loop only (sem F2F) · Observer orbit drag |
| **Mobile** | Grid 4×3 logos estáticos · sem 3D orbit · video off |
| **Impacto** | 8 · **Complexidade** | 7 |

---

## S15 — Agência · Portal

| Campo | Valor |
|-------|-------|
| **Slug** | `s15-agencia-portal` |
| **Objetivo psicológico** | Segmento agências — white-label, multi-tenant, MRR. Portal warp = desejo de escala. |
| **Headline** | **Seu portal. Suas marcas.** |
| **Subheadline** | Gerencie clientes, personalize white-label e escale MRR — um portal, infinitos tenants. |
| **CTA** | Conhecer plano Agência |
| **Layout** | Card expand Flip fullscreen + tenant grid orbit. Portal threshold BG. MRR counter hero. |
| **Assets** | IMG: NV5-IMG-034 · VID: NV5-VID-012 · F2F: NV5-F2F-014 · SVG: NV5-SVG-026 · R: NV5-R-035, 018 |
| **Camadas** | video ● · gsap ● · svg ○ · particles ● · parallax ● · 3d ● · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | Flip, counter, ScrollTrigger |
| **Motion BUILD** | Card Agência Flip expand; portal iris open F2F 0–20f; tenants stagger enter. |
| **Motion PEAK** | UIAgencyTenants completo; MRR counter estável; warp settled. |
| **Motion EXIT** | Portal warp F2F 20–70f; tenant focus → security handoff S16; radial gradient collapse. |
| **Hover/micro** | Tenant card hover color shift; portal rim pulse; MRR tick on hover. |
| **Desktop** | Pin **300vh** · F2F-014 70f on tenant click · Flip DOM |
| **Mobile** | Accordion tenants · portal static IMG · F2F off · counter simplified |
| **Impacto** | 9 · **Complexidade** | 8 |

---

## S16 — Segurança · Fortaleza

| Campo | Valor |
|-------|-------|
| **Slug** | `s16-seguranca-fortaleza` |
| **Objetivo psicológico** | Neutralizar objeção compliance/privacidade. Escudo construído = confiança tangível. |
| **Headline** | **Fortaleza de dados.** |
| **Subheadline** | Criptografia, LGPD e isolamento por tenant — seus dados atrás de hexágonos de vidro. |
| **CTA** | Ler política de segurança |
| **Layout** | Centro: shield SVG build. Hex grid field BG. 4 badge pills (LGPD, SSL, backup, tenant). Square fortress lattice. |
| **Assets** | IMG: NV5-IMG-035 · F2F: NV5-F2F-015 · SVG: NV5-SVG-018, 019 · R: NV5-R-036 |
| **Camadas** | video — · gsap ● · svg ● · particles ○ · parallax ○ · 3d ○ · mouse ○ · hover ○ · motion ● · f2f ● |
| **GSAP plugins** | DrawSVG, MorphSVG, ScrollTrigger |
| **Motion BUILD** | Hex grid DrawSVG 0→100%; shield MorphSVG wire→solid; F2F 50f sync; badges fade in. |
| **Motion PEAK** | Escudo completo cyan pulse; badges legíveis; lattice estável. |
| **Motion EXIT** | Pulse radial frame 40–50; shield glow fade; calm handoff S17. |
| **Hover/micro** | Badge pill hover expand detail; hex cell ripple; shield rim glow. |
| **Desktop** | Sem pin · F2F-015 50f on scroll 40–100% · DrawSVG scrub |
| **Mobile** | Shield static + badges list · F2F off · SVG simplificado |
| **Impacto** | 7 · **Complexidade** | 5 |

---

## S17 — Planos

| Campo | Valor |
|-------|-------|
| **Slug** | `s17-planos` |
| **Objetivo psicológico** | Decisão racional com respiro visual. Toggle mensal/anual = urgência econômica. Popular glow guia escolha. |
| **Headline** | **Escolha seu portal.** |
| **Subheadline** | Starter, Pro e Agência — comece grátis e escale quando o rio de dados crescer. |
| **CTA** | Começar grátis / Assinar Pro |
| **Layout** | 3 pricing cards center + toggle Flip top. Tier glow pedestals BG blur. Popular card scale 1.05 + gold rim. |
| **Assets** | IMG: NV5-IMG-044 · SVG: NV5-SVG-022 · R: NV5-R-037, 019, 004 |
| **Camadas** | video — · gsap ● · svg — · particles — · parallax ○ · 3d — · mouse ○ · hover ● · motion ● · f2f — |
| **GSAP plugins** | Flip, ScrollTrigger stagger |
| **Motion BUILD** | Cards rise translateY 60→0 stagger; toggle enter; tier glow BG fade. |
| **Motion PEAK** | 3 planos legíveis; preços estáveis pós-Flip toggle; popular glow pulse. |
| **Motion EXIT** | Cards subtle float; CTA magnetic prep; river gold accent. |
| **Hover/micro** | FlipToggle mensal/anual; TiltCard plan cards; Popular card gold shimmer; CTA MagneticButton. |
| **Desktop** | Sem pin · Flip toggle prices · stagger 0.1s |
| **Mobile** | Stack cards vertical · toggle tap · sem tilt · sticky CTA bottom |
| **Impacto** | 6 · **Complexidade** | 5 |

---

## S18 — FAQ

| Campo | Valor |
|-------|-------|
| **Slug** | `s18-faq` |
| **Objetivo psicológico** | Pausa intencional — remover últimas objeções sem pressão. Clareza = confiança final. |
| **Headline** | **Perguntas que a névoa esconde.** |
| **Subheadline** | Respostas diretas sobre setup, IA, preços e segurança — sem juridiquês. |
| **CTA** | Falar com suporte |
| **Layout** | `grid 5col/7col`: busca + accordion 12 itens left · clarity fog BG right. Max-width 720px copy. |
| **Assets** | IMG: NV5-IMG-045 · SVG: NV5-SVG-022 · R: NV5-R-020 |
| **Camadas** | video — · gsap ● · svg — · particles — · parallax — · 3d — · mouse — · hover ○ · motion ○ · f2f — |
| **GSAP plugins** | spring accordion, ScrollTrigger |
| **Motion BUILD** | Accordion items fade stagger; search input focus glow; fog BG clarify left→right. |
| **Motion PEAK** | Item aberto legível 100%; demais collapsed; busca responsiva. |
| **Motion EXIT** | Accordion settle; fog dissipate; soft prep S19. |
| **Hover/micro** | Accordion row hover bg; chevron rotate spring; search filter highlight match. |
| **Desktop** | Sem pin · spring stiffness 280 · busca instant filter |
| **Mobile** | Full-width accordion · busca sticky top · animação fade only |
| **Impacto** | 4 · **Complexidade** | 3 |

---

## S19 — CTA · Convergência

| Campo | Valor |
|-------|-------|
| **Slug** | `s19-cta-convergencia` |
| **Objetivo psicológico** | Clímax emocional — rio converge, convite irresistível. Última chance de conversão com urgência positiva. |
| **Headline** | **A névoa se abre. Sua receita entra.** |
| **Subheadline** | Junte-se a milhares que transformaram conversas em pipeline previsível — comece em 5 minutos. |
| **CTA primário** | Começar grátis agora |
| **CTA secundário** | Agendar demonstração |
| **Layout** | Full-bleed convergence vortex BG + center CTA stack + shockwave SVG overlay. Data River fecha 100% gold. Footer minimal. |
| **Assets** | IMG: NV5-IMG-036, 037, 038 · VID: NV5-VID-013, 014 · F2F: NV5-F2F-016 · SVG: NV5-SVG-001, 020 · R: NV5-R-038, 004, 009, 010 |
| **Camadas** | video ● · gsap ● · svg ● · particles ● · parallax ● · 3d ● · mouse ● · hover ● · motion ● · f2f ● |
| **GSAP plugins** | SplitText, ScrollTrigger, Observer, MorphSVG |
| **Motion BUILD** | Particles converge edges; F2F macro bubbles 0–40f; SplitText headline; river stroke 92→100% gold. |
| **Motion PEAK** | Headline explosão legível; CTAs gold pulse; shockwave SVG hold; universo estável. |
| **Motion EXIT** | Pull-out F2F 40–120f observatory wide; shockwave expand frame 100+; CTA magnetic max; fade footer. |
| **Hover/micro** | MagneticButton CTAs strong; MouseGlow stage; shockwave ripple on CTA hover; particle burst click. |
| **Desktop** | Pin **350vh** · F2F-016 120f · VID-013 loop L1 + VID-014 climax · Observer parallax |
| **Mobile** | Pin 220vh · F2F off, VID-014 MP4 once · particles 30 · SplitText fade |
| **Impacto** | 10 · **Complexidade** | 8 |

---

## Matriz resumo

| # | Slug | Pin vh | F2F | Impacto | Complex. |
|---|------|--------|-----|---------|----------|
| S01 | s01-hero-observatorio | 400 | 150f | 10 | 9 |
| S02 | s02-problema-nevoa-vermelha | 280 | 100f | 8 | 6 |
| S03 | s03-bridge-atravessia | 350 | 180f | 10 | 9 |
| S04 | s04-demo-dentro-maquina | 620 | 500f | 10 | 10 |
| S05 | s05-setup-tres-portais | 360 | 120f | 8 | 7 |
| S06 | s06-agentes-personalidade | 300H | 80f | 8 | 7 |
| S07 | s07-inbox-sala-comando | 280 | 60f | 8 | 7 |
| S08 | s08-funil-gravidade-deal | 320 | 60f | 9 | 8 |
| S09 | s09-automacoes-sistema-nervoso | 300 | 120f | 8 | 6 |
| S10 | s10-beneficios-constelacao | — | 40f | 6 | 4 |
| S11 | s11-antes-depois-linha | 280 | 100f | 9 | 7 |
| S12 | s12-cases-horizontal | 350H | 120f | 7 | 6 |
| S13 | s13-social-proof | — | 60f | 7 | 4 |
| S14 | s14-integracoes-orbita | 280 | — | 8 | 7 |
| S15 | s15-agencia-portal | 300 | 70f | 9 | 8 |
| S16 | s16-seguranca-fortaleza | — | 50f | 7 | 5 |
| S17 | s17-planos | — | — | 6 | 5 |
| S18 | s18-faq | — | — | 4 | 3 |
| S19 | s19-cta-convergencia | 350 | 120f | 10 | 8 |

**Total F2F:** 1.930 frames · **Componentes seção:** NV5-R-021 → NV5-R-038 (S18 usa NV5-R-020 FAQAccordion)

---

## CTAs globais (posição scroll)

| CTA | Seções | Meta |
|-----|--------|------|
| Começar grátis | S01 15%, S04 30%, S17, S19 55% | Trial signup |
| Ver demonstração | S01 ghost, S04 | Scroll → S04 |
| Escolher plano | S17 | Paid conversion |

---

*Alinhado a `KORUVISION-Landing-Production-Bible-v5.md` · `assets/prompts/v5/*` · `demo/s04.html`*
