# NV11 — Especificações de Animação GSAP (por cena)

> **Referência:** `lib/gsap/register.ts`, `lib/lenis-scroll.ts` (`PREMIUM_SCRUB: 1.4`), `lib/motion-system.ts`  
> **Fases:** BUILD 48% · PEAK 72% · HOLD restante  
> **SplitText:** headlines `.scene-headline`, stagger 0.04, `ease: power3.out`

---

## Padrões globais

### SceneScaffold base (todas)
```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef,
    start: "top 75%",
    end: "top 25%",
    scrub: PREMIUM_SCRUB,
  },
});
tl.fromTo(headline, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 })
  .fromTo(subcopy, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25 }, "-=0.15")
  .fromTo(protagonist, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, "-=0.2");
```

### Handoff entre cenas
```js
// section-morph-bridge no wrapper
gsap.to(bridge, {
  "--continuity-hue": nextHue,
  opacity: 1,
  scrollTrigger: { trigger: section, start: "bottom 90%", end: "bottom top", scrub: 0.6 },
});
```

---

## C01 — Hero · Núcleo KoruVision (3D HYB + F2F opcional)

| Campo | Valor |
|-------|-------|
| Protagonista | `KoruVisionCore` 3D + `NV11-F2F-000` overlay |
| Pin | Não (hero viewport) |
| Interação | Mouse parallax, partículas, scroll CRM emerge |

### Timeline
| Progress | Ação |
|----------|------|
| 0.00 | Core scale 0.85, partículas lentas |
| 0.15 | Headline SplitText reveal |
| 0.30 | Mouse influence max (tilt ±12deg) |
| 0.50 | F2F scrub 0→0.5 (filamentos expandem) |
| 0.70 | CRM hologram opacity 0→0.85 |
| 0.90 | KPI widgets stagger in |
| 1.00 | Flash gold handoff → C02 |

### GSAP snippets
```js
// Mouse tilt (rAF smoothed)
gsap.quickTo(core, "rotationY", { duration: 0.6 });
gsap.quickTo(core, "rotationX", { duration: 0.6 });

// Scroll CRM emerge
gsap.to(crmLayer, {
  y: 0, opacity: 1, scale: 1,
  scrollTrigger: { trigger: hero, start: "top top", end: "+=120%", scrub: PREMIUM_SCRUB },
});

// Partículas cursor
gsap.to(cursorParticles, { x: mouse.x, y: mouse.y, stagger: 0.02, ease: "power2.out", duration: 0.8 });
```

---

## C02 — Coruja · F2F Olhos (F2F ★)

| Campo | Valor |
|-------|-------|
| Protagonista | `NV11-F2F-001` canvas sequence |
| Pin | 280vh |
| Frames | 90 |

### Timeline (scrub pin)
| Progress | Frame | Ação |
|----------|-------|------|
| 0.00 | 0 | Olhos fechados + flash residual C01 |
| 0.35 | 32 | Semi-abertos |
| 0.65 | 58 | Abertos |
| 0.85 | 76 | Pupila foca |
| 1.00 | 89 | Tunnel mask expand |

```js
ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: "+=280%",
  pin: true,
  scrub: PREMIUM_SCRUB,
  onUpdate: (self) => setFrame(Math.floor(self.progress * 89)),
});
```

---

## C03 — Problema · Caos 3D (3D)

| Protagonista | `ChaosFragmentField` — 12 shards 3D + SVG |
| Pin | 200vh |

| Progress | Ação |
|----------|------|
| 0.00 | Névoa vermelha da pupila C02 |
| 0.30 | Fragmentos explosão outward |
| 0.60 | Copy reveal danger hue |
| 1.00 | Fragmentos convergem centro → 4 clusters |

```js
gsap.to(fragments, { z: (i) => -i * 40, rotationY: (i) => i * 15, scrollTrigger: { scrub: true } });
```

---

