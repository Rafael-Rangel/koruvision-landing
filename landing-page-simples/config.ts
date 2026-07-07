import { nv11Image, NV11_IMAGES } from "@/config/nv11-assets";
import { CRM_URLS } from "@/lib/crm-url";
import {
  HERO_CFG,
  PROBLEM_CFG,
  PILLARS_CFG,
  DEMO_CFG,
  SETUP_CFG,
  AGENTS_CFG,
  INBOX_CFG,
  PROOF_CFG,
  PLANS_CFG,
  PILLARS,
  SETUP_STEPS,
  CASES,
  SOCIAL_STATS,
  TESTIMONIALS,
  PLANS,
  FAQ,
} from "@/config/landing-v10";

export const LPS = {
  brand: "KORUVISION",
  tagline: "CRM + IA · WhatsApp",
  ctaPrimary: "Começar grátis — 14 dias",
  ctaSecondary: "Ver planos",
  ctaHref: CRM_URLS.signup,
  demoHref: "#lps-demo",
  signupHref: CRM_URLS.signup,
  loginHref: CRM_URLS.login,
  interesseHref: CRM_URLS.interesse,
} as const;

export const LPS_HERO = {
  eyebrow: HERO_CFG.eyebrow ?? LPS.tagline,
  headline: HERO_CFG.headline ?? "O CRM que vê cada lead e fecha por você.",
  subheadline: HERO_CFG.subheadline ?? "",
  image: nv11Image(NV11_IMAGES.heroAurora),
  accent: nv11Image(NV11_IMAGES.owlPoster),
};

export const LPS_PROBLEM_COPY = {
  ...PROBLEM_CFG,
  subheadline: "",
  headlineBreakBeforeEm: true,
  points: undefined,
  ctaPrimary: undefined,
  ctaSecondary: undefined,
};

export const LPS_PROBLEM = {
  ...LPS_PROBLEM_COPY,
  image: nv11Image(NV11_IMAGES.problemChaos),
};

export const LPS_PILLARS = {
  ...PILLARS_CFG,
  items: PILLARS,
  image: nv11Image(NV11_IMAGES.pillars),
};

export const LPS_FEATURES = [
  {
    ...DEMO_CFG,
    slug: "demo",
    image: nv11Image(NV11_IMAGES.demoMachine),
  },
  {
    ...SETUP_CFG,
    slug: "setup",
    image: nv11Image(NV11_IMAGES.setupPortals),
    steps: SETUP_STEPS,
  },
  {
    ...AGENTS_CFG,
    slug: "agents",
    image: nv11Image(NV11_IMAGES.neuralField),
  },
  {
    ...INBOX_CFG,
    slug: "inbox",
    image: nv11Image(NV11_IMAGES.inboxCommand),
  },
] as const;

export const LPS_PROOF = {
  ...PROOF_CFG,
  stats: SOCIAL_STATS,
  cases: CASES,
  testimonials: TESTIMONIALS,
  image: nv11Image(NV11_IMAGES.casesVerticals),
};

export const LPS_PLANS = {
  ...PLANS_CFG,
  plans: PLANS,
  image: nv11Image(NV11_IMAGES.plansConvergence),
};

export const LPS_CTA = {
  headline: "Suas conversas viram receita previsível.",
  subheadline: "14 dias grátis. Sem cartão. Setup em 5 minutos.",
  image: nv11Image(NV11_IMAGES.ctaConvergence),
};

export const LPS_FAQ = FAQ;
