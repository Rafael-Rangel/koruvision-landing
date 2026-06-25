/** Preview v9 — jornada KORUVISION completa */
import type { SectionConfig } from "./sections";
import { TEST_V8_S01, TEST_V8_S02, TEST_V8_S04 } from "./test-preview-v8";
import { PREMIUM_SCRUB } from "@/lib/lenis-scroll";

const NV9 = "/assets/nv9";

export const TEST_V9_S01: SectionConfig = {
  ...TEST_V8_S01,
  eyebrow: "CRM com IA para WhatsApp",
  headline: "Organize leads, automatize atendimento e venda mais.",
  subheadline:
    "A KORUVISION centraliza WhatsApp, CRM, funil, agentes de IA e dashboards para transformar conversas em receita previsível.",
  ctaPrimary: "Ver o CRM em ação",
  ctaSecondary: "Como funciona",
  assetBase: NV9,
  heroBgVideo: "nv9-vid-hero-bg.mp4",
  heroVideo: "nv9-vid-owl-loop.mp4",
  images: [
    "nv9-img-hero-first.webp",
    "nv9-img-hero-energy.webp",
    "nv9-img-owl-hero.webp",
  ],
};

export const TEST_V9_S02: SectionConfig = {
  ...TEST_V8_S02,
  assetBase: NV9,
  scrub: PREMIUM_SCRUB.bridge,
  f2f: ["NV9-F2F-001"],
  images: ["nv9-img-vision-first.webp", "nv9-img-vision-last.webp", "nv9-img-owl-hero.webp"],
  heroVideo: "nv9-vid-owl-loop.mp4",
};

export const TEST_V9_S04: SectionConfig = {
  ...TEST_V8_S04,
  assetBase: NV9,
  scrub: PREMIUM_SCRUB.demo,
  images: ["nv9-img-mock-crm.webp", "nv9-img-mock-dashboard.webp"],
  videos: ["nv9-vid-demo-ambient.mp4"],
};

export const TEST_V9_INTEL: SectionConfig = {
  ...TEST_V8_S04,
  id: "S08",
  eyebrow: "Como o produto funciona",
  headline: "Do WhatsApp ao fechamento,",
  headlineEm: "sem perder nenhum lead.",
  subheadline: "Veja o fluxo: lead entra, IA qualifica, CRM organiza, automação aciona a equipe e o dashboard mede o resultado.",
  pinVh: 380,
  pinMobileVh: 300,
  scrub: PREMIUM_SCRUB.intelligence,
  assetBase: NV9,
  images: ["nv9-img-mock-crm.webp", "nv9-img-mock-wa.webp", "nv9-img-mock-dashboard.webp"],
  videos: [],
  f2f: [],
};

export const TEST_V9_CTA: SectionConfig = {
  ...TEST_V8_S01,
  id: "S19",
  pinVh: 300,
  pinMobileVh: 240,
  scrub: PREMIUM_SCRUB.cta,
  assetBase: NV9,
  ctaPrimary: "Agendar demonstração",
  ctaSecondary: "Explorar plataforma",
};
