"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register";
import { bindLenisScrollTrigger, LENIS_OPTIONS } from "@/lib/lenis-scroll";
import { AmbientTicker } from "@/components/motion/AmbientTicker";
import { GlobalJourneyLayer } from "@/components/motion/GlobalJourneyLayer";
import { LivingEcosystem } from "@/components/motion/LivingEcosystem";
import { GlobalCursor } from "@/components/motion/GlobalCursor";
import { JourneySectionBeams } from "@/components/motion/JourneySectionBeams";
import { useDeferredReady } from "@/components/performance/DeferredMount";

interface ExperienceShellProps {
  children: React.ReactNode;
  showSpine?: boolean;
}

export function ExperienceShell({ children, showSpine = true }: ExperienceShellProps) {
  const effectsReady = useDeferredReady(900);

  useEffect(() => {
    registerGsap();

    const lenis = new Lenis(LENIS_OPTIONS);

    document.documentElement.classList.add("lenis", "lenis-smooth");
    document.body.classList.add("lenis-smooth");

    bindLenisScrollTrigger(lenis);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const scrollToHash = (attempt = 0) => {
      const hash = window.location.hash;
      if (hash.length <= 1) return;
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        ScrollTrigger.refresh();
        return;
      }
      if (attempt < 12) {
        window.setTimeout(() => scrollToHash(attempt + 1), 250);
      }
    };

    const onLoad = () => {
      ScrollTrigger.refresh();
      scrollToHash();
    };
    window.addEventListener("load", onLoad);
    requestAnimationFrame(onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.clearScrollMemory();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      document.body.classList.remove("lenis-smooth");
      lenis.destroy();
    };
  }, []);

  return (
    <div className="experience-shell lenis-root">
      {effectsReady && (
        <>
          <GlobalJourneyLayer />
          <LivingEcosystem />
          <GlobalCursor />
          <JourneySectionBeams />
        </>
      )}
      {showSpine && <div className="experience-spine" aria-hidden />}
      <div className="experience-content">
        {children}
      </div>
      {effectsReady && <AmbientTicker />}
    </div>
  );
}
