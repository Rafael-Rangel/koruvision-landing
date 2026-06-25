"use client";

import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import { SectionHero } from "@/sections/SectionHero";
import { ExperienceShell } from "@/components/providers/ExperienceShell";
import { LogoIntroSequence } from "@/components/intro/LogoIntroSequence";
import {
  HERO_CFG,
  OWL_CFG,
  DEMO_CFG,
  CTA_CFG,
} from "@/config/landing-v10";
import {
  SceneProblem,
  ScenePillars,
  SceneSetup,
  SceneAgents,
  SceneInbox,
  SceneFunnel,
  SceneAutomation,
  SceneAnalytics,
  SceneBenefits,
  SceneBeforeAfter,
  SceneCases,
  SceneSocial,
  SceneIntegrations,
  SceneAgency,
  ScenePlans,
} from "@/sections/v10/scenes";

const SectionVisionBridge = dynamic(
  () => import("@/sections/SectionVisionBridge").then((m) => m.SectionVisionBridge),
  { ssr: false }
);
const SectionDemo = dynamic(() => import("@/sections/SectionDemo").then((m) => m.SectionDemo), {
  ssr: false,
});
const SectionEcosystemCta = dynamic(
  () => import("@/sections/SectionEcosystemCta").then((m) => m.SectionEcosystemCta),
  { ssr: false }
);

function MorphBridge() {
  return <div className="section-morph-bridge" aria-hidden />;
}

function Continuity({ hue, children }: { hue: number; children: React.ReactNode }) {
  return (
    <>
      <MorphBridge />
      <div
        className="section-continuity section-continuity-morph"
        style={{ "--continuity-hue": String(hue) } as CSSProperties}
      >
        {children}
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <LogoIntroSequence>
      <ExperienceShell>
        <SectionHero cfg={HERO_CFG} />
        <Continuity hue={265}><SectionVisionBridge cfg={OWL_CFG} /></Continuity>
        <Continuity hue={8}><SceneProblem /></Continuity>

        <Continuity hue={200}><ScenePillars /></Continuity>
        <Continuity hue={220}><SectionDemo cfg={DEMO_CFG} /></Continuity>
        <Continuity hue={175}><SceneSetup /></Continuity>

        <Continuity hue={265}><SceneAgents /></Continuity>
        <Continuity hue={150}><SceneInbox /></Continuity>
        <Continuity hue={42}><SceneFunnel /></Continuity>
        <Continuity hue={210}><SceneAutomation /></Continuity>
        <Continuity hue={285}><SceneAnalytics /></Continuity>

        <Continuity hue={230}><SceneBenefits /></Continuity>
        <Continuity hue={190}><SceneBeforeAfter /></Continuity>
        <Continuity hue={160}><SceneCases /></Continuity>
        <Continuity hue={48}><SceneSocial /></Continuity>
        <Continuity hue={205}><SceneIntegrations /></Continuity>

        <Continuity hue={270}><SceneAgency /></Continuity>
        <Continuity hue={250}><ScenePlans /></Continuity>
        <Continuity hue={250}><SectionEcosystemCta cfg={CTA_CFG} /></Continuity>
      </ExperienceShell>
    </LogoIntroSequence>
  );
}
