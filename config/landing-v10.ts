/**
 * KORUVISION — Landing definitiva (19 cenas, produto-first)
 * Roteiro cinematografico continuo. Configs de cena + copy premium PT-BR.
 */
import type { SectionConfig } from "./sections";
import { NV11_S01, NV11_S02, NV11_S04, NV11_CTA } from "./test-preview-nv11";
import { PREMIUM_SCRUB } from "@/lib/lenis-scroll";
import { NV11_BASE, NV11_IMAGES } from "./nv11-assets";

/** Cena generica (componentes novos da v10) */
export interface SceneCopy {
  id: string;
  hue: number;
  eyebrow: string;
  headline: string;
  headlineEm?: string;
  subheadline: string;
  ctaPrimary?: string;
  ctaPrimaryHref?: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
  points?: string[];
  /** Fundo atmosferico opcional (webp em /assets/nv11/images) */
  bg?: string;
}

const NV11_BG = `${NV11_BASE}/images`;

const CTA_FINAL = "#s-cta-eco";
const CTA_DEMO = "#s04";
const CTA_PLANS = "#cena-planos";

/* ───────────────────────── Cenas que reusam componentes premium ───────────────────────── */

export const HERO_CFG: SectionConfig = {
  ...NV11_S01,
  eyebrow: "CRM com IA · Atendimento omnichannel",
  headline: "O CRM que vê cada lead e fecha por você.",
  subheadline:
    "WhatsApp, IA, funil e automações numa só plataforma viva. A KORUVISION transforma conversas dispersas em receita previsível.",
  ctaPrimary: "Começar grátis — 14 dias",
  ctaSecondary: "Ver o produto em ação",
  scrub: PREMIUM_SCRUB.hero,
};

export const OWL_CFG: SectionConfig = {
  ...NV11_S02,
  scrub: PREMIUM_SCRUB.bridge,
};

export const DEMO_CFG: SectionConfig = {
  ...NV11_S04,
  eyebrow: "Demonstração · Dentro da plataforma",
  headline: "Cinco atos,",
  headlineEm: "um único fluxo.",
  subheadline:
    "Do primeiro 'oi' no WhatsApp ao deal fechado no dashboard — role e percorra o produto em operação real.",
  ctaPrimary: "Quero esse fluxo na minha operação",
  scrub: PREMIUM_SCRUB.demo,
};

export const CTA_CFG: SectionConfig = {
  ...NV11_CTA,
  ctaPrimary: "Começar grátis — sem cartão",
  ctaSecondary: "Falar com especialista",
  scrub: PREMIUM_SCRUB.cta,
};

/* ───────────────────────── Cenas novas (componentes v10) ───────────────────────── */

export const PROBLEM_CFG: SceneCopy = {
  id: "cena-problema",
  hue: 8,
  eyebrow: "O problema",
  headline: "Seus leads esfriam",
  headlineEm: "na névoa operacional.",
  subheadline:
    "WhatsApp solto, planilhas quebradas, follow-up esquecido e ninguém sabe de quem é a venda. Cada minuto sem resposta é receita escorrendo pelo ralo.",
  ctaPrimary: "Quero sair do caos",
  ctaPrimaryHref: CTA_FINAL,
  points: [
    "Conversas perdidas entre canais",
    "Sem visão de funil ou previsão",
    "Resposta lenta = lead frio",
    "Equipe apagando incêndio",
  ],
};

export const PILLARS_CFG: SceneCopy = {
  id: "cena-pilares",
  hue: 200,
  eyebrow: "A virada",
  headline: "Quatro pilares",
  headlineEm: "substituem quatro dores.",
  subheadline:
    "Atendimento, inteligência, pipeline e automação operando como um só organismo. O caos vira método em uma única tela.",
  ctaPrimary: "Ver como funciona",
  ctaPrimaryHref: CTA_DEMO,
};

