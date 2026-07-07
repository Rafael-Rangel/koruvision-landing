/**
 * KORUVISION — Landing Strategy V3 (fonte única de verdade)
 * Ver docs/LANDING-STRATEGY-V3.md para narrativa completa.
 */

export type ProtagonistTech =
  | "3D_CSS"
  | "F2F"
  | "HYB"
  | "LIVE"
  | "LOOP_AMBIENT";

export interface LandingSectionSpec {
  id: string;
  domId: string;
  act: "I" | "II" | "III" | "IV";
  objective: string;
  message: string;
  protagonist: string;
  tech: ProtagonistTech[];
  pinVhDesktop?: number;
  pinVhMobile?: number;
  primaryCta?: string;
  primaryCtaHref?: string;
  conversionGoal: string;
}

export const LANDING_PILLARS = [
  {
    key: "vision",
    title: "Visão que vende",
    summary: "A KORUVISION vê leads, intenção e risco antes da equipe.",
  },
  {
    key: "chaos_to_method",
    title: "Caos → método",
    summary: "Dor operacional vira fluxo único na plataforma.",
  },
  {
    key: "tangible_product",
    title: "Produto tangível",
    summary: "Inbox, IA, pipeline e setup em minutos — não promessa abstrata.",
  },
  {
    key: "proof_before_price",
    title: "Prova antes do preço",
    summary: "Transformação visual + números antes dos planos.",
  },
  {
    key: "zero_friction",
    title: "Fricção zero",
    summary: "14 dias grátis, setup rápido, plano Pro como âncora.",
  },
] as const;

