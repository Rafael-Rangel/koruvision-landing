"use client";

import type { ReactNode } from "react";
import { FrameScrubber } from "@/components/motion/FrameScrubber";
import { SmartVideo } from "@/components/performance/SmartVideo";
import { env } from "@/config/env";
import { NV11_BASE, nv11Image, nv11Video } from "@/config/nv11-assets";

export interface SceneCinemaLayerProps {
  bg?: string;
  poster?: string;
  loop?: string;
  loop2?: string;
  loopOpacity?: number;
  f2f?: string;
  progress?: number;
  f2fBlend?: "normal" | "screen" | "overlay";
  handoffGlow?: number;
  className?: string;
  children?: ReactNode;
  assetBase?: string;
}

/**
 * Camada cinematográfica universal NV11 — BG + loop + F2F + scrim + handoff glow.
 */
export function SceneCinemaLayer({
  bg,
  poster,
  loop,
  loop2,
  loopOpacity = 0.2,
  f2f,
  progress = 0,
  f2fBlend = "screen",
  handoffGlow = 0,
  className = "",
  children,
  assetBase = NV11_BASE,
}: SceneCinemaLayerProps) {
  const base = assetBase.replace(/\/$/, "");
  const img = (file: string) => (base === NV11_BASE ? nv11Image(file) : `${base}/images/${file}`);
  const vid = (file: string) => (base === NV11_BASE ? nv11Video(file) : `${base}/videos/${file}`);

  return (
    <div className={`scene-cinema-layer ${className}`} aria-hidden={!children}>
      {bg && (
        <div className="scene-cinema-bg" data-ambient-breathe>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(bg)} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      {loop && env.enableVideo && (
        <div className="scene-cinema-loop-wrap" style={{ opacity: loopOpacity }}>
          <SmartVideo
            className="scene-cinema-loop"
            src={vid(loop)}
            poster={poster ? img(poster) : bg ? img(bg) : undefined}
            loop
            muted
            playsInline
          />
        </div>
      )}
      {loop2 && env.enableVideo && (
        <div className="scene-cinema-loop-wrap scene-cinema-loop-wrap--secondary" style={{ opacity: loopOpacity * 0.7 }}>
          <SmartVideo
            className="scene-cinema-loop"
            src={vid(loop2)}
            poster={poster ? img(poster) : undefined}
            loop
            muted
            playsInline
          />
        </div>
      )}
      {f2f && (
        <FrameScrubber
          sequenceId={f2f}
          progress={progress}
          className="scene-cinema-f2f"
          blendMode={f2fBlend}
          assetBase={assetBase}
        />
      )}
      <div className="scene-cinema-scrim" />
      {handoffGlow > 0 && (
        <div className="scene-handoff-glow" style={{ opacity: handoffGlow }} aria-hidden />
      )}
      {children}
    </div>
  );
}
