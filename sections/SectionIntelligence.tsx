"use client";

import { useRef, useState } from "react";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { NeuralFlowCanvas } from "@/components/motion/NeuralFlowCanvas";
import { InteractiveSurface } from "@/components/motion/InteractiveSurface";
import { OwlSigil } from "@/components/motion/OwlSigil";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { DeviceShell, UIDashboard, UIInboxThreeCol, UIWorkflowCanvas } from "@/components/golden/GoldenUI";
import { Product3DFeatureCards } from "@/components/product/Product3DFeatureCards";
import { gsap } from "@/lib/gsap/register";
import { smoothrange } from "@/lib/motion-system";
import type { SectionConfig } from "@/config/sections";

const FLOW_COPY = [
  "Lead entra pelo WhatsApp — capturado instantaneamente.",
  "CRM organiza oportunidades com visão executiva.",
  "IA qualifica intenção e prioriza o que importa.",
  "Automações movem cada etapa sem atrito.",
  "Dashboard revela receita, conversão e previsões.",
  "Integrações conectam todo o ecossistema em tempo real.",
];

const MOCKUPS = [
  { label: "Atendimento", ui: <UIInboxThreeCol /> },
  { label: "Automação", ui: <UIWorkflowCanvas /> },
  { label: "BI Executivo", ui: <UIDashboard /> },
];

export function SectionIntelligence({ cfg }: { cfg: SectionConfig }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const idx = Math.min(FLOW_COPY.length - 1, Math.floor(progress * FLOW_COPY.length));

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh ?? 380,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub ?? 0.62,
      smoothDuration: 0.18,
      onUpdate: (p) => {
        setProgress(p);
        const copy = pinRef.current?.querySelector(".intel-copy-line");
        if (copy) {
          gsap.set(copy, {
            opacity: smoothrange(p % (1 / FLOW_COPY.length) * FLOW_COPY.length, 0.05, 0.35),
            y: 12 * (1 - smoothrange(p % (1 / FLOW_COPY.length) * FLOW_COPY.length, 0.05, 0.35)),
          });
        }
      },
    },
    []
  );

  const base = cfg.assetBase ?? "/assets/nv9";

  return (
    <PinWrap id="s-intel" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section s-intel-section" id="s-intel">
        <div className="readability-scrim readability-scrim--intel" aria-hidden />
        <OwlSigil variant="connect" assetBase={base} size="md" className="owl-sigil--intel" />

        <div className="section-inner s-intel-grid">
          <div className="s-intel-copy readability-panel">
            <SectionHeadline
              eyebrow={cfg.eyebrow}
              headline={cfg.headline}
              headlineEm={cfg.headlineEm}
              subheadline={cfg.subheadline}
            />
            <p className="intel-copy-line">{FLOW_COPY[idx]}</p>
            <div className="intel-tags">
              {["CRM", "IA", "Automação", "Integrações"].map((t) => (
                <span key={t} className="intel-tag" data-ambient-glow>{t}</span>
              ))}
            </div>
            <Product3DFeatureCards />
            <MagneticButton href="#s04">Ver demonstração</MagneticButton>
          </div>

          <div className="s-intel-visual">
            <NeuralFlowCanvas progress={progress} className="s-intel-neural" />
            <div className="s-intel-mockups">
              {MOCKUPS.map((m, i) => (
                <InteractiveSurface key={m.label} className={`s-intel-mock s-intel-mock--${i}`} intensity={0.9}>
                  <DeviceShell>{m.ui}</DeviceShell>
                  <span className="s-intel-mock-label">{m.label}</span>
                </InteractiveSurface>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PinWrap>
  );
}
