# FlowIA — Script Visual v6 · Product Canvas

> **Direção:** SaaS premium de mockups · CRM + IA WhatsApp  
> **Substitui:** Névoa Neural v5 (espaço sideral, corredores neurais, utopia abstrata)  
> **Referências:** Linear · Stripe · Framer · Vercel — produto em primeiro plano, fundo em segundo  
> **Regra de ouro:** Se o visual compete com o headline, o visual está errado.

---

## 1. Princípios criativos

| Princípio | O que significa na prática |
|-----------|---------------------------|
| **Produto primeiro** | UI real (React/GoldenUI) é o herói; imagem/vídeo só cria contexto e profundidade |
| **Fundo subserviente** | Opacidade máxima 18–25% no site; blur + vignette escura para legibilidade |
| **Narrativa de conversão** | Cada seção responde: *qual dor? qual alívio? qual prova? qual ação?* |
| **Mockup > metáfora** | Dashboard, inbox, kanban, WhatsApp, workflow — nunca corredor espacial |
| **Scroll com começo/meio/fim** | Frame inicial, pico de leitura, frame de saída por seção pinned |
| **Transições por função** | Bridge zones entre pins; cor/temperatura muda com o arco emocional |

### Paleta v6 (alinhada ao plano FlowIA)

```
Fundo:     #03060F (void) · #080D1A (surface)
Acento:    #3B82F6 (CTA) · #8B5CF6 (IA) · #10B981 (sucesso)
Alerta:    #EF4444 (caos S02) · âmbar #F59E0B (humano)
Texto:     #F0F4FF / #8B9EC4
```

### O que **não** gerar mais

- Observatórios, névoas cósmicas, corredores neurais infinitos  
- Rios de dados líquidos, plataformas flutuantes no vazio  
- Fibers neurais macro, túneis de luz utópicos  
- Qualquer cena que pareça wallpaper de sci-fi sem produto  

---

## 2. Arco narrativo (3 atos · 19 seções)

```
ATO I — RECONHECIMENTO (S01–S03)
  Hero: promessa + mockup WhatsApp
  Problema: caos operacional visual (notificações, planilhas)
  Bridge: ordem emerge — cor fria → quente

ATO II — REVELAÇÃO (S04–S09)
  Demo: jornada do lead em 5 telas (React)
  Setup → Agentes → Inbox → Funil → Automações
  Cada bloco = 1 capability do produto

ATO III — PROVA + DECISÃO (S10–S19)
  Benefícios → Antes/Depois → Cases → Social → Integrações
  Agência → Segurança → Planos → FAQ → CTA convergente
```

---

## 3. Roteiro por seção (frames · função · transição)

Legenda: **FI** = frame inicial (scroll 0%) · **PK** = pico de leitura (~48–72%) · **FO** = frame final (scroll 100%)  
**Camadas:** `IMG` fundo · `VID` loop sutil · `F2F` scrub (só onde agrega) · `UI` componente React

---

### S01 — Hero · Promessa + produto

| | |
|---|---|
| **Função** | Vender em 5s: CRM WhatsApp com IA. Mockup do chat é o foco. |
| **FI** | Gradiente escuro limpo; mockup device entra à direita |
| **PK** | Headline legível; chip “+1 lead qualificado” visível |
| **FO** | Leve push-in no device; fundo escurece para handoff S02 |
| **IMG** | `hero-studio-gradient-left.webp` — 40% frame vazio à esquerda |
| **VID** | `nv6-vid-001.mp4` — partículas UI sutis, não cena espacial |
| **F2F** | **OFF** — device React + scroll words bastam |
| **→ S02** | Bridge 60vh: vinheta vermelha entra pelo canto inferior |

---

### S02 — Problema · Caos operacional

| | |
|---|---|
| **Função** | Espelhar dor: WhatsApp solto, planilha, bot genérico, pipeline vazio |
| **FI** | Tom frio + vermelho difuso; cards de dor entram em stagger |
| **PK** | Stat “78% perdem leads” legível |
| **FO** | Caos visual atenua; luz neutra prepara S03 |
| **IMG** | `problem-scattered-notifications-blur.webp` — ícones/chat borrados |
| **VID** | `nv6-vid-002.mp4` — notificações empilhando (blur, sem texto legível) |
| **F2F** | **OFF** |
| **→ S03** | Bridge 80vh: split caos→ordem horizontal |

---

### S03 — Bridge · Do caos ao controle

| | |
|---|---|
| **Função** | Alívio emocional; 4 pilares = 4 substituições de dor |
| **FI** | Metade esquerda caótica, direita limpa (imagem split) |
| **PK** | Pilares glass totalmente legíveis |
| **FO** | Cena unificada em azul-violeta calmo |
| **IMG** | `bridge-split-chaos-order.webp` |
| **VID** | `nv6-vid-003.mp4` — transição suave caos→grid ordenado |
| **F2F** | **OFF** |
| **→ S04** | Bridge 100vh: zoom out para “sala de demo” |

---

### S04 — Demo · Cinco atos do produto

