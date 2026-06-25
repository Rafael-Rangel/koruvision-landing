"use client";

import { useRef, useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { UIInboxThreeCol, DeviceShell } from "@/components/golden/GoldenUI";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePinSection, applyState } from "@/lib/hooks/useGsapContext";
import { elementState } from "@/lib/motion-system";

const cfg = getSection("S07");

export function SectionInbox() {
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
        pinRef.current?.querySelectorAll(".inbox-col-anim").forEach((col, i) => {
          const st = elementState(p, 0.06 + i * 0.1, 0.22 + i * 0.1, 0.85, 0.97, { yIn: 24 });
          applyState(col as HTMLElement, st);
        });
      },
    },
    []
  );

  return (
    <PinWrap id="s07" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section" id="s07">
        <SectionMediaLayers cfg={cfg} progress={progress} />
        <div className="section-inner s07-grid">
          <div>
            <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} />
            <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
          </div>
          <div className="inbox-col-anim">
            <DeviceShell><UIInboxThreeCol /></DeviceShell>
          </div>
        </div>
      </div>
    </PinWrap>
  );
}
