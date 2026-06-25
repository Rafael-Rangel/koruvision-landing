"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap/register";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: "gold" | "violet" | "cyan";
  pulse: number;
}

/** Rede neural viva — sempre em movimento, independente do scroll */
export function LivingEcosystem() {
  useEffect(() => {
    registerGsap();
    const canvas = document.getElementById("living-ecosystem") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || prefersReduced) return;
    let journeyProgress = 0;
    let scrollVelocity = 0;
    let isVisible = document.visibilityState === "visible";

    const nodes: Node[] = Array.from({ length: 16 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.0003,
      r: 1.2 + Math.random() * 2.2,
      hue: (["gold", "violet", "cyan"] as const)[Math.floor(Math.random() * 3)],
      pulse: Math.random() * Math.PI * 2,
    }));

    const color = (h: Node["hue"], a: number) => {
      if (h === "gold") return `rgba(255,194,51,${a})`;
      if (h === "cyan") return `rgba(59,130,246,${a})`;
      return `rgba(139,92,246,${a})`;
    };

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

    let mx = 0.5;
    let my = 0.4;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    const onVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        journeyProgress = self.progress;
        scrollVelocity = self.getVelocity() / 1000;
        canvas.style.opacity = String(0.36 + self.progress * 0.12);
      },
    });

    let t = 0;
    let raf = 0;
    const draw = () => {
      if (!isVisible || prefersReduced) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const w = window.innerWidth;
      const h = window.innerHeight;
      const jp = journeyProgress;
      const vel = scrollVelocity;
      t += 0.016;

      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx + (mx - 0.5) * 0.00008;
        n.y += n.vy + (my - 0.5) * 0.00006 + jp * 0.00002;
        if (n.x < 0) n.x = 1;
        if (n.x > 1) n.x = 0;
        if (n.y < 0) n.y = 1;
        if (n.y > 1) n.y = 0;
        n.pulse += 0.02;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j += isMobile ? 3 : 2) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const dist = Math.hypot(dx, dy);
          if (dist > 160) continue;
          const alpha = (1 - dist / 160) * (0.12 + Math.abs(vel) * 0.008);
          const phase = (t * 2 + i * 0.3) % 1;
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.strokeStyle = `rgba(139,92,246,${alpha * (0.5 + Math.sin(phase * Math.PI) * 0.5)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();

          if (dist < 100 && Math.sin(t * 3 + i) > 0.92) {
            const px = a.x * w + (b.x * w - a.x * w) * phase;
            const py = a.y * h + (b.y * h - a.y * h) * phase;
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,194,51,0.55)";
            ctx.fill();
          }
        }
      }

      for (const n of nodes) {
        const pulse = 1 + Math.sin(n.pulse) * 0.35;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = color(n.hue, 0.28 + Math.sin(n.pulse) * 0.12);
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
      st.kill();
    };
  }, []);

  return <canvas id="living-ecosystem" className="living-ecosystem" aria-hidden />;
}
