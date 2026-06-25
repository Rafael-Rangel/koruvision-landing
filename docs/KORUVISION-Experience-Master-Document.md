# KORUVISION — Documento Mestre da Experiência Completa

> **Versão:** 2.0 · **Status:** AGUARDANDO APROVAÇÃO — nenhum asset deve ser gerado antes da assinatura deste documento  
> **Escopo:** Landing page definitiva · 19 cenas · CRM com IA · produto-first · filme interativo · **protagonista visual por seção**  
> **Referência visual ouro:** Cena 02 — Coruja abrindo os olhos (`SectionVisionBridge` + F2F `NV11-F2F-001`)  
> **Stack motion:** GSAP 3.15 · Lenis · plugins em [`lib/gsap/register.ts`](../lib/gsap/register.ts)

### Pacote v2.0 — documentação de produção (100% prompts prontos)

| Documento | Conteúdo |
|-----------|----------|
| [Matriz de Protagonistas](KORUVISION-Protagonists-Matrix.md) | Protagonista, tipo (3D/F2F/LOOP/HYB), interações por cena |
| [Cadeia Narrativa](KORUVISION-Narrative-Continuity-Chain.md) | Frame final → frame inicial entre todas as 19 cenas |
| [image-prompts.md](../assets/prompts/v11/image-prompts.md) | 19 BG + 3 PNG transparentes — prompts FLUX completos |
| [video-prompts.md](../assets/prompts/v11/video-prompts.md) | 5 F2F + 19 loops — roteiro, Kling, ffmpeg |
| [svg-specs.md](../assets/prompts/v11/svg-specs.md) | 18 SVGs — paths, DrawSVG, MorphSVG, MotionPath |
| [animation-specs.md](../assets/prompts/v11/animation-specs.md) | Timeline GSAP por cena — pin, scrub, handoffs |
| [3d-interactive-specs.md](../assets/prompts/v11/3d-interactive-specs.md) | 13 componentes 3D — mouse, scroll, fallbacks |
| [KORUVISION-Scene-Deep-Specs.md](KORUVISION-Scene-Deep-Specs.md) | **19 cenas** — spec profunda (nível Hero) |

**Distribuição protagonistas:** 74% 3D interativo · 21% F2F scroll · 5% loop protagonista (C15). Nenhuma cena só com imagem estática.

---

## Sumário

