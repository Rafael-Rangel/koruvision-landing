"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { PinWrap } from "@/components/sections/SectionShell";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { visionTunnelMask, visionBridgeOwl, applyHeroTransform } from "@/lib/hero-choreography";
import { smoothrange } from "@/lib/motion-system";
import { gsap } from "@/lib/gsap/register";
import { imagePath, videoPath, env } from "@/config/env";
import type { SectionConfig } from "@/config/sections";
import { FrameScrubber } from "@/components/motion/FrameScrubber";
import { F2fVideoScrubber } from "@/components/motion/F2fVideoScrubber";

export type VisionBridgeScrubMode = "frames" | "video";

interface SectionVisionBridgeProps {
  cfg: SectionConfig;
  /** frames = sequência WebP no scroll (leve). video = MP4 scrub (legado). */
  scrubMode?: VisionBridgeScrubMode;
  /** Dentro do OwlChaosFlow — sem pin próprio */
  embedded?: boolean;
  /** Progresso externo (0–1) quando embedded */
  progress?: number;
}

interface VisionBridgeRefs {
  tunnel: HTMLDivElement | null;
  media: HTMLDivElement | null;
  colorwash: HTMLDivElement | null;
  irisGlow: HTMLDivElement | null;
  owl: HTMLDivElement | null;
  copy: HTMLDivElement | null;
  headline: HTMLHeadingElement | null;
}

function applyVisionBridgeFrame(
  p: number,
  framesOnly: boolean,
  refs: VisionBridgeRefs,
  skipExitFade = false
) {
  const tunnel = visionTunnelMask(p);
  if (refs.tunnel) {
    refs.tunnel.style.opacity = String(tunnel.opacity);
    refs.tunnel.style.background = `radial-gradient(circle at 50% 42%, transparent ${tunnel.radius}%, rgba(3,6,15,0.88) ${tunnel.radius + 6}%)`;
  }

  if (!framesOnly && refs.owl) {
    applyHeroTransform(refs.owl, visionBridgeOwl(p));
  }

  const wash = Math.max(0, 1 - smoothrange(p, 0.06, 0.62)) * 0.78;
  const iris = 0.28 + smoothrange(p, 0.04, 0.48) * 0.55;
  const sat = framesOnly
    ? 1.28 - smoothrange(p, 0, 0.75) * 0.22
    : 1.42 - smoothrange(p, 0, 0.75) * 0.32;

  if (refs.media) {
    refs.media.style.setProperty("--s02-sat", String(sat));
    refs.media.style.setProperty("--s02-bright", String(1.06 + wash * 0.1));
  }
  if (refs.colorwash) refs.colorwash.style.opacity = String(wash);
  if (refs.irisGlow) refs.irisGlow.style.opacity = String(iris);

  if (framesOnly && refs.media && !skipExitFade) {
    const exitFade = smoothrange(p, 0.78, 0.94);
    refs.media.style.opacity = String(1 - exitFade);
    refs.media.style.transform = `scale(${1 + exitFade * 0.12})`;
  }

  const copyIn = smoothrange(p, 0.12, 0.38);
  const copyOut = smoothrange(p, 0.78, 0.95);
  if (refs.copy) {
    gsap.set(refs.copy, {
      opacity: copyIn * (1 - copyOut),
      y: 28 * (1 - copyIn) + copyOut * -20,
    });
  }
  if (refs.headline) {
    gsap.set(refs.headline, {
      opacity: smoothrange(p, 0.18, 0.42),
      y: 24 * (1 - smoothrange(p, 0.18, 0.42)),
    });
  }
}