export const SETUP_CFG: SceneCopy = {
  id: "cena-setup",
  hue: 175,
  eyebrow: "Implementação",
  headline: "No ar em",
  headlineEm: "5 minutos.",
  subheadline:
    "Sem consultoria, sem código. Conecte o WhatsApp, ative seu agente de IA e importe contatos — a plataforma começa a trabalhar sozinha.",
  ctaPrimary: "Conectar meu WhatsApp",
  ctaPrimaryHref: CTA_FINAL,
};

export const AGENTS_CFG: SceneCopy = {
  id: "cena-agentes",
  hue: 265,
  eyebrow: "Inteligência artificial",
  headline: "Agentes de IA que",
  headlineEm: "vendem como seu melhor closer.",
  subheadline:
    "Eles leem a intenção, qualificam, respondem com a voz da sua marca, calculam o score e decidem a próxima ação — 24/7, sem perder o tom humano.",
  ctaPrimary: "Criar meu agente",
  ctaPrimaryHref: CTA_FINAL,
  points: ["Qualificação automática", "Score e intenção em tempo real", "Resposta com a voz da marca", "Handoff suave para humanos"],
  bg: `${NV11_BG}/${NV11_IMAGES.neuralField}`,
};

export const INBOX_CFG: SceneCopy = {
  id: "cena-inbox",
  hue: 150,
  eyebrow: "Atendimento omnichannel",
  headline: "Toda conversa,",
  headlineEm: "uma só caixa de comando.",
  subheadline:
    "WhatsApp, Instagram, e-mail e site num inbox unificado, com tags inteligentes, contexto completo e handoff entre IA e equipe. Nada se perde.",
  ctaPrimary: "Ver o inbox ao vivo",
  ctaPrimaryHref: CTA_DEMO,
};

export const FUNNEL_CFG: SceneCopy = {
  id: "cena-funil",
  hue: 42,
  eyebrow: "Pipeline comercial",
  headline: "Cada deal avança",
  headlineEm: "com gravidade própria.",
  subheadline:
    "Arraste, priorize e veja o lead percorrer o funil com snap magnético. Valores, origem e probabilidade de fechamento sempre à vista.",
  ctaPrimary: "Organizar meu pipeline",
  ctaPrimaryHref: CTA_FINAL,
};

export const AUTOMATION_CFG: SceneCopy = {
  id: "cena-automacoes",
  hue: 210,
  eyebrow: "Automações",
  headline: "O sistema nervoso",
  headlineEm: "do seu comercial.",
  subheadline:
    "Gatilhos, condições e ações conectados por fluxos vivos. A energia percorre cada nó, move o lead e aciona a equipe enquanto você dorme.",
  ctaPrimary: "Automatizar agora",
  ctaPrimaryHref: CTA_FINAL,
};

export const ANALYTICS_CFG: SceneCopy = {
  id: "cena-analytics",
  hue: 285,
  eyebrow: "Analytics & relatórios",
  headline: "Decisões guiadas por",
  headlineEm: "dados que respiram.",
  subheadline:
    "Pipeline, conversão, receita prevista e performance por canal — em painéis que atualizam em tempo real e antecipam o próximo movimento.",
  ctaPrimary: "Ver meus indicadores",
  ctaPrimaryHref: CTA_DEMO,
};

export const BENEFITS_CFG: SceneCopy = {
  id: "cena-beneficios",
  hue: 230,
  eyebrow: "Por que KORUVISION",
  headline: "Uma constelação de",
  headlineEm: "ganhos reais.",
  subheadline:
    "Cada recurso existe para um resultado: mais respostas, mais reuniões, mais fechamento e menos trabalho manual.",
};

export const BEFORE_AFTER_CFG: SceneCopy = {
  id: "cena-antes-depois",
  hue: 190,
  eyebrow: "A transformação",
  headline: "O mesmo negócio,",
  headlineEm: "dois universos.",
  subheadline:
    "Arraste a linha e veja a diferença entre operar no escuro e operar com a KORUVISION.",
};

