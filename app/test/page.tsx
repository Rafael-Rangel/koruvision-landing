"use client";

import Link from "next/link";
import { SectionHero } from "@/sections/SectionHero";
import { SectionDemo } from "@/sections/SectionDemo";
import { TEST_S01, TEST_S04 } from "@/config/test-preview";

export default function TestPreviewPage() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 72,
          right: 16,
          zIndex: 300,
          padding: "10px 14px",
          borderRadius: 10,
          background: "rgba(18,24,42,0.92)",
          border: "1px solid rgba(59,130,246,0.4)",
          fontSize: "0.8rem",
          color: "#8B9EC4",
          backdropFilter: "blur(8px)",
        }}
      >
        <strong style={{ color: "#3B82F6" }}>Preview v6</strong> · S01 Hero + S04 Demo
        <br />
        Assets: <code>/assets/nv6</code> ·{" "}
        <Link href="/test/v8" style={{ color: "#8B5CF6" }}>v8 premium</Link>
        {" · "}
        <Link href="/test/v7" style={{ color: "#a78bfa" }}>v7</Link>
        {" · "}
        <Link href="/" style={{ color: "#2EE8C0" }}>Site</Link>
      </div>
      <SectionHero cfg={TEST_S01} />
      <SectionDemo cfg={TEST_S04} />
    </>
  );
}
