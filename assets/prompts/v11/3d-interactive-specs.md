# NV11 — Especificações 3D Interativos

> **Stack recomendada:** CSS 3D transforms + layers PNG/WebGL leve (React Three Fiber opcional C01/C05)  
> **Regra:** 70% das cenas = protagonista 3D interativo  
> **Fallback mobile:** poster estático + micro-animação CSS + touch tilt reduzido

---

## Arquitetura componente 3D

```
components/3d/nv11/
├── KoruVisionCore.tsx          # C01 Hero
├── ChaosFragmentField.tsx      # C03
├── FourPillars3D.tsx           # C04
├── OnboardingPortals3D.tsx     # C06
├── NeuralBrainHub3D.tsx        # C07
├── InboxCommand3D.tsx          # C08
├── SalesPipeline3D.tsx         # C09
├── AutomationSynapse3D.tsx     # C10
├── BenefitsConstellation3D.tsx # C12
├── BeforeAfterSplit3D.tsx      # C13
├── VerticalTotems3D.tsx        # C14
├── IntegrationNexus3D.tsx      # C16
├── AgencyPortal3D.tsx          # C17
└── PricingMonoliths3D.tsx      # C18
```

### Hook compartilhado: `usePointerParallax`
```ts
interface PointerParallaxOptions {
  maxTiltX: number;  // deg
  maxTiltY: number;
  depthLayers: { selector: string; z: number; multiplier: number }[];
  smooth: number;    // 0.06–0.12
}
```

---

## C01 — KoruVisionCore ★ HERO

| Campo | Spec |
|-------|------|
| Tipo | HYB 3D + F2F overlay |
| Camadas (back→front) | BG aurora · partículas SVG · core orb PNG · iris ring SVG · filamentos 3D · CRM hologram DOM · cursor particles |
| Interação mouse | tilt ±12°, parallax Z nas camadas, partículas seguem cursor com lag 0.08s |
| Interação scroll | CRM emerge Y+120px, core scale 1→0.85, F2F scrub 0→1 |
| Luz dinâmica | CSS `radial-gradient` segue cursor (`--light-x`, `--light-y`) |
| Reflexos | `mix-blend-mode: screen` overlay gold 8% opacity |

### Camadas depth
| Layer | z-index | z-transform | mouse mult |
|-------|---------|-------------|------------|
| Aurora BG | 0 | 0 | 0 |
| Particles SVG | 1 | 20px | 0.02 |
| Core orb | 2 | 60px | 0.06 |
| Iris ring | 3 | 80px | 0.08 |
| Filamentos | 4 | 100px | 0.10 |
| CRM hologram | 5 | 140px | 0.04 |

### Assets
- `nv11-png-001-core-orb.png`
- `nv11-png-002-iris-ring.png`
- `NV11-F2F-000` (opcional overlay)

### Mobile fallback
- Tilt via `deviceorientation` ±6°
- Sem F2F: poster `nv11-img-001` + CSS pulse core

---

## C03 — ChaosFragmentField

| Campo | Spec |
|-------|------|
| Elementos | 12 shards glass 3D (CSS `preserve-3d`) |
| Interação | Mouse repulsão: shards fogem do cursor (radius 120px) |
| Scroll | Entrada explosão → saída convergência 4 clusters |
| Cor | Danger `#FF4D6A` rim |

```js
shards.forEach(s => {
  const dist = distance(mouse, s.center);
  if (dist < 120) gsap.to(s, { x: pushX, y: pushY, z: 40, duration: 0.4 });
});
```

---

## C04 — FourPillars3D

| Campo | Spec |
|-------|------|
| Elementos | 4 colunas isométricas glass |
| Interação | Hover pilar: glow + label benefício |
| Scroll | Flip morph C03 clusters → pilares; zoom final pilar 2 |
| Profundidade | `rotateX(55deg) rotateZ(-45deg)` scene |

---

## C06 — OnboardingPortals3D

| Campo | Spec |
|-------|------|
| Elementos | 3 anéis portal em profundidade Z |
| Interação | Hover portal: energia teal intensifica |
| Scroll | Portais ativam sequencial 1→2→3 |
| Handoff | Portal central dispara partícula → C07 |

---

## C07 — NeuralBrainHub3D

| Campo | Spec |
|-------|------|
| Elementos | Hub central + 4 agentes orbitais + 20 synapse lines |
| Interação | Hover agente: card info + synapse pulse |
| Scroll | Cérebro acende progressivo |
| Handoff | Node WhatsApp scale 1→3 fullscreen |

### Agentes
| Agente | Cor accent | Órbita |
|--------|------------|--------|
| SDR IA | `#8B5CF6` | 0° |
| Closer | `#FFC233` | 90° |
| Suporte | `#2EE8C0` | 180° |
| Analytics | `#E8ECF8` | 270° |

