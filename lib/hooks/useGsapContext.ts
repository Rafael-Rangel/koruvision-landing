"use client";

import { useEffect, useRef } from "react";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register";
import { PREMIUM_SMOOTH_DURATION } from "@/lib/lenis-scroll";
import { remapHeldPinProgress } from "@/lib/scene-choreography";

export function useGsapContext(
  setup: () => void | (() => void),
  deps: unknown[] = []
) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(setup, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}

export interface PinOptions {
  pinVh: number;
  pinMobileVh?: number;
  /** GSAP scrub — use 0.4–0.9 com Lenis; valores altos (>1.5) travam */
  scrub?: number | boolean;
  onUpdate?: (progress: number, self: ST) => void;
  /** Interpola progresso após scroll parar (fluido). 0 = desligado */
  smoothDuration?: number;
  anticipatePin?: number;
  fastScrollEnd?: boolean;
  onPinChange?: (pinned: boolean) => void;
  /** ScrollTrigger start — padrão quando o topo da seção encosta no topo da viewport */
  start?: string;
  /** Só inicia o pin depois que o seletor (ex. #s02-vision-pin) sair da tela */
  pinAfter?: string;
  /** Fração inicial do pin (0–1) em que o progresso permanece em 0 */
  progressHold?: number;
}

const LENIS_SCROLLER =
  typeof document !== "undefined" ? document.documentElement : undefined;

export function usePinSection(
  ref: React.RefObject<HTMLElement | null>,
  {
    pinVh,
    pinMobileVh,
    scrub = 0.34,
    onUpdate,
    smoothDuration = PREMIUM_SMOOTH_DURATION,
    anticipatePin = 1,
    fastScrollEnd = true,
    onPinChange,
    start = "top top",
    pinAfter,
    progressHold = 0,
  }: PinOptions,
  deps: unknown[] = []
) {
  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || !onUpdate) return;

    let st: ST | null = null;
    let raf = 0;
    let cancelled = false;

    const attach = () => {
      if (cancelled) return;

      const afterEl = pinAfter ? document.querySelector<HTMLElement>(pinAfter) : null;
      if (pinAfter && !afterEl) {
        raf = requestAnimationFrame(attach);
        return;
      }

      const triggerEl = afterEl ?? el;
      const triggerStart = afterEl ? "bottom top" : start;

      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      const endVh = isMobile ? (pinMobileVh ?? Math.round(pinVh * 0.6)) : pinVh;
      const scrubVal = isMobile
        ? typeof scrub === "number"
          ? scrub * 0.85
          : scrub
        : scrub;

      const smooth = { p: 0 };
      let lastSelf: ST | null = null;

      const mapProgress = (raw: number) =>
        progressHold > 0 ? remapHeldPinProgress(raw, progressHold) : raw;

      const quickProgress =
        smoothDuration > 0
          ? gsap.quickTo(smooth, "p", {
              duration: smoothDuration,
              ease: "power2.out",
              onUpdate: () => {
                if (lastSelf) onUpdate(smooth.p, lastSelf);
              },
            })
          : null;

      st = ScrollTrigger.create({
        trigger: triggerEl,
        scroller: LENIS_SCROLLER,
        start: triggerStart,
        end: `+=${endVh}%`,
        pin: el,
        scrub: scrubVal,
        anticipatePin,
        invalidateOnRefresh: true,
        fastScrollEnd,
        onUpdate: (self) => {
          lastSelf = self;
          const mapped = mapProgress(self.progress);
          if (progressHold > 0 && self.progress <= progressHold) {
            smooth.p = 0;
          }
          if (quickProgress) {
            quickProgress(mapped);
          } else {
            onUpdate(mapped, self);
          }
        },
        onToggle: (self) => onPinChange?.(self.isActive),
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    attach();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      st?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function applyState(
  el: HTMLElement | null,
  st: { opacity: number; y: number; x: number; scale: number; rot: number },
  extra?: gsap.TweenVars
) {
  if (!el) return;
  gsap.set(el, {
    opacity: st.opacity,
    y: st.y,
    x: st.x,
    scale: st.scale,
    rotation: st.rot,
    ...extra,
  });
}

/** quickTo para transforms de hero — evita saltos entre frames */
export function createSmoothApplier(duration = 0.5) {
  const cache = new WeakMap<
    HTMLElement,
    {
      ox: ReturnType<typeof gsap.quickTo>;
      oy: ReturnType<typeof gsap.quickTo>;
      os: ReturnType<typeof gsap.quickTo>;
      oo: ReturnType<typeof gsap.quickTo>;
    }
  >();

  return (el: HTMLElement | null, values: { x: number; y: number; scale: number; opacity: number }) => {
    if (!el) return;
    let q = cache.get(el);
    if (!q) {
      q = {
        ox: gsap.quickTo(el, "x", { duration, ease: "power2.out" }),
        oy: gsap.quickTo(el, "y", { duration, ease: "power2.out" }),
        os: gsap.quickTo(el, "scale", { duration, ease: "power2.out" }),
        oo: gsap.quickTo(el, "opacity", { duration: duration * 0.85, ease: "power2.out" }),
      };
      cache.set(el, q);
    }
    q.ox(values.x);
    q.oy(values.y);
    q.os(values.scale);
    q.oo(values.opacity);
  };
}
