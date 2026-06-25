"use client";

import { useRef, useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { UIKanbanBoard } from "@/components/golden/GoldenUI";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { elementState, smoothrange } from "@/lib/motion-system";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S08");

const COLS = ["Lead", "Qualificado", "Proposta", "Fechado"];

export function SectionFunnel() {
  const pinRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh!,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub,
      onUpdate: (p) => {
        setProgress(p);
        pinRef.current?.querySelectorAll(".s08-col").forEach((col, i) => {
          const st = elementState(p, 0.06 + i * 0.06, 0.2 + i * 0.06, 0.85, 0.96, { yIn: 20 });
          gsap.set(col, { opacity: st.opacity, y: st.y });
        });
        const fly = pinRef.current?.querySelector("#s08-fly-card");
        if (fly) {
          const x = smoothrange(p, 0.15, 0.85) * 75;
          gsap.set(fly, { x: `${x}%`, y: -smoothrange(p, 0.2, 0.7) * 20 });
        }
        if (counterRef.current) {
          counterRef.current.textContent = `R$ ${Math.round(smoothrange(p, 0.2, 0.8) * 2400).toLocaleString("pt-BR")}`;
        }
      },
    },
    []
  );

  return (
    <PinWrap id="s08" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section" id="s08">
        <SectionMediaLayers cfg={cfg} progress={progress} />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} />
          <div className="s08-kanban-wrap">
            <UIKanbanBoard />
            <div id="s08-fly-card" className="fly-card glass-card">Maria S. · <span ref={counterRef}>R$ 0</span></div>
          </div>
          <div className="s08-cols">
            {COLS.map((c) => (
              <div key={c} className="s08-col glass-card">{c}</div>
            ))}
          </div>
          <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
