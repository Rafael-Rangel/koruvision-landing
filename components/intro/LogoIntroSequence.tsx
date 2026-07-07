"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, registerGsap } from "@/lib/gsap/register";
import { NV11_BASE } from "@/config/nv11-assets";
import { fetchF2fFrameCount, preloadF2fSequence } from "@/lib/f2f-frame-cache";

const INTRO_KEY = "koru-intro-played";
const LOGO_SRC = "/assets/brand/koruvision-logo-full.png";
const OWL_SEQ = "NV11-F2F-001";

export const INTRO_ACTIVE_ATTR = "data-koru-intro";

interface LogoIntroSequenceProps {
  children: React.ReactNode;
}

function primeHeroForIntro(content: HTMLElement | null) {
  const hero = content?.querySelector<HTMLElement>("#s01.s01--rise");
  if (!hero) return null;
  const rig = hero.querySelector(".s01-hero-mockup-rig");
  const copyHead = hero.querySelectorAll(".s01-hero-copy-head > *");
  const copyActions = hero.querySelectorAll(".s01-hero-copy-actions > *");
  gsap.set(hero, { opacity: 1 });
  if (rig) gsap.set(rig, { opacity: 0, y: 72, scale: 0.52 });
  if (copyHead.length) gsap.set(copyHead, { opacity: 0, y: 32 });
  if (copyActions.length) gsap.set(copyActions, { opacity: 0, y: 22 });
  return { hero, rig, copyHead, copyActions };
}

