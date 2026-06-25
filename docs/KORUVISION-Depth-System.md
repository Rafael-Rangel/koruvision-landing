# KORUVISION — Depth System v1
## Profundidade · Imersão · Composição Espacial

> Prioridade: **3D fake > plano** quando legibilidade e conversão não forem afetadas.

---

## Stack de profundidade (Z-index espacial)

| Camada Z | Nome | Conteúdo |
|----------|------|----------|
| -500 | void | Imagem ambiente, preto absoluto |
| -400 | grid-floor | Grid perspectiva, chão tecnológico |
| -280 | fog-far | Neblina roxa distante |
| -150 | orbs-back | Partículas bokeh grandes, blur |
| -80 | glow / river | Data-river SVG |
| 0 | device-base | Corpo do mockup |
| +40–80 | ui-mid | Conteúdo principal da tela |
| +100–180 | float-panels | Notificações, métricas, mini cards |
| +200 | ui-front | Badges, chips, tooltips |

**Fórmula compensação escala:** `scale(1 + translateZ * 0.0008)`

---

## Mockup principal — regras

1. `perspective: 1600–2000px` no stage
2. `transform-style: preserve-3d` em stack, device, screen
3. Sombra de pedastal separada (`translateZ(-20px)`, blur alto)
4. Rim light chrome no bezel
5. UI interna em ≥3 planos Z
6. `overflow: visible` no shell — floats podem sair do frame
7. Screen mantém `overflow: hidden` para clip de conteúdo

---

## Elementos flutuantes

Tipos por produto FlowIA:

| Elemento | Profundidade | Seções |
|----------|--------------|--------|
| Notificação WhatsApp | Z+140 | S01, S04 |
| Mini métrica (+23%) | Z+160 | S04, S08 |
| Pipeline R$ | Z+120 | S04, S08 |
| Badge IA | Z+180 | S04 |
| Orbs bokeh | Z-150 a -50 | Global |

Animação: bob `sin(t)*6px` + parallax mouse `depth * 0.04`

---

## Backgrounds em camadas

Nunca fundo único plano. Mínimo 4 planos:

1. Void image
2. Grid perspectiva animado
3. Fog gradient duplo (far + near)
4. Orbs / partículas

Scroll: cada plano move `progress * factor` diferente.

---

## Por seção (identidade depth)

| Seção | Depth hero |
|-------|------------|
| S01 | Device emerge de void, 6 layers |
| S02 | Cards caem em Z negativo |
| S03 | Túnel SVG anéis em Z |
| S04 | **Mockup stack + floats** (referência) |
| S05 | Monolitos 01/02/03 em Z-space |
| S08 | Kanban isometric boards |
| S14 | Órbita 3D logos |
| S19 | Pull-out câmera, convergência |

---

## Performance

- Max 8 floats visíveis simultâneos
- `will-change: transform` só no stage ativo
- Mobile: 3 layers, sem floats externos, perspective reduzida
- `prefers-reduced-motion`: sem bob, parallax /2

---

*Depth System v1 — referência: `demo/s04.html`*
