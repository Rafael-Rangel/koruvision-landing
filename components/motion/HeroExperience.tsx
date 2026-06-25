"use client";

import type { CSSProperties } from "react";
import { CrmCard3D } from "@/components/hero/CrmCard3D";
import { HeroAmbientBg } from "@/components/hero/HeroAmbientBg";

interface HeroExperienceProps {
  layers: [string, string, string];
  heroVideo: string;
  bgVideo?: string;
  assetBase?: string;
  progress: number;
}

/** Hero — mockup emerge de baixo por cima do texto; fundo animado. */
export function HeroExperience({ progress, bgVideo, heroVideo }: HeroExperienceProps) {
  const ambientVideo = bgVideo || heroVideo;

  return (
    <div className="hero-experience hero-experience--rise" style={{ "--hero-p": progress } as CSSProperties}>
      {ambientVideo ? (
        <video
          className="s01-hero-bg-video"
          src={ambientVideo}
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden
        />
      ) : null}
      <HeroAmbientBg progress={progress} />
      <div className="s01-hero-beam" aria-hidden />
      <div className="s01-hero-beam s01-hero-beam--gold" aria-hidden />
      <div className="s01-hero-floor-glow" aria-hidden />
      <div className="s01-hero-mockup-rig">
        <CrmCard3D scrollProgress={progress} variant="rise" />
      </div>
    </div>
  );
}
