"use client";

import { useRef, useEffect, useCallback } from "react";
import { env, imagePath, videoPath } from "@/config/env";
import { SmartVideo } from "@/components/performance/SmartVideo";

interface AmbientParticlesProps {
  count?: number;
  className?: string;
}

/** Partículas leves — time-driven, nunca scroll-driven */
export function AmbientParticles({ count = 36, className = "" }: AmbientParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const onMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove, { passive: true });
    const canvas = canvasRef.current;
    if (!canvas) return () => window.removeEventListener("mousemove", onMove);

    const ctx = canvas.getContext("2d");
    if (!ctx) return () => window.removeEventListener("mousemove", onMove);

    const dpr = Math.min(window.devicePixelRatio, 2);
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const particleCount = isMobile ? Math.min(14, count) : count;
    let isVisible = document.visibilityState === "visible";
    const onVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const particles: P[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.2,
      r: 0.6 + Math.random() * 1.4,
      hue: Math.random() > 0.5 ? 265 : 42,
    }));

    let raf = 0;
    const draw = () => {
      if (!isVisible) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        p.x += p.vx + (mx - 0.5) * 0.08;
        p.y += p.vy + (my - 0.5) * 0.06;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hue > 200 ? "rgba(139,92,246,0.35)" : "rgba(255,194,51,0.28)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, onMove]);

  return <canvas ref={canvasRef} className={`ambient-particles ${className}`} aria-hidden />;
}

interface VideoCardProps {
  video?: string;
  poster?: string;
  fallbackPoster?: string;
  assetBase?: string;
  label?: string;
  className?: string;
  tilt?: boolean;
}

export function VideoCard({ video, poster, fallbackPoster, assetBase, label, className = "", tilt = true }: VideoCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tilt || !ref.current) return;
    const el = ref.current;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${nx * 8}deg) rotateX(${-ny * 8}deg)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [tilt]);

  const posterSrc = poster ?? fallbackPoster;

  return (
    <div ref={ref} className={`video-card ${className}`} data-ambient-float data-ambient-amp="6">
      <div className="video-card-inner">
        {env.enableVideo && video ? (
          <SmartVideo
            src={videoPath(video, assetBase)}
            poster={posterSrc ? imagePath(posterSrc, assetBase) : undefined}
            preload="none"
            rootMargin="600px 0px"
            disableOnMobile
            onError={() => {
              const img = ref.current?.querySelector("img");
              if (img) img.style.display = "block";
            }}
          />
        ) : null}
        {posterSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagePath(posterSrc, assetBase)}
            alt=""
            style={{ display: env.enableVideo && video ? "none" : "block" }}
            onError={(e) => {
              if (fallbackPoster && fallbackPoster !== posterSrc) {
                (e.target as HTMLImageElement).src = imagePath(fallbackPoster, assetBase);
              }
            }}
          />
        ) : null}
        <div className="video-card-sweep" data-ambient-sweep aria-hidden />
        <div className="video-card-glow" data-ambient-glow aria-hidden />
      </div>
      {label && <span className="video-card-label">{label}</span>}
    </div>
  );
}
