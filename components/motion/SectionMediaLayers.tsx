"use client";

import { SectionConfig } from "@/config/sections";
import { SectionBackground } from "@/components/motion/SectionBackground";
import { VideoLayer } from "@/components/motion/VideoLayer";
import { FrameScrubber } from "@/components/motion/FrameScrubber";

interface SectionMediaLayersProps {
  cfg: SectionConfig;
  progress?: number;
  variant?: "hero" | "problem" | "bridge" | "default" | "cta";
  f2fBlend?: "normal" | "screen" | "overlay";
  ambientVideo?: string;
  /** Só F2F + ambiente — não toca vídeo narrativo primário (ex: S01 hero) */
  scrubVideoOnly?: boolean;
}

const VEIL_CLASS: Record<string, string> = {
  hero: "section-content-veil section-content-veil--hero",
  problem: "section-content-veil section-content-veil--problem",
  bridge: "section-content-veil section-content-veil--bridge",
  cta: "section-content-veil section-content-veil--cta",
  default: "section-content-veil",
};

export function SectionMediaLayers({
  cfg,
  progress = 0,
  variant = "default",
  f2fBlend = "screen",
  ambientVideo,
  scrubVideoOnly = false,
}: SectionMediaLayersProps) {
  const intensity = cfg.mediaIntensity ?? "low";
  const primaryVideo = intensity === "low" ? undefined : cfg.videos[0];
  const loopVideo =
    intensity === "low"
      ? undefined
      : ambientVideo ?? (cfg.videos.length > 1 ? cfg.videos[1] : undefined);
  const primaryF2f = cfg.f2f[0];
  const poster = cfg.images[0];

  return (
    <>
      <SectionBackground
        images={cfg.images}
        variant={variant}
        scrollProgress={progress}
        intensity={intensity}
        assetBase={cfg.assetBase}
      />
      {loopVideo && (
        <VideoLayer filename={loopVideo} zIndex={0} posterImage={poster} loop intensity={intensity} assetBase={cfg.assetBase} />
      )}
      {primaryVideo && !scrubVideoOnly && primaryVideo !== loopVideo && (
        <VideoLayer filename={primaryVideo} zIndex={1} posterImage={poster} loop={false} intensity={intensity} assetBase={cfg.assetBase} />
      )}
      {primaryF2f && (
        <FrameScrubber
          sequenceId={primaryF2f}
          progress={progress}
          className={`${cfg.slug}-f2f frame-scrubber--${intensity}`}
          blendMode={f2fBlend}
        />
      )}
      <div className={VEIL_CLASS[variant] ?? VEIL_CLASS.default} aria-hidden />
    </>
  );
}
