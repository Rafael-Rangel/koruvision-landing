# NV5 Prompt Pack — Índice Completo de Produção

> **Status:** Specs 100% · Binários 0% · Ver `docs/KORUVISION-Production-Delivery-Status.md`

## Prompts de geração

| Arquivo | Conteúdo | Qtd |
|---------|----------|-----|
| [flux-images.md](./flux-images.md) | Prompts FLUX.2 imagens | 48 |
| [kling-keyframes.md](./kling-keyframes.md) | Keyframes start/end I2V | 30 |
| [kling-videos.md](./kling-videos.md) | Prompts Kling + config | 15 |
| [video-storyboards.md](./video-storyboards.md) | Storyboards beat-by-beat | 15 |
| [f2f-sequences.md](./f2f-sequences.md) | Sequências F2F + extract | 16 |
| [mockups-device.md](./mockups-device.md) | Device shell + golden UI | 10 |
| [svg-specs.md](./svg-specs.md) | SVG animados | 28 |
| [react-components.md](./react-components.md) | Componentes React | 38 |
| [ASSET-MANIFEST.md](./ASSET-MANIFEST.md) | Registro mestre todos assets | 192 |

## Fonte única da verdade

| Documento | Função |
|-----------|--------|
| **[KORUVISION-Asset-Map-Master.md](../../docs/KORUVISION-Asset-Map-Master.md)** | **Mapeamento completo S01–S19: imagens, vídeos, F2F, GSAP, regras de uso** |

Regenerar após alterar prompts:

```bash
python scripts/build_asset_map_master.py
```

## Specs de produção

| Documento | Tema |
|-----------|------|
| `docs/KORUVISION-Color-Legibility-System.md` | Cores, contrastes, hover, anti-ilegibilidade |
| `docs/KORUVISION-Spacing-Rhythm-Spec-v5.md` | Pin heights, bridges, anti-atropelo |
| `docs/KORUVISION-GSAP-Technology-Map.md` | Plugin × seção × timeline |
| `docs/KORUVISION-F2F-GSAP-Integration.md` | Pipeline F2F + ScrollTrigger |
| `docs/KORUVISION-UX-Conversion-Audit.md` | Distrações, conversão, equilíbrio |
| `docs/KORUVISION-Production-Checklist.md` | Definition of Done |
| `docs/KORUVISION-Critical-Audit-v5.md` | Auditoria arquitetura |

## Scripts

```bash
python scripts/nv5_generate.py --list      # batch FLUX
python scripts/nv5_extract_f2f.py SEQ mp4  # F2F extract
python scripts/create_phone_mockup.py      # NV5-M-01
```

## Output paths

```
assets/nv5/images/      # NV5-IMG-*
assets/nv5/keyframes/   # NV5-KEY-*
assets/nv5/videos/      # NV5-VID-*
assets/nv5/f2f/         # NV5-F2F-*/frame_*.webp
assets/nv5/svg/         # NV5-SVG-*
assets/nv5/mockups/     # NV5-M-*
```
