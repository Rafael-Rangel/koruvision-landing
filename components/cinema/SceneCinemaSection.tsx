"use client";

import type { ReactNode, CSSProperties } from "react";
import { PinWrap } from "@/components/sections/SectionShell";
import { SceneCinemaLayer } from "@/components/cinema/SceneCinemaLayer";
import { useScenePin } from "@/hooks/useScenePin";
import type { Nv11SceneAssets } from "@/config/nv11-assets";
import { smoothrange } from "@/lib/motion-system";

interface SceneCinemaSectionProps {
  scene: Nv11SceneAssets;
  hue: number;
  className?: string;
  children: (ctx: { progress: number }) => ReactNode;
  pin?: boolean;
}

/** Seção com pin GSAP + camada cinema NV11 + handoff glow na saída. */
export function SceneCinemaSection({
  scene,
  hue,
  className = "",
  children,
  pin = true,
}: SceneCinemaSectionProps) {
  const { pinRef, progress } = useScenePin({
    pinVh: scene.pinVh ?? 200,
    pinMobileVh: scene.pinMobileVh,
    enabled: pin && !!scene.pinVh,
  });

  const handoffGlow = smoothrange(progress, 0.82, 1);

  const inner = (
    <div
      ref={pin ? pinRef : undefined}
      className={`scene-cinema-section ${className}`}
      style={{ "--scene-hue": String(hue), "--continuity-hue": String(scene.nextHue ?? hue) } as CSSProperties}
    >
      <SceneCinemaLayer
        bg={scene.bg}
        poster={scene.poster}
        loop={scene.loop}
        loop2={scene.loop2}
        loopOpacity={scene.loopOpacity}
        f2f={scene.f2f}
        progress={progress}
        handoffGlow={handoffGlow}
      />
      <div className="scene-cinema-content section-inner">
        {children({ progress })}
      </div>
    </div>
  );

  if (pin && scene.pinVh) {
    return (
      <PinWrap id={scene.domId} pinVh={scene.pinVh}>
        {inner}
      </PinWrap>
    );
  }

  return <section id={scene.domId}>{inner}</section>;
}
