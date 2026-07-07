"use client";

import { useEffect, useRef, useState } from "react";
import { F2F_SEQUENCES } from "@/config/assets";
import { videoPath } from "@/config/env";

interface F2fVideoScrubberProps {
  sequenceId: string;
  progress: number;
  assetBase?: string;
  className?: string;
  objectPosition?: string;
  onReady?: () => void;
}

/**
 * Scrub do MP4 fonte da sequência F2F — olhos da coruja abrindo no scroll.
 * Mais fluido que carregar 90+ frames webp individualmente.
 */
export function F2fVideoScrubber({
  sequenceId,
  progress,
  assetBase,
  className = "",
  objectPosition = "center 38%",
  onReady,
}: F2fVideoScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const meta = F2F_SEQUENCES[sequenceId];
  const src = meta ? videoPath(meta.sourceVideo, assetBase) : "";

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;

    const seek = () => {
      if (!Number.isFinite(v.duration) || v.duration <= 0) return;
      const t = Math.min(v.duration - 0.02, Math.max(0, progress * v.duration));
      if (Math.abs(v.currentTime - t) > 0.03) {
        v.currentTime = t;
      }
      setReady(true);
      onReady?.();
    };

    seek();
    v.addEventListener("loadedmetadata", seek);
    v.addEventListener("loadeddata", seek);
    return () => {
      v.removeEventListener("loadedmetadata", seek);
      v.removeEventListener("loadeddata", seek);
    };
  }, [progress, src, onReady]);

  if (!meta || !src) return null;

  return (
    <video
      ref={videoRef}
      className={`f2f-video-scrubber ${ready ? "f2f-video-scrubber--ready" : ""} ${failed ? "f2f-video-scrubber--failed" : ""} ${className}`}
      src={src}
      muted
      playsInline
      preload="auto"
      aria-hidden
      style={{ objectPosition }}
      onError={() => setFailed(true)}
    />
  );
}
