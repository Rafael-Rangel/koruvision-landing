# KORUVISION — Matriz de Protagonistas Visuais (19 Cenas)

> **Superseded:** A landing ativa segue **Landing Strategy V3** — ver [`LANDING-STRATEGY-V3.md`](LANDING-STRATEGY-V3.md) e [`config/landing-strategy.ts`](../config/landing-strategy.ts). Este documento permanece como referência histórica das 19 cenas.

> **Versão:** 2.1 · Complemento do [Documento Mestre](KORUVISION-Experience-Master-Document.md)  
> **Specs profundas (todas as 19 cenas no nível Hero):** [KORUVISION-Scene-Deep-Specs.md](KORUVISION-Scene-Deep-Specs.md)  
> **Regra:** Nenhuma seção depende apenas de imagem estática. Cada cena tem **um protagonista** claramente definido.  
> **Distribuição alvo:** 74% 3D interativo · 21% F2F scroll · 5% loop como protagonista (demais cenas usam loop apenas como **camada ambiente**, opacity ≤0.22)

---

## Legenda de tipos

| Tipo | Código | Descrição |
|------|--------|-----------|
| 3D Interativo | `3D` | Objeto/composição com profundidade real; responde a mouse, hover e/ou scroll |
| Frame-by-Frame | `F2F` | Vídeo convertido em sequência; scroll controla evolução da cena |
| Loop contínuo | `LOOP` | Vídeo curto em loop perfeito; protagonista ou ambiente |
| Híbrido | `HYB` | Protagonista composto (ex: F2F + 3D, 3D + SVG + loop ambiente) |
| Mockup vivo | `LIVE` | Componente React animado como protagonista (texto legível) |

---

## Matriz completa

| # | ID DOM | Cena | Protagonista | Tipo | Impacto em 3s | Mouse | Scroll |
|---|--------|------|--------------|------|---------------|-------|--------|
| 01 | `#s01` | **Hero — Despertar** | **Núcleo KoruVision** (orbe IA + anéis owl + filamentos) | `HYB` 3D+F2F | Orbe pulsa; olhos owl no core; energia irradia | Rotação 3D, tilt, luz dinâmica, partículas seguem cursor | Pin 360vh: orbe abre → CRM emerge do core |
| 02 | `#s02-vision` | **Coruja — Visão** ★ | **Olhos mecânicos abrindo** | `F2F` | Pupila amber acende | Parallax sutil owl layer | Scrub 90 frames: fechado → aberto → foco |
| 03 | `#cena-problema` | **Problema — Caos** | **Campo de Fragmentos Caóticos** | `3D` | Shards vermelhos flutuam desconectados | Cursor repele fragmentos; shake on hover | Scroll: fragmentos convergem ao centro (pré-pilares) |
| 04 | `#cena-pilares` | **Pilares — Virada** | **Monólito Quatro Pilares** | `3D` | 4 colunas de luz erguem-se do chão | Tilt hub central; pilares reagem ao mouse | Scroll: pilares acendem em sequência |
| 05 | `#s04` | **Demo — Máquina** | **Despertar do CRM** (sequência) + Device Stack | `HYB` F2F+3D | Ponto de luz → painéis holográficos | Explorer mode no PEAK (Observer) | F2F 120f + 5 atos camera rig |
| 06 | `#cena-setup` | **Setup — Portais** | **Três Portais de Conexão** | `3D` | Anéis de portal em profundidade Z | Portais inclinam para cursor | Scroll DrawSVG: energia sobe spine |
| 07 | `#cena-agentes` | **Agentes IA** | **Cérebro Neural Comando** | `3D` | Hub violeta pulsa; synapses ativas | Partículas atraídas ao cursor; nodes hover | Scroll: nodes acendem em ordem qualificação |
| 08 | `#cena-inbox` | **Inbox** | **Deck de Comando Omnichannel** | `3D` + `LIVE` | Device 3D com 3 colunas vivas | Tilt device; hover rows | Mensagens entram em stagger contínuo |
| 09 | `#cena-funil` | **Funil** | **Vórtice Pipeline Magnético** | `3D` | Deal "Maria" orbita funil 3D | Snap magnético entre estágios on drag | MotionPath deal no scroll |
| 10 | `#cena-automacoes` | **Automações** | **Motor Sináptico de Fluxo** | `3D` | Energia percorre filamentos entre nodes | Hover node expande + pulso downstream | Scroll: fluxo completa ciclo Lead→Venda |
| 11 | `#cena-analytics` | **Analytics** | **Evolução de Dados** (sequência) | `F2F` + `LIVE` | Gráficos quase vazios → densos | Hover KPIs no PEAK | F2F 96f charts grow + count-up KPIs |
| 12 | `#cena-beneficios` | **Benefícios** | **Constelação de Ganhos** | `3D` | 8 estrelas em espaço 3D | Hover: linhas SVG draw entre estrelas | Stagger entrance batch |
| 13 | `#cena-antes-depois` | **Antes/Depois** | **Divisor de Dois Universos** | `3D` | Metade caos / metade ordem | Draggable divider; MorphSVG X→✓ | Scroll não pin; drag é interação |
| 14 | `#cena-cases` | **Cases** | **Galeria Totem Vertical** | `3D` | 5 totens mercado em profundidade | Parallax cards; hover métrica pulse | Horizontal subtle parallax on scroll |
| 15 | `#cena-social` | **Social Proof** | **Mural de Confiança Vivo** | `LOOP` + `LIVE` | Números count-up; partículas warm | Hover depoimentos tilt 3D | Stats animam on enter |
| 16 | `#cena-integracoes` | **Integrações** | **Nexus Orbital CRM** | `3D` | Core CRM emite filamentos | Órbita responde velocidade scroll; drag ring | Icons orbitam em 2 anéis |
| 17 | `#cena-agencia` | **Agência** | **Portal Multi-Tenant** | `3D` | Portal abre para grid clientes | Hover tenant card depth | Scroll: MRR count-up |
| 18 | `#cena-planos` | **Planos** | **Monólitos de Pricing** | `3D` | 3 blocos flutuam; Pro em destaque | Magnetic cards; glow Pro | Flip highlight on scroll enter |
| 19 | `#s-cta-eco` | **CTA Final** | **Convergência + CRM Compacto** | `HYB` F2F+3D | Rios gold convergem; coruja surge | CTA magnetic; owl pulse | F2F 80f + pin 300vh |

