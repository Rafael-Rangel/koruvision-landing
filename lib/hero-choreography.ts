/** Coreografia Hero v7 — timing orquestrado, camadas sem competição */
import { smoothrange, smoothstep, lerp } from "./motion-system";

export type HeroLayer = "ambient" | "energy" | "owlPlate" | "owlVideo" | "copy" | "eyebrow" | "lede" | "cta";

const ease = smoothstep;

export interface HeroTransform {
  opacity: number;
  x: number;
  y: number;
  scale: number;
  rotateY: number;
  rotateX: number;
  z: number;
  blur: number;
  brightness: number;
}

const IDENTITY: HeroTransform = {
  opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0, rotateX: 0, z: 0, blur: 0, brightness: 1,
};

function windowed(p: number, lo: number, hi: number) {
  return ease(smoothrange(p, lo, hi));
}

/** Entrada BUILD · PEAK estável · EXIT handoff para S02 */
export function heroLayerTransform(p: number, layer: HeroLayer): HeroTransform {
  const build = p < 0.48;
  const exit = p > 0.72;
  const peak = !build && !exit;

  switch (layer) {
    case "ambient": {
      const inT = windowed(p, 0, 0.22);
      const drift = Math.sin(p * Math.PI * 2) * 2;
      const exitT = exit ? windowed(p, 0.72, 0.98) : 0;
      return {
        opacity: inT * (1 - exitT * 0.6),
        x: drift + exitT * -18,
        y: lerp(24, 0, inT) + exitT * 12,
        scale: lerp(1.06, 1, inT) + exitT * 0.08,
        rotateY: -4 + inT * 2,
        rotateX: 0,
        z: -140,
        blur: exitT * 3,
        brightness: 1,
      };
    }
    case "energy": {
      const inT = windowed(p, 0.08, 0.32);
      const exitT = exit ? windowed(p, 0.74, 1) : 0;
      return {
        opacity: inT * 0.85 * (1 - exitT * 0.5),
        x: lerp(40, 0, inT) + exitT * 28,
        y: lerp(20, 0, inT) + exitT * -8,
        scale: lerp(1.08, 1, inT) + exitT * 0.04,
        rotateY: lerp(8, 0, inT),
        rotateX: lerp(6, 0, inT),
        z: -70,
        blur: exitT * 2,
        brightness: 1 + inT * 0.06,
      };
    }
    case "owlPlate": {
      const inT = windowed(p, 0.16, 0.38);
      const exitT = exit ? windowed(p, 0.7, 1) : 0;
      const breath = peak ? Math.sin(p * Math.PI * 4) * 0.004 : 0;
      return {
        opacity: inT * (1 - exitT * 0.85),
        x: exitT * -12,
        y: lerp(32, 0, inT) + exitT * -6,
        scale: lerp(0.94, 1, inT) + breath + exitT * 0.12,
        rotateY: lerp(-6, 0, inT),
        rotateX: 0,
        z: -25,
        blur: lerp(2, 0, inT) + exitT * 4,
        brightness: 1,
      };
    }
    case "owlVideo": {
      const inT = windowed(p, 0.24, 0.46);
      const exitT = exit ? windowed(p, 0.68, 1) : 0;
      const breath = peak ? Math.sin(p * Math.PI * 3) * 0.006 : 0;
      const camY = peak ? Math.sin(p * Math.PI * 2) * 3 : 0;
      const camX = peak ? Math.cos(p * Math.PI * 2) * 2 : 0;
      return {
        opacity: inT,
        x: camX + exitT * -24,
        y: lerp(48, camY, inT) + exitT * -20,
        scale: lerp(0.88, 1, inT) + breath + exitT * 0.22,
        rotateY: lerp(-10, -2, inT) + exitT * 4,
        rotateX: lerp(8, 2, inT) - exitT * 6,
        z: 50,
        blur: 0,
        brightness: 1 + exitT * 0.12,
      };
    }
    case "eyebrow": {
      const inT = windowed(p, 0.04, 0.14);
      const exitT = exit ? windowed(p, 0.75, 0.92) : 0;
      return { ...IDENTITY, opacity: inT * (1 - exitT), y: lerp(16, 0, inT) - exitT * 20, x: exitT * -16 };
    }
    case "copy": {
      const exitT = exit ? windowed(p, 0.76, 0.96) : 0;
      return { ...IDENTITY, opacity: 1, y: -exitT * 28, x: -exitT * 32 };
    }
    case "lede": {
      const inT = windowed(p, 0.28, 0.42);
      const exitT = exit ? windowed(p, 0.78, 0.94) : 0;
      return { ...IDENTITY, opacity: inT * (1 - exitT), y: lerp(20, 0, inT) - exitT * 18 };
    }
    case "cta": {
      const inT = windowed(p, 0.38, 0.52);
      const exitT = exit ? windowed(p, 0.8, 0.96) : 0;
      return { ...IDENTITY, opacity: inT * (1 - exitT), y: lerp(24, 0, inT) - exitT * 14, scale: lerp(0.96, 1, inT) };
    }
    default:
      return IDENTITY;
  }
}

export function heroWordTransform(p: number, index: number, total: number) {
  const spread = 0.28 / Math.max(total, 1);
  const lo = 0.06 + index * spread;
  const hi = lo + spread * 1.4;
  const inT = windowed(p, lo, hi);
  const exitT = p > 0.72 ? windowed(p, 0.76 + index * 0.01, 0.95) : 0;
  return {
    opacity: inT * (1 - exitT),
    y: lerp(36, 0, inT) - exitT * 22,
    x: -exitT * 12,
    scale: lerp(0.9, 1, inT),
  };
}

/** Handoff S01→S02: continuidade da coruja */
export function visionBridgeOwl(p: number): HeroTransform {
  const enter = windowed(p, 0, 0.12);
  const tunnel = windowed(p, 0.35, 0.92);
  return {
    opacity: lerp(0.4, 1, enter) * (1 - tunnel * 0.15),
    x: lerp(-24, 0, enter),
    y: lerp(-20, 0, enter) + tunnel * -10,
    scale: lerp(1.22, 1.65, p),
    rotateY: lerp(4, 0, enter),
    rotateX: tunnel * -8,
    z: 80,
    blur: tunnel * 1.5,
    brightness: 1 + tunnel * 0.18,
  };
}

export function visionTunnelMask(p: number) {
  const open = windowed(p, 0.2, 0.55);
  const close = windowed(p, 0.78, 1);
  const radius = lerp(0, 42, open) + close * 18;
  return { radius, opacity: open * (1 - close * 0.3) };
}

export function applyHeroTransform(el: HTMLElement | null, t: HeroTransform) {
  if (!el) return;
  el.style.opacity = String(t.opacity);
  el.style.transform = [
    `translate3d(${t.x}px, ${t.y}px, ${t.z}px)`,
    `scale(${t.scale})`,
    `rotateY(${t.rotateY}deg)`,
    `rotateX(${t.rotateX}deg)`,
  ].join(" ");
  el.style.filter = [
    t.blur > 0 ? `blur(${t.blur}px)` : "",
    t.brightness !== 1 ? `brightness(${t.brightness})` : "",
  ].filter(Boolean).join(" ") || "none";
}
