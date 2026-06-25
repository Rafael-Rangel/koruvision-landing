/** Config de preview v6 — S01 Hero + S04 Demo */
import type { SectionConfig } from "./sections";
import { getSection } from "./sections";

const NV6 = "/assets/nv6";

export const TEST_S01: SectionConfig = {
  ...getSection("S01"),
  pinVh: 200,
  pinMobileVh: 160,
  images: [
    "hero-studio-gradient-left.webp",
    "hero-device-glow-niche.webp",
  ],
  videos: [],
  f2f: [],
  mediaIntensity: "medium",
  assetBase: NV6,
};

export const TEST_S04: SectionConfig = {
  ...getSection("S04"),
  pinVh: 480,
  pinMobileVh: 360,
  scrub: 2.4,
  images: [
    "demo-studio-backdrop-soft.webp",
    "demo-messaging-atmosphere.webp",
  ],
  videos: [],
  f2f: [],
  mediaIntensity: "medium",
  assetBase: NV6,
};
