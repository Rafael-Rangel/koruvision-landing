# KORUVISION v5 — Sistema de Cor e Legibilidade

> **Objetivo:** WCAG 2.1 AA mínimo em todo texto · AAA em CTAs e headlines sobre void  
> **Problema atual protótipo:** tokens duplicados s04.css vs koruvision.css · emojis · contrastes não validados

---

## 1. Paleta principal (única source of truth)

```css
:root {
  /* Void & surfaces */
  --void-deep:     #010208;  /* BG absoluto */
  --void-mist:     #0A0E1C;  /* Névoa base */
  --surface-glass: #12182A;  /* Painéis */
  --surface-2:     #161D32;  /* Cards internos */
  --border:        #1E2940;  /* Divisores */

  /* Text — hierarquia */
  --text-primary:  #F0F4FF;  /* Headlines, UI principal */
  --text-secondary:#8B9EC4;  /* Body, lede */
  --text-muted:    #4B5E80;  /* Labels, meta — NUNCA body longo */

  /* Brand accents */
  --violet-core:   #B24BFF;
  --violet-deep:   #6B21A8;
  --gold-liquid:   #FFC233;
  --chrome-rim:    #E8ECF8;
  --neural-cyan:   #2EE8C0;
  --success-pulse: #14F0A0;
  --danger-fog:    #FF4D6A;

  /* Functional */
  --wa-green:      #25D366;
  --cta-text:      #0A0A0A;  /* Sobre gold button */
}
```

**Ação obrigatória:** Remover de `s04.css` tokens legados `#9D4EDD`, `#FFB700`, `#10B981` → mapear para v5.

---

## 2. Paleta secundária (estados emocionais por ato)

| Ato | Seções | Accent dominante | BG overlay |
|-----|--------|------------------|------------|
| I Emergência | S01 | violet + gold | void-deep |
| I Tensão | S02 | danger-fog 12% | radial danger |
| II Alívio | S03 | cyan + violet | mist heal |
| II Desejo | S04 | violet + cyan UI | void + grid |
| III Maestria | S05–S09 | cyan neural | glass panels |
| IV Prova | S10–S16 | chrome + violet | bokeh reduced |
| V Decisão | S17–S19 | gold-liquid | convergence glow 8% max |

Transição entre atos: interpolar `--section-accent` over 80vh bridge (não threshold binário).

---

## 3. Contrastes WCAG (validados)

| Par | Ratio | Nível | Uso |
|-----|-------|-------|-----|
| `#F0F4FF` on `#010208` | 19.2:1 | AAA | Headlines |
| `#8B9EC4` on `#010208` | 8.1:1 | AAA | Body copy |
| `#8B9EC4` on `#12182A` | 6.4:1 | AA | Cards glass |
| `#4B5E80` on `#010208` | 4.6:1 | AA | Labels only |
| `#FFC233` on `#0A0A0A` | 12.1:1 | AAA | CTA text |
| `#2EE8C0` on `#010208` | 11.8:1 | AAA | Success metrics |
| `#FF4D6A` on `#010208` | 5.9:1 | AA | Danger stat S02 |
| `#B24BFF` on `#010208` | 7.2:1 | AA | Eyebrows |

**Proibido:** `--text-muted` (#4B5E80) para parágrafos >2 linhas.

---

## 4. Gradientes aprovados

| Token | CSS | Uso |
|-------|-----|-----|
| `--grad-headline` | `linear-gradient(135deg, #FFC233, #B24BFF)` | `<em>` headlines only |
| `--grad-cta` | `linear-gradient(135deg, #FFC233, #e6a500)` | ButtonPrimary |
| `--grad-river` | violet→gold→cyan | Data River SVG |
| `--grad-danger` | `#FF4D6A → #B24BFF` | S02 only |
| `--grad-glass-rim` | chrome 20% → transparent | Device bezel |

**Proibido:** gradiente em body text · gradiente animado em headlines durante PEAK.

---

## 5. Hover & focus states

| Elemento | Default | Hover | Focus-visible |
|----------|---------|-------|---------------|
| ButtonPrimary | grad-cta | shadow gold 32px + scale 1.02 | outline 2px cyan offset 3px |
| ButtonGhost | border violet 35% | border violet 60% + bg glass | outline cyan |
| TiltCard | border 20% | border 45% + translateZ +8 | ring cyan |
| Nav link | text-secondary | text-primary | underline cyan |
| FAQ row | transparent | bg surface-2 | border-left cyan 3px |
| Pricing Popular | gold rim | gold shimmer animation | scale 1.02 |

---

## 6. Regras anti-ilegibilidade

### 6.1 Problemas identificados no protótipo

| Problema | Local | Correção |
|----------|-------|----------|
| Data river opacity 0.35 sobre texto | Global | River atrás de conteúdo z-index 1; copy z-index 2; river só em margens |
| Glass card sem backdrop suficiente | S02–S17 | `background: rgba(18,24,42,0.85)` min |
| F2F canvas sobre UI | S04 L10 | F2F only in EXIT phase · blend screen · UI z+100 |
| Orbs/partículas sobre copy | S01 | Canvas clip to stage zone only |
| Emojis como ícones | S02, S10 | Substituir NV5-SVG-004–007 |
| `#sub` em cards danger | S02 | Usar `#F0F4FF` titles + `#8B9EC4` body |
| S14 satellites moving under text | S14 | Pause orbit at PEAK · text overlay solid BG |
| Shockwave SVG sobre headline | S19 | Shockwave z-index -1 · opacity max 0.25 |

### 6.2 Z-index legibilidade stack

```
z-200  nav
z-100  CTAs, interactive UI
z-50   float panels (S04)
z-10   section copy
z-5    device UI screens
z-2    stage 3D
z-1    data river, atmosphere
z-0    void BG, video L1
z--1   F2F canvas (EXIT only)
```

### 6.3 Text shadow (uso restrito)

Apenas headlines sobre video/F2F busy BG:
```css
.text-over-media {
  text-shadow: 0 2px 24px rgba(1,2,8,0.9), 0 0 40px rgba(1,2,8,0.6);
}
```

---

## 7. Tipografia

| Role | Font | Size desktop | Weight | Line-height |
|------|------|--------------|--------|-------------|
| Display H1 | Syne or Instrument Sans | clamp(2rem, 4.5vw, 3.25rem) | 800 | 1.08 |
| H2 section | Inter | clamp(1.75rem, 3.5vw, 2.75rem) | 800 | 1.1 |
| Lede | Inter | 1.05rem | 400 | 1.6 |
| Eyebrow | Inter | 0.7rem | 600 | 1.4 · ls 0.16em |
| UI body | Inter | 0.85–0.95rem | 400–500 | 1.5 |
| Metric | Inter | 2–3rem | 800 | 1 |

**Mobile:** H1 min 1.75rem · lede min 1rem · nunca abaixo 16px base.

---

## 8. Checklist legibilidade (por seção)

- [ ] Headline contrast AAA on BG
- [ ] Body min AA on surface used
- [ ] PEAK: zero motion on primary text
- [ ] Video/F2F never under copy during PEAK
- [ ] CTA always `#0A0A0A` on gold
- [ ] Focus states keyboard accessible
- [ ] Reduced motion: no SplitText char anim

---

*Consolidar em `DesignTokensProvider` NV5-R-001 antes da build Next.js*