## C04 — Pilares · Ordem (3D)

| Protagonista | `FourPillars3D` isométrico |
| Pin | 220vh |

| Progress | Ação |
|----------|------|
| 0.00 | 4 clusters C03 morph Flip → pilares |
| 0.40 | Pilares scaleY 0→1 stagger |
| 0.70 | Energia sobe colunas |
| 1.00 | Zoom into pilar central (scale 1.4) |

```js
Flip.from(state, { targets: pillars, duration: 1, scrollTrigger: { scrub: 0.8 } });
```

---

## C05 — Demo · CRM Despertar (F2F + LIVE)

| Protagonista | `NV11-F2F-002` + `ProductCommandCenter` LIVE |
| Pin | 480vh |

### 5 atos (já em SectionDemo — alinhar NV11)
| Ato | Progress | Visual |
|-----|----------|--------|
| 1 | 0.00–0.20 | Void + F2F início |
| 2 | 0.20–0.40 | Pipeline surge |
| 3 | 0.40–0.60 | IA chat ativa |
| 4 | 0.60–0.80 | Métricas LIVE |
| 5 | 0.80–1.00 | Botão Conectar glow → C06 |

---

## C06 — Setup · Portais (3D)

| Protagonista | `OnboardingPortals3D` |
| Pin | 200vh |

| Progress | Ação |
|----------|------|
| 0.00 | Portal 1 alinhado botão C05 |
| 0.33 | Portal 2 materializa |
| 0.66 | Portal 3 + checklist UI |
| 1.00 | Energia dispara → C07 |

```js
gsap.fromTo(portals, { z: -400, opacity: 0 }, { z: 0, opacity: 1, stagger: 0.2, scrollTrigger: { scrub: true } });
```

---

## C07 — Agentes IA · Cérebro (3D)

| Protagonista | `NeuralBrainHub3D` |
| Pin | 240vh |
| Interação | Hover nodes ativa agentes |

| Progress | Ação |
|----------|------|
| 0.00 | Energia portal C06 chega |
| 0.25 | Cérebro acende |
| 0.50 | 4 agentes orbitam |
| 0.75 | Node WA expande preview |
| 1.00 | WA fullscreen → C08 |

---

## C08 — Inbox · Omnichannel (3D + LIVE)

| Protagonista | `InboxCommand3D` + thread LIVE |
| Pin | 220vh |

| Progress | Ação |
|----------|------|
| 0.00 | Node WA expandido |
| 0.40 | Mensagens entram stagger |
| 0.70 | IA sugere resposta |
| 1.00 | Deal card R$ 2.400 slide → C09 |

---

## C09 — Funil · Pipeline (3D)

| Protagonista | `SalesPipeline3D` |
| Pin | 260vh |

| Progress | Ação |
|----------|------|
| 0.00 | Card Maria entra topo |
| 0.25 | Move Qualificação |
| 0.50 | Proposta |
| 0.75 | Negociação |
| 1.00 | Fechado pulse gold → C10 |

```js
gsap.to(dealCard, {
  motionPath: { path: stagePath, curviness: 1.2 },
  scrollTrigger: { scrub: PREMIUM_SCRUB },
});
```

---

## C10 — Automações · Sinapses (3D)

| Protagonista | `AutomationSynapse3D` |
| Pin | 200vh |

| Progress | Ação |
|----------|------|
| 0.00 | Pulso C09 ativa node Lead |
| 0.50 | Fluxo percorre 5 nodes |
| 1.00 | Convergência centro → C11 |

---

## C11 — Analytics · Evolução (F2F + LIVE)

| Protagonista | `NV11-F2F-003` + charts LIVE |
| Pin | 300vh |

| Progress | F2F | LIVE |
|----------|-----|------|
| 0.00 | Gráfico vazio | KPIs 0 |
| 0.50 | Meio | Count-up mid |
| 1.00 | Dashboard denso | KPIs finais + zoom out |

