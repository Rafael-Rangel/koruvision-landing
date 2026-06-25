"use client";

import { useRef, useState } from "react";
import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { elementState } from "@/lib/motion-system";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S05");

const PORTALS = [
  { n: "01", title: "Conectar WhatsApp", desc: "QR code · 2 minutos" },
  { n: "02", title: "Configurar agente", desc: "Personalidade + tom" },
  { n: "03", title: "Importar contatos", desc: "CSV ou CRM" },
];

export function SectionSetup() {
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
        pinRef.current?.querySelectorAll(".portal-mono").forEach((el, i) => {
          const st = elementState(p, 0.08 + i * 0.12, 0.28 + i * 0.12, 0.82, 0.96, { yIn: 40, scaleIn: 0.9 });
          gsap.set(el, { opacity: st.opacity, y: st.y, scale: st.scale });
        });
      },
    },
    []
  );

  return (
    <PinWrap id="s05" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section" id="s05">
        <SectionMediaLayers cfg={cfg} progress={progress} />
        <div className="section-inner">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} />
          <div className="s05-portals">
            {PORTALS.map((p) => (
              <div key={p.n} className="portal-mono glass-card">
                <span className="portal-num">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="s05-qr glass-card">QR WhatsApp</div>
          <MagneticButton href="#s19">{cfg.ctaPrimary}</MagneticButton>
        </div>
      </div>
    </PinWrap>
  );
}
