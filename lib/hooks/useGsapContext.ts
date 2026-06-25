"use client";

import { useEffect, useRef } from "react";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register";
import { PREMIUM_SMOOTH_DURATION } from "@/lib/lenis-scroll";

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
}

export function usePinSection(
  ref: React.RefObject<HTMLElement | null>,
  { pinVh, pinMobileVh, scrub = 0.34, onUpdate, smoothDuration = PREMIUM_SMOOTH_DURATION }: PinOptions,
  deps: unknown[] = []
) {
  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || !onUpdate) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const endVh = isMobile ? (pinMobileVh ?? Math.round(pinVh * 0.6)) : pinVh;
    const scrubVal = isMobile
      ? typeof scrub === "number"
        ? scrub * 0.85
        : scrub
      : scrub;

    const smooth = { p: 0 };
    let lastSelf: ST | null = null;

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

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: `+=${endVh}%`,
      pin: true,
      scrub: scrubVal,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      onUpdate: (self) => {
        lastSelf = self;
        if (quickProgress) {
          quickProgress(self.progress);
        } else {
          onUpdate(self.progress, self);
        }
      },
    });

    return () => st.kill();
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
