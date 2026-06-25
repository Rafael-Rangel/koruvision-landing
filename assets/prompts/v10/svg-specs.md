# KORUVISION v10 — SVGs e elementos animados (implementados em codigo)

Todos os SVGs sao vetores no codigo (nitidez total, leves, animados por GSAP).

## Implementados
- Spine global de jornada — `components/motion/GlobalJourneyLayer.tsx` (path com gradiente, scrub).
- Feixes entre secoes — `components/motion/JourneySectionBeams.tsx` (4 paths, DrawSVG-like via dashoffset).
- Diagrama neural (IA) — `components/motion/NeuralFlowCanvas.tsx` (Canvas: nodes, energia, hub).
- Funil 3D + deal em MotionPath — `FunnelVisual` em `components/scenes/SceneWidgets.tsx`.
- Sistema nervoso de automacao (wire + pulsos MotionPath) — `AutomationVisual`.
- Timeline de setup (spine com DrawSVG no scroll) — `SetupVisual`.
- Constelacao de beneficios (icones SVG inline) — `BenefitsVisual` (ICONS map).
- Orbita de integracoes (aneis + chips orbitando) — `IntegrationsVisual` (CSS + ambient orbit).

## Tecnicas GSAP usadas
- SplitText (linhas, mask) — reveal de headlines em `SceneScaffold`.
- MotionPathPlugin — deal no funil, pulsos na automacao.
- DrawSVGPlugin / dashoffset — spine do setup, feixes de jornada.
- ScrollTrigger + Lenis — pin/scrub (Hero, Coruja, Demo, CTA) e reveals.
- Flip/MorphSVG/Observer — registrados em `lib/gsap/register.ts` (disponiveis para evolucoes).
- Ambient (float/glow/orbit/breathe) — `components/motion/AmbientTicker.tsx` (site vivo sem scroll).

## Especificacoes de novos SVGs (se desejar produzir)
- `koruvision-owl.svg` — sigilo da coruja (2 olhos + pena central), 2 cores (gold/violet), 64/128/256.
- `flow-connectors.svg` — conjunto de paths curvos para fluxos de automacao (stroke 1.5, gradiente beam).
- `icon-set.svg` — sprite de icones (bolt, target, funnel, robot, chart, chat, shield, plug) stroke 1.6.
