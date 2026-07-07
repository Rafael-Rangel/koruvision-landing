"use client";

import type { ReactNode, CSSProperties } from "react";
import { PinWrap } from "@/components/sections/SectionShell";
import { SceneCinemaLayer } from "@/components/cinema/SceneCinemaLayer";
import { useScenePin } from "@/hooks/useScenePin";
import type { Nv11SceneAssets } from "@/config/nv11-assets";
import { smoothrange } from "@/lib/motion-system";
import {
  problemSceneAnimProgress,
  problemSceneEnter,
  problemSceneEnterWithIris,
} from "@/lib/scene-choreography";

interface SceneCinemaSectionProps {
  scene: Nv11SceneAssets;
  hue: number;
  className?: string;
  children: (ctx: { progress: number; rawProgress: number }) => ReactNode;
  pin?: boolean;
  blendEnter?: boolean;
  /** ScrollTrigger start do pin */
  pinStart?: string;
  /** Aguarda seção anterior sair (ex. #s02-vision-pin) */
  pinAfter?: string;
  /** Segura animação no início do pin (0–1) até a seção estar 100% visível */
  progressHold?: number;
  /** Dentro do OwlChaosFlow — sem pin próprio */
  embedded?: boolean;
  rawProgress?: number;
  animProgress?: number;
  irisReveal?: number;
}

/** Seção com pin GSAP + camada cinema NV11 + handoff glow na saída. */
export function SceneCinemaSection({
  scene,
  hue,
  className = "",
  children,
  pin = true,
  blendEnter = false,
  pinStart,
  pinAfter,
  progressHold,
  embedded = false,
  rawProgress: rawProgressProp = 0,
  animProgress: animProgressProp = 0,
  irisReveal = 0,
}: SceneCinemaSectionProps) {
  const { pinRef, progress: pinProgress } = useScenePin({
    pinVh: scene.pinVh ?? 200,
    pinMobileVh: scene.pinMobileVh,
    enabled: pin && !!scene.pinVh && !embedded,
    start: pinStart,
    pinAfter,
    progressHold,
  });

  const rawProgress = embedded ? rawProgressProp : pinProgress;
  const animProgress = embedded ? animProgressProp : blendEnter ? problemSceneAnimProgress(pinProgress) : pinProgress;

  const handoffGlow = smoothrange(animProgress, 0.82, 1);
  const enter = blendEnter
    ? embedded
      ? problemSceneEnterWithIris(irisReveal, rawProgress)
      : problemSceneEnter(rawProgress)
    : null;

  const embeddedContentOpacity = embedded
    ? irisReveal >= 0.75
      ? 1
      : Math.max(smoothrange(irisReveal, 0.18, 0.5), smoothrange(rawProgress, 0.08, 0.28))
    : enter?.contentOpacity ?? 1;

  const irisStyle = enter
    ? ({
        clipPath: embedded && irisReveal >= 0.85 ? "none" : enter.irisClip,
        WebkitClipPath: embedded && irisReveal >= 0.85 ? "none" : enter.irisClip,
        "--iris-r": `${enter.circleRadius}vmin`,
      } as CSSProperties)
    : undefined;

  const inner = (
    <div
      ref={embedded ? undefined : pin ? pinRef : undefined}
      id={embedded ? scene.domId : undefined}
      className={`scene-cinema-section ${className}${blendEnter ? " scene-cinema-section--blend-enter" : ""}${embedded ? " scene-cinema-section--embedded" : ""}`}
      style={{ "--scene-hue": String(hue), "--continuity-hue": String(scene.nextHue ?? hue) } as CSSProperties}
    >
      {blendEnter && enter ? (
        <div className="scene-cinema-enter-iris" style={irisStyle}>
          <SceneCinemaLayer
            bg={scene.bg}
            poster={scene.poster}
            loop={scene.loop}
            loop2={scene.loop2}
            loopOpacity={scene.loopOpacity}
            f2f={scene.f2f}
            progress={animProgress}
            handoffGlow={handoffGlow}
            layerOpacity={enter.layerOpacity}
            enterMist={enter.mistFromOwl}
          />
          <div
            className="scene-cinema-content section-inner"
            style={
              embedded
                ? {
                    opacity: embeddedContentOpacity,
                  }
                : {
                    opacity: enter.contentOpacity,
                    transform: `translate3d(0, ${enter.contentY}px, 0)`,
                  }
            }
          >
            {children({ progress: animProgress, rawProgress })}
          </div>
        </div>
      ) : (
        <>
          <SceneCinemaLayer
            bg={scene.bg}
            poster={scene.poster}
            loop={scene.loop}
            loop2={scene.loop2}
            loopOpacity={scene.loopOpacity}
            f2f={scene.f2f}
            progress={rawProgress}
            handoffGlow={handoffGlow}
          />
          <div className="scene-cinema-content section-inner">{children({ progress: animProgress, rawProgress })}</div>
        </>
      )}
    </div>
  );

  if (embedded) {
    return inner;
  }

  if (pin && scene.pinVh) {
    return (
      <PinWrap id={scene.domId} pinVh={scene.pinVh} className={blendEnter ? "pin-wrap--blend-enter" : undefined}>
        {inner}
      </PinWrap>
    );
  }

  return <section id={scene.domId}>{inner}</section>;
}