**Contagem:** 3D/HYB-3D = 14 · F2F/HYB-F2F = 4 · LOOP protagonista = 1 (C15 ambiente+live)

> **Detalhamento completo por cena** (conceito, camadas, mouse, scroll, GSAP, assets, handoffs, mobile, performance): ver [Scene Deep Specs](KORUVISION-Scene-Deep-Specs.md).

---

## Especificação Hero — Núcleo KoruVision (C01) — resumo

> Spec completa: [C01 no Deep Specs](KORUVISION-Scene-Deep-Specs.md#c01--hero--despertar)

### Conceito
Orbe de inteligência que **contém** a identidade coruja sem ser apenas uma foto. Camadas:
1. **Core** — esfera amber/violet com noise procedural
2. **Iris ring** — anel metálico chrome estilo olho mecânico
3. **Filamentos** — 12–16 linhas de dados saindo do core
4. **Partículas** — canvas orbitando, atraídas pelo cursor
5. **CRM reveal** — no scroll 0.45+, `ProductCommandCenter` emerge do core (Flip)

### Interações mouse (desktop)
| Input | Resposta |
|-------|----------|
| `mousemove` | `rotateY: (mx-0.5)*18deg`, `rotateX: (my-0.5)*-12deg` |
| `mousemove` | `--light-x/y` atualiza radial-gradient no core |
| `mousemove` | Partículas desviam 40px em direção ao cursor |
| `mouseenter` | Rim glow intensifica 0.4→0.85 em 0.4s |
| `mouseleave` | Elastic return `rotate 0,0` duration 0.8s |
| Scroll 0→1 | Core scale 1→0.85; CRM scale 0→1; filamentos expandem |

### Implementação técnica
- **Primário:** `components/hero/KoruVisionCore.tsx` — Canvas 2.5D + CSS 3D layers
- **Fallback mobile:** poster `NV11-IMG-001` + `ProductCommandCenter` sem tilt
- **Performance:** max 80 partículas desktop, 0 partículas mobile

### Assets associados
- BG atmosférico: `NV11-IMG-001` (suporte, não protagonista)
- Loop ambiente: `NV11-VID-LOOP-001` opacity 0.18
- F2F handoff: frames 85–90 do pin = frame 0 C02

---

## Protagonistas 3D — padrão de implementação

Todas as cenas `3D` seguem:

```
ProtagonistStage (perspective: 1200px)
  ├── LayerFar    (z: -80px)  — partículas / névoa hue
  ├── LayerMid    (z: 0)      — objeto protagonista
  ├── LayerNear   (z: 40px)   — highlights / glow sprites
  └── LiveUI      (z: 20px)   — mockup React quando aplicável
```

**Mouse:** `Observer` ou `mousemove` → `gsap.quickTo` em rotateX/Y  
**Scroll:** `ScrollTrigger` scrub em propriedades do protagonista  
**Sombras:** `filter: drop-shadow` coerente com `--scene-hue`  
**Nunca:** imagem PNG estática como único elemento

---

## Protagonistas F2F — padrão

| Seq ID | Cena | Frames | FPS | Fonte vídeo |
|--------|------|--------|-----|-------------|
| NV11-F2F-001 | C02 | 90 | 25 | Kling 10s |
| NV11-F2F-002 | C05 | 120 | 24 | Kling 10s |
| NV11-F2F-003 | C11 | 96 | 24 | Kling 10s |
| NV11-F2F-004 | C19 | 80 | 25 | Kling 10s |
| NV11-F2F-000 | C01 | 72 | 24 | Kling 10s (Hero core → CRM) |

Componente: `FrameScrubber` + pin `ScrollTrigger`  
**Regra loop-safe:** frame 0 ≈ frame N para vídeos fonte; para narrativa, frame N = handoff para próxima cena (não loop)

---

## Camadas de suporte (não protagonistas)

Toda cena pode ter (opacity baixa):
- `NV11-IMG-XXX` — atmosfera (max 0.35 após scrim)
- `NV11-VID-LOOP-XXX` — ambiente (max 0.22)
- SVG decor — linhas, grids, auroras
- `GlobalJourneyLayer` — partículas globais

**O protagonista sempre ocupa ≥45% da área visual da zona direita/centro.**

---

## Documentos relacionados

- **[Especificações profundas — 19 cenas](KORUVISION-Scene-Deep-Specs.md)** ← principal
- [Cadeia narrativa frame-a-frame](KORUVISION-Narrative-Continuity-Chain.md)
- [Prompts imagem](../assets/prompts/v11/image-prompts.md)
- [Prompts vídeo](../assets/prompts/v11/video-prompts.md)
- [SVGs](../assets/prompts/v11/svg-specs.md)
- [Animações GSAP](../assets/prompts/v11/animation-specs.md)
- [Specs 3D interativo](../assets/prompts/v11/3d-interactive-specs.md)
