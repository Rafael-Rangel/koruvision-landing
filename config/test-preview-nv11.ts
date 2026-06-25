/** Preview NV11 — landing definitiva */
import type { SectionConfig } from "./sections";
import { TEST_V8_S01, TEST_V8_S02, TEST_V8_S04 } from "./test-preview-v8";
import { PREMIUM_SCRUB } from "@/lib/lenis-scroll";
import { NV11_BASE, NV11_IMAGES, NV11_LOOPS } from "./nv11-assets";

export const NV11_S01: SectionConfig = {
  ...TEST_V8_S01,
  assetBase: NV11_BASE,
  heroLayout: "owl",
  experienceMode: "premium",
  pinVh: 220,
  pinMobileVh: 180,
  scrub: PREMIUM_SCRUB.hero,
  heroBgVideo: NV11_LOOPS.heroEnergy,
  heroVideo: NV11_LOOPS.owlBreath,
  images: [NV11_IMAGES.heroAurora, NV11_IMAGES.heroAurora, NV11_IMAGES.owlPoster],
  videos: [NV11_LOOPS.heroEnergy, NV11_LOOPS.owlBreath],
  f2f: ["NV11-F2F-000"],
};

export const NV11_S02: SectionConfig = {
  ...TEST_V8_S02,
  assetBase: NV11_BASE,
  scrub: PREMIUM_SCRUB.bridge,
  pinVh: 160,
  pinMobileVh: 130,
  f2f: ["NV11-F2F-001"],
  images: [NV11_IMAGES.owlPoster, NV11_IMAGES.heroAurora, NV11_IMAGES.owlPoster],
  heroVideo: NV11_LOOPS.owlBreath,
};

export const NV11_S04: SectionConfig = {
  ...TEST_V8_S04,
  assetBase: NV11_BASE,
  scrub: PREMIUM_SCRUB.demo,
  pinVh: 280,
  pinMobileVh: 200,
  images: [NV11_IMAGES.demoMachine, NV11_IMAGES.analyticsHolo],
  videos: [NV11_LOOPS.demoCorridor],
  f2f: ["NV11-F2F-002"],
};

export const NV11_CTA: SectionConfig = {
  ...TEST_V8_S01,
  id: "S19",
  pinVh: 170,
  pinMobileVh: 140,
  scrub: PREMIUM_SCRUB.cta,
  assetBase: NV11_BASE,
  images: [NV11_IMAGES.ctaConvergence],
  videos: [NV11_LOOPS.goldRivers],
  f2f: ["NV11-F2F-004"],
};
