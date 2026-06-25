# NV11 — Especificações SVG Animados

> **Regra:** SVGs são **camadas de suporte** ou **protagonistas híbridos** (com 3D/LIVE).  
> **Stack:** SVG inline React + GSAP (DrawSVG, MorphSVG, MotionPath)  
> **Output:** `components/svg/nv11/` ou inline em cena

---

## Tokens SVG globais

```css
--svg-stroke-primary: #8B5CF6;
--svg-stroke-gold: #FFC233;
--svg-stroke-cyan: #2EE8C0;
--svg-stroke-danger: #FF4D6A;
--svg-glow: drop-shadow(0 0 8px rgba(139,92,246,0.6));
--svg-stroke-width: 1.5;
--svg-stroke-width-thick: 2.5;
```

---

## NV11-SVG-001 — Spine Global (todas as cenas)
**Arquivo:** `GlobalJourneySpine.tsx`  
**Tipo:** Path contínuo vertical  
**Protagonista:** Não — conecta narrativa

### Paths
```
M 50% 0 Q 52% 8% 48% 16% T 50% 32% T 52% 48% T 48% 64% T 50% 80% T 50% 100%
```
- `viewBox="0 0 100 100"` preserveAspectRatio="none"
- Stroke: gradient violet→gold vertical
- `stroke-dasharray: 2000; stroke-dashoffset` animado por `--journey-p`

### GSAP
```js
gsap.to(spine, { strokeDashoffset: 0, ease: "none", scrollTrigger: { scrub: PREMIUM_SCRUB } });
```

---

## NV11-SVG-002 — C01 Hero: Partículas orbitais
**Arquivo:** `HeroOrbitalParticles.tsx`  
**Protagonista:** Suporte do Núcleo 3D

### Estrutura
- 24 círculos `r="2"` em paths circulares concêntricos (raios 120, 160, 200px)
- Classes: `.orbital-particle` com `data-orbit="1|2|3"`

### GSAP + mouse
```js
// Rotação base
gsap.to(".orbit-ring-1", { rotation: 360, duration: 40, repeat: -1, ease: "none" });
// Mouse parallax
gsap.to(particles, { x: mouseX * 0.04, y: mouseY * 0.04, stagger: 0.02 });
```

---

## NV11-SVG-003 — C01 Hero: Anel iris chrome
**Arquivo:** `HeroIrisRing.tsx`  
**Protagonista:** Híbrido com 3D core

### Path (anel mecânico)
```
M 200 100 A 80 80 0 1 1 199.9 100
```
- Segmentos: 12 arcos com gaps (mecânico)
- Stroke gold `#FFC233`, fill none
- Inner glow filter `feGaussianBlur`

### Animação
- `DrawSVG` reveal no mount (1.2s)
- Hover: `scale 1.02`, stroke brightness +20%
- Scroll 0–0.3: rotação 0→15deg

---

## NV11-SVG-004 — C02 Coruja: Tunnel mask
**Arquivo:** `VisionTunnelMask.tsx`  
**Protagonista:** Transição C02→C03

### Estrutura
- `<radialGradient>` pupila center
- `<circle id="tunnel"` r animável 0→45% viewport

### GSAP (scrub C02 final)
```js
gsap.fromTo(tunnel, { attr: { r: "5%" } }, { attr: { r: "45%" }, scrollTrigger: { start: "bottom 80%", end: "bottom top", scrub: true } });
```

---

## NV11-SVG-005 — C03 Problema: Fragmentos caóticos
**Arquivo:** `ProblemFragments.tsx`  
**Protagonista:** Híbrido (12 shards SVG + 3D depth)

### Paths (12 polígonos irregulares)
- `shard-1` … `shard-12`: paths `M...L...Z` glass shard shapes
- Fill: `rgba(255,77,106,0.15)` stroke `#FF4D6A`

### GSAP
```js
// Entrada caótica
gsap.from(shards, { x: () => random(-200,200), y: () => random(-100,100), rotation: () => random(-45,45), opacity: 0, stagger: 0.05, scrollTrigger: { scrub: 0.5 } });
// Saída: convergência centro (handoff C04)
gsap.to(shards, { x: 0, y: 0, scale: 0.3, scrollTrigger: { start: "center center", end: "bottom top", scrub: true } });
```

---

## NV11-SVG-006 — C04 Pilares: Energy columns
**Arquivo:** `PillarEnergyColumns.tsx`  
**Protagonista:** Suporte 3D pilares

### 4 retângulos verticais com gradient animado
```svg
<linearGradient id="pillarGrad" y2="1">
  <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0"/>
  <stop offset="50%" stop-color="#8B5CF6" stop-opacity="0.8"/>
  <stop offset="100%" stop-color="#FFC233" stop-opacity="0.4"/>
</linearGradient>
```

### GSAP
- `y` oscillation ±8px, stagger 0.15, `repeat: -1`, `yoyo: true`, duration 2.5
- Scroll: pillars `scaleY` 0→1 com `ease: power2.out`

---

## NV11-SVG-007 — C06 Setup: Portal rings
**Arquivo:** `SetupPortalRings.tsx`  
**Protagonista:** Híbrido 3D portais

### 3 ellipses isométricas
```
<ellipse cx="50%" cy="40%" rx="120" ry="40" /> <!-- back -->
<ellipse cx="50%" cy="55%" rx="160" ry="52" /> <!-- mid -->
<ellipse cx="50%" cy="72%" rx="200" ry="65" /> <!-- front -->
```
- Stroke cyan `#2EE8C0`, dash animated

