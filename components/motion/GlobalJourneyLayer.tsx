"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap/register";

export function GlobalJourneyLayer() {
  useEffect(() => {
    registerGsap();
    const root = document.documentElement;
    let journeyProgress = 0;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        journeyProgress = self.progress;
        root.style.setProperty("--journey-p", String(self.progress));
      },
    });

    const canvas = document.getElementById("journey-particles") as HTMLCanvasElement | null;
    if (!canvas) return () => st.kill();

    const ctx = canvas.getContext("2d");
    if (!ctx) return () => st.kill();

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    let isVisible = document.visibilityState === "visible";

    const onVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const pts = Array.from({ length: isMobile ? 16 : 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.12,
      gold: Math.random() > 0.55,
    }));

    let raf = 0;
    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!isVisible) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const jp = journeyProgress;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j += isMobile ? 3 : 2) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.06 * (1 - dist / 120) * (0.5 + jp)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy + jp * 0.02;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.gold ? 1.1 : 0.8, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? "rgba(255,194,51,0.22)" : "rgba(139,92,246,0.2)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      st.kill();
    };
  }, []);

  return (
    <div className="global-journey" aria-hidden>
      <div className="global-journey-aurora" />
      <div className="global-journey-grid" />
      <canvas className="global-journey-particles" id="journey-particles" />
      <svg className="global-journey-spine" viewBox="0 0 4 1200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="15%" stopColor="#FFC233" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#3B82F6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M2 0 Q 3 200 2 400 Q 1 600 2 800 Q 3 1000 2 1200"
          fill="none"
          stroke="url(#spineGrad)"
          strokeWidth="2"
        />
      </svg>
      <div className="global-journey-rays" />
    </div>
  );
}
