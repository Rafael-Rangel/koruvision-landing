"use client";

import { useEffect, useRef, useState } from "react";
import { env, videoPath, imagePath } from "@/config/env";

interface VideoLayerProps {
  filename: string;
  className?: string;
  loop?: boolean;
  zIndex?: number;
  posterImage?: string;
  intensity?: "low" | "medium" | "high";
  assetBase?: string;
}

export function VideoLayer({
  filename,
  className = "",
  loop = true,
  zIndex = 0,
  posterImage,
  intensity = "low",
  assetBase,
}: VideoLayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !env.enableVideo) return;
    v.play().catch(() => {});
  }, []);

  if (!env.enableVideo) return null;

  const src = videoPath(filename, assetBase);
  const poster = posterImage ? imagePath(posterImage, assetBase) : undefined;

  return (
    <video
      ref={ref}
      className={`video-layer video-layer--${intensity} ${ready ? "video-layer--ready" : ""} ${className}`}
      style={{ zIndex }}
      autoPlay
      muted
      loop={loop}
      playsInline
      preload="auto"
      poster={poster}
      onLoadedData={() => setReady(true)}
      onError={() => setReady(false)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
