"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { smoothrange } from "@/lib/motion-system";
import { gsap } from "@/lib/gsap/register";

/** CSS custom properties must be stable strings (SSR ↔ client hydration). */
function cssIndex(i: number): string {
  return String(i);
}

function cssPct(value: number, decimals = 4): string {
  return `${value.toFixed(decimals)}%`;
}

interface ProtagonistStageProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  progress?: number;
}

export function ProtagonistStage({ children, className = "", tilt = true, progress = 0 }: ProtagonistStageProps) {
  const { stageRef, onMove, onLeave } = usePointerParallax({
    maxTiltX: 8,
    maxTiltY: 12,
    enabled: tilt,
  });
  const scale = 0.92 + smoothrange(progress, 0, 0.35) * 0.08;

  return (
    <div
      ref={stageRef}
      className={`protagonist-stage ${className}`}
      onPointerMove={tilt ? onMove : undefined}
      onPointerLeave={tilt ? onLeave : undefined}
      style={{ transform: `scale(${scale})` } as CSSProperties}
    >
      <div className="protagonist-stage__glow" aria-hidden />
      <div className="protagonist-stage__inner">{children}</div>
    </div>
  );
}

/* ─── C03 Chaos ─── */
const CHAOS_CARDS = [
  { label: "WhatsApp sem dono", type: "chat", x: 10, y: 20, r: -9 },
  { label: "Planilha quebrada", type: "sheet", x: 58, y: 12, r: 7 },
  { label: "Follow-up esquecido", type: "clock", x: 46, y: 62, r: -5 },
  { label: "Lead frio", type: "lead", x: 18, y: 68, r: 6 },
];

export function OperationalFogField({ progress = 0 }: { progress?: number }) {
  const consoleRef = useRef<HTMLDivElement>(null);
  const drift = smoothrange(progress, 0.05, 0.45);
  const heat = smoothrange(progress, 0.22, 0.62);
  const handoff = smoothrange(progress, 0.72, 1);
  const fracture = smoothrange(progress, 0.18, 0.58);
  const collapse = smoothrange(progress, 0.58, 0.9);
  const shards = Array.from({ length: 10 }, (_, i) => i);

  useEffect(() => {
    const root = consoleRef.current;
    if (!root) return;

    const panes = root.querySelectorAll<HTMLElement>(".operational-console__pane");

    gsap.set(root, {
      rotateX: 58 - collapse * 18,
      rotateY: -18 + progress * 26,
      rotateZ: -10 + collapse * 12,
      y: -18 * collapse,
      z: -150 * collapse,
      scale: 0.92 + drift * 0.1 - collapse * 0.05,
      transformPerspective: 1100,
      transformOrigin: "50% 55%",
    });

    gsap.set(panes, {
      x: (i) => (i - 1.5) * 18 * fracture,
      y: (i) => (i % 2 === 0 ? -18 : 16) * fracture - collapse * 10,
      z: (i) => 38 + i * 34 + fracture * (i + 1) * 18,
      rotateZ: (i) => (i - 1.5) * 5 * fracture,
      opacity: 1 - collapse * 0.18,
    });
  }, [collapse, drift, fracture, progress]);

  return (
    <ProtagonistStage className="operational-fog" progress={progress} tilt>
      <div className="operational-fog__mist" style={{ opacity: 0.45 + heat * 0.35 }} aria-hidden />
      <div ref={consoleRef} className="operational-console-3d" aria-label="Sistema operacional quebrado em 3D">
        <div className="operational-console__base">
          <div className="operational-console__topbar">
            <span />
            <span />
            <span />
            <strong>Operação dispersa</strong>
          </div>
          <div className="operational-console__screen">
            <div className="operational-console__rail">
              <i />
              <i />
              <i />
            </div>
            <div className="operational-console__rows">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="operational-console__dead-funnel">
              <b />
              <b />
              <b />
            </div>
          </div>
        </div>
        <div className="operational-console__pane operational-console__pane--chat">
          <small>WhatsApp</small>
          <strong>23 conversas sem dono</strong>
        </div>
        <div className="operational-console__pane operational-console__pane--sheet">
          <small>Planilha</small>
          <strong>dados quebrados</strong>
        </div>
        <div className="operational-console__pane operational-console__pane--sla">
          <small>SLA</small>
          <strong>{Math.max(9, Math.round(42 - progress * 33))}m sem resposta</strong>
        </div>
        <div className="operational-console__pane operational-console__pane--owner">
          <small>Venda</small>
          <strong>sem responsável</strong>
        </div>
      </div>
      <div className="operational-fog__funnel" style={{ opacity: 0.25 + drift * 0.45 }} aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="operational-fog__timer" style={{ "--heat": String(heat) } as CSSProperties}>
        <strong>{Math.max(9, Math.round(42 - progress * 33))}m</strong>
        <span>sem resposta</span>
      </div>
      {CHAOS_CARDS.map((card, i) => (
        <div
          key={card.label}
          className={`operational-card operational-card--${card.type}`}
          style={{
            "--i": cssIndex(i),
            "--x": cssPct(card.x + Math.sin(progress * 2 + i) * 2, 2),
            "--y": cssPct(card.y + Math.cos(progress * 2 + i) * 2, 2),
            "--r": `${card.r + heat * (i % 2 ? 4 : -4)}deg`,
            opacity: 0.35 + smoothrange(progress, i * 0.08, i * 0.08 + 0.35) * 0.65,
          } as CSSProperties}
        >
          <span className="operational-card__dot" />
          <span>{card.label}</span>
        </div>
      ))}
      <div className="operational-fog__broken-lines" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      {shards.map((i) => (
        <div
          key={i}
          className="operational-shard"
          style={{
            "--i": cssIndex(i),
            "--cx": cssPct(50 + Math.cos(i * 0.9) * (31 - handoff * 20), 2),
            "--cy": cssPct(47 + Math.sin(i * 1.1) * (26 - handoff * 16), 2),
            "--rz": `${i * 28 - 60}deg`,
            opacity: 0.18 + heat * 0.42,
          } as CSSProperties}
        />
      ))}
      <div className="operational-fog__gold-path" style={{ opacity: handoff, transform: `scaleY(${0.35 + handoff * 0.65})` }} aria-hidden />
    </ProtagonistStage>
  );
}

