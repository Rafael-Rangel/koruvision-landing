# KORUVISION FlowIA — Auditoria Crítica v5
## Revisão Senior · Motion · UX · Creative Direction · Scroll Experience

> **Escopo:** Documentação v5 + protótipo `demo/index.html` + `demo/s04.html`  
> **Metodologia:** Gap analysis plano vs implementação vs padrão premium internacional  
> **Veredito geral:** Narrativa e S04 estão acima da média; **a landing como sistema ainda opera em ~55–60% do potencial planejado**. O risco principal não é falta de efeitos — é **homogeneização motion**, **quebras de continuidade** e **ritmo de scroll excessivo**.

---

# SCORECARD EXECUTIVO

| Dimensão | Plano v5 | Protótipo atual | Gap |
|----------|----------|-----------------|-----|
| Narrativa macro (5 atos) | 9/10 | 7/10 | Transições S02→S03, S04→S05 |
| Continuidade visual | 9/10 | 4/10 | Device/void/river não persistem |
| Motion identity (19 seções) | 9/10 | 3/10 | Mesmo `elementState` em quase tudo |
| Momento PEAK | 10/10 regra | 5/10 impl | PEAK real só no S04 |
| Profundidade multicamadas | 8/10 | 4/10 | Stack 10 camadas só no S04 |
| Fluidez entre seções | 9/10 | 3/10 | Cortes secos pin→pin |
| Scroll experience | 8/10 | 5/10 | ~4.600vh pin, sem Smoother |
| Interação / hover | 8/10 | 4/10 | Magnetic parcial; tilt ausente |
| Legibilidade / hierarquia | 8/10 | 7/10 | OK em copy; stage compete em S04 |
| Performance readiness | 7/10 | 6/10 | getBoundingClientRect no scrub |

**Nota holística protótipo:** 5.8/10 — excelente esqueleto, insuficiente para produção premium.

---

# I. QUEBRAS DE NARRATIVA (CRÍTICO)

## 1.1 Atos emocionais vs ritmo real

| Ato | Planejado | Problema |
|-----|-----------|----------|
| I Emergência S01–S02 | Curiosidade → tensão | S01 EXIT sem danger-fog; river muda cor cedo demais (8–18% scroll global) |
| II Revelação S03–S04 | Alívio → desejo | **S03 não faz Flip dos cards S02** — pilares são DOM novo, quebra promessa |
| III Maestria S05–S11 | Controle | **7 pins consecutivos** após S04 (620vh) — fadiga antes de prova social |
| IV Prova S12–S16 | Validação | S10 constelação “solta” sem pin — queda de intensidade abrupta |
| V Decisão S17–S19 | Urgência | S18 FAQ sem motion — correto em tom, mas transição S17→S18 é corte seco |

## 1.2 Pontes visuais ausentes (must-fix)

| De → Para | Planejado | Atual | Severidade |
|-----------|-----------|-------|------------|
| S01 → S02 | Device encolhe + névoa vermelha invade bordas | Corte entre `#s01-pin` e `#s02-pin` | 🔴 |
| S02 → S03 | 4 cards Flip → 4 pilares | Cards desaparecem; pilares nascem do zero | 🔴 |
| S03 → S04 | Portal abre; device S01 = device S04 | Device S01 = placeholder bars; S04 = mockup completo | 🔴 |
| S04 → S05 | Pull-back câmera → monolitos | Fim S04 → início S05 sem handoff | 🟠 |
| S08 → S09 | Card voa → node workflow | Card some; nodes aparecem com fade | 🟠 |
| S14 → S15 | Core beam → portal agência | Órbita acelera mas sem morph | 🟠 |
| S16 → S17 | Escudo glow fade → pedestais planos | Seções estáticas adjacentes | 🟡 |
| S18 → S19 | Névoa dissipa → convergência | Pin S19 sem prep visual vindo do FAQ | 🟡 |

## 1.3 Fio condutor Data River

