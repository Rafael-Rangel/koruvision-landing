/**
 * NV11 — catálogo oficial de assets por cena (fonte: assets/prompts/v11/)
 */
export const NV11_BASE = "/assets/nv11";

export interface Nv11SceneAssets {
  id: string;
  domId: string;
  bg?: string;
  poster?: string;
  loop?: string;
  loopOpacity?: number;
  loop2?: string;
  f2f?: string;
  pinVh?: number;
  pinMobileVh?: number;
  nextHue?: number;
}

export const NV11_IMAGES = {
  heroAurora: "nv11-img-001-hero-aurora.webp",
  owlPoster: "nv11-img-002-owl-poster.webp",
  problemChaos: "nv11-img-003-problem-chaos.webp",
  pillars: "nv11-img-004-pillars.webp",
  demoMachine: "nv11-img-005-demo-machine.webp",
  setupPortals: "nv11-img-006-setup-portals.webp",
  neuralField: "nv11-img-007-neural-field.webp",
  inboxCommand: "nv11-img-008-inbox-command.webp",
  funnelGravity: "nv11-img-009-funnel-gravity.webp",
  automationNerves: "nv11-img-010-automation-nerves.webp",
  analyticsHolo: "nv11-img-011-analytics-holo.webp",
  constellation: "nv11-img-012-constellation.webp",
  beforeChaos: "nv11-img-013a-before-chaos.webp",
  afterOrder: "nv11-img-013b-after-order.webp",
  casesVerticals: "nv11-img-014-cases-verticals.webp",
  socialWarm: "nv11-img-015-social-warm.webp",
  orbitHalo: "nv11-img-016-orbit-halo.webp",
  agencyPortal: "nv11-img-017-agency-portal.webp",
  plansConvergence: "nv11-img-018-plans-convergence.webp",
  ctaConvergence: "nv11-img-019-cta-convergence.webp",
  coreOrb: "nv11-png-001-core-orb.png",
  irisRing: "nv11-png-002-iris-ring.png",
} as const;

export const NV11_LOOPS = {
  heroEnergy: "nv11-vid-loop-001-hero-energy.mp4",
  owlBreath: "nv11-vid-loop-002-owl-breath.mp4",
  chaosDrift: "nv11-vid-loop-003-chaos-drift.mp4",
  pillarsPulse: "nv11-vid-loop-004-pillars-pulse.mp4",
  demoCorridor: "nv11-vid-loop-005-demo-corridor.mp4",
  portalsFlow: "nv11-vid-loop-006-portals-flow.mp4",
  neuralPulse: "nv11-vid-loop-007-neural-pulse.mp4",
  inboxStreams: "nv11-vid-loop-008-inbox-streams.mp4",
  funnelOrbs: "nv11-vid-loop-009-funnel-orbs.mp4",
  synapseBurst: "nv11-vid-loop-010-synapse-burst.mp4",
  chartsBreathe: "nv11-vid-loop-011-charts-breathe.mp4",
  starsPulse: "nv11-vid-loop-012-stars-pulse.mp4",
  splitMist: "nv11-vid-loop-013-split-mist.mp4",
  verticalsPulse: "nv11-vid-loop-014-verticals-pulse.mp4",
  trustGather: "nv11-vid-loop-015-trust-gather.mp4",
  orbitFilaments: "nv11-vid-loop-016-orbit-filaments.mp4",
  portalGrid: "nv11-vid-loop-017-portal-grid.mp4",
  decisionRings: "nv11-vid-loop-018-decision-rings.mp4",
  goldRivers: "nv11-vid-loop-019-gold-rivers.mp4",
} as const;

export const NV11_F2F_VIDEOS = {
  "NV11-F2F-000": "nv11-vid-f2f-000-hero-core.mp4",
  "NV11-F2F-001": "nv11-vid-f2f-001-owl-eyes.mp4",
  "NV11-F2F-002": "nv11-vid-f2f-002-crm-awaken.mp4",
  "NV11-F2F-003": "nv11-vid-f2f-003-data-evolution.mp4",
  "NV11-F2F-004": "nv11-vid-f2f-004-cta-convergence.mp4",
} as const;

