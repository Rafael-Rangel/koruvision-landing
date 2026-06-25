# FlowIA — Índice de Padrões Aprovados

> **Última atualização:** Junho 2026  
> **Uso:** Fonte única para saber *onde está documentado* cada decisão de design, seção, motion e criativo.  
> **Direção aprovada agora:** **v7 Cinematic Product** ([`KORUVISION-Creative-Bible-v7.md`](./KORUVISION-Creative-Bible-v7.md))  
> **Base técnica:** v6 Product Canvas (mockups subservientes, sem névoa genérica)

---

## 1. Hierarquia — o que manda hoje

| Prioridade | Documento / código | Status |
|------------|-------------------|--------|
| **1** | [`KORUVISION-Creative-Bible-v7.md`](./KORUVISION-Creative-Bible-v7.md) | ✅ **Fonte principal** — GDD 5 camadas, 7 atos, mapa ChatGPT→S01–S19 |
| **2** | [`KORUVISION-Section-Cards-v7.md`](./KORUVISION-Section-Cards-v7.md) | ✅ Cards de produção por seção |
| **3** | [`FlowIA-Visual-Script-v6.md`](./FlowIA-Visual-Script-v6.md) | ✅ Frames, transições, prompts (fundos) |
| **4** | [`assets/prompts/v6/`](../assets/prompts/v6/) | ✅ Prompts FLUX + Kling |
| **5** | [`config/sections.ts`](../config/sections.ts) | ✅ Código vivo — copy, pin, assets |
| **6** | [`sections/SectionDemo.tsx`](../sections/SectionDemo.tsx) | ✅ Referência UI demo (S04) |
| **7** | [`lib/motion-system.ts`](../lib/motion-system.ts) | ✅ BUILD / PEAK / EXIT |
| — | `docs/KORUVISION-*-v5.md` + `assets/prompts/v5/` | ⚠️ Legado Névoa Neural |

**Regra:** v7 narrativa + mockups dominam · v6 restringe névoa · v5 obsoleto.

---

## 2. Linha criativa aprovada (v6)

### Nome da direção
**Product Canvas** — premium SaaS, imersivo mas **limpo**; mockups e UI React em primeiro plano.

### O que transmitir
- CRM + IA WhatsApp que vira receita previsível
- Interfaces reais (inbox, kanban, dashboard, WhatsApp)
- Contextos de uso (escritório, clínica, agência) — desfocados, nunca competindo com o texto

### O que NÃO fazer (descartado na aprovação)
- Espaço sideral, névoa cósmica, corredores neurais infinitos
- Rios de dados líquidos, observatórios, utopia sci-fi abstrata
- F2F scrub pesado em todas as seções (política: **off** por padrão)
- Vídeos/imagens acima de ~20% opacidade sem véu de legibilidade

### Paleta aprovada (v6)

| Token | Hex | Uso |
|-------|-----|-----|
| void | `#03060F` | Fundo |
| surface | `#080D1A` | Cards |
| CTA blue | `#3B82F6` | Ações |
| IA violet | `#8B5CF6` | Agente / IA |
| success | `#10B981` | Deal / conversão |
| danger | `#EF4444` | Caos (S02) |
| texto | `#F0F4FF` / `#8B9EC4` | Headline / corpo |

### Prefixo global de geração (copiar em todo prompt)
Ver seção 5 em [`FlowIA-Visual-Script-v6.md`](./FlowIA-Visual-Script-v6.md) ou início de [`assets/prompts/v6/flux-images.md`](../assets/prompts/v6/flux-images.md).

---

## 3. Padrões por seção (S01–S19)

### Narrativa (3 atos)
| Ato | Seções | Objetivo |
|-----|--------|----------|
| I Reconhecimento | S01–S03 | Promessa → dor → alívio |
| II Revelação | S04–S09 | Demo produto → capabilities |
| III Prova + Decisão | S10–S19 | Prova → planos → CTA |

