"use client";

import { useEffect, useRef } from "react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap/register";

export function DataRiver() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      onUpdate: (self) => {
        path.style.strokeDashoffset = `${len * (1 - self.progress)}`;
        const p = self.progress;
        if (p < 0.08) path.style.stroke = "url(#riverGlobalGrad)";
        else if (p < 0.18) path.style.stroke = "url(#riverDangerGrad)";
        else path.style.stroke = "url(#riverGlobalGrad)";
      },
    });

    return () => st.kill();
  }, []);

  return (
    <svg id="data-river-global" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="riverGlobalGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B24BFF" />
          <stop offset="50%" stopColor="#FFC233" />
          <stop offset="100%" stopColor="#2EE8C0" />
        </linearGradient>
        <linearGradient id="riverDangerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4D6A" />
          <stop offset="100%" stopColor="#B24BFF" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        id="riverGlobalPath"
        d="M-5,98 C15,85 25,70 35,55 S55,25 65,15 S85,5 105,-2"
        vectorEffect="non-scaling-stroke"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
