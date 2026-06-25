"use client";

import type { ReactNode } from "react";
import { SceneScaffold } from "@/components/sections/SceneScaffold";
import { SceneCinemaSection } from "@/components/cinema/SceneCinemaSection";
import { FrameScrubber } from "@/components/motion/FrameScrubber";
import {
  AgentsVisual,
  InboxVisual,
  AnalyticsVisual,
  AutomationVisual,
  BenefitsVisual,
  SocialVisual,
  IntegrationsVisual,
  AgencyVisual,
  PlansVisual,
  SetupVisual,
} from "@/components/scenes/SceneWidgets";
import {
  OperationalFogField,
  FourPillars3D,
  OnboardingPortals3D,
  NeuralBrainHub3D,
  SalesPipeline3D,
  AutomationSynapse3D,
  BenefitsConstellation3D,
  BeforeAfterSplit3D,
  VerticalTotems3D,
  IntegrationNexus3D,
  AgencyPortal3D,
  PricingMonoliths3D,
} from "@/components/3d/nv11/protagonists";
import { NV11_SCENE_ASSETS } from "@/config/nv11-assets";
import {
  PROBLEM_CFG,
  PILLARS_CFG,
  SETUP_CFG,
  AGENTS_CFG,
  INBOX_CFG,
  FUNNEL_CFG,
  AUTOMATION_CFG,
  ANALYTICS_CFG,
  BENEFITS_CFG,
  BEFORE_AFTER_CFG,
  CASES_CFG,
  SOCIAL_CFG,
  INTEGRATIONS_CFG,
  AGENCY_CFG,
  PLANS_CFG,
} from "@/config/landing-v10";

function PinnedScene({
  sceneKey,
  copy,
  layout = "split",
  visualFirst = false,
  protagonist,
  extra,
}: {
  sceneKey: keyof typeof NV11_SCENE_ASSETS;
  copy: typeof PROBLEM_CFG;
  layout?: "split" | "stack" | "center";
  visualFirst?: boolean;
  protagonist: (ctx: { progress: number }) => React.ReactNode;
  extra?: React.ReactNode;
}) {
  const scene = NV11_SCENE_ASSETS[sceneKey];
  return (
    <SceneCinemaSection scene={scene} hue={copy.hue} className={`scene--nv11 scene--${copy.id}`}>
      {({ progress }) => (
        <div className="scene-pinned-grid">
          <SceneScaffold copy={copy} layout={layout} visualFirst={visualFirst} className="scene-scaffold--overlay">
            {protagonist({ progress })}
          </SceneScaffold>
          {extra}
        </div>
      )}
    </SceneCinemaSection>
  );
}

export function SceneProblem() {
  return (
    <PinnedScene
      sceneKey="C03"
      copy={PROBLEM_CFG}
      layout="split"
      protagonist={({ progress }) => <OperationalFogField progress={progress} />}
    />
  );
}

export function ScenePillars() {
  return (
    <PinnedScene sceneKey="C04" copy={PILLARS_CFG} layout="split" visualFirst protagonist={({ progress }) => <FourPillars3D progress={progress} />} />
  );
}

export function SceneSetup() {
  return (
    <PinnedScene sceneKey="C06" copy={SETUP_CFG} protagonist={({ progress }) => <OnboardingPortals3D progress={progress} />} extra={<SetupVisual />} />
  );
}

export function SceneAgents() {
  return (
    <PinnedScene sceneKey="C07" copy={AGENTS_CFG} layout="split" visualFirst protagonist={({ progress }) => <NeuralBrainHub3D progress={progress} />} extra={<AgentsVisual />} />
  );
}

export function SceneInbox() {
  return (
    <PinnedScene sceneKey="C08" copy={INBOX_CFG} protagonist={() => <InboxVisual />} />
  );
}

export function SceneFunnel() {
  return (
    <PinnedScene sceneKey="C09" copy={FUNNEL_CFG} layout="split" visualFirst protagonist={({ progress }) => <SalesPipeline3D progress={progress} />} />
  );
}

export function SceneAutomation() {
  return (
    <PinnedScene sceneKey="C10" copy={AUTOMATION_CFG} protagonist={({ progress }) => <AutomationSynapse3D progress={progress} />} extra={<AutomationVisual />} />
  );
}

export function SceneAnalytics() {
  const scene = NV11_SCENE_ASSETS.C11;
  return (
    <SceneCinemaSection scene={scene} hue={ANALYTICS_CFG.hue} className="scene--nv11 scene--analytics">
      {({ progress }) => (
        <div className="scene-pinned-grid">
          <SceneScaffold copy={ANALYTICS_CFG} layout="split" visualFirst className="scene-scaffold--overlay">
            <AnalyticsVisual />
          </SceneScaffold>
          {scene.f2f && (
            <FrameScrubber sequenceId={scene.f2f} progress={progress} className="scene-analytics-f2f" blendMode="screen" />
          )}
        </div>
      )}
    </SceneCinemaSection>
  );
}

export function SceneBenefits() {
  return (
    <PinnedScene sceneKey="C12" copy={BENEFITS_CFG} protagonist={({ progress }) => <BenefitsConstellation3D progress={progress} />} extra={<BenefitsVisual />} />
  );
}

export function SceneBeforeAfter() {
  return (
    <PinnedScene sceneKey="C13" copy={BEFORE_AFTER_CFG} layout="center" protagonist={({ progress }) => <BeforeAfterSplit3D progress={progress} />} />
  );
}

export function SceneCases() {
  return (
    <PinnedScene sceneKey="C14" copy={CASES_CFG} layout="split" visualFirst protagonist={({ progress }) => <VerticalTotems3D progress={progress} />} />
  );
}

export function SceneSocial() {
  return (
    <PinnedScene sceneKey="C15" copy={SOCIAL_CFG} layout="center" protagonist={() => <SocialVisual />} />
  );
}

export function SceneIntegrations() {
  return (
    <PinnedScene sceneKey="C16" copy={INTEGRATIONS_CFG} layout="split" visualFirst protagonist={({ progress }) => <IntegrationNexus3D progress={progress} />} extra={<IntegrationsVisual />} />
  );
}

export function SceneAgency() {
  return (
    <PinnedScene sceneKey="C17" copy={AGENCY_CFG} protagonist={({ progress }) => <AgencyPortal3D progress={progress} />} extra={<AgencyVisual />} />
  );
}

export function ScenePlans() {
  return (
    <PinnedScene sceneKey="C18" copy={PLANS_CFG} layout="center" protagonist={({ progress }) => <PricingMonoliths3D progress={progress} />} extra={<PlansVisual />} />
  );
}
