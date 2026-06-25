"use client";

import { imagePath } from "@/config/env";

interface OwlSigilProps {
  variant?: "hero" | "energy" | "watch" | "connect";
  assetBase?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/** Presença recorrente da coruja KORUVISION ao longo da jornada */
export function OwlSigil({ variant = "energy", assetBase = "/assets/nv9", className = "", size = "md" }: OwlSigilProps) {
  const poster = "nv9-img-owl-hero.webp";

  return (
    <div
      className={`owl-sigil owl-sigil--${variant} owl-sigil--${size} ${className}`}
      data-ambient-float
      data-ambient-amp={variant === "hero" ? "3" : "6"}
      aria-hidden
    >
      <div className="owl-sigil-aura" data-ambient-glow />
      <div className="owl-sigil-ring" data-ambient-orbit data-orbit-dur="72" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="owl-sigil-img" src={imagePath(poster, assetBase)} alt="" />
      <div className="owl-sigil-scan" data-ambient-sweep />
    </div>
  );
}
