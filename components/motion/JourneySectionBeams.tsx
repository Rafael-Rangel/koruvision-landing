"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap/register";

const ANCHORS = ["#s01", "#s04", "#cena-agentes", "#cena-integracoes", "#s-cta-eco"];

/** Feixes de energia que conectam seções durante o scroll */
export function JourneySectionBeams() {
  useEffect(() => {
    registerGsap();
    const svg = document.getElementById("journey-beams-svg");
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>(".journey-beam"));

    const update = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const sections = ANCHORS.map((sel) => document.querySelector(sel)).filter(Boolean) as HTMLElement[];

      paths.forEach((path, i) => {
        const from = sections[i];
        const to = sections[i + 1];
        if (!from || !to) {
          path.style.opacity = "0";
          return;
        }
        const y1 = from.getBoundingClientRect().top + from.offsetHeight * 0.85 + scrollY;
        const y2 = to.getBoundingClientRect().top + to.offsetHeight * 0.15 + scrollY;
        const mid = (y1 + y2) / 2 - scrollY;
        const visible = mid > -vh * 0.2 && mid < vh * 1.4;
        const progress = Math.max(0, Math.min(1, 1 - Math.abs(mid - vh * 0.5) / (vh * 0.6)));
        path.style.opacity = visible ? String(0.15 + progress * 0.45) : "0";
        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len * (1 - progress));
      });
    };

    const triggers = ANCHORS.map((sel) =>
      ScrollTrigger.create({ trigger: sel, start: "top bottom", end: "bottom top", onUpdate: update })
    );
    update();

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <svg className="journey-beams" id="journey-beams-svg" aria-hidden>
      <defs>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC233" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path className="journey-beam" d="M 28 0 Q 86 160 34 330 Q -18 520 30 720" fill="none" stroke="url(#beamGrad)" strokeWidth="1.5" />
      <path className="journey-beam" d="M 30 180 Q 112 390 32 610 Q -8 820 34 1040" fill="none" stroke="url(#beamGrad)" strokeWidth="1.5" />
      <path className="journey-beam" d="M 34 320 Q 92 540 28 760 Q -24 980 36 1200" fill="none" stroke="url(#beamGrad)" strokeWidth="1.5" />
      <path className="journey-beam" d="M 36 500 Q 118 720 30 940 Q 4 1080 42 1200" fill="none" stroke="url(#beamGrad)" strokeWidth="1.5" />
    </svg>
  );
}
