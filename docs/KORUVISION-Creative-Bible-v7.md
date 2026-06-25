# KORUVISION — Creative Bible v7
## Cinematic Product Experience · FlowIA Landing

> **Status:** Fonte principal de direção criativa e técnica (Jun 2026)  
> **Substitui como prioridade:** narrativa v5 Névoa Neural · complementa e eleva v6 Product Canvas  
> **Produto:** FlowIA · **Universo visual:** KoruVision · **Símbolo:** Coruja (visão + inteligência)

---

## 0. Análise executiva (leia antes de codar)

### O que o material ChatGPT + mockups acertam
- Landing como **história em 7 atos**, não catálogo de features
- **Tipologia por seção** (loop, F2F, scroll cinematic, GSAP puro, UI demo)
- **Hero e CTA** com identidade forte (coruja, ouro + violeta)
- **Meio da página** = mockups reais: CRM, WhatsApp, dashboards, automações, IA
- Referência de nível: Stripe Sessions, Linear, Framer — **produto legível + motion com propósito**
- Sidebar de 14 blocos nos mockups = mapa de produção claro

### O que foi reprovado nas iterações anteriores (não repetir)
- Névoa / glow / partículas em **todas** as seções
- Corredores neurais, observatórios, rios de dados como fundo dominante
- F2F longo (700–1500 frames) em seções que deveriam ser **HTML + GSAP**
- Vídeo abstrato competindo com headline
- Animação sem função de conversão

### Síntese v7 — regra de ouro
| Zona da página | O que domina | Efeitos cinematográficos |
|----------------|--------------|---------------------------|
| **Abertura** (S01–S03) | Coruja + transição narrativa | Loop vídeo, scrub curto, parallax **contido** |
| **Produto** (S04–S09) | **Mockups React 3D** | GSAP puro, counters, paths SVG — **zero névoa** |
| **Prova** (S10–S16) | UI + números + cases | Motion graphics leves |
| **Fechamento** (S17–S19) | CTA + coruja retorno | Loop / scrub curto |

> **Metáfora aprovada:** A coruja *enxerga* → você *entra no produto* → os dados *trabalham*.

### Referências visuais (assets enviados)
- Logo KoruVision: olhos dourados, violeta, tipografia metálico ouro/roxo
- Long-scroll mockup: grid de features, CRM kanban, WhatsApp multi-agent, dashboards, workflow nodes, IA orbital, integrações, CTA coruja
- Salvar em: `public/assets/brand/` (logo, owl-hero, owl-cta)

---

## CAMADA 01 — Visual Storytelling (7 atos)

```text
ATO 01 · A VISÃO          S01 Hero          "Inteligência que enxerga."
ATO 02 · O CAOS            S02–S03           "Tudo desconectado."
ATO 03 · A CONEXÃO         S03 Bridge        "Um só fluxo."
ATO 04 · A INTELIGÊNCIA    S04–S07           Demo + Inbox + Agentes
ATO 05 · A AUTOMAÇÃO       S08–S09           Funil + Workflows
ATO 06 · O CRESCIMENTO     S10–S14           Prova + integrações
ATO 07 · A TRANSFORMAÇÃO   S15–S19           Agência → Planos → CTA coruja
```

O visitante **percorre** a história via scroll pin + scrub — não clica menu para entender valor.

---

## CAMADA 02 — Stack tecnológica

| Camada | Tech | Uso v7 |
|--------|------|--------|
| Framework | **Next.js 15** | App router, `sections/*` |
| Motion core | **GSAP + ScrollTrigger** | Pin, scrub, timelines (`lib/motion-system.ts`) |
| Scroll | **Lenis** (adicionar) | Suavidade global, sync com ScrollTrigger |
| 3D produto | **CSS preserve-3d** + opcional **Three.js** | Device stack S04; coruja hero se necessário |
| UI | **React GoldenUI** | Mockups CRM, WA, Kanban, Dashboard |
| Vídeo | **MP4 loop** | 3 loops máx (hero, IA, integrações) |
| F2F | **Canvas scrub** | 2 cenas curtas máx (visão pupila, CTA) — resto GSAP |
| SVG | **DrawSVG / MotionPath** | Data river, workflow edges, funnel path |
| Micro | **MagneticButton, TiltCard** | Já existem |

