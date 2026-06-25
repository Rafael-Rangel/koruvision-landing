/** Preview v7 — Hero coreografado + ponte A Visão + Demo */
import type { SectionConfig } from "./sections";
import { getSection } from "./sections";

const NV7 = "/assets/nv7";

export const TEST_V7_S01: SectionConfig = {
  ...getSection("S01"),
  eyebrow: "KORUVISION",
  headline: "Inteligência que vê. Automação que move.",
  subheadline:
    "CRM com IA para WhatsApp — qualifique leads, feche deals e veja tudo num painel que pensa com você.",
  pinVh: 400,
  pinMobileVh: 300,
  scrub: 0.5,
  images: [
    "nv7-img-hero-gradient-left.webp",
    "nv7-img-hero-energy-rim.webp",
    "nv7-img-owl-poster.webp",
  ],
  videos: [],
  f2f: [],
  mediaIntensity: "low",
  assetBase: NV7,
  heroLayout: "owl",
  heroVideo: "nv7-vid-001-owl-hero.mp4",
};

export const TEST_V7_S02: SectionConfig = {
  ...getSection("S02"),
  pinVh: 320,
  pinMobileVh: 240,
  scrub: 0.55,
  images: [
    "nv7-img-hero-gradient-left.webp",
    "nv7-img-hero-energy-rim.webp",
    "nv7-img-owl-poster.webp",
  ],
  videos: [],
  f2f: [],
  mediaIntensity: "low",
  assetBase: NV7,
  heroVideo: "nv7-vid-001-owl-hero.mp4",
};

export const TEST_V7_S04: SectionConfig = {
  ...getSection("S04"),
  pinVh: 480,
  pinMobileVh: 360,
  scrub: 0.8,
  images: ["nv7-img-demo-studio.webp", "nv7-img-demo-ops-glow.webp"],
  videos: ["nv7-vid-002-demo-ambient.mp4"],
  f2f: [],
  mediaIntensity: "medium",
  assetBase: NV7,
};
