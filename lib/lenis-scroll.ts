"use client";

import type Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap/register";

/** Integração Lenis ↔ ScrollTrigger com velocity para motion reativo */
export function bindLenisScrollTrigger(lenis: Lenis) {
  const root = document.documentElement;

  ScrollTrigger.scrollerProxy(root, {
    scrollTop(value?: number) {
      if (arguments.length && value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: root.style.transform ? "transform" : "fixed",
  });

  lenis.on("scroll", ({ velocity }: { velocity: number }) => {
    ScrollTrigger.update();
    root.style.setProperty("--scroll-velocity", String(velocity));
    root.style.setProperty("--scroll-dir", velocity >= 0 ? "1" : "-1");
  });

  ScrollTrigger.addEventListener("refresh", () => lenis.resize());
  ScrollTrigger.defaults({ pinType: "transform" });
}

/**
 * Lenis — flow responsivo (menos “arrasto”, mais 1:1 com o dedo/roda).
 * lerp maior = segue o scroll mais rápido; wheelMultiplier = distância por tick.
 */
export const LENIS_OPTIONS = {
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 1.05,
  touchMultiplier: 1.25,
  syncTouch: true,
  syncTouchLerp: 0.1,
  infinite: false,
} as const;

/** Scrub GSAP — valores baixos = animação acompanha o scroll sem atraso */
export const PREMIUM_SCRUB = {
  hero: 0.28,
  bridge: 0.32,
  demo: 0.36,
  scene: 0.34,
  intelligence: 0.34,
  cta: 0.3,
} as const;

/** Interpolação pós-scroll — baixo para não “engordar” o fim do gesto */
export const PREMIUM_SMOOTH_DURATION = 0.18;
