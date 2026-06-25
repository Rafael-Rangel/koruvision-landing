/** Mockups reais do produto KORUVISION — sempre em moldura Mac na UI */

export const MOCKUP_BASE = "/assets/mockups";

export const PRODUCT_MOCKUPS = {
  metrics: `${MOCKUP_BASE}/koru-mockup-metrics.png`,
  inbox: `${MOCKUP_BASE}/koru-mockup-inbox.png`,
  automation: `${MOCKUP_BASE}/koru-mockup-automation.png`,
} as const;

export type ProductMockupKey = keyof typeof PRODUCT_MOCKUPS;

export const MOCKUP_TITLES: Record<ProductMockupKey, string> = {
  metrics: "KoruVision — Métricas",
  inbox: "KoruVision — Conversas",
  automation: "KoruVision — Automações",
};