1. [Visão e promessa](#1-visão-e-promessa)
1b. [Protagonistas visuais por seção](#1b-protagonistas-visuais-por-seção)
1c. [Specs profundas por cena](#1c-specs-profundas-por-cena)
2. [Universo visual único](#2-universo-visual-único)
3. [Arquitetura técnica da experiência](#3-arquitetura-técnica-da-experiência)
4. [Roteiro cinematográfico — 5 atos / 19 cenas](#4-roteiro-cinematográfico--5-atos--19-cenas)
5. [Especificação detalhada por cena](#5-especificação-detalhada-por-cena)
6. [Sistema de vídeos](#6-sistema-de-vídeos)
7. [Sistema de imagens](#7-sistema-de-imagens)
8. [Sistema de SVGs e gráficos](#8-sistema-de-svgs-e-gráficos)
9. [Mockups vivos (React, não IA)](#9-mockups-vivos-react-não-ia)
10. [Sistema de animações GSAP](#10-sistema-de-animações-gsap)
11. [Transições entre cenas](#11-transições-entre-cenas)
12. [Som opcional](#12-som-opcional)
13. [Performance e legibilidade](#13-performance-e-legibilidade)
14. [Catálogo de assets (IDs)](#14-catálogo-de-assets-ids)
15. [Gate de produção](#15-gate-de-produção)

---

## 1. Visão e promessa

### O que estamos vendendo
CRM com IA, automações, atendimento omnichannel, agentes inteligentes e gestão comercial — **uma plataforma viva**.

### O que o visitante deve sentir
| Sensação | Como entregamos |
|----------|-----------------|
| Profundidade | Parallax multicamada, mockups 3D, F2F scroll, sombras coerentes |
| Movimento | Loops vivos + ambient ticker + scroll scrub + partículas |
| Tecnologia | Redes neurais, filamentos de dados, nodes, dashboards reais |
| Inteligência | Coruja como camada de visão; IA demonstrada, não só explicada |
| Exclusividade | Assets proprietários NV11 — zero stock, zero abstração genérica |
| Imersão | Pin + narrativa contínua; frame final de uma cena = frame inicial da próxima |

### Regra de ouro
> Se um elemento visual não ajuda a **explicar o produto** ou **aumentar conversão**, ele não entra.

### Regra de legibilidade (crítica)
> Nenhum vídeo, glow, blur ou partícula pode prejudicar leitura, contraste ou escaneabilidade. Mockups com texto = **componentes React** (PT-BR real). Imagens/vídeos IA = **apenas atmosfera** (sem texto legível).

### Regra de protagonista (v2.0)
> Cada uma das 19 seções possui **um elemento visual vivo** claramente definido — 3D interativo, F2F scroll, loop ou híbrido. Imagens estáticas são **apenas camada de suporte** (opacity ≤0.35). Ver matriz completa em [KORUVISION-Protagonists-Matrix.md](KORUVISION-Protagonists-Matrix.md).

---

## 1b. Protagonistas visuais por seção

Resumo executivo — detalhes, interações e assets em [Matriz de Protagonistas](KORUVISION-Protagonists-Matrix.md).

| # | Cena | Protagonista | Tipo |
|---|------|--------------|------|
| 01 | Hero | Núcleo KoruVision (orbe IA + iris owl) | HYB 3D+F2F |
| 02 | Coruja ★ | Olhos mecânicos abrindo | F2F |
| 03 | Problema | Campo de Fragmentos Caóticos | 3D |
| 04 | Pilares | Monólito Quatro Pilares | 3D |
| 05 | Demo | Despertar do CRM + Device Stack | HYB F2F+3D |
| 06 | Setup | Três Portais de Conexão | 3D |
| 07 | Agentes IA | Cérebro Neural Comando | 3D |
| 08 | Inbox | Deck Omnichannel | 3D+LIVE |
| 09 | Funil | Vórtice Pipeline Magnético | 3D |
| 10 | Automações | Motor Sináptico de Fluxo | 3D |
| 11 | Analytics | Evolução de Dados | F2F+LIVE |
| 12 | Benefícios | Constelação de Ganhos | 3D |
| 13 | Antes/Depois | Divisor de Dois Universos | 3D |
| 14 | Cases | Galeria Totem Vertical | 3D |
| 15 | Social Proof | Mural de Confiança Vivo | LOOP+LIVE |
| 16 | Integrações | Nexus Orbital CRM | 3D |
| 17 | Agência | Portal Multi-Tenant | 3D |
| 18 | Planos | Monólitos de Pricing | 3D |
| 19 | CTA Final | Convergência + CRM Compacto | HYB F2F+3D |

**Continuidade narrativa:** cada handoff frame-a-frame documentado em [KORUVISION-Narrative-Continuity-Chain.md](KORUVISION-Narrative-Continuity-Chain.md).

**Hero (C01) — interações obrigatórias:** hover 3D · rotação suave pelo cursor · profundidade em camadas · reflexos dinâmicos · partículas seguem cursor · luz dinâmica · CRM emerge no scroll. Spec completa: [C01 Deep Specs](KORUVISION-Scene-Deep-Specs.md#c01--hero--despertar).

---

## 1c. Specs profundas por cena

Cada uma das 19 seções possui documentação no **mesmo nível de detalhe do Hero**:

| Documento | Conteúdo por cena |
|-----------|-------------------|
| [KORUVISION-Scene-Deep-Specs.md](KORUVISION-Scene-Deep-Specs.md) | Conceito · camadas z/opacity · impacto 3s · mouse · scroll timeline · GSAP · handoffs · assets NV11 · componente · mobile · performance |

Índice direto: C01–C19 com âncoras no arquivo. Use como **brief único** para design, motion e desenvolvimento antes de gerar assets ou codificar `SceneCinemaLayer`.

---

## 2. Universo visual único

### Metáfora central: **Observatório Neural KORUVISION**
O visitante entra no olhar da coruja (inteligência que vê) e atravessa um ecossistema onde dados líquidos, painéis de vidro e energia dourada convergem no CRM operacional.

### Paleta obrigatória (todos os assets)

| Token | Hex | Uso narrativo |
|-------|-----|---------------|
| void-deep | `#010208` | Abismo absoluto |
| void-mist | `#03060F` / `#0A0E1C` | Névoa base |
| violet-core | `#8B5CF6` / `#B24BFF` | IA, conexões, KORU energy |
| gold-liquid | `#FFC233` | Visão, conversão, highlights |
| neural-cyan | `#2EE8C0` | Dados ativos, sucesso |
| chrome-rim | `#E8ECF8` | Bordas de vidro, UI chrome |
| danger-fog | `#FF4D6A` | Caos (C03 apenas) |
| text-primary | `#F7FAFF` | Headlines |
| text-sub | `#C6D4F0` | Corpo |

### Hue por ato (continuidade `--continuity-hue`)

| Ato | Cenas | Hue dominante | Energia |
|-----|-------|---------------|---------|
| I Despertar | C01–C03 | 265 → 8 | Escuro → tensão |
| II Máquina | C04–C06 | 200 → 220 → 175 | Ordem → demonstração |
| III Produto | C07–C11 | 265 → 150 → 42 → 210 → 285 | IA → operação → dados |
| IV Prova | C12–C16 | 230 → 190 → 160 → 48 → 205 | Confiança → escala |
| V Conversão | C17–C19 | 270 → 250 | Decisão → clímax |

### Iluminação (todos os renders IA)
- **Key:** superior direita 45°, branco frio
- **Fill:** violeta 12–18%
- **Rim:** gold + cyan nas bordas
- **God rays:** Hero, Coruja, Demo pin, CTA
- **Proibido:** fundo branco, luz diurna, stock photo, simetria frontal de mockup

### Sufixo global FLUX (imagens atmosféricas)
```
Névoa Neural aesthetic, KORUVISION premium dark universe, absolute void #010208,
volumetric purple mist #8B5CF6 and liquid gold rim #FFC233, neural cyan accents #2EE8C0,
holographic glass depth, oblique cinematic camera 28 degrees, subsurface scattering,
anamorphic bokeh, 8K commercial quality. Match single visual universe.
No logos, no brand names, no watermarks, no people, no hands, no readable text, no UI text.
```

### Negative global
```
flat lighting, white background, stock photo, generic purple gradient, cartoon, blurry,
watermark, text, letters, numbers on screens, hands, fingers, space nebula generic,
futuristic city without product context, duplicate elements, isolated floating objects
```

### Regra de integração 3D
Elementos 3D/PNG devem **nascer do ambiente** da cena (mesma hue, sombra, reflexo). Nunca “colados” sobre a interface.

---

## 3. Arquitetura técnica da experiência

### Camadas globais (sempre ativas após idle 900ms)
| Camada | Componente | Função |
|--------|------------|--------|
| Z0 | `GlobalJourneyLayer` | Partículas + spine + aurora + `--journey-p` |
| Z0 | `LivingEcosystem` | Rede neural fullscreen (desktop) |
| Z0 | `JourneySectionBeams` | Feixes entre âncoras de cena |
| Z1 | Background por cena | Imagem + vídeo loop + SVG decor |
| Z2 | Scrim legibilidade | `readability-panel` / `readability-scrim` |
| Z3 | Conteúdo + mockups React | Produto protagonista |
| Z4 | Copy + CTA | SplitText, magnetic buttons |
| Z∞ | `GlobalCursor` | Glow reativo (desktop) |

### Scroll
- **Lenis** (`lib/lenis-scroll.ts`): inércia premium, `--scroll-velocity`
- **ScrollTrigger**: pin nas cenas cinematográficas, scrub por cena
- **Fases por ato pinado** (`lib/motion-system.ts`): BUILD 0–48% · PEAK 48–72% · EXIT 72–100%

### Plugins GSAP registrados
`ScrollTrigger` · `Observer` · `Flip` · `MotionPathPlugin` · `MorphSVGPlugin` · `DrawSVGPlugin` · `SplitText`

### Estrutura de pastas de assets (produção NV11)
```
public/assets/nv11/
  images/          # FLUX atmosféricos por cena
  videos/          # Kling loops + fontes F2F
  f2f/{SEQ_ID}/    # frame_NNNN.webp
  svg/             # exports opcionais; preferir inline React
  posters/         # poster por vídeo
```

---

## 4. Roteiro cinematográfico — 5 atos / 19 cenas

### Arco narrativo em uma frase
**A coruja desperta → enxerga o caos → revela a máquina → demonstra o CRM vivo → prova resultados → convida a entrar.**

### Mapa da jornada

```
C01 HERO          "Algo poderoso está despertando"
       ↓ energia + olhos
C02 CORUJA ★      "A inteligência abre os olhos" [REFERÊNCIA]
       ↓ visão penetra névoa
C03 PROBLEMA      "O caos que você vive hoje"
       ↓ necessidade de ordem
C04 PILARES       "Quatro forças substituem quatro dores"
       ↓ promessa estruturada
C05 DEMO          "Dentro da máquina — 5 atos do produto"
       ↓ desejo operacional
C06 SETUP         "5 minutos para ligar"
       ↓ baixa fricção
C07 AGENTES IA    "IA que vende como seu melhor closer"
       ↓ diferencial
C08 INBOX         "Toda conversa, um comando"
       ↓ omnichannel
C09 FUNIL         "Deals com gravidade"
       ↓ pipeline
C10 AUTOMAÇÕES    "Sistema nervoso comercial"
       ↓ eficiência
C11 ANALYTICS     "Dados que respiram"
       ↓ prova racional
C12 BENEFÍCIOS    "Constelação de ganhos"
       ↓ valor agregado
C13 ANTES/DEPOIS  "Dois universos"
       ↓ contraste emocional
C14 CASES         "5 mercados, um fluxo"
       ↓ verticalização
C15 SOCIAL        "+2.400 equipes"
       ↓ confiança coletiva
C16 INTEGRAÇÕES   "Tudo orbita o CRM"
       ↓ ecossistema
C17 AGÊNCIA       "Escala multi-tenant"
       ↓ expansão B2B2B
C18 PLANOS        "Escolha seu portal"
       ↓ decisão racional
C19 CTA           "Entre no observatório"
```

### Jornada do usuário (conversão)

| Momento | Estado mental | Ação desejada |
|---------|---------------|---------------|
| C01–C02 | Curiosidade + admiração | Continuar scroll |
| C03 | Identificação com dor | "Isso sou eu" |
| C04–C05 | Desejo + compreensão | Explorar produto |
| C06–C11 | Confiança técnica | Imaginar uso |
| C12–C16 | Prova social + escala | Validar decisão |
| C17–C18 | Comparação de valor | Escolher plano |
| C19 | Urgência positiva | CTA primário |

---

## 5. Especificação detalhada por cena

> Template aplicado a cada cena: objetivo · copy · visual · motion · vídeo · transição.

---

### C01 — HERO · O Despertar do Observatório
**ID DOM:** `#s01` · **Pin:** 360vh desktop / 240vh mobile · **Scrub:** 0.42

#### Objetivo narrativo
Em menos de 5 segundos de scroll inicial, o visitante entende: *plataforma extremamente avançada*. A coruja é porta de entrada; o CRM é revelado como protagonista.

#### Copy
| Campo | Texto |
|-------|-------|
| Eyebrow | CRM com IA · Atendimento omnichannel |
| Headline | O CRM que vê cada lead e fecha por você. |
| Subheadline | WhatsApp, IA, funil e automações numa só plataforma viva. A KORUVISION transforma conversas dispersas em receita previsível. |
| CTA primário | Começar grátis — 14 dias |
| CTA secundário | Ver o produto em ação → `#s04` |
| Bullets | Pipeline visual · IA qualificando leads · Automação no WhatsApp |

#### Elementos visuais
| Camada | Especificação |
|--------|---------------|
| BG imagem | `NV11-IMG-001` aurora diagonal gold+violet, lado esquerdo escuro |
| BG vídeo loop | `NV11-VID-LOOP-001` energia percorrendo rede (opacity 0.22) |
| Foreground | `ProductCommandCenter` (mockup vivo) + `HeroExperience` orbit |
| Vídeo coruja | `NV11-VID-LOOP-002` owl eyes subtle loop atrás do CRM |
| 3D | Cards orbitais CRM/IA/Analytics (CSS 3D, baixa opacidade) |
| Partículas | Canvas hero + journey global |
| SVG | `SVG-HERO-SPINE` — linhas convergindo ao CRM |

#### Mockup vivo (React)
- KPIs com count-up no BUILD
- Deal "Maria S." aparece no estágio Qualificado no scroll 0.25
- Chat IA pulsa no PEAK
- Flow node "CRM" ativa no 0.4

#### Animações GSAP
| Elemento | Técnica | Trigger |
|----------|---------|---------|
| Headline | SplitText lines + mask reveal | scrub pin |
| Words | stagger `heroWordTransform` | scrub |
| ProductCommandCenter | scale 0.92→1, y 40→0 | BUILD |
| Orbit cards | só após progress 0.32 | performance |
| Handoff glow | 0.68→1 prepara C02 | EXIT |
| BG vídeo | parallax y -8% | scrub |

#### Vídeo
- **Loop:** `NV11-VID-LOOP-001` (ver catálogo)
- **F2F:** nenhum (handoff para C02)

#### Microinterações
- Magnetic CTAs · InteractiveSurface no CRM · hover 3D no command center

#### Som (opcional)
- Sub-bass swell 80Hz no despertar (0→0.15 scroll)

#### → Transição para C02
Frame final: brilho dourado concentrado no centro-direita (posição dos olhos). COPY fade out. `s01-handoff-glow` opacity 0.55.

---

### C02 — VISÃO · Coruja Abrindo os Olhos ★ REFERÊNCIA
**ID DOM:** `#s02-vision` · **Pin:** 320vh · **Scrub:** 0.48 · **Manter implementação atual**

#### Objetivo narrativo
A inteligência **vê** o caos do mercado. Momento mais cinematográfico da página — padrão de qualidade para todas as outras cenas.

#### Copy
| Campo | Texto |
|-------|-------|
| Linha 1 | Conversas chegam por todos os canais. |
| Linha 2 | A KORUVISION transforma isso em pipeline organizado. |

#### Elementos visuais
| Camada | Especificação |
|--------|---------------|
| F2F scroll | `NV11-F2F-001` (evolução de `NV9-F2F-001`) — 90 frames |
| Crossfade | first→last vision frames |
| Vídeo owl loop | poster + SmartVideo fallback |
| Tunnel mask | `visionTunnelMask` radial |
| Owl transform | `visionBridgeOwl` scale/opacity |

#### F2F — Roteiro frame a frame
| Progress | Frame narrativo |
|----------|-----------------|
| 0.00 | Olhos fechados, escuridão total, névoa violeta |
| 0.15 | Primeiro brilho âmbar nas pálpebras |
| 0.35 | Olhos semi-abertos, pupila reflete dados |
| 0.55 | Olhos abertos, iris gold, energia nos cantos |
| 0.75 | Pupila contrai — "foco" |
| 1.00 | Olhar fixo luminoso — **match cut** para névoa C03 |

#### Animações GSAP
- Pin + scrub F2F via `FrameScrubber`
- Copy lines stagger 0.22 / 0.32
- Ambient parallax 0.35 opacity
- Handoff vignette 0.88→1

#### → Transição para C03
Olhar da coruja = mesmo ponto de luz que dissolve em névoa vermelha (caos). Tunnel expande.

---

### C03 — PROBLEMA · Névoa Vermelha
**ID:** `#cena-problema` · **Pin:** 200vh · **Hue:** 8

#### Objetivo
Validar dor. Visitante se reconhece. Contraste máximo com ordem que vem depois.

#### Copy
| Campo | Texto |
|-------|-------|
| Eyebrow | O problema |
| Headline | Seus leads esfriam na névoa operacional. |
| Subheadline | WhatsApp solto, planilhas quebradas, follow-up esquecido e ninguém sabe de quem é a venda. Cada minuto sem resposta é receita escorrendo pelo ralo. |
| CTA | Quero sair do caos |
| Points | Conversas perdidas · Sem funil · Resposta lenta · Equipe apagando incêndio |

#### Visuais
| Asset | ID | Descrição |
|-------|-----|-----------|
| BG imagem | `NV11-IMG-003` | Névoa vermelha `#FF4D6A`, fragmentos de dados quebrados |
| BG vídeo loop | `NV11-VID-LOOP-003` | Partículas caóticas dispersas (subtle) |
| SVG decor | `SVG-CHAOS-NET` | Linhas quebradas, nós desconectados — DrawSVG reverse |
| Cards flutuantes | Chips "WhatsApp/Planilha/..." | float errático (amp alto) |
| 3D | Lâminas de vidro **fraturadas** tiltadas |

#### Animações
- SplitText blur reveal (chars)
- Chips: entrada caótica com `random` stagger
- SVG paths: draw 0→60% then flicker
- BG parallax + scroll velocity reactive

#### → C04
Névoa vermelha **comprime** no centro; quatro feixes de luz (pilares) emergem — cor muda para azul-violeta.

---

### C04 — PILARES · A Virada
**ID:** `#cena-pilares` · **Pin:** 240vh · **Hue:** 200

#### Objetivo
Apresentar os 4 pilares como organismo único substituindo 4 dores.

#### Copy
| Eyebrow | A virada |
| Headline | Quatro pilares substituem quatro dores. |
| Sub | Atendimento, inteligência, pipeline e automação operando como um só organismo. |
| CTA | Ver como funciona → `#s04` |

#### Visuais
- BG: `NV11-IMG-004` quatro pilares de luz
- Loop: `NV11-VID-LOOP-004` energia subindo nos pilares
- `Product3DFeatureCards` ×4 (CRM, IA, Automação, Analytics)
- SVG: `SVG-FOUR-PILLARS` conectados ao hub central

#### Animações
- **Flip:** cards caóticos (C03) → cards pilares (se overlap)
- Cards 3D: stagger entrance + hover tilt
- Hub central pulse

#### → C05
Câmera "entra" no pilar central → morph para interior da máquina (Demo).

---

### C05 — DEMO · Dentro da Máquina
**ID:** `#s04` · **Pin:** 480vh · **Scrub:** 0.68

#### Objetivo
Demonstração operacional em 5 atos. Visitante **controla a câmera**.

#### Copy
| Eyebrow | Demonstração · Dentro da plataforma |
| Headline | Cinco atos, um único fluxo. |
| Sub | Do primeiro 'oi' no WhatsApp ao deal fechado no dashboard. |
| CTA | Quero esse fluxo na minha operação |

#### 5 Atos (mockups vivos)
| Ato | UI | Copy ato | Métrica flutuante |
|-----|-----|----------|-------------------|
| 1 WhatsApp | `UIWhatsAppChat` | Lead entra — contexto capturado | +1 lead qualificado |
| 2 IA | `UIAgentPanel` | Agente qualifica — score em tempo real | Score 87% |
| 3 Kanban | `UIKanbanBoard` | Maria avança no funil | R$ 2.400 em movimento |
| 4 Agenda | `UICalendarView` | Consulta confirmada | Zero atrito |
| 5 Dashboard | `UIDashboard` | Pipeline R$ 47.800 · Conv. 23% | Visão executiva |

#### Visuais
- BG: `NV11-IMG-005` interior máquina / corredor neural
- Loop: `NV11-VID-LOOP-005` ambiente demo
- **F2F opcional:** `NV11-F2F-002` CRM revelado (ver seção 6)
- Device stack 3D + `camera-rig` interpolation
- Progress ring SVG scrub

#### Animações
- 5× BUILD/PEAK/EXIT por ato
- Camera z/ry/rx por `CAM_CONFIGS`
- Screen crossfade 0.72 local
- Float chips por ato

#### → C06
Último frame: dashboard com botão "Conectar WhatsApp" em glow → match para setup.

---

### C06 — SETUP · Três Portais
**ID:** `#cena-setup` · **Hue:** 175

#### Objetivo
Eliminar objeção de implementação. "5 minutos".

#### Copy
| Headline | No ar em 5 minutos. |
| Steps | 01 Conecte WhatsApp · 02 Ative agente IA · 03 Importe contatos |
| CTA | Conectar meu WhatsApp |

#### Visuais
- BG: `NV11-IMG-006` três portais de luz alinhados em profundidade
- Loop: `NV11-VID-LOOP-006` QR/energia percorrendo portal
- SVG: `SVG-SETUP-SPINE` — DrawSVG vertical no scroll
- Timeline 3 steps com `SetupVisual`

#### → C07
Portal central abre → luz violeta neural (agentes).

---

### C07 — AGENTES IA · Cérebro Comercial
**ID:** `#cena-agentes` · **Hue:** 265

#### Objetivo
IA como diferencial — **demonstrada**, não só descrita.

#### Copy
| Headline | Agentes de IA que vendem como seu melhor closer. |
| Points | Qualificação · Score · Voz da marca · Handoff |

#### Visuais
- BG: `NV11-IMG-007` neural field (rede 3D profundidade)
- Loop: `NV11-VID-LOOP-007` pulsos viajando entre nodes
- `NeuralFlowCanvas` + `UIAgentPanel` + `UIWhatsAppChat`
- 3D brain no card IA

#### Mockup vivo
- Score 0→87% count-up
- Barras de intenção animadas
- Chat: bolha IA digita letra a letra (SplitText chars)

#### → C08
Node "WhatsApp" acende → zoom para inbox.

---

### C08 — INBOX · Sala de Comando
**ID:** `#cena-inbox` · **Hue:** 150

#### Objetivo
Omnichannel unificado. Nada se perde.

#### Visuais
- BG: `NV11-IMG-008` sala de comando holográfica teal
- Loop: `NV11-VID-LOOP-008` mensagens entrando nas colunas
- `UIInboxThreeCol` em DeviceShell
- Chips flutuantes: WhatsApp / Instagram / E-mail

#### Mockup vivo
- Nova linha na inbox a cada 4s
- Tag "Handoff IA→Humano" pulse
- Deal R$ 2.400 slide-in

#### → C09
Deal card **arrastado** visualmente para funil (MotionPath).

---

### C09 — FUNIL · Gravidade do Deal
**ID:** `#cena-funil` · **Hue:** 42

#### Objetivo
Pipeline magnético. Deal como personagem.

#### Visuais
- BG: `NV11-IMG-009` funil gravitacional gold
- Loop: `NV11-VID-LOOP-009` esferas descendo estágios
- `UIKanbanBoard` + SVG funnel path
- Dot `MotionPath` percorrendo funil

#### Mockup vivo
- Card "Maria S." snap magnético entre colunas no scroll
- Valores atualizam

#### → C10
Deal fechado dispara **pulso** na rede de automação.

---

### C10 — AUTOMAÇÕES · Sistema Nervoso
**ID:** `#cena-automacoes` · **Hue:** 210

#### Objetivo
Fluxos que trabalham sozinhos 24/7.

#### Visuais
- BG: `NV11-IMG-010` filamentos sinápticos purple+gold
- Loop: `NV11-VID-LOOP-010` energia percorrendo nodes
- `UIWorkflowCanvas` + SVG wire com 3 pulsos MotionPath

#### Mockup vivo
- Node "IA" expande → nodes downstream acendem em sequência
- Trigger → Action labels fade in

#### → C11
Todos os nodes convergem para painel de métricas.

---

### C11 — ANALYTICS · Dados que Respiram
**ID:** `#cena-analytics` · **Hue:** 285

#### Objetivo
Decisão guiada por dados em tempo real.

#### Visuais
- BG: `NV11-IMG-011` holografia de gráficos (sem texto legível)
- Loop: `NV11-VID-LOOP-011` barras/linha subindo em loop
- `UIDashboard` + chips KPI flutuantes

#### Mockup vivo
- Barras `.dash-bars` height oscillate (ambient)
- KPIs count-up: Pipeline +18%, Leads +31
- **F2F:** `NV11-F2F-003` Evolução de dados (ver seção 6)

#### → C12
Zoom out do dashboard → constelação de benefícios.

---

### C12 — BENEFÍCIOS · Constelação
**ID:** `#cena-beneficios` · **Hue:** 230

#### Objetivo
8 benefícios = 8 estrelas conectadas.

#### Visuais
- BG: `NV11-IMG-012` campo estelar violeta
- Loop: `NV11-VID-LOOP-012` filamentos entre estrelas
- Grid 8 cards `BenefitsVisual`
- SVG: `SVG-CONSTELLATION` linhas entre cards no hover

#### Animações
- Batch ScrollTrigger stagger
- Hover: glow + linha SVG draw para vizinhos

#### → C13
Constelação **divide** em dois hemisférios (antes/depois).

---

### C13 — ANTES/DEPOIS · A Linha
**ID:** `#cena-antes-depois` · **Hue:** 190

#### Objetivo
Contraste emocional interativo.

#### Visuais
- BG split: esquerda `NV11-IMG-013a` caos / direita `NV11-IMG-013b` ordem
- Slider `BeforeAfterVisual` (Draggable/Observer)
- MorphSVG: ícone X → ✓ ao cruzar 50%

#### → C14
Lado "depois" expande para cases por vertical.

---

### C14 — CASES · Cinco Mercados
**ID:** `#cena-cases` · **Hue:** 160

#### Objetivo
Prova por vertical.

#### Dados
Saúde +38% · Imóveis 3x · Consultoria −65% · Agências R$128k · E-commerce +27%

#### Visuais
- BG: `NV11-IMG-014` cinco nichos em profundidade
- Loop: `NV11-VID-LOOP-014` métricas pulando por card
- 5 cards com métrica animada

#### → C15
Métricas agregam em números globais.

---

### C15 — SOCIAL PROOF · A Linha Cruzada
**ID:** `#cena-social` · **Hue:** 48

#### Objetivo
Confiança coletiva.

#### Visuais
- BG: `NV11-IMG-015` convergência gold (warm)
- Stats count-up: +2.400 · 12M+ · 23% · 4,9/5
- 3 depoimentos com foto inicial (avatar CSS, não IA faces)

#### → C16
Stats orbitam e formam halo de integrações.

---

### C16 — INTEGRAÇÕES · Órbita
**ID:** `#cena-integracoes` · **Hue:** 205

#### Objetivo
Ecossistema conectado ao CRM central.

#### Visuais
- BG: `NV11-IMG-016` aurora + halo
- Loop: `NV11-VID-LOOP-016` filamentos conectando ícones
- `IntegrationsVisual` órbita dupla
- MotionPath: partícula orbitando CRM

#### → C17
Zoom no portal multi-tenant (agências).

---

### C17 — AGÊNCIA · Portal & Fortaleza
**ID:** `#cena-agencia` · **Hue:** 270

#### Objetivo
B2B2B + segurança (LGPD, criptografia).

#### Visuais
- BG: `NV11-IMG-017` portal threshold violeta
- Loop: `NV11-VID-LOOP-017` tenants acendendo em grid
- `UIAgencyTenants` + trust badges
- SVG: `SVG-SHIELD-LATTICE` hex DrawSVG

#### → C18
Portal abre para sala de planos.

---

### C18 — PLANOS · Escolha seu Portal
**ID:** `#cena-planos` · **Hue:** 250

#### Objetivo
Decisão racional. Starter / Pro / Agency.

#### Visuais
- BG: `NV11-IMG-018` convergência (warm, convite)
- 3 pricing cards + FAQ accordion
- Pro card: glow contínuo + badge "Mais escolhido"

#### → C19
Cards dissolvem em luz → coruja retorna.

---

### C19 — CTA · Convergência Final
**ID:** `#s-cta-eco` · **Pin:** 300vh · **Scrub:** 0.55

#### Objetivo
Clímax emocional + conversão.

#### Copy
| Headline | Seu atendimento já gera oportunidades. Coloque o CRM para vender com IA. |
| CTA 1 | Começar grátis — sem cartão |
| CTA 2 | Falar com especialista |

#### Visuais
- BG: `NV11-IMG-019` convergência + silhueta coruja
- Loop: `NV11-VID-LOOP-019` rivers of gold
- **F2F:** `NV11-F2F-004` escuro → coruja → logo glow
- `ProductCommandCenter` compact + `ProceduralOwlScene`
- `OwlSigil` size lg

#### Animações
- Copy fade PEAK
- Owl opacity 0.35→0.8
- CTA magnetic + ripple
- Shockwave SVG MorphSVG no click (opcional)

---

## 6. Sistema de vídeos

### 6.1 Tipos

| Tipo | Controle | Uso |
|------|----------|-----|
| **F2F Scroll** | ScrollTrigger scrub | C02, C05 (opcional), C11, C19 |
| **Loop seção** | SmartVideo autoplay on visible | Todas as 19 cenas (camada BG) |
| **Loop mockup** | CSS/GSAP timeline | Dentro de componentes React |

### 6.2 F2F — Sequências scroll (prioridade)

#### NV11-F2F-001 — Coruja Olhos (C02) ★
| Campo | Valor |
|-------|-------|
| Duração fonte | 10s Kling |
| Frames | 90 @ 25fps |
| Frame 0 | Olhos fechados, void, névoa violeta mínima |
| Frame 45 | Olhos semi-abertos, iris amber, reflexos dados |
| Frame 89 | Olhos abertos, pupila focada, glow gold — **match C03** |
| Câmera | Push-in lento 5%, sem pan |
| Luz | Rim gold nas pálpebras, key fria superior direita |
| Prompt Kling | `Extreme close-up mechanical owl eyes in absolute darkness, eyelids slowly opening revealing glowing amber iris with digital data reflections, purple neon rim light on chrome brow ridges, volumetric mist, cinematic macro lens, seamless loop start equals end with closed eyes, KORUVISION dark universe gold #FFC233 violet #8B5CF6, no text no logos` |
| Transição out | Tunnel mask expand → névoa vermelha C03 |

#### NV11-F2F-002 — CRM Revelado (C05, pin Demo)
| Campo | Valor |
|-------|-------|
| Frames | 120 |
| Frame 0 | Tela preta, ponto de luz central |
| 0.15 | Botão "Entrar" materializa (luz, não texto IA) |
| 0.35 | Cursor glow passa — painéis começam a surgir |
| 0.55 | KPIs aparecem como hologramas |
| 0.75 | Funil + chat IA visíveis |
| 1.00 | CRM completo operacional — **match UI Demo ato 5** |
| Câmera | Dolly in + slight orbit 8° |
| Prompt | `Dark void, single golden light point grows into holographic CRM dashboard assembling piece by piece, glass panels emerging, pipeline columns lighting up, purple and gold volumetric rays, oblique 28 degree camera, premium SaaS, no readable text on screens, cinematic` |

#### NV11-F2F-003 — Evolução de Dados (C11)
| Frames | 96 |
| Frame 0 | Gráfico quase vazio, poucos pontos |
| 0.5 | Barras crescem, linha sobe |
| 1.0 | Dashboard denso, glow peak — **match UIDashboard PEAK** |
| Prompt | `Holographic analytics evolution, bar chart and line graph growing from sparse to rich, numbers as abstract light points not readable text, violet teal gold on void black, cinematic data visualization atmosphere` |

#### NV11-F2F-004 — CTA Convergência (C19)
| Frames | 80 |
| Frame 0 | Void quase preto |
| 0.5 | Rios gold convergem, silhueta coruja emerge |
| 1.0 | Logo glow (sem texto) — luz estabilizada |
| Prompt | `Streams of liquid gold and violet light converging to center, subtle owl silhouette forming from particles, god rays, dark cinematic climax, seamless hold at end, no text no logo letters` |

### 6.3 Loops por cena (NV11-VID-LOOP-001 a 019)

Regras para todos os loops:
- Duração: 5s ou 10s Kling
- **Frame inicial ≈ frame final** (loop imperceptível)
- Opacity na página: 0.15–0.28 desktop, 0 off mobile se pesado
- Sempre com poster `.webp`
- `SmartVideo` + `preload="none"`

| ID | Cena | Narrativa loop | Prompt resumido |
|----|------|----------------|-----------------|
| LOOP-001 | C01 Hero | Energia percorre rede → CRM | `golden energy pulses through neural network lines in dark void, particles flowing, seamless loop` |
| LOOP-002 | C01 Hero | Coruja respiração | `owl eyes subtle amber glow breathing in darkness, minimal movement, seamless` |
| LOOP-003 | C03 Problema | Caos disperso | `chaotic red-tinted data particles drifting aimlessly in fog, disconnected, seamless` |
| LOOP-004 | C04 Pilares | Energia nos pilares | `four light pillars pulsing upward in dark reflective floor, gold violet, seamless` |
| LOOP-005 | C05 Demo | Interior máquina | `neural corridor ambient light slowly moving, glass reflections, seamless` |
| LOOP-006 | C06 Setup | Portais ativos | `three gateway rings with energy flowing through, teal gold, seamless` |
| LOOP-007 | C07 Agentes | IA processando | `neural nodes pulsing, light traveling paths, brain hub glow, seamless` |
| LOOP-008 | C08 Inbox | Mensagens fluindo | `abstract message streams flowing left to right, teal accents, seamless` |
| LOOP-009 | C09 Funil | Leads descendo | `glowing orbs moving down funnel stages, gold gravity, seamless` |
| LOOP-010 | C10 Auto | Sinapses | `synaptic energy bursts traveling along filaments, purple gold, seamless` |
| LOOP-011 | C11 Analytics | Gráficos vivos | `holographic bars gently oscillating, line chart breathing, seamless` |
| LOOP-012 | C12 Benefícios | Constelação | `star nodes connected by faint pulsing lines, slow drift, seamless` |
| LOOP-013 | C13 Antes/Depois | Split energia | `left red chaos mist vs right teal order mist separated by light line, subtle, seamless` |
| LOOP-014 | C14 Cases | Métricas pulsam | `five vertical light columns with rhythmic pulse, seamless` |
| LOOP-015 | C15 Social | Convergência warm | `warm gold particles gathering toward center, seamless` |
| LOOP-016 | C16 Integrações | Órbita filamentos | `central core emitting filaments to orbiting points, seamless` |
| LOOP-017 | C17 Agência | Tenants grid | `grid of portals lighting up sequentially in loop, seamless` |
| LOOP-018 | C18 Planos | Anéis decisão | `concentric rings expanding and contracting softly, seamless` |
| LOOP-019 | C19 CTA | Clímax gold | `gold rivers flowing toward bright center, owl particle hint, seamless` |

### 6.4 Pipeline de produção vídeo
```
1. Kling 2.5 → MP4 (5s/10s, loop-safe)
2. ffmpeg poster → posters/NV11-VID-LOOP-XXX.webp
3. (F2F only) ffmpeg extract → f2f/NV11-F2F-XXX/frame_NNNN.webp
4. SmartVideo / FrameScrubber em React
```

---

## 7. Sistema de imagens

### Regra
- **1 BG exclusivo por cena** (NV11-IMG-001 a 019)
- Formato: WebP 1600px largura, q72–80
- Nunca texto legível; lado esquerdo mais escuro nas cenas com copy à esquerda

### Catálogo

| ID | Cena | Descrição | Hue |
|----|------|-----------|-----|
| IMG-001 | C01 | Aurora diagonal gold+violet, particles | 265 |
| IMG-002 | C02 | First frame F2F owl (poster) | 265 |
| IMG-003 | C03 | Névoa vermelha fragmentos | 8 |
| IMG-004 | C04 | Quatro pilares de luz | 200 |
| IMG-005 | C05 | Interior corredor neural | 220 |
| IMG-006 | C06 | Três portais profundidade | 175 |
| IMG-007 | C07 | Neural field 3D | 265 |
| IMG-008 | C08 | Sala comando teal | 150 |
| IMG-009 | C09 | Funil gravitacional gold | 42 |
| IMG-010 | C10 | Filamentos sinápticos | 210 |
| IMG-011 | C11 | Holografia charts | 285 |
| IMG-012 | C12 | Campo estelar | 230 |
| IMG-013a/b | C13 | Split caos/ordem | 190 |
| IMG-014 | C14 | Cinco nichos | 160 |
| IMG-015 | C15 | Cluster luminoso warm | 48 |
| IMG-016 | C16 | Halo integrações | 205 |
| IMG-017 | C17 | Portal agência | 270 |
| IMG-018 | C18 | Convergência convite | 250 |
| IMG-019 | C19 | Clímax coruja+gold | 250 |

Prompts completos: espelhar estrutura em `assets/prompts/v11/image-prompts.md` (a criar na aprovação).

---

## 8. Sistema de SVGs e gráficos

Todos implementados como **inline React** (nitidez + animação GSAP). IDs lógicos:

| ID | Cena | Elemento | Animação |
|----|------|----------|----------|
| SVG-HERO-SPINE | C01 | Linhas → CRM | DrawSVG scrub |
| SVG-CHAOS-NET | C03 | Rede quebrada | Draw + flicker |
| SVG-FOUR-PILLARS | C04 | 4 pilares + hub | DrawSVG + pulse |
| SVG-DEMO-RING | C05 | Progress ring | strokeDashoffset scrub |
| SVG-SETUP-SPINE | C06 | Linha vertical | DrawSVG scroll |
| SVG-FUNNEL-PATH | C09 | Trajetória deal | MotionPath |
| SVG-AUTO-WIRE | C10 | Filamento + 3 pulsos | MotionPath loop |
| SVG-CONSTELLATION | C12 | Linhas entre cards | Draw on hover |
| SVG-MORPH-XCHECK | C13 | X → ✓ | MorphSVG drag |
| SVG-ORBIT-RINGS | C16 | Anéis tracejados | rotate ambient |
| SVG-SHIELD-LATTICE | C17 | Hexágono segurança | DrawSVG |
| SVG-CTA-SHOCK | C19 | Onda convergência | MorphSVG click |

Partículas: `GlobalJourneyLayer` + `LivingEcosystem` + canvas por cena (`NeuralFlowCanvas`).

---

## 9. Mockups vivos (React, não IA)

### Componentes base
`ProductCommandCenter` · `GoldenUI/*` · `DeviceShell` · `Product3DFeatureCards`

### Regras mockup vivo
| Comportamento | GSAP / CSS | Cenas |
|---------------|------------|-------|
| KPI count-up | `gsap.to({ val })` + snap | C01, C05, C11, C15 |
| Cards slide-in | stagger BUILD | C05, C09 |
| Chat typing | SplitText chars | C07, C08 |
| Barras oscillate | sine yoyo infinite | C11 |
| Pipeline snap | Flip + magnetic column | C09 |
| Workflow nodes | sequential class toggle | C10 |
| Inbox new row | timeline repeat | C08 |

### Dados fixos PT-BR (consistência narrativa)
- Lead protagonista: **Maria S.** · R$ 2.400 · WhatsApp
- Pipeline agregado: **R$ 152.000** / **R$ 47.800** (contexto)
- Score IA: **87%**
- Conversão: **23%**

---

## 10. Sistema de animações GSAP

### Global
| Sistema | Implementação |
|---------|---------------|
| Scroll suave | Lenis + ScrollTrigger proxy |
| Progresso jornada | `--journey-p` · `--hero-p` |
| Ambient vivo | `AmbientTicker` + MutationObserver |
| Cursor | `GlobalCursor` desktop |
| Reduced motion | `prefers-reduced-motion` → static PEAK |

### Por tipo de elemento

#### Textos
| Técnica | Cenas |
|---------|-------|
| SplitText lines + mask | Todas (headlines) |
| SplitText chars | C07 chat, C01 hero words |
| Blur reveal | C03, C13 |
| Word stagger | C01 pin, C05 atos |
| Scroll scrub opacity | C02, C05, C19 pin |

#### Cards
| Técnica | Cenas |
|---------|-------|
| Hover 3D tilt | `InteractiveSurface` — todas com cards |
| Glow `--surface-mx/my` | Mockups |
| Flip state | C03→C04, C05 atos |
| Magnetic | Pricing C18 |

#### Botões
| Técnica | Onde |
|---------|------|
| Magnetic translate | Todos CTAs |
| Ripple on click | `MagneticButton` |
| Dynamic radial bg | `--btn-mx/my` |

#### Backgrounds
| Técnica | Onde |
|---------|------|
| Parallax y/x | Todas cenas com BG |
| Velocity reactive | `--scroll-velocity` particles |
| Video opacity scrub | Pin scenes |
| Layer depth z translate | F2F + mockup stack |

### Matriz plugin × cena (resumo)

| Cena | Pin | SplitText | F2F | MotionPath | DrawSVG | Flip | Loop vídeo |
|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| C01 | ● | ● | — | ○ | ○ | — | ● |
| C02 | ● | ○ | ● | — | — | — | ● |
| C03 | ○ | ● | — | — | ● | ○ | ● |
| C04 | ○ | ● | — | — | ● | ● | ● |
| C05 | ● | ○ | ○ | ● | ● | ● | ● |
| C06 | ○ | ● | — | — | ● | — | ● |
| C07 | ○ | ● | — | ○ | ○ | — | ● |
| C08 | ○ | ● | — | ○ | — | — | ● |
| C09 | ○ | ● | — | ● | ○ | ○ | ● |
| C10 | ○ | ● | — | ● | ● | — | ● |
| C11 | ○ | ● | ○ | — | ○ | — | ● |
| C12 | ○ | ● | — | — | ● | — | ● |
| C13 | ○ | ● | — | — | ○ | ● | ● |
| C14 | ○ | ○ | — | — | — | — | ● |
| C15 | ○ | ○ | — | — | — | — | ● |
| C16 | ○ | ● | — | ● | ● | — | ● |
| C17 | ○ | ● | — | — | ● | — | ● |
| C18 | ○ | ● | — | — | — | ○ | ● |
| C19 | ● | ● | ● | — | ○ | — | ● |

---

## 11. Transições entre cenas

| De → Para | Mecanismo visual | Continuidade |
|-----------|------------------|--------------|
| C01→C02 | Handoff glow + cor match olhos | Luz gold → olhos |
| C02→C03 | Tunnel expand + hue shift 265→8 | Olhar → névoa vermelha |
| C03→C04 | Compressão caos → 4 feixes | Vermelho → azul |
| C04→C05 | Zoom pilar central → interior | Pilares → máquina |
| C05→C06 | Dashboard CTA glow → portal | Botão → portal |
| C06→C07 | Portal abre violeta | Teal → neural |
| C07→C08 | Node WhatsApp → inbox | Neural → operação |
| C08→C09 | Deal MotionPath → funil | Card → kanban |
| C09→C10 | Fechamento → pulso rede | Gold → filamentos |
| C10→C11 | Nodes → dashboard | Fluxo → métricas |
| C11→C12 | Zoom out → estrelas | Dados → benefícios |
| C12→C13 | Split constelação | Uma → duas metades |
| C13→C14 | Expansão lado "depois" | Ordem → verticals |
| C14→C15 | Agregação métricas | Cards → stats |
| C15→C16 | Órbita stats | Números → ícones |
| C16→C17 | Zoom core → portal | Órbita → multi-tenant |
| C17→C18 | Portal → sala planos | Segurança → decisão |
| C18→C19 | Cards → convergência | Planos → coruja final |

**Elemento contínuo em todas:** `GlobalJourneyLayer` spine + `section-morph-bridge` gradient morph.

---

## 12. Som opcional

| Evento | Som | Notas |
|--------|-----|-------|
| C01 BUILD | Sub-bass swell 80Hz | Muito baixo |
| C02 PEAK | Cristal sintético 2s | Opcional |
| C05 ato change | Tick suave | UI feedback |
| C13 drag | Whoosh filtrado | Só desktop |
| C19 CTA hover | Harmonic shimmer | Micro |

Implementação: Howler.js lazy, muted por default, toggle acessível.

---

## 13. Performance e legibilidade

### Orçamento
| Métrica | Meta |
|---------|------|
| Lighthouse Performance | 90+ |
| Accessibility | 95+ |
| LCP | < 2.5s |
| CLS | < 0.1 |

### Estratégia
- Hero + C02: eager; demais `DeferredMount` + `SmartVideo`
- F2F: lazy load frames, max 1 seq na memória
- Mobile: desliga LivingEcosystem, reduz partículas, vídeos BG off
- `prefers-reduced-motion`: PEAK estático, sem F2F scrub
- Mockups: `content-visibility`, GPU `translate3d`

### Legibilidade
- Scrim mínimo 0.45 sobre qualquer mídia atrás de texto
- Contraste AA em todos os textos
- UI mockups: sempre React com tokens `--read-*`

---

## 14. Catálogo de assets (IDs)

### Contagem total planejada
| Tipo | Qtd | Specs |
|------|-----|-------|
| Imagens BG | 20 (incl. split C13) | [image-prompts.md](../assets/prompts/v11/image-prompts.md) |
| PNG transparentes 3D | 3 | image-prompts § PNG |
| Vídeos loop | 19 | [video-prompts.md](../assets/prompts/v11/video-prompts.md) |
| Sequências F2F | 5 (C01, C02, C05, C11, C19) | video-prompts § F2F |
| SVGs animados | 18 | [svg-specs.md](../assets/prompts/v11/svg-specs.md) |
| Componentes 3D | 13 | [3d-interactive-specs.md](../assets/prompts/v11/3d-interactive-specs.md) |
| Mockups React | 15 componentes | §9 deste documento |
| Posters vídeo | 24 | video-prompts § ffmpeg |
| Timelines GSAP | 19 | [animation-specs.md](../assets/prompts/v11/animation-specs.md) |

### Naming convention
`NV11-{TYPE}-{NNN}-{slug}.{ext}`  
Types: `IMG` · `VID-LOOP` · `F2F` · `POSTER`

---

## 15. Gate de produção

### Checklist antes de gerar qualquer asset

- [ ] Documento mestre v2.0 aprovado pelo stakeholder
- [ ] [Matriz de Protagonistas](KORUVISION-Protagonists-Matrix.md) aprovada
- [ ] [Cadeia Narrativa](KORUVISION-Narrative-Continuity-Chain.md) validada (18 handoffs)
- [ ] [image-prompts.md](../assets/prompts/v11/image-prompts.md) — 22 prompts revisados
- [ ] [video-prompts.md](../assets/prompts/v11/video-prompts.md) — 5 F2F + 19 loops revisados
- [ ] [svg-specs.md](../assets/prompts/v11/svg-specs.md) + [animation-specs.md](../assets/prompts/v11/animation-specs.md) + [3d-interactive-specs.md](../assets/prompts/v11/3d-interactive-specs.md) aprovados
- [ ] Paleta e sufixo FLUX confirmados
- [ ] Copy final revisada
- [ ] Orçamento Replicate/Kling estimado (~24 vídeos Kling)
- [ ] Prioridade de produção definida (ver abaixo)

### Ordem de produção recomendada (após aprovação)

**Fase A — Referência e continuidade**
1. NV11-F2F-000 (Hero Núcleo → CRM) + NV11-F2F-001 (Coruja — base NV9)
2. NV11-IMG-001, 002, 003 + PNG-001, 002 (core orb, iris)
3. NV11-VID-LOOP-001, 002, 003
4. Implementar `KoruVisionCore.tsx` (Hero 3D)

**Fase B — Demonstração produto**
4. NV11-F2F-002 (CRM revelado)
5. NV11-IMG-004–011 + LOOP-004–011
6. Implementar `SceneCinemaLayer` no código

**Fase C — Prova e conversão**
7. NV11-IMG-012–019 + LOOP-012–019
8. NV11-F2F-003, 004
9. Passe final motion + performance

### O que NÃO fazer antes da aprovação
- Gerar imagens FLUX em massa
- Renderizar vídeos Kling
- Extrair frames F2F
- Substituir mockups React por imagens IA com texto

---

## Apêndice A — Referência código atual

| Artefato | Path |
|----------|------|
| GSAP register | `lib/gsap/register.ts` |
| Motion phases | `lib/motion-system.ts` |
| Lenis scrub | `lib/lenis-scroll.ts` |
| Copy cenas | `config/landing-v10.ts` |
| Coruja ★ | `sections/SectionVisionBridge.tsx` |
| Hero pin | `sections/SectionHero.tsx` |
| Demo 5 atos | `sections/SectionDemo.tsx` |
| Home 19 cenas | `app/page.tsx` |

## Apêndice B — Documentos relacionados

### Pacote v2.0 (produção)
- [KORUVISION-Protagonists-Matrix.md](KORUVISION-Protagonists-Matrix.md) — protagonista por cena
- [KORUVISION-Scene-Deep-Specs.md](KORUVISION-Scene-Deep-Specs.md) — **spec profunda 19 cenas**
- [KORUVISION-Narrative-Continuity-Chain.md](KORUVISION-Narrative-Continuity-Chain.md) — continuidade frame-a-frame
- [assets/prompts/v11/](../assets/prompts/v11/) — prompts e specs completos

### Referência visual e motion
- `docs/KORUVISION-Visual-Bible-v5.md` — paleta e FLUX prefix
- `docs/KORUVISION-Motion-System.md` — BUILD/PEAK/EXIT
- `docs/KORUVISION-F2F-GSAP-Integration.md` — pipeline frames
- `docs/KORUVISION-GSAP-Technology-Map.md` — matriz plugins v5

---

**Próximo passo:** Revisar pacote v2.0 completo. Após **APROVADO**, iniciar Fase A (Hero 3D + Coruja F2F + backgrounds) e `SceneCinemaLayer` conforme [animation-specs.md](../assets/prompts/v11/animation-specs.md).