/* ─── C04 Pilares ─── */
const PILLAR_LABELS = ["Atendimento", "Inteligência", "Pipeline", "Automação"];
export function FourPillars3D({ progress = 0 }: { progress?: number }) {
  const rise = smoothrange(progress, 0.1, 0.5);
  return (
    <ProtagonistStage className="pillars-3d" progress={progress}>
      <div className="pillars-3d__hub" style={{ opacity: rise }} />
      {PILLAR_LABELS.map((label, i) => (
        <div
          key={label}
          className="pillar-3d"
          style={{ "--i": cssIndex(i), "--h": cssPct(rise * 100, 2) } as CSSProperties}
        >
          <span>{label}</span>
        </div>
      ))}
    </ProtagonistStage>
  );
}

/* ─── C06 Portais ─── */
export function OnboardingPortals3D({ progress = 0 }: { progress?: number }) {
  return (
    <ProtagonistStage className="portals-3d" progress={progress}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="portal-ring"
          style={{ opacity: smoothrange(progress, i * 0.2, i * 0.2 + 0.35), "--z": i } as CSSProperties}
        />
      ))}
    </ProtagonistStage>
  );
}

/* ─── C07 Cérebro ─── */
const AGENTS = ["SDR IA", "Closer", "Suporte", "Analytics"];
export function NeuralBrainHub3D({ progress = 0 }: { progress?: number }) {
  const on = smoothrange(progress, 0.15, 0.45);
  return (
    <ProtagonistStage className="brain-hub" progress={progress}>
      <div className="brain-hub__core" style={{ opacity: on, boxShadow: `0 0 ${40 + on * 60}px rgba(139,92,246,${0.4 + on * 0.4})` }} />
      {AGENTS.map((a, i) => (
        <div key={a} className="brain-agent" style={{ "--a": i, opacity: smoothrange(progress, 0.3 + i * 0.08, 0.5 + i * 0.08) } as CSSProperties}>
          {a}
        </div>
      ))}
    </ProtagonistStage>
  );
}

/* ─── C09 Funil ─── */
const STAGES = ["Lead", "Qualificação", "Proposta", "Negociação", "Fechado"];
export function SalesPipeline3D({ progress = 0 }: { progress?: number }) {
  const stageIdx = Math.min(4, Math.floor(progress * 5));
  return (
    <ProtagonistStage className="pipeline-3d" progress={progress}>
      {STAGES.map((s, i) => (
        <div key={s} className={`pipeline-stage ${i <= stageIdx ? "is-active" : ""}`} style={{ "--i": cssIndex(i) } as CSSProperties}>
          <span>{s}</span>
        </div>
      ))}
      <div className="pipeline-deal" style={{ "--stage": stageIdx } as CSSProperties}>
        Maria S. · R$ 2.400
      </div>
    </ProtagonistStage>
  );
}

