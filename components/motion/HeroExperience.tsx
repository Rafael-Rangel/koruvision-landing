"use client";

import type { CSSProperties } from "react";
import { CrmCard3D } from "@/components/hero/CrmCard3D";
import { HeroAmbientBg } from "@/components/hero/HeroAmbientBg";
import { SmartVideo } from "@/components/performance/SmartVideo";
import { videoPath } from "@/config/env";

interface HeroExperienceProps {
  layers: [string, string, string];
  heroVideo: string;
  bgVideo?: string;
  assetBase?: string;
  progress: number;
}

/** Hero — mockup emerge de baixo por cima do texto; fundo animado. */
export function HeroExperience({ progress, bgVideo, heroVideo, assetBase }: HeroExperienceProps) {
  const ambientVideo = bgVideo || heroVideo;
  const src = ambientVideo ? videoPath(ambientVideo, assetBase) : "";

  return (
    <div className="hero-experience hero-experience--rise" style={{ "--hero-p": progress } as CSSProperties}>
      {src ? (
        <SmartVideo
          src={src}
          className="s01-hero-bg-video"
          eager={false}
          preload="none"
          disableOnMobile
          rootMargin="0px"
          loop
          muted
          playsInline
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