| | |
|---|---|
| **Função** | Provar o fluxo: WhatsApp → IA → Kanban → Agenda → Dashboard |
| **FI** | Palco escuro tipo estúdio; narrativa à esquerda |
| **PK** | Cada ato: 1 tela GoldenUI em destaque (62% largura) |
| **FO** | Dashboard + CTA “Começar grátis” |
| **IMG** | `demo-studio-backdrop-soft.webp` — spotlight no centro-direita |
| **VID** | `nv6-vid-004.mp4` — pan lento em mockup dashboard borrado |
| **F2F** | **Opcional baixa opacidade** — só se vídeo mostrar micro-movimento UI |
| **UI** | DeviceShell + 5 telas React (fonte da verdade) |

---

### S05 — Setup · Onboarding em 3 passos

| | |
|---|---|
| **Função** | Reduzir medo de implementação: 5 minutos, 3 portais |
| **FI** | Portal 1 destacado (WhatsApp QR) |
| **PK** | Três portais alinhados |
| **FO** | QR + check verde suave |
| **IMG** | `setup-welcome-gradient.webp` |
| **VID** | `nv6-vid-005.mp4` — progress bar / steps animados (blur) |
| **F2F** | **OFF** |

---

### S06 — Agentes · Personalidade IA

| | |
|---|---|
| **Função** | Humanizar IA; scroll horizontal nas 5 personalidades |
| **FI** | Card “Consultivo” em foco |
| **PK** | Toggle Bot/Humano + resposta natural |
| **FO** | Trilho horizontal completo |
| **IMG** | `agents-tone-palette-abstract.webp` — faixas de cor, sem rostos |
| **VID/F2F** | **OFF** — cards React carregam a cena |

---

### S07 — Inbox · Sala de comando

| | |
|---|---|
| **Função** | Inbox unificado; prova de controle |
| **FI** | UIInboxThreeCol entra |
| **PK** | Coluna central com thread ativa |
| **FO** | Tag “Handoff IA → Humano” |
| **IMG** | `inbox-soft-blue-glow.webp` — glow atrás do device |
| **VID/F2F** | **OFF** |

---

### S08 — Funil · Gravidade do deal

| | |
|---|---|
| **Função** | Maria atravessa colunas; valor sobe |
| **FI** | Card na coluna Lead |
| **PK** | Card voa para Fechado; counter R$ 2.400 |
| **FO** | Kanban estável |
| **IMG** | `funnel-pipeline-glow.webp` |
| **VID** | `nv6-vid-006.mp4` — card deslizando entre colunas (mockup blur) |
| **F2F** | **OFF** |

---

### S09 — Automações · Sistema nervoso

| | |
|---|---|
| **Função** | Workflow visual; energia percorre nós |
| **FI** | Canvas escuro; primeiro nó aceso |
| **PK** | Todos os nós iluminados; path SVG completo |
| **FO** | Loop suave no nó “Fechado” |
| **IMG** | `automation-node-grid-bg.webp` |
| **VID** | `nv6-vid-007.mp4` — pulso de luz entre nós (minimal) |
| **F2F** | **OFF** |

---

### S10 — Benefícios · Constelação (flow, sem pin)

| | |
|---|---|
| **Função** | 12 benefícios escaneáveis; modo agência |
| **IMG** | `benefits-dark-grid-ambient.webp` — grid sutil, 12% opacidade |
| **VID/F2F** | **OFF** |

---

### S11 — Antes/Depois · Slider

| | |
|---|---|
| **Função** | Comparar caos vs controle (interativo) |
| **FI** | Slider 30% caos |
| **PK** | Usuário arrasta; copy legível |
| **FO** | 70%+ lado “controle” |
| **IMG** | `before-messy-desk-blur.webp` / `after-clean-dashboard-blur.webp` |
| **VID** | `nv6-vid-008.mp4` — wipe caos→ordem |
| **F2F** | **OFF** |

---

### S12 — Cases · Cinco verticais

| | |
|---|---|
| **Função** | Prova por nicho; scroll horizontal |
| **IMG** | Uma por vertical: saúde, imóveis, consultoria, agência, e-commerce — sempre **contexto de uso** (clínica, escritório) desfocado |
| **VID** | `nv6-vid-009.mp4` — montagem rápida 5 contextos |
| **F2F** | **OFF** |

---

### S13 — Social proof (flow)

| | |
|---|---|
| **Função** | Números + logos marquee |
| **IMG** | `social-team-success-soft.webp` — equipe em escritório, shallow DOF, rostos não identificáveis |
| **VID** | **OFF** |

---

### S14 — Integrações · Órbita

| | |
|---|---|
| **Função** | Logos orbitam FlowIA — conectividade |
| **IMG** | `integrations-hub-glow.webp` |
| **VID** | `nv6-vid-010.mp4` — ícones conectando com linhas finas |
| **F2F** | **OFF** |

---

### S15 — Agência · Multi-tenant

| | |
|---|---|
| **Função** | Portal white-label; MRR |
| **IMG** | `agency-portal-threshold-clean.webp` |
| **VID** | `nv6-vid-011.mp4` — tiles de clientes acendendo |
| **F2F** | **OFF** |