export const LANDING_SECTIONS: LandingSectionSpec[] = [
  {
    id: "S01",
    domId: "s01",
    act: "I",
    objective: "Capturar atenção e comunicar proposta de valor com CTA imediato.",
    message: "O CRM que vê cada lead e fecha por você.",
    protagonist: "Núcleo KoruVision (orbe 3D + CRM emergente)",
    tech: ["HYB", "F2F", "LOOP_AMBIENT"],
    pinVhDesktop: 160,
    pinVhMobile: 135,
    primaryCta: "Começar grátis — 14 dias",
    primaryCtaHref: "#s-cta-eco",
    conversionGoal: "Clique no CTA primário ou scroll para Demo.",
  },
  {
    id: "S02-S03",
    domId: "owl-chaos-flow",
    act: "I",
    objective: "Tensão de marca (visão) + quantificação da dor operacional.",
    message: "Seus leads esfriam na névoa operacional.",
    protagonist: "Olho F2F + Dashboard de caos (OperationalChaos3D)",
    tech: ["F2F", "LIVE", "3D_CSS"],
    pinVhDesktop: 210,
    pinVhMobile: 175,
    primaryCta: "Quero sair do caos",
    primaryCtaHref: "#s-cta-eco",
    conversionGoal: "Identificação com a dor e urgência.",
  },
  {
    id: "S04",
    domId: "cena-pilares",
    act: "II",
    objective: "Framework da solução em 4 pilares memoráveis.",
    message: "Quatro pilares substituem quatro dores.",
    protagonist: "FourPillars3D",
    tech: ["3D_CSS", "LOOP_AMBIENT"],
    pinVhDesktop: 95,
    primaryCta: "Ver como funciona",
    primaryCtaHref: "#s04",
    conversionGoal: "Ponte dor → produto (Demo).",
  },
  {
    id: "S05",
    domId: "s04",
    act: "II",
    objective: "Provar produto ponta a ponta em um único fluxo.",
    message: "Cinco atos, um único fluxo.",
    protagonist: "Camera rig + 5 mockups (WA → Dashboard)",
    tech: ["HYB", "F2F", "LIVE"],
    pinVhDesktop: 185,
    pinVhMobile: 145,
    primaryCta: "Quero esse fluxo na minha operação",
    primaryCtaHref: "#s-cta-eco",
    conversionGoal: "Desejo de replicar o fluxo na operação.",
  },
  {
    id: "S06",
    domId: "cena-setup",
    act: "II",
    objective: "Destruir objeção de implementação difícil.",
    message: "No ar em 5 minutos.",
    protagonist: "OnboardingPortals3D",
    tech: ["3D_CSS", "LOOP_AMBIENT"],
    pinVhDesktop: 90,
    primaryCta: "Conectar meu WhatsApp",
    primaryCtaHref: "#s-cta-eco",
    conversionGoal: "Reduzir medo de setup.",
  },
  {
    id: "S07",
    domId: "cena-agentes",
    act: "II",
    objective: "Diferencial IA — qualifica e vende 24/7.",
    message: "Agentes que vendem como seu melhor closer.",
    protagonist: "NeuralBrainHub3D + AgentsVisual",
    tech: ["3D_CSS", "LIVE", "LOOP_AMBIENT"],
    pinVhDesktop: 100,
    primaryCta: "Criar meu agente",
    primaryCtaHref: "#s-cta-eco",
    conversionGoal: "Desejo de automação inteligente.",
  },
  {
    id: "S08",
    domId: "cena-funil",
    act: "II",
    objective: "Visibilidade comercial e previsão de receita.",
    message: "Cada deal avança com gravidade própria.",
    protagonist: "SalesPipeline3D (deal Maria)",
    tech: ["3D_CSS", "LOOP_AMBIENT"],
    pinVhDesktop: 100,
    primaryCta: "Organizar meu pipeline",
    primaryCtaHref: "#s-cta-eco",
    conversionGoal: "Desejo de pipeline sem furos.",
  },
  {
    id: "S09",
    domId: "cena-antes-depois",
    act: "III",
    objective: "Contraste emocional antes/depois.",
    message: "O mesmo negócio, dois universos.",
    protagonist: "BeforeAfterSplit3D + slider",
    tech: ["3D_CSS", "LIVE"],
    pinVhDesktop: 100,
    primaryCta: "Quero o depois",
    primaryCtaHref: "#cena-planos",
    conversionGoal: "Projeção no estado desejado.",
  },
  {
    id: "S10",
    domId: "cena-prova",
    act: "III",
    objective: "Credibilidade social + cases multi-vertical.",
    message: "Resultados que falam por si.",
    protagonist: "VerticalTotems3D + ProofVisual",
    tech: ["3D_CSS", "LIVE", "LOOP_AMBIENT"],
    pinVhDesktop: 115,
    pinVhMobile: 95,
    primaryCta: "Ver planos",
    primaryCtaHref: "#cena-planos",
    conversionGoal: "Transferência de confiança antes do preço.",
  },
  {
    id: "S11",
    domId: "cena-planos",
    act: "IV",
    objective: "Apresentar oferta com âncora no Pro + FAQ.",
    message: "14 dias grátis, sem cartão.",
    protagonist: "PricingMonoliths3D + PlansVisual",
    tech: ["3D_CSS", "LIVE"],
    pinVhDesktop: 100,
    primaryCta: "Começar grátis",
    primaryCtaHref: "#s-cta-eco",
    conversionGoal: "Assinar plano Pro.",
  },
  {
    id: "S12",
    domId: "s-cta-eco",
    act: "IV",
    objective: "Fechamento emocional + ação imediata.",
    message: "Coloque o CRM para vender com IA.",
    protagonist: "ProceduralOwlScene + OwlSigil + MacMetricsMockup",
    tech: ["HYB", "F2F", "LOOP_AMBIENT"],
    pinVhDesktop: 130,
    pinVhMobile: 110,
    primaryCta: "Começar grátis — sem cartão",
    primaryCtaHref: "#",
    conversionGoal: "Conversão final (signup).",
  },
];

/** Hues de continuidade entre seções (handoff visual) */
export const SECTION_HANDOFF_HUES: Record<string, number> = {
  "s01": 265,
  "owl-chaos-flow": 200,
  "cena-pilares": 220,
  "s04": 175,
  "cena-setup": 265,
  "cena-agentes": 42,
  "cena-funil": 190,
  "cena-antes-depois": 160,
  "cena-prova": 250,
  "cena-planos": 250,
  "s-cta-eco": 250,
};