export const CASES_CFG: SceneCopy = {
  id: "cena-cases",
  hue: 160,
  eyebrow: "Resultados por mercado",
  headline: "Cinco mercados,",
  headlineEm: "um mesmo fluxo que vende.",
  subheadline:
    "Saúde, imóveis, consultoria, agências e e-commerce — a mesma plataforma adaptada ao seu jogo.",
};

export const SOCIAL_CFG: SceneCopy = {
  id: "cena-social",
  hue: 48,
  eyebrow: "Prova social",
  headline: "+2.400 equipes",
  headlineEm: "já cruzaram a linha.",
  subheadline:
    "Times comerciais de todo o Brasil transformaram conversas em receita previsível com a KORUVISION.",
};

export const INTEGRATIONS_CFG: SceneCopy = {
  id: "cena-integracoes",
  hue: 205,
  eyebrow: "Integrações",
  headline: "Tudo orbita",
  headlineEm: "o seu CRM.",
  subheadline:
    "WhatsApp, Instagram, pagamentos, calendário, e-mail e webhooks conectados por filamentos de dados em tempo real.",
  ctaPrimary: "Ver integrações",
  ctaPrimaryHref: CTA_FINAL,
  bg: `${NV11_BG}/${NV11_IMAGES.heroAurora}`,
};

export const AGENCY_CFG: SceneCopy = {
  id: "cena-agencia",
  hue: 270,
  eyebrow: "Para agências & escala",
  headline: "Multi-tenant, white-label",
  headlineEm: "e MRR previsível.",
  subheadline:
    "Gerencie todos os seus clientes em um só portal, com a sua marca. Dados protegidos com criptografia, LGPD e auditoria de ponta a ponta.",
  ctaPrimary: "Abrir meu portal",
  ctaPrimaryHref: CTA_FINAL,
  points: ["Criptografia ponta a ponta", "Conformidade LGPD", "Auditoria e logs", "White-label completo"],
};

export const PLANS_CFG: SceneCopy = {
  id: "cena-planos",
  hue: 250,
  eyebrow: "Planos",
  headline: "Escolha seu plano.",
  headlineEm: "Escale quando quiser.",
  subheadline:
    "Comece grátis por 14 dias, sem cartão. Sem surpresas na fatura — você cresce, o plano acompanha.",
  bg: `${NV11_BG}/${NV11_IMAGES.plansConvergence}`,
};

/* ───────────────────────── Dados estruturados ───────────────────────── */

export const PILLARS = [
  { key: "atendimento", icon: "inbox", title: "Atendimento", copy: "Inbox omnichannel com contexto total." },
  { key: "ia", icon: "brain", title: "Inteligência", copy: "Agentes de IA qualificando e respondendo." },
  { key: "pipeline", icon: "funnel", title: "Pipeline", copy: "Funil visual com previsão de receita." },
  { key: "automacao", icon: "nodes", title: "Automação", copy: "Fluxos que trabalham sozinhos, 24/7." },
];

export const SETUP_STEPS = [
  { n: "01", title: "Conecte o WhatsApp", copy: "API oficial ou QR code. Sem migração dolorosa." },
  { n: "02", title: "Ative seu agente de IA", copy: "Escolha a personalidade e o tom da marca." },
  { n: "03", title: "Importe seus contatos", copy: "O rio de dados começa a fluir automaticamente." },
];

export const BENEFITS = [
  { icon: "bolt", title: "Resposta instantânea", copy: "IA responde em segundos, dia e noite." },
  { icon: "target", title: "Leads priorizados", copy: "Score automático mostra quem está quente." },
  { icon: "funnel", title: "Funil sem furos", copy: "Nenhuma oportunidade some no meio." },
  { icon: "robot", title: "Trabalho manual −70%", copy: "Automações cuidam da repetição." },
  { icon: "chart", title: "Previsão de receita", copy: "Saiba quanto vai entrar este mês." },
  { icon: "chat", title: "Atendimento 24/7", copy: "Sua operação nunca dorme." },
  { icon: "shield", title: "Dados protegidos", copy: "Criptografia e conformidade LGPD." },
  { icon: "plug", title: "Tudo integrado", copy: "Seu ecossistema em um só lugar." },
];

