# KORUVISION â€” Planejamento Mestre da Landing (V3)

## Contexto do projeto

**Stack atual:** Next.js 15 Â· Lenis (scroll suave) Â· GSAP + ScrollTrigger Â· `@react-three/fiber` (protagonistas 3D CSS) Â· WebP image sequences (`FrameScrubber`) Â· vÃ­deos MP4 ambiente (`SmartVideo`).

**Arquivos Ã¢ncora:**
- Ordem da pÃ¡gina: [`app/page.tsx`](app/page.tsx)
- Copy e dados: [`config/landing-v10.ts`](config/landing-v10.ts)
- Assets por cena: [`config/nv11-assets.ts`](config/nv11-assets.ts)
- Cenas v10: [`sections/v10/scenes.tsx`](sections/v10/scenes.tsx)
- Coreografia S02â†’S03: [`lib/scene-choreography.ts`](lib/scene-choreography.ts)
- Docs legados (19 cenas): [`docs/KORUVISION-Protagonists-Matrix.md`](docs/KORUVISION-Protagonists-Matrix.md) â€” referÃªncia, nÃ£o reflete o corte enxuto atual

**DecisÃµes aprovadas neste planejamento:**
- Persona **B2B genÃ©rica** com cases multi-vertical (saÃºde, imÃ³veis, consultoria, agÃªncias, e-commerce)
- **Remover** `LogoIntroSequence` â€” primeira visita vai direto Ã  Hero
- Manter fluxo enxuto de **10 seÃ§Ãµes + CTA** (jÃ¡ em [`app/page.tsx`](app/page.tsx)), refinando protagonistas e gaps vs. spec premium

---

## Pilares da landing page

Estes pilares governam copy, visual e CTAs de todas as seÃ§Ãµes:

| Pilar | DefiniÃ§Ã£o | Como aparece na pÃ¡gina |
|-------|-----------|------------------------|
| **1. VisÃ£o que vende** | A KORUVISION "vÃª" o que a equipe nÃ£o vÃª â€” leads, intenÃ§Ã£o, risco de perda | Coruja/olho (S02), hero com CRM vivo, narrativa de clareza |
| **2. Caos â†’ mÃ©todo** | Dor operacional real (WhatsApp solto, funil cego) transformada em fluxo Ãºnico | S03 Problema â†’ S04 Pilares â†’ S05 Demo |
| **3. Produto tangÃ­vel** | NÃ£o Ã© promessa abstrata â€” Ã© inbox, IA, pipeline e setup em minutos | Demo 5 atos + Agentes + Funil + Setup |
| **4. Prova antes do preÃ§o** | ConfianÃ§a via transformaÃ§Ã£o visual + nÃºmeros + depoimentos antes de planos | Antes/Depois + Prova unificada |
| **5. FricÃ§Ã£o zero na decisÃ£o** | 14 dias grÃ¡tis, sem cartÃ£o, setup rÃ¡pido, plano Pro como Ã¢ncora | Setup + Planos + CTA final |

**Arco narrativo (4 atos):**

```mermaid
flowchart LR
  subgraph ato1 [Ato1_Atencao]
    Hero[Hero]
    OwlFlow[Coruja_Problema]
  end
  subgraph ato2 [Ato2_Solucao]
    Pillars[Pilares]
    Demo[Demo]
    Setup[Setup]
    Agents[Agentes]
    Funnel[Funil]
  end
  subgraph ato3 [Ato3_Confianca]
    BA[Antes_Depois]
    Proof[Prova]
  end
  subgraph ato4 [Ato4_Decisao]
    Plans[Planos]
    CTA[CTA_Final]
  end
  Hero --> OwlFlow --> Pillars --> Demo --> Setup --> Agents --> Funnel --> BA --> Proof --> Plans --> CTA
```