**Plano:** NV5-SVG-001 percorre S01→S19 com estados emocionais (violet → danger → heal → gold).

**Protótipo:**
- River global existe mas opacity 0.35 fixa
- Troca de gradiente em thresholds binários (`p < 0.08`, `p < 0.18`) — **artificial**
- River S04 interno (`#riverPath`) é path separado — **dois rios desconectados**
- Sem pulse no PEAK, sem segmentos por seção

**Refinamento:** Um único path com `stroke-dashoffset` global + `colorProps` interpolado + markers por seção.

---

# II. FLUIDEZ ENTRE SEÇÕES

## 2.1 Diagnóstico: “Pin wall”

Scroll pin total desktop (aprox.):

```
S01 400 + S02 280 + S03 350 + S04 620 + S05 360 + S06 300 +
S07 280 + S08 320 + S09 300 + S11 280 + S12 350 + S14 280 +
S15 300 + S19 350 ≈ 4.770vh
```

Isso equivale a **~48 telas** de scroll pinned — acima do tolerável para landing comercial (referência premium: 25–35 telas max com respiros).

**Sintoma:** Trechos S05–S09 parecerão **lentos**; usuário perde noção de progresso. S04 sozinho (620vh) é hero dentro do hero — risco de abandono.

## 2.2 Cortes secos identificados

Cada `.pin-wrap` termina e o próximo começa com:
- Mesmo `background: void` sem interpolação
- Mesma tipografia/eyebrow entra do zero
- Nenhuma **transition zone** (80–120vh de overlap morph)

## 2.3 Regra proposta: Transition Bridges

Entre cada par de seções pinned, inserir **Bridge Zone** de 15–20% do pin anterior:

```
EXIT (últimos 28% local) → overlap com BUILD próximo (primeiros 20%)
Elemento compartilhado: device | river | fog | camera Y
```

Implementação alvo:
- `SectionHandoff.tsx` — recebe `fromSection`, `toSection`, `sharedRefs`
- GSAP timeline com `position: "<"` overlap

## 2.4 Continuidade cromática

| Seção | Cor dominante plano | Protótipo | Fix |
|-------|---------------------|-----------|-----|
| S01 | void + violet | OK | EXIT: `--danger-fog` bleed |
| S02 | danger-fog | radial gradient estático | Animar vignette com scroll |
| S03 | violet + cyan | OK parcial | River heal animado |
| S04–S11 | neural-cyan | Alterna sem sistema | `--section-accent` CSS var por seção |
| S19 | gold-liquid | shockwave fraco | Convergência gold no BG + river 100% |

---

# III. REFINAMENTO DE ANIMAÇÕES

## 3.1 Problema central: vocabulário único

**90% das seções S01–S03, S05–S09, S11, S14, S15, S19** usam:

```js
elementState(progress, enterLo, enterHi, exitLo, exitHi, { yIn, scaleIn })
```

Isso produz:
- Mesmo easing (smoothstep interno)
- Mesma hierarquia (stagger index * 0.08)
- Mesma sensação “template GSAP scroll”

**Viola** Motion Upgrade Analysis regra: *“0 seções adjacentes com mesmo protagonista”*.

## 3.2 Matriz de easing por seção (substituir defaults)

