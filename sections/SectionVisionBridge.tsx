"use client";

import { useRef, useState } from "react";
import { PinWrap } from "@/components/sections/SectionShell";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { visionTunnelMask, visionBridgeOwl, applyHeroTransform } from "@/lib/hero-choreography";
import { smoothrange } from "@/lib/motion-system";
import { gsap } from "@/lib/gsap/register";
import { imagePath, videoPath, env } from "@/config/env";
import type { SectionConfig } from "@/config/sections";
import { FrameScrubber } from "@/components/motion/FrameScrubber";
import { F2fVideoScrubber } from "@/components/motion/F2fVideoScrubber";

interface SectionVisionBridgeProps {
  cfg: SectionConfig;
}

export function SectionVisionBridge({ cfg }: SectionVisionBridgeProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const owlRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const colorwashRef = useRef<HTMLDivElement>(null);
  const irisGlowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const f2fId = cfg.f2f[0];
  const posterA = cfg.images[0];
  const posterB = cfg.images[1] ?? cfg.images[0];
  const owlLoop = cfg.heroVideo;

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh!,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub,
      smoothDuration: 0.18,
      onUpdate: (p) => {
        setProgress(p);

        const tunnel = visionTunnelMask(p);
        if (tunnelRef.current) {
          tunnelRef.current.style.opacity = String(tunnel.opacity);
          tunnelRef.current.style.background = `radial-gradient(circle at 50% 42%, transparent ${tunnel.radius}%, rgba(3,6,15,0.88) ${tunnel.radius + 6}%)`;
        }

        applyHeroTransform(owlRef.current, visionBridgeOwl(p));

        /* Cor forte no início (frame 1 sem cor) → natural conforme olho abre */
        const wash = Math.max(0, 1 - smoothrange(p, 0.06, 0.62)) * 0.78;
        const iris = 0.28 + smoothrange(p, 0.04, 0.48) * 0.55;
        const sat = 1.42 - smoothrange(p, 0, 0.75) * 0.32;
        if (mediaRef.current) {
          mediaRef.current.style.setProperty("--s02-sat", String(sat));
          mediaRef.current.style.setProperty("--s02-bright", String(1.06 + wash * 0.1));
        }
        if (colorwashRef.current) colorwashRef.current.style.opacity = String(wash);
        if (irisGlowRef.current) irisGlowRef.current.style.opacity = String(iris);

        const copyIn = smoothrange(p, 0.12, 0.38);
        const copyOut = smoothrange(p, 0.78, 0.95);
        if (copyRef.current) {
          gsap.set(copyRef.current, {
            opacity: copyIn * (1 - copyOut),
            y: 28 * (1 - copyIn) + copyOut * -20,
          });
        }
        if (headlineRef.current) {
          gsap.set(headlineRef.current, {
            opacity: smoothrange(p, 0.18, 0.42),
            y: 24 * (1 - smoothrange(p, 0.18, 0.42)),
          });
        }
      },
    },
    []
  );

  return (
    <PinWrap id="s02-vision" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section s02-vision-bridge s02-vision-bridge--cinematic" id="s02-vision">
        <div className="s02-vision-void" aria-hidden />

        {/* Posters — fallback enquanto vídeo/F2F carrega */}
        <div className="s02-vision-crossfade" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="s02-vision-xf s02-vision-xf--a"
            src={imagePath(posterA, cfg.assetBase)}
            alt=""
            style={{ opacity: Math.max(0, 0.85 - progress * 1.1) }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="s02-vision-xf s02-vision-xf--b"
            src={imagePath(posterB, cfg.assetBase)}
            alt=""
            style={{ opacity: Math.min(0.9, progress * 1.05) }}
          />
        </div>

        <div ref={mediaRef} className="s02-vision-media">
          {/* Loop respiração — camada ambiente */}
          {env.enableVideo && owlLoop && (
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
          )}

          {/* Protagonista — vídeo F2F scrub (olhos abrindo) */}
          {f2fId && env.enableVideo && (
            <F2fVideoScrubber
              sequenceId={f2fId}
              progress={progress}
              assetBase={cfg.assetBase}
              className="s02-vision-f2f-video"
            />
          )}

          {/* Camada extra — frames webp por cima (nitidez + blend screen) */}
          {f2fId && env.enableF2f && (
            <FrameScrubber
              sequenceId={f2fId}
              progress={progress}
              className="s02-vision-f2f"
              blendMode="screen"
              assetBase={cfg.assetBase}
            />
          )}

          {/* Overlay roxo — forte no frame 1, some ao abrir o olho */}
          <div ref={colorwashRef} className="s02-vision-colorwash" aria-hidden />
          <div ref={irisGlowRef} className="s02-vision-iris-glow" aria-hidden />
        </div>

        <div ref={tunnelRef} className="s02-vision-tunnel" aria-hidden />
        <div className="s02-vision-vignette" aria-hidden />

        <div ref={copyRef} className="s02-vision-copy s02-vision-copy--prominent section-inner">
          <div className="eyebrow s02-vision-eyebrow">Visão KORUVISION</div>
          <h2 ref={headlineRef} className="section-headline s02-vision-headline">
            A inteligência que <em>enxerga cada lead</em> antes de esfriar.
          </h2>
          <p className="section-lede s02-vision-lede">
            Role e abra os olhos da coruja — a mesma visão que organiza seu pipeline e fecha negócios.
          </p>
        </div>

        <div className="s02-vision-handoff" style={{ opacity: smoothrange(progress, 0.88, 1) }} aria-hidden />
      </div>
    </PinWrap>
  );
}
