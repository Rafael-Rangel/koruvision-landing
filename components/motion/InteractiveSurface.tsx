"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface InteractiveSurfaceProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glow?: boolean;
}

/** Hover 3D + glow — cards e mockups respondem ao cursor */
export function InteractiveSurface({ children, className = "", intensity = 1, glow = true }: InteractiveSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(max-width: 900px)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      const ry = nx * 10 * intensity;
      const rx = -ny * 8 * intensity;
      el.style.transform = `perspective(900px) rotateY(${ry}deg) rotateX(${rx}deg) translateY(-4px) scale(1.02)`;
      el.style.setProperty("--surface-mx", `${(nx + 0.5) * 100}%`);
      el.style.setProperty("--surface-my", `${(ny + 0.5) * 100}%`);
    };
    const onLeave = () => {
      el.style.transform = "";
      el.style.setProperty("--surface-mx", "50%");
      el.style.setProperty("--surface-my", "50%");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity]);

  return (
    <div ref={ref} className={`interactive-surface ${glow ? "interactive-surface--glow" : ""} ${className}`} data-ambient-float data-ambient-amp="5">
      <div className="interactive-surface-shine" aria-hidden />
      {children}
    </div>
  );
}
