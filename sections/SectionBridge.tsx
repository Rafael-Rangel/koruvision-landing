"use client";

import { useRef, useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePinSection, applyState } from "@/lib/hooks/useGsapContext";
import { elementState } from "@/lib/motion-system";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S03");

const PILLARS = [
  { title: "Inbox unificado", desc: "Todas as conversas num lugar" },
  { title: "IA com personalidade", desc: "Tom humano, 24/7" },
  { title: "Pipeline visual", desc: "Deals em movimento" },
  { title: "Automação inteligente", desc: "Triggers que pensam" },
];

export function SectionBridge() {
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
        pinRef.current?.querySelectorAll(".s03-tunnel circle").forEach((r, i) => {
          gsap.set(r, { scale: 0.5 + p * (2 + i * 0.3), opacity: 0.15 + p * 0.35, transformOrigin: "50% 50%" });
        });
        pinRef.current?.querySelectorAll(".pillar-card").forEach((card, i) => {
          applyState(card as HTMLElement, elementState(p, 0.12 + i * 0.06, 0.28 + i * 0.06, 0.8, 0.94, { yIn: 30, scaleIn: 0.9 }));
        });
      },
    },
    []
  );

  return (
    <PinWrap id="s03" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section" id="s03">
        <SectionMediaLayers cfg={cfg} progress={progress} variant="bridge" />
        <div className="s03-tunnel-wrap">
          <svg className="s03-tunnel" viewBox="0 0 400 400">
            <g transform="translate(200,200)">
              {[40, 80, 120, 160, 200].map((r) => (
                <circle key={r} r={r} className="s03-tunnel-ring" fill="none" stroke="rgba(46,232,192,0.3)" strokeWidth="1" />
              ))}
            </g>
          </svg>
        </div>
        <div className="section-inner text-center">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} align="center" />
          <div className="s03-pillars">
            {PILLARS.map((p) => (
              <div key={p.title} className="pillar-card glass-card">
                <div className="check">✓</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
          <MagneticButton href="#s04">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
