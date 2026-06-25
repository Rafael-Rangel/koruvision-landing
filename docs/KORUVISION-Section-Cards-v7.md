# KoruVision v7 — Section Production Cards

> Cards rápidos por seção · derivado de [`KORUVISION-Creative-Bible-v7.md`](./KORUVISION-Creative-Bible-v7.md)  
> Use junto com [`config/sections.ts`](../config/sections.ts)

---

## Legenda tipos

`VL` VIDEO_LOOP · `SC` SCROLL_CINEMATIC · `UI` UI_DEMONSTRATION · `MG` MOTION_GRAPHICS · `GS` GSAP_STORYTELLING · `CV` CONVERSION

---

| ID | Nome v7 | Tipo | Pin vh | Objetivo em 1 linha |
|----|---------|------|--------|---------------------|
| S01 | Hero · Coruja enxerga | VL+GS | 360 | Impacto + trial; 40/60 owl |
| S02 | Caos operacional | SC | 240 | Dor desconectada |
| S03 | A conexão | SC+SVG | 320 | Ordem + logo KV |
| S04 | Demo 5 atos | UI | 480 | Provar fluxo WA→Dashboard |
| S05 | Setup 3 portais | UI | 280 | Onboarding 5 min |
| S06 | Agentes IA | VL+UI | 260 | Personalidade + órbita |
| S07 | Inbox comando | UI | 240 | Multi-chat + handoff |
| S08 | Funil CRM vivo | UI | 260 | Card journey + R$ |
| S09 | Automações 3D | UI | 320 | 6 nodes camera fly-through |
| S10 | Benefícios | MG | flow | 12 nós constelação |
| S11 | Antes/depois | GS | 240 | Slider caos/controle |
| S12 | Cases | GS | 300 | 5 verticais horizontal |
| S13 | Social proof | MG | flow | Counters + marquee |
| S14 | Integrações órbita | MG+VL | 220 | Apps orbitam CRM |
| S15 | Agência portal | UI | 260 | Multi-tenant |
| S16 | Segurança | MG | flow | Shield + badges |
| S17 | Planos | CV | flow | 3 tiers |
| S18 | FAQ | CV | flow | Objeções |
| S19 | CTA coruja retorno | VL+GS | 320 | Conversão final |

---

## Checklist por card (preencher na implementação)

```text
[ ] Objetivo psicológico claro
[ ] Frame IN = frame OUT da seção anterior
[ ] Mockup React domina (se UI)
[ ] Vídeo/F2F ≤15% opacidade + véu
[ ] BUILD 48% / PEAK 72% nos elementos
[ ] Mobile: pin reduzido, UI empilhada
[ ] Lighthouse: LCP hero < 2.5s
```

---

## Mapa mockup ChatGPT → componente React

| Mockup enviado | Componente alvo |
|----------------|-----------------|
| CRM Kanban 5 colunas | `UIKanbanBoard` → expandir `UICrmPipeline` |
| WhatsApp 3 colunas | `UIInboxThreeCol` → `UIWhatsAppOps` |
| Dashboard charts | `UIDashboard` → `UIDashboardPro` |
| Workflow nodes | `UIWorkflowCanvas` → `UIWorkflowFlythrough` |
| IA orbital | novo `UIAiOrbit` |
| Integrações arco | `SectionIntegrations` orbit stage |

---

*Atualizar quando S01/S19 owl e S09 flythrough forem implementados.*
