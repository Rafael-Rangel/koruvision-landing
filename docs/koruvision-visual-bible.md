# KORUVISION — Visual Bible (FlowIA Landing)

## Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| bg-void | `#000000` | Fundo base |
| bg-surface | `#0A0A0F` | Superfícies |
| accent-gold | `#FFB700` | KORU, highlights, CTAs |
| accent-purple | `#9D4EDD` | VISION, glow principal |
| accent-purple-deep | `#7B2CBF` | Sombras violeta |
| accent-chrome | `#E0E0E0` | Rim light metálico |
| accent-success | `#10B981` | Conversões / métricas |

## Prefixo de prompt (obrigatório)

```
KORUVISION brand aesthetic, premium dark mode SaaS, true black background #000000,
vibrant purple glow #9D4EDD and metallic gold accents #FFB700, polished chrome silver
rim lighting #E0E0E0, cinematic volumetric lighting, subtle amber and purple bokeh
particles, hyper-realistic metallic textures, intelligent visionary mood,
8K commercial quality. Match the color mood and lighting style of the reference image.
```

## Regras de qualidade (IA)

- **Mãos:** exatamente 5 dedos por mão; preferir cenas **sem pessoas/mãos** quando possível (I-05, I-07).
- **Texto KORUVISION:** nunca gerar por IA — usar sempre `assets/refs/koruvision-logo-master.png`.
- **UI legível:** mockups com texto via Figma/React ou Pillow (`scripts/create_phone_mockup.py`).
- **Idioma:** textos de interface em português do Brasil; termos SaaS em inglês permitidos (Dashboard, Chat, CRM, Kanban, API).

## Negative prompt global

```
extra fingers, six fingers, deformed hands, malformed hands, too many fingers,
missing fingers, fused fingers, text, letters, words, watermark, signature,
bright white background, stock photo, cartoon, blurry, deformed
```

## Referência master

- Logo: `assets/refs/koruvision-logo-master.png`
- Usada como `input_images[0]` em todas as gerações FLUX.2 Pro

## Pipeline

- **IA:** backgrounds, cenas, abstratos, avatares, demo plates
- **Figma/React:** I-09 a I-13 (mockups UI)
- **Pillow:** M-01 mockup app com logo oficial
- **Modelo:** FLUX.2 Pro (finals) / FLUX.2 Dev (texturas simples)
- **Sem vídeo** nesta fase

## Script de geração

```bash
python scripts/generate_koruvision.py
python scripts/generate_koruvision.py I-01 --force  # regerar um asset
python scripts/create_phone_mockup.py               # mockup M-01
```

## Documento oficial v2

**Fonte da verdade para producao:** `docs/KORUVISION-Landing-Oficial-v2.md`  
(19 secoes · copy · motion · componentes · pipeline completo)

## Preview

Abrir `assets/preview.html` no navegador.
