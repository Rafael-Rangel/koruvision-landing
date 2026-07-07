import { lerp, smoothrange } from "@/lib/motion-system";

export interface PillarTheme {
  a: string;
  b: string;
  grid: string;
}

export const PILLAR_THEMES: PillarTheme[] = [
  { a: "46, 232, 192", b: "56, 189, 248", grid: "46, 232, 192" },
  { a: "139, 92, 246", b: "196, 181, 253", grid: "139, 92, 246" },
  { a: "255, 194, 51", b: "255, 120, 80", grid: "255, 194, 51" },
  { a: "59, 130, 246", b: "139, 92, 246", grid: "96, 165, 250" },
  { a: "255, 194, 51", b: "139, 92, 246", grid: "255, 194, 51" },
];

export interface PillarsScrollState {
  global: number;
  activeIndex: number;
  segmentT: number;
  isClimax: boolean;
  /** 0→1 intensidade do pilar ativo (sincroniza tudo) */
  focus: number;
  copyOpacity: number;
  railProgress: number;
  threeDProgress: number;
  meshProgress: number;
  ambientOpacity: number;
  themeA: string;
  themeB: string;
  themeMix: number;
  gridRgb: string;
  glowOpacity: number;
}

const INTRO_END = 0.08;
const CLIMAX_START = 0.84;

function lerpRgb(a: string, b: string, t: number): string {
  const pa = a.split(",").map((v) => Number(v.trim()));
  const pb = b.split(",").map((v) => Number(v.trim()));
  return pa.map((v, i) => Math.round(lerp(v, pb[i] ?? v, t))).join(", ");
}

function segmentFocus(segmentT: number): number {
  return smoothrange(segmentT, 0.06, 0.28) * (1 - smoothrange(segmentT, 0.72, 0.94));
}

function pillarThemeColors(
  activeIndex: number,
  segmentT: number,
  isClimax: boolean,
  climaxT: number
): { themeA: string; themeB: string; gridRgb: string } {
  if (isClimax) {
    const from = PILLAR_THEMES[3];
    const to = PILLAR_THEMES[4];
    const mix = smoothrange(climaxT, 0, 0.32);
    return {
      themeA: lerpRgb(from.a, to.a, mix),
      themeB: lerpRgb(from.b, to.b, mix),
      gridRgb: lerpRgb(from.grid, to.grid, mix),
    };
  }

  const enterMix = smoothrange(segmentT, 0, 0.28);
  const exitMix = smoothrange(segmentT, 0.72, 0.94);

  if (segmentT < 0.28 && activeIndex > 0) {
    const from = PILLAR_THEMES[activeIndex - 1];
    const to = PILLAR_THEMES[activeIndex];
    return {
      themeA: lerpRgb(from.a, to.a, enterMix),
      themeB: lerpRgb(from.b, to.b, enterMix),
      gridRgb: lerpRgb(from.grid, to.grid, enterMix),
    };
  }

  if (segmentT > 0.72) {
    const nextIndex = Math.min(4, activeIndex + 1);
    const from = PILLAR_THEMES[activeIndex];
    const to = PILLAR_THEMES[nextIndex];
    return {
      themeA: lerpRgb(from.a, to.a, exitMix),
      themeB: lerpRgb(from.b, to.b, exitMix),
      gridRgb: lerpRgb(from.grid, to.grid, exitMix),
    };
  }

  const t = PILLAR_THEMES[activeIndex];
  return { themeA: t.a, themeB: t.b, gridRgb: t.grid };
}

/** Mapeia scroll do pin S04 — intro → 4 pilares (iguais) → organismo */
export function pillarsScrollMap(p: number): PillarsScrollState {
  const global = Math.max(0, Math.min(1, p));
  let activeIndex = 0;
  let segmentT = 0;
  let isClimax = false;
  let focus = 0;

  if (global < INTRO_END) {
    activeIndex = 0;
    segmentT = global / INTRO_END;
    focus = smoothrange(segmentT, 0.35, 0.85) * 0.35;
  } else if (global >= CLIMAX_START) {
    isClimax = true;
    activeIndex = 4;
    segmentT = (global - CLIMAX_START) / (1 - CLIMAX_START);
    focus = smoothrange(segmentT, 0.08, 0.38);
  } else {
    const span = CLIMAX_START - INTRO_END;
    const t = (global - INTRO_END) / span;
    activeIndex = Math.min(3, Math.floor(t * 4));
    segmentT = (t * 4) % 1;
    focus = segmentFocus(segmentT);
  }

  const colors = pillarThemeColors(activeIndex, segmentT, isClimax, isClimax ? segmentT : 0);
  const themeMix = isClimax ? smoothrange(segmentT, 0, 0.32) : segmentT < 0.28 ? smoothrange(segmentT, 0, 0.28) : segmentT > 0.72 ? smoothrange(segmentT, 0.72, 0.94) : 1;

  const copyOpacity = smoothrange(global, 0.02, 0.1) * (1 - smoothrange(global, 0.92, 0.99) * 0.2);
  const pillarBeat = isClimax ? 0.86 + focus * 0.1 : 0.18 + activeIndex * 0.17 + focus * 0.2;
  const threeDProgress = global < INTRO_END && !isClimax ? 0.08 + focus * 0.12 : pillarBeat;
  const meshProgress = isClimax ? 0.7 + focus * 0.3 : (activeIndex + focus) / 4.2;

  return {
    global,
    activeIndex,
    segmentT,
    isClimax,
    focus,
    copyOpacity,
    railProgress: isClimax ? 1 : (activeIndex + segmentT) / 4,
    threeDProgress,
    meshProgress,
    ambientOpacity: 0.32 + focus * 0.5,
    themeA: colors.themeA,
    themeB: colors.themeB,
    themeMix,
    gridRgb: colors.gridRgb,
    glowOpacity: focus * 0.95,
  };
}

/** Opacidade de cada tela (0–3 pilares, 4 = organismo) — sincronizado com focus */
export function pillarLayerOpacity(map: PillarsScrollState, layer: number): number {
  if (map.global <= 0) return 0;

  if (map.isClimax) {
    return layer === 4 ? map.focus : Math.max(0, (1 - map.focus) * (layer === map.activeIndex - 1 ? 0.25 : 0));
  }

  if (layer === 4) return 0;

  if (layer === map.activeIndex) return map.focus;

  if (layer === map.activeIndex - 1 && map.segmentT < 0.35) {
    return (1 - map.focus) * (1 - smoothrange(map.segmentT, 0.2, 0.35));
  }

  return 0;
}

export function pillarCardLit(map: PillarsScrollState, index: number): number {
  if (map.isClimax) return 1;
  if (index < map.activeIndex) return 1;
  if (index > map.activeIndex) return 0;
  return map.focus;
}

export function organismCardLit(map: PillarsScrollState): number {
  if (map.isClimax) return map.focus;
  return smoothrange(map.global, CLIMAX_START - 0.06, CLIMAX_START) * 0.35;
}

export function isCurrentPillar(map: PillarsScrollState, index: number): boolean {
  return !map.isClimax && map.activeIndex === index && map.focus > 0.38;
}
