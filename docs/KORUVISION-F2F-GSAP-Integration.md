# NV5 — F2F Pipeline · GSAP ScrollTrigger Integration

> **16 sequências · 1.930 frames · Canvas L10**

---

## 1. Pipeline completo

```
NV5-VID-XXX.mp4
    ↓ FFmpeg extract (nv5_extract_f2f.py)
assets/nv5/f2f/NV5-F2F-XXX/frame_NNNN.webp
    ↓ manifest.json (count, fps, width, height)
FrameScrubber.tsx (NV5-R-008)
    ↓ ScrollTrigger scrub sync
Canvas L10 overlay (mix-blend-mode: screen)
```

### FFmpeg presets

| Tier | Command | Size/frame |
|------|---------|------------|
| Hero S01 | `fps=25,scale=2560:-1` cwebp q80 | ~180KB |
| Standard | `fps=20,scale=1920:-1` cwebp q82 | ~120KB |
| Reduced mobile | `fps=12,scale=1280:-1` cwebp q78 | ~60KB |

**Total disk budget:** ~220MB all sequences · **Active memory:** ≤4MB (1 seq loaded)

---

## 2. FrameScrubber component spec

```tsx
// NV5-R-008 FrameScrubber.tsx
interface FrameScrubberProps {
  seqId: string;           // NV5-F2F-004
  manifest: F2FManifest;
  scrollTrigger: ScrollTrigger.Vars;
  blendMode?: 'screen' | 'normal';
  activePhases?: ('exit')[]; // default: exit only overlays UI
  zIndex?: number;         // default: -1 during build, 5 during exit
}

interface F2FManifest {
  id: string;
  count: number;
  fps: number;
  width: number;
  height: number;
  segments?: { label: string; start: number; end: number }[];
}
```

### Core scrub logic

```js
function createF2FScrubber(canvas, manifest, trigger) {
  const images = []; // lazy loaded
  let currentFrame = -1;

  ScrollTrigger.create({
    ...trigger,
    onUpdate: (self) => {
      const frame = Math.round(self.progress * (manifest.count - 1));
      if (frame !== currentFrame) {
        currentFrame = frame;
        drawFrame(images[frame]);
      }
    }
  });
}

function drawFrame(img) {
  if (!img?.complete) return;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
}
```

---

## 3. Integração por sequência

| F2F ID | Trigger | Pin | Scrub range | Phase active | GSAP sync |
|--------|---------|-----|-------------|--------------|-----------|
| F2F-001 | `#s01-pin` | 360vh | progress 0–1 | BUILD+EXIT | SplitText parallel |
| F2F-002 | `#s02-pin` | 240vh | 0–1 segmented 4×25f | BUILD per card | stat counter |
| F2F-003 | `#s03-pin` | 320vh | 0–1 continuous | full pin | Flip at 0.35–0.55 |
| F2F-004 | `#s04-pin` | 480vh | act-based 0–499 | EXIT each act | actTL crossfade |
| F2F-005 | `#s05-pin` | 280vh | 0–1 | BUILD monoliths | DrawSVG QR |
| F2F-006 | `#s06-pin` | 260H | toggle 0–1 | toggle scrub | chat swap |
| F2F-007 | `#s07-pin` | 240vh | intro 0–0.25 | BUILD only | inbox fade in |
| F2F-008 | `#s08-pin` | 260vh | gates 15f×4 | snap points | MotionPath card |
| F2F-009 | `#s09-pin` | 240vh | 0–1 | DrawSVG sync | node light 20f each |
| F2F-010 | `#s10` | — | on accordion | click | Flip card |
| F2F-011 | `#s11-pin` | 240vh | = slider.progress | PEAK | Draggable bind |
| F2F-012 | `#s12-pin` | 300H | per card focus | center snap | horizontal ST |
| F2F-013 | `#s13` | — | section progress | BG only opacity 0.6 | counters |
| F2F-014 | `#s15-pin` | 260vh | click tenant | Flip trigger | portal warp |
| F2F-015 | `#s16` | — | 40–100% section | scroll | DrawSVG shield |
| F2F-016 | `#s19-pin` | 320vh | 0–1 | BUILD+EXIT | SplitText+shockwave |

---

## 4. S04 F2F segment map (500 frames)

```js
const F2F_S04_SEGMENTS = [
  { act: 0, start: 0,   end: 99,  label: 'wa-to-ia' },
  { act: 1, start: 100, end: 199, label: 'ia-to-kanban' },
  { act: 2, start: 200, end: 299, label: 'kanban-to-cal' },
  { act: 3, start: 300, end: 399, label: 'cal-to-dash' },
  { act: 4, start: 400, end: 499, label: 'dash-pullout' }
];

// Map scroll progress → frame:
function s04FrameProgress(globalProgress) {
  const actF = globalProgress * 5;
  const act = Math.floor(actF);
  const local = actF - act;
  const seg = F2F_S04_SEGMENTS[Math.min(act, 4)];
  // F2F only in EXIT portion of each act (local > 0.72)
  if (local < 0.72) return null;
  const exitT = (local - 0.72) / 0.28;
  const frame = seg.start + exitT * (seg.end - seg.start);
  return Math.round(frame);
}
```

---

## 5. Lazy load strategy

```js
const F2F_LOAD_MAP = {
  's01-pin': { load: 'F2F-001', preload: 'F2F-002' },
  's02-pin': { load: 'F2F-002', preload: 'F2F-003' },
  // ...
};

async function loadSequence(seqId) {
  const manifest = await fetch(`/assets/nv5/f2f/${seqId}/manifest.json`);
  // load frames in batches of 30
  // decode off main thread via createImageBitmap where supported
}

function unloadSequence(seqId) {
  // keep only current + preload + previous
}
```

**Preload trigger:** when section N at 60% progress, begin loading N+1 sequence.

---

## 6. Mobile fallback

| Seção | Mobile strategy |
|-------|-----------------|
| S01, S03, S04, S19 | MP4 chapter single play @ 0.5× speed scrub optional |
| S02, S05–S09 | Static IMG + CSS transitions |
| S11 | Crossfade presets Caos/Controle buttons |
| All | F2F disabled · memory cap 1.5MB |

---

## 7. manifest.json schema

```json
{
  "id": "NV5-F2F-004",
  "count": 500,
  "fps": 35,
  "width": 1920,
  "height": 1080,
  "source": ["NV5-VID-004", "NV5-VID-005"],
  "segments": [
    { "label": "wa-to-ia", "start": 0, "end": 99 }
  ],
  "blendMode": "screen",
  "activePhases": ["exit"]
}
```

---

## 8. Script extract

```bash
python scripts/nv5_extract_f2f.py NV5-F2F-001 assets/nv5/videos/NV5-VID-001.mp4 25
```

---

*Ver também `f2f-sequences.md` · `scripts/nv5_extract_f2f.py`*