/** Configuração por cena — alinhada com Scene-Deep-Specs */
export const NV11_SCENE_ASSETS: Record<string, Nv11SceneAssets> = {
  C01: {
    id: "C01",
    domId: "s01",
    bg: NV11_IMAGES.heroAurora,
    loop: NV11_LOOPS.heroEnergy,
    loop2: NV11_LOOPS.owlBreath,
    loopOpacity: 0.18,
    f2f: "NV11-F2F-000",
    pinVh: 220,
    pinMobileVh: 180,
    nextHue: 265,
  },
  C02: {
    id: "C02",
    domId: "s02-vision",
    bg: NV11_IMAGES.owlPoster,
    poster: NV11_IMAGES.owlPoster,
    f2f: "NV11-F2F-001",
    pinVh: 160,
    pinMobileVh: 130,
    nextHue: 8,
  },
  C03: {
    id: "C03",
    domId: "cena-problema",
    bg: NV11_IMAGES.problemChaos,
    loop: NV11_LOOPS.chaosDrift,
    loopOpacity: 0.26,
    pinVh: 165,
    pinMobileVh: 145,
    nextHue: 200,
  },
  C04: {
    id: "C04",
    domId: "cena-pilares",
    bg: NV11_IMAGES.pillars,
    loop: NV11_LOOPS.pillarsPulse,
    pinVh: 130,
    nextHue: 220,
  },
  C05: {
    id: "C05",
    domId: "s04",
    bg: NV11_IMAGES.demoMachine,
    loop: NV11_LOOPS.demoCorridor,
    f2f: "NV11-F2F-002",
    pinVh: 280,
    pinMobileVh: 200,
    nextHue: 175,
  },
  C06: {
    id: "C06",
    domId: "cena-setup",
    bg: NV11_IMAGES.setupPortals,
    loop: NV11_LOOPS.portalsFlow,
    pinVh: 120,
    nextHue: 265,
  },
  C07: {
    id: "C07",
    domId: "cena-agentes",
    bg: NV11_IMAGES.neuralField,
    loop: NV11_LOOPS.neuralPulse,
    pinVh: 140,
    nextHue: 150,
  },
  C08: {
    id: "C08",
    domId: "cena-inbox",
    bg: NV11_IMAGES.inboxCommand,
    loop: NV11_LOOPS.inboxStreams,
    pinVh: 130,
    nextHue: 42,
  },
  C09: {
    id: "C09",
    domId: "cena-funil",
    bg: NV11_IMAGES.funnelGravity,
    loop: NV11_LOOPS.funnelOrbs,
    pinVh: 150,
    nextHue: 210,
  },
  C10: {
    id: "C10",
    domId: "cena-automacoes",
    bg: NV11_IMAGES.automationNerves,
    loop: NV11_LOOPS.synapseBurst,
    pinVh: 120,
    nextHue: 285,
  },
  C11: {
    id: "C11",
    domId: "cena-analytics",
    bg: NV11_IMAGES.analyticsHolo,
    loop: NV11_LOOPS.chartsBreathe,
    f2f: "NV11-F2F-003",
    pinVh: 170,
    nextHue: 230,
  },
  C12: {
    id: "C12",
    domId: "cena-beneficios",
    bg: NV11_IMAGES.constellation,
    loop: NV11_LOOPS.starsPulse,
    pinVh: 120,
    nextHue: 190,
  },
  C13: {
    id: "C13",
    domId: "cena-antes-depois",
    bg: NV11_IMAGES.beforeChaos,
    loop: NV11_LOOPS.splitMist,
    pinVh: 140,
    nextHue: 160,
  },
  C14: {
    id: "C14",
    domId: "cena-cases",
    bg: NV11_IMAGES.casesVerticals,
    loop: NV11_LOOPS.verticalsPulse,
    pinVh: 130,
    nextHue: 48,
  },
  C15: {
    id: "C15",
    domId: "cena-social",
    bg: NV11_IMAGES.socialWarm,
    loop: NV11_LOOPS.trustGather,
    loopOpacity: 0.35,
    pinVh: 110,
    nextHue: 205,
  },
  C16: {
    id: "C16",
    domId: "cena-integracoes",
    bg: NV11_IMAGES.orbitHalo,
    loop: NV11_LOOPS.orbitFilaments,
    pinVh: 130,
    nextHue: 270,
  },
  C17: {
    id: "C17",
    domId: "cena-agencia",
    bg: NV11_IMAGES.agencyPortal,
    loop: NV11_LOOPS.portalGrid,
    pinVh: 140,
    nextHue: 250,
  },
  C18: {
    id: "C18",
    domId: "cena-planos",
    bg: NV11_IMAGES.plansConvergence,
    loop: NV11_LOOPS.decisionRings,
    pinVh: 150,
    nextHue: 250,
  },
  C19: {
    id: "C19",
    domId: "s-cta-eco",
    bg: NV11_IMAGES.ctaConvergence,
    loop: NV11_LOOPS.goldRivers,
    f2f: "NV11-F2F-004",
    pinVh: 170,
    pinMobileVh: 140,
  },
};

export function nv11Image(filename: string): string {
  return `${NV11_BASE}/images/${filename}`;
}

export function nv11Video(filename: string): string {
  return `${NV11_BASE}/videos/${filename}`;
}
