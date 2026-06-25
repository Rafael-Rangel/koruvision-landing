# FlowIA Landing — KORUVISION v5 (Névoa Neural)

Landing page cinematográfica S01–S19 · Next.js 15 · GSAP · TypeScript

## Executar (local / Replit)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # produção
```

No Replit: o arquivo `.replit` já aponta para `npm run dev`.

## Estrutura

```
app/              → App Router (layout + page)
sections/         → S01–S19 (19 seções pinned + GSAP)
components/       → motion, golden UI, layout
config/           → sections.ts, env.ts (assets paths)
lib/              → motion-system, GSAP hooks
animations/       → registro de timelines
styles/           → tokens + landing CSS
public/assets/nv5 → binários NV5 (imagens, vídeos, F2F)
docs/             → Asset Map Master, specs completas
```

## Variáveis de ambiente (`.env`)

| Variável | Função |
|----------|--------|
| `REPLICATE_API_TOKEN` | Geração FLUX/Kling via Replicate |
| `NEXT_PUBLIC_ASSET_BASE` | Base URL dos assets (`/assets/nv5`) |
| `NEXT_PUBLIC_ENABLE_F2F` | Frame-by-frame canvas |
| `NEXT_PUBLIC_ENABLE_VIDEO` | Camadas de vídeo |

Copie `.env.example` e preencha o token.

## Assets

**Specs 100%** em `docs/KORUVISION-Asset-Map-Master.md`  
**Binários 0%** — gerar com:

```bash
python scripts/nv5_generate.py --list
python scripts/nv5_generate.py --all-images   # Replicate FLUX
python scripts/nv5_extract_f2f.py NV5-F2F-001 video.mp4
```

Fallback visual: gradientes Névoa Neural + golden UI React até os binários existirem.

## Documentação mestre

- `docs/KORUVISION-Asset-Map-Master.md` — fonte única da verdade
- `docs/KORUVISION-Sections-v5.md` — copy + motion por seção
- `assets/prompts/v5/` — prompts FLUX/Kling/F2F

## Stack

- Next.js 15 · React 19 · TypeScript
- GSAP 3 + ScrollTrigger
- Motion System BUILD 48% / PEAK 24% / EXIT 28%
