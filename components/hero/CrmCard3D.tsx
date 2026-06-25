"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { MacMetricsMockup } from "@/components/product/MacWindowMockup";
import { smoothrange } from "@/lib/motion-system";

interface CrmCard3DProps {
  scrollProgress?: number;
  className?: string;
  /** rise = hero central emerge de baixo */
  variant?: "default" | "rise";
}

/** Mockup CRM Mac — tilt 3D no hover + rise no scroll. */
export function CrmCard3D({ scrollProgress = 0, className = "", variant = "default" }: CrmCard3DProps) {
  const isRise = variant === "rise";
  const { stageRef, onMove, onLeave } = usePointerParallax({
    maxTiltX: isRise ? 14 : 10,
    maxTiltY: isRise ? 20 : 14,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const chipOpacity = isRise ? smoothrange(scrollProgress, 0.35, 0.65) : 1;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".crm-card-3d__chip",
        { opacity: 0, y: 16, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.14, duration: 0.7, ease: "power3.out", delay: 0.5 }
      );
      gsap.to(".crm-card-3d__pulse", {
        scale: 1.06,
        opacity: 0.9,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".crm-card-3d__rim", {
        opacity: 0.6,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      className={`crm-card-3d-stage ${isRise ? "crm-card-3d-stage--rise" : ""} ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div
        ref={cardRef}
        className={`crm-card-3d crm-card-3d--mac ${isRise ? "crm-card-3d--rise" : ""}`}
      >
        <div className="crm-card-3d__rim" aria-hidden />
        <div className="crm-card-3d__shine" aria-hidden />
        <div className="crm-card-3d__depth" aria-hidden />
        <MacMetricsMockup tilt={false} priority className="crm-card-3d__mac" />
        <div className="crm-card-3d__chip crm-card-3d__chip--1" style={{ opacity: chipOpacity }}>
          +1 lead qualificado
        </div>
        <div className="crm-card-3d__chip crm-card-3d__chip--2" style={{ opacity: chipOpacity }}>
          Pipeline R$ 152k
        </div>
        <div className="crm-card-3d__pulse" aria-hidden />
      </div>
    </div>
  );
}
