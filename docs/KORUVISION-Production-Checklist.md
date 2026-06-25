# KORUVISION v5 — Production Checklist · Definition of Done

> Marque ✅ apenas com artefato verificável (arquivo gerado + integrado + QA pass)

---

## A. Assets visuais (192 únicos)

### Imagens FLUX (48)
- [ ] NV5-IMG-001 a 048 gerados WebP
- [ ] Variações desktop/mobile/lqip/alt (×4)
- [ ] Integrados next/image com blur placeholder
- [ ] Prompts arquivados flux-images.md

### Keyframes (30)
- [ ] NV5-KEY-001 a 030 gerados
- [ ] Pares validados visualmente start→end continuity
- [ ] kling-keyframes.md completo

### Mockups (10)
- [ ] NV5-M-01 device shell master
- [ ] NV5-M-02 a 06 golden UI screens
- [ ] NV5-M-07 a 10 component exports
- [ ] Shell idêntico S01=S04=S07

### Composições (7)
- [ ] NV5-C-01 a C-07 composto + device slot

---

## B. Vídeos (15)

- [ ] NV5-VID-001 a 015 MP4 gerados
- [ ] Storyboards video-storyboards.md validados frame-a-frame
- [ ] H.265 + WebM dual source
- [ ] Loops seamless QA (013, 015, 010, 011)
- [ ] Sem texto legível em nenhum frame

---

## C. Frame-by-frame (16 · 1.930 frames)

- [ ] Todas sequências extraídas WebP
- [ ] manifest.json por sequência
- [ ] FrameScrubber NV5-R-008 integrado
- [ ] Lazy load + unload funcional
- [ ] Memória ≤4MB desktop
- [ ] Mobile fallbacks MP4/static

---

## D. SVG (28)

- [ ] NV5-SVG-001 a 028 exportados SVGO
- [ ] Paths <120 pontos
- [ ] Cores via CSS variables
- [ ] DrawSVG/MorphSVG/MotionPath testados

---

## E. React (38 componentes)

- [ ] DesignTokensProvider v5
- [ ] 5 golden UI screens (R-011–015)
- [ ] 19 section wrappers (R-021–038)
- [ ] Motion components (R-004–010)
- [ ] FrameScrubber production-ready

---

## F. 19 seções implementadas

| Seção | HTML | GSAP spec | Assets | PEAK | Bridge | Mobile |
|-------|:---:|:---:|:---:|:---:|:---:|:---:|
| S01 | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⚠️ |
| S02 | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⚠️ |
| S03 | ⚠️ | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| S04 | ⚠️ | ✅ | ❌ | ✅ | ❌ | ⚠️ |
| S05 | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⚠️ |
| S06 | ⚠️ | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| S07 | ⚠️ | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| S08 | ⚠️ | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| S09 | ⚠️ | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| S10 | ⚠️ | ✅ | ❌ | ❌ | — | ⚠️ |
| S11 | ⚠️ | ✅ | ❌ | ✅ | ❌ | ⚠️ |
| S12 | ⚠️ | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| S13 | ⚠️ | ✅ | ❌ | ❌ | — | ⚠️ |
| S14 | ⚠️ | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| S15 | ⚠️ | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| S16 | ⚠️ | ✅ | ❌ | ❌ | — | ⚠️ |
| S17 | ⚠️ | ✅ | ❌ | ❌ | — | ⚠️ |
| S18 | ⚠️ | ✅ | ❌ | — | — | ⚠️ |
| S19 | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⚠️ |

⚠️ = protótipo parcial · ✅ = spec completa · ❌ = não entregue

---

## G. Motion system

- [ ] BUILD/PEAK/EXIT all pinned sections
- [ ] Master timeline labels S01–S19
- [ ] ScrollSmoother desktop
- [ ] matchMedia 3 tiers
- [ ] Flip S02→S03
- [ ] Data river unificado DrawSVG
- [ ] Section handoffs (8 bridges)
- [ ] Hover system complete
- [ ] GSAP Technology Map implemented

---

## H. Visual quality

- [ ] Color tokens unified (s04 → v5)
- [ ] WCAG AA all text verified
- [ ] No emojis in production
- [ ] Display font loaded
- [ ] Pin total ≤3.240vh
- [ ] No section overlap/atropelo
- [ ] Typography hierarchy consistent

---

## I. Performance

- [ ] LCP desktop <2.8s
- [ ] LCP mobile <3.2s
- [ ] INP <200ms
- [ ] FPS scroll ≥55
- [ ] Lazy load images/video/F2F
- [ ] SVGO all SVGs

---

## J. QA final

- [ ] Chrome / Safari / Firefox desktop
- [ ] iOS Safari / Android Chrome
- [ ] prefers-reduced-motion
- [ ] Keyboard navigation
- [ ] All CTAs link to signup flow
- [ ] Cross-browser GSAP pin no jank

---

## Status geral

| Categoria | Spec | Gerado | Integrado | Production-ready |
|-----------|------|--------|-----------|------------------|
| Documentação | **95%** | — | — | — |
| Prompts/assets spec | **100%** | **0%** | **0%** | **0%** |
| Protótipo HTML | 80% | 80% | 60% | **35%** |
| Next.js production | 0% | 0% | 0% | **0%** |

**Veredito:** Planejamento avançado + protótipo parcial. **Não production-ready.**

---

*Atualizar checklist após cada sprint · Target: 100% antes de deploy*
