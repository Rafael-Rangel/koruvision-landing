"use client";

import { ReactNode, useRef, useEffect } from "react";
import { gsap, registerGsap } from "@/lib/gsap/register";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = "", maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || window.matchMedia("(max-width: 900px)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, {
        rotateY: px * maxTilt,
        rotateX: -py * maxTilt,
        duration: 0.35,
        ease: "power2.out",
        transformPerspective: 800,
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={`tilt-card ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