| Seção | Easing entrada | Easing saída | Protagonista |
|-------|----------------|--------------|--------------|
| S01 | `power4.out` palavras | `power2.inOut` device | SplitText + F2F |
| S02 | `back.out(1.2)` cards | `power3.in` compress | 3D drop + MorphSVG ícones |
| S03 | `expo.out` túnel | `power2.in` portal | Flip + MorphSVG |
| S04 | custom cubic beziers | morph crossfade | Nested TL (referência) |
| S05 | `sine.inOut` monolitos | `power2.out` unfold | DrawSVG QR |
| S06 | `none` horizontal | — | Draggable + chat TL |
| S07 | stagger `power2.out` cols | MotionPath retract | Orbit callouts |
| S08 | `elastic.out(1,0.6)` snap | `power3.in` lift | MotionPath + confetti |
| S09 | linear DrawSVG | pulse wave | DrawSVG + particles on path |
| S10 | `back.out` from center | Flip expand | batch radial |
| S11 | `power1.inOut` clip | auto-slide | Draggable |
| S12 | `power2.out` + parallax | blur lateral | horizontal dolly |
| S13 | `power2.out` counters | decel marquee | counter scrub |
| S14 | `sine.inOut` orbit | accelerate in | MotionPath 3D |
| S15 | Flip `ease: "power2.inOut"` | portal warp | Flip |
| S16 | linear DrawSVG | radial pulse | MorphSVG shield |
| S17 | `power3.out` rise | float subtle | Flip toggle |
| S18 | spring 280 stiffness | fade settle | accordion only |
| S19 | `expo.out` SplitText | shockwave expand | SplitText + F2F |

## 3.3 Tempos e scrub — calibragem

| Problema | Seção | Ajuste recomendado |
|----------|-------|-------------------|
| Rápido demais | S02 stat 78% completa em 40% do pin | Stat: 0.25→0.55 local; hold até 0.72 |
| Lento demais | S04 620vh | Reduzir para 480vh desktop; snap nos 5 PEAKs |
| Lento demais | S05–S09 sequência | Agrupar S07+S08 em **capítulo único** pin 400vh |
| Mecânico | S06 `gsap.from` + horizontal scrub conflitam | Remover `from`; só scrub horizontal |
| Jank | S08 fly card `getBoundingClientRect` every frame | Pré-calcular anchors; MotionPath plugin |
| Genérico | S10 `back.out(1.4)` | Stagger from center com delay radial |

## 3.4 Sobreposição de movimentos

**Regra 7 camadas de entrada** (ambiente → micro):

1. Void/fog BG (0–15% local)
2. Grid/river/atmosphere (10–25%)
3. Headline/eyebrow (15–35%)
4. Stage principal / device (25–48%)
5. Elementos secundários (35–48%)
6. CTAs / stats (45–48%)
7. Micro (hover-ready no PEAK)

**Protótipo:** headline + cards entram quase juntos (06–22% local) — usuário não sabe onde olhar.

---

# IV. MOMENTO DE CLAREZA MÁXIMA (PEAK)

## 4.1 Compliance audit

| Seção | PEAK 48–72% respeitado? | Problema |
|-------|-------------------------|----------|
| S04 | ✅ Sim | Referência — manter |
| S01 | ⚠️ Parcial | Palavras ainda em exit aos 78%; CTA não entra no PEAK |
| S02 | ⚠️ Parcial | Stat continua animando; cards iniciam exit cedo |
| S03 | ❌ Fraco | Túnel nunca estabiliza — scale contínuo com progress |
| S05 | ⚠️ | Monolito 3 entra tarde; QR ainda animando no PEAK |
| S06–S09 | ❌ | Sem fase PEAK explícita — motion contínuo linear |
| S10 | ❌ | Fire-and-forget on enter — zero hold |
| S11 | ✅ | Slider livre no PEAK — OK |
| S14 | ❌ | Satélites orbitam durante PEAK — legibilidade comprometida |
| S19 | ⚠️ | Shockwave anima durante PEAK |

## 4.2 Correção obrigatória

Toda seção pinned deve implementar:

```js
function onSectionUpdate(globalProgress) {
  const local = mapToLocal(globalProgress);
  const ph = phase(local); // build | peak | exit
  
  if (ph.name === 'peak') {
    freezePrimaryElements(); // opacity 1, transform stable
    enableExploreMode();     // hover only
  }
}
```

**Tempo mínimo PEAK:** equivalente a **1.2–1.8s de scroll** a velocidade média — hoje várias seções cruzam PEAK em <0.5s.

---

# V. SAÍDA DOS ELEMENTOS

