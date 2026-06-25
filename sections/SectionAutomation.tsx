"use client";

import { useRef, useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { UIWorkflowCanvas } from "@/components/golden/GoldenUI";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { smoothrange } from "@/lib/motion-system";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S09");

export function SectionAutomation() {
  const pinRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh!,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub,
      onUpdate: (p) => {
        setProgress(p);
        const path = pathRef.current;
        if (path) {
          const len = path.getTotalLength();
          path.style.strokeDashoffset = `${len * (1 - p)}`;
        }
        pinRef.current?.querySelectorAll(".wf-node").forEach((node, i) => {
          const active = p > i / 6;
          gsap.set(node, { opacity: active ? 1 : 0.4, scale: active ? 1.05 : 1 });
        });
      },
    },
    []
  );

  return (
    <PinWrap id="s09" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section" id="s09">
        <SectionMediaLayers cfg={cfg} progress={progress} />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} />
          <UIWorkflowCanvas />
          <svg className="s09-path" viewBox="0 0 600 80" aria-hidden>
            <path
              ref={pathRef}
              d="M10,40 H590"
              fill="none"
              stroke="#2EE8C0"
              strokeWidth="2"
              strokeDasharray="580"
              strokeDashoffset="580"
            />
          </svg>
          <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
