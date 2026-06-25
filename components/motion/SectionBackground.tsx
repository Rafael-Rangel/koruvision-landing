"use client";

import { imagePath } from "@/config/env";

interface SectionBackgroundProps {
  images: string[];
  className?: string;
  variant?: "hero" | "problem" | "bridge" | "default" | "cta";
  scrollProgress?: number;
  intensity?: "low" | "medium" | "high";
  assetBase?: string;
}

const GRADIENTS: Record<string, string> = {
  hero: "radial-gradient(ellipse 70% 55% at 75% 45%, rgba(59,130,246,0.12), transparent 55%), #03060F",
  problem: "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(239,68,68,0.1), transparent 50%), #03060F",
  bridge: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(139,92,246,0.1), transparent 50%), #03060F",
  cta: "radial-gradient(ellipse 50% 45% at 50% 55%, rgba(245,158,11,0.12), transparent 45%), #03060F",
  default: "radial-gradient(ellipse 55% 45% at 55% 40%, rgba(59,130,246,0.08), transparent 55%), #03060F",
};

const OPACITY: Record<string, { base: number; layer: number }> = {
  low: { base: 0.14, layer: 0.08 },
  medium: { base: 0.28, layer: 0.18 },
  high: { base: 0.45, layer: 0.35 },
};

export function SectionBackground({
  images,
  className = "",
  variant = "default",
  scrollProgress = 0,
  intensity = "low",
  assetBase,
}: SectionBackgroundProps) {
  const p = scrollProgress;
  const op = OPACITY[intensity] ?? OPACITY.low;

  return (
    <div className={`section-bg section-bg--${intensity} ${className}`} aria-hidden>
      <div className="section-bg-gradient" style={{ background: GRADIENTS[variant] ?? GRADIENTS.default }} />
      {images.map((file, i) => {
        const depth = i === 0 ? 0 : i * 6;
        const y = (p - 0.5) * depth;
        const scale = 1 + i * 0.03 + p * 0.01;
        const imgOpacity = i === 0 ? op.base : Math.max(0.04, op.layer - i * 0.02);
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={file}
            className={`section-bg-img layer-${i}`}
            src={imagePath(file, assetBase)}
            alt=""
            style={{
              transform: `translateY(${y}px) scale(${scale})`,
              opacity: imgOpacity,
              zIndex: i,
              filter: intensity === "low" ? "blur(1px) saturate(0.85)" : undefined,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        );
      })}
      {/* Grain opcional — só nv5; evita 404 no preview nv6 */}
      {(!assetBase || assetBase.includes("nv5")) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="section-bg-grain-img"
          src={imagePath("depth-film-grain-neural-tile.webp", assetBase)}
          alt=""
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
    </div>
  );
}
