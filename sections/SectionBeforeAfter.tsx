"use client";

import { useRef, useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePinSection } from "@/lib/hooks/useGsapContext";

const cfg = getSection("S11");

export function SectionBeforeAfter() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [slider, setSlider] = useState(30);
  const [progress, setProgress] = useState(0);

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh!,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub,
      onUpdate: (p) => {
        setProgress(p);
        if (p > 0.7) setSlider(30 + (p - 0.7) / 0.3 * 40);
      },
    },
    []
  );

  return (
    <PinWrap id="s11" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section" id="s11">
        <SectionMediaLayers cfg={cfg} progress={progress} variant="problem" />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} />
          <div className="s11-slider">
            <div className="s11-before" style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}>
              <span>Caos · planilhas · bots</span>
            </div>
            <div className="s11-after">
              <span>Controle · pipeline · IA</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              className="s11-range"
              aria-label="Comparar antes e depois"
            />
          </div>
          <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
