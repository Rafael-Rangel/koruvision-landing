"use client";

import { useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S12");

const CASES = [
  { niche: "Saúde", metric: "+34% agendamentos", img: "case-saude-abstract.webp" },
  { niche: "Imóveis", metric: "+28% visitas", img: "case-imoveis-abstract.webp" },
  { niche: "Consultoria", metric: "+41% MQL", img: "case-consultoria-abstract.webp" },
  { niche: "Agências", metric: "R$ 128k MRR", img: "case-agencias-abstract.webp" },
  { niche: "E-commerce", metric: "+22% recuperação", img: "case-ecommerce-abstract.webp" },
];

export function SectionCases() {
  const [progress, setProgress] = useState(0);
  const rootRef = useGsapContext(() => {
    const track = document.querySelector(".s12-track");
    if (!track) return;
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 80),
      ease: "none",
      scrollTrigger: {
        trigger: "#s12-pin",
        start: "top top",
        end: "+=350%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => setProgress(self.progress),
      },
    });
  }, []);

  return (
    <PinWrap id="s12" pinVh={cfg.pinVh}>
      <div ref={rootRef} className="pin-section" id="s12">
        <SectionMediaLayers cfg={cfg} progress={progress} />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} />
          <div className="s12-track">
            {CASES.map((c) => (
              <TiltCard key={c.niche} className="case-card glass-card">
                <h3>{c.niche}</h3>
                <strong>{c.metric}</strong>
                <p>Resultados reais com FlowIA</p>
              </TiltCard>
            ))}
          </div>
          <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
