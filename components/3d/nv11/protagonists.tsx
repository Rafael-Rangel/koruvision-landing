"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { smoothrange, lerp } from "@/lib/motion-system";
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
const PILLAR_DUELS = [
  { title: "Atendimento", pain: "WhatsApp solto", peak: 0.72 },
  { title: "Inteligência", pain: "Lead sem score", peak: 0.88 },
  { title: "Pipeline", pain: "Funil cego", peak: 1 },
  { title: "Automação", pain: "Tarefa manual", peak: 0.8 },
] as const;

export function FourPillars3D({ progress = 0 }: { progress?: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const hubGlow = smoothrange(progress, 0.35, 0.85);
  const spine = smoothrange(progress, 0.45, 0.92);

  useEffect(() => {
    const root = stageRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>(".pillar-3d").forEach((pillar, i) => {
      const rise = smoothrange(progress, 0.06 + i * 0.1, 0.32 + i * 0.1);
      const lit = smoothrange(progress, 0.22 + i * 0.14, 0.5 + i * 0.14);
      gsap.set(pillar, {
        scaleY: 0.15 + rise * PILLAR_DUELS[i].peak,
        boxShadow: `0 0 ${16 + lit * 36}px rgba(${lit > 0.45 ? "255,194,51" : "139,92,246"},${0.2 + lit * 0.45})`,
      });
    });
    const hub = root.querySelector(".pillars-3d__hub") as HTMLElement | null;
    if (hub) {
      gsap.set(hub, { scale: 0.85 + hubGlow * 0.35, opacity: 0.35 + hubGlow * 0.65 });
    }
  }, [progress, hubGlow]);

  return (
    <ProtagonistStage className="pillars-3d-wrap" progress={progress}>
      <div ref={stageRef} className="pillars-3d">
        <div className="pillars-3d__hub" style={{ opacity: hubGlow }} aria-hidden />
        <div className="pillars-3d__spine" style={{ opacity: spine, transform: `scaleY(${spine})` }} aria-hidden />
        {PILLAR_DUELS.map((pillar, i) => {
          const lit = smoothrange(progress, 0.22 + i * 0.14, 0.5 + i * 0.14);
          return (
            <div
              key={pillar.title}
              className={`pillar-3d${lit > 0.45 ? " is-active" : ""}`}
              style={{ "--i": cssIndex(i) } as CSSProperties}
            >
              <span className="pillar-3d__pain">{pillar.pain}</span>
              <span className="pillar-3d__label">{pillar.title}</span>
            </div>
          );
        })}
      </div>
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
const BRAIN_NODE_POS = [
  { left: 18, top: 22 },
  { left: 72, top: 18 },
  { left: 14, top: 68 },
  { left: 76, top: 72 },
];

export function NeuralBrainHub3D({ progress = 0 }: { progress?: number }) {
  const hubRef = useRef<HTMLDivElement>(null);
  const on = smoothrange(progress, 0.15, 0.45);

  useEffect(() => {
    const root = hubRef.current;
    if (!root) return;
    const core = root.querySelector(".brain-hub__core") as HTMLElement | null;
    if (core) {
      gsap.set(core, { scale: 0.88 + on * 0.22, rotateZ: Math.sin(progress * Math.PI * 2) * 2 });
    }
    root.querySelectorAll<HTMLElement>(".brain-agent").forEach((node, i) => {
      const nodeOn = smoothrange(progress, 0.25 + i * 0.08, 0.55 + i * 0.08);
      const pulse = 1 + Math.sin(progress * 14 + i) * 0.04 * nodeOn;
      gsap.set(node, {
        scale: (0.9 + nodeOn * 0.14) * pulse,
        boxShadow: `0 0 ${12 + nodeOn * 28}px rgba(139,92,246,${0.25 + nodeOn * 0.45})`,
      });
    });
  }, [progress, on]);

  return (
    <ProtagonistStage className="brain-hub" progress={progress}>
      <div ref={hubRef} className="brain-hub__mesh">
        <div className="brain-hub__core" style={{ opacity: on, boxShadow: `0 0 ${40 + on * 60}px rgba(139,92,246,${0.4 + on * 0.4})` }} />
        {AGENTS.map((a, i) => (
          <div
            key={a}
            className="brain-agent"
            style={
              {
                "--a": i,
                left: `${BRAIN_NODE_POS[i].left}%`,
                top: `${BRAIN_NODE_POS[i].top}%`,
                opacity: smoothrange(progress, 0.3 + i * 0.08, 0.5 + i * 0.08),
              } as CSSProperties
            }
          >
            {a}
          </div>
        ))}
      </div>
    </ProtagonistStage>
  );
}

/* ─── C09 Funil ─── */
const STAGES = ["Lead", "Qualificação", "Proposta", "Negociação", "Fechado"];
const PIPELINE_X = [12, 28, 44, 60, 76];
const PIPELINE_Y = [20, 32, 44, 56, 68];

export function SalesPipeline3D({ progress = 0 }: { progress?: number }) {
  const dealRef = useRef<HTMLDivElement>(null);
  const stageFloat = Math.min(4, progress * 4.2);
  const stageIdx = Math.min(4, Math.floor(stageFloat));

  useEffect(() => {
    const deal = dealRef.current;
    if (!deal) return;
    const i = Math.min(PIPELINE_X.length - 2, Math.max(0, Math.floor(stageFloat)));
    const t = stageFloat - i;
    const left = lerp(PIPELINE_X[i], PIPELINE_X[i + 1], t);
    const top = lerp(PIPELINE_Y[i], PIPELINE_Y[i + 1], t) + Math.sin(progress * 18) * 1.2;
    gsap.to(deal, {
      left: `${left}%`,
      top: `${top}%`,
      scale: 1 + smoothrange(progress, 0.7, 1) * 0.06,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [progress, stageFloat]);

  return (
    <ProtagonistStage className="pipeline-3d" progress={progress}>
      {STAGES.map((s, i) => (
        <div key={s} className={`pipeline-stage ${i <= stageIdx ? "is-active" : ""}`} style={{ "--i": cssIndex(i) } as CSSProperties}>
          <span>{s}</span>
        </div>
      ))}
      <div ref={dealRef} className="pipeline-deal pipeline-deal--motion">
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
