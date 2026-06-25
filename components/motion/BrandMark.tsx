"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap/register";

interface BrandMarkProps {
  variant?: "hero" | "compact";
  className?: string;
}

/** Logo KORUVISION integrada à cena — não estática */
export function BrandMark({ variant = "hero", className = "" }: BrandMarkProps) {
  useEffect(() => {
    const el = document.querySelector(".brand-mark-inner");
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.88, filter: "blur(8px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out", delay: 0.3 }
    );
    gsap.to(".brand-mark-glow", {
      opacity: 0.85,
      duration: 2.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    gsap.to(".brand-mark-wordmark", {
      backgroundPosition: "200% center",
      duration: 6,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <div className={`brand-mark brand-mark--${variant} ${className}`} data-ambient-float data-ambient-amp="4">
      <div className="brand-mark-glow" data-ambient-glow aria-hidden />
      <div className="brand-mark-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="brand-mark-icon"
          src="/assets/brand/koruvision-logo.webp"
          alt=""
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/assets/brand/koruvision-logo.svg";
          }}
        />
        {variant === "hero" && (
          <div className="brand-mark-wordmark">
            <span className="brand-koru">KORU</span>
            <span className="brand-vision">VISION</span>
          </div>
        )}
        {variant === "hero" && (
          <p className="brand-tagline">Inteligência. Visão. Soluções.</p>
        )}
      </div>
      <div className="brand-mark-sweep" data-ambient-sweep aria-hidden />
    </div>
  );
}
