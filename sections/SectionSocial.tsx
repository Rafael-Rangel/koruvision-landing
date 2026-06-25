"use client";

import { useRef } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S13");

const COUNTERS = [
  { label: "Equipes", value: 2400, suffix: "+" },
  { label: "Mensagens/mês", value: 12, suffix: "M" },
  { label: "Deals fechados", value: 89000, suffix: "+" },
  { label: "NPS", value: 72, suffix: "" },
];

export function SectionSocial() {
  const rootRef = useGsapContext(() => {
    COUNTERS.forEach(({ value }, i) => {
      const el = document.querySelector(`.counter-${i}`);
      if (!el) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: value,
        duration: 2,
        scrollTrigger: { trigger: "#s13", start: "top 75%" },
        onUpdate: () => {
          el.textContent = Math.round(obj.v).toLocaleString("pt-BR");
        },
      });
    });
  }, []);

  return (
    <PinWrap id="s13" pinVh={cfg.pinVh}>
      <div ref={rootRef} className="section-flow" id="s13">
        <SectionMediaLayers cfg={cfg} progress={0} />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} align="center" />
          <div className="s13-counters">
            {COUNTERS.map((c, i) => (
              <div key={c.label} className="counter-block glass-card">
                <div className={`counter-val counter-${i}`}>0</div>
                <div className="counter-suffix">{c.suffix}</div>
                <div className="counter-label">{c.label}</div>
              </div>
            ))}
          </div>
          <div className="marquee">
            <div className="marquee-track">Clínica Sorriso · Imob Prime · Agência Nova · E-com Lux · Consult Pro · </div>
          </div>
          <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
