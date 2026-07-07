"use client";

import { useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { ScrollTrigger } from "@/lib/gsap/register";
import { SectionHero } from "@/sections/SectionHero";
import { OwlChaosFlow } from "@/sections/OwlChaosFlow";
import { ExperienceShell } from "@/components/providers/ExperienceShell";
import { warmLandingAssets } from "@/lib/landing-preload";
import { HERO_CFG } from "@/config/landing-v10";
import { LpsPillars } from "./components/LpsPillars";
import { LpsSplitSection } from "./components/LpsSplitSection";
import { LpsProof } from "./components/LpsProof";
import { LpsPlans } from "./components/LpsPlans";
import { LpsCta } from "./components/LpsCta";
import { LpsFaq } from "./components/LpsFaq";
import { useLpsReveal } from "./hooks/useLpsReveal";
import { LPS_FEATURES, LPS_PROBLEM_COPY } from "./config";
import "./styles.css";

function MorphBridge() {
  return <div className="section-morph-bridge" aria-hidden />;
}

function Continuity({
  hue,
  children,
  morph = true,
}: {
  hue: number;
  children: React.ReactNode;
  morph?: boolean;
}) {
  return (
    <>
      {morph ? <MorphBridge /> : null}
      <div
        className={`section-continuity${morph ? " section-continuity-morph" : " section-continuity--flush"}`}
        style={{ "--continuity-hue": String(hue) } as CSSProperties}
      >
        {children}
      </div>
    </>
  );
}

export function SimpleLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  useLpsReveal(rootRef);

  useEffect(() => {
    warmLandingAssets();
    document.body.classList.add("lps-active");
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      document.body.classList.remove("lps-active");
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <ExperienceShell showSpine={false}>
      <SectionHero cfg={HERO_CFG} />
      <Continuity hue={265} morph={false}>
        <OwlChaosFlow
          scrubMode="frames"
          problemCopy={LPS_PROBLEM_COPY}
          unifiedCard
        />
      </Continuity>

      <div className="lps" ref={rootRef}>
        <LpsPillars />
        {LPS_FEATURES.map((feat, i) => (
          <LpsSplitSection
            key={feat.slug}
            id={feat.slug === "demo" ? "lps-demo" : `lps-${feat.slug}`}
            eyebrow={feat.eyebrow}
            headline={feat.headline}
            headlineEm={feat.headlineEm}
            subheadline={feat.subheadline}
            image={feat.image}
            reverse={i % 2 === 1}
            points={"points" in feat ? [...(feat.points ?? [])] : undefined}
          />
        ))}
        <LpsProof />
        <LpsPlans />
        <LpsCta />
        <LpsFaq />
        <footer className="lps-footer">
          © {new Date().getFullYear()} KORUVISION · Landing simples
        </footer>
      </div>
    </ExperienceShell>
  );
}
