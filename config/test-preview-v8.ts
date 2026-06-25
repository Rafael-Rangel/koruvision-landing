/** Preview v8 — scroll premium fluido */
import type { SectionConfig } from "./sections";
import { TEST_V7_S01, TEST_V7_S02, TEST_V7_S04 } from "./test-preview-v7";
import { PREMIUM_SCRUB } from "@/lib/lenis-scroll";

const NV8 = "/assets/nv8";

export const TEST_V8_S01: SectionConfig = {
  ...TEST_V7_S01,
  scrub: PREMIUM_SCRUB.hero,
  assetBase: NV8,
  experienceMode: "premium",
  heroBgVideo: "nv8-vid-hero-bg.mp4",
  images: ["nv8-img-mock-crm.webp", "nv8-img-mock-analytics.webp", "nv8-img-phone-premium.webp"],
};

export const TEST_V8_S02: SectionConfig = {
  ...TEST_V7_S02,
  scrub: PREMIUM_SCRUB.bridge,
  assetBase: NV8,
};

export const TEST_V8_S04: SectionConfig = {
  ...TEST_V7_S04,
  scrub: PREMIUM_SCRUB.demo,
  assetBase: NV8,
  videos: ["nv8-vid-demo-ambient.mp4", "nv7-vid-002-demo-ambient.mp4"],
};

export const TEST_V8_ASSET_FALLBACK = "/assets/nv7";
