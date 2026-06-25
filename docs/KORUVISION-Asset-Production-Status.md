# NV5 — Status de Produção por Seção
> **Atualizado:** 24 Jun 2026 · **API:** Replicate (`REPLICATE_API_TOKEN`)  
> **Modelos:** FLUX Schnell (imagens) · Kling 2.5 Turbo Pro (vídeos)  
> **Output:** `public/assets/nv5/`  
> **Docs fonte:** `docs/KORUVISION-Asset-Map-Master.md`

---

## Resumo binários

| Tipo | Spec | Gerado | API |
|------|------|--------|-----|
| Imagens NV5-IMG | 48 | **48** | FLUX Schnell |
| Keyframes NV5-KEY | 30 | **26+4 alias** | FLUX Schnell |
| Vídeos NV5-VID | 15 | **1** (em retomada) | Kling 2.5 |
| Sequências F2F | 16 | **1** | FFmpeg extract |
| Frames F2F total | ~1.930 | **127** | — |

**Comando pipeline:**
```bash
python scripts/nv5_pipeline.py --status
python scripts/nv5_pipeline.py --videos   # retoma vídeos faltantes
python scripts/nv5_pipeline.py --f2f       # extrai WebP após vídeos
```

---

## Por seção (S01–S19)

| Seção | Imagens FLUX | Vídeo Kling | F2F scroll | Status |
|-------|-------------|-------------|------------|--------|
| **S01 Hero** | IMG-001–004, 039 | VID-001, VID-015 | F2F-001 (150f) | IMG ok · VID-001 ok · F2F parcial (127f) · VID-015 pendente |
| **S02 Problema** | IMG-005–008, 043 | VID-002 | F2F-002 (100f) | IMG ok · VID/F2F pendente |
| **S03 Bridge** | IMG-009–011, 046 | VID-003 | F2F-003 (180f) | IMG ok · VID/F2F pendente |
| **S04 Demo** | IMG-012–014, 040 | VID-004, VID-005 | F2F-004 (250f) | IMG ok · VID/F2F pendente |
| **S05 Setup** | IMG-015–016 | VID-006 | F2F-005 (120f) | IMG ok · VID/F2F pendente |
| **S06 Agentes** | IMG-017–018 | — | F2F-006 (80f) | IMG ok · F2F pendente |
| **S07 Inbox** | IMG-019, 042 | — | F2F-007 (60f) | IMG ok · F2F pendente |
| **S08 Funil** | IMG-020–021, 047 | VID-007 | F2F-008 (60f) | IMG ok · VID/F2F pendente |
| **S09 Automações** | IMG-022–023 | VID-008 | F2F-009 (120f) | IMG ok · VID/F2F pendente |
| **S10 Benefícios** | IMG-024, 041 | — | F2F-010 (40f) | IMG ok · F2F pendente |
| **S11 Antes/Depois** | IMG-025–026 | VID-009 | F2F-011 (100f) | IMG ok · VID/F2F pendente |
| **S12 Cases** | IMG-027–031 | VID-010 | F2F-012 (120f) | IMG ok · VID/F2F pendente |
| **S13 Social** | IMG-032 | VID-010 (loop) | F2F-013 (60f) | IMG ok · VID/F2F pendente |
| **S14 Integrações** | IMG-033 | VID-011 | — | IMG ok · VID pendente |
| **S15 Agência** | IMG-034 | VID-012 | F2F-014 (70f) | IMG ok · VID/F2F pendente |
| **S16 Segurança** | IMG-035 | — | F2F-015 (80f) | IMG ok · F2F pendente |
| **S17 Planos** | IMG-044 | — | — | IMG ok |
| **S18 FAQ** | IMG-045 | — | — | IMG ok |
| **S19 CTA** | IMG-036–038 | VID-013, VID-014 | F2F-016 (120f) | IMG ok · VID/F2F pendente |

### Global (parallax/grain)
| Asset | Arquivo | Status |
|-------|---------|--------|
| IMG-039–048 | depth plates, grain | **10/10 ok** |

---

## Integração landing (Next.js)

| Path | Uso |
|------|-----|
| `/assets/nv5/images/*.webp` | `SectionBackground` por seção |
| `/assets/nv5/videos/nv5-vid-*.mp4` | `VideoLayer` loop/ambient |
| `/assets/nv5/f2f/NV5-F2F-*/frame_*.webp` | `FrameScrubber` scroll scrub |

Config: `config/sections.ts` · Componentes: `components/motion/SectionMediaLayers.tsx`

---

## Nota Replicate vs Replit

- **Replicate** = API de geração (FLUX + Kling) — **isto é o que foi usado**
- **Replit** = plataforma de deploy — opcional (`.replit` existe mas não gera assets)

---

## Próximo passo automático

1. `python scripts/nv5_pipeline.py --videos` — 14 vídeos restantes (~40–60 min)
2. `python scripts/nv5_pipeline.py --f2f` — 15 sequências WebP
3. Recarregar landing — assets aparecem automaticamente via paths em `config/sections.ts`