**Hierarquia de CTAs (funil):**
1. PrimÃ¡rio: `ComeÃ§ar grÃ¡tis â€” 14 dias` â†’ `#s-cta-eco`
2. SecundÃ¡rio: `Ver o produto em aÃ§Ã£o` â†’ `#s04` (Demo)
3. TerciÃ¡rio: `Ver planos` â†’ `#cena-planos`

---

## Mapa de seÃ§Ãµes â€” especificaÃ§Ã£o completa

### S00 â€” RemoÃ§Ã£o da Intro (mudanÃ§a estrutural)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Eliminar barreira antes do valor; usuÃ¡rio vÃª proposta em &lt;2s |
| **Mensagem** | N/A (seÃ§Ã£o removida) |
| **Protagonista** | N/A |
| **Tecnologia** | Remover wrapper [`LogoIntroSequence`](components/intro/LogoIntroSequence.tsx) de [`app/page.tsx`](app/page.tsx); manter prÃ©-carregamento de assets S02 em `useEffect` da pÃ¡gina ou no `ExperienceShell` |
| **InteraÃ§Ãµes** | Nenhuma |
| **ConversÃ£o** | Reduz bounce inicial; Hero assume primeiro impacto |

**ImplementaÃ§Ã£o:** children de `ExperienceShell` comeÃ§am em `SectionHero`; lÃ³gica `data-koru-intro` em [`SectionHero.tsx`](sections/SectionHero.tsx) pode ser simplificada.

---

### S01 â€” Hero Â· Despertar (`#s01`)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Capturar atenÃ§Ã£o, comunicar proposta de valor e oferecer CTA primÃ¡rio imediato |
| **Mensagem** | *"O CRM que vÃª cada lead e fecha por vocÃª"* â€” plataforma viva, nÃ£o planilha |
| **Protagonista** | **NÃºcleo KoruVision** â€” orbe IA + mockup CRM (`HeroCinematicStack` / `ProductCommandCenter`) Ã  direita; copy Ã  esquerda |
| **Tecnologia** | **HÃ­brido HYB:** GSAP pin (`usePinSection`, ~160vh) + `SectionMediaLayers` (BG WebP + loop MP4 opacity 0.18) + F2F `NV11-F2F-000` via scrub + mockup React (`GoldenUI`) + tilt/parallax mouse (`hero-choreography.ts`) |
| **InteraÃ§Ãµes** | Scroll: orbe escala/revela CRM; mouse: tilt 3D, luz dinÃ¢mica `--light-x/y`; CTAs magnÃ©ticos; palavras do headline com stagger |
| **ConversÃ£o** | Clique **ComeÃ§ar grÃ¡tis** ou scroll para **Ver produto** (`#s04`); estabelecer desejo e credibilidade premium |

**Gap atual vs. alvo:** docs especificam `KoruVisionCore.tsx` com partÃ­culas canvas â€” hoje usa stack hero existente. **Fase 2:** elevar orbe para spec Deep (partÃ­culas + filamentos) sem aumentar pin.

**Pin alvo:** 160vh desktop / 135vh mobile ([`C01` em nv11-assets](config/nv11-assets.ts))

---

### S02+S03 â€” Coruja + Problema (`OwlChaosFlow`, pin Ãºnico ~210vh)

Bloco unificado em [`sections/OwlChaosFlow.tsx`](sections/OwlChaosFlow.tsx) â€” **nÃ£o sÃ£o duas seÃ§Ãµes de scroll independentes**.

#### S02 â€” VisÃ£o (`#s02-vision`, fase owl)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | MetÃ¡fora de marca: "visÃ£o" da KORUVISION enxerga o caos que o usuÃ¡rio ignora |
| **Mensagem** | Algo estÃ¡ errado na operaÃ§Ã£o â€” a plataforma *vÃª* antes de vocÃª |
| **Protagonista** | **Olho mecÃ¢nico da coruja** â€” pupila em `50% 42%` |
| **Tecnologia** | **F2F image sequence** `NV11-F2F-001` (120 WebP @ 30fps) via [`FrameScrubber`](components/motion/FrameScrubber.tsx) + overlay atmosfÃ©rico roxo/laranja + zoom pupila (`visionBridgeVideoExit` em scene-choreography) |
| **InteraÃ§Ãµes** | Scroll scrub frame-a-frame; saÃ­da: tÃºnel/Ã­ris na pupila; sem hover crÃ­tico |
| **ConversÃ£o** | TensÃ£o + curiosidade; prepara identificaÃ§Ã£o com a dor (S03) |

