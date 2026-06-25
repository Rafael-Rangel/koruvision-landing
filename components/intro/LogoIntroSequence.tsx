"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, registerGsap } from "@/lib/gsap/register";

const INTRO_KEY = "koru-intro-played";
const LOGO_SRC = "/assets/brand/koruvision-logo-full.png";

interface LogoIntroSequenceProps {
  children: React.ReactNode;
}

/**
 * Sequência de entrada cinematográfica — não é loading.
 * Logo desperta → flash → revela a hero.
 */
export function LogoIntroSequence({ children }: LogoIntroSequenceProps) {
  const [phase, setPhase] = useState<"intro" | "done">("intro");
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const skipRef = useRef(false);

  const finish = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("done");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    /* Hash direto (#s04 etc.) — pula intro para a seção existir no DOM */
    if (window.location.hash.length > 1) {
      finish();
      return;
    }

    try {
      if (sessionStorage.getItem(INTRO_KEY) === "1") {
        setPhase("done");
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
    const tagline = taglineRef.current;
    if (!overlay || !logo) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        finish();
      },
    });

    /* Fallback — nunca travar na intro */
    const safety = window.setTimeout(() => {
      document.body.style.overflow = "";
      finish();
    }, 5200);

    gsap.set(logo, { scale: 0.4, opacity: 0, filter: "blur(12px)" });
    gsap.set(glow, { scale: 0.5, opacity: 0 });
    if (tagline) gsap.set(tagline, { opacity: 0, y: 16 });

    tl.to(glow, { scale: 1.8, opacity: 0.55, duration: 1.2, ease: "power2.out" }, 0)
      .to(logo, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }, 0.15)
      .to(logo, { scale: 1.03, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.2)
      .to(tagline, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 1.4)
      .to(glow, { scale: 2.4, opacity: 0.9, duration: 0.35, ease: "power2.in" }, 2.8)
      .to(logo, { scale: 1.08, filter: "brightness(1.4)", duration: 0.35, ease: "power2.in" }, 2.8)
      .to(overlay, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 3.2)
      .to(logo, { y: -80, opacity: 0, scale: 0.92, duration: 0.9, ease: "power3.in" }, 3.2);

    return () => {
      window.clearTimeout(safety);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [finish]);

  const skip = () => {
    gsap.killTweensOf([overlayRef.current, logoRef.current]);
    document.body.style.overflow = "";
    finish();
  };

  return (
    <>
      {phase === "intro" && (
        <div
          ref={overlayRef}
          className="logo-intro"
          role="presentation"
          onClick={skip}
          onKeyDown={(e) => e.key === "Escape" && skip()}
        >
          <div ref={glowRef} className="logo-intro__glow" aria-hidden />
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
      <div className="logo-intro-content">{children}</div>
    </>
  );
}
