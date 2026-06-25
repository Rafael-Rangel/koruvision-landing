# KORUVISION — Asset Manifest v10 (Landing definitiva, 19 cenas)

Estrategia hibrida: interfaces do produto = componentes reais (DOM/SVG/Canvas);
IA generativa = apenas fundos atmosfericos, brand e texturas. Loops = CSS/Canvas/SVG + video da coruja.

## Paleta oficial
- Gold `#FFC233` · Violet `#8B5CF6` · Cyan `#2EE8C0` · Blue `#3B82F6` · Void `#03060F` · Chrome `#E8ECF8`

## Assets gerados (entregues)
| Arquivo | Uso | Origem |
|---------|-----|--------|
| `public/assets/nv10/images/nv10-bg-hero-aurora.webp` | Fundo atmosferico (Integracoes) | FLUX/GenerateImage |
| `public/assets/nv10/images/nv10-bg-neural-field.webp` | Fundo atmosferico (Agentes IA) | FLUX/GenerateImage |
| `public/assets/nv10/images/nv10-bg-convergence.webp` | Fundo atmosferico (Planos/Conversao) | FLUX/GenerateImage |
| `public/assets/nv9/videos/nv9-vid-owl-loop.mp4` | Coruja (cena 2, mantida) | Kling (existente) |
| `public/assets/nv9/videos/nv9-vid-vision.mp4` | Coruja olhos F2F (cena 2) | Kling (existente) |

## Componentes reais (sem IA) que substituem "mockups"
ProductCommandCenter, GoldenUI (WhatsApp, Agente, Kanban, Inbox, Workflow, Dashboard,
Agency, Pricing, FAQ), Product3DFeatureCards, NeuralFlowCanvas, widgets em `components/scenes/SceneWidgets.tsx`.

## Pendentes opcionais (prompts prontos abaixo)
- Ver `image-prompts.md`, `video-prompts.md`, `svg-specs.md`.
- Rodar `python scripts/nv9_pipeline.py` (token Replicate em `.env`) para produzir os loops cinematograficos extras.