#### S03 â€” Problema (`#cena-problema`, fase reveal/scene)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Nomear a dor e quantificar perda (urgÃªncia emocional + racional) |
| **Mensagem** | *"Seus leads esfriam na nÃ©voa operacional"* â€” caos visÃ­vel, prejuÃ­zo subindo |
| **Protagonista** | **Dashboard de caos operacional** â€” card unificado com: WhatsApp inbox caÃ³tico + [`ChaosLossCounter`](components/hero/ChaosLossCounter.tsx) (R$/min) + [`ChaosSlaBadge`](components/hero/ChaosSlaBadge.tsx) (0mâ†’N sem resposta) + grÃ¡fico/funil quebrados |
| **Tecnologia** | **LIVE + 3D CSS:** [`OperationalChaos3D`](components/hero/OperationalChaos3D.tsx) + GSAP counters/ticks + Ã­ris reveal (`problemSceneEnterWithIris`) + pin embutido no fluxo unificado |
| **InteraÃ§Ãµes** | Scroll: Ã­ris abre, mockup rise, rachadura tardia (`SHATTER_ON`); hover em painÃ©is/bubbles; contadores sobem com scroll + ticks ao vivo |
| **ConversÃ£o** | CTA **Quero sair do caos** â†’ `#s-cta-eco`; usuÃ¡rio se reconhece na dor |

**Gap:** frames WebP `NV11-F2F-001` precisam existir (`npm run f2f:owl`). Protagonista S03 nos docs era "fragmentos 3D" â€” implementaÃ§Ã£o atual (mockup LIVE) Ã© **mais conversiva**; manter e polir.

**Pin alvo:** 210vh desktop / 175vh mobile (`OWL_CHAOS_FLOW_PIN_VH`)

---

### S04 â€” Pilares Â· A virada (`#cena-pilares`)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Apresentar framework da soluÃ§Ã£o em 4 blocos memorÃ¡veis |
| **Mensagem** | *"Quatro pilares substituem quatro dores"* â€” mÃ©todo substitui caos |
| **Protagonista** | **MonÃ³lito quatro pilares** â€” [`FourPillars3D`](components/3d/nv11/protagonists.tsx) |
| **Tecnologia** | **3D CSS** em `ProtagonistStage` + `SceneCinemaSection` pin 95vh + BG WebP + loop `pillarsPulse` (opacity ambiente) + scroll acende pilares em sequÃªncia |
| **InteraÃ§Ãµes** | Scroll: pilares erguem/acendem; mouse: tilt hub central (via `usePointerParallax` no stage) |
| **ConversÃ£o** | CTA **Ver como funciona** â†’ `#s04` (Demo); ponte dor â†’ produto |

---

### S05 â€” Demo Â· Cinco atos (`#s04`)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Provar que o produto funciona de ponta a ponta num Ãºnico fluxo |
| **Mensagem** | *"Do primeiro oi no WhatsApp ao deal fechado"* â€” substitui seÃ§Ãµes isoladas de Inbox, AutomaÃ§Ã£o e Analytics |
| **Protagonista** | **SequÃªncia CRM despertar** â€” 5 mockups em camera rig: WA â†’ IA â†’ Kanban â†’ Agenda â†’ Dashboard |
| **Tecnologia** | **HÃ­brido HYB:** [`SectionDemo`](sections/SectionDemo.tsx) pin 185vh + GSAP camera rig (`CAM[]`) + F2F `NV11-F2F-002` ambiente + `MacInboxMockup` / `MacAutomationMockup` / `UIKanbanBoard` / `UICalendarView` / `MacMetricsMockup` |
| **InteraÃ§Ãµes** | Scroll: 5 atos com scrub; labels de capÃ­tulo; possÃ­vel sticky progress indicator (Fase 2); CTA visÃ­vel a partir do ato 3 |
| **ConversÃ£o** | **Quero esse fluxo na minha operaÃ§Ã£o**; desejo de replicar o fluxo na prÃ³pria operaÃ§Ã£o |

