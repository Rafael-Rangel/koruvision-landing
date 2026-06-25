"use client";

import { useEffect, useRef, useState } from "react";

interface SmartVideoProps {
  src: string;
  poster?: string;
  className?: string;
  eager?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
  rootMargin?: string;
  disableOnMobile?: boolean;
  onLoadedData?: () => void;
  onError?: () => void;
}

export function SmartVideo({
  src,
  poster,
  className = "",
  eager = false,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "none",
  rootMargin = "700px 0px",
  disableOnMobile = false,
  onLoadedData,
  onError,
}: SmartVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [visible, setVisible] = useState(eager);
  const [mobileBlocked, setMobileBlocked] = useState(false);

  useEffect(() => {
    if (disableOnMobile && window.matchMedia("(max-width: 900px)").matches) {
      setMobileBlocked(true);
      return;
    }

    const el = ref.current;
    if (!el || eager || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setVisible(isVisible);
        if (isVisible) setShouldLoad(true);
      },
      { rootMargin, threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [disableOnMobile, eager, rootMargin]);

  useEffect(() => {
    const el = ref.current;
    if (!el || mobileBlocked || !shouldLoad) return;
    if (visible) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [mobileBlocked, shouldLoad, visible]);

  return (
    <video
      ref={ref}
      className={className}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={eager ? preload : "none"}
      poster={poster}
      onLoadedData={onLoadedData}
      onError={onError}
    >
      {shouldLoad && !mobileBlocked ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
