import { imagePath, videoPath, f2fPath } from "./env";

export type SectionId =
  | "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07" | "S08" | "S09"
  | "S10" | "S11" | "S12" | "S13" | "S14" | "S15" | "S16" | "S17" | "S18" | "S19";

export interface SectionConfig {
  id: SectionId;
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  headlineEm?: string;
  subheadline: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  pinVh: number | null;
  pinMobileVh?: number;
  scrub: number;
  snap?: string;
  act: string;
  images: string[];
  videos: string[];
  f2f: string[];
  svg: string[];
  react: string[];
  /** low = fundo subserviente (v6); medium; high = legado nv5 */
  mediaIntensity?: "low" | "medium" | "high";
  /** Override para preview /test (ex: /assets/nv6) */
  assetBase?: string;
  /** Preview v7: coruja em vez de device mockup */
  heroLayout?: "device" | "owl";
  /** Vídeo principal da coruja no hero (foreground) */
  heroVideo?: string;
  /** Modo experiência premium — orbit, ambient, time-driven */
  experienceMode?: "default" | "premium";
  /** Vídeo cinematográfico full-width no hero */
  heroBgVideo?: string;
}

export const SECTIONS: SectionConfig[] = [
  {
    id: "S01", slug: "s01-hero", title: "Hero · O Observatório se Abre",
    eyebrow: "KORUVISION · FlowIA",
    headline: "Suas conversas viram receita previsível.",
    subheadline: "CRM com IA para WhatsApp — qualifique leads, feche deals e veja tudo num painel que pensa com você.",
    ctaPrimary: "Começar grátis — 14 dias", ctaSecondary: "Ver demonstração ↓",
    pinVh: 360, pinMobileVh: 240, scrub: 1.2, snap: "peak 0.60", act: "I Emergência",
    images: ["hero-observatory-corridor-wide.webp", "hero-liquid-data-river-apex.webp", "hero-floating-glass-platform.webp", "hero-macro-neural-fiber-bundle.webp", "depth-far-mist-plate.webp"],
    videos: ["nv5-vid-001.mp4", "nv5-vid-015.mp4"], f2f: [], svg: ["NV5-SVG-003"], react: ["NV5-R-021"],
  },
  {
    id: "S02", slug: "s02-problema", title: "Problema · Névoa Vermelha",
    eyebrow: "O problema",
    headline: "Sua operação está", headlineEm: "perdida na névoa.",
    subheadline: "WhatsApp solto, planilhas quebradas, bots sem alma e pipeline vazio — o lead esfria enquanto você apaga incêndio.",
    ctaPrimary: "Quero sair do caos",
    pinVh: 240, pinMobileVh: 180, scrub: 1.0, act: "I Tensão",
    images: ["depth-neural-vignette-mask.webp", "problem-shattered-holographic-slabs.webp", "problem-fractured-data-river.webp", "problem-collapsing-neural-corridor.webp"],
    videos: ["nv5-vid-002.mp4"], f2f: [], svg: ["NV5-SVG-004"], react: ["NV5-R-022"],
  },
  {
    id: "S03", slug: "s03-bridge", title: "Transformação · Atravessia Neural",
    eyebrow: "A travessia",
    headline: "Atravesse.", headlineEm: "Do caos ao controle.",
    subheadline: "Quatro pilares substituem quatro dores — inbox, IA, pipeline e automação em um só fluxo.",
    ctaPrimary: "Entrar na máquina",
    pinVh: 320, pinMobileVh: 220, scrub: 1.2, snap: "peak", act: "II Alívio",
    images: ["bridge-tunnel-light-rings.webp", "bridge-mist-transition-zone.webp", "bridge-glass-pillar-array.webp"],
    videos: ["nv5-vid-003.mp4"], f2f: [], svg: ["NV5-SVG-008"], react: ["NV5-R-023"],
  },
  {
    id: "S04", slug: "s04-demo", title: "Demo · Dentro da Máquina",
    eyebrow: "Demonstração",
    headline: "Dentro da", headlineEm: "máquina.",
    subheadline: "Do WhatsApp ao pipeline — cinco atos, um único fluxo. Você controla a câmera.",
    ctaPrimary: "Começar grátis agora",
    pinVh: 480, pinMobileVh: 380, scrub: 2.4, snap: "5 PEAKs", act: "II Desejo",
    images: ["demo-machine-interior-wide.webp", "demo-plate-messaging-niche.webp", "demo-plate-pipeline-niche.webp"],
    videos: ["nv5-vid-004.mp4", "nv5-vid-005.mp4"], f2f: [], svg: ["NV5-SVG-010"], react: ["NV5-R-024"],
  },
  {
    id: "S05", slug: "s05-setup", title: "Setup · Três Portais",
    eyebrow: "Implementação",
    headline: "Três portais.", headlineEm: "Cinco minutos. Pronto.",
    subheadline: "Conecte o WhatsApp, configure seu agente e importe contatos — o rio de dados começa a fluir sozinho.",
    ctaPrimary: "Conectar meu WhatsApp",
    pinVh: 280, pinMobileVh: 220, scrub: 1.0, act: "III Maestria",
    images: ["setup-singular-portal-gate.webp", "setup-trio-portal-gates.webp"],
    videos: ["nv5-vid-006.mp4"], f2f: [], svg: ["NV5-SVG-012"], react: ["NV5-R-025"],
  },
  {
    id: "S06", slug: "s06-agentes", title: "Agentes · Personalidade IA",
    eyebrow: "Personalidade",
    headline: "IA que fala", headlineEm: "como sua marca.",
    subheadline: "Cinco personalidades prontas ou a sua — o lead não percebe que é automação.",
    ctaPrimary: "Criar meu agente",
    pinVh: 260, pinMobileVh: 200, scrub: 1.0, act: "III",
    images: ["agents-oblique-personality-slabs.webp", "agents-macro-identity-core.webp"],
    videos: [], f2f: [], svg: [], react: ["NV5-R-026"],
  },
  {
    id: "S07", slug: "s07-inbox", title: "Inbox · Sala de Comando",
    eyebrow: "Inbox",
    headline: "Sua sala de", headlineEm: "comando.",
    subheadline: "Inbox unificado, tags inteligentes e handoff suave — nenhuma conversa se perde.",
    ctaPrimary: "Ver inbox ao vivo",
    pinVh: 240, pinMobileVh: 180, scrub: 1.0, act: "III",
    images: ["inbox-command-deck-environment.webp", "depth-parallax-midground-slabs.webp"],
    videos: [], f2f: [], svg: ["NV5-SVG-024"], react: ["NV5-R-027"],
  },
  {
    id: "S08", slug: "s08-funil", title: "Funil · Gravidade do Deal",
    eyebrow: "Pipeline",
    headline: "Gravidade do", headlineEm: "deal.",
    subheadline: "Maria percorre o funil com snap magnético — de lead frio a contrato fechado num gesto.",
    ctaPrimary: "Organizar meu pipeline",
    pinVh: 260, pinMobileVh: 200, scrub: 1.2, act: "III",
    images: ["funnel-gravity-well-vortex.webp", "funnel-magnetic-lanes.webp", "depth-gold-bokeh-particles.webp"],
    videos: ["nv5-vid-007.mp4"], f2f: [], svg: ["NV5-SVG-011"], react: ["NV5-R-028"],
  },
  {
    id: "S09", slug: "s09-automacoes", title: "Automações · Sistema Nervoso",
    eyebrow: "Automação",
    headline: "O sistema nervoso", headlineEm: "do seu CRM.",
    subheadline: "Triggers, condições e ações — energia percorre cada nó enquanto você dorme.",
    ctaPrimary: "Automatizar agora",
    pinVh: 240, pinMobileVh: 180, scrub: 1.0, act: "III",
    images: ["automation-nervous-filament-web.webp", "automation-workflow-node-constellation.webp"],
    videos: ["nv5-vid-008.mp4"], f2f: [], svg: ["NV5-SVG-013"], react: ["NV5-R-029"],
  },
  {
    id: "S10", slug: "s10-beneficios", title: "Benefícios · Constelação",
    eyebrow: "Benefícios",
    headline: "Doze estrelas.", headlineEm: "Um sistema.",
    subheadline: "Cada benefício é um nó da constelação FlowIA — passe o mouse e descubra.",
    ctaPrimary: "Explorar benefícios",
    pinVh: null, scrub: 1.0, act: "IV Prova",
    images: ["benefits-constellation-platform.webp", "depth-cyan-rim-accent-streaks.webp"],
    videos: [], f2f: [], svg: ["NV5-SVG-022"], react: ["NV5-R-030"],
  },
  {
    id: "S11", slug: "s11-linha", title: "Antes/Depois · A Linha",
    eyebrow: "Transformação",
    headline: "A linha entre o caos", headlineEm: "e o controle.",
    subheadline: "Mesmo negócio, dois universos — arraste e veja onde você está hoje.",
    ctaPrimary: "Quero o lado direito",
    pinVh: 240, pinMobileVh: 180, scrub: 1.0, act: "IV",
    images: ["before-chaos-nexus-tangle.webp", "after-ordered-convergence-nexus.webp"],
    videos: ["nv5-vid-009.mp4"], f2f: [], svg: ["NV5-SVG-025"], react: ["NV5-R-031"],
  },
  {
    id: "S12", slug: "s12-cases", title: "Cases · Cinco Mercados",
    eyebrow: "Cases",
    headline: "Cinco mercados.", headlineEm: "Um fluxo.",
    subheadline: "Saúde, imóveis, consultoria, agências e e-commerce — resultados reais em cada vertical.",
    ctaPrimary: "Ver case completo",
    pinVh: 300, pinMobileVh: 240, scrub: 1.0, act: "IV",
    images: ["case-health-neural-niche.webp", "case-property-horizon-niche.webp", "case-consulting-strategy-niche.webp", "case-agency-multichannel-niche.webp", "case-commerce-flow-niche.webp"],
    videos: ["nv5-vid-010.mp4"], f2f: [], svg: ["NV5-SVG-022"], react: ["NV5-R-032"],
  },
  {
    id: "S13", slug: "s13-social", title: "Social Proof",
    eyebrow: "Prova social",
    headline: "+2.400 equipes", headlineEm: "já cruzaram.",
    subheadline: "Números que falam, depoimentos que convencem — equipes reais usando o produto.",
    ctaPrimary: "Juntar-se a elas",
    pinVh: null, scrub: 1.0, act: "IV",
    images: ["social-proof-luminous-cluster.webp"],
    videos: ["nv5-vid-010.mp4"], f2f: [], svg: ["NV5-SVG-024"], react: ["NV5-R-033"],
  },
  {
    id: "S14", slug: "s14-orbita", title: "Integrações · Órbita",
    eyebrow: "Integrações",
    headline: "Tudo orbita", headlineEm: "o seu CRM.",
    subheadline: "WhatsApp, pagamentos, calendário, webhooks e mais — conectados por filamentos de dados.",
    ctaPrimary: "Ver integrações",
    pinVh: 220, pinMobileVh: 180, scrub: 1.0, act: "IV",
    images: ["integrations-orbit-halo-system.webp"],
    videos: ["nv5-vid-011.mp4"], f2f: [], svg: ["NV5-SVG-015"], react: ["NV5-R-034"],
  },
  {
    id: "S15", slug: "s15-agencia", title: "Agência · Portal",
    eyebrow: "Agências",
    headline: "Portal para", headlineEm: "escalar clientes.",
    subheadline: "Multi-tenant, white-label e MRR previsível — sua agência vira operação neural.",
    ctaPrimary: "Abrir meu portal",
    pinVh: 260, pinMobileVh: 200, scrub: 1.0, act: "IV",
    images: ["agency-portal-threshold.webp"],
    videos: ["nv5-vid-012.mp4"], f2f: [], svg: ["NV5-SVG-026"], react: ["NV5-R-035"],
  },
  {
    id: "S16", slug: "s16-seguranca", title: "Segurança · Fortaleza",
    eyebrow: "Segurança",
    headline: "Fortaleza", headlineEm: "neural.",
    subheadline: "Criptografia, LGPD e auditoria — seus dados protegidos como ouro líquido.",
    ctaPrimary: "Ver certificações",
    pinVh: null, scrub: 1.0, act: "IV",
    images: ["security-fortress-lattice.webp"],
    videos: [], f2f: [], svg: ["NV5-SVG-018"], react: ["NV5-R-036"],
  },
  {
    id: "S17", slug: "s17-planos", title: "Planos · Escolha seu Portal",
    eyebrow: "Planos",
    headline: "Escolha seu", headlineEm: "portal.",
    subheadline: "Starter, Pro ou Agency — escale quando quiser, sem surpresas na fatura.",
    ctaPrimary: "Começar grátis",
    pinVh: null, scrub: 1.0, act: "V Decisão",
    images: ["depth-plans-tier-glow.webp"],
    videos: [], f2f: [], svg: ["NV5-SVG-022"], react: ["NV5-R-037"],
  },
  {
    id: "S18", slug: "s18-faq", title: "FAQ · Clareza",
    eyebrow: "FAQ",
    headline: "Clareza na", headlineEm: "névoa.",
    subheadline: "Respostas diretas — sem jargão, sem enrolação.",
    pinVh: null, scrub: 1.0, act: "V Pausa",
    images: ["depth-faq-clarity-fog.webp"],
    videos: [], f2f: [], svg: [], react: ["NV5-R-020"],
  },
  {
    id: "S19", slug: "s19-cta", title: "CTA Final · Convergência",
    eyebrow: "Convergência",
    headline: "Suas conversas viram", headlineEm: "receita previsível.",
    subheadline: "Junte-se a +2.400 equipes que transformaram conversas em receita previsível.",
    ctaPrimary: "Começar grátis — 14 dias, sem cartão", ctaSecondary: "Falar com vendas",
    pinVh: 320, pinMobileVh: 240, scrub: 1.2, act: "V Clímax",
    images: ["cta-convergence-vortex-wide.webp", "cta-god-rays-apex.webp", "cta-liquid-gold-reservoir.webp"],
    videos: ["nv5-vid-013.mp4", "nv5-vid-014.mp4"], f2f: [], svg: ["NV5-SVG-020"], react: ["NV5-R-038"],
  },
];

export function getSection(id: SectionId): SectionConfig {
  const s = SECTIONS.find((x) => x.id === id);
  if (!s) throw new Error(`Section ${id} not found`);
  return s;
}

export { imagePath, videoPath, f2fPath };