export const BEFORE_AFTER = {
  before: [
    "Mensagens espalhadas em vários celulares",
    "Follow-up no 'eu lembro depois'",
    "Zero visão de quanto vai fechar",
    "Lead frio antes da primeira resposta",
  ],
  after: [
    "Inbox único com histórico completo",
    "Follow-up automático no tempo certo",
    "Previsão de receita em tempo real",
    "Resposta da IA em segundos",
  ],
};

export const CASES = [
  { vertical: "Saúde", metric: "+38%", label: "agendamentos", copy: "Clínicas confirmam consultas com IA e reduzem faltas." },
  { vertical: "Imóveis", metric: "3x", label: "visitas marcadas", copy: "Leads qualificados e distribuídos por corretor." },
  { vertical: "Consultoria", metric: "−65%", label: "tempo de resposta", copy: "Propostas saem no mesmo dia, sem gargalo." },
  { vertical: "Agências", metric: "R$ 128k", label: "MRR gerido", copy: "Multi-tenant white-label para todos os clientes." },
  { vertical: "E-commerce", metric: "+27%", label: "recompra", copy: "Recuperação de carrinho e pós-venda no automático." },
];

export const SOCIAL_STATS = [
  { value: "+2.400", label: "equipes ativas" },
  { value: "12M+", label: "mensagens automatizadas" },
  { value: "23%", label: "conversão média" },
  { value: "4,9/5", label: "satisfação" },
];

export const TESTIMONIALS = [
  { quote: "Em 30 dias paramos de perder lead. A IA responde antes da concorrência.", name: "Marina Alves", role: "Head Comercial · Clínica" },
  { quote: "O funil ficou transparente. Hoje sei exatamente quanto vou fechar.", name: "Rafael Dias", role: "Diretor · Imobiliária" },
  { quote: "Gerencio 14 clientes no mesmo portal. Escalou sem virar caos.", name: "Camila Souza", role: "CEO · Agência" },
];

export const INTEGRATIONS = [
  "WhatsApp", "Instagram", "Messenger", "E-mail", "Google Calendar",
  "Pix / Pagamentos", "Webhooks", "Zapier", "API REST", "Meta Ads",
];

export const PLANS = [
  {
    name: "Starter",
    price: "R$ 97",
    period: "/mês",
    popular: false,
    copy: "Para começar a organizar e responder mais rápido.",
    features: ["1 número de WhatsApp", "CRM + funil visual", "IA de qualificação", "Até 3 usuários"],
  },
  {
    name: "Pro",
    price: "R$ 197",
    period: "/mês",
    popular: true,
    copy: "Para times que querem vender no automático.",
    features: ["WhatsApp + omnichannel", "Automações ilimitadas", "Agentes de IA avançados", "Dashboards executivos", "Até 10 usuários"],
  },
  {
    name: "Agency",
    price: "R$ 497",
    period: "/mês",
    popular: false,
    copy: "Para agências que gerenciam vários clientes.",
    features: ["Multi-tenant white-label", "Usuários ilimitados", "Portal de clientes", "Suporte prioritário"],
  },
];

export const FAQ = [
  { q: "Preciso de cartão para testar?", a: "Não. São 14 dias grátis, sem cartão e sem compromisso." },
  { q: "Integra com o WhatsApp oficial?", a: "Sim. Via API oficial da Meta ou QR code, com setup em até 5 minutos." },
  { q: "A IA fala como a minha marca?", a: "Sim. Você define o tom, as regras e o conhecimento — o lead não percebe que é automação." },
  { q: "Funciona para agências?", a: "Sim. O plano Agency oferece multi-tenant, white-label e portal de clientes." },
  { q: "Meus dados ficam seguros?", a: "Sim. Criptografia, conformidade com a LGPD, backups e auditoria de acessos." },
];
