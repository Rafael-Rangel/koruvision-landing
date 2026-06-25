"use client";

import { useRef, useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { gsap, ScrollTrigger } from "@/lib/gsap/register";

const cfg = getSection("S06");

const AGENTS = [
  { name: "Consultivo", color: "#2EE8C0" },
  { name: "Direto", color: "#FFC233" },
  { name: "Empático", color: "#B24BFF" },
  { name: "Técnico", color: "#14F0A0" },
  { name: "Premium", color: "#E8ECF8" },
];

export function SectionAgents() {
  const [progress, setProgress] = useState(0);
  const rootRef = useGsapContext(() => {
    const track = document.querySelector(".s06-track");
    if (!track) return;
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 80),
      ease: "none",
      scrollTrigger: {
        trigger: "#s06-pin",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
      },
    });
  }, []);

  return (
    <PinWrap id="s06" pinVh={cfg.pinVh}>
      <div ref={rootRef} className="pin-section" id="s06">
        <SectionMediaLayers cfg={cfg} progress={progress} />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} />
          <div className="s06-track">
            {AGENTS.map((a) => (
              <TiltCard key={a.name} className="agent-card-lg glass-card">
                <div className="agent-dot" style={{ background: a.color }} />
                <h3>{a.name}</h3>
                <p>Tom configurável · respostas naturais</p>
              </TiltCard>
            ))}
          </div>
          <div className="s06-chat glass-card">
            <div className="s06-toggle"><span className="bot">Bot</span><span className="human on">Humano</span></div>
            <p>Lead: &quot;Quanto custa?&quot;</p>
            <p className="ai-reply">Consulta R$ 180 — posso agendar amanhã 9h?</p>
          </div>
          <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
