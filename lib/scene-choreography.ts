/**
 * Coreografia cinematográfica S02 → S03 → S04
 * Funções puras driven por scroll progress (0–1).
 */
import { lerp, smoothrange, smoothstep } from "@/lib/motion-system";
import type { HeroTransform } from "@/lib/hero-choreography";

function windowed(p: number, lo: number, hi: number) {
  return smoothstep(smoothrange(p, lo, hi));
}

export interface SceneTransform {
  opacity: number;
  x: number;
  y: number;
  z: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  blur: number;
}

function baseTransform(): SceneTransform {
  return { opacity: 1, x: 0, y: 0, z: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, blur: 0 };
}

/** S02 — único protagonista F2F: entrada suave, pico estável, saída em túnel */
export function visionBridgeFocal(p: number): HeroTransform {
  const enter = windowed(p, 0, 0.14);
  const peak = windowed(p, 0.14, 0.72);
  const exit = windowed(p, 0.72, 1);
  return {
    opacity: lerp(0.85, 1, enter) * (1 - exit * 0.35),
    x: lerp(-8, 0, enter) - exit * 6,
    y: lerp(12, 0, enter) - exit * 28,
    scale: lerp(1.08, 1.18, peak) + exit * 0.22,
    rotateY: lerp(3, 0, enter),
    rotateX: exit * -12,
    z: lerp(40, 80, peak) - exit * 120,
    blur: exit * 2.4,
    brightness: 1 + exit * 0.12,
  };
}

/** S02 — posters só no carregamento inicial */
export function visionBridgePosterOpacity(p: number, ready: boolean): number {
  if (ready) return Math.max(0, 0.55 - p * 2.2);
  return Math.max(0, 0.9 - p * 1.4);
}

/** Centro da pupila da coruja (S02 ↔ S03) */
export const OWL_PUPIL = { x: 50, y: 42, radiusVmin: 7.5 } as const;

const PROBLEM_REVEAL_END = 0.36;

/** S02 — saída: zoom na pupila → buraco circular para handoff S03 */
export function visionBridgeVideoExit(p: number) {
  const zoom = smoothrange(p, 0.82, 0.96);
  const fade = smoothrange(p, 0.88, 0.98);
  const iris = smoothrange(p, 0.86, 1);
  const pupilR = lerp(48, OWL_PUPIL.radiusVmin, iris);
  const blackout = smoothrange(p, 0.86, 0.94) * (1 - smoothrange(p, 0.94, 1));
  const mistFade = 1 - smoothrange(p, 0.9, 0.98);
  return {
    scale: 1 + zoom * 1.05,
    blur: zoom * 4.5,
    opacity: 1 - fade * 0.98,
    mist: smoothrange(p, 0.76, 0.9) * mistFade,
    tunnel: iris,
    irisRadius: pupilR,
    blackout,
    lines: smoothrange(p, 0.8, 0.92) * mistFade,
  };
}

/** S03 — íris abre (círculo pupila → tela cheia) */
export function problemSceneEnter(p: number) {
  const reveal = smoothrange(p, 0, PROBLEM_REVEAL_END);
  return problemSceneEnterWithIris(reveal, p);
}

/** S03 — íris dirigida pelo fluxo unificado (handoff S02→S03) */
export function problemSceneEnterWithIris(irisReveal: number, rawP: number) {
  const reveal = Math.max(0, Math.min(1, irisReveal));
  const circleRadius = lerp(OWL_PUPIL.radiusVmin, 150, reveal);
  const contentIn = smoothrange(rawP, 0.28, 0.42);
  const contentGate = smoothrange(reveal, 0.48, 0.82);
  return {
    circleRadius,
    circleX: OWL_PUPIL.x,
    circleY: OWL_PUPIL.y,
    reveal,
    irisClip: `circle(${circleRadius}vmin at ${OWL_PUPIL.x}% ${OWL_PUPIL.y}%)`,
    layerOpacity: reveal > 0.001 || rawP > 0.001 ? 1 : 0,
    contentOpacity: contentIn * contentGate,
    contentY: (1 - contentIn) * 14,
    mistFromOwl: 0,
    blackout: 0,
  };
}