**Não obrigatório v1:** Spline, WebGL full-scene, Lottie genérico.

---

## CAMADA 03 — Tipologia por seção

```text
VIDEO_LOOP        → fundo contido, loop 8–12s, ≤15% opacidade + véu
SCROLL_CINEMATIC  → pin + scrub, câmera ou morph (S02–S03)
UI_DEMONSTRATION  → 100% HTML/React + GSAP (S04–S09) ★ prioridade
MOTION_GRAPHICS   → counters, charts draw, orbit icons (S07, S10, S13)
GSAP_STORYTELLING → timeline horizontal, cards (S11–S12)
CONVERSION        → pricing, FAQ, CTA (S17–S19)
```

---

## CAMADA 04 — Mapa ChatGPT (13) → FlowIA (S01–S19)

| # ChatGPT | Seção FlowIA | Tipo v7 | Notas de implementação |
|-----------|--------------|---------|-------------------------|
| 01 Hero Coruja | **S01** | VIDEO_LOOP + GSAP | 40% copy / 60% coruja; pupila segue cursor; **sem** névoa na copy |
| 02 A Visão (700f) | **S01→S02 bridge** | SCRUB curto 80–120f | Pupila→túnel **condensado**; texto: "Toda empresa gera dados…" |
| 03 O Caos | **S02** | SCROLL_CINEMATIC + UI | Ícones WA/planilha/email **HTML** flutuando; sem explosão de partículas |
| 04 A Conexão | **S03** | GSAP + SVG | Nós que se conectam; logo KoruVision surge; **não** rede neural fullscreen |
| 05 CRM Vivo | **S04** + **S08** | UI_DEMO | Pipeline colunas GSAP; card Maria viaja; já em `SectionDemo` + funnel |
| 06 WhatsApp | **S04·ato1** + **S07** | UI_DEMO | Multi-chat, typing, transfer, tags — `GoldenUI` expandir |
| 07 Dashboards | **S04·ato5** + **S13** | MOTION_GRAPHICS | Counter up, line draw, funnel grow |
| 08 IA KoruVision | **S06** | VIDEO_LOOP leve + orbit UI | Cérebro/IA **ou** mockup agent panel; órbita de ícones SVG |
| 09 Automações | **S09** | UI_DEMO 3D | Câmera CSS entre **nodes** (6 ambientes); **não** 1500 frames F2F |
| 10 Integrações | **S14** | MOTION_GRAPHICS | Órbita atual melhorada; opcional loop 5s |
| 11 Jornada Lead | **S08** + novo rail | GSAP horizontal | Timeline lead→fideliza; complementa funnel |
| 12 Cases | **S12** | GSAP + TiltCard | Cards 3D glass; vídeo thumb opcional |
| 13 CTA Final | **S19** | VIDEO_LOOP ou scrub curto | Coruja retorna; CTA glow **pulsante único**; partículas só no click |

Seções FlowIA sem par ChatGPT direto (manter no arco):
- **S05** Setup · **S10** Benefícios · **S11** Antes/Depois · **S15** Agência · **S16** Segurança · **S17–18** Planos/FAQ

---

## CAMADA 05 — Roteiro seção a seção (especificação)

### S01 — HERO · A coruja enxerga

| Campo | Spec |
|-------|------|
| **Objetivo** | Impacto + posicionamento além de CRM |
| **Layout** | 100vh pin inicial; grid 40% narrativa / 60% coruja |
| **Copy** | Headline atual FlowIA ou variante mockup: *"Inteligência que vê. Automação que move."* |
| **Fundo** | `#03060F` sólido + gradiente violeta **só atrás da coruja** |
| **Vídeo** | Loop 12s: respiração, blink lento, partículas orbitais **locais** |
| **GSAP** | `splitWords` stagger 0.08; device/chips BUILD 48% |
| **Micro** | Pupila `mousemove` parallax 8px max |
| **Scroll out** | Pin handoff → S02; coruja scale down + blur |
| **Mobile** | Coruja 50% topo, copy abaixo; vídeo estático poster |