### GSAP DrawSVG + pulse
```js
gsap.fromTo(rings, { drawSVG: "0%" }, { drawSVG: "100%", stagger: 0.3, scrollTrigger: { scrub: 0.8 } });
```

---

## NV11-SVG-008 — C07 IA: Neural mesh
**Arquivo:** `NeuralMesh.tsx`  
**Protagonista:** Suporte cérebro 3D

### Estrutura
- 40 nodes `<circle r="4">`
- 60 lines connecting nearest neighbors
- Class `.synapse-line`

### GSAP
```js
// Pulso via stroke-dashoffset
gsap.to(".synapse-line", { strokeDashoffset: -20, duration: 1.2, repeat: -1, stagger: { each: 0.05, from: "random" } });
// Node ativo no hover
nodes.forEach(n => n.addEventListener("mouseenter", () => gsap.to(n, { attr: { r: 8 }, fill: "#FFC233" })));
```

---

## NV11-SVG-009 — C08 Inbox: Message streams
**Arquivo:** `InboxMessageStreams.tsx`

### 6 paths curvos horizontais
```
M 0 50 Q 100 30 200 50 T 400 50
```
- Stroke teal, `stroke-dasharray: 8 12`

### GSAP MotionPath
```js
gsap.to(".msg-dot", { motionPath: { path: ".stream-path", align: path, autoRotate: false }, duration: 3, repeat: -1, stagger: 0.4 });
```

---

## NV11-SVG-010 — C09 Funil: Gravity paths
**Arquivo:** `FunnelGravityPaths.tsx`  
**Protagonista:** Suporte pipeline 3D

### 5 paths verticais convergindo
- Stage labels via DOM (não SVG text)
- Orbs `<circle>` em MotionPath por estágio

### GSAP
```js
// Deal orb desce estágios com scrub
const tl = gsap.timeline({ scrollTrigger: { scrub: PREMIUM_SCRUB } });
stages.forEach((path, i) => tl.to(orb, { motionPath: { path }, duration: 1 }));
```

---

## NV11-SVG-011 — C10 Automações: Synapse web
**Arquivo:** `AutomationSynapseWeb.tsx`  
**Protagonista:** Híbrido

### MorphSVG entre estados
- `state-idle`: rede esparsa
- `state-active`: rede densa com loops

```js
gsap.to(web, { morphSVG: "#state-active", duration: 0.8, scrollTrigger: { scrub: 0.5 } });
```

---

## NV11-SVG-012 — C11 Analytics: Chart wireframe
**Arquivo:** `AnalyticsChartWire.tsx`  
**Protagonista:** Suporte F2F

### Elementos
- 8 barras `<rect>` altura animável
- 1 path linha `<path d="M...">` para DrawSVG

### GSAP (sync F2F progress)
```js
ScrollTrigger.create({
  onUpdate: (self) => {
    const p = self.progress;
    bars.forEach((bar, i) => gsap.set(bar, { attr: { height: p * heights[i] } }));
    gsap.set(line, { drawSVG: `${p * 100}%` });
  }
});
```

---

## NV11-SVG-013 — C12 Benefícios: Constellation map
**Arquivo:** `BenefitsConstellation.tsx`  
**Protagonista:** Híbrido 3D estrelas

### 8 estrelas + linhas conectando
- Posições mapeadas para benefícios copy

### Interação
- Hover estrela: linhas conectadas `stroke-width` 1.5→3, glow gold

---

## NV11-SVG-014 — C13 Antes/Depois: Split line
**Arquivo:** `BeforeAfterSplitLine.tsx`  
**Protagonista:** UI do slider

### Path vertical divisória
```
M 50% 0 L 50% 100%
```
- `stroke: url(#splitGrad)` gold→cyan
- Handle circle draggable (GSAP Draggable)

---

## NV11-SVG-015 — C16 Integrações: Orbit paths
**Arquivo:** `IntegrationsOrbitPaths.tsx`

### 3 ellipses orbitais + 8 ícones posicionados
```js
gsap.to(icons, { motionPath: { path: ".orbit-path" }, duration: 20, repeat: -1, stagger: 2.5 });
```

---

## NV11-SVG-016 — C17 Agência: Portal iris
**Arquivo:** `AgencyPortalIris.tsx`  
**Protagonista:** Híbrido portal 3D

### 8 segmentos iris
- MorphSVG fechado→aberto com scroll
```js
gsap.fromTo(iris, { morphSVG: "#iris-closed" }, { morphSVG: "#iris-open", scrollTrigger: { scrub: 1 } });
```

---

## NV11-SVG-017 — C18 Planos: Decision paths
**Arquivo:** `PlansDecisionPaths.tsx`

### 3 paths convergindo para centro
- DrawSVG sequencial ao hover card pricing

---

## NV11-SVG-018 — C19 CTA: Convergence rays
**Arquivo:** `CtaConvergenceRays.tsx`

### 12 raios radiais
```js
gsap.from(rays, { drawSVG: 0, opacity: 0, stagger: 0.08, scrollTrigger: { trigger: section, start: "top 60%" } });
gsap.to(rays, { rotation: 360, duration: 120, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
```

---

## Checklist SVG

- [ ] 18 componentes SVG especificados
- [ ] Nenhum `<text>` legível em SVG (copy via DOM)
- [ ] DrawSVG/MorphSVG/MotionPath mapeados por cena
- [ ] Fallback: SVG estático se `prefers-reduced-motion`
