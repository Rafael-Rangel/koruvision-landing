# KORUVISION — Production Master v9

> Jornada visual contínua · Logo central · F2F cinematográfico · Assets Replicate

## Pipeline

```text
1. FLUX 1.1 Pro     → imagens + first/last frames
2. Kling 2.5        → vídeos loop + vídeos F2F
3. ffmpeg extract   → f2f/{seq}/frame_NNNN.webp
4. Next.js          → FrameScrubber + VideoLayer + GoldenUI
```

## Sequências F2F (NV9)

| ID | Seção | Vídeo fonte | Frames | Narrativa |
|----|-------|-------------|--------|-----------|
| NV9-F2F-001 | S01→S02 Visão | nv9-vid-vision.mp4 | 90 | Olhos fecham → abrem → pupila |
| NV9-F2F-002 | S02 Caos | nv9-vid-chaos.mp4 | 72 | Túnel → explosão dados |
| NV9-F2F-003 | S03 Conexão | nv9-vid-connect.mp4 | 96 | Nós → rede → logo |
| NV9-F2F-004 | S19 CTA | nv9-vid-cta.mp4 | 80 | Escuro → coruja → logo |

## Assets imagem (prioridade)

Ver `assets/prompts/v9/manifest.md`

## Preview

- `/test/v9` — jornada completa v9
- `/test/v8` — experiência premium atual
- Script: `python scripts/nv9_pipeline.py --priority`

## Continuidade

- `GlobalJourneyLayer` — partículas + spine + aurora global
- `section-continuity` — morph entre seções
- `BrandMark` — logo integrada ao Hero
- Lenis + quickTo progress (não ScrollSmoother Club)

## Paleta logo

- Gold: `#FFC233` · Violet: `#8B5CF6` · Void: `#03060F` · Chrome: `#E8ECF8`