**Gap:** mockups sÃ£o genÃ©ricos (`GoldenUI`). **Fase 3 (com material do usuÃ¡rio):** substituir por prints/vÃ­deo real do software.

---

### S06 â€” Setup Â· 5 minutos (`#cena-setup`)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Destruir objeÃ§Ã£o "Ã© difÃ­cil / demora / precisa de consultoria" |
| **Mensagem** | *"No ar em 5 minutos"* â€” WhatsApp + IA + importaÃ§Ã£o |
| **Protagonista** | **TrÃªs portais de conexÃ£o** â€” [`OnboardingPortals3D`](components/3d/nv11/protagonists.tsx) + widget [`SetupVisual`](components/scenes/SceneWidgets.tsx) |
| **Tecnologia** | **3D CSS** pin 90vh + loop `portalsFlow` + steps de `SETUP_STEPS` em landing-v10 |
| **InteraÃ§Ãµes** | Scroll: energia sobe spine entre portais; hover em portais (tilt) |
| **ConversÃ£o** | **Conectar meu WhatsApp** â†’ `#s-cta-eco`; reduz medo de implementaÃ§Ã£o |

---

### S07 â€” Agentes IA (`#cena-agentes`)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Diferencial #1 â€” IA que qualifica e vende com voz da marca |
| **Mensagem** | *"Vendem como seu melhor closer"* â€” 24/7, score, handoff humano |
| **Protagonista** | **Hub neural** â€” [`NeuralBrainHub3D`](components/3d/nv11/protagonists.tsx) + [`AgentsVisual`](components/scenes/SceneWidgets.tsx) (mockups IA + inbox) |
| **Tecnologia** | **3D CSS** pin 100vh + `NeuralFlowCanvas` + loop `neuralPulse` + BG `neuralField` |
| **InteraÃ§Ãµes** | Scroll: nodes acendem em ordem; mouse: partÃ­culas atraÃ­das ao cursor; hover em nodes |
| **ConversÃ£o** | **Criar meu agente** â†’ `#s-cta-eco`; desejo de automaÃ§Ã£o inteligente |

---

### S08 â€” Funil / Pipeline (`#cena-funil`)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Diferencial #2 â€” visibilidade comercial e previsÃ£o de receita |
| **Mensagem** | *"Cada deal avanÃ§a com gravidade prÃ³pria"* â€” pipeline sem furos |
| **Protagonista** | **VÃ³rtice pipeline magnÃ©tico** â€” [`SalesPipeline3D`](components/3d/nv11/protagonists.tsx) + deal "Maria" em movimento |
| **Tecnologia** | **3D CSS** pin 100vh + loop `funnelOrbs` + MotionPath GSAP no scroll |
| **InteraÃ§Ãµes** | Scroll: deal percorre estÃ¡gios; mouse: snap magnÃ©tico simulado entre colunas |
| **ConversÃ£o** | **Organizar meu pipeline** â†’ `#s-cta-eco` |

---

