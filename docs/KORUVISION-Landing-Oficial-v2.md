# KORUVISION x FlowIA - Landing Page Oficial v2.0

> Documento definitivo de producao | Junho 2026 | Status: APROVADO PARA PRODUCAO

## SUMARIO

1. Visao e posicionamento
2. Direcao criativa geral
3. Identidade visual KORUVISION
4. Biblioteca de componentes
5. Motion design global
6. Estrategias de midia (IA, video, frame-by-frame)
7. Transicoes, microinteracoes e efeitos globais
8. Performance, acessibilidade e CRO
9. Mapa de assets
10. Especificacao das 19 secoes
11. Stack tecnico

---

## 1. VISAO E POSICIONAMENTO

| Camada | Nome | Funcao |
|--------|------|--------|
| Empresa | KORUVISION | Marca-mae |
| Produto | FlowIA | CRM + IA para WhatsApp |
| Tagline | Inteligencia. Visao. Solucoes. | Fixa na logo oficial |
| Hero | Conversas viram oportunidades. | Headline principal |

**Narrativa:** caos conversacional -> fluxo inteligente -> receita previsivel.

**3 atos:** S01-S02 Reconhecimento | S03-S15 Revelacao | S16-S19 Decisao

**Idioma:** PT-BR. Termos SaaS em ingles: Dashboard, Chat, CRM, Kanban, API, Pipeline, Inbox.

---

## 2. DIRECAO CRIATIVA GERAL

