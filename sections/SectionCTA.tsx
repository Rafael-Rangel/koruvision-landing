"use client";

import { useRef, useState, useEffect } from "react";
import { getSection } from "@/config/sections";
import { CRM_URLS } from "@/lib/crm-url";
import { PinWrap } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePinSection, applyState } from "@/lib/hooks/useGsapContext";
import { elementState, splitWords } from "@/lib/motion-system";

const cfg = getSection("S19");

export function SectionCTA() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    splitWords(headlineRef.current);
  }, []);

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh!,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub,
      onUpdate: (p) => {
        setProgress(p);
        pinRef.current?.querySelectorAll(".word").forEach((w, i) => {
          applyState(w as HTMLElement, elementState(p, 0.08 + i * 0.04, 0.24 + i * 0.04, 0.82, 0.96, { yIn: 28, scaleIn: 0.9 }));
        });
      },
    },
    []
  );

  return (
    <PinWrap id="s19" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section" id="s19">
        <SectionMediaLayers cfg={cfg} progress={progress} variant="cta" ambientVideo="nv5-vid-014.mp4" />
        <div className="section-inner text-center">
          <div className="eyebrow">{cfg.eyebrow}</div>
          <h2 ref={headlineRef} className="section-headline">
            {cfg.headline} <em>{cfg.headlineEm}</em>
          </h2>
          <p className="section-lede" style={{ margin: "0 auto 24px" }}>{cfg.subheadline}</p>
          <div className="cta-row center">
            <MagneticButton href={CRM_URLS.signup}>{cfg.ctaPrimary}</MagneticButton>
            <MagneticButton href={CRM_URLS.interesse} variant="ghost">{cfg.ctaSecondary}</MagneticButton>
          </div>
        </div>
      </div>
    </PinWrap>
  );
}
