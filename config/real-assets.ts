/**
 * Slots para material real do produto (Fase 3).
 * Preencha `src` quando tiver screenshots, vídeos ou logos aprovados.
 */
export type RealAssetKind = "image" | "video";

export type RealAssetSlot =
  | "demo.whatsapp"
  | "demo.ia"
  | "demo.kanban"
  | "demo.calendar"
  | "demo.dashboard"
  | "agents.inbox"
  | "agents.automation"
  | "proof.case-saude"
  | "proof.case-imoveis"
  | "proof.case-consultoria"
  | "proof.testimonial-video";

export interface RealAssetEntry {
  src: string | null;
  kind: RealAssetKind;
  alt: string;
}

/** Preencher paths em `/public/assets/real/...` quando disponíveis. */
export const REAL_ASSETS: Record<RealAssetSlot, RealAssetEntry> = {
  "demo.whatsapp": { src: null, kind: "image", alt: "Inbox WhatsApp KORUVISION" },
  "demo.ia": { src: null, kind: "image", alt: "Agente IA qualificando lead" },
  "demo.kanban": { src: null, kind: "image", alt: "Pipeline Kanban" },
  "demo.calendar": { src: null, kind: "image", alt: "Agenda integrada" },
  "demo.dashboard": { src: null, kind: "image", alt: "Dashboard executivo" },
  "agents.inbox": { src: null, kind: "image", alt: "Inbox com handoff humano" },
  "agents.automation": { src: null, kind: "image", alt: "Automação de agentes IA" },
  "proof.case-saude": { src: null, kind: "image", alt: "Logo cliente saúde" },
  "proof.case-imoveis": { src: null, kind: "image", alt: "Logo cliente imóveis" },
  "proof.case-consultoria": { src: null, kind: "image", alt: "Logo cliente consultoria" },
  "proof.testimonial-video": { src: null, kind: "video", alt: "Depoimento em vídeo" },
};

export function hasRealAsset(slot: RealAssetSlot): boolean {
  return Boolean(REAL_ASSETS[slot]?.src);
}

export function getRealAsset(slot: RealAssetSlot): RealAssetEntry | null {
  const entry = REAL_ASSETS[slot];
  return entry?.src ? entry : null;
}

/** Métricas auditáveis — substituem SOCIAL_STATS quando preenchidas. */
export const REAL_PROOF_METRICS: Partial<Record<string, string>> = {};

export function resolveProofMetric(label: string, fallback: string): string {
  return REAL_PROOF_METRICS[label] ?? fallback;
}