### Spec detalhada por seção
| Documento | Conteúdo |
|-----------|----------|
| [`FlowIA-Visual-Script-v6.md`](./FlowIA-Visual-Script-v6.md) | Frame inicial / pico / final · IMG/VID/F2F por seção · bridges |
| [`KORUVISION-Sections-v5.md`](./KORUVISION-Sections-v5.md) | Copy longa, camadas L1–L10, objetivos psicológicos (atualizar mentalmente para v6 visual) |
| [`config/sections.ts`](../config/sections.ts) | Implementação: headlines, pinVh, scrub, filenames |

### Seção Demo (S04) — referência de motion aprovada
| Recurso | Path |
|---------|------|
| Implementação React | [`sections/SectionDemo.tsx`](../sections/SectionDemo.tsx) |
| CSS stage / 5 atos | [`styles/sections-ext.css`](../styles/sections-ext.css) (`.s04-*`) |
| Protótipo HTML ouro | [`demo/s04.html`](../demo/s04.html) + [`demo/js/s04.js`](../demo/js/s04.js) |
| Pin aprovado | `pinVh: 480`, `scrub: 2.4`, 5 atos com crossfade + câmera 3D |

### Preview aprovado (2 seções)
| URL | Config |
|-----|--------|
| `/test` | [`app/test/page.tsx`](../app/test/page.tsx) + [`config/test-preview.ts`](../config/test-preview.ts) |
| Assets teste | `public/assets/nv6/images/` (4 imagens geradas) |

---

## 4. Design system & hierarquia visual (código)

| Padrão | Onde está |
|--------|-----------|
| Tokens CSS | [`styles/tokens.css`](../styles/tokens.css), [`styles/landing.css`](../styles/landing.css) |
| **Mídia subserviente** (`mediaIntensity: low`) | [`config/sections.ts`](../config/sections.ts) + [`SectionMediaLayers.tsx`](../components/motion/SectionMediaLayers.tsx) |
| Véu de legibilidade | [`app/globals.css`](../app/globals.css) → `.section-content-veil` |
| Opacidade IMG/VID/F2F por intensidade | [`SectionBackground.tsx`](../components/motion/SectionBackground.tsx), `globals.css` |
| Pin + scroll | [`lib/hooks/useGsapContext.ts`](../lib/hooks/useGsapContext.ts) |
| Golden UI (mockups) | [`components/golden/GoldenUI.tsx`](../components/golden/GoldenUI.tsx) |

### Hierarquia z-index aprovada
```
0  — section-bg (IMG ≤20%)
1  — video (≤12% ou off em low)
4  — content-veil (gradiente escuro)
10 — section-inner (copy)
12+ — device / mockup React
200 — nav
```

---

## 5. Motion & animação

| Documento | Função |
|-----------|--------|
| [`KORUVISION-Motion-System.md`](./KORUVISION-Motion-System.md) | BUILD / PEAK / EXIT, continuidade de câmera |
| [`lib/motion-system.ts`](../lib/motion-system.ts) | `elementState`, `smoothrange`, `phase` |
| [`KORUVISION-Spacing-Rhythm-Spec-v5.md`](./KORUVISION-Spacing-Rhythm-Spec-v5.md) | pinVh por seção, bridge zones |
| [`KORUVISION-GSAP-Technology-Map.md`](./KORUVISION-GSAP-Technology-Map.md) | Mapa tecnológico GSAP por seção |
| [`KORUVISION-F2F-GSAP-Integration.md`](./KORUVISION-F2F-GSAP-Integration.md) | F2F (legado; v6 desliga por padrão) |

**Constantes obrigatórias:** `BUILD_END = 0.48`, `PEAK_END = 0.72`

---

## 6. Assets & geração

### v6 (usar para novos binários)
| Arquivo | Qtd | Geração |
|---------|-----|---------|
| [`assets/prompts/v6/flux-images.md`](../assets/prompts/v6/flux-images.md) | 48 imgs | `python scripts/build_v6_prompts.py` → regen MD; FLUX via pipeline |
| [`assets/prompts/v6/kling-videos.md`](../assets/prompts/v6/kling-videos.md) | 12 vídeos | Kling I2V |
| [`assets/prompts/v6/README.md`](../assets/prompts/v6/README.md) | — | Guia execução |
| Teste rápido 4 imgs | S01+S04 | `python scripts/nv6_test_generate.py` |

