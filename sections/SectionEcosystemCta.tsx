"use client";

import { useRef, useState } from "react";
import { PinWrap } from "@/components/sections/SectionShell";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { OwlSigil } from "@/components/motion/OwlSigil";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ProceduralOwlScene } from "@/components/motion/ProceduralOwlScene";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { MacMetricsMockup } from "@/components/product/MacWindowMockup";
import { gsap } from "@/lib/gsap/register";
import { smoothrange } from "@/lib/motion-system";
import type { SectionConfig } from "@/config/sections";
import { CRM_URLS } from "@/lib/crm-url";

export function SectionEcosystemCta({ cfg }: { cfg: SectionConfig }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const base = cfg.assetBase ?? "/assets/nv9";

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh ?? 280,
      scrub: cfg.scrub ?? 0.55,
      smoothDuration: 0.18,
      onUpdate: (p) => {
        setProgress(p);
        const copy = pinRef.current?.querySelector(".s-cta-copy");
        if (copy) {
          gsap.set(copy, { opacity: smoothrange(p, 0.15, 0.45), y: 24 * (1 - smoothrange(p, 0.15, 0.45)) });
        }
      },
    },
    []
  );

  return (
    <PinWrap id="s-cta-eco" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section s-eco-cta" id="s-cta-eco">
        <SectionMediaLayers cfg={cfg} progress={progress} variant="cta" f2fBlend="screen" />
        <div className="readability-scrim readability-scrim--cta" aria-hidden />
        <div className="s-eco-cta-owl" style={{ opacity: 0.35 + progress * 0.45 }}>
          <ProceduralOwlScene intensity={0.9 + progress * 0.1} />
        </div>
        <OwlSigil variant="watch" assetBase={base} size="lg" className="owl-sigil--cta" />

        <div className="section-inner s-eco-cta-inner">
          <div className="s-cta-copy readability-panel">
            <div className="eyebrow">KORUVISION</div>
            <h2 className="section-headline">
              Seu atendimento já gera oportunidades.
              <br />
              <em>Coloque o CRM para vender com IA.</em>
            </h2>
            <p className="section-lede">
              Centralize leads, automatize respostas, acompanhe o funil e veja o resultado em um dashboard claro.
            </p>
            <div className="cta-row">
              <MagneticButton href={CRM_URLS.signup}>{cfg.ctaPrimary ?? "Agendar demonstração"}</MagneticButton>
              <MagneticButton href="#s04" variant="ghost">Explorar plataforma</MagneticButton>
            </div>
          </div>
          <div className="s-cta-product" aria-label="Resumo visual do CRM">
            <MacMetricsMockup tilt className="s-cta-mac-mockup" />
          </div>
        </div>
      </div>
    </PinWrap>
  );
}