---

### S16 — Segurança (flow)

| | |
|---|---|
| **Função** | LGPD, criptografia — confiança |
| **IMG** | `security-shield-minimal.webp` |
| **VID/F2F** | **OFF** — SVG shield + badges |

---

### S17 — Planos (flow)

| | |
|---|---|
| **Função** | Escolha de tier; CTA |
| **IMG** | `pricing-tier-glow.webp` — 15% opacidade |
| **VID/F2F** | **OFF** |

---

### S18 — FAQ (flow)

| | |
|---|---|
| **Função** | Reduzir objeções; pausa antes do CTA |
| **IMG** | `faq-calm-gradient.webp` |
| **VID/F2F** | **OFF** |

---

### S19 — CTA final · Convergência

| | |
|---|---|
| **Função** | Fechar: trial 14 dias |
| **FI** | Headline palavra-a-palavra |
| **PK** | Dois CTAs visíveis |
| **FO** | Glow dourado suave no botão primário |
| **IMG** | `cta-conversion-spotlight.webp` |
| **VID** | `nv6-vid-012.mp4` — loop ambiente mínimo (gradient shift) |
| **F2F** | **OFF** |

---

## 4. Mapa de transições (bridge zones)

| De → Para | Tipo | Duração | Comportamento |
|-----------|------|---------|---------------|
| S01 → S02 | Cor | 60vh | Violeta → vermelho difuso; hero device fade out |
| S02 → S03 | Split | 80vh | Caos esquerda dissolve; ordem direita |
| S03 → S04 | Zoom | 100vh | Estúdio demo; pins S03 solta antes S04 pin |
| S04 → S05 | Fade | 40vh | Palco escurece |
| S09 → S10 | Unpin | — | S10 `section-flow` sem competição |
| S18 → S19 | Rise | 60vh | FAQ sobe; CTA pin com spotlight |

**CSS:** cada `.pin-wrap` recebe `isolation: isolate` e `z-index` incremental. Conteúdo `.section-inner` sempre `z-index: 10+`.

---

## 5. Diretriz de geração (FLUX + Kling)

### Prefixo global v6 (obrigatório)

```
Premium SaaS product marketing, dark void #03060F, subtle blue #3B82F6 and violet #8B5CF6 ambient light, frosted glass, shallow depth of field, Stripe Linear Framer commercial style. Generous negative space for text overlay on left or center. Product UI context when specified — always blurred or partial, never readable text. No cosmos, no space, no stars, no nebula, no neural corridors, no sci-fi halls, no liquid data rivers. No logos, no watermarks, no brand names.
```

### Vídeos Kling — só 12 essenciais (v6)

Redução de 15 → 12: remover loops ambígenos; cada vídeo ≤5s, movimento lento, sujeito único.

| ID | Seção | Assunto do vídeo |
|----|-------|------------------|
| VID-001 | S01 | Gradiente + partículas UI flutuantes |
| VID-002 | S02 | Notificações empilhando (blur) |
| VID-003 | S03 | Wipe caos → grid ordenado |
| VID-004 | S04 | Pan dashboard mockup |
| VID-005 | S05 | Steps onboarding progress |
| VID-006 | S08 | Card kanban deslizando |
| VID-007 | S09 | Pulso entre nós workflow |
| VID-008 | S11 | Slider wipe antes/depois |
| VID-009 | S12 | Montagem 5 contextos verticais |
| VID-010 | S14 | Linhas conectando integrações |
| VID-011 | S15 | Tiles multi-tenant |
| VID-012 | S19 | Loop gradient CTA |

### F2F — política v6

**Desativado por padrão** no site (`NEXT_PUBLIC_ENABLE_F2F=false` recomendado até regerar).  
Se reativar: apenas S04 com sequência curta (≤60 frames) extraída de VID-004.

---

## 6. Hierarquia no site (implementação)

```
z-index stack por pin-section:
  0  — section-bg (IMG ≤20% opacity)
  1  — video-layer (≤12% opacity)
  2  — content-veil (gradiente escurecedor)
  10 — section-inner (copy + UI)
  20 — device / mockup React
  200 — nav fixa
```

**Data River global:** opacidade 0.12 ou desligado em seções de produto.

---

## 7. Próximos passos de produção

1. Gerar assets v6: `python scripts/nv6_pipeline.py --all` (após configurar token)
2. Atualizar `.env`: `NEXT_PUBLIC_ASSET_BASE=/assets/nv6`
3. Sincronizar `config/sections.ts` com filenames v6
4. Validar legibilidade em mobile (900px) em cada seção pinned
5. A/B: F2F off vs S04-only

---

## 8. Arquivos de prompt v6

| Arquivo | Conteúdo |
|---------|----------|
| `assets/prompts/v6/flux-images.md` | 48 imagens Product Canvas |
| `assets/prompts/v6/kling-videos.md` | 12 vídeos |
| `assets/prompts/v6/kling-keyframes.md` | Pares in/out por vídeo |
| `assets/prompts/v6/README.md` | Guia de execução |

*Script visual v6 · FlowIA · Junho 2026*
