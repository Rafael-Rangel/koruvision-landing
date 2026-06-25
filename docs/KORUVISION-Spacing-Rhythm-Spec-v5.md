# KORUVISION v5 — Espaçamento, Ritmo e Anti-Atropelo

> Corrige: seções invadindo vizinhas · pin excessivo · conteúdo sumindo cedo  
> **Pin total revisado:** 3.240vh desktop (−32% vs plano original 4.770vh)

---

## 1. Modelo de seção (6 fases obrigatórias)

Cada seção pinned implementa:

| Fase | % scroll local | Duração equiv.* | Função |
|------|----------------|-----------------|--------|
| **ENTRADA** | Bridge overlap 0–12% | 0.4s | Handoff seção anterior |
| **BUILD** | 12–48% | 1.2s | Layered element entry |
| **PEAK** | 48–72% | **1.5s min** | Estabilidade total |
| **HOLD** | 72–82% | 0.5s | Permanência extra CTAs |
| **EXIT** | 82–100% | 0.8s | Morph/transform handoff |
| **BRIDGE OUT** | +60vh gap | 0.3s | Respiração antes próxima |

*Equiv. @ scroll médio 800px/s desktop

**Regra:** Nenhuma EXIT inicia antes de PEAK 100% completo + HOLD mínimo.

---

## 2. Pin heights revisados

| Seção | Plano v5 | **Revisado** | Scrub | Tempo leitura headline |
|-------|----------|--------------|-------|------------------------|
| S01 | 400vh | **360vh** | 1.2 | 3.5s |
| S02 | 280vh | **240vh** | 1.0 | 2.8s |
| S03 | 350vh | **320vh** | 1.2 | 3.2s |
| S04 | 620vh | **480vh** | 2.4 | 5 acts × 0.9s |
| S05 | 360vh | **280vh** | 1.0 | 3.0s |
| S06 | 300H | **260H** | 1.0 | swipe |
| S07 | 280vh | **240vh** | 1.0 | 2.8s |
| S08 | 320vh | **260vh** | 1.2 | 3.0s |
| S09 | 300vh | **240vh** | 1.0 | 2.8s |
| — | — | **80vh respiro** | — | transição produto→prova |
| S11 | 280vh | **240vh** | 1.0 | 2.8s |
| S12 | 350H | **300H** | 1.0 | swipe |
| S14 | 280vh | **220vh** | 1.0 | 2.5s |
| S15 | 300vh | **260vh** | 1.0 | 2.8s |
| S19 | 350vh | **320vh** | 1.2 | 3.5s |
| **TOTAL** | 4.770vh | **3.240vh** | | ~40 telas |

**Não pinned (flow):** S10, S13, S16, S17, S18 — padding vertical 120–160px each.

---

## 3. Bridge zones (anti-atropelo)

| Par | Bridge type | Elemento compartilhado | Overlap vh |
|-----|-------------|------------------------|------------|
| S01→S02 | Color bleed | danger-fog invade river + device scale down | 60vh |
| S02→S03 | Flip morph | 4 pain cards → 4 pillars (same DOM) | 80vh |
| S03→S04 | Portal zoom | tunnel end = S04 void BG | 100vh |
| S04→S05 | Camera pull-back | device shrinks → monolith 01 scale match | 80vh |
| S09→S10 | Intensity drop | particles decel · unpinned constellation | 80vh respiro |
| S11→S12 | Horizontal handoff | slider freeze → case card 1 | 40vh |
| S16→S17 | Rational pause | shield glow fade · pricing pedestals rise | 60vh |
| S18→S19 | Fog dissipate | FAQ bg clarify → convergence particles | 60vh |

Implementação GSAP:
```js
ScrollTrigger.create({
  trigger: '#bridge-s01-s02',
  start: 'top bottom',
  end: 'bottom top',
  scrub: true,
  animation: handoffTimeline
});
```

---

## 4. Tempo de absorção por elemento

| Elemento | Min PEAK dwell | Métrica |
|----------|----------------|---------|
| Headline H1 | 1.2s scroll | legível 100% opacity |
| Stat counter S02 | 0.8s após reach target | hold value |
| Demo UI screen S04 | 2.0s por ato | explore mode enabled |
| Pricing values S17 | 1.0s pós-Flip toggle | stable |
| FAQ answer open | user-controlled | spring settle |

---

## 5. Distâncias entre blocos (CSS)

```css
.section-flow { padding: clamp(100px, 14vh, 160px) 0; }
.pin-wrap + .pin-wrap { /* no margin — bridge handles */ }
.section-inner { max-width: 1280px; padding-inline: clamp(20px, 4vw, 48px); }
.stack-gap-cards { gap: 16px; } /* S02 */
.stack-gap-portals { gap: 20px; } /* S05 */
.cta-row { margin-top: 28px; gap: 12px; }
.section-headline + .section-lede { margin-top: 16px; }
```

---

## 6. Conflitos resolvidos (spec)

| Conflito | Causa | Fix |
|----------|-------|-----|
| S04 invade S05 | Pin sem pinSpacing awareness | `anticipatePin: 1` + bridge 80vh |
| River draw conflita headline | Global scrub same trigger | River scrub 1.5 · section scrub independent |
| S06 from() + horizontal | Double animation | Remove from(), scrub only |
| S08 card jank | getBoundingClientRect scrub | Precomputed MotionPath anchors |
| S14 text vs orbit | Continuous motion | `phase === 'peak' → orbit.pause()` |

---

## 7. Mobile rhythm (matchMedia)

| Tier | Pin multiplier | PEAK min | F2F |
|------|----------------|----------|-----|
| desktop ≥1024 | 1.0× | 1.5s | full |
| tablet 768–1023 | 0.72× | 1.0s | reduced |
| mobile <768 | 0.55× | 0.8s | MP4 chapters |

---

*Integrar em `useScrollAct.ts` e `SectionHandoff` component*
