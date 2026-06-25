"use client";

import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S10");

const BENEFITS = [
  "Inbox unificado", "IA personalizada", "Kanban visual", "Automações", "Dashboard",
  "Integrações", "Multi-agente", "Handoff humano", "Tags inteligentes", "Relatórios",
  "API aberta", "Agência white-label",
];

export function SectionBenefits() {
  const rootRef = useGsapContext(() => {
    gsap.from(".benefit-star", {
      scrollTrigger: { trigger: "#s10", start: "top 75%" },
      scale: 0,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "back.out(1.4)",
    });
  }, []);

  return (
    <PinWrap id="s10" pinVh={cfg.pinVh}>
      <div ref={rootRef} className="section-flow s10-section" id="s10">
        <SectionMediaLayers cfg={cfg} progress={0} />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} align="center" />
          <div className="s10-constellation">
            {BENEFITS.map((b) => (
              <TiltCard key={b} className="benefit-star glass-card">
                <span>{b}</span>
              </TiltCard>
            ))}
          </div>
          <TiltCard className="agency-card glass-card">
            <h3>Modo Agência</h3>
            <p>Multi-tenant · white-label · MRR escalável</p>
          </TiltCard>
          <MagneticButton href="#s15">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
