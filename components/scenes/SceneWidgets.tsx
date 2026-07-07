"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap, registerGsap } from "@/lib/gsap/register";
import { smoothrange } from "@/lib/motion-system";
import { InteractiveSurface } from "@/components/motion/InteractiveSurface";
import { NeuralFlowCanvas } from "@/components/motion/NeuralFlowCanvas";
import { MacInboxMockup, MacAutomationMockup, MacMetricsMockup } from "@/components/product/MacWindowMockup";
import { RealProductScreen } from "@/components/product/RealProductScreen";
import { resolveProofMetric } from "@/config/real-assets";
import { DeviceShell, UIKanbanBoard, UIAgencyTenants } from "@/components/golden/GoldenUI";
import {
  SETUP_STEPS,
  BENEFITS,
  BEFORE_AFTER,
  CASES,
  SOCIAL_STATS,
  TESTIMONIALS,
  INTEGRATIONS,
  PLANS,
  FAQ,
  PILLARS,
} from "@/config/landing-v10";

/* ───────────── Pilares (A virada) ───────────── */
const PILLAR_ICONS: Record<string, string> = {
  atendimento: "◎",
  ia: "◈",
  pipeline: "▣",
  automacao: "⬡",
};

export function PillarsVisual({ progress = 0 }: { progress?: number }) {
  const activeIdx = Math.min(PILLARS.length - 1, Math.floor(progress * (PILLARS.length + 0.35)));

  return (
    <div className="v-pillars-rail" aria-label="Quatro pilares da plataforma">
      {PILLARS.map((pillar, i) => {
        const lit = i <= activeIdx;
        const pulse = smoothrange(progress, 0.15 + i * 0.12, 0.38 + i * 0.12);
        return (
          <InteractiveSurface
            key={pillar.key}
            className={`v-pillar-card${lit ? " is-lit" : ""}`}
            intensity={lit ? 0.55 : 0.25}
            glow={lit && i === activeIdx}
          >
            <span className="v-pillar-card__icon" aria-hidden>
              {PILLAR_ICONS[pillar.key] ?? "◆"}
            </span>
            <div className="v-pillar-card__body">
              <strong>{pillar.title}</strong>
              <p>{pillar.copy}</p>
            </div>
            <span className="v-pillar-card__meter" style={{ "--fill": String(lit ? Math.max(pulse, 0.35) : 0) } as CSSProperties} />
          </InteractiveSurface>
        );
      })}
    </div>
  );
}

/* ───────────── Agentes de IA ───────────── */
export function AgentsVisual() {
  return (
    <div className="v-agents">
      <NeuralFlowCanvas className="v-agents-neural" />
      <RealProductScreen slot="agents.automation" className="v-agents-mockup v-agents-mockup--auto">
        <MacAutomationMockup className="v-agents-mockup v-agents-mockup--auto" tilt />
      </RealProductScreen>
      <RealProductScreen slot="agents.inbox" className="v-agents-mockup v-agents-mockup--inbox">
        <MacInboxMockup className="v-agents-mockup v-agents-mockup--inbox" tilt />
      </RealProductScreen>
    </div>
  );
}

/* ───────────── Inbox omnichannel ───────────── */
export function InboxVisual() {
  return (
    <div className="v-inbox">
      <MacInboxMockup className="v-inbox-mockup" tilt priority />
      <div className="v-inbox-chips" aria-hidden>
        <span data-ambient-float data-ambient-amp="6">WhatsApp</span>
        <span data-ambient-float data-ambient-amp="8">Instagram</span>
        <span data-ambient-float data-ambient-amp="5">E-mail</span>
      </div>
    </div>
  );
}

/* ───────────── Funil / Pipeline 3D ───────────── */
export function FunnelVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const dot = el.querySelector(".v-funnel-dot");
    const path = el.querySelector<SVGPathElement>(".v-funnel-path");
    if (!dot || !path) return;
    const tween = gsap.to(dot, {
      duration: 4,
      repeat: -1,
      ease: "none",
      motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
    });
    return () => { tween.kill(); };
  }, []);

  return (
    <div ref={ref} className="v-funnel">
      <svg className="v-funnel-svg" viewBox="0 0 220 200" aria-hidden>
        <defs>
          <linearGradient id="funnelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFC233" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <path className="v-funnel-shape" d="M10 24 H210 L150 96 V168 L70 168 V96 Z" fill="url(#funnelGrad)" opacity="0.25" />
        <path className="v-funnel-path" d="M30 30 H190 L140 92 V160" fill="none" stroke="rgba(255,194,51,0.5)" strokeWidth="1.5" strokeDasharray="4 5" />
        <circle className="v-funnel-dot" r="6" fill="#FFC233" />
      </svg>
      <InteractiveSurface className="v-funnel-card" intensity={0.55}>
        <DeviceShell><UIKanbanBoard /></DeviceShell>
      </InteractiveSurface>
    </div>
  );
}

