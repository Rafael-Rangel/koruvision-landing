"use client";

import { useEffect, useRef } from "react";

interface ProceduralOwlSceneProps {
  className?: string;
  intensity?: number;
}

/** Coruja procedural KORUVISION — fallback premium quando vídeo/imagem ausente */
export function ProceduralOwlScene({ className = "", intensity = 1 }: ProceduralOwlSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(devicePixelRatio, 2);
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 40 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 0.35 + Math.random() * 0.45,
      sp: 0.0004 + Math.random() * 0.001,
      gold: Math.random() > 0.45,
    }));

    let t = 0;
    let raf = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * 0.52;
      const cy = h * 0.46;
      const blink = Math.max(0, Math.sin(t * 0.0018) * 0.5 + 0.5) > 0.97 ? 0.12 : 1;

      ctx.clearRect(0, 0, w, h);

      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.55);
      grd.addColorStop(0, `rgba(139,92,246,${0.18 * intensity})`);
      grd.addColorStop(0.5, `rgba(3,6,15,0.4)`);
      grd.addColorStop(1, "rgba(3,6,15,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      for (const p of pts) {
        p.a += p.sp;
        const px = cx + Math.cos(p.a) * p.r * w * 0.5;
        const py = cy + Math.sin(p.a) * p.r * h * 0.45;
        ctx.beginPath();
        ctx.arc(px, py, p.gold ? 1.4 : 1, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? "rgba(255,194,51,0.35)" : "rgba(139,92,246,0.3)";
        ctx.fill();
      }

      const eyeR = Math.min(w, h) * 0.14;
      const gap = eyeR * 0.55;
      [-1, 1].forEach((side) => {
        const ex = cx + side * (eyeR + gap * 0.5);
        const ey = cy;

        ctx.beginPath();
        ctx.arc(ex, ey, eyeR * 1.35, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(200,210,230,0.35)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ex, ey, eyeR * 1.15, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(139,92,246,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(ex, ey, eyeR, eyeR * blink, 0, 0, Math.PI * 2);
        ctx.clip();

        const iris = ctx.createRadialGradient(ex, ey, 0, ex, ey, eyeR);
        iris.addColorStop(0, "#FFF4CC");
        iris.addColorStop(0.35, "#FFC233");
        iris.addColorStop(0.7, "#B8860B");
        iris.addColorStop(1, "#3D2A00");
        ctx.fillStyle = iris;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ex - eyeR * 0.15, ey - eyeR * 0.2, eyeR * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.fill();
        ctx.restore();
      });

      const gem = ctx.createRadialGradient(cx, cy + eyeR * 0.1, 0, cx, cy, eyeR * 0.35);
      gem.addColorStop(0, "#C4B5FD");
      gem.addColorStop(0.5, "#8B5CF6");
      gem.addColorStop(1, "#4C1D95");
      ctx.beginPath();
      ctx.ellipse(cx, cy + eyeR * 0.05, eyeR * 0.18, eyeR * 0.28, 0, 0, Math.PI * 2);
      ctx.fillStyle = gem;
      ctx.fill();
      ctx.shadowColor = "#8B5CF6";
      ctx.shadowBlur = 24 * intensity;

      ctx.strokeStyle = "rgba(255,194,51,0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();

      t += 16;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <div className={`procedural-owl ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="procedural-owl-canvas" />
      <div className="procedural-owl-chrome" />
      <div className="procedural-owl-flare" data-ambient-sweep />
    </div>
  );
}
