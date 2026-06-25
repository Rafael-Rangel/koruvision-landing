/** KORUVISION Motion System v5 — BUILD 48% / PEAK 24% / EXIT 28% */
export const BUILD_END = 0.48;
export const PEAK_END = 0.72;

export const smoothstep = (t: number) => {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
};

export const smoothrange = (t: number, a: number, b: number) => {
  if (b <= a) return t >= b ? 1 : 0;
  return smoothstep((t - a) / (b - a));
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type PhaseName = "build" | "peak" | "exit";

export function phase(local: number): { name: PhaseName; t: number } {
  if (local < BUILD_END) return { name: "build", t: local / BUILD_END };
  if (local < PEAK_END) return { name: "peak", t: (local - BUILD_END) / (PEAK_END - BUILD_END) };
  return { name: "exit", t: (local - PEAK_END) / (1 - PEAK_END) };
}

export interface ElementState {
  opacity: number;
  y: number;
  x: number;
  scale: number;
  rot: number;
}

export interface ElementStateOpts {
  yIn?: number;
  yOut?: number;
  scaleIn?: number;
  xOut?: number;
  rotOut?: number;
  xIn?: number;
}

export function elementState(
  local: number,
  enterLo: number,
  enterHi: number,
  exitLo: number,
  exitHi: number,
  opts: ElementStateOpts = {}
): ElementState {
  const { yIn = 24, yOut = -14, scaleIn = 0.92, xOut = 0, rotOut = 0, xIn = 0 } = opts;
  const ph = phase(local);
  if (ph.name === "build") {
    const e = smoothrange(ph.t, enterLo / BUILD_END, enterHi / BUILD_END);
    return { opacity: e, y: yIn * (1 - e), x: xIn * (1 - e), scale: scaleIn + (1 - scaleIn) * e, rot: 0 };
  }
  if (ph.name === "peak") return { opacity: 1, y: 0, x: 0, scale: 1, rot: 0 };
  const x = smoothrange(ph.t, (exitLo - PEAK_END) / (1 - PEAK_END), (exitHi - PEAK_END) / (1 - PEAK_END));
  return {
    opacity: 1 - x * 0.25,
    y: yOut * x,
    x: xOut * x,
    scale: 1 - x * 0.1,
    rot: rotOut * x,
  };
}

export function splitWords(el: HTMLElement | null): HTMLElement[] {
  if (!el) return [];
  const text = el.textContent ?? "";
  el.innerHTML = text
    .split(/(\s+)/)
    .map((w) => (w.trim() ? `<span class="word">${w}</span>` : w))
    .join("");
  return Array.from(el.querySelectorAll(".word"));
}