/* ───────────── Automações (sistema nervoso) ───────────── */
export function AutomationVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const dots = el.querySelectorAll<SVGCircleElement>(".v-auto-pulse");
    const path = el.querySelector<SVGPathElement>(".v-auto-wire");
    if (!path || !dots.length) return;
    const tweens = Array.from(dots).map((d, i) =>
      gsap.to(d, {
        duration: 3.2,
        repeat: -1,
        ease: "none",
        delay: i * 1.0,
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
      })
    );
    return () => { tweens.forEach((t) => t.kill()); };
  }, []);

  return (
    <div ref={ref} className="v-auto">
      <svg className="v-auto-svg" viewBox="0 0 320 180" aria-hidden>
        <path className="v-auto-wire" d="M20 90 C 90 20, 130 160, 200 90 S 290 30, 300 90" fill="none" stroke="rgba(139,92,246,0.4)" strokeWidth="1.6" />
        {[0, 1, 2].map((i) => <circle key={i} className="v-auto-pulse" r="5" fill="#FFC233" />)}
      </svg>
      <MacAutomationMockup className="v-auto-mockup" tilt />
    </div>
  );
}

/* ───────────── Analytics ───────────── */
export function AnalyticsVisual() {
  return (
    <div className="v-analytics">
      <MacMetricsMockup className="v-analytics-mockup" tilt priority />
      <div className="v-analytics-chips" aria-hidden>
        <span data-ambient-float data-ambient-amp="7"><b>+18%</b> pipeline</span>
        <span data-ambient-float data-ambient-amp="5"><b>23%</b> conversão</span>
        <span data-ambient-float data-ambient-amp="9"><b>R$ 152k</b> previsto</span>
      </div>
    </div>
  );
}

/* ───────────── Benefícios (constelação) ───────────── */
const ICONS: Record<string, string> = {
  bolt: "M13 2 4 14h6l-1 8 9-12h-6z",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  funnel: "M3 4h18l-7 8v6l-4 2v-8z",
  robot: "M12 2v3m-5 3h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zm2 5v2m6-2v2",
  chart: "M4 20V10m5 10V4m5 16v-7m5 7V8",
  chat: "M4 5h16v10H8l-4 4z",
  shield: "M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z",
  plug: "M9 3v6m6-6v6M7 9h10v3a5 5 0 0 1-10 0zm5 8v4",
};

export function BenefitsVisual() {
  return (
    <div className="v-benefits">
      {BENEFITS.map((b) => (
        <InteractiveSurface key={b.title} className="v-benefit" intensity={0.4} glow>
          <svg viewBox="0 0 24 24" className="v-benefit-icon" aria-hidden>
            <path d={ICONS[b.icon]} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <h3>{b.title}</h3>
          <p>{b.copy}</p>
        </InteractiveSurface>
      ))}
    </div>
  );
}

