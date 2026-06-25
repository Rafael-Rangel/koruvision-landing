"use client";

import { useRef, useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { elementState, smoothrange } from "@/lib/motion-system";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S02");

const PAINS = [
  { icon: "💬", title: "WhatsApp caótico", desc: "Conversas espalhadas, sem histórico, sem contexto." },
  { icon: "📋", title: "Planilhas quebradas", desc: "Dados desatualizados, erros humanos, zero visibilidade." },
  { icon: "🤖", title: "Bots sem alma", desc: "Respostas genéricas que afastam leads qualificados." },
  { icon: "📉", title: "Pipeline vazio", desc: "Leads esfriam enquanto você apaga incêndio operacional." },
];

export function SectionProblem() {
  const pinRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh!,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub,
      onUpdate: (p) => {
        setProgress(p);
        pinRef.current?.querySelectorAll(".pain-card").forEach((card, i) => {
          const st = elementState(p, 0.06 + i * 0.08, 0.22 + i * 0.08, 0.78, 0.94, { yIn: 40, scaleIn: 0.88 });
          gsap.set(card, { opacity: st.opacity, y: st.y, scale: st.scale, rotateX: (1 - st.opacity) * 8 });
        });
        if (statRef.current) statRef.current.textContent = `${Math.round(smoothrange(p, 0.1, 0.5) * 78)}%`;
      },
    },
    []
  );

  return (
    <PinWrap id="s02" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section" id="s02">
        <SectionMediaLayers cfg={cfg} progress={progress} variant="problem" f2fBlend="overlay" />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} />
          <div className="s02-grid">
            {PAINS.map((p) => (
              <TiltCard key={p.title} className="pain-card glass-card">
                <div className="icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </TiltCard>
            ))}
          </div>
          <div className="s02-stat">
            <div className="s02-stat-val" ref={statRef}>0%</div>
            <div className="s02-stat-lbl">das PMEs perdem leads<br />por falta de follow-up</div>
          </div>
          <MagneticButton href="#s03">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
