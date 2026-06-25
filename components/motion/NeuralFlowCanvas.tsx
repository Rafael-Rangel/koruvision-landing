"use client";

import { useEffect, useRef } from "react";

const LABELS = ["WhatsApp", "CRM", "IA", "Automação", "Dashboard", "Integrações"];

interface NeuralFlowCanvasProps {
  progress?: number;
  className?: string;
}

/** Diagrama neural animado — nós pulsantes e energia fluindo */
export function NeuralFlowCanvas({ progress = 0, className = "" }: NeuralFlowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = LABELS.length;
    const nodes = LABELS.map((_, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      return {
        bx: 0.5 + Math.cos(angle) * 0.34,
        by: 0.5 + Math.sin(angle) * 0.32,
        x: 0.5,
        y: 0.5,
        label: LABELS[i],
        phase: i * 0.9,
      };
    });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let raf = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const p = progressRef.current;
      const active = Math.min(count - 1, Math.floor(p * count));
      t += 0.016;

      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;

      for (const n of nodes) {
        n.x = n.bx * w + Math.sin(t * 1.2 + n.phase) * 6;
        n.y = n.by * h + Math.cos(t * 1.1 + n.phase) * 5;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(139,92,246,${0.08 + Math.sin(t + i) * 0.04})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nodes[i].x, nodes[i].y);
        const flow = (t * 0.8 + i * 0.15) % 1;
        ctx.strokeStyle = i === active ? "rgba(255,194,51,0.35)" : "rgba(139,92,246,0.15)";
        ctx.lineWidth = i === active ? 1.4 : 0.9;
        ctx.stroke();

        const px = cx + (nodes[i].x - cx) * flow;
        const py = cy + (nodes[i].y - cy) * flow;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = i === active ? "rgba(255,194,51,0.8)" : "rgba(139,92,246,0.5)";
        ctx.fill();
      }

      const hubPulse = 1 + Math.sin(t * 2) * 0.15;
      const hubGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28 * hubPulse);
      hubGrad.addColorStop(0, "rgba(255,194,51,0.5)");
      hubGrad.addColorStop(0.5, "rgba(139,92,246,0.35)");
      hubGrad.addColorStop(1, "rgba(139,92,246,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 28 * hubPulse, 0, Math.PI * 2);
      ctx.fillStyle = hubGrad;
      ctx.fill();

      ctx.fillStyle = "#FFC233";
      ctx.font = "600 11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("IA", cx, cy + 4);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isActive = i === active;
        const r = (isActive ? 14 : 11) + Math.sin(t * 2.5 + n.phase) * 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "rgba(255,194,51,0.25)" : "rgba(18,24,42,0.85)";
        ctx.fill();
        ctx.strokeStyle = isActive ? "rgba(255,194,51,0.7)" : "rgba(139,92,246,0.4)";
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.stroke();
        ctx.fillStyle = isActive ? "#F0F4FF" : "#8B9EC4";
        ctx.font = `${isActive ? 600 : 500} 9px system-ui, sans-serif`;
        ctx.fillText(n.label, n.x, n.y + r + 12);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`neural-flow-canvas ${className}`} aria-hidden />;
}