/* ───────────── Antes / Depois ───────────── */
export function BeforeAfterVisual() {
  const [pos, setPos] = useState(52);
  return (
    <div className="v-ba" style={{ "--ba": `${pos}%` } as CSSProperties}>
      <div className="v-ba-panel v-ba-before">
        <span className="v-ba-tag">Sem KORUVISION</span>
        <ul>{BEFORE_AFTER.before.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div className="v-ba-panel v-ba-after">
        <span className="v-ba-tag v-ba-tag--good">Com KORUVISION</span>
        <ul>{BEFORE_AFTER.after.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div className="v-ba-divider" style={{ left: `${pos}%` }}>
        <span className="v-ba-handle" aria-hidden>⟷</span>
      </div>
      <input
        className="v-ba-range"
        type="range"
        min={12}
        max={88}
        value={pos}
        aria-label="Comparar antes e depois"
        onChange={(e) => setPos(Number(e.target.value))}
      />
    </div>
  );
}

/* ───────────── Cases ───────────── */
export function CasesVisual() {
  return (
    <div className="v-cases">
      {CASES.map((c) => (
        <InteractiveSurface key={c.vertical} className="v-case" intensity={0.4}>
          <span className="v-case-vertical">{c.vertical}</span>
          <div className="v-case-metric">{c.metric}<small>{c.label}</small></div>
          <p>{c.copy}</p>
        </InteractiveSurface>
      ))}
    </div>
  );
}

/* ───────────── Prova unificada (stats + depoimentos + integrações) ───────────── */
export function ProofVisual() {
  return (
    <div className="v-proof">
      <div className="v-proof-stats">
        {SOCIAL_STATS.map((s) => (
          <div key={s.label} className="v-proof-stat" data-ambient-breathe>
            <strong>{resolveProofMetric(s.label, s.value)}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="v-proof-quotes">
        {TESTIMONIALS.slice(0, 2).map((t) => (
          <InteractiveSurface key={t.name} className="v-proof-quote" intensity={0.35}>
            <p>“{t.quote}”</p>
            <div className="v-quote-who">
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
          </InteractiveSurface>
        ))}
      </div>
      <div className="v-proof-integrations" aria-label="Integrações">
        {INTEGRATIONS.slice(0, 8).map((n) => (
          <span key={n} className="v-proof-chip">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Social proof ───────────── */
export function SocialVisual() {
  return (
    <div className="v-social">
      <div className="v-social-stats">
        {SOCIAL_STATS.map((s) => (
          <div key={s.label} className="v-social-stat" data-ambient-breathe>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="v-social-quotes">
        {TESTIMONIALS.map((t) => (
          <InteractiveSurface key={t.name} className="v-quote" intensity={0.35}>
            <p>“{t.quote}”</p>
            <div className="v-quote-who"><strong>{t.name}</strong><span>{t.role}</span></div>
          </InteractiveSurface>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Integrações (órbita) ───────────── */
export function IntegrationsVisual() {
  return (
    <div className="v-orbit">
      <div className="v-orbit-core" data-ambient-breathe>
        <span className="v-orbit-core-dot" />
        <strong>CRM</strong>
      </div>
      <div className="v-orbit-ring v-orbit-ring--1" data-ambient-orbit data-orbit-dur="44">
        {INTEGRATIONS.slice(0, 5).map((n, i) => (
          <span key={n} className="v-orbit-chip" style={{ "--a": `${(i / 5) * 360}deg` } as CSSProperties}>{n}</span>
        ))}
      </div>
      <div className="v-orbit-ring v-orbit-ring--2" data-ambient-orbit data-orbit-dur="64">
        {INTEGRATIONS.slice(5).map((n, i) => (
          <span key={n} className="v-orbit-chip" style={{ "--a": `${(i / 5) * 360}deg` } as CSSProperties}>{n}</span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Agência + segurança ───────────── */
export function AgencyVisual() {
  return (
    <div className="v-agency">
      <InteractiveSurface className="v-agency-card" intensity={0.5}>
        <UIAgencyTenants />
      </InteractiveSurface>
      <div className="v-agency-trust">
        {["Criptografia", "LGPD", "Auditoria", "Backups"].map((t) => (
          <span key={t} data-ambient-glow>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Planos + FAQ ───────────── */
const PLAN_PRICE_NUM: Record<string, number> = {
  Starter: 97,
  Pro: 197,
  Agency: 497,
};

function formatPlanPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export function PlansVisual() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="v-plans-wrap">
      <div className="v-plans-billing">
        <button
          type="button"
          className={`v-plans-billing__opt${!annual ? " is-active" : ""}`}
          onClick={() => setAnnual(false)}
        >
          Mensal
        </button>
        <button
          type="button"
          className={`v-plans-billing__opt${annual ? " is-active" : ""}`}
          onClick={() => setAnnual(true)}
        >
          Anual
          <em>−20%</em>
        </button>
      </div>
      <div className="v-plans">
        {PLANS.map((p) => {
          const base = PLAN_PRICE_NUM[p.name] ?? 0;
          const price = annual ? Math.round(base * 0.8) : base;
          const period = annual ? "/mês · cobrado anualmente" : p.period;
          return (
            <InteractiveSurface key={p.name} className={`v-plan ${p.popular ? "v-plan--popular" : ""}`} intensity={0.4} glow={p.popular}>
              {p.popular && <span className="v-plan-badge">Mais escolhido</span>}
              <h3>{p.name}</h3>
              <div className="v-plan-price">
                <span className="v-plan-price__value">{formatPlanPrice(price)}</span>
                <span className="v-plan-price__period">{period}</span>
              </div>
              <p className="v-plan-copy">{p.copy}</p>
              <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <a className={p.popular ? "btn-primary" : "btn-ghost"} href="#s-cta-eco">
                Começar grátis
              </a>
            </InteractiveSurface>
          );
        })}
      </div>
      <div className="v-faq">
        {FAQ.map((item) => (
          <details key={item.q} className="v-faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Setup (timeline com SVG DrawSVG) ───────────── */
export function SetupVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const line = el.querySelector<SVGLineElement>(".v-setup-spine-line");
    if (!line) return;
    const len = line.getTotalLength();
    gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
    const st = gsap.to(line, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
    });
    return () => { st.scrollTrigger?.kill(); st.kill(); };
  }, []);

  return (
    <div ref={ref} className="v-setup">
      <svg className="v-setup-spine" viewBox="0 0 8 300" preserveAspectRatio="none" aria-hidden>
        <line className="v-setup-spine-line" x1="4" y1="6" x2="4" y2="294" stroke="#FFC233" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="v-setup-steps">
        {SETUP_STEPS.map((s) => (
          <InteractiveSurface key={s.n} className="v-setup-step" intensity={0.35} glow={false}>
            <span className="v-setup-n">{s.n}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </div>
          </InteractiveSurface>
        ))}
      </div>
    </div>
  );
}
