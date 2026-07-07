"use client";

import { useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register";

/** Revela elementos `.lps-reveal` ao entrar na viewport. */
export function useLpsReveal(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>(".lps-reveal");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 48 });

      ScrollTrigger.batch(items, {
        start: "top 88%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
          });
        },
        once: true,
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
