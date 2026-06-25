"use client";

import Link from "next/link";
import { SectionHero } from "@/sections/SectionHero";
import { SectionVisionBridge } from "@/sections/SectionVisionBridge";
import { SectionDemo } from "@/sections/SectionDemo";
import { ExperienceShell } from "@/components/providers/ExperienceShell";
import {
  TEST_V8_S01,
  TEST_V8_S02,
  TEST_V8_S04,
  TEST_V8_ASSET_FALLBACK,
} from "@/config/test-preview-v8";

const s01 = { ...TEST_V8_S01, assetBase: "/assets/nv8" };
const s02 = { ...TEST_V8_S02, assetBase: "/assets/nv8" };
const s04 = { ...TEST_V8_S04, assetBase: "/assets/nv8" };

export default function TestV8PreviewPage() {
  return (
    <ExperienceShell>
      <div className="test-preview-badge">
        <strong>Preview v8</strong> · Lenis + motion contínuo + Hero orbit
        <br />
        <Link href="/test/v9" style={{ color: "#FFC233" }}>v9 jornada</Link>
        {" · "}
        <Link href="/test/v7">v7</Link>
        {" · "}
        <Link href="/test">v6</Link>
        {" · "}
        <Link href="/">Site</Link>
      </div>
      <SectionHero cfg={s01} />
      <div className="section-continuity section-continuity-morph">
        <SectionVisionBridge cfg={s02} />
      </div>
      <div className="section-continuity section-continuity-morph" style={{ "--continuity-hue": "220" } as React.CSSProperties}>
        <SectionDemo cfg={s04} />
      </div>
    </ExperienceShell>
  );
}
