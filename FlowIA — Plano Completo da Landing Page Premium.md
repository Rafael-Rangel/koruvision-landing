# FlowIA — Plano Completo da Landing Page Premium
> Documento de Arquitetura, Storytelling, Motion Design e CRO  
> Nível: Apple · Stripe · Linear · Framer · Awwwards  
> Versão 1.0 — Junho 2026

---

## SUMÁRIO

1. [Conceito Central e Identidade Visual](#conceito)
2. [Sistema de Design e Tokens](#design-system)
3. [Estratégia UX, CRO, Motion e Visual](#estrategia)
4. [Arquitetura das Seções (19 seções)](#secoes)
5. [Mapa de Animações Obrigatórias](#mapa-animacoes)
6. [Backlog Completo (8 Fases)](#backlog)

---

<a name="conceito"></a>
## 1. CONCEITO CENTRAL E IDENTIDADE VISUAL

### 1.1 Conceito Narrativo

**O produto transforma conversas caóticas em receita previsível.**  
A metáfora visual central é **fluxo**: mensagens chegam como correntes de luz, passam por um funil inteligente e emergem como deals fechados, dinheiro e crescimento. A IA não é um robô — é um co-piloto de vendas com personalidade.

**Arquétipo da marca:** O Estrategista. Confiante, elegante, brasileiro na alma, global na execução.

**Referências visuais:**
- Linear.app — tipografia cinética, espaçamento generoso, dark mode
- Stripe — profundidade, gradientes sutis, confiabilidade técnica
- Vercel — clareza extrema, código como beleza
- Framer — motion design como linguagem
- Awwwards SOTD — narrativa visual com scroll storytelling

### 1.2 Posicionamento da Página

A landing não é um catálogo de features. É uma **jornada emocional em 3 atos**:

- **Ato 1 — Reconhecimento:** "Isso sou eu. Esse é meu problema."
- **Ato 2 — Revelação:** "Isso é o que eu precisava sem saber."
- **Ato 3 — Decisão:** "Quero isso agora."

### 1.3 Audiência Primária

| Persona | Dor principal | CTA certo |
|---------|--------------|-----------|
| Dono de PME / Clínica | Perde leads no WhatsApp, sem controle | "Começar grátis" |
| Consultor / Vendedor | Sem pipeline, follow-up manual | "Ver demonstração" |
| Agência / Fundador SaaS | Quer escalar múltiplos clientes | "Falar com time" |

---

<a name="design-system"></a>
## 2. SISTEMA DE DESIGN E TOKENS

### 2.1 Paleta de Cores

```
/* Backgrounds */
--bg-void:        #03060F   /* espaço profundo — fundo base */
--bg-surface:     #080D1A   /* superfície elevada */
--bg-card:        #0F1629   /* cards e containers */
--bg-card-hover:  #151E35   /* hover state */
--bg-border:      #1E2940   /* bordas sutis */

/* Acentos */
--accent-primary:  #3B82F6  /* azul elétrico — CTA, links */
--accent-ai:       #8B5CF6  /* violeta — IA, agentes */
--accent-success:  #10B981  /* verde esmeralda — conversões, status ativo */
--accent-warm:     #F59E0B  /* âmbar — humano, handoff */
--accent-danger:   #EF4444  /* vermelho — alertas */

/* Texto */
--text-primary:    #F0F4FF
--text-secondary:  #8B9EC4
--text-muted:      #4B5E80

/* Gradientes chave */
--grad-ai:        linear-gradient(135deg, #3B82F6, #8B5CF6)
--grad-revenue:   linear-gradient(135deg, #10B981, #3B82F6)
--grad-glow-ai:   radial-gradient(ellipse, rgba(139,92,246,0.15), transparent 60%)
--grad-hero:      radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08), transparent 70%)
```

### 2.2 Tipografia

| Uso | Fonte | Tamanho | Peso |
|-----|-------|---------|------|
| Display Hero | Geist / Cal Sans | clamp(72px, 8vw, 120px) | 800 |
| Headline seção | Geist | clamp(40px, 5vw, 72px) | 700 |
| Sub-headline | Geist | clamp(20px, 2.5vw, 32px) | 400 |
| Body | Inter Variable | 16–18px | 400 |
| Label / Badge | Inter | 12–13px | 600 |
| Código / Data | JetBrains Mono | 14px | 400 |
| Contadores | Geist Mono | clamp(48px, 6vw, 96px) | 700 |

### 2.3 Motion Tokens

```
/* Curvas de easing customizadas */
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1)
--ease-in-out-sine: cubic-bezier(0.37, 0, 0.63, 1)
--ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1)  /* spring suave */
--ease-cinematic:   cubic-bezier(0.25, 0.1, 0.0, 1.0)

/* Durações */
--dur-fast:   150ms
--dur-normal: 300ms
--dur-slow:   600ms
--dur-cinematic: 1200ms
```

### 2.4 Efeitos Visuais Globais

- **Noise texture overlay** — grain sutil em 4% de opacidade sobre o fundo
- **Grid lines** — linhas de grid perspectivadas no hero e seções chave
- **Glow blooms** — radial gradients coloridos atrás de elementos CTA
- **Glass cards** — backdrop-filter: blur(16px) com border rgba branca
- **Depth layers** — múltiplas camadas de parallax criando profundidade 3D
- **Cursor custom** — cursor circle que expande ao hover e muda de cor por zona

---

<a name="estrategia"></a>
## 3. ESTRATÉGIA GLOBAL

### 3.1 UX Strategy

**Princípio #1 — Clareza antes de beleza:** cada seção tem uma única mensagem principal. Nunca duas ideias competindo.

**Princípio #2 — Scroll como linguagem:** o usuário não lê, ele navega. As animações guiam os olhos, não distraem.

**Princípio #3 — Redução de fricção:** CTAs aparecem sempre que o usuário atingiu um pico emocional (após ver um benefício poderoso, após uma prova social forte).

**Princípio #4 — Progressão de comprometimento:** o usuário primeiro entende (ato 1), depois deseja (ato 2), depois age (ato 3). Nunca pedimos ação antes de gerar desejo.

**Arquitetura de informação:**
```
AWARENESS → CONSIDERATION → INTENT → ACTION
  Hero        Problema         Demo       CTA
  Dor         Solução        Benefits   Planos
              How it works    Cases      FAQ
              IA              Social     Final CTA
```

### 3.2 CRO Strategy

**Gatilhos mentais utilizados por seção:**

| Gatilho | Seções |
|---------|--------|
| **Identificação** | Problema, Personas |
| **Curiosidade** | Hero, Demo Visual |
| **Autoridade** | Arquitetura técnica, Integrações |
| **Prova social** | Métricas, Testimonials |
| **Escassez** | Planos (vagas Fundador) |
| **Urgência** | CTA Final |
| **Reciprocidade** | Trial grátis |
| **Compromisso e coerência** | Checklist, Onboarding em minutos |

**Posicionamento de CTAs (regra dos 3):**
1. **Hero CTA** — captura o usuário impulsivo (15% do tráfego)
2. **Mid-page CTA** — após Demo Visual — captura o considerador (30%)
3. **Final CTA** — captura o pesquisador (55%)

**Métricas alvo:**
- Scroll depth médio: > 70%
- CTR hero CTA: > 4%
- Tempo na página: > 3 min
- Conversão trial: 2–5%

### 3.3 Motion Strategy

**Filosofia:** motion a serviço do storytelling, nunca motion por motion.

**Hierarquia de animações:**
1. **Scroll-controlled** — narrativa sequenciada, controlada pelo usuário
2. **Entry reveals** — elementos entram quando ficam visíveis
3. **Ambient loops** — partículas, gradientes, pulsações constantes de baixa intensidade
4. **Micro-interactions** — respostas a hover/click que aumentam engajamento
5. **Cursor reactive** — camada de imersão avançada

**Princípios GSAP:**
- ScrollSmoother para suavizar scroll global (lerpFactor: 0.1)
- ScrollTrigger com scrub em seções narrativas
- Pinning apenas onde há storytelling sequencial
- SplitText para headline reveals
- GSAP Timelines organizadas por seção (não by-line)
- matchMedia para respeitar `prefers-reduced-motion`

### 3.4 Visual Strategy

**Dark mode soberano:** o produto é nocturno por design. O dark mode não é opção — é a identidade.

**Profundidade em 5 camadas:**
- Camada 0 (fundo): gradientes de glow radial
- Camada 1: background noise/grain
- Camada 2: grid lines perspectivadas
- Camada 3: elementos de UI do produto (em parallax)
- Camada 4: textos e CTAs (fixos)
- Camada 5: cursor custom e efeitos de hover

**Linguagem visual:**
- Linhas finas e arestas suaves nos cards
- Gradientes direcionais (sempre topo→baixo ou esquerda→direita)
- Brilhos azuis/violetas emanando de elementos de IA
- Verde para momentos de conversão confirmada
- Âmbar para o elemento humano (handoff, time, pessoas)

---

<a name="secoes"></a>
## 4. ARQUITETURA DAS SEÇÕES

---

### SEÇÃO 01 — HERO CINEMATOGRÁFICO

**Título:** "Conversas viram oportunidades."  
**Subtítulo:** "IA que atende, funil que organiza, automação que fecha. No WhatsApp. Em minutos."

---

#### 4.01.1 Objetivo da Seção

**Por que existe:** É o primeiro impacto. Tem 3 segundos para capturar atenção e comunicar a proposta de valor central. Precisa ser visualmente arrasador e comunicar instantaneamente: "isso é uma ferramenta poderosa e moderna para o meu negócio."

**O que comunica:**
- Identidade do produto (FlowIA)
- Proposta em uma frase
- Credibilidade visual imediata
- Convite à ação (trial grátis)

**Problema que resolve:** O usuário não sabe o que é o produto e se vale o tempo de explorar. O Hero responde isso em 3 segundos.

---

#### 4.01.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│  [NAVBAR] Logo | Nav links                     [Começar]    │
│─────────────────────────────────────────────────────────────│
│                                                             │
│   [BADGE]  ★ Plataforma CRM + IA para WhatsApp             │
│                                                             │
│   [HEADLINE GIGANTE — 2 linhas]                             │
│   Conversas viram                                           │
│   oportunidades.                                            │
│                                                             │
│   [SUBHEAD]  IA que atende 24h. Funil nativo.              │
│              Automação que fecha negócios.                  │
│                                                             │
│   [CTA GROUP]  [Começar grátis]  [Ver demonstração →]      │
│                                                             │
│   [SOCIAL PROOF BAR]  ★ 4.9 · +2.300 conversas/dia        │
│                                                             │
│─────────────────────────────────────────────────────────────│
│                                                             │
│   [VIDEO / PRODUCT MOCKUP — scroll controlled]             │
│   Dashboard 3D flutuando, com conversas acontecendo         │
│   ao vivo, funil se preenchendo                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Layout:**
- Full viewport height (100vh) + 60vh de extensão para o scroll video
- Texto: coluna central, max-width 800px, centrado
- Video/mockup: começa na dobra inferior, extends para baixo
- Background: --bg-void com radial glow azul vindo do topo
- Grid lines perspectivadas se afastando em direção ao horizonte
- Partículas flutuantes (60–80 pontos) em movimento lento browniano

**Hierarquia visual:**
1. Badge (entrada primeiro, chama atenção)
2. Headline (dominante, 2 linhas)
3. Subhead (explica em 10 palavras)
4. CTAs (ação)
5. Social proof bar (confiança)
6. Product visual (prova do produto)

---

#### 4.01.3 Animação Principal

**Tipo:** Hero entrance cascade + scroll-controlled product reveal

**Sequência de entrada (GSAP Timeline):**
```
t=0:    Background glow radial faz fade-in (2s, ease out)
t=0.2:  Grid lines fazem draw-in perspectivado (1.5s)
t=0.5:  Badge cai de cima com spring bounce
t=0.8:  Headline: cada palavra revela com SplitText stagger (0.08s por palavra)
t=1.4:  Subhead fade-in + slight translate Y
t=1.7:  CTAs slide-in de baixo
t=2.0:  Social proof bar fade-in
t=2.3:  Partículas iniciam movimento ambient
t=2.5:  Product mockup começa a flutuar (loop infinito, translateY ±12px, 4s ease-in-out)
```

**Scroll behavior:**
- Ao scrollar, o headline faz parallax lento (saindo para cima 0.3x velocidade scroll)
- O product mockup avança em direção ao viewer (scale 1 → 1.15 conforme scroll)
- Glow radial intensifica

**ScrollTrigger config:**
```js
ScrollTrigger.create({
  trigger: ".hero-product",
  start: "top bottom",
  end: "bottom top",
  scrub: 1.5,
  onUpdate: (self) => {
    gsap.set(".product-mockup", {
      scale: 1 + self.progress * 0.15,
      y: -self.progress * 80,
    });
  }
});
```

---

#### 4.01.4 Vídeo Kling

**Uso:** Background ambiental + product reveal cinematográfico

**Frame Inicial:**
Câmera muito próxima de um smartphone com tela mostrando um chat de WhatsApp. A tela está desfocada, mensagens empilhando sem resposta. Ambiente escuro, frio, caótico. Notificações piscando sem parar.

**Frame Final:**
Câmera se afasta revelando um dashboard elegante e luminoso em uma tela de computador. O dashboard mostra um funil Kanban vibrante, conversas organizadas, números de conversão subindo. Ambiente cálido, azul tecnológico, sensação de controle e prosperidade.

**Prompt Kling (Prompt 1 — Cena principal):**
```
Cinematic product reveal shot. Extreme close-up of a smartphone screen showing chaotic 
unanswered WhatsApp messages piling up, notification badges multiplying, blue light 
flickering in darkness. Slow dolly back movement, rack focus from smartphone to reveal 
an elegant dark-mode CRM dashboard on a wide monitor behind it. The dashboard glows with 
blue and purple data streams, animated Kanban cards sliding into columns, conversion 
numbers counting upward in green. The transition represents chaos becoming order. 
Lighting: hard backlit rim light on the phone, warm volumetric blue glow emanating from 
the monitor. Color grade: deep teal darks, electric blue highlights. Anamorphic lens 
bokeh, 2.39:1 aspect ratio, 24fps with subtle motion blur. Atmosphere: transformational, 
hopeful, technological premium. Studio void black background. 4K cinematic quality.
```

**Prompt Kling (Prompt 2 — Loop ambiental):**
```
Abstract data flow visualization. Glowing blue and violet light streams moving through 
a dark void, converging from multiple points toward a central luminous node. The streams 
represent conversations and messages flowing into a system. Fluid, organic motion like 
bioluminescent particles in deep water. No text, no UI elements. Pure ambient motion. 
Color palette: deep navy #030612 background, electric blue #3B82F6 streams, violet 
#8B5CF6 convergence point, white #FFFFFF particle edges with 20% opacity blur glow. 
Loopable 6-second cycle, seamless. 4K, 60fps, soft motion blur.
```

---

#### 4.01.5 Estratégia GSAP

| Plugin | Uso específico |
|--------|---------------|
| **ScrollSmoother** | Suavização global do scroll (wrapper + content) |
| **ScrollTrigger** | Product mockup parallax ao scrollar abaixo do fold |
| **SplitText** | Headline "Conversas viram oportunidades" — revela palavra a palavra |
| **CustomEase** | Curvas personalizadas para spring na entrada do badge |
| **MatchMedia** | Desativa animações complexas em mobile e `prefers-reduced-motion` |
| **Timelines** | Orchestração da entrada sequencial de todos os elementos |

**Detalhe SplitText:**
```js
// Divide headline em palavras
const split = new SplitText(".hero-headline", { type: "words" });
gsap.from(split.words, {
  opacity: 0,
  y: 40,
  duration: 0.6,
  stagger: 0.08,
  ease: "expo.out",
  delay: 0.8
});
```

---

#### 4.01.6 Microinterações

- **Hover nos CTAs:** glow bloom se expande, scale 1.03, border color intensifica
- **Click no CTA primário:** ripple effect azul + pequena compressão (scale 0.97 → 1)
- **Mouse move geral:** o glow radial no background se move levemente seguindo o cursor (parallax suave ±30px)
- **Hover no badge:** pequeno rotate ±2deg + glow sutil

---

#### 4.01.7 Efeitos Visuais

- **Fundo:** `--bg-void` com radial-gradient azul vindo do topo (radial 60vw, 30% opacidade)
- **Grid perspectivado:** SVG de grid em perspectiva, opacidade 6%, animado para parecer que se move para o horizonte infinitamente
- **Noise overlay:** pseudo-element com noise texture SVG em 3% de opacidade
- **Badge:** glassmorphism leve — backdrop-blur 8px, border 1px rgba azul 30%
- **CTAs:** glow box-shadow azul/violeta pulsante no CTA primário
- **Product mockup:** shadow complexa — múltiplas box-shadows criando elevação 3D

---

#### 4.01.8 Métricas de Conversão

**Ação desejada:** Click no CTA "Começar grátis"  
**CTA primário:** "Começar grátis" → `/signup` ou `/interesse`  
**CTA secundário:** "Ver demonstração →" → âncora para #demo  
**Gatilhos:** Autoridade (visual premium), Curiosidade (o que é isso?), Social proof (4.9 stars)  
**Meta:** CTR ≥ 4% no CTA primário

---

---

### SEÇÃO 02 — O PROBLEMA

**Título:** "Leads entram. Receita não sai."

---

#### 4.02.1 Objetivo da Seção

**Por que existe:** Criar identificação emocional com a dor do usuário antes de apresentar a solução. O usuário precisa pensar "exatamente isso acontece comigo todos os dias."

**O que comunica:** 4 dores específicas e reconhecíveis. Sem jargão técnico — linguagem do dia a dia do dono de negócio.

**Problema que resolve:** Bridges entre o impacto do Hero e a apresentação da solução. Sem esta seção, o usuário não sentiu que o produto é "para ele".

---

#### 4.02.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [LABEL]  O problema de hoje                              │
│                                                             │
│   [HEADLINE]  Leads entram.                                │
│               Receita não sai.                              │
│                                                             │
│   [4 PAIN CARDS — grade 2x2]                               │
│                                                             │
│   ┌─────────────┐  ┌─────────────┐                        │
│   │ 🔴 CARD 1   │  │ 🔴 CARD 2   │                        │
│   │ WhatsApp    │  │ Planilhas   │                        │
│   │ sem resposta│  │ impossíveis │                        │
│   └─────────────┘  └─────────────┘                        │
│                                                             │
│   ┌─────────────┐  ┌─────────────┐                        │
│   │ 🔴 CARD 3   │  │ 🔴 CARD 4   │                        │
│   │ IA robótica │  │ Sem pipeline│                        │
│   │ afasta leads│  │ sem previsão│                        │
│   └─────────────┘  └─────────────┘                        │
│                                                             │
│   [STATISTIC IMPACT LINE]                                  │
│   "78% dos leads compram de quem responde primeiro."       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Layout:**
- Dois columns text + 2x2 card grid
- Cards: glassmorphism dark com borda vermelha sutil
- Background: levemente mais escuro que o hero — sensação de "peso"
- Animação de "erro/alerta" visual: pulsação vermelha sutil nos cards

---

#### 4.02.3 Animação Principal

**Tipo:** Staggered card reveal com entrada "pesada"

Os 4 cards caem de cima com peso (física de gravidade), chegam à posição com leve bounce negativo (compressão), e ficam com pulsação de "alerta" sutil em loop.

**ScrollTrigger:**
- Cada card tem trigger individual
- Entram em stagger de 150ms
- Indicadores de erro pulsam em loop (scale 1 → 1.2, opacity 1 → 0.5, duration 1.5s)

**Statistic line:** texto grande ("78%") faz counter animation de 0 → 78 quando entra na viewport.

---

#### 4.02.4 Vídeo Kling

**Prompt (cena fragmentada — 4 micro-loops):**
```
Split-screen documentary style. Four small panels showing business owner frustrations. 
Panel 1: Hands frantically scrolling through unanswered WhatsApp messages on phone, 
face partially visible showing stress. Panel 2: Messy spreadsheet on laptop with crossed-
out cells, frustrated gesture. Panel 3: Generic chatbot response on phone screen — cold, 
mechanical, "I didn't understand your message. Please try again." Customer walking away. 
Panel 4: Business owner looking at empty calendar, confused expression. All panels in 
dark moody cinematic lighting, desaturated color grade, 16mm grain. Each panel loops 
independently. 4K, 24fps.
```

---

#### 4.02.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **ScrollTrigger** | Trigger de entrada por viewport para cada card |
| **Timelines** | Sequência de entrada dos 4 cards em stagger |
| **Counter** | Animação numérica "0 → 78%" no statistic |
| **Observer** | Detectar quando o container entra no viewport |

---

#### 4.02.6 Microinterações

- **Hover nos cards de dor:** escala leve (1.02), borda vermelha intensifica, pequeno glow negativo
- **Hover na statistic:** número ganha cor de destaque (amarelo), cursor muda para interrogação

---

#### 4.02.7 Efeitos Visuais

- **Cards:** glassmorphism dark, borda left 3px vermelha `--accent-danger`
- **Ícone de alerta:** pulsação suave, glow vermelho difuso
- **Background:** vignette escura nas bordas
- **Statistic:** texto grande com gradiente vermelho→laranja

---

#### 4.02.8 Métricas de Conversão

**Ação desejada:** Continuar scrollando (engajamento)  
**Gatilhos:** Identificação, Dor amplificada  
**KPI:** scroll depth de 40%+ após esta seção

---

---

### SEÇÃO 03 — A SOLUÇÃO (BRIDGE)

**Título:** "Uma plataforma. Todas as respostas."

---

#### 4.03.1 Objetivo da Seção

**Por que existe:** Transição emocional do problema para a solução. Introduz o produto como resposta às 4 dores anteriores. Não é uma seção de features — é uma promessa.

---

#### 4.03.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [ANIMAÇÃO CENTRAL — transformation]                      │
│   Os 4 cards vermelhos do problema giram/transformam       │
│   em 4 cards verdes da solução (SVG Morph)                 │
│                                                             │
│   [HEADLINE — aparece sobre a transformação]               │
│   De caos a controle.                                       │
│   Em minutos.                                               │
│                                                             │
│   [4 SOLUTION PILLARS]                                     │
│   IA Comercial | Funil Kanban | Inbox Unificado | Automação │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.03.3 Animação Principal

**Tipo:** SVG Morph + color transformation

Os 4 cards da seção anterior (vermelhos, dores) transformam visualmente em 4 pilares verdes (soluções). Isso é feito com:

1. **Flip animation (GSAP Flip):** os 4 cards da seção anterior "voam" para as posições da nova seção
2. A cor transita de vermelho para verde/azul
3. O ícone interno faz SVG morph (X → checkmark)
4. Texto muda de dor para benefício

**ScrollTrigger com pinning:**
- A seção fica pinned por 200vh
- Durante os primeiros 50% do scroll, os cards estão vermelhos
- Gradualmente transitam para verdes conforme o scroll avança

---

#### 4.03.4 Vídeo Kling

**Prompt:**
```
Abstract transformation sequence. Four glowing orbs arranged in a 2x2 grid. Initially 
red and flickering erratically, representing problems and chaos. As the camera slowly 
pushes in, the orbs transform — color shifts from red to electric blue, flickering 
becomes a smooth pulse, erratic movement becomes organized rhythmic patterns. The 
transformation is fluid, organic, satisfying. Background: deep black void with 
volumetric light rays appearing as the transformation completes. Color grade shifts 
from cold desaturated red tones to warm electric blue and green. Cinematic, hopeful, 
transformational. Anamorphic lens. 8 seconds, loopable at the resolved state. 4K.
```

---

#### 4.03.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **Flip** | Transição de posição dos cards entre as duas seções |
| **ScrollTrigger + scrub** | Controla o progresso da transformação cor/conteúdo |
| **Pinning** | Mantém seção fixada durante a transformação de 200vh |
| **MorphSVG** | Transição ícone X → checkmark |
| **colorProps** | Animação de cor dos cards (red → blue/green) |

---

#### 4.03.6–8 (resumido)

**Microinterações:** Hover nos pillars acende glow colorido correspondente  
**Efeitos:** Gradiente de fundo transita do roxo escuro para o azul durante o scroll  
**Conversão:** Preparação emocional para a demo — não há CTA aqui, só preparação

---

---

### SEÇÃO 04 — DEMONSTRAÇÃO VISUAL (FRAME-BY-FRAME)

**Título:** "Veja ao vivo. Sem enrolação."

---

#### 4.04.1 Objetivo da Seção

**Por que existe:** É o coração da conversão. O usuário precisa *ver* o produto funcionando antes de tomar qualquer decisão. Esta seção simula a experiência real do produto através de animações de alta fidelidade controladas pelo scroll.

**O que comunica:** Que o produto é real, polido, profissional e resolve exatamente os problemas anteriores.

---

#### 4.04.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│   [PINNED — 500vh de scroll total]                         │
│                                                             │
│   COLUNA ESQUERDA (40%):          COLUNA DIREITA (60%):    │
│   ┌────────────────────┐          ┌──────────────────────┐ │
│   │                    │          │                      │ │
│   │  [STEP INDICATOR]  │          │  [PRODUCT SCREEN]    │ │
│   │  ● ○ ○ ○          │          │  Frame-by-frame      │ │
│   │                    │          │  animation do demo   │ │
│   │  [STEP TITLE]      │          │                      │ │
│   │  Lead chega        │          │  (muda conforme      │ │
│   │  no WhatsApp       │          │   scroll progress)   │ │
│   │                    │          │                      │ │
│   │  [DESCRIPTION]     │          │                      │ │
│   │  Em 8 segundos a   │          │                      │ │
│   │  IA responde com   │          │                      │ │
│   │  personalidade     │          │                      │ │
│   │                    │          │                      │ │
│   │  [PROGRESS BAR]    │          │                      │ │
│   │  ████░░ 2 de 5     │          │                      │ │
│   └────────────────────┘          └──────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**5 Steps da Demo:**
1. **Lead chega no WhatsApp** — tela do chat, mensagem chegando
2. **IA responde com personalidade** — respostas inteligentes sendo digitadas
3. **Lead é qualificado no funil** — card movendo para coluna "Qualificado"
4. **Agendamento criado automaticamente** — calendário abrindo, evento criando
5. **Dono vê tudo no dashboard** — dashboard completo, métricas subindo

---

#### 4.04.3 Animação Principal

**Tipo:** Frame-by-frame + scroll-controlled narrative (principal seção técnica)

**Estrutura:**
- Seção pinned por 500vh
- 5 steps, cada um com 100vh de scroll
- A tela do produto à direita exibe sequências de frames controladas pelo scrub
- O texto à esquerda faz transição entre steps conforme scroll progress

**Implementação frames:**
```js
// Array de imagens pré-carregadas (ex: 120 frames por step = 600 frames total)
const steps = [
  { frames: whatsappFrames, start: 0, end: 0.2 },
  { frames: aiResponseFrames, start: 0.2, end: 0.4 },
  { frames: funnelFrames, start: 0.4, end: 0.6 },
  { frames: calendarFrames, start: 0.6, end: 0.8 },
  { frames: dashboardFrames, start: 0.8, end: 1.0 },
];

ScrollTrigger.create({
  trigger: ".demo-section",
  start: "top top",
  end: "+=500%",
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress; // 0 to 1
    const activeStep = steps.find(s => progress >= s.start && progress < s.end);
    if (activeStep) {
      const frameProgress = (progress - activeStep.start) / (activeStep.end - activeStep.start);
      const frameIndex = Math.floor(frameProgress * (activeStep.frames.length - 1));
      canvas.drawImage(activeStep.frames[frameIndex], 0, 0);
    }
  }
});
```

**Texto:**  
- Left column faz crossfade entre os 5 steps
- Step indicator atualiza com animação de ponto
- Progress bar cresce conforme scroll

---

#### 4.04.4 Vídeo Kling (5 clips de produto)

**Prompt 1 — WhatsApp Lead:**
```
Close-up screen recording style — dark mode smartphone screen showing a WhatsApp Business 
conversation. A new message notification appears: "Oi, quanto custa uma consulta?" — 
gentle haptic pulse animation on the screen. The message appears with clean typography, 
blue check marks appearing. The phone sits on a dark surface with soft side lighting. 
Camera extremely close, slightly overhead. Blue glow from screen illuminates the surface.
4K, very slow push forward, 6 seconds.
```

**Prompt 2 — IA Respondendo:**
```
Cinematic split screen: left shows WhatsApp conversation with typing indicator appearing 
(three animated dots), right shows a dark-mode AI dashboard showing the agent "thinking" 
— neural network visualization with flowing connections illuminating. The typing dots 
resolve into a complete, warm, intelligent response. The AI visualization pulses with 
satisfaction. Electric blue and violet color palette. Premium tech aesthetic. 8 seconds.
```

**Prompt 3 — Funil Kanban:**
```
Top-down aerial view of a luminous Kanban board on a dark surface. A glowing lead card 
labeled "Maria — Clínica" smoothly slides from the "Novo" column to "Qualificado" with 
a satisfying magnetic snap. The destination column counter increments with a micro-
animation. The card leaves a brief light trail as it moves. Background: pure black 
with subtle grid lines. Electric blue card, green success glow on arrival. 5 seconds.
```

**Prompt 4 — Agendamento:**
```
Calendar application materializing in dark mode — days appearing one by one with a 
blooming effect. An event card "Consulta — Maria" drops into Tuesday 14h with a soft 
bounce and a green confirmation glow. A Google Calendar logo briefly pulses as sync 
occurs. Smooth, satisfying, corporate yet warm. Blue-green palette. 6 seconds.
```

**Prompt 5 — Dashboard:**
```
Wide shot of premium dark mode dashboard with multiple data panels. Conversion numbers 
counting upward in real-time, lead pipeline filling with new cards, revenue metric 
showing upward trend line being drawn dynamically. The scene feels like a war room of 
organized success. Camera slowly pulls back to reveal the full scope. Electric blue 
data, green success metrics, amber notification badges. Cinematic grade. 8 seconds.
```

---

#### 4.04.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **ScrollTrigger + pin** | 500vh pinned section, scrub controlado |
| **Canvas** | Renderização dos frames em canvas para performance máxima |
| **Observer** | Pre-loading de frames quando a seção está próxima |
| **Timelines** | Transições de texto entre os 5 steps |
| **SplitText** | Cada step title revela palavra por palavra no crossfade |
| **MatchMedia** | Em mobile: substitui frame-by-frame por video nativo |
| **ScrollSmoother** | Suaviza a experiência do pin para evitar jank |

**Performance de frames:**
- Frames em WebP (quality 85%)
- Canvas API para renderização (sem DOM)
- Preload via `IntersectionObserver` antes de pinning
- Total estimado: 600 frames × ~15KB = ~9MB (aceitável com preload progressivo)

---

#### 4.04.6 Microinterações

- **Step indicators:** pontos pulsam ao se tornarem ativos
- **Progress bar:** fill animado suavemente conforme scroll
- **Produto screenshot:** sombra se ajusta conforme perspectiva (mouse reactive parallax leve)

---

#### 4.04.7 Efeitos Visuais

- **Product screen:** bezel de device minimalista, screen glow emanando
- **Depth:** sombra complexa no device mockup — múltiplas camadas
- **Transição entre steps:** crossfade suave com leve scale no texto (0.95 → 1)
- **Overlay sutil:** vignette radial nas bordas da área de frames

---

#### 4.04.8 Métricas de Conversão

**Ação:** CTA aparece após step 5 completado  
**CTA mid-page:** "Experimente gratuitamente" — aparece com glow quando usuário chega ao final da demo  
**Gatilhos:** Prova do produto, Reciprocidade (mostramos antes de pedir)  
**Meta:** 30% dos usuários que chegam aqui devem clicar no CTA

---

---

### SEÇÃO 05 — COMO FUNCIONA (STICKY STORY)

**Título:** "Setup em 3 passos. Operação em minutos."

---

#### 4.05.1 Objetivo da Seção

**Por que existe:** Remove a objeção de complexidade. O usuário que chegou até aqui provavelmente pensa "isso deve ser difícil de configurar." Esta seção mostra que em 3 passos simples o produto está funcionando.

---

#### 4.05.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│   [PINNED — 3 steps × 120vh = 360vh]                      │
│                                                             │
│   [NÚMERO GIGANTE] 01  02  03 (muda durante scroll)        │
│                                                             │
│   STEP 01 — Conecte seu WhatsApp                           │
│   [Animação: QR Code surgindo, sendo escaneado]            │
│                                                             │
│   → → → → → → → → → → → scroll → → → → → → → → → → →     │
│                                                             │
│   STEP 02 — Configure seu Agente de IA                     │
│   [Animação: wizard de agente se preenchendo]              │
│                                                             │
│   → → → → → → → → → → → scroll → → → → → → → → → → →     │
│                                                             │
│   STEP 03 — Receba e converta leads                        │
│   [Animação: lead chegando, funil preenchendo]             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.05.3 Animação Principal

**Tipo:** Timeline Storytelling com Pinning + número gigante

Número do step (01, 02, 03) ocupa quase toda a tela em tipografia enorme, semi-transparente, como watermark. O conteúdo real está na frente. O número faz morph quando troca de step.

**Step transition:**
- Current step: opacidade 100%, scale 1
- Incoming step: vem de baixo, escala de 0.92 → 1
- Outgoing step: sai para cima, escala de 1 → 1.08, opacity 1 → 0

---

#### 4.05.4 Vídeo Kling

**Prompt — Step 01 (QR Code):**
```
Dark mode mobile phone scanning a glowing QR code. The QR code floats in space with 
electric blue borders. When scanned, the phone screen transforms to show a WhatsApp 
Business connection success screen with a green checkmark explosion of light particles. 
Satisfying, simple, fast. Blue to green color transition. Premium product photography 
style. 5 seconds.
```

---

#### 4.05.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **ScrollTrigger + pin** | 360vh pinned storytelling |
| **SplitText** | Step titles e descriptions revelam letra a letra |
| **MorphSVG** | Número step (01 → 02 → 03) faz morph |
| **ScrollSmoother** | Suaviza transitions entre steps |

---

#### 4.05.6–8 (resumido)

**Microinterações:** Step indicators na lateral são clicáveis (jump navigation)  
**Efeitos:** Cada step tem sua cor de acento distinta (azul, violeta, verde)  
**Conversão:** CTA "Começar agora" após step 03 — gate de conversão

---

---

### SEÇÃO 06 — AGENTES DE IA

**Título:** "IA com personalidade. Não robô."

---

#### 4.06.1 Objetivo da Seção

**Por que existe:** Diferencia o produto de chatbots genéricos. O usuário médio tem medo de IA robótica que afasta clientes. Esta seção mostra que a IA do FlowIA tem personalidade, tom de voz, delays realistas.

---

#### 4.06.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [HEADLINE] IA com personalidade. Não robô.               │
│                                                             │
│   [AGENT CAROUSEL — horizontal scroll]                     │
│                                                             │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│   │  SOFIA   │ │  CARLOS  │ │   LUNA   │ │  CUSTOM  │    │
│   │ Vendedora│ │ Consultor│ │ Suporte  │ │   Seu    │    │
│   │Calorosa  │ │Analítico │ │Empático  │ │  Agente  │    │
│   │          │ │          │ │          │ │          │    │
│   │[Chat sim]│ │[Chat sim]│ │[Chat sim]│ │  [Criar] │    │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
│                                                             │
│   [FEATURE PILLS] Delay natural · Emoji · Áudio · Imagem  │
│                                                             │
│   [TOGGLE — Comparar resposta IA FlowIA vs chatbot genérico]│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.06.3 Animação Principal

**Tipo:** Horizontal scroll carousel + live chat simulation

O carousel de agentes é horizontal. Ao passar pela área, o scroll se torna horizontal por um trecho (ScrollTrigger horizontal).

Cada card de agente mostra uma simulação ao vivo de conversa: as mensagens aparecem com delay realista, indicador de digitação, emojis, respostas naturais.

**Chat simulation loop:**
```js
// Cada agente tem um script de conversa pré-definido
const sofiaScript = [
  { delay: 500, sender: "lead", text: "Oi! Quanto custa a consulta?" },
  { delay: 1200, sender: "ia", typing: true, duration: 2000 },
  { delay: 3200, sender: "ia", text: "Oi! 😊 Que bom ter você aqui! A consulta inicial é R$120. Mas antes me conta — você está buscando qual tipo de tratamento?" },
  { delay: 5000, sender: "lead", text: "Quero emagrecer" },
  // ...
];
```

---

#### 4.06.4 Vídeo Kling

**Prompt:**
```
Split screen showing two smartphone conversations side by side. Left screen labeled 
"Chatbot Genérico" shows cold, instant, robotic responses: all caps, no personality, 
"I DID NOT UNDERSTAND YOUR MESSAGE. PRESS 1 FOR OPTIONS." Right screen labeled 
"Agente FlowIA" shows warm, intelligent responses with typing delays, emojis, natural 
language, personalized tone. The contrast is stark and obvious. Right screen has a 
warm golden-blue glow, left has cold white clinical light. Customer satisfaction 
reaction icons appear over the FlowIA screen. 8 seconds, cinematic grade.
```

---

#### 4.06.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **ScrollTrigger horizontal** | Carousel de agentes em scroll horizontal |
| **Draggable** | Arrasto manual do carousel em mobile |
| **Timelines** | Cada chat simulation tem sua própria timeline com delays |
| **Observer** | Inicia/pausa chat simulations baseado em visibilidade |

---

#### 4.06.6 Microinterações

- **Click no agente:** expand para fullscreen demo da conversa
- **Toggle comparação:** animação flip entre resposta genérica e FlowIA
- **Hover nos feature pills:** tooltip com exemplo real

---

#### 4.06.7 Efeitos Visuais

- **Cada agente tem sua cor:** Sofia = âmbar (warmth), Carlos = azul (analytics), Luna = verde (empathy)
- **Avatar animado:** SVG avatar com idle animation (breathing, blink)
- **Typing indicator:** três pontos pulsantes com timing realista
- **Card ativo:** escala 1.05 com glow da cor do agente

---

#### 4.06.8 Métricas de Conversão

**Ação:** CTA "Criar meu agente"  
**Gatilho:** Curiosidade (qual personalidade é melhor para meu negócio?)

---

---

### SEÇÃO 07 — INBOX AO VIVO

**Título:** "Seu time de atendimento nunca dorme."

---

#### 4.07.1 Objetivo da Seção

**Por que existe:** Visualizar concretamente o produto de inbox/conversa. Para donos de negócio, o WhatsApp é o coração do negócio. Ver o inbox do produto sendo demonstrado cria desejo imediato.

---

#### 4.07.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [FULLSCREEN PRODUCT MOCKUP — animated]                   │
│   Interface do inbox em tamanho real (ou 85% de 100vw)     │
│                                                             │
│   ┌─────────┬───────────────────────┬──────────────────┐  │
│   │  LISTA  │      CONVERSA         │  PAINEL CONTATO  │  │
│   │         │                       │                  │  │
│   │ Maria ● │  Maria: Oi! Quanto... │  Nome: Maria     │  │
│   │ João    │  IA: Oi 😊 Que bom... │  Lead: Novo      │  │
│   │ Ana ●   │  Maria: Quero info... │  Funil: Inicial  │  │
│   │ Pedro   │  IA: [typing...]      │  Última: agora   │  │
│   │         │                       │                  │  │
│   └─────────┴───────────────────────┴──────────────────┘  │
│                                                             │
│   [FEATURE CALLOUTS — aparecem com setas apontando]        │
│   → Handoff IA ↔ Humano    → Status em tempo real          │
│   → Histórico completo     → Tarefas e notas               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.07.3 Animação Principal

**Tipo:** Product tour interativo com callout reveals

O mockup do produto está animado — novas mensagens chegam em tempo real (simulado), o typing indicator aparece, a resposta da IA chega. À medida que o usuário scrolla, setas/callouts aparecem destacando cada feature do inbox.

**ScrollTrigger:** cada callout tem seu trigger individual, entrando em stagger conforme o scroll avança pela seção.

---

#### 4.07.4 Vídeo Kling

**Prompt:**
```
Cinematic reveal of a premium CRM inbox interface. Dark mode, three-column layout. 
New conversation notifications appearing in the left panel, each with a subtle ping 
animation. Center panel shows a live conversation being typed by an AI — the typing 
indicator pulses, then a warm intelligent response appears with smooth animation. 
Right panel shows contact details and a Kanban stage indicator. Camera slowly 
zooms into the center conversation panel. Blue notification badges, green online 
indicators, amber human handoff indicator glowing. Professional, premium, alive.
8 seconds. 4K.
```

---

#### 4.07.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **ScrollTrigger** | Callouts aparecem conforme scroll avança |
| **Timelines** | Simula novas mensagens chegando em loops |
| **MotionPath** | Seta de callout segue path curvo até o elemento |
| **Observer** | Pausa/resume animações do produto baseado em viewport |

---

---

### SEÇÃO 08 — FUNIL + CRM KANBAN

**Título:** "Pipeline visual. Receita previsível."

---

#### 4.08.1 Objetivo da Seção

**Por que existe:** O Funil Kanban é um diferencial competitivo direto. Muitos chatbots não têm CRM nativo. Esta seção destaca isso como um benefício de negócio (pipeline previsível = receita previsível).

---

#### 4.08.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [HEADLINE] Pipeline visual. Receita previsível.          │
│                                                             │
│   [KANBAN BOARD — fullwidth, animado]                      │
│                                                             │
│   NOVO      QUALIFICADO   PROPOSTA     FECHADO             │
│   ┌──────┐  ┌──────┐      ┌──────┐    ┌──────┐           │
│   │Maria │→ │João  │  →   │Ana   │ →  │Pedro │ ✓         │
│   │ R$0  │  │R$800 │      │R$1.2k│    │R$2k  │           │
│   └──────┘  └──────┘      └──────┘    └──────┘           │
│   │ R$0  │  │R$500 │      │R$900 │    │       │           │
│   └──────┘  └──────┘      └──────┘    └──────┘           │
│                                                             │
│   TOTAL PIPELINE: [COUNTER — R$ 47.800]                    │
│                                                             │
│   [FEATURE LIST] Drag-drop · Valor por deal · Etapas custom│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.08.3 Animação Principal

**Tipo:** Kanban board ao vivo + drag simulation

A animação principal mostra um card de lead sendo arrastado da coluna "Novo" para "Fechado" automaticamente, passando por todas as etapas. Cada passagem de coluna emite um glow de cor correspondente e o total de pipeline aumenta.

**Sequência:**
1. Board aparece com cards já em posições
2. Card "Maria" se anima sozinho: levanta (scale 1.05, shadow intensa)
3. Move horizontalmente pelas colunas com path animado
4. A cada coluna, o total de pipeline cresce (counter animation)
5. Chegando em "Fechado": explosion de partículas verdes, confetti, ✓

---

#### 4.08.4 Vídeo Kling

**Prompt:**
```
Overhead aerial view of a luminous Kanban board in deep space. Sales pipeline cards 
as glowing tiles moving through columns. A lead card "Maria — R$ 2.400" slowly 
levitates and glides from "Novo" column through "Qualificado" to "Proposta" to 
"Fechado" — each column transition emits a satisfying colored light burst. The final 
"Fechado" column explodes in green light particles when the card arrives, a checkmark 
materializes, a revenue counter increments. Background: absolute black with subtle 
grid. Cards: electric blue, each with avatar initials. Column totals glow green. 
Cinematic, satisfying, successful. 10 seconds.
```

---

#### 4.08.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **MotionPath** | Card percorre caminho definido pelo pipeline |
| **ScrollTrigger** | Inicia animação quando seção entra no viewport |
| **Flip** | Cards têm transição natural de posição |
| **Counter** | Total de pipeline incrementa conforme cards chegam |
| **Particles** | Confetti/particles no evento "Fechado" |

---

---

### SEÇÃO 09 — AUTOMAÇÕES

**Título:** "Automações que trabalham enquanto você dorme."

---

#### 4.09.1 Objetivo da Seção

**Por que existe:** Mostrar que o produto não é só chat — é um motor de automação completo. Isso eleva a percepção de valor e justifica o preço.

---

#### 4.09.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [WORKFLOW VISUALIZATION — fullwidth]                     │
│                                                             │
│   [Trigger]──→[Condição]──→[Ação]──→[Ação]──→[Resultado] │
│    Lead         Sem        Enviar   Atualizar  Conversão   │
│    entra        resposta   follow   funil       feita      │
│    24h          4h         up                             │
│                                                             │
│   [FLOATING WORKFLOW CARDS — 3 exemplos]                   │
│   ┌─────────────────┐ ┌─────────────┐ ┌────────────────┐  │
│   │ Follow-up 4h    │ │ Qualif auto │ │ Lembrete agenda│  │
│   │ automático      │ │ via IA      │ │ 1h antes       │  │
│   └─────────────────┘ └─────────────┘ └────────────────┘  │
│                                                             │
│   [STAT] 14 workflows enterprise incluídos                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.09.3 Animação Principal

**Tipo:** SVG workflow drawing + particle data flow

O diagrama de workflow é construído ao vivo conforme o scroll avança:
1. Primeiro nó aparece com pop
2. Linha se "desenha" em direção ao próximo nó
3. Próximo nó aparece
4. Processo repete para todos os nós
5. Quando completo: partículas de dados percorrem o caminho em loop

---

#### 4.09.4 Vídeo Kling

**Prompt:**
```
Abstract data pipeline visualization. Glowing nodes connected by flowing energy 
streams. Each node represents a step in an automation: a speech bubble (incoming 
message), a clock (time trigger), a brain (AI decision), a checkmark (action complete). 
Energy particles flow between nodes in real-time, the system is alive and autonomous. 
No human intervention shown. Color: blue nodes, white-blue energy streams, green 
success pulses. Deep black background. Isometric 3D perspective. Technical elegance. 
8 seconds loopable. 4K.
```

---

#### 4.09.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **DrawSVG** | Linhas de conexão do workflow se "desenham" |
| **ScrollTrigger** | Inicia drawing conforme scroll avança |
| **MotionPath** | Partículas percorrem o path do workflow em loop |
| **Timelines** | Sequência de cada nó aparecendo |

---

---

### SEÇÃO 10 — BENEFÍCIOS (GRID ANIMADO)

**Título:** "Tudo que você precisa. Nada que você não precisa."

---

#### 4.10.1 Objetivo da Seção

**Por que existe:** Síntese completa de features num formato rápido de escanear. Para usuários que "já entenderam" e querem confirmar que têm tudo que precisam.

---

#### 4.10.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [GRID 3x4 — 12 benefit cards animados]                   │
│                                                             │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│   │ 🤖 IA 24h  │ │ 📊 Funil   │ │ 📅 Agenda  │            │
│   │ Atende e   │ │ Kanban     │ │ Google Cal │            │
│   │ qualifica  │ │ nativo     │ │ integrado  │            │
│   └────────────┘ └────────────┘ └────────────┘            │
│                                                             │
│   [continua com mais 9 cards...]                           │
│                                                             │
│   ┌────────────────────────────────────────────┐           │
│   │ [FEATURE DESTAQUE]                         │           │
│   │ Painel Agência — gerencie múltiplos        │           │
│   │ clientes com impersonation e MRR           │           │
│   └────────────────────────────────────────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**12 benefits:**
1. IA Comercial 24h
2. Funil Kanban
3. Agenda integrada
4. Catálogo de serviços
5. Prospecção automática
6. Automações visuais
7. RAG + Base de conhecimento
8. Multimodal (áudio/imagem)
9. Painel Agência multi-cliente
10. Segurança LGPD
11. Cobrança Asaas integrada
12. Setup em minutos

---

#### 4.10.3 Animação Principal

**Tipo:** Staggered card reveal com micro-animation interna

Cada card entra em stagger de 80ms com fade + translate Y. Internamente, o ícone de cada card tem um micro-loop animado (rotação suave, pulsação, bounce leve).

O card "Painel Agência" é maior (full-width ou 2/3) e tem uma animação interna mais elaborada (múltiplos avatares de clientes entrando no painel).

---

#### 4.10.4 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **ScrollTrigger** | Batch reveal dos 12 cards |
| **Timelines** | Micro-loops internos de cada ícone |
| **Observer** | Pausa animações que saem do viewport |

---

#### 4.10.5 Microinterações

- **Hover no card:** scale 1.03, border glow na cor do acento do card, ícone anima por 1s
- **Hover no card Agência:** revela mini-painel com detalhes adicionais (accordion)

---

---

### SEÇÃO 11 — COMPARATIVO ANTES/DEPOIS

**Título:** "Antes: caos. Depois: controle."

---

#### 4.11.1 Objetivo da Seção

**Por que existe:** Tornar o benefício concreto através de contraste. "Antes/depois" é um dos gatilhos de conversão mais poderosos em qualquer copywriting.

---

#### 4.11.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│   [PINNED — 300vh, slider animado]                         │
│                                                             │
│   ANTES │─────────────────│ DEPOIS                         │
│                                                             │
│   Esquerda — tela do celular com WhatsApp caótico          │
│   Direita — FlowIA dashboard organizado                    │
│                                                             │
│   [DRAG HANDLE no centro — o usuário pode arrastar]        │
│                                                             │
│   Scroll controla o reveal automaticamente                 │
│   Handle começa 50/50, vai para 20/80 (DEPOIS domina)      │
│                                                             │
│   [CONTRAST TABLE abaixo]                                  │
│   Antes: 4h de resposta | Depois: 8 segundos              │
│   Antes: 0% follow-up   | Depois: 100% automatizado       │
│   Antes: Sem pipeline   | Depois: Pipeline em tempo real  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.11.3 Animação Principal

**Tipo:** Scroll-controlled before/after + Draggable reveal

Um slider visual divide a tela em "Antes" (esquerda) e "Depois" (direita). O scroll automaticamente move o divider de 50% → 80% (favorecendo o "Depois"). O usuário também pode arrastar manualmente.

Abaixo do slider, uma tabela de comparação tem cada linha revelada em stagger conforme scroll.

---

#### 4.11.4 Vídeo Kling

**Prompt — ANTES:**
```
Dark, chaotic workspace. Desk covered in sticky notes. Three smartphones lit up with 
constant notification badges. WhatsApp conversations unanswered, scrolling back weeks. 
Missed calls indicator. A spreadsheet with leads crossed out in red. Tired business 
owner face reflected in one screen. Monochromatic, desaturated, slightly overexposed. 
Handheld camera, documentary feel. Stress embodied. 5 seconds.
```

**Prompt — DEPOIS:**
```
Clean, organized workspace. Single beautiful monitor showing FlowIA dashboard. 
Conversations organized, lead pipeline full of green cards. Calendar showing 
appointments booked automatically. Revenue counter visible. Business owner leaning 
back, relaxed, phone face-down (no stress). Warm light, golden hour feel mixed 
with cool blue monitor glow. Confident, in control, successful. Premium commercial 
photography style. 5 seconds.
```

---

#### 4.11.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **ScrollTrigger + scrub** | Move divider de 50% → 80% conforme scroll |
| **Draggable** | Handle do slider é arrastável manualmente |
| **Timelines** | Rows da tabela comparativa revelam em stagger |
| **Pinning** | Seção pinned durante a experiência de scroll |

---

---

### SEÇÃO 12 — CASES POR VERTICAL (HORIZONTAL SCROLL)

**Título:** "Funciona no seu mercado."

---

#### 4.12.1 Objetivo da Seção

**Por que existe:** Remove a objeção "será que funciona para o meu tipo de negócio?" Mostrando 5 verticais específicas com métricas reais.

---

#### 4.12.2 Estrutura Visual

**Layout:** Horizontal scroll carousel de 5 case cards, cada um ocupando 70vw.

```
← ARRASTE →

┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  [LOGO]    Clínica · Saúde    |  Imobiliária   |  Consultoria  |  Agência  │
│                                                                              │
│  ┌────────────────────────┐ ┌────────────────────────┐ ...                  │
│  │ CLÍNICA VIDA           │ │ IMÓVEL PRIME            │                     │
│  │ ─────────────          │ │ ─────────────           │                     │
│  │ +47% leads convertidos │ │ +62% respostas rápidas  │                     │
│  │ 3x mais agendamentos   │ │ 2x visitas agendadas    │                     │
│  │                        │ │                         │                     │
│  │ "A IA do FlowIA parece │ │ "Pipeline sempre cheio  │                     │
│  │ nosso melhor atendente"│ │ com leads qualificados" │                     │
│  │                        │ │                         │                     │
│  │ [Ver caso completo →]  │ │ [Ver caso completo →]   │                     │
│  └────────────────────────┘ └────────────────────────┘                     │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

#### 4.12.3 Animação Principal

**Tipo:** Horizontal scroll panel com parallax interno

ScrollTrigger converte o scroll vertical em movimento horizontal. Dentro de cada card, há parallax suave (o texto se move levemente diferente do card background).

Métricas numéricas são contadores que animam quando o card fica visível.

---

#### 4.12.4 Vídeo Kling

**Prompt (por vertical — ex: Clínica):**
```
Warm, professional medical clinic reception area. A nurse at a reception desk looks 
relieved as the FlowIA dashboard on her monitor shows a full appointment calendar 
and a lead pipeline filling with patient cards. Phone no longer ringing frantically — 
managed by AI. The ambient is clean, white and light blue medical with gold accents. 
Confident, organized, professional. Commercial photography quality. No people visible 
from the front (privacy). 6 seconds.
```

---

#### 4.12.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **ScrollTrigger horizontal** | Scroll vertical se converte em horizontal |
| **Pinning** | Seção inteira pinned durante scroll horizontal |
| **Parallax** | Layers internas de cada card com velocidades distintas |
| **Counter** | Métricas animam quando card fica ativo |
| **Draggable** | Suporte a swipe/drag em mobile |

---

---

### SEÇÃO 13 — PROVA SOCIAL + MÉTRICAS

**Título:** "Números que importam. Vozes reais."

---

#### 4.13.1 Objetivo da Seção

**Por que existe:** Prova social é o fator decisório mais poderoso para compra de SaaS. Esta seção consolida credibilidade com dados e depoimentos.

---

#### 4.13.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [MÉTRICAS GIGANTES — 3 colunas]                          │
│                                                             │
│   2.300+           94%              8s                     │
│   conversas/dia    satisfação       resposta média          │
│                                                             │
│   [INFINITE MARQUEE — testimonials]                         │
│   ── [card 1] ── [card 2] ── [card 3] ── [card 4] ── ...  │
│   ← rolagem automática infinita →                          │
│                                                             │
│   [STAR RATINGS] ★★★★★ 4.9 · 127 avaliações               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.13.3 Animação Principal

**Tipo:** Counter animation + Infinite marquee

**Counters:** ao entrar no viewport, os 3 números grandes contam de 0 até o valor final com easing exponencial. Formatação em tempo real (2.300+ formatado com pontos).

**Marquee:** faixa infinita de cards de depoimento deslizando horizontalmente em velocidade constante. Pausa ao hover. Velocidade ligeiramente diferente entre linhas se houver 2 fileiras.

---

#### 4.13.4 Vídeo Kling

**Prompt (fundo ambiental):**
```
Abstract data visualization showing business growth. Green upward trending lines 
and bars appearing one by one against a dark background. Numbers counting up. 
Warm celebratory light blooms appearing as metrics hit milestones. No people, 
no text — pure visual representation of success and growth. Green and blue 
color palette. Soft, satisfying, confident. 6 seconds loopable. 4K.
```

---

#### 4.13.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **ScrollTrigger** | Trigger dos counters |
| **Counter plugin** | Animação numérica com formatação |
| **Observer** | Pausa marquee ao hover |

---

---

### SEÇÃO 14 — INTEGRAÇÕES

**Título:** "Conecta com tudo que você já usa."

---

#### 4.14.1 Objetivo da Seção

**Por que existe:** Remover objeção de "vai funcionar com minhas ferramentas atuais?" Mostrar o ecossistema de integrações eleva percepção de confiabilidade e maturidade do produto.

---

#### 4.14.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [CENTRAL NODE] Logo FlowIA                               │
│                                                             │
│   [INTEGRATION LOGOS orbitando — 3 anéis concêntricos]    │
│                                                             │
│   Anel 1 (próximo):  WhatsApp · Asaas · Google Calendar    │
│   Anel 2 (médio):    Groq · Apify · Supabase · Uazapi      │
│   Anel 3 (externo):  Instagram · Messenger · Stripe · Meta │
│                                                             │
│   [ON HOVER em logo] Card com detalhes da integração       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.14.3 Animação Principal

**Tipo:** Orbital animation + Mouse reactive displacement

Os logos orbitam o nó central em anéis concêntricos com velocidades distintas. O anel 1 é mais lento, anel 3 é mais rápido. A interação do mouse "perturba" as órbitas levemente (como gravidade).

Quando novos logos são revelados (scroll), eles "aterrisam" no anel deles voando de fora da tela.

---

#### 4.14.4 Vídeo Kling

**Prompt:**
```
Solar system style orbital visualization. A central glowing node (FlowIA logo) 
at center, with multiple integration logos orbiting at different speeds and 
distances. The logos glow with their brand colors. The whole system breathes 
and pulsates, connected by subtle energy threads. Deep space background with 
very faint nebula colors. Clean, technical, interconnected, powerful. 8 seconds 
seamless loop. 4K.
```

---

#### 4.14.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **MotionPath** | Logos percorrem paths circulares |
| **ScrollTrigger** | Logos "aterrisam" quando seção entra no viewport |
| **Observer** | Mouse reactive displacement das órbitas |
| **Timelines** | Stagger de entrada dos logos por anel |

---

---

### SEÇÃO 15 — PAINEL AGÊNCIA (DIFERENCIAL)

**Título:** "Para agências: gerencie tudo de um só lugar."

---

#### 4.15.1 Objetivo da Seção

**Por que existe:** O painel Agência é um diferencial competitivo exclusivo. Para donos de agência, isso muda completamente o game. Merece sua própria seção de destaque.

---

#### 4.15.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [BADGE]  Exclusivo para Agências                         │
│                                                             │
│   [HEADLINE] 1 painel. Dezenas de clientes.               │
│   Tudo sob controle.                                        │
│                                                             │
│   [PRODUCT DEMO — Agência panel]                           │
│   ┌────────────────────────────────────────────────────┐   │
│   │ PAINEL FUNDADOR                                    │   │
│   │                                                    │   │
│   │ [TENANT CARDS]                                     │   │
│   │ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │   │
│   │ │Clínica │ │Imóvel  │ │Consul  │ │+Novo   │      │   │
│   │ │✅ Ativo │ │✅ Ativo │ │⚠️ Trial│ │cliente │      │   │
│   │ │MRR 297 │ │MRR 297 │ │MRR 0  │ │        │      │   │
│   │ └────────┘ └────────┘ └────────┘ └────────┘      │   │
│   │                                                    │   │
│   │ MRR TOTAL: R$ 4.752 ↑                             │   │
│   └────────────────────────────────────────────────────┘   │
│                                                             │
│   [FEATURES]  Impersonate · White-label · MRR · Auditoria  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.15.3 Animação Principal

**Tipo:** Product tour com impersonation demo

Animação mostrando o fundador clicando em "Entrar como cliente" em um tenant → a tela transiciona com um efeito de portal/warp → aparece o dashboard do cliente com banner "Você está visualizando como Clínica Vida".

---

#### 4.15.4 Vídeo Kling

**Prompt:**
```
Premium multi-screen agency control room aesthetic. Large central monitor showing 
a multi-tenant CRM dashboard with multiple client cards, each showing their status, 
MRR, and activity metrics. The operator clicks on one client card — a smooth portal 
transition reveals that client's dashboard with an agency banner. The transition 
effect: circular warp/zoom into the card. Futuristic, premium, dark mode. Blue and 
purple agency colors with client-specific accent colors. 8 seconds. 4K.
```

---

#### 4.15.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **Flip** | Transição de card → fullscreen (impersonation) |
| **ScrollTrigger** | Reveal progressivo dos tenant cards |
| **Counter** | MRR total animando conforme cards aparecem |
| **Timelines** | Sequência da demo de impersonation |

---

---

### SEÇÃO 16 — SEGURANÇA + LGPD

**Título:** "Seguro por design. Confiável por padrão."

---

#### 4.16.1 Objetivo da Seção

**Por que existe:** B2B SaaS precisa construir confiança em segurança. Especialmente no Brasil com LGPD. Remove objeções de decisores e CTOs/gerentes.

---

#### 4.16.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [TRUST ICONS ROW]                                        │
│   🔐 LGPD  🛡️ RLS  🔒 Criptografado  🏢 Multi-tenant      │
│                                                             │
│   [3 FEATURE BLOCKS]                                       │
│                                                             │
│   ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │
│   │ Row Level     │ │ LGPD Nativo   │ │ Auditoria     │  │
│   │ Security      │ │ Export+Delete │ │ Completa      │  │
│   │ Supabase RLS  │ │ por contato   │ │ de ações      │  │
│   └───────────────┘ └───────────────┘ └───────────────┘  │
│                                                             │
│   [TECH STACK] Supabase · Postgres 15 · Encryp. em repouso│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.16.3 Animação Principal

**Tipo:** Shield/lock reveal animation

Um escudo SVG se "constrói" na tela peça por peça conforme o scroll avança. Cada feature de segurança "entra" no escudo como uma peça do puzzle, com glow ao encaixar.

---

#### 4.16.4 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **DrawSVG** | Escudo se desenha progressivamente |
| **ScrollTrigger** | Cada peça entra conforme scroll |
| **MorphSVG** | Ícones de segurança fazem morph para o lugar |

---

---

### SEÇÃO 17 — PLANOS + PREÇOS

**Título:** "Comece grátis. Escale conforme cresce."

---

#### 4.17.1 Objetivo da Seção

**Por que existe:** Conversão direta. O usuário que chegou até aqui está preparado para ver preços. Precisa ser claro, transparente e eliminar última fricção.

---

#### 4.17.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [TOGGLE] Mensal | Anual (-20%)                           │
│                                                             │
│   ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────┐│
│   │  Trial     │  │ Iniciante  │  │ Essencial  │  │ Pro  ││
│   │  Grátis    │  │  R$97/mês  │  │  R$297/mês │  │R$597 ││
│   │            │  │            │  │  [POPULAR] │  │/mês  ││
│   │ 7 dias     │  │ 1 agente   │  │ Multi-ag.  │  │ Full ││
│   │ Básico     │  │ WhatsApp   │  │ RAG + Auto.│  │ Esp. ││
│   │            │  │ Funil      │  │ Agenda     │  │      ││
│   │[Começar]   │  │[Assinar]   │  │[Assinar]   │  │[Talk]││
│   └────────────┘  └────────────┘  └────────────┘  └──────┘│
│                                                             │
│   [COMPARE ALL FEATURES — accordion expansível]            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.17.3 Animação Principal

**Tipo:** Plan cards reveal + toggle animation

Cards entram com stagger levantando de baixo. O card "Essencial" (popular) entra com escala 1.05 e glow violeta, visualmente destacado.

Toggle mensal/anual: os preços fazem flip animation (GSAP Flip) mostrando os novos valores. Uma badge "Economize R$X" aparece sobre cada card ao ativar anual.

---

#### 4.17.4 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **Flip** | Troca de preços mensal/anual |
| **ScrollTrigger** | Cards revelam ao entrar no viewport |
| **Timelines** | Stagger de entrada com highlight no popular |

---

#### 4.17.5 Microinterações

- **Hover em card:** scale leve, borda acende
- **Toggle:** preços fazem flip suave, badge de desconto aparece
- **CTA hover:** ripple + glow intensifica
- **Accordion features:** abre/fecha com spring animation

---

#### 4.17.6–8 (resumido)

**Efeitos:** Card popular tem glow violeta constante + badge "Mais popular"  
**Conversão:** CTA em cada card; social proof "427 empresas neste plano"  
**Gatilhos:** Comparação, Escassez (plano Fundador com vagas limitadas), Anchoring (Pro ao lado justifica Essencial)

---

---

### SEÇÃO 18 — FAQ

**Título:** "Dúvidas frequentes."

---

#### 4.18.1 Objetivo da Seção

**Por que existe:** Remove objeções de compra de última hora. Usuários que chegam até aqui estão na fase final de decisão — qualquer dúvida não respondida os faz sair. O FAQ retém esses usuários.

---

#### 4.18.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [HEADLINE] Perguntas frequentes                          │
│                                                             │
│   [SEARCH BAR] "Buscar no FAQ..."                          │
│                                                             │
│   [ACCORDION — 8 perguntas]                                │
│   + Preciso saber programar?                               │
│   + A IA inventa preços ou informações?                    │
│   + Funciona com WhatsApp Business?                        │
│   + Posso assumir a conversa da IA?                        │
│   + Serve para agência?                                    │
│   + Como funciona a cobrança?                              │
│   + É seguro / LGPD?                                       │
│   + Quanto tempo para configurar?                          │
│                                                             │
│   [CTA] Ainda tem dúvidas? Falar com nosso time →         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.18.3 Animação Principal

**Tipo:** Accordion com spring animation

Cada accordion abre com GSAP spring (height 0 → auto com ease spring). A fronteira entre perguntas faz ripple de expansão ao abrir. O ícone + faz rotate 45deg → × ao abrir.

---

#### 4.18.4 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **Timelines** | Open/close animations do accordion |
| **CustomEase** | Spring bounce no open |
| **ScrollTrigger** | Stagger de entrada do accordion |

---

---

### SEÇÃO 19 — CTA FINAL (CLOSING)

**Título:** "Seu próximo cliente está esperando no WhatsApp."

---

#### 4.19.1 Objetivo da Seção

**Por que existe:** Último apelo à ação. Para usuários que chegaram até o fim mas ainda não converteram. Este é o fechar da venda — precisa ser emocionalmente poderoso e reduzir ao máximo a fricção.

---

#### 4.19.2 Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [BACKGROUND — animação cinematográfica full-bleed]       │
│   Vídeo Kling de fundo: fluxo de dados azul violeta       │
│                                                             │
│   [HEADLINE GIGANTE]                                        │
│   Seu próximo cliente                                       │
│   está esperando.                                           │
│                                                             │
│   [SUBHEAD]                                                 │
│   Comece grátis hoje. Setup em 10 minutos.                 │
│   Sem cartão de crédito.                                    │
│                                                             │
│   [CTAs GRANDES]                                           │
│   [Começar grátis agora]    [Falar com um especialista]    │
│                                                             │
│   [TRUST LINE]                                              │
│   ✓ 7 dias grátis  ✓ Sem cartão  ✓ Cancele a qualquer hora│
│                                                             │
│   [FOOTER]                                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 4.19.3 Animação Principal

**Tipo:** Cinematic reveal + exploding headline

O headline está inicialmente comprimido (scale 0.7, opacity 0). Quando a seção entra no viewport, a headline "explode" para o tamanho completo com um impacto visual poderoso — leve shockwave radiante azul ao redor.

**Background:** vídeo Kling em loop com parallax controlado pelo mouse — o fundo flui levemente quando o cursor se move.

---

#### 4.19.4 Vídeo Kling

**Prompt:**
```
Ethereal abstract data stream visualization. Thousands of glowing blue and violet 
conversation bubbles flowing from all directions toward a central luminous point of 
convergence. The bubbles carry small text fragments: "Oi, quanto custa?" "Quero 
marcar consulta" "Me fala mais" — but never readable, just impressionistic. As they 
converge, they transform into green deal cards: "FECHADO R$1.200", "FECHADO R$800". 
The transformation is magical, inevitable, abundant. Background: near-black void with 
distant nebula blues and violets. Cinematic, epic, hopeful, abundant. 10 seconds 
seamless loop. Slow motion, 24fps with heavy motion blur. 4K.
```

---

#### 4.19.5 Estratégia GSAP

| Plugin | Uso |
|--------|-----|
| **ScrollTrigger** | Trigger do reveal ao entrar no viewport |
| **SplitText** | Headline revela palavra por palavra com impact |
| **Timelines** | Sequência headline → subhead → CTAs → trust line |
| **Observer** | Mouse reactive parallax no fundo |
| **CustomEase** | "Explosão" da headline com easing customizado |

---

#### 4.19.6 Microinterações

- **CTA primário hover:** scale 1.05, glow bloom se expande como halo
- **CTA primário click:** ripple + compressão + redirecionamento com fade
- **Mouse move:** o fundo responde levemente ao cursor (parallax ±20px)

---

#### 4.19.7 Efeitos Visuais

- **Background:** vídeo Kling com overlay gradiente topo/base para legibilidade
- **Headline:** gradiente de texto (branco → azul claro)
- **CTAs:** glow bloom violeta pulsante no primário; outline sutil no secundário
- **Trust line:** ícones checkmark em verde animados em stagger

---

#### 4.19.8 Métricas de Conversão

**Ação:** Click "Começar grátis agora"  
**CTA primário:** "Começar grátis agora" → `/signup` ou `/interesse`  
**CTA secundário:** "Falar com especialista" → WhatsApp direto / calendly  
**Gatilhos:** Urgência implícita, Escassez de atenção (lead real esperando), Zero fricção (sem cartão)  
**Meta:** 3–5% dos usuários que chegam aqui convertem

---

<a name="mapa-animacoes"></a>
## 5. MAPA DE ANIMAÇÕES OBRIGATÓRIAS

### ✅ Scroll-Controlled Video
**Seção:** Demo Visual (S04)  
**Implementação:** 600 frames WebP renderizados em canvas controlado por ScrollTrigger scrub

### ✅ Frame-by-Frame Animation
**Seção:** Demo Visual (S04) + Hero (S01)  
**Implementação:** Canvas API + array de imagens pré-carregadas

### ✅ Pinned Sections
**Seções:** Transição/Bridge (S03), Demo Visual (S04), Como Funciona (S05), Antes/Depois (S11)  
**Total pinned:** ~1200vh combinado

### ✅ Horizontal Scroll
**Seção:** Cases por Vertical (S12) + Agentes IA (S06)  
**Implementação:** ScrollTrigger `horizontal: true`

### ✅ Infinite Loop Animations
**Seção:** Prova Social (S13) — marquee de testimonials  
**Implementação:** GSAP `repeat: -1` com seamless duplication de elementos

### ✅ Text Reveal
**Seções:** Hero headline, Como Funciona, CTA Final  
**Implementação:** SplitText + ScrollTrigger batch

### ✅ Character Animation
**Seção:** Hero principal  
**Implementação:** SplitText tipo `chars` para efeito letra-a-letra em palavras-chave

### ✅ SVG Morph
**Seções:** Transição Problema → Solução (S03), Como Funciona ícones (S05), Segurança escudo (S16)  
**Implementação:** GSAP MorphSVG plugin

### ✅ Parallax Layers
**Seções:** Hero, CTA Final  
**Implementação:** Mouse Observer + camadas com velocidades distintas

### ✅ 3D Feeling
**Seções:** Hero product mockup, Demo Visual, Planos  
**Implementação:** CSS perspective + GSAP rotateX/rotateY ao mouse move

### ✅ Floating Objects
**Seção:** Hero product mockup + Integrações logos  
**Implementação:** GSAP keyframe loop (translateY oscillation)

### ✅ Mouse Reactive Elements
**Seções:** Hero, CTA Final, Integrações  
**Implementação:** `mousemove` event → GSAP quickSetter para performance

### ✅ Dynamic Backgrounds
**Seções:** Hero, CTA Final  
**Implementação:** Vídeos Kling + canvas gradient animado

### ✅ Animated Cards
**Seções:** Benefícios (S10), Agentes IA (S06), Cases (S12)  
**Implementação:** Hover timelines + entry stagger

### ✅ Timeline Storytelling
**Seções:** Como Funciona (S05) — 3 steps narrativos com pinning

### ✅ Before / After Animation
**Seção:** Comparativo (S11) — slider com GSAP Draggable + ScrollTrigger scrub

### ✅ Infinite Marquee
**Seção:** Prova Social (S13) — dupla faixa de testimonials em velocidades distintas

### ✅ Sticky Story Sections
**Seções:** Demo Visual (S04), Como Funciona (S05), Antes/Depois (S11)

---

<a name="backlog"></a>
## 6. BACKLOG COMPLETO (8 FASES)

---

### FASE 1 — Estrutura e Setup da Landing Page

**Objetivo:** Fundar a base técnica e visual. Estrutura de projeto, design system, componentes base.

| # | Tarefa | Prioridade | Estimativa |
|---|--------|------------|------------|
| 1.1 | Setup projeto Next.js 14 com App Router | P0 | 2h |
| 1.2 | Instalar e configurar GSAP + plugins (ScrollTrigger, SplitText, MorphSVG, DrawSVG, Flip, Observer, ScrollSmoother, MotionPath, Draggable, CustomEase) | P0 | 3h |
| 1.3 | Configurar ScrollSmoother global | P0 | 1h |
| 1.4 | Implementar design tokens (CSS vars) — cores, tipografia, spacing, motion | P0 | 2h |
| 1.5 | Configurar fontes (Geist + Inter Variable + JetBrains Mono) | P0 | 1h |
| 1.6 | Noise texture overlay global | P1 | 1h |
| 1.7 | Custom cursor component | P1 | 2h |
| 1.8 | Navbar component (logo, links, CTA, scroll behavior) | P0 | 3h |
| 1.9 | Footer component | P1 | 2h |
| 1.10 | Estrutura de rotas e SEO base (metadata, og:image, schema.org) | P0 | 2h |
| 1.11 | `prefers-reduced-motion` middleware global para desativar animações | P0 | 1h |
| 1.12 | Mobile breakpoints e viewport configuration | P0 | 2h |
| 1.13 | Grid perspectivado SVG (componente reutilizável) | P1 | 2h |
| 1.14 | Implementar seções 01-19 em HTML/JSX estático (sem animações) | P0 | 16h |
| 1.15 | Revisão copy e alinhamento com brand voice | P0 | 4h |

**Total Fase 1:** ~48h

---

### FASE 2 — Produção dos Vídeos Kling

**Objetivo:** Gerar todos os assets de vídeo necessários usando Kling 2.5 Turbo Pro.

| # | Vídeo | Seção | Durações | Notas |
|---|-------|-------|----------|-------|
| 2.1 | Hero — data flow convergence (loop) | S01 | 6s | Loop ambiental |
| 2.2 | Hero — chaos to dashboard reveal | S01 | 8s | Principal |
| 2.3 | Problema — 4 pain points split | S02 | 4×4s | 4 micro-clips |
| 2.4 | Solução — transformation orbs | S03 | 8s | |
| 2.5 | Demo Step 1 — WhatsApp lead chegando | S04 | 6s | Product screen |
| 2.6 | Demo Step 2 — IA respondendo | S04 | 8s | |
| 2.7 | Demo Step 3 — Kanban card moving | S04 | 5s | |
| 2.8 | Demo Step 4 — Calendar booking | S04 | 6s | |
| 2.9 | Demo Step 5 — Dashboard overview | S04 | 8s | |
| 2.10 | Setup Step 1 — QR WhatsApp | S05 | 5s | |
| 2.11 | Agentes — generic vs FlowIA IA | S06 | 8s | Split screen |
| 2.12 | Comparativo ANTES | S11 | 5s | Chaotic desk |
| 2.13 | Comparativo DEPOIS | S11 | 5s | Organized desk |
| 2.14 | Cases — Clínica | S12 | 6s | |
| 2.15 | Cases — Imobiliária | S12 | 6s | |
| 2.16 | Cases — Consultoria | S12 | 6s | |
| 2.17 | Métricas — growth animation | S13 | 6s | Loop |
| 2.18 | Integrações — orbital system | S14 | 8s | Loop |
| 2.19 | Agência — control room | S15 | 8s | |
| 2.20 | CTA Final — conversations to deals | S19 | 10s | Loop |

**Total:** ~20 vídeos · ~140 segundos totais  
**Estimativa de geração:** 2–3 dias (incluindo re-runs para qualidade)

---

### FASE 3 — Extração e Otimização de Frames

**Objetivo:** Converter vídeos em sequências de frames WebP otimizados para scroll animation.

| # | Tarefa | Ferramenta | Detalhes |
|---|--------|------------|---------|
| 3.1 | Definir FPS alvo para cada sequência (15fps = smoothness/performance) | — | — |
| 3.2 | Extrair frames dos vídeos de demo (S04) — 5 vídeos × 15fps × ~7s = ~525 frames | FFmpeg | `ffmpeg -i video.mp4 -vf fps=15 frame_%04d.webp -quality 85` |
| 3.3 | Extrair frames do hero scroll (S01) | FFmpeg | ~90 frames |
| 3.4 | Converter todos para WebP com quality 85 | cwebp / FFmpeg | — |
| 3.5 | Otimizar dimensões: mobile (640px) e desktop (1280px) | — | Gera 2 sets |
| 3.6 | Comprimir com lossy WebP, garantir < 15KB por frame | — | — |
| 3.7 | Gerar spritesheet alternativa para sequências curtas (<40 frames) | — | Performance alternativa |
| 3.8 | Organizar em `/public/frames/{section}/{step}/frame_{0000-NNNN}.webp` | — | — |
| 3.9 | Implementar preloader com IntersectionObserver — carrega frames só quando seção está próxima | JS | — |
| 3.10 | Testar carregamento em conexão 4G (budget: < 500KB por seção antes de interação) | Lighthouse | — |
| 3.11 | Implementar blur-up placeholder (frame 001 como lqip) | — | UX de loading |
| 3.12 | CDN setup para assets estáticos (frames, vídeos) | Cloudflare / Vercel Edge | — |

**Total Fase 3:** ~3 dias técnicos

---

### FASE 4 — Implementação GSAP

**Objetivo:** Implementar todas as animações por seção, do mais simples ao mais complexo.

**4A — Infraestrutura de animações (base)**

| # | Tarefa | Est. |
|---|--------|------|
| 4A.1 | ScrollSmoother wrapper global | 2h |
| 4A.2 | Custom cursor component com estados | 3h |
| 4A.3 | `useAnimation` hook com `prefers-reduced-motion` | 2h |
| 4A.4 | `useScrollProgress` hook genérico | 1h |
| 4A.5 | `CounterAnimation` componente genérico | 2h |
| 4A.6 | `MarqueeInfinite` componente genérico | 2h |
| 4A.7 | `FramePlayer` componente canvas para frame sequences | 4h |
| 4A.8 | `ParticleSystem` componente leve | 3h |

**4B — Seções (order by complexity)**

| # | Seção | Animações | Est. |
|---|-------|-----------|------|
| 4B.1 | S18 FAQ | Accordion spring | 4h |
| 4B.2 | S13 Prova Social | Counter + Marquee | 4h |
| 4B.3 | S10 Benefícios | Card stagger reveal | 3h |
| 4B.4 | S17 Planos | Card reveal + toggle flip | 5h |
| 4B.5 | S02 Problema | Card stagger + counters | 3h |
| 4B.6 | S09 Automações | DrawSVG workflow | 6h |
| 4B.7 | S16 Segurança | Shield DrawSVG | 4h |
| 4B.8 | S14 Integrações | Orbital MotionPath | 8h |
| 4B.9 | S19 CTA Final | Cinematic reveal + mouse reactive | 5h |
| 4B.10 | S08 Funil Kanban | MotionPath card journey + particles | 8h |
| 4B.11 | S06 Agentes | Horizontal scroll + chat sim | 8h |
| 4B.12 | S07 Inbox | Product tour callouts | 6h |
| 4B.13 | S15 Agência | Flip impersonation demo | 6h |
| 4B.14 | S12 Cases | Horizontal scroll + parallax | 8h |
| 4B.15 | S11 Antes/Depois | Slider Draggable + scrub | 8h |
| 4B.16 | S05 Como Funciona | Pinned storytelling + SplitText | 8h |
| 4B.17 | S03 Transição | Flip cards + MorphSVG | 10h |
| 4B.18 | S01 Hero | SplitText + ScrollTrigger + video | 10h |
| 4B.19 | S04 Demo Visual | Frame-by-frame canvas + 5 steps pinned | 16h |

**Total Fase 4:** ~145h (~3–4 semanas em ritmo normal)

---

### FASE 5 — Performance

**Objetivo:** Landing page carregando em < 3s e LCP < 2.5s mesmo com todas as animações.

| # | Tarefa | Impacto |
|---|--------|---------|
| 5.1 | Lazy load de todas as seções abaixo do fold | Alto |
| 5.2 | Dynamic import dos frames (não bloquear hero) | Alto |
| 5.3 | `will-change: transform` apenas em elementos ativamente animados | Alto |
| 5.4 | Desativar ScrollSmoother em mobile (substituir por scroll nativo) | Alto |
| 5.5 | Substituir frame-by-frame por video nativo em mobile | Alto |
| 5.6 | CDN para vídeos Kling (Cloudflare Stream / Vercel) | Alto |
| 5.7 | Audit de repaints com Chrome DevTools Performance | Médio |
| 5.8 | Implementar `requestAnimationFrame` para mouse events | Alto |
| 5.9 | Purge CSS não utilizado (Tailwind) | Médio |
| 5.10 | Bundle splitting — GSAP carregado apenas quando necessário | Médio |
| 5.11 | Image optimization — next/image para todos os assets estáticos | Médio |
| 5.12 | Preconnect para CDNs e fonts | Baixo |
| 5.13 | Lighthouse CI no deploy pipeline | Baixo |
| 5.14 | Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1 | Meta |
| 5.15 | Performance budget: < 500KB initial JS, < 2MB total | Meta |

**Total Fase 5:** ~20h + iterações

---

### FASE 6 — SEO

**Objetivo:** Landing rankeando para termos estratégicos e gerando tráfego orgânico.

| # | Tarefa | Detalhes |
|---|--------|---------|
| 6.1 | Keyword research: "CRM WhatsApp", "IA WhatsApp", "chatbot vendas", "funil kanban" | — |
| 6.2 | Meta title: "FlowIA — CRM + IA para WhatsApp | Conversas viram oportunidades" | <60 chars |
| 6.3 | Meta description: 155 chars com CTA natural | — |
| 6.4 | OG Image 1200×630 (criada com Kling/Screenshot do product) | — |
| 6.5 | Schema.org: SoftwareApplication + Organization + FAQPage | — |
| 6.6 | Sitemap.xml automático | — |
| 6.7 | robots.txt configurado | — |
| 6.8 | Canonical URLs | — |
| 6.9 | Hreflang se necessário (pt-BR) | — |
| 6.10 | Heading hierarchy correta (H1 só no hero) | — |
| 6.11 | Alt texts em todas as imagens (descritivos, não decorativos para `role="presentation"`) | — |
| 6.12 | Performance como fator SEO (Core Web Vitals) | — |
| 6.13 | Internal linking structure | — |
| 6.14 | Google Search Console setup + Bing Webmaster | — |

**Total Fase 6:** ~12h

---

### FASE 7 — Acessibilidade

**Objetivo:** WCAG 2.1 AA compliance — produto acessível para todos os usuários.

| # | Tarefa | Detalhe |
|---|--------|---------|
| 7.1 | `prefers-reduced-motion`: desativar todas as animações GSAP, mostrar estado final | Crítico |
| 7.2 | Contrast ratio ≥ 4.5:1 em todos os textos (verificar paleta escura) | Crítico |
| 7.3 | Focus visible em todos os elementos interativos (CTAs, links, accordions) | Crítico |
| 7.4 | `aria-label` em todos os ícones sem texto | Crítico |
| 7.5 | Accordion FAQ: `aria-expanded`, `role="button"`, keyboard navigation | Crítico |
| 7.6 | Carousel de agentes: `role="region"`, `aria-label`, keyboard nav | Alto |
| 7.7 | Horizontal scroll sections: alternativa de navegação para teclado | Alto |
| 7.8 | Vídeos de fundo: `aria-hidden="true"` + `role="presentation"` | Alto |
| 7.9 | Frame animations: fallback image com `alt` descritivo | Alto |
| 7.10 | Skip to main content link | Médio |
| 7.11 | Semantic HTML: `<main>`, `<section>`, `<header>`, `<footer>`, `<article>` | Médio |
| 7.12 | Forms (capture leads): `<label>` associado, error states, autocomplete | Alto |
| 7.13 | Color não é único indicador de estado (ícone + cor + texto) | Médio |
| 7.14 | axe DevTools audit + screen reader testing | — |

**Total Fase 7:** ~16h

---

### FASE 8 — Otimizações Finais

**Objetivo:** Polimento, analytics, A/B testing e monitoramento contínuo.

| # | Tarefa | Detalhes |
|---|--------|---------|
| 8.1 | Google Analytics 4 + eventos custom (CTA clicks, scroll depth) | — |
| 8.2 | Hotjar / Microsoft Clarity para heatmaps e recordings | — |
| 8.3 | A/B test: headline hero ("Conversas viram oportunidades" vs variante) | Posthog / Vercel |
| 8.4 | A/B test: CTA primário ("Começar grátis" vs "Testar 7 dias grátis") | — |
| 8.5 | Cookie consent / LGPD banner | — |
| 8.6 | Error tracking: Sentry.io para JS errors | — |
| 8.7 | Uptime monitoring: UptimeRobot | — |
| 8.8 | Revisão final em dispositivos reais: iPhone 13, Galaxy S22, iPad, MacBook, 1080p, 4K | — |
| 8.9 | Cross-browser: Chrome, Firefox, Safari, Edge | — |
| 8.10 | Revisão de todos os vídeos Kling em produção (loop seamless, performance) | — |
| 8.11 | Revisão de copy com copywriter nativo | — |
| 8.12 | Legal: termos de uso, privacidade, links no footer | — |
| 8.13 | Soft launch: 5% de tráfego → monitorar métricas 48h | — |
| 8.14 | Full launch + tracking de conversões | — |

**Total Fase 8:** ~20h + iterações

---

## RESUMO EXECUTIVO DE EXECUÇÃO

| Fase | Nome | Estimativa | Dependências |
|------|------|------------|-------------|
| F1 | Estrutura e Setup | 48h | Nenhuma |
| F2 | Produção Kling | 2–3 dias | Acesso ao Kling 2.5 Turbo Pro |
| F3 | Frames e Assets | ~3 dias | F2 concluída |
| F4 | GSAP Implementation | ~145h | F1, F3 parcial |
| F5 | Performance | ~20h | F4 completa |
| F6 | SEO | ~12h | F1 base |
| F7 | Acessibilidade | ~16h | F4 completa |
| F8 | Finalização | ~20h | F5, F6, F7 |

**Total estimado:** ~280h de desenvolvimento + 3–4 dias de produção de vídeo  
**Timeline realista:** 6–8 semanas com 1 desenvolvedor sênior + 1 designer

---

## PRÓXIMOS PASSOS IMEDIATOS

1. **Aprovação deste plano** — revisar seções, copy, estratégia de conversão
2. **Gerar os 20 vídeos Kling** (fase mais crítica para o visual)
3. **Setup do projeto Next.js** com estrutura estática (sem animações)
4. **Design review** — validar paleta, tipografia, layout em Figma antes do código
5. **Iniciar F4** pelas seções mais simples (FAQ, Prova Social, Benefícios) para validar arquitetura GSAP

---

*Documento criado com base em análise completa da documentação técnica Stackflow, proposta de valor FlowIA, personas de cliente, e referências visuais de nível Awwwards.*  
*Versão 1.0 — Junho 2026*