"use client";

import dynamic from "next/dynamic";
import { SectionHero } from "@/sections/SectionHero";
import { ExperienceShell } from "@/components/providers/ExperienceShell";
import { DeferredMount } from "@/components/performance/DeferredMount";
import {
  TEST_V9_S01,
  TEST_V9_S02,
  TEST_V9_S04,
  TEST_V9_INTEL,
  TEST_V9_CTA,
} from "@/config/test-preview-v9";

const SectionVisionBridge = dynamic(() => import("@/sections/SectionVisionBridge").then((m) => m.SectionVisionBridge), {
  ssr: false,
});
const SectionDemo = dynamic(() => import("@/sections/SectionDemo").then((m) => m.SectionDemo), {
  ssr: false,
});
const SectionIntelligence = dynamic(() => import("@/sections/SectionIntelligence").then((m) => m.SectionIntelligence), {
  ssr: false,
});
const SectionEcosystemCta = dynamic(() => import("@/sections/SectionEcosystemCta").then((m) => m.SectionEcosystemCta), {
  ssr: false,
});

function MorphBridge() {
  return <div className="section-morph-bridge" aria-hidden />;
}

export default function TestV9PreviewPage() {
  return (
    <ExperienceShell>
      <SectionHero cfg={TEST_V9_S01} />
      <MorphBridge />
      <div className="section-continuity section-continuity-morph">
        <DeferredMount reserveVh={220} rootMargin="1400px 0px">
          <SectionVisionBridge cfg={TEST_V9_S02} />
        </DeferredMount>
      </div>
      <MorphBridge />
      <div
        className="section-continuity section-continuity-morph"
        style={{ "--continuity-hue": "220" } as React.CSSProperties}
      >
        <DeferredMount reserveVh={320} rootMargin="1500px 0px">
          <SectionDemo cfg={TEST_V9_S04} />
        </DeferredMount>
      </div>
      <MorphBridge />
      <div
        className="section-continuity section-continuity-morph"
        style={{ "--continuity-hue": "265" } as React.CSSProperties}
      >
        <DeferredMount reserveVh={320} rootMargin="1500px 0px">
          <SectionIntelligence cfg={TEST_V9_INTEL} />
        </DeferredMount>
      </div>
      <MorphBridge />
      <div className="section-continuity section-continuity-morph">
        <DeferredMount reserveVh={240} rootMargin="1300px 0px">
          <SectionEcosystemCta cfg={TEST_V9_CTA} />
        </DeferredMount>
      </div>
    </ExperienceShell>
  );
}
