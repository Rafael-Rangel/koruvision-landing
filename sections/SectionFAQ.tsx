"use client";

import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { FAQAccordion } from "@/components/golden/GoldenUI";

const cfg = getSection("S18");

export function SectionFAQ() {
  return (
    <PinWrap id="s18" pinVh={cfg.pinVh}>
      <div className="section-flow" id="s18">
        <SectionMediaLayers cfg={cfg} progress={0} />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} />
          <FAQAccordion />
        </div>
      </div>
    </PinWrap>
  );
}