### S09 â€” Antes / Depois (`#cena-antes-depois`)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Contraste emocional â€” mesmo negÃ³cio, dois futuros |
| **Mensagem** | *"Dois universos"* â€” escuro vs. mÃ©todo KORUVISION |
| **Protagonista** | **Divisor de universos** â€” [`BeforeAfterSplit3D`](components/3d/nv11/protagonists.tsx) + slider [`BeforeAfterVisual`](components/scenes/SceneWidgets.tsx) |
| **Tecnologia** | **3D CSS + interaÃ§Ã£o LIVE** pin 100vh + loop `splitMist` + drag range input |
| **InteraÃ§Ãµes** | **Drag horizontal** no divisor (principal); scroll: reveal das listas before/after |
| **ConversÃ£o** | **Quero o depois** â†’ `#cena-planos`; usuÃ¡rio se projeta no estado desejado |

---

### S10 â€” Prova unificada (`#cena-prova`) â€” NOVA estrutura

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Credibilidade social + resultados por vertical (substitui Cases + Social + faixa IntegraÃ§Ãµes) |
| **Mensagem** | *"Resultados que falam por si"* â€” nÃºmeros + depoimentos + mercados |
| **Protagonista** | **Totens verticais** â€” [`VerticalTotems3D`](components/3d/nv11/protagonists.tsx) + painel [`ProofVisual`](components/scenes/SceneWidgets.tsx) (stats, 2 quotes, chips integraÃ§Ã£o) |
| **Tecnologia** | **3D CSS + LIVE** pin 115vh + loop `trustGather` + dados de `SOCIAL_STATS`, `TESTIMONIALS`, `CASES` |
| **InteraÃ§Ãµes** | Scroll: parallax nos totens; hover: pulse em mÃ©tricas; stats com `data-ambient-breathe` |
| **ConversÃ£o** | **Ver planos** â†’ `#cena-planos`; transferÃªncia de confianÃ§a antes do preÃ§o |

**Material futuro:** logos reais de clientes, mÃ©tricas auditÃ¡veis, vÃ­deo depoimento (opcional Fase 3).

---

### S11 â€” Planos (`#cena-planos`)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Apresentar oferta com Ã¢ncora no plano **Pro** e FAQ de objeÃ§Ãµes |
| **Mensagem** | *"14 dias grÃ¡tis, sem cartÃ£o"* â€” Starter / Pro / Agency |
| **Protagonista** | **MonÃ³litos de pricing** â€” [`PricingMonoliths3D`](components/3d/nv11/protagonists.tsx) + [`PlansVisual`](components/scenes/SceneWidgets.tsx) (cards + FAQ) |
| **Tecnologia** | **3D CSS + LIVE** pin 100vh + loop `decisionRings` + GSAP Flip para toggle mensal/anual (Fase 2 â€” corrigir D8 do audit) |
| **InteraÃ§Ãµes** | Hover: glow no Pro; scroll: monÃ³litos flutuam; FAQ accordion; toggle preÃ§o (sem quebrar DOM) |
| **ConversÃ£o** | Assinar **Pro** (Ã¢ncora visual); Agency para agÃªncias via card dedicado |

---

### S12 â€” CTA Final (`#s-cta-eco`)

| Campo | EspecificaÃ§Ã£o |
|-------|---------------|
| **Objetivo** | Fechamento emocional + aÃ§Ã£o imediata |
| **Mensagem** | *"Coloque o CRM para vender com IA"* â€” Ãºltimo empurrÃ£o |
| **Protagonista** | **ConvergÃªncia dourada** â€” [`ProceduralOwlScene`](components/motion/ProceduralOwlScene.tsx) + `OwlSigil` + `MacMetricsMockup` |
| **Tecnologia** | **HÃ­brido HYB** pin 130vh + F2F `NV11-F2F-004` (quando disponÃ­vel) + GSAP fade copy on scroll |
| **InteraÃ§Ãµes** | Scroll: owl intensifica; CTAs magnÃ©ticos primÃ¡rio + ghost |
| **ConversÃ£o** | **ComeÃ§ar grÃ¡tis â€” sem cartÃ£o** (conversÃ£o final) |

---

## SeÃ§Ãµes removidas (e por quÃª)