function appendHeroReveal(
  tl: gsap.core.Timeline,
  targets: ReturnType<typeof primeHeroForIntro>,
  position = 2.75
) {
  if (!targets) return;
  const { rig, copyHead, copyActions } = targets;
  if (rig) tl.to(rig, { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: "power3.out" }, position);
  if (copyHead.length) {
    tl.to(copyHead, { opacity: 1, y: 0, duration: 0.75, stagger: 0.09, ease: "power3.out" }, position + 0.12);
  }
  if (copyActions.length) {
    tl.to(copyActions, { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power3.out" }, position + 0.28);
  }
}

function warmAssets() {
  void import("@/sections/OwlChaosFlow");
  void fetchF2fFrameCount(OWL_SEQ, NV11_BASE, 120).then((count) =>
    preloadF2fSequence(OWL_SEQ, count, NV11_BASE, { priorityCount: 48, concurrency: 10 })
  );
}

/**
 * Entrada cinematográfica — íris abre e o último frame É a hero (não é loading).
 */
export function LogoIntroSequence({ children }: LogoIntroSequenceProps) {
  const [phase, setPhase] = useState<"intro" | "done">("intro");
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const skipRef = useRef(false);

  const finish = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    document.documentElement.removeAttribute(INTRO_ACTIVE_ATTR);
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent("koru:intro-done"));
    setPhase("done");
  }, []);

  useEffect(() => {
    warmAssets();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash.length > 1) {
      finish();
      return;
    }

    try {
      if (sessionStorage.getItem(INTRO_KEY) === "1") {
        setPhase("done");
        warmAssets();
        return;
      }
    } catch {
      /* ignore */
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    registerGsap();
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const glow = glowRef.current;
    const iris = irisRef.current;
    const burst = burstRef.current;
    const tagline = taglineRef.current;
    const content = contentRef.current;

    if (!overlay || !logo) {
      finish();
      return;
    }

    document.documentElement.setAttribute(INTRO_ACTIVE_ATTR, "1");
    document.body.style.overflow = "hidden";

    const heroTargets = primeHeroForIntro(content);

    gsap.set(overlay, {
      clipPath: "circle(120% at 50% 45%)",
      opacity: 1,
    });
    gsap.set(logo, { scale: 0.35, opacity: 0, filter: "blur(16px)" });
    gsap.set(glow, { scale: 0.4, opacity: 0 });
    gsap.set(iris, { scale: 0.2, opacity: 0 });
    gsap.set(burst, { scale: 0.6, opacity: 0 });
    if (tagline) gsap.set(tagline, { opacity: 0, y: 18 });

    const tl = gsap.timeline({
      onComplete: () => {
        finish();
      },
    });

    const safety = window.setTimeout(() => finish(), 6800);

    /* Ato 1 — despertar da marca */
    tl.to(glow, { scale: 1.6, opacity: 0.5, duration: 1.1, ease: "power2.out" }, 0)
      .to(logo, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.35, ease: "power3.out" }, 0.12)
      .to(tagline, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, 1.05)
      .to(logo, { scale: 1.04, duration: 0.55, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.15);

    /* Ato 2 — pulso íris (prepara handoff hero) */
    tl.to(iris, { scale: 1, opacity: 0.85, duration: 0.5, ease: "power2.out" }, 2.15)
      .to(glow, { scale: 2.2, opacity: 0.75, duration: 0.45, ease: "power2.in" }, 2.35)
      .to(logo, { scale: 1.12, filter: "brightness(1.5)", duration: 0.4, ease: "power2.in" }, 2.35)
      .to(burst, { scale: 1.4, opacity: 0.9, duration: 0.35, ease: "power2.out" }, 2.42);

    /* Ato 3 — íris abre → hero (último frame = hero visível) */
    tl.to(
      overlay,
      {
        clipPath: "circle(0% at 50% 45%)",
        duration: 1.35,
        ease: "power3.inOut",
      },
      2.55
    )
      .to(logo, { opacity: 0, scale: 0.88, y: -40, duration: 0.7, ease: "power2.in" }, 2.6)
      .to(tagline, { opacity: 0, y: -12, duration: 0.45, ease: "power2.in" }, 2.65)
      .to(iris, { opacity: 0, scale: 1.8, duration: 0.8, ease: "power2.in" }, 2.7)
      .to(burst, { opacity: 0, scale: 2.4, duration: 0.9, ease: "power2.out" }, 2.75)
      .to(overlay, { opacity: 0, duration: 0.35, ease: "power1.out" }, 3.75);

    appendHeroReveal(tl, heroTargets, 2.72);

    return () => {
      window.clearTimeout(safety);
      tl.kill();
      document.documentElement.removeAttribute(INTRO_ACTIVE_ATTR);
      document.body.style.overflow = "";
    };
  }, [finish]);

  const skip = () => {
    const content = contentRef.current;
    const heroTargets = primeHeroForIntro(content);
    if (heroTargets) {
      gsap.set(heroTargets.rig, { opacity: 1, y: 0, scale: 1 });
      gsap.set(heroTargets.copyHead, { opacity: 1, y: 0 });
      gsap.set(heroTargets.copyActions, { opacity: 1, y: 0 });
    }
    gsap.killTweensOf([overlayRef.current, logoRef.current, irisRef.current]);
    document.body.style.overflow = "";
    finish();
  };

  return (
    <>
      <div ref={contentRef} className="logo-intro-content">
        {children}
      </div>
      {phase === "intro" && (
        <div
          ref={overlayRef}
          className="logo-intro logo-intro--cinema"
          role="presentation"
          onClick={skip}
          onKeyDown={(e) => e.key === "Escape" && skip()}
        >
          <div ref={glowRef} className="logo-intro__glow" aria-hidden />
          <div ref={irisRef} className="logo-intro__iris" aria-hidden />
          <div ref={burstRef} className="logo-intro__burst" aria-hidden />
          <div ref={logoRef} className="logo-intro__logo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} alt="KORUVISION" className="logo-intro__logo" width={480} height={480} />
          </div>
          <p ref={taglineRef} className="logo-intro__tagline">
            Inteligência. Visão. Soluções.
          </p>
          <span className="logo-intro__skip">Clique para pular</span>
        </div>
      )}
    </>
  );
}
