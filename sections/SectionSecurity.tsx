"use client";

import { getSection } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { gsap } from "@/lib/gsap/register";

const cfg = getSection("S16");

const BADGES = ["LGPD", "Criptografia AES-256", "Backup diário", "SSO", "Auditoria", "SLA 99.9%"];

export function SectionSecurity() {
  const rootRef = useGsapContext(() => {
    const shield = document.querySelector(".shield-path");
    if (shield) {
      const len = (shield as SVGPathElement).getTotalLength?.() ?? 400;
      gsap.fromTo(
        shield,
        { strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          scrollTrigger: { trigger: "#s16", start: "top 70%", end: "top 30%", scrub: 1 },
        }
      );
    }
  }, []);

  return (
    <PinWrap id="s16" pinVh={cfg.pinVh}>
      <div ref={rootRef} className="section-flow" id="s16">
        <SectionMediaLayers cfg={cfg} progress={0} />
        <div className="section-inner text-center">
          <SectionHeadline eyebrow={cfg.eyebrow} headline={cfg.headline} headlineEm={cfg.headlineEm} subheadline={cfg.subheadline} align="center" />
          <svg className="shield-svg" viewBox="0 0 120 140" aria-hidden>
            <path
              className="shield-path"
              d="M60,10 L100,30 V70 C100,100 60,130 60,130 C60,130 20,100 20,70 V30 Z"
              fill="none"
              stroke="#2EE8C0"
              strokeWidth="2"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
          </svg>
          <div className="security-badges">
            {BADGES.map((b) => (
              <span key={b} className="badge glass-card">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </PinWrap>
  );
}
