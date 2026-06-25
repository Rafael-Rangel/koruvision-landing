"use client";

import { useRef, useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S14");

const LOGOS = ["WhatsApp", "Stripe", "Google", "Meta", "Zapier", "HubSpot", "Slack", "Notion"];

export function SectionIntegrations() {
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
        pinRef.current?.querySelectorAll(".orbit-sat").forEach((sat, i) => {
          const angle = p * Math.PI * 2 + (i / LOGOS.length) * Math.PI * 2;
          const r = 120 + (i % 3) * 40;
          gsap.set(sat, {
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r * 0.4,
          });
        });
      },
    },
    []
  );

  return (
    <PinWrap id="s14" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section" id="s14">
        <SectionMediaLayers cfg={cfg} progress={progress} />
        <div className="section-inner text-center">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} align="center" />
          <div className="orbit-stage">
            <div className="orbit-core">FlowIA</div>
            {LOGOS.map((logo, i) => (
              <div key={logo} className="orbit-sat glass-card">{logo}</div>
            ))}
          </div>
          <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