**Produção:** `nv7-vid-001-owl-hero.mp4` · `nv7-img-owl-poster.webp`

---

### S02 — O CAOS OPERACIONAL

| Campo | Spec |
|-------|------|
| **Objetivo** | Espelhar dor (WA, CRM, planilhas soltas) |
| **Tipo** | SCROLL_CINEMATIC — pin 240vh |
| **Cena** | Túnel **abstrato escuro** (não espaço); cards de notificação React |
| **Frames lógicos** | 0% poucos ícones → 50% caos → 100% vermelho difuso → handoff S03 |
| **Texto** | *"WhatsApp. CRM. Equipe. Planilhas. Tudo desconectado."* |
| **Evitar** | Explosão partículas, motion blur fullscreen |

---

### S03 — A CONEXÃO

| Campo | Spec |
|-------|------|
| **Objetivo** | Alívio; ordem emerge |
| **Tipo** | SCROLL_CINEMATIC + SVG |
| **Cena** | Partículas → nós → linhas → símbolo KoruVision |
| **Texto** | *"Tudo conectado. Tudo inteligente. Tudo em um só lugar."* |
| **Bridge** | Split caos|ordem (já em v6 script) |

---

### S04 — DEMO · Dentro da máquina (★ referência ouro)

| Campo | Spec |
|-------|------|
| **Objetivo** | Provar fluxo completo em 5 atos |
| **Tipo** | **UI_DEMONSTRATION** — 100% HTML |
| **Pin** | 480vh · scrub 2.4 |
| **Atos** | WhatsApp → IA → Kanban → Agenda → Dashboard |
| **Câmera** | `camera-rig` interpolate `CAM[]` — ver `SectionDemo.tsx` |
| **Código** | `sections/SectionDemo.tsx` · `demo/s04.html` |
| **Próximo** | Float panels (notif, IA, pipeline metric) como mockup |

---

### S05 — SETUP · Três portais

| Campo | Spec |
|-------|------|
| **Tipo** | UI_DEMO |
| **Cena** | 3 steps onboarding; QR WA; progress 5 min |

---

### S06 — AGENTES IA

| Campo | Spec |
|-------|------|
| **Tipo** | VIDEO_LOOP (8s) + orbit UI |
| **Cena** | Painel personalidade + órbita WhatsApp/CRM/Email |
| **Copy** | *"Uma inteligência que trabalha enquanto você vende."* |

---

### S07 — INBOX · Sala de comando

| Campo | Spec |
|-------|------|
| **Tipo** | UI_DEMO |
| **Cena** | 3 colunas; typing; handoff IA→humano; tags |

---

### S08 — FUNIL · CRM vivo

| Campo | Spec |
|-------|------|
| **Tipo** | UI_DEMO + MotionPath |
| **Cena** | Card Maria Lead→Fechado; counter R$; magnetic snap |

---

### S09 — AUTOMAÇÕES

| Campo | Spec |
|-------|------|
| **Tipo** | UI_DEMO 3D (pin 320vh) |
| **Cena** | 6 nodes; câmera `translateZ` entre eles; path SVG energia |
| **ChatGPT** | Inspirar "câmera entra no node" — implementar em CSS 3D + GSAP, **não** 1500 F2F |

---

### S10–S16 — Prova social

Manter estrutura atual; enriquecer com mockup style dos boards ChatGPT (glass, sparklines).

---

### S19 — CTA · Retorno da coruja

| Campo | Spec |
|-------|------|
| **Tipo** | VIDEO_LOOP ou scrub 120f |
| **Cena** | Escuro → olhos → coruja → logo → CTA |
| **Copy** | *"Sua empresa já gera dados. Agora faça eles trabalharem para você."* |
| **Micro** | Botão glow pulse; partículas **só no click** |

---

## CAMADA 06 — Inventário de produção v7

| Asset | Qtd | Seção |
|-------|-----|-------|
| Vídeo loop | **3** | S01 owl, S06 IA, S14 integrações (ou S19) |
| F2F scrub curto | **2** | S01→S02 pupila (≤120f), S19 CTA (≤120f) |
| Seções GSAP puras | **8+** | S04–S09, S11–S12, S08 funnel |
| Imagens atmosfera | **~20** | Fundos ≤15% opacidade, v6 prompts adaptados |
| Brand | **4** | logo, owl-hero, owl-cta, symbol |

