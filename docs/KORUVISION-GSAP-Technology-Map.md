# KORUVISION v5 — Mapa GSAP · Tecnologia por Seção

> Onde cada plugin é **protagonista** · timelines · triggers · regras

---

## Arquitetura global

```
ScrollSmoother (#smooth-wrapper) — desktop only, lerp 0.08
└── masterTimeline (scrub: body, labels S01–S19)
    ├── dataRiverTL → DrawSVG #riverGlobalPath
    ├── atmosphereTL → fog parallax factors
    └── sections[]
        ├── sectionTL (per pin)
        │   ├── bridgeInTL (overlap previous)
        │   ├── buildTL
        │   ├── peakTL (freeze + explore)
        │   └── exitTL → bridgeOutTL
        └── s04 nested: actTL[0..4] × 5
```

**Register:** `lib/gsap/register.ts`
```js
gsap.registerPlugin(
  ScrollTrigger, ScrollSmoother, Flip, MorphSVG,
  DrawSVGPlugin, MotionPathPlugin, SplitText, Observer, Draggable
);
```

---

## Matriz plugin × seção × elemento

| Seção | ScrollTrigger | ScrollSmoother | Flip | MorphSVG | DrawSVG | MotionPath | SplitText | Observer | Draggable |
|-------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Global** | ● master | ● desktop | — | — | ● river | — | — | ● pause offscreen | — |
| **S01** | ● pin 360vh | ● | — | ○ shockwave | ○ river seg | — | ● headline | ● device tilt | — |
| **S02** | ● pin 240vh | ● | ○ prep S03 | ● pain icons | — | — | — | — | — |
| **S03** | ● pin 320vh | ● | ● cards→pillars | ● X→✓ | ○ tunnel | — | — | ○ tunnel parallax | — |
| **S04** | ● pin 480vh | ○ off | ● chip→agent | ○ bubble | ● steps | ● kanban card | — | ● peak explore | — |
| **S05** | ● pin 280vh | ● | — | — | ● QR scan | — | ● nums 01-03 | — | — |
| **S06** | ● horiz 260H | ● | — | — | — | — | — | ○ pause gallery | ● toggle drag |
| **S07** | ● pin 240vh | ● | — | — | — | ● callouts | — | ○ col hover | — |
| **S08** | ● pin 260vh | ● | — | — | ○ sparkline | ● deal card | — | ○ col magnetic | ○ drag ghost |
| **S09** | ● pin 240vh | ● | — | ○ node expand | ● workflow | ● particles | — | ● node hover | — |
| **S10** | ○ batch enter | ● | ● agência card | — | ○ filaments | — | — | — | — |
| **S11** | ● pin 240vh | ● | — | — | — | — | — | — | ● slider |
| **S12** | ● horiz 300H | ● | — | — | — | — | — | ○ card depth | — |
| **S13** | ○ counter | ● | — | — | ● sparkline | — | — | ○ marquee pause | — |
| **S14** | ● pin 220vh | ● | — | — | ○ rings | ● orbit logos | — | ● orbit drag | — |
| **S15** | ● pin 260vh | ● | ● portal fullscreen | ● portal iris | — | — | — | ● tenant hover | — |
| **S16** | ○ scrub | ● | — | ● shield close | ● hex+shield | — | — | — | — |
| **S17** | ○ stagger | ● | ● price toggle | — | — | — | — | — | — |
| **S18** | ○ accordion | ● | — | — | — | — | — | — | — |
| **S19** | ● pin 320vh | ● | — | ● shockwave | ● river 100% | — | ● headline | ● CTA magnetic | — |

● protagonista · ○ secundário · — off

---

## Timelines detalhadas (pinned sections)

### S01 — `tlS01`

```js
tlS01
  .addLabel('bridge', 0)
  .addLabel('build', 0.12)
  .fromTo('.s01-void', { opacity: 0 }, { opacity: 1, duration: 0.15 }, 'build')
  .from('.word', { y: 30, opacity: 0, stagger: 0.04, ease: 'power4.out' }, 'build+=0.02')
  .from('.s01-device', { y: 60, scale: 0.85, ease: 'power3.out' }, 'build+=0.08')
  .addLabel('peak', 0.48)
  .addLabel('hold', 0.72)
  .to('.s01-device', { scale: 0.94, filter: 'hue-rotate(-8deg)' }, 'hold') // danger prep
  .to('.s01-void', { boxShadow: 'inset 0 0 120px rgba(255,77,106,0.15)' }, 'hold');
```

**ScrollTrigger:** trigger `#s01-pin` · end `+=360%` · scrub 1.2 · snap `{ peak: 0.6 }`

### S03 — `tlS03` (Flip protagonista)

```js
Flip.fit('.pain-card', '.pillar-card', { duration: 0, absolute: true }); // init map
// on scroll progress 0.35:
Flip.from(state, { duration: 1, ease: 'power2.inOut', scale: true });
MorphSVG.convertToPath('#icon-x', '#icon-check');
gsap.to('#icon-path', { morphSVG: '#check-path', duration: 0.6 });
```

### S04 — nested (referência demo/s04.js)

5× `actTL[i]` com CAM_CONFIGS interpolation · MotionPath kanban · PEAK explore Observer.

### S11 — Draggable + F2F sync

```js
Draggable.create(handle, {
  type: 'x', bounds: sliderWrap,
  onDrag: () => {
    const p = this.x / maxX;
    f2fScrubber.seek(p);
    gsap.set('.after-panel', { clipPath: `inset(0 ${100-p*100}% 0 0)` });
  }
});
```

---

## ScrollSmoother config

```js
ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.2,
  effects: true, // data-speed on layers
  normalizeScroll: true,
  ignoreMobileResize: true
});
// data-speed="-0.2" fog · "0.4" floats · "1" copy
```

**Mobile:** disabled · native scroll · pin scrub ×0.6

---

## Observer patterns

| Uso | Config |
|-----|--------|
| S01 device tilt | `type: wheel,touch` · max ±8° rotateX/Y |
| S04 peak explore | enable when `phase==='peak'` · disable on exit |
| S14 orbit speed | `deltaX * 0.002` added to orbit angle |
| Global offscreen | pause video/F2F when section progress <0.05 or >0.95 |

---

## matchMedia tiers

```js
ScrollTrigger.matchMedia({
  '(min-width: 1024px)': () => { /* full plugins */ },
  '(min-width: 768px)': () => { /* no Smoother, reduced F2F */ },
  '(max-width: 767px)': () => { /* MP4 chapters, no Observer */ }
});
```

---

## Easing library (não usar defaults)

| Contexto | Easing |
|----------|--------|
| UI enter | `power3.out` |
| Headline SplitText | `power4.out` |
| Flip morph | `power2.inOut` |
| Elastic delight | `elastic.out(1, 0.55)` — max 1× per section |
| Exit transform | `power2.in` |
| Scroll snap | `power1.inOut` |
| Counters | `power2.out` |

**Proibido:** `linear` except horizontal scrub tracks · `bounce` anywhere

---

## Snap configuration (PEAK only)

```js
ScrollTrigger.create({
  snap: {
    snapTo: (value) => {
      const peaks = [0.12, 0.28, 0.44, 0.60, 0.76]; // S04 five acts mapped
      return peaks.reduce((a, b) => Math.abs(b - value) < Math.abs(a - value) ? b : a);
    },
    duration: { min: 0.15, max: 0.35 },
    delay: 0.05,
    ease: 'power1.inOut'
  }
});
```

---

*Implementação target: Next.js 15 · `lib/gsap/master-timeline.ts`*
