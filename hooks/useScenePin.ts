"use client";

import { useRef, useState } from "react";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { PREMIUM_SCRUB, PREMIUM_SMOOTH_DURATION } from "@/lib/lenis-scroll";

interface UseScenePinOptions {
  pinVh: number;
  pinMobileVh?: number;
  scrub?: number | boolean;
  enabled?: boolean;
}

export function useScenePin({
  pinVh,
  pinMobileVh,
  scrub = PREMIUM_SCRUB.scene,
  enabled = true,
}: UseScenePinOptions) {
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  usePinSection(
    pinRef,
    {
      pinVh,
      pinMobileVh: pinMobileVh ?? Math.round(pinVh * 0.78),
      scrub,
      smoothDuration: PREMIUM_SMOOTH_DURATION,
      onUpdate: (p) => setProgress(p),
    },
    [pinVh, pinMobileVh, scrub, enabled]
  );

  return { pinRef, progress };
}