| SeÃ§Ã£o removida | Absorvida por |
|----------------|---------------|
| Inbox, AutomaÃ§Ãµes, Analytics | Demo (5 atos) + Pilares |
| BenefÃ­cios | Pilares + Antes/Depois |
| Cases + Social (separados) | Prova unificada (S10) |
| IntegraÃ§Ãµes (seÃ§Ã£o) | Chips em ProofVisual + copy Demo/Planos |
| AgÃªncia (seÃ§Ã£o) | Plano Agency em Planos |
| Logo Intro (S00) | Removida por decisÃ£o â€” Hero direto |

---

## PadrÃµes tÃ©cnicos transversais (performance)

- **Scroll:** Lenis + ScrollTrigger via `document.documentElement` ([`usePinSection`](lib/hooks/useGsapContext.ts))
- **Pin budget total alvo:** ~1.350vh desktop (vs. ~2.800vh na versÃ£o 19 cenas)
- **Regra protagonista:** nenhuma seÃ§Ã£o sÃ³ com BG estÃ¡tico; loop MP4 sempre opacity â‰¤0.35 como ambiente
- **Mobile:** pins âˆ’35% (`pinMobileVh`); desligar partÃ­culas pesadas; `prefers-reduced-motion` respeitado em counters/GSAP
- **Assets crÃ­ticos pendentes:** frames `NV11-F2F-001`, vÃ­deos loop em `/public/assets/nv11/videos/`

---

## OrganizaÃ§Ã£o do repositÃ³rio (antes de implementar)

Criar **fonte Ãºnica de verdade** apÃ³s aprovaÃ§Ã£o:

```
docs/LANDING-STRATEGY-V3.md     â† este plano exportado
config/landing-strategy.ts      â† metadados por seÃ§Ã£o (id, pin, protagonist, tech, cta)
```

Atualizar referÃªncias cruzadas em `landing-v10.ts` (comentÃ¡rio no topo: "11 seÃ§Ãµes, ver LANDING-STRATEGY-V3").

**NÃ£o alterar** os 19-scene docs legados â€” arquivar nota "superseded by V3" no topo.

---

## Fases de implementaÃ§Ã£o (apÃ³s aprovaÃ§Ã£o)

### Fase 0 â€” Estrutura (1 PR)
- Remover `LogoIntroSequence` de `page.tsx`; simplificar `SectionHero` intro-skip
- Criar `docs/LANDING-STRATEGY-V3.md` + `config/landing-strategy.ts`
- Validar build e scroll ida/volta S02â†’S03â†’Pilares

### Fase 1 â€” Polimento das seÃ§Ãµes existentes (2 PRs)
- S03: garantir frames F2F + polish counters
- S05 Demo: progress indicator + CTA sticky apÃ³s ato 2
- S09â€“S12: FAQ toggle Planos, handoffs de cor entre seÃ§Ãµes

### Fase 2 â€” Protagonistas premium (3 PRs, por prioridade)
1. S01 Hero â€” `KoruVisionCore` / partÃ­culas conforme Deep Spec
2. S05 Demo â€” camera rig + F2F-002 completo
3. S07â€“S08 â€” neural hub + pipeline motion path refinados

### Fase 3 â€” Material real do produto (depende do usuÃ¡rio)
- Prints/vÃ­deos das telas reais substituindo `GoldenUI` na Demo e Agentes
- Logos e mÃ©tricas reais na Prova
- Depoimentos em vÃ­deo (opcional)

---

## Materiais solicitados (para Fase 3)

Para narrativa mais precisa, enviar quando disponÃ­vel:
- Screenshots ou gravaÃ§Ãµes: inbox, agente IA, kanban, automaÃ§Ãµes, dashboard
- 2â€“3 cases com mÃ©tricas reais e permissÃ£o de uso
- URL do fluxo de signup / trial
- ConfirmaÃ§Ã£o de preÃ§os atuais (Starter R$97 / Pro R$197 / Agency R$497)
