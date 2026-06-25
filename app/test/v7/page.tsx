"use client";

import Link from "next/link";
import { SectionHero } from "@/sections/SectionHero";
import { SectionVisionBridge } from "@/sections/SectionVisionBridge";
import { SectionDemo } from "@/sections/SectionDemo";
import { ExperienceShell } from "@/components/providers/ExperienceShell";
import { TEST_V7_S01, TEST_V7_S02, TEST_V7_S04 } from "@/config/test-preview-v7";

export default function TestV7PreviewPage() {
  return (
    <ExperienceShell>
      <div className="test-preview-badge">
        <strong>Preview v7.1</strong> · Lenis + scroll fluido
        <br />
        <Link href="/test/v8">v8 premium</Link>
        {" · "}
        <Link href="/test">v6</Link>
      </div>
      <SectionHero cfg={TEST_V7_S01} />
      <div className="section-continuity section-continuity-morph">
        <SectionVisionBridge cfg={TEST_V7_S02} />
      </div>
      <div className="section-continuity section-continuity-morph">
        <SectionDemo cfg={TEST_V7_S04} />
      </div>
    </ExperienceShell>
  );
}
