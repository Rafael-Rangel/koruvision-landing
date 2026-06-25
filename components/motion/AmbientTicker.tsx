"use client";

import { useEffect } from "react";
import { gsap, registerGsap } from "@/lib/gsap/register";

/**
 * Motion ambiente "vivo sem scroll". Idempotente: anima elementos presentes no
 * mount E os que entram depois (cenas montadas via DeferredMount), via MutationObserver.
 */
export function AmbientTicker() {
  useEffect(() => {
    registerGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const BOUND = "data-ambient-bound";

    const bind = (el: HTMLElement, i: number) => {
      if (el.getAttribute(BOUND)) return;
      el.setAttribute(BOUND, "1");

      if (el.hasAttribute("data-ambient-float")) {
        const amp = Number(el.dataset.ambientAmp ?? 10);
        gsap.to(el, {
          y: `-=${amp}`,
          x: `+=${amp * 0.28}`,
          duration: 3.2 + (i % 3) * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: (i % 6) * 0.2,
        });
      }
      if (el.hasAttribute("data-ambient-glow")) {
        gsap.fromTo(el, { opacity: 0.35 }, { opacity: 0.8, duration: 2.4 + (i % 4) * 0.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }
      if (el.hasAttribute("data-ambient-sweep")) {
        gsap.fromTo(el, { xPercent: -110 }, { xPercent: 210, duration: 5, repeat: -1, repeatDelay: 2.8, ease: "none" });
      }
      if (el.hasAttribute("data-ambient-orbit")) {
        gsap.to(el, { rotation: 360, duration: Number(el.dataset.orbitDur ?? 50), repeat: -1, ease: "none" });
      }
      if (el.hasAttribute("data-ambient-breathe")) {
        gsap.to(el, { scale: 1.02, duration: 3.6 + (i % 4) * 0.3, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "center center" });
      }
    };

    const scan = () => {
      const els = document.querySelectorAll<HTMLElement>(
        "[data-ambient-float]:not([data-ambient-bound]),[data-ambient-glow]:not([data-ambient-bound]),[data-ambient-sweep]:not([data-ambient-bound]),[data-ambient-orbit]:not([data-ambient-bound]),[data-ambient-breathe]:not([data-ambient-bound])"
      );
      els.forEach(bind);
    };

    scan();

    let timer: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver(() => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        scan();
      }, 350);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