**Total motion:** comparável ao brief ChatGPT, mas **reduzido** em F2F e partículas.

---

## CAMADA 07 — Direção de arte (filtro Koru)

### Permitido
- Bloom/glow **local** em olhos coruja, CTAs, nodes ativos
- Partículas **máx 200** em hero/CTA com depth parallax
- Chromatic aberration **≤2px** só em transições de ato
- Glassmorphism nos mockups (`GoldenUI`)
- Grid tecnológico **3% opacidade**

### Proibido
- Névoa fullscreen legível sobre texto
- Volumetric fog em seções de produto
- Ray tracing / motion blur em UI demo
- Vídeo narrativo atrás de kanban/dashboard
- F2F > 150 frames exceto exceção aprovada

### Paleta v7 (unificar mockups + logo)

| Token | Hex | Uso |
|-------|-----|-----|
| void | `#03060F` | Fundo |
| violet brand | `#8B5CF6` | IA, rim coruja |
| gold brand | `#FFC233` / `#D4A017` | Olhos, destaque Koru |
| cyan action | `#2EE8C0` | Links ativos, pipeline |
| danger | `#EF4444` | S02 caos |
| glass | `rgba(18,24,42,0.72)` | Cards |

---

## CAMADA 08 — Transições contínuas (frame in = frame out)

| De → Para | Mecanismo |
|-----------|-----------|
| S01 → S02 | Coruja pupil zoom → túnel caos (scrub 60vh bridge) |
| S02 → S03 | Caos explode → partículas reorganizam (SVG) |
| S03 → S04 | Rede fecha → zoom out → palco estúdio produto |
| S04 → S05 | Dashboard ato 5 → portal setup fade |
| S09 → S10 | Último node workflow → constelação benefícios |
| S18 → S19 | FAQ lift → escuridão → olhos coruja |

Sempre manter: **mesmo device shell**, mesma temperatura de luz, `BUILD 48% / PEAK 72%`.

---

## CAMADA 09 — Plano de implementação (fases)

### Fase A — Documentação ✅ (este arquivo)
### Fase B — Fundação (próximo)
- [ ] Lenis + ScrollTrigger sync
- [ ] Tokens v7 em `tokens.css`
- [ ] `public/assets/brand/` logo + owl
- [ ] Atualizar `config/sections.ts` copy/atributos `sectionType`

### Fase C — Hero premium (S01)
- [ ] `SectionHero` split 40/60 + owl layer + pupil tracking
- [ ] Vídeo loop ou canvas owl placeholder

### Fase D — Produto (S04–S09)
- [ ] Expandir `GoldenUI` (CRM board mockup dos images)
- [ ] S09 workflow camera rig
- [ ] S07 WhatsApp multi-agent

### Fase E — Bookend CTA (S19)
- [ ] Coruja return + copy mockup

### Fase F — Produção assets nv7
- [ ] Prompts v7 derivados de v6 + owl brand
- [ ] Pipeline `nv7_pipeline.py`

---

## CAMADA 10 — Onde cada coisa vive no repo

| Preciso de… | Arquivo |
|-------------|---------|
| **Esta bíblia (fonte #1)** | `docs/KORUVISION-Creative-Bible-v7.md` |
| Índice geral | `docs/FlowIA-Design-Standards-Index.md` |
| Roteiro frames v6 | `docs/FlowIA-Visual-Script-v6.md` |
| Copy + pin | `config/sections.ts` |
| Motion math | `lib/motion-system.ts` |
| Demo 5 atos | `sections/SectionDemo.tsx` |
| Preview | `/test` |
| Mockup HTML ouro | `demo/s04.html` |
| Prompts geração | `assets/prompts/v6/` → migrar `v7/` |

---

## Referências de nível (north star)

Stripe Sessions · Linear launch · Vercel Ship · Framer Awards · Arc Browser  
**Não** copiar: Interstellar/Tron como fundo genérico — só **ritmo** e **escala** cinematográfica.

---

*v7 · KoruVision Cinematic Product · FlowIA · Jun 2026*