/** Remapeia progresso do pin — segura em 0 até a seção estar totalmente visível */
export function remapHeldPinProgress(p: number, hold: number): number {
  const h = Math.max(0, Math.min(0.85, hold));
  if (p <= h) return 0;
  return (p - h) / (1 - h);
}

/** S03 — progresso das animações só depois da abertura circular */
export function problemSceneAnimProgress(p: number): number {
  if (p <= PROBLEM_REVEAL_END) return 0;
  return Math.min(1, (p - PROBLEM_REVEAL_END) / (1 - PROBLEM_REVEAL_END));
}

export type OwlChaosFlowPhase = "owl" | "exit" | "reveal" | "scene";

export interface OwlChaosFlowState {
  global: number;
  phase: OwlChaosFlowPhase;
  s02Progress: number;
  s03RawProgress: number;
  s03AnimProgress: number;
  /** Opacidade contínua — evita corte brusco S02↔S03 */
  s02Opacity: number;
  s03Opacity: number;
  /** 0 = pupila, 1 = tela cheia */
  irisReveal: number;
  /** Fade final do pin unificado → Pilares */
  pillarsHandoff: number;
}

/** Pin único S02→S03 — ordem: coruja → zoom pupila → íris abre → animações → handoff */
const FLOW_OWL_END = 0.42;
const FLOW_EXIT_END = 0.56;
const FLOW_REVEAL_END = 0.72;
const FLOW_SCENE_END = 0.92;

export const OWL_CHAOS_FLOW_PIN_VH = 230;
export const OWL_CHAOS_FLOW_PIN_MOBILE_VH = 190;

export function owlChaosFlowMap(globalP: number): OwlChaosFlowState {
  const p = Math.max(0, Math.min(1, globalP));
  let phase: OwlChaosFlowPhase = "owl";
  let s02Progress = 0;
  let s03RawProgress = 0;
  let s03AnimProgress = 0;
  let s02Opacity = 1;
  let s03Opacity = 0;
  let irisReveal = 0;
  let pillarsHandoff = 0;

  if (p < FLOW_OWL_END) {
    phase = "owl";
    s02Progress = (p / FLOW_OWL_END) * 0.88;
  } else if (p < FLOW_EXIT_END) {
    phase = "exit";
    const t = (p - FLOW_OWL_END) / (FLOW_EXIT_END - FLOW_OWL_END);
    s02Progress = 0.88 + t * 0.12;
    s03Opacity = 0;
  } else if (p < FLOW_REVEAL_END) {
    phase = "reveal";
    s02Progress = 1;
    const t = (p - FLOW_EXIT_END) / (FLOW_REVEAL_END - FLOW_EXIT_END);
    irisReveal = t;
    s03RawProgress = t * PROBLEM_REVEAL_END;
    s02Opacity = 1 - smoothrange(t, 0, 0.42);
    s03Opacity = smoothrange(t, 0.02, 0.28);
    s03AnimProgress = smoothrange(t, 0.45, 0.95) * 0.16;
  } else if (p < FLOW_SCENE_END) {
    phase = "scene";
    s02Progress = 1;
    irisReveal = 1;
    s02Opacity = 0;
    s03Opacity = 1;
    const t = (p - FLOW_REVEAL_END) / (FLOW_SCENE_END - FLOW_REVEAL_END);
    s03RawProgress = PROBLEM_REVEAL_END + t * (1 - PROBLEM_REVEAL_END);
    s03AnimProgress = 0.16 + problemSceneAnimProgress(s03RawProgress) * 0.84;
  } else {
    phase = "scene";
    s02Progress = 1;
    irisReveal = 1;
    s02Opacity = 0;
    s03RawProgress = 1;
    s03AnimProgress = problemSceneAnimProgress(1);
    const t = (p - FLOW_SCENE_END) / (1 - FLOW_SCENE_END);
    pillarsHandoff = t;
    s03Opacity = 1 - t * 0.35;
  }

  return {
    global: p,
    phase,
    s02Progress,
    s03RawProgress,
    s03AnimProgress,
    s02Opacity,
    s03Opacity,
    irisReveal,
    pillarsHandoff,
  };
}