---

## C08 — InboxCommand3D

| Campo | Spec |
|-------|------|
| Elementos | Painel inbox 3D inclinado + 3 canais flutuantes |
| Interação | Hover canal: mensagens preview |
| LIVE | Thread Maria atualiza (mock timer) |
| Handoff | Deal card translateX → C09 |

---

## C09 — SalesPipeline3D ★

| Campo | Spec |
|-------|------|
| Elementos | 5 estágios isométricos + deal card "Maria S. R$ 2.400" |
| Interação | Hover estágio: deals count |
| Scroll | Card desce estágios via MotionPath |
| Visual | Gold pulse ao fechar |

### Estágios
1. Lead · 2. Qualificação · 3. Proposta · 4. Negociação · 5. Fechado

---

## C10 — AutomationSynapse3D

| Campo | Spec |
|-------|------|
| Elementos | 5 nodes workflow + conexões curvas 3D |
| Interação | Hover node: trigger animação pulso downstream |
| Scroll | Fluxo acende sequencial |
| Handoff | Todos nodes convergem ponto central |

---

## C12 — BenefitsConstellation3D

| Campo | Spec |
|-------|------|
| Elementos | 8 estrelas 3D + linhas constelação |
| Interação | Hover estrela: benefício expand |
| Scroll | Estrelas emergem posições KPI C11 |
| Handoff | Split hemisférios |

---

## C13 — BeforeAfterSplit3D

| Campo | Spec |
|-------|------|
| Elementos | Duas metades scene 3D + slider handle |
| Interação | Draggable split + auto drift scroll |
| Esquerda | Caos vermelho, fragmentos |
| Direita | Ordem teal, fluxos organizados |

---

## C14 — VerticalTotems3D

| Campo | Spec |
|-------|------|
| Elementos | 5 totens verticais (Saúde, E-commerce, Imob, Consultoria, Agência) |
| Interação | Hover: totem scale 1.08 + case metrics |
| Scroll | Emergem stagger da direita |
| Handoff | Métricas voam para centro |

---

## C16 — IntegrationNexus3D

| Campo | Spec |
|-------|------|
| Elementos | Core CRM + 8 ícones orbitais |
| Interação | Hover ícone: linha energia ao core |
| Scroll | Órbita acelera com progress |
| Ícones | WhatsApp, Instagram, Email, Zapier, Webhook, Sheets, Calendar, API |

---

## C17 — AgencyPortal3D

| Campo | Spec |
|-------|------|
| Elementos | Portal iris 8 segmentos + grid tenants |
| Interação | Hover tenant: preview white-label |
| Scroll | Iris abre 0→100% |
| Handoff | Portal revela sala planos |

---

## C18 — PricingMonoliths3D

| Campo | Spec |
|-------|------|
| Elementos | 3 monólitos glass (Starter, Pro, Enterprise) |
| Interação | Hover: monólito forward Z+60px, glow gold |
| Scroll | Pro destaca scale 1.05 aos 40% |
| Handoff | Dissolve partículas |

### Dimensões monólito
| Plano | Altura rel | Accent |
|-------|------------|--------|
| Starter | 0.75 | `#8B5CF6` |
| Pro | 1.00 | `#FFC233` |
| Enterprise | 0.90 | `#2EE8C0` |

---

## Padrões de interação (todos 3D)

### Mouse
```ts
onPointerMove(e) {
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.quickTo(scene, "rotationY", { duration: 0.5 });
  scene.rotationY = x * maxTiltY;
  scene.rotationX = -y * maxTiltX;
}
```

### Hover depth
```css
.interactive-3d:hover .layer-mid { transform: translateZ(30px); }
.interactive-3d:hover .layer-front { transform: translateZ(60px); }
```

### Scroll scrub
- Sempre via `ScrollTrigger` + `scrub: PREMIUM_SCRUB`
- Nunca `toggleActions` para protagonista

### Luz dinâmica
```css
.scene-3d::after {
  background: radial-gradient(circle at var(--lx) var(--ly), rgba(255,194,51,0.12), transparent 60%);
}
```

---

## Fallbacks

| Condição | Comportamento |
|----------|---------------|
| `prefers-reduced-motion` | Poster + fade copy only |
| Mobile `< 768px` | Lite 3D (2 layers), no F2F |
| Low GPU | `navigator.hardwareConcurrency < 4` → CSS only |
| WebGL fail | PNG poster + SVG overlay |

---

## Checklist 3D

- [ ] 13 componentes 3D especificados
- [ ] Mouse + scroll em todos
- [ ] Handoffs alinhados continuity chain
- [ ] Mobile lite definido
- [ ] Performance: ≤ 2 WebGL contexts
