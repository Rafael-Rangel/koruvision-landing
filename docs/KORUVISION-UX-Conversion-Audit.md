# KORUVISION v5 — Auditoria UX e Conversão

> Equilíbrio impacto × clareza × conversão

---

## 1. Pontos de distração identificados

| # | Problema | Seção | Impacto conversão | Ação |
|---|----------|-------|-------------------|------|
| D1 | Pin 620vh S04 — usuário perde CTAs superiores | S04 | Alto — abandono mid-demo | Reduzir 480vh · CTA sticky após act 2 |
| D2 | 7 pins consecutivos S05–S09 | Produto | Alto — fadiga | Respiro 80vh · comprimir S07+S08 |
| D3 | Cursor glow global sempre on | Global | Médio — competição visual | Só S01, S04 peak, S19 |
| D4 | Data river sobre margens confunde | Global | Baixo | Clip river to 40% viewport edges |
| D5 | Marquee infinito S13 | S13 | Médio — motion sickness | Pause on hover + reduced-motion off |
| D6 | Orbit contínuo S14 | S14 | Médio — não lê logos | Pause PEAK · hover zoom only |
| D7 | Emojis ícones S02/S10 | S02,S10 | Médio — percepção amadora | SVG NV5-SVG-004–007 |
| D8 | Pricing toggle quebra HTML | S17 | Alto — confiança | Flip texto estruturado, não textContent |
| D9 | Nav links pulam sem offset | Nav | Médio — conteúdo cortado | ScrollToPlugin offset 72px |
| D10 | Múltiplos CTAs iguais sem hierarquia | Global | Médio | Primary 3 posições · ghost resto |

---

## 2. Excesso de movimento — audit

| Seção | Motion level | Verdicto | Ajuste |
|-------|--------------|----------|--------|
| S01 | Alto | ✅ OK hero | Manter · reduzir particles 40→24 |
| S02 | Médio | ✅ OK | — |
| S03 | Alto | ⚠️ | Reduzir tunnel scale contínuo · PEAK freeze |
| S04 | Muito alto | ⚠️ | OK como centerpiece · encurtar pin |
| S05 | Médio | ✅ | — |
| S06–S09 | Médio-alto repetitivo | ❌ | Diferenciar identity · menos pins |
| S10 | Baixo | ✅ respiro | — |
| S11 | Médio | ✅ | — |
| S12–S16 | Médio | ✅ | — |
| S17–S18 | Baixo | ✅ racional | — |
| S19 | Alto | ✅ clímax | — |

**Regra:** Max 3 seções "muito alto" consecutivas — hoje S03–S09 viola (7).

---

## 3. Excesso de profundidade

| Elemento | Camadas | Verdicto |
|----------|---------|----------|
| S04 stage | 10 | ✅ Referência |
| S01 stage | 2 | ❌ Insuficiente vs promise |
| S02 cards | 1 | ⚠️ OK se TiltCard hover |
| S14 orbit | 3D + motion | ⚠️ Reduzir fora PEAK |
| Global fog | 0 | ❌ Adicionar AtmosphereLayer |

**Regra performance:** Max 8 floats visíveis · max 6 translateZ layers active.

---

## 4. Funil de conversão

| CTA | Posição | Visibilidade atual | Meta |
|-----|---------|-------------------|------|
| Começar grátis | S01 | ✅ | Magnetic + contrast AAA |
| Ver demo | S01 ghost | ✅ | ScrollTo S04 act 1 |
| Começar grátis | S04 act 5 | ⚠️ só act 5 | Soft CTA act 3+ sticky |
| Conectar WhatsApp | S05 | ✅ | — |
| Assinar Pro | S17 | ✅ | Popular glow |
| Começar grátis | S19 | ✅ | Dual CTA |

**Sticky CTA bar (desktop):** aparece após S02 scroll 20% · hide during S04 pin acts 1–2 · show act 3+.

---

## 5. Quedas de conversão previstas

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Abandono S04 mid-scroll | 35% | Snap PEAK · progress indicator · shorter pin |
| Confusão produto vs demo | 20% | Labels capítulo nav 01–19 |
| Mobile scroll fatigue | 45% | MP4 chapters · 55% pin reduction |
| Pricing shock | 15% | Toggle anual default off · "14 dias grátis" repeat |
| FAQ não encontrado | 10% | Sticky link footer + S17 link |

---

## 6. Acessibilidade UX

- [ ] `prefers-reduced-motion`: static fallbacks all sections
- [ ] Keyboard nav all CTAs + FAQ
- [ ] Focus trap none (landing not modal)
- [ ] Skip link "Ir para conteúdo"
- [ ] Section landmarks `<main>` `<section aria-label>`
- [ ] Video/F2F: `aria-hidden` decorative only

---

## 7. Equilíbrio recomendado (regra 70/30)

- **70%** scroll energy: narrativa, produto, prova
- **30%** static/rational: S17 pricing, S18 FAQ, footer

**Intensidade visual máxima:** S01, S03, S04, S19 (4 picos — não 10).

---

*Validar com heatmap pós-launch · Hotjar/Clarity nos 5 primeiros capítulos*