/* ─── C10 Automação ─── */
export function AutomationSynapse3D({ progress = 0 }: { progress?: number }) {
  const flow = smoothrange(progress, 0.2, 0.9);
  return (
    <ProtagonistStage className="synapse-3d" progress={progress}>
      <svg viewBox="0 0 400 200" className="synapse-svg">
        <path d="M40 100 Q120 40 200 100 T360 100" fill="none" stroke="url(#synGrad)" strokeWidth="2" strokeDasharray="8 6" style={{ strokeDashoffset: 200 - flow * 200 }} />
        <defs>
          <linearGradient id="synGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#FFC233" />
          </linearGradient>
        </defs>
      </svg>
      {["Lead", "Qualificar", "E-mail", "Notificar", "Venda"].map((n, i) => (
        <div key={n} className="synapse-node" style={{ "--i": cssIndex(i), opacity: flow > i * 0.18 ? 1 : 0.3 } as CSSProperties}>{n}</div>
      ))}
    </ProtagonistStage>
  );
}

/* ─── C12 Constelação ─── */
export function BenefitsConstellation3D({ progress = 0 }: { progress?: number }) {
  return (
    <ProtagonistStage className="constellation-3d" progress={progress} tilt>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="constellation-star" style={{ opacity: smoothrange(progress, i * 0.05, i * 0.05 + 0.25), "--i": cssIndex(i) } as CSSProperties} />
      ))}
    </ProtagonistStage>
  );
}

/* ─── C13 Split ─── */
export function BeforeAfterSplit3D({ progress = 0 }: { progress?: number }) {
  const split = 50 + smoothrange(progress, 0.4, 0.9) * 15;
  return (
    <ProtagonistStage className="split-3d" progress={progress} tilt={false}>
      <div className="split-3d__before" />
      <div className="split-3d__after" style={{ clipPath: `inset(0 0 0 ${split}%)` }} />
      <div className="split-3d__handle" style={{ left: `${split}%` }} />
    </ProtagonistStage>
  );
}

/* ─── C14 Totens ─── */
const CASES_VERT = ["Saúde", "Imóveis", "Consultoria", "Agências", "E-commerce"];
export function VerticalTotems3D({ progress = 0 }: { progress?: number }) {
  return (
    <ProtagonistStage className="totems-3d" progress={progress}>
      {CASES_VERT.map((v, i) => (
        <div key={v} className="totem-3d" style={{ "--i": cssIndex(i), "--h": `${40 + i * 12}%`, opacity: smoothrange(progress, i * 0.08, i * 0.08 + 0.3) } as CSSProperties}>
          {v}
        </div>
      ))}
    </ProtagonistStage>
  );
}

/* ─── C16 Nexus ─── */
export function IntegrationNexus3D({ progress = 0 }: { progress?: number }) {
  const icons = ["WA", "IG", "Email", "Zapier", "Hook", "Sheets", "Cal", "API"];
  return (
    <ProtagonistStage className="nexus-3d" progress={progress}>
      <div className="nexus-core" />
      {icons.map((ic, i) => (
        <div key={ic} className="nexus-icon" style={{ "--i": cssIndex(i), opacity: smoothrange(progress, 0.2, 0.6) } as CSSProperties}>{ic}</div>
      ))}
    </ProtagonistStage>
  );
}

/* ─── C17 Portal ─── */
export function AgencyPortal3D({ progress = 0 }: { progress?: number }) {
  const open = smoothrange(progress, 0.25, 0.75);
  return (
    <ProtagonistStage className="agency-portal" progress={progress}>
      <div className="agency-portal__iris" style={{ transform: `scale(${0.6 + open * 0.5})`, opacity: 0.5 + open * 0.5 }} />
      <div className="agency-portal__grid" style={{ opacity: open }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="agency-tenant" />
        ))}
      </div>
    </ProtagonistStage>
  );
}

/* ─── C18 Planos ─── */
export function PricingMonoliths3D({ progress = 0 }: { progress?: number }) {
  const plans = [
    { name: "Starter", h: 0.75, accent: "#8B5CF6" },
    { name: "Pro", h: 1, accent: "#FFC233", popular: true },
    { name: "Agency", h: 0.9, accent: "#2EE8C0" },
  ];
  return (
    <ProtagonistStage className="pricing-monoliths" progress={progress}>
      {plans.map((p, i) => (
        <div
          key={p.name}
          className={`monolith ${p.popular ? "monolith--pro" : ""}`}
          style={{
            "--h": String(p.h),
            "--accent": p.accent,
            "--i": cssIndex(i),
            opacity: smoothrange(progress, i * 0.1, i * 0.1 + 0.35),
          } as CSSProperties}
        >
          {p.name}
        </div>
      ))}
    </ProtagonistStage>
  );
}
