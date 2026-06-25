# NV5 — Mockups e Composições UI

> **Regra:** UI legível = React/Figma/Pillow ONLY · Nunca FLUX/Kling  
> Logo: `assets/refs/koruvision-logo-master.png` (nunca IA)

---

## NV5-M-01 · Device Shell Master

| Campo | Valor |
|-------|-------|
| **Tipo** | Pillow Python composite |
| **Script** | `scripts/create_phone_mockup.py` |
| **Output** | `assets/nv5/mockups/device-shell-master.webp` |
| **Uso** | S01, S04, S07 — mesmo shell em todas seções |
| **Dimensões** | 1080×2340 PNG source · export WebP q90 |

**Camadas Pillow:**
1. Void plate NV5-IMG-003 (platform BG)
2. Device bezel chrome `#E8ECF8` rim gradient
3. Screen cutout transparent (React UI inject)
4. Shadow pedestal blur 18px violet
5. Reflection plane 35% opacity

**Ângulo:** yaw 28° · pitch 12° · match Visual Bible v5

---

## NV5-M-02 · Screenshot Golden WhatsApp

| Campo | Valor |
|-------|-------|
| **Componente** | NV5-R-011 UIWhatsAppChat |
| **Output** | `mockups/ui-whatsapp-golden.png` |
| **Conteúdo PT-BR** | Clínica Sorriso · "Quanto custa consulta?" · resposta IA |

---

## NV5-M-03 · Screenshot Golden Agent

| Componente NV5-R-012 · Score 87% · Intenção Agendar

---

## NV5-M-04 · Screenshot Golden Kanban

| Componente NV5-R-013 · Maria S. · R$ 2.400 · 4 colunas

---

## NV5-M-05 · Screenshot Golden Calendar

| Componente NV5-R-014 · Consulta confirmada 14h

---

## NV5-M-06 · Screenshot Golden Dashboard

| Componente NV5-R-015 · Pipeline R$ 47.800 · Conversão 23%

---

## NV5-M-07 · Inbox Three-Col

| Componente NV5-R-016 · S07 war room layout

---

## NV5-M-08 · Workflow Canvas

| Componente NV5-R-017 · 6 nodes hex · S09

---

## NV5-M-09 · Agency Tenants Grid

| Componente NV5-R-018 · 6 tenants · MRR counter

---

## NV5-M-10 · Pricing Cards

| Componente NV5-R-019 · Starter/Pro/Agência

---

## Composições marketing (FLUX — não UI)

| ID | Arquivo | Seção | Prompt ref |
|----|---------|-------|------------|
| NV5-C-01 | `comp-hero-with-device-slot.webp` | S01 | IMG-003 + mask center |
| NV5-C-02 | `comp-problem-quad-grid.webp` | S02 | IMG-005–008 composite |
| NV5-C-03 | `comp-cases-vertical-saúde.webp` | S12 | IMG-027 + color grade |
| NV5-C-04 | `comp-cases-vertical-imoveis.webp` | S12 | IMG-028 |
| NV5-C-05 | `comp-cases-vertical-consultoria.webp` | S12 | IMG-029 |
| NV5-C-06 | `comp-cases-vertical-agencias.webp` | S12 | IMG-030 |
| NV5-C-07 | `comp-cases-vertical-ecommerce.webp` | S12 | IMG-031 |

Composições C-* = FLUX scene + device slot vazio para overlay React em produção.

---

## Variações obrigatórias por imagem FLUX

| Variação | Sufixo | Quando |
|----------|--------|--------|
| Desktop hero | `-desktop.webp` | width 2560 |
| Mobile crop | `-mobile.webp` | center crop 9:16 |
| LQIP placeholder | `-lqip.webp` | 32px blur hash |
| Dark alt | `-alt.webp` | seed+1 A/B test |

**Total arquivos derivados:** 48 imgs × 4 variações = 192 WebP + 48 source

---

## Checklist mockup

- [ ] NV5-M-01 device shell gerado
- [ ] 5 golden screens exportados (M-02–M-06)
- [ ] Shell idêntico S01=S04=S07
- [ ] Contraste UI WCAG AA validado
- [ ] PT-BR copy revisado