### v5 (legado — já gerado em `public/assets/nv5/`)
| Arquivo | Nota |
|---------|------|
| [`assets/prompts/v5/`](../assets/prompts/v5/) | Névoa Neural — manter só como histórico |
| [`docs/KORUVISION-Asset-Map-Master.md`](./KORUVISION-Asset-Map-Master.md) | Mapa completo nv5 (regenerar com `build_asset_map_master.py`) |
| [`docs/KORUVISION-Asset-Production-Status.md`](./KORUVISION-Asset-Production-Status.md) | Status binários nv5 |

### Pipelines
| Script | Função |
|--------|--------|
| `scripts/nv5_pipeline.py` | FLUX + Kling + F2F → `public/assets/nv5/` |
| `scripts/nv6_test_generate.py` | 4 imagens teste → `public/assets/nv6/` |
| `scripts/build_v6_prompts.py` | Regenera MDs v6 a partir de `build_v6_prompts.py` data |

---

## 7. UX, conversão e auditorias

| Documento | Função |
|-----------|--------|
| [`FlowIA — Plano Completo da Landing Page Premium.md`](../FlowIA%20—%20Plano%20Completo%20da%20Landing%20Page%20Premium.md) | Plano mestre CRO, 19 seções, backlog |
| [`KORUVISION-UX-Conversion-Audit.md`](./KORUVISION-UX-Conversion-Audit.md) | Auditoria conversão |
| [`KORUVISION-Color-Legibility-System.md`](./KORUVISION-Color-Legibility-System.md) | Legibilidade sobre fundos |
| [`KORUVISION-Critical-Audit-v5.md`](./KORUVISION-Critical-Audit-v5.md) | Overlap pins, bridges (vários fixes já aplicados no código) |

---

## 8. Como atualizar quando aprovar algo novo

1. **Direção visual / roteiro** → editar [`FlowIA-Visual-Script-v6.md`](./FlowIA-Visual-Script-v6.md)
2. **Prompts de IA** → editar `scripts/build_v6_prompts.py` → rodar `python scripts/build_v6_prompts.py`
3. **Copy / pin / assets por seção** → [`config/sections.ts`](../config/sections.ts)
4. **Motion de uma seção** → componente em [`sections/`](../sections/) + regras em [`KORUVISION-Motion-System.md`](./KORUVISION-Motion-System.md)
5. **Hierarquia visual global** → [`app/globals.css`](../app/globals.css) + [`SectionMediaLayers.tsx`](../components/motion/SectionMediaLayers.tsx)
6. **Registrar neste índice** → adicionar linha na tabela da seção 1

---

## 9. Mapa rápido “preciso de X, abro Y”

| Preciso de… | Abro |
|-------------|------|
| **Direção criativa completa (ChatGPT + Koru)** | `docs/KORUVISION-Creative-Bible-v7.md` |
| Card rápido por seção | `docs/KORUVISION-Section-Cards-v7.md` |
| Roteiro frame a frame (fundos) | `docs/FlowIA-Visual-Script-v6.md` |
| Prompt para gerar imagem | `assets/prompts/v6/flux-images.md` |
| Prompt para gerar vídeo | `assets/prompts/v6/kling-videos.md` |
| Texto headline de uma seção | `config/sections.ts` ou `KORUVISION-Sections-v5.md` |
| Regras de scroll / pin | `KORUVISION-Spacing-Rhythm-Spec-v5.md` + `sections.ts` |
| Animação BUILD/PEAK/EXIT | `KORUVISION-Motion-System.md` + `lib/motion-system.ts` |
| Demo 5 atos | `sections/SectionDemo.tsx` + `demo/s04.html` |
| Ver preview 2 seções | `http://localhost:3000/test` |
| Estratégia de venda / CRO | `FlowIA — Plano Completo...md` |
| O que está obsoleto | `assets/prompts/v5/` + `KORUVISION-Visual-Bible-v5.md` |

---

*Índice mantido pelo time FlowIA · alinhar com aprovações em `/test` antes de gerar lote completo nv6.*
