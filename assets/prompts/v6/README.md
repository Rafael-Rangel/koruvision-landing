# NV6 Prompts · Product Canvas

Direção visual v6 para FlowIA — SaaS de mockups CRM + IA WhatsApp.

## Documentação mestre

| Documento | Função |
|-----------|--------|
| **[FlowIA-Design-Standards-Index.md](../../docs/FlowIA-Design-Standards-Index.md)** | **Índice de tudo que está aprovado (design, seções, motion, prompts)** |
| **[FlowIA-Visual-Script-v6.md](../../docs/FlowIA-Visual-Script-v6.md)** | Roteiro visual v6 · frames · transições |

Substitui visualmente: `assets/prompts/v5/` (Névoa Neural — legado).

## Gerar prompts

```bash
python scripts/build_v6_prompts.py
```

## Gerar binários (quando pipeline nv6 estiver configurado)

```bash
# Copiar nv5_pipeline.py → nv6_pipeline.py e ajustar paths para nv6
python scripts/nv5_pipeline.py --images   # temporário: editar output para public/assets/nv6
```

## .env após geração

```
NEXT_PUBLIC_ASSET_BASE=/assets/nv6
NEXT_PUBLIC_ENABLE_F2F=false
NEXT_PUBLIC_ENABLE_VIDEO=true
```

## Política F2F v6

F2F desativado por padrão. UI React é a fonte da verdade do produto.