## 5.1 Violações atuais

| Anti-pattern | Onde | Fix |
|--------------|------|-----|
| Opacity fade como saída principal | Todas via `elementState` exit | Max 25% opacity delta; priorizar transform |
| Saída simultânea | S02 cards exit 78–94% mesmo slot | Escalonar exit: card0 72%, card1 76%… |
| Desaparecimento sem destino | S08 fly card | MotionPath para node S09 |
| Crossfade opacity screens | S04 OK | Exportar padrão para S07 inbox cols |

## 5.2 Handoffs morph obrigatórios (Top 5 ROI)

1. **S02 card[0] → S03 pillar[0]** — Flip (WOW #1)
2. **S04 chip1 → S04 agentCard** — Flip (WOW S04 tier 1 pendente)
3. **S04 device → S05 portal center** — scale + translateZ pull-back
4. **S10 card Agência → S15 portal** — Flip fullscreen
5. **S08 deal card → S09 trigger node** — MotionPath + scale down

---

# VI. PROFUNDIDADE E IMERSÃO

## 6.1 Stack por seção — gap analysis

| Camada | S04 | S01 | S02–S19 resto |
|--------|-----|-----|---------------|
| L1 video | ○ CSS | ❌ | ❌ |
| L2 gsap | ✅ | ⚠️ | ⚠️ |
| L3 svg | ✅ | ○ river | ○ pontual |
| L4 particles | ○ orbs | ⚠️ canvas flat | ❌ |
| L5 parallax | ✅ | ❌ | ❌ |
| L6 3d | ✅ | ⚠️ device flat | ❌ |
| L7 mouse | ✅ peak | ○ glow | ○ glow |
| L8 hover | ✅ peak | ❌ | ❌ tilt |
| L9 motion | ✅ | ⚠️ | ⚠️ |
| L10 f2f | ❌ plano | ❌ | ❌ |

## 6.2 Oportunidades fake 3D (sem prejudicar legibilidade)

| Seção | Upgrade | Impacto |
|-------|---------|---------|
| S01 | Reusar `camera-rig` do S04; 6 layers; Observer tilt | 🔴 Alto |
| S02 | Cards `translateZ(-400→0)` real, não só rotateX hack | 🟠 |
| S05 | Monolitos passam câmera (`translateZ` sequencial) | 🟠 |
| S07 | 3 colunas inbox Z: -20, 0, +30 | 🟠 |
| S08 | Colunas kanban isometric `rotateX(55deg)` | 🟠 |
| S14 | `preserve-3d` ring container + parallax mouse | 🟠 |
| S19 | Pull-out: camera `translateZ` de S04 config final | 🔴 Alto |

## 6.3 Global atmosphere

Falta **AtmosphereLayer** persistente entre seções:
- Fog canvas único (2 velocidades)
- Grid floor perspectiva (opacity varia por seção, nunca desliga)
- Orbs compartilhados (max 4) migrando verticalmente com scroll

---

# VII. HARMONIA VISUAL

## 7.1 Fragmentação identitária

| Issue | Evidência |
|-------|-----------|
| Duas paletas | `koruvision.css` (#B24BFF) vs `s04.css` (#9D4EDD, #FFB700) |
| Device inconsistente | S01 placeholder ≠ S04 golden UI |
| Tipografia única | Inter everywhere — falta display para headlines (ex: Instrument, Syne) |
| Glass cards idênticos | Mesmo `glass-card` em 12 seções — monotonia |
| Emojis como ícones | S02, S10 — quebra premium; substituir por SVG NV5 |

## 7.2 Ritmo visual macro

```
Intensidade
10 |  S01    S03      S04==================          S19
 8 |      S02              S05 S06 S07 S08 S09
 6 |                              S11    S12 S14 S15
 4 |                    S10      S13          S16 S17 S18
   +--------------------------------------------------→ scroll
```

**Problema:** platô intenso S04–S09 sem vale narrativo.  
**Fix:** Inserir **respiro** pós-S04 (S05 unpinned ou 180vh), comprimir S06–S08 em capítulo.

---

# VIII. EXPERIÊNCIA DE ROLAGEM

## 8.1 Missing premium stack

| Técnica | Status | Prioridade |
|---------|--------|------------|
| ScrollSmoother desktop | ❌ | P0 |
| Master timeline labels | ❌ | P0 |
| ScrollTrigger.matchMedia 3 tiers | ❌ | P0 |
| Snap nos PEAKs (S04, S03) | ❌ | P1 |
| Section progress indicator | ⚠️ ring só S04 | P1 — global |
| Scroll velocity dampening | ❌ | P2 |
| F2F scrub (16 seq planeadas) | ❌ | P1 pós-assets |

## 8.2 Scroll storytelling gaps

- Nav `scrollIntoView` nativo — sem offset, sem easing premium → usar ScrollToPlugin
- Sem indicador de capítulo (01/19)
- S04 progress ring não conversa com progresso global

## 8.3 Hover systems

| Componente | Plano | Protótipo |
|------------|-------|-----------|
| MagneticButton | Global CTAs | S01, S17, S19 parcial |
| TiltCard | S02, S10, S12, S17 | ❌ |
| DepthHover | S04, S07 | S04 peak only |
| LiveGraph | S04, S08, S13 | S04 bars only |
| OrbitZoom | S14 | ❌ |

---

# IX. SEÇÃO POR SEÇÃO — NOTAS CRÍTICAS

## S01 Hero — 6/10
- ❌ Sem F2F portal, sem video L1, sem Observer tilt
- ❌ EXIT não prepara S02 (danger-fog)
- ❌ Device não é o golden mockup
- ✅ SplitText palavras funcional

## S02 Névoa Vermelha — 5.5/10
- ❌ Sem F2F micro-cenas, sem MorphSVG ícones
- ❌ Sem TiltCard hover vermelho
- ⚠️ Stat compete com cards (hierarquia)

## S03 Bridge — 5/10
- ❌ **Flip S02→S03 ausente** — falha narrativa central
- ❌ Túnel scale linear = motion contínuo, sem PEAK
- ⚠️ Pilares em grid 2×2 — plano pedia cantos + túnel central

## S04 Demo — 8.5/10
- ✅ Melhor seção — manter como master reference
- ⚠️ Flip chip→agent pendente
- ⚠️ Sem snap PEAK labels
- ⚠️ 620vh — reduzir

## S05–S09 Produto — 4.5/10 média
- Repetição pattern; falta motion identity
- S06 toggle não altera chat (sem prova)
- S09 nodes não conectados ao path fisicamente

## S10 Constelação — 4/10
- Entrada genérica; sem pin; sem Flip Agência

## S11 Linha — 6.5/10
- Slider OK; falta Draggable plugin + inertia
- Tabela comparativa estática

## S12–S16 Prova — 5.5/10 média
- Horizontal OK mas sem snap center card
- S14 satélites ilegíveis em movimento contínuo
- S15 sem Flip portal

## S17–S18 Conversão — 6/10
- Pricing OK racional; Flip toggle quebra `/mês`
- FAQ spring stiffness não calibrada

## S19 Convergência — 6.5/10
- Falta eco visual S01 (mesmo corridor wide)
- Sem F2F pull-out; shockwave fraco

---

# X. PLANO DE REFINAMENTO — PRIORIDADE EXECUTIVA

## P0 — Bloqueadores antes da versão final

| # | Ação | Esforço | Impacto |
|---|------|---------|---------|
| 1 | Unificar tokens visuais (s04.css → v5) | 2h | Harmonia |
| 2 | Device golden único S01=S04 (React UI) | 1d | Continuidade |
| 3 | Flip S02→S03 | 1d | WOW narrativo |
| 4 | Section Handoff system (3 pontes: S01→02, S03→04, S04→05) | 2d | Fluidez |
| 5 | Implementar PEAK freeze em todas pins | 1d | Legibilidade |
| 6 | Reduzir pin total para ~3.200vh (-33%) | 4h | Ritmo |
| 7 | Master timeline + river unificado | 2d | Coesão |
| 8 | ScrollSmoother + matchMedia tiers | 1d | Fluidez scroll |

## P1 — Premium polish

| # | Ação |
|---|------|
| 9 | Motion identity: easing + protagonista único por seção |
| 10 | TiltCard + MagneticButton componentes globais |
| 11 | S04 snap PEAK + Flip chip→agent |
| 12 | AtmosphereLayer persistente (fog + grid) |
| 13 | MotionPath S08 card (substituir getBoundingClientRect) |
| 14 | S14 órbita: pause no PEAK, zoom on hover |
| 15 | Progress capítulo global (nav + ring) |

## P2 — Pós-assets NV5

| # | Ação |
|---|------|
| 16 | 16 sequências F2F integradas |
| 15 | 15 videos Kling L1 ambient |
| 17 | DrawSVG/MorphSVG full (S05 QR, S16 shield) |
| 18 | Display typography + SVG icon set |

---

# XI. ARQUITETURA ALVO REVISADA

```
App
├── AtmosphereLayer (global, persistent)
│   ├── fog-canvas
│   ├── grid-floor
│   └── data-river (single SVG, scrub global)
├── ScrollSmoother wrapper (desktop)
│   └── masterTimeline
│       ├── act1 [S01 ─handoff─ S02 ─flip─ S03]
│       ├── act2 [S04 (nested 5 acts)]
│       ├── act3 [S05–S11 product chapter]
│       ├── act4 [S12–S16 proof chapter]
│       └── act5 [S17–S19 conversion]
└── PeakExploreProvider (context per pinned section)
```

## Novo contrato por seção

```ts
interface SectionMotionSpec {
  pinVh: number;
  scrub: number;
  protagonist: 'flip' | 'drawSvg' | 'motionPath' | 'splitText' | ...;
  handoff: { from?: string; sharedElements: string[] };
  peakHoldMs: number; // min scroll dwell
  layers: LayerSpec[]; // L1-L10
  actScript: ElementSlot[]; // enter/peak/exit per element
}
```

---

# XII. MÉTRICAS DE ACEITE (DEFINITION OF DONE)

Antes de considerar a versão final:

- [ ] Zero seções adjacentes com mesmo motion protagonist
- [ ] 100% seções pinned respeitam PEAK 48–72% freeze
- [ ] 5 handoffs morph mínimos implementados
- [ ] Device/visual hero persiste S01→S04→S19
- [ ] Data River único, cor interpolada (não threshold)
- [ ] Pin total ≤ 3.400vh desktop
- [ ] ≥1 microinteração hover descoberta por seção
- [ ] ScrollSmoother + 3 tiers matchMedia
- [ ] INP < 200ms; sem layout shift em pin
- [ ] Mobile: narrativa intacta com MP4 capítulos onde F2F off

---

# XIII. VEREDITO FINAL

A landing **não está pronta para produção final** no estado atual do protótipo — apesar de S04 demonstrar que a equipe sabe executar nível premium.

O planejamento v5 é **sólido e ambicioso** (9/10 como blueprint), mas sofre de:
1. **Superdensidade de pin** na zona produto
2. **Over-promising** de camadas L1–L10 vs capacidade de implementação
3. **Gap documentação→código** em Flip, F2F, handoffs

A versão final deve **simplificar o ritmo** (menos pin, mais morph) e **duplicar down** a qualidade do S04 para S01, S03 e S19 — as três bookends da conversão.

> *"Premium não é mais animação — é continuidade imperceptível."*

---

*Auditoria v5 — KORUVISION x FlowIA — Jun 2026*  
*Próximo passo recomendado: implementar P0 items 1–8 antes de gerar assets NV5 em batch.*
