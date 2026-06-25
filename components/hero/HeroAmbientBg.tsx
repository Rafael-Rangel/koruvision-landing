"use client";

import { useEffect, useRef } from "react";

/** Fundo animado futurista — grid + partículas + orbes (hero). */
export function HeroAmbientBg({ progress = 0 }: { progress?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 900px)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);

    const count = mobile ? 18 : 36;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00028,
      hue: Math.random() > 0.55 ? "gold" : "violet",
    }));

    let raf = 0;
    let t = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      t += reduced ? 0 : 1;
      ctx.clearRect(0, 0, w, h);

      const p = progressRef.current;
      const gridAlpha = 0.04 + p * 0.03;
      const step = mobile ? 48 : 64;
      ctx.strokeStyle = `rgba(139, 92, 246, ${gridAlpha})`;
      ctx.lineWidth = 1;
      const offY = (t * 0.15) % step;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = -step; y < h + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + offY);
        ctx.lineTo(w, y + offY);
        ctx.stroke();
      }

      if (!reduced) {
        for (const pt of pts) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.x < 0 || pt.x > 1) pt.vx *= -1;
          if (pt.y < 0 || pt.y > 1) pt.vy *= -1;
          const px = pt.x * w;
          const py = pt.y * h;
          const pulse = 0.35 + Math.sin(t * 0.02 + pt.x * 10) * 0.15;
          ctx.beginPath();
          ctx.arc(px, py, pt.r * pulse, 0, Math.PI * 2);
          ctx.fillStyle =
            pt.hue === "gold"
              ? `rgba(255, 194, 51, ${0.25 + p * 0.2})`
              : `rgba(139, 92, 246, ${0.3 + p * 0.25})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="s01-hero-ambient" aria-hidden>
      <div className="s01-hero-ambient__orb s01-hero-ambient__orb--violet" />
      <div className="s01-hero-ambient__orb s01-hero-ambient__orb--gold" />
      <div className="s01-hero-ambient__scan" />
      <canvas ref={canvasRef} className="s01-hero-ambient__canvas" />
    </div>
  );
}
