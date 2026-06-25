"use client";

import { useRef, useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { UIAgencyTenants } from "@/components/golden/GoldenUI";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { elementState } from "@/lib/motion-system";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S15");

export function SectionAgency() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh!,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub,
      onUpdate: (p) => {
        setProgress(p);
        const portal = pinRef.current?.querySelector(".agency-portal");
        if (portal) {
          const st = elementState(p, 0.1, 0.35, 0.8, 0.95, { scaleIn: 0.85 });
          gsap.set(portal, { opacity: st.opacity, scale: st.scale });
        }
      },
    },
    []
  );

  return (
    <PinWrap id="s15" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section" id="s15">
        <SectionMediaLayers cfg={cfg} progress={progress} />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} />
          <div className="agency-portal">
            <UIAgencyTenants />
          </div>
          <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