---

## C12 — Benefícios · Constelação (3D)

| Protagonista | `BenefitsConstellation3D` |
| Pin | 200vh |

| Progress | Ação |
|----------|------|
| 0.00 | KPIs C11 viram estrelas |
| 0.50 | 8 benefícios linkam |
| 1.00 | Split hemisférios → C13 |

---

## C13 — Antes/Depois · Split (3D HYB)

| Protagonista | `BeforeAfterSplit3D` + Draggable |
| Pin | 240vh |

| Progress | Ação |
|----------|------|
| 0.00 | Slider 50% |
| 0.50 | Auto drift → 65% "depois" |
| 1.00 | Wipe direita 75% → C14 |

```js
Draggable.create(handle, { type: "x", bounds: container, onDrag: updateClipPath });
```

---

## C14 — Cases · Verticais (3D)

| Protagonista | `VerticalTotems3D` ×5 |
| Pin | 220vh |

| Progress | Ação |
|----------|------|
| 0.00 | Totens emergem wipe C13 |
| 0.40 | Hover vertical destaca case |
| 1.00 | Métricas voam centro → C15 |

---

## C15 — Social Proof · Agregação (LOOP + LIVE)

| Protagonista | `NV11-VID-LOOP-015` + stats count-up |
| Pin | 180vh |

| Progress | Ação |
|----------|------|
| 0.00 | Stats orbitam |
| 0.50 | Count-up 500+ / 98% / etc |
| 1.00 | Formam anel → C16 |

**Nota:** Única cena LOOP como protagonista ambiente (10% target).

---

## C16 — Integrações · Nexus (3D)

| Protagonista | `IntegrationNexus3D` |
| Pin | 220vh |

| Progress | Ação |
|----------|------|
| 0.00 | Anel C15 vira órbita |
| 0.50 | 8 integrações orbitam |
| 1.00 | Zoom core → C17 |

---

## C17 — Agência · Portal (3D)

| Protagonista | `AgencyPortal3D` |
| Pin | 240vh |

| Progress | Ação |
|----------|------|
| 0.00 | Core C16 vira portal |
| 0.50 | Iris abre, tenants grid |
| 1.00 | Portal abre sala → C18 |

---

## C18 — Planos · Monólitos (3D)

| Protagonista | `PricingMonoliths3D` ×3 |
| Pin | 260vh |

| Progress | Ação |
|----------|------|
| 0.00 | 3 monólitos emergem |
| 0.40 | Hover destaca Pro |
| 0.80 | Feature list stagger |
| 1.00 | Dissolve partículas → C19 |

```js
gsap.to(monoliths, {
  opacity: 0, scale: 0.8, filter: "blur(8px)",
  scrollTrigger: { start: "bottom 30%", end: "bottom top", scrub: 0.5 },
});
```

---

## C19 — CTA · Convergência (F2F)

| Protagonista | `NV11-F2F-004` + CTA LIVE |
| Pin | 300vh |

| Progress | Ação |
|----------|------|
| 0.00 | Partículas C18 |
| 0.50 | Convergência owl luz |
| 0.85 | CTA buttons scale in |
| 1.00 | Hold + loop suave |

---

## Performance budget

| Métrica | Limite |
|---------|--------|
| ScrollTriggers ativos | ≤ 3 pinned simultâneos |
| Canvas F2F | pause off-screen (`IntersectionObserver`) |
| 3D layers | ≤ 2 canvases WebGL visíveis |
| `will-change` | apenas durante pin |
| Mobile | F2F → poster + CSS; 3D → versão lite |

---

## Checklist animação

- [ ] Timeline documentada 19/19 cenas
- [ ] Pin heights somam ~4200vh narrativa
- [ ] Handoffs sincronizados com continuity chain
- [ ] `prefers-reduced-motion` fallback por cena
- [ ] SplitText apenas headlines (não body)