export function SectionVisionBridge({
  cfg,
  scrubMode = "frames",
  embedded = false,
  progress: progressProp,
}: SectionVisionBridgeProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const owlRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const colorwashRef = useRef<HTMLDivElement>(null);
  const irisGlowRef = useRef<HTMLDivElement>(null);
  const [internalProgress, setInternalProgress] = useState(0);

  const framesOnly = scrubMode === "frames";
  const progress = embedded && progressProp !== undefined ? progressProp : internalProgress;
  const f2fId = cfg.f2f[0];
  const posterA = cfg.images[0];
  const posterB = cfg.images[1] ?? cfg.images[0];
  const owlLoop = cfg.heroVideo;

  const getRefs = useCallback(
    (): VisionBridgeRefs => ({
      tunnel: tunnelRef.current,
      media: mediaRef.current,
      colorwash: colorwashRef.current,
      irisGlow: irisGlowRef.current,
      owl: owlRef.current,
      copy: copyRef.current,
      headline: headlineRef.current,
    }),
    []
  );

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh!,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub,
      smoothDuration: 0.18,
      onUpdate: embedded
        ? undefined
        : (p) => {
            setInternalProgress(p);
            applyVisionBridgeFrame(p, framesOnly, getRefs());
          },
    },
    [framesOnly, embedded, cfg.pinVh, cfg.pinMobileVh, cfg.scrub, getRefs]
  );

  useEffect(() => {
    if (!embedded || progressProp === undefined) return;
    applyVisionBridgeFrame(progressProp, framesOnly, getRefs(), true);
  }, [embedded, progressProp, framesOnly, getRefs]);

  const bridgeClass = framesOnly
    ? "s02-vision-bridge--frames-only"
    : "s02-vision-bridge--cinematic";

  const posterOpacity = framesOnly
    ? Math.max(0, 0.92 - progress * 2.4)
    : Math.max(0, 0.85 - progress * 1.1);

  const inner = (
    <div
      ref={embedded ? undefined : pinRef}
      className={`pin-section s02-vision-bridge ${bridgeClass}${embedded ? " s02-vision-bridge--embedded" : ""}`}
      id={embedded ? undefined : "s02-vision"}
    >
      <div className="s02-vision-void" aria-hidden />

      {posterA ? (
        <div className="s02-vision-crossfade" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="s02-vision-xf s02-vision-xf--a"
            src={imagePath(posterA, cfg.assetBase)}
            alt=""
            style={{ opacity: posterOpacity }}
          />
          {!framesOnly && posterB ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className="s02-vision-xf s02-vision-xf--b"
              src={imagePath(posterB, cfg.assetBase)}
              alt=""
              style={{ opacity: Math.min(0.9, progress * 1.05) }}
            />
          ) : null}
        </div>
      ) : null}

      <div ref={mediaRef} className={`s02-vision-media${framesOnly ? " s02-vision-media--frames" : ""}`}>
        {framesOnly ? (
          f2fId && env.enableF2f ? (
            <FrameScrubber
              sequenceId={f2fId}
              progress={progress}
              className="s02-vision-f2f-frames"
              blendMode="normal"
              assetBase={cfg.assetBase}
              objectPosition="center 40%"
              crossfade
            />
          ) : null
        ) : (
          <>
            {env.enableVideo && owlLoop ? (
              <div ref={owlRef} className="s02-vision-owl" aria-hidden>
                <video
                  src={videoPath(owlLoop, cfg.assetBase)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
            ) : null}

            {f2fId && env.enableVideo ? (
              <F2fVideoScrubber
                sequenceId={f2fId}
                progress={progress}
                assetBase={cfg.assetBase}
                className="s02-vision-f2f-video"
              />
            ) : null}

            {f2fId && env.enableF2f ? (
              <FrameScrubber
                sequenceId={f2fId}
                progress={progress}
                className="s02-vision-f2f"
                blendMode="screen"
                assetBase={cfg.assetBase}
              />
            ) : null}
          </>
        )}

      </div>

      <div ref={colorwashRef} className="s02-vision-colorwash" aria-hidden />
      <div ref={irisGlowRef} className="s02-vision-iris-glow" aria-hidden />
      <div className="s02-vision-readability-scrim" aria-hidden />
      <div ref={tunnelRef} className="s02-vision-tunnel" aria-hidden />
      <div className="s02-vision-vignette" aria-hidden />

      <div ref={copyRef} className="s02-vision-copy s02-vision-copy--prominent section-inner">
        <div className="s02-vision-copy-panel">
          <div className="eyebrow s02-vision-eyebrow">Visão KORUVISION</div>
          <h2 ref={headlineRef} className="section-headline s02-vision-headline">
            A inteligência que <em>enxerga cada lead</em> antes de esfriar.
          </h2>
          <p className="section-lede s02-vision-lede">
            Role e abra os olhos da coruja — a mesma visão que organiza seu pipeline e fecha negócios.
          </p>
        </div>
      </div>

      {!embedded ? (
        <div className="s02-vision-handoff" style={{ opacity: smoothrange(progress, 0.88, 1) }} aria-hidden />
      ) : null}
    </div>
  );

  if (embedded) return inner;

  return (
    <PinWrap id="s02-vision" pinVh={cfg.pinVh}>
      {inner}
    </PinWrap>
  );
}
