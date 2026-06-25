"use client";

import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { UIPricingCards } from "@/components/golden/GoldenUI";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S17");

export function SectionPricing() {
  const rootRef = useGsapContext(() => {
    gsap.from(".price-card", {
      scrollTrigger: { trigger: "#s17", start: "top 75%" },
      y: 60,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <PinWrap id="s17" pinVh={cfg.pinVh}>
      <div ref={rootRef} className="section-flow" id="s17">
        <SectionMediaLayers cfg={cfg} progress={0} />
        <div className="section-inner text-center">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} align="center" />
          <UIPricingCards />
          <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
