"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap/register";
import { lerp, smoothrange } from "@/lib/motion-system";

interface ChaosSlaBadgeProps {
  scrollProgress?: number;
}

/** Badge SLA — valor segue o scroll diretamente (sem tween que reseta) */
export function ChaosSlaBadge({ scrollProgress = 0 }: ChaosSlaBadgeProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const targetMinutes = Math.round(lerp(0, 47, smoothrange(scrollProgress, 0.02, 0.88)));

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(root.querySelector(".chaos-3d__sla-ring"), {
        rotate: 360,
        duration: 14,
        repeat: -1,
        ease: "none",
      });
      const num = root.querySelector("strong");
      if (num) {
        gsap.to(num, {
          scale: 1.03,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="chaos-3d__sla" data-chaos-part="sla" data-chaos-hover="sla">
      <span className="chaos-3d__sla-ring" aria-hidden />
      <strong data-chaos-part="sla-num">{targetMinutes}m</strong>
      <small>sem resposta</small>
    </div>
  );
}