/** S02 — névoa vermelha + partículas na saída (handoff → S03) */
export function visionBridgeHandoff(p: number) {
  const t = smoothrange(p, 0.78, 1);
  return {
    mist: t,
    particles: smoothrange(p, 0.82, 0.98),
    dataLines: smoothrange(p, 0.8, 0.96),
    irisClose: smoothrange(p, 0.74, 0.92),
    hueShift: t,
  };
}

/** S03 — mockup protagonista: rise → caos suave → colapso tardio */
export function problemChaosStage(p: number): SceneTransform {
  const t = baseTransform();
  if (p <= 0) {
    t.opacity = 0;
    return t;
  }
  const rise = smoothrange(p, 0, 0.28);
  const chaos = smoothrange(p, 0.42, 0.72);
  const collapse = smoothrange(p, 0.72, 0.9);
  const handoff = smoothrange(p, 0.82, 1);

  t.opacity = rise * (1 - handoff * 0.2);
  t.y = lerp(48, 0, rise) + collapse * 28 - handoff * 12;
  t.x = chaos * 2.5 * Math.sin(p * 12) + collapse * -4;
  t.z = lerp(-30, 12, rise) - collapse * 80 - handoff * 50;
  t.scale = lerp(0.92, 1, rise) - collapse * 0.05 - handoff * 0.04;
  t.rotateX = lerp(8, 2, rise) + chaos * 1.5 + collapse * 6;
  t.rotateY = lerp(-5, -1.5, rise) + chaos * 2 + collapse * -5;
  t.rotateZ = chaos * 0.8 + collapse * -2.5;
  t.blur = collapse * 0.9 + handoff * 0.4;
  return t;
}

/** S03 — rachadura vertical (2 metades) — gap contido para leitura */
export function problemChaosCrack(p: number) {
  const crack = smoothrange(p, 0.22, 0.88);
  const shatter = smoothrange(p, 0.58, 0.92);
  return {
    crack: 0.15 + crack * 0.85,
    shatter,
    gapX: crack * 22,
    gapY: crack * 2,
    gapWidth: 1.2 + crack * 6,
    depth: shatter * 0.28,
    lineOpacity: 0.35 + crack * 0.65,
    lineDraw: crack,
    shardFly: smoothrange(p, 0.72, 0.96),
  };
}

/** S03 — alertas e fragmentos reagem ao scroll (sutis) */
export function problemChaosAlerts(p: number) {
  const chaos = smoothrange(p, 0.38, 0.72);
  const collapse = smoothrange(p, 0.68, 0.92);
  const handoff = smoothrange(p, 0.78, 1);
  const crack = problemChaosCrack(p);
  return {
    shake: chaos * 0.35 * (1 - collapse * 0.7),
    heat: chaos * 0.65,
    fracture: smoothrange(p, 0.32, 0.82) * 0.45,
    collapse,
    handoff,
    slaMinutes: Math.round(lerp(0, 47, smoothrange(p, 0.04, 0.9))),
    crack,
  };
}

/** S03 — copy entra com o mockup no pin */
export function problemCopyScroll(p: number) {
  const inT = smoothrange(p, 0.06, 0.32);
  const outT = smoothrange(p, 0.88, 0.98);
  return {
    opacity: inT * (1 - outT),
    y: lerp(32, 0, inT) - outT * 16,
  };
}

/** S03 → S04 — trilha dourada ascendente (continuidade para pilares) */
export function problemToPillarsHandoff(p: number) {
  const t = smoothrange(p, 0.76, 1);
  return {
    goldRise: t,
    particleSuck: smoothrange(p, 0.7, 0.92),
    fadeChaos: t,
  };
}

export function applySceneTransform(el: HTMLElement | null, t: SceneTransform) {
  if (!el) return;
  el.style.opacity = String(t.opacity);
  el.style.transform = [
    `translate3d(${t.x}px, ${t.y}px, ${t.z}px)`,
    `scale(${t.scale})`,
    `rotateX(${t.rotateX}deg)`,
    `rotateY(${t.rotateY}deg)`,
    `rotateZ(${t.rotateZ}deg)`,
  ].join(" ");
  el.style.filter = t.blur > 0 ? `blur(${t.blur}px)` : "none";
}