**Conceito: Nocturno Visionario** - dark absoluto, roxo inteligencia (#9D4EDD), ouro valor (#FFB700), vidro fume, profundidade em camadas.

**Principios:**
1. Clareza antes de espetaculo
2. Scroll como roteiro
3. UI legivel > IA bonita (React/Figma para telas)
4. Logo sagrada: assets/refs/koruvision-logo-master.png
5. Motion com proposito de conversao
6. Premium silencioso - espaco generoso

**Referencias:** Linear (tipo), Stripe (profundidade), Vercel (clareza), Framer (scroll story), Apple (product reveal).

**Evitar:** texto KORUVISION via IA, maos humanas, paleta azul FlowIA v1, motion pesado mobile.

---

## 3. IDENTIDADE VISUAL KORUVISION

### Paleta oficial

```css
--bg-void: #000000;
--bg-surface: #0A0A0F;
--bg-card: #12121A;
--bg-card-hover: #1A1A26;
--bg-border: #2A2A3A;
--koru-gold: #FFB700;
--vision-purple: #9D4EDD;
--vision-purple-deep: #7B2CBF;
--chrome: #E0E0E0;
--accent-success: #10B981;
--accent-warm: #F59E0B;
--accent-danger: #EF4444;
--text-primary: #F0F4FF;
--text-secondary: #8B9EC4;
--text-muted: #4B5E80;
--grad-brand: linear-gradient(135deg, #FFB700, #9D4EDD);
```

Regra logo: KORU ouro | VISION roxo | grafia somente PNG oficial.

### Tipografia

| Token | Fonte | Uso |
|-------|-------|-----|
| Display | Geist | Hero clamp(3rem, 8vw, 7.5rem) w700-800 |
| Heading | Geist | Secoes clamp(2rem, 5vw, 4.5rem) |
| Body | Inter Variable | 16-18px |
| Label | Inter | Badges 12px uppercase |
| Mono | JetBrains Mono / Geist Mono | Metricas |

### Ilustracoes e mockups

| Tipo | Pipeline |
|------|----------|
| Backgrounds/abstratos | FLUX.2 Pro + logo ref |
| Cenas dor/lifestyle | FLUX.2 Pro, sem maos |
| Avatares | FLUX.2 Pro |
| Mockup com logo | Pillow M-01 |
| Telas produto | React components |
| Icones | SVG Lucide 1.5px |

Overlays globais: I-03 noise 3-4%, grid SVG 4-6%, vignette S02/S19.

---

## 4. BIBLIOTECA DE COMPONENTES

**Layout:** SectionShell, Container, SectionHeader, SplitLayout

**Nav:** Navbar (blur scroll, logo KORUVISION), Footer, ProgressRail opcional

**UI:** Badge, Button (gold primary), GlassCard, FeaturePill, MetricCounter, TestimonialCard, PricingCard, FAQItem, ComparisonRow

**Produto React:** UIWhatsAppChat, UIAgentPanel, UIKanbanBoard, UICalendarBooking, UIDashboard, UIInboxThreeColumn, UIAgencyTenants

**Motion:** RevealOnScroll, SplitHeadline, ParallaxLayer, FrameScrubber, VideoLoop, InfiniteMarquee, ParticleField, SectionTransition

---

## 5. MOTION DESIGN GLOBAL

**Hierarquia:** scroll-controlled > entry reveals > ambient loops > micro > cursor desktop

**Tokens:** ease-out-expo, ease-spring, dur-fast 200ms, dur-cinematic 1200ms, scrub 1.2

**GSAP:** ScrollTrigger (pin/scrub/batch), ScrollSmoother desktop only, SplitText ou split-type, Flip S03/S17/S15, MorphSVG S03/S05/S16, DrawSVG S09/S16, MotionPath S08/S14, Draggable S11, Observer parallax

**Mobile:** sem Smoother, pin reduzido, F2F vira video/React tabs, particulas off, reduced-motion estatico

---

## 6. ESTRATEGIAS DE MIDIA

**Pipeline hibrido aprovado:**
- FLUX.2 -> backgrounds, cenas, abstratos, avatares
- React/Figma -> UI produto
- Pillow -> M-01 logo oficial
- Kling 2.5 -> loops cinematicos sem UI legivel
- Canvas F2F -> transicoes cinema (nao UI)

**Videos Kling essenciais:** V-01 S01 loop | V-20 S19 CTA | opcionais V-04 S03, V-11 S06, V-17 S13, V-18 S14, V-19 S15

**Nao Kling:** S04 demo UI, S02 I-05-08, S11 I-14-15, S12 I-16-20

**Frame-by-frame:** ~240 frames total (hero 90 + demo transitions 150), 15fps WebP, lazy load, mobile fallback video

**Budget Replicate:** US$ 40-50 recomendado

---

## 7. TRANSICOES E EFEITOS GLOBAIS

**Transicoes entre atos:**
- S01->S02 mask reveal up + escurecer
- S02->S03 color shift vermelho->roxo/ouro
- S03 internal Flip bridge
- S03->S04 light sweep dourado
- S18->S19 video expand full-bleed

**Microinteracoes:** CTA scale+glow+ripple | card hover border purple | nav pill slide | FAQ spring

**Parallax 6 camadas:** void(0) > noise(0.05) > particulas(0.1) > produto(0.2-0.35) > copy(0) > cursor

**Particulas:** S01 60-80 desktop | S08 confetti burst | S19 30 drift | mobile 0-15

**Iluminacao dinamica:** mouse radial hero | screen glow demo step | CTA pulse gold

---

## 8. PERFORMANCE, A11Y, CRO

**Metas:** LCP <2.5s mobile | INP <150ms | CLS <0.05 | Lighthouse 85+ mobile

**CTAs:** Hero 15% | Pos-demo S04 30% | S19 55%

**Targets:** scroll depth 70%+ | CTR hero 4%+ | tempo 3min+ | trial 2-5%

**A11y:** prefers-reduced-motion, contraste 4.5:1, focus visible, aria icons, video aria-hidden

---

## 9. MAPA DE ASSETS

| ID | Secao | Status |
|----|-------|--------|
| I-01 a I-04 | S01 | OK |
| I-05 a I-08 | S02 | OK (I-07 regen pendente) |
| I-09 a I-13 | S04 | React pendente |
| I-14, I-15 | S11 | OK |
| I-16 a I-20 | S12 | OK |
| I-21 a I-25 | Global | OK |
| I-26 a I-29 | S13 | OK |
| I-30 a I-32 | Global | OK |
| D-01 a D-03 | S04 | OK |
| M-01 | S01/S04 | OK |
| V-01, V-20 | S01/S19 | Pendente Kling |

Scripts: generate_koruvision.py | create_phone_mockup.py | preview.html

---

## 10. ESPECIFICACAO DAS 19 SECOES

Template por secao: Objetivo | Copy principal | Copy secundaria | Estrutura | Graficos | Entrada | Scroll | Saida | Especiais | CTA1 | CTA2

---

### S01 HERO CINEMATOGRAFICO

1. **Objetivo:** impacto 3s, proposta clara, confianca imediata
2. **Copy principal:** Conversas viram oportunidades.
3. **Copy secundaria:** IA que atende, funil que organiza, automacao que fecha. No WhatsApp. Em minutos.
4. **Estrutura:** 100vh badge+headline+sub+CTAs+social proof; abaixo M-01/V-01; grid; particulas
5. **Graficos:** I-01, I-02, I-03, I-04, M-01, V-01, logo navbar
6. **Entrada:** glow fade > grid draw > badge spring > SplitText stagger > sub > CTAs > social
7. **Scroll:** headline parallax 0.3x; mockup scale 1-1.12; F2F V-02 opcional 90 frames
8. **Saida:** headline blur out; mask reveal para S02
9. **Especiais:** mouse radial light; float mockup; particle canvas; tilt 3D mouse
10. **CTA1:** Comecar gratis -> /signup
11. **CTA2:** Ver demonstracao -> #demo

---

### S02 O PROBLEMA

1. **Objetivo:** identificacao emocional com 4 dores
2. **Copy principal:** Leads entram. Receita nao sai.
3. **Copy secundaria:** Enquanto voce demora, seu concorrente fecha.
4. **Estrutura:** label + headline + grid 2x2 cards + stat 78%
5. **Graficos:** I-05, I-06, I-07, I-08, I-30
6. **Entrada:** cards stagger drop+bounce; pulso danger
7. **Scroll:** counter 0-78%; cards parallax 0.1x
8. **Saida:** vignette vermelha dissolve; color shift S03
9. **Especiais:** alert pulse loop; border danger glow hover
10. **CTA1:** —
11. **CTA2:** Ver como resolver (anchor S03)

---

### S03 BRIDGE PROBLEMA-SOLUCAO

1. **Objetivo:** transicao emocional caos->controle
2. **Copy principal:** De caos a controle. Em minutos.
3. **Copy secundaria:** Uma plataforma. Todas as respostas.
4. **Estrutura:** pinned 200vh; 4 cards morph; 4 pillars; V-04 BG opcional
5. **Graficos:** cards S02; SVG morph; V-04
6. **Entrada:** pin; cards vermelhos
7. **Scroll:** scrub Flip+MorphSVG+color red->green/purple 0-100%
8. **Saida:** pillars stagger; light sweep dourado
9. **Especiais:** GSAP Flip, MorphSVG, colorProps
10. **CTA1:** —
11. **CTA2:** —

---

### S04 DEMO VISUAL

1. **Objetivo:** provar produto; gerar desejo; coracao conversao
2. **Copy principal:** Veja ao vivo. Sem enrolacao.
3. **Copy secundaria:** Do primeiro oi no WhatsApp ao deal no pipeline.
4. **Estrutura:** pinned 400vh; col esquerda steps; direita React UI; progress bar
5. **Graficos:** UIWhatsApp, UIAgent, UIKanban, UICalendar, UIDashboard, D-01-03, F2F transicoes
6. **Entrada:** pin; step1 UI fade; indicator ativo
7. **Scroll:** 5 steps x 80vh; crossfade copy; UI state machine; F2F entre steps
8. **Saida:** CTA mid-page spring step5
9. **Especiais:** 3D tilt; screen glow por step; mobile tabs/video
10. **CTA1:** Experimentar gratuitamente
11. **CTA2:** Agendar demo

---

### S05 COMO FUNCIONA

1. **Objetivo:** remover objecao complexidade
2. **Copy principal:** Setup em 3 passos. Operacao em minutos.
3. **Copy secundaria:** Conecte. Configure. Converta.
4. **Estrutura:** pinned 360vh; watermark 01/02/03; V-10 QR
5. **Graficos:** V-10; SVG QR; wizard; pipeline mini
6. **Entrada:** numero 01 watermark settle
7. **Scroll:** 3 chapters morph numero; in/out vertical
8. **Saida:** step03 green pulse; CTA
9. **Especiais:** SplitText titles; side nav jump
10. **CTA1:** Comecar agora
11. **CTA2:** Ver documentacao

---

### S06 AGENTES IA

1. **Objetivo:** IA com personalidade vs robo
2. **Copy principal:** IA com personalidade. Nao robo.
3. **Copy secundaria:** Delay natural. Emoji. Tom humano.
4. **Estrutura:** horizontal scroll 4 agentes; chat sim; toggle; V-11 opcional
5. **Graficos:** cards Sofia/Carlos/Luna/Custom; typing; V-11
6. **Entrada:** cards stagger direita; mask reveal titulo
7. **Scroll:** horizontal pin; chat Observer visibility
8. **Saida:** feature pills cascade
9. **Especiais:** toggle flip generico vs FlowIA; avatar blink SVG
10. **CTA1:** Criar meu agente
11. **CTA2:** Comparar respostas

---

### S07 INBOX AO VIVO

1. **Objetivo:** visualizar inbox; desejo imediato
2. **Copy principal:** Seu time de atendimento nunca dorme.
3. **Copy secundaria:** Inbox unificado. Handoff IA-humano. Historico completo.
4. **Estrutura:** UIInboxThreeColumn 85vw; callouts MotionPath
5. **Graficos:** React inbox; badges; kanban pill
6. **Entrada:** mockup scale 0.92-1; blur clear
7. **Scroll:** callouts stagger; mensagens loop; typing
8. **Saida:** UI dim 80%
9. **Especiais:** ping notification; handoff amber glow
10. **CTA1:** Ver inbox completo
11. **CTA2:** —

---

### S08 FUNIL KANBAN

1. **Objetivo:** CRM nativo; pipeline previsivel
2. **Copy principal:** Pipeline visual. Receita previsivel.
3. **Copy secundaria:** Arraste, qualifique, feche — tudo no mesmo lugar.
4. **Estrutura:** UIKanbanBoard; counter R$; features
5. **Graficos:** cards leads; confetti green
6. **Entrada:** board fade up; colunas stagger
7. **Scroll:** card Maria MotionPath Novo-Fechado; counter up; burst
8. **Saida:** glow success fade
9. **Especiais:** magnetic snap; light trail
10. **CTA1:** Organizar meu pipeline
11. **CTA2:** —

---

### S09 AUTOMACOES

1. **Objetivo:** motor automacao; valor percebido
2. **Copy principal:** Automacoes que trabalham enquanto voce dorme.
3. **Copy secundaria:** 14 workflows enterprise incluidos.
4. **Estrutura:** workflow SVG horizontal; 3 cards exemplos
5. **Graficos:** DrawSVG; nodes; particles path
6. **Entrada:** node1 pop; draw 0%
7. **Scroll:** nodes sequenciais; particles loop completo
8. **Saida:** stat 14 count up
9. **Especiais:** isometric CSS; energy stream
10. **CTA1:** Explorar automacoes
11. **CTA2:** —

---

### S10 BENEFICIOS

1. **Objetivo:** scan rapido 12 features
2. **Copy principal:** Tudo que voce precisa. Nada que voce nao precisa.
3. **Copy secundaria:** 12 pilares do FlowIA em um so lugar.
4. **Estrutura:** grid 3x4; destaque Painel Agencia; I-31 bg
5. **Graficos:** 12 icones SVG; card agencia wide
6. **Entrada:** batch stagger 80ms; icon micro-loop
7. **Scroll:** parallax 0.05x; agencia expand center
8. **Saida:** grid blur leve
9. **Especiais:** hover icon 1s; agencia accordion
10. **CTA1:** —
11. **CTA2:** —

---

### S11 ANTES / DEPOIS

1. **Objetivo:** contraste concreto; gatilho conversao
2. **Copy principal:** Antes: caos. Depois: controle.
3. **Copy secundaria:** A mesma empresa. Um sistema diferente.
4. **Estrutura:** pinned 300vh; slider I-14|I-15; tabela 3 linhas
5. **Graficos:** I-14, I-15, Draggable handle
6. **Entrada:** slider 50/50; handle pulse
7. **Scroll:** divider 50%-80% scrub; table rows stagger
8. **Saida:** depois domina; green wash
9. **Especiais:** draggable manual; labels ANTES/DEPOIS
10. **CTA1:** Quero o depois
11. **CTA2:** —

---

### S12 CASES POR VERTICAL

1. **Objetivo:** funciona no meu mercado
2. **Copy principal:** Funciona no seu mercado.
3. **Copy secundaria:** Clinicas, imobiliarias, consultorias, agencias, e-commerce.
4. **Estrutura:** horizontal 5 cards 70vw; metricas; quotes
5. **Graficos:** I-16 a I-20; counters; parallax
6. **Entrada:** titulo reveal; card1 scale in
7. **Scroll:** horizontal pin; metricas on active
8. **Saida:** last card fade; vertical resume
9. **Especiais:** swipe mobile; progress dots
10. **CTA1:** Ver caso completo (por card)
11. **CTA2:** —

---

### S13 PROVA SOCIAL

1. **Objetivo:** dados + depoimentos
2. **Copy principal:** Numeros que importam. Vozes reais.
3. **Copy secundaria:** +2.300 conversas/dia | 94% satisfacao | 8s resposta
4. **Estrutura:** 3 counters; marquee duplo; stars; I-26-29; V-17 opcional
5. **Graficos:** avatares; quotes; V-17
6. **Entrada:** counters 0-N; marquee in
7. **Scroll:** marquee pause hover
8. **Saida:** marquee fade
9. **Especiais:** dual marquee velocidades opostas
10. **CTA1:** —
11. **CTA2:** —

---

### S14 INTEGRACOES

1. **Objetivo:** ecossistema; confiabilidade
2. **Copy principal:** Conecta com tudo que voce ja usa.
3. **Copy secundaria:** WhatsApp, Asaas, Google Calendar, Groq, Supabase e mais.
4. **Estrutura:** logo center; 3 aneis orbitais; tooltips
5. **Graficos:** SVG logos; MotionPath; V-18 ou GSAP puro
6. **Entrada:** center pulse; anel1 stagger
7. **Scroll:** aneis 2-3; mouse displace
8. **Saida:** logos dim
9. **Especiais:** hover card integracao
10. **CTA1:** Ver todas integracoes
11. **CTA2:** —

---

### S15 PAINEL AGENCIA

1. **Objetivo:** diferencial multi-cliente
2. **Copy principal:** Para agencias: gerencie tudo de um so lugar.
3. **Copy secundaria:** Multi-tenant. Impersonation. MRR por cliente.
4. **Estrutura:** UIAgencyTenants; Flip impersonation; V-19 opcional
5. **Graficos:** tenant cards; MRR; V-19
6. **Entrada:** cards stagger; MRR count
7. **Scroll:** Flip card fullscreen demo
8. **Saida:** return Flip
9. **Especiais:** circular warp zoom; accent per tenant
10. **CTA1:** Conhecer painel agencia
11. **CTA2:** Falar com o time

---

### S16 SEGURANCA + LGPD

1. **Objetivo:** confianca B2B; LGPD
2. **Copy principal:** Seguro por design. Confiavel por padrao.
3. **Copy secundaria:** RLS. LGPD nativo. Auditoria. Criptografia em repouso.
4. **Estrutura:** trust icons; 3 blocks; tech stack; I-25
5. **Graficos:** SVG escudo DrawSVG; I-25
6. **Entrada:** escudo draw stroke
7. **Scroll:** puzzle pieces lock; glow each
8. **Saida:** escudo pulse once
9. **Especiais:** MorphSVG icons; hex grid BG
10. **CTA1:** Central de confianca
11. **CTA2:** Politica de privacidade

---

### S17 PLANOS

1. **Objetivo:** converter; anchoring; plano popular
2. **Copy principal:** Comece gratis. Escale conforme cresce.
3. **Copy secundaria:** 7 dias gratis. Sem cartao. Cancele quando quiser.
4. **Estrutura:** toggle mensal/anual; 4 cards; accordion; Essencial glow
5. **Graficos:** PricingCards; badge popular purple
6. **Entrada:** cards rise stagger; popular scale 1.05
7. **Scroll:** toggle Flip precos click
8. **Saida:** —
9. **Especiais:** glow continuo popular; badge economia anual
10. **CTA1:** Comecar gratis (por card)
11. **CTA2:** Comparar todos recursos

---

### S18 FAQ

1. **Objetivo:** remover objecoes finais
2. **Copy principal:** Perguntas frequentes.
3. **Copy secundaria:** Respostas diretas. Sem juridiques.
4. **Estrutura:** search; 8 accordions; CTA rodape
5. **Graficos:** FAQItem x8
6. **Entrada:** accordion stagger; search glow focus
7. **Scroll:** —
8. **Saida:** fade S19
9. **Especiais:** spring open; + rotate 45
10. **CTA1:** Ainda tem duvidas? Falar com nosso time
11. **CTA2:** WhatsApp

---

### S19 CTA FINAL

1. **Objetivo:** ultimo apelo; zero friccao
2. **Copy principal:** Seu proximo cliente esta esperando.
3. **Copy secundaria:** Comece gratis hoje. Setup 10 min. Sem cartao.
4. **Estrutura:** V-20 full-bleed; headline gradient; dual CTAs; trust; footer; I-32
5. **Graficos:** V-20; I-32; checkmarks verdes
6. **Entrada:** headline explode scale; shockwave ring; stagger sub/CTAs
7. **Scroll:** video parallax mouse
8. **Saida:** footer estatico
9. **Especiais:** SplitText impact; CTA gold pulse; dynamic blur overlay
10. **CTA1:** Comecar gratis agora
11. **CTA2:** Falar com especialista

---

## 11. STACK E ORDEM DE IMPLEMENTACAO

**Stack:** Next.js 14, TypeScript, Tailwind, GSAP+ScrollTrigger, split-type, Vercel, Replicate FLUX.2+Kling

**Ordem:**
- Semana 1: Next.js + tokens + 19 secoes estaticas
- Semana 2: React 5 UIs + regen I-07 + V-01/V-20
- Semana 3: GSAP simples S02,S10,S13,S17,S18
- Semana 4: Hero S01 + CTA S19
- Semana 5: Demo S04 pinned
- Semana 6: S03,S05,S11,S06,S12
- Semana 7: S07-S09,S14-S16 + perf + deploy

**Custo ferramentas DIY:** ~US$ 45 Replicate + R$ 60 dominio + Vercel free

---

## DOCUMENTOS RELACIONADOS

| Arquivo | Funcao |
|---------|--------|
| docs/KORUVISION-Landing-Oficial-v2.md | ESTE DOC - fonte da verdade v2 |
| docs/koruvision-visual-bible.md | Prompts IA + qualidade |
| FlowIA - Plano Completo...md | Plano v1 referencia |
| Flowia prompts assets completos.md | Prompts v1 azul - usar bible KORUVISION |
| assets/preview.html | Galeria assets |

---

*KORUVISION - Inteligencia. Visao. Solucoes.*
*FlowIA - Conversas viram oportunidades.*
*v2.0 - Producao autorizada.*
