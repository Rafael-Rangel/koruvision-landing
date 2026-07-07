"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap/register";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { smoothrange } from "@/lib/motion-system";
import {
  applySceneTransform,
  problemChaosAlerts,
  problemChaosStage,
  problemToPillarsHandoff,
} from "@/lib/scene-choreography";
import { ChaosLossCounter } from "@/components/hero/ChaosLossCounter";
import { ChaosSlaBadge } from "@/components/hero/ChaosSlaBadge";

interface OperationalChaos3DProps {
  scrollProgress?: number;
  className?: string;
}

const CORNER_ALERTS = [
  { label: "23 sem dono", tone: "chat" as const, x: 2, y: 2 },
  { label: "Lead esfriando", tone: "lead" as const, x: 78, y: 2 },
];

const WA_THREAD = [
  { text: "Oi! Vi o anúncio no Instagram. Quanto custa o implante?", from: "lead" as const },
  { text: "Preciso de horário essa semana, tem vaga?", from: "lead" as const, urgent: true },
  { text: "???? Alguém aí?", from: "lead" as const, urgent: true },
  { text: "Quero comprar!!! Me manda o PIX", from: "lead" as const, urgent: true },
  { text: "Cadê vocês?? Já faz 2 dias…", from: "lead" as const, urgent: true },
  { text: "Mensagem não entregue · sem resposta", from: "sys" as const, lost: true },
];

const CHART_BARS = [94, 76, 58, 36, 20, 9, 2];

/** Linha de tendência — queda acentuada (viewBox 0 0 120 48, y↓ = pior) */
const CHART_LINE_PATH = "M0 4 L17 10 L34 18 L51 28 L68 34 L85 40 L120 46";

const FUNNEL_STAGES = [
  { label: "Leads", value: "142", width: 100, tone: "high" as const },
  { label: "Qualif.", value: "?", width: 52, tone: "mid" as const },
  { label: "Fecham.", value: "3", width: 22, tone: "low" as const },
];

const SHARDS = [
  {
    side: "left",
    clip: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
    dx: -1,
    dy: -0.05,
    rot: -1.2,
    rotY: 1.5,
    rotX: 0.4,
  },
  {
    side: "right",
    clip: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
    dx: 1,
    dy: 0.04,
    rot: 1.2,
    rotY: -1.5,
    rotX: -0.4,
  },
] as const;

/** Rachadura só visual — card inteiro se move junto até o split tardio */
const SHATTER_ON = 0.68;

/** Rachadura — proporção wide (card horizontal) */
const CRACK_MAIN =
  "M280 0 L262 22 L298 44 L256 66 L302 88 L252 112 L296 136 L248 160 L292 184 L254 208 L300 232 L258 256 L294 280 L270 304 L280 320";

const CRACK_BRANCHES = [
  "M262 66 L228 72",
  "M298 44 L332 38",
  "M252 112 L218 120",
  "M296 136 L330 142",
  "M254 208 L220 214",
] as const;

const HOVER_PRESETS: Record<string, { enter: gsap.TweenVars; leave: gsap.TweenVars }> = {
  panel: {
    enter: { scale: 1.02, z: 14, duration: 0.32, ease: "power2.out" },
    leave: { scale: 1, z: 0, duration: 0.4, ease: "power2.out" },
  },
  msg: {
    enter: { scale: 1.07, z: 22, duration: 0.28, ease: "back.out(2)" },
    leave: { scale: 1, z: 0, duration: 0.35, ease: "power2.out" },
  },
  chip: {
    enter: { scale: 1.1, z: 28, duration: 0.3, ease: "back.out(2.2)" },
    leave: { scale: 1, z: 0, duration: 0.38, ease: "power2.out" },
  },
  bubble: {
    enter: { scale: 1.08, z: 26, duration: 0.3, ease: "back.out(2)" },
    leave: { scale: 1, z: 0, duration: 0.36, ease: "power2.out" },
  },
  thread: {
    enter: { scale: 1.05, z: 12, duration: 0.26, ease: "power2.out" },
    leave: { scale: 1, z: 0, duration: 0.32, ease: "power2.out" },
  },
  cell: {
    enter: { scale: 1.1, z: 10, rotate: 2, duration: 0.24, ease: "back.out(2)" },
    leave: { scale: 1, z: 0, rotate: 0, duration: 0.3, ease: "power2.out" },
  },
  bar: {
    enter: { scaleY: 1.35, z: 8, duration: 0.28, ease: "power2.out" },
    leave: { scaleY: 1, z: 0, duration: 0.32, ease: "power2.out" },
  },
  sla: {
    enter: { scale: 1.1, z: 16, duration: 0.3, ease: "back.out(2)" },
    leave: { scale: 1, z: 0, duration: 0.35, ease: "power2.out" },
  },
  title: {
    enter: { z: 8, duration: 0.28, ease: "power2.out" },
    leave: { z: 0, duration: 0.32, ease: "power2.out" },
  },
  dot: {
    enter: { scale: 1.35, duration: 0.22, ease: "back.out(3)" },
    leave: { scale: 1, duration: 0.28, ease: "power2.out" },
  },
  label: {
    enter: { scale: 1.03, z: 6, duration: 0.26, ease: "power2.out" },
    leave: { scale: 1, z: 0, duration: 0.3, ease: "power2.out" },
  },
};

function bindChaosHovers(root: HTMLElement) {
  const active = new WeakSet<Element>();

  const onOver = (e: PointerEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-chaos-hover]");
    if (!el || !root.contains(el) || active.has(el)) return;
    active.add(el);
    const kind = el.dataset.chaosHover ?? "label";
    const preset = HOVER_PRESETS[kind] ?? HOVER_PRESETS.label;
    gsap.to(el, { ...preset.enter, overwrite: "auto" });
  };

  const onOut = (e: PointerEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-chaos-hover]");
    if (!el || !root.contains(el)) return;
    const next = (e.relatedTarget as HTMLElement | null)?.closest<HTMLElement>("[data-chaos-hover]");
    if (next === el) return;
    active.delete(el);
    const kind = el.dataset.chaosHover ?? "label";
    const preset = HOVER_PRESETS[kind] ?? HOVER_PRESETS.label;
    gsap.to(el, { ...preset.leave, overwrite: "auto" });
  };

  root.addEventListener("pointerover", onOver);
  root.addEventListener("pointerout", onOut);
  return () => {
    root.removeEventListener("pointerover", onOver);
    root.removeEventListener("pointerout", onOut);
  };
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`chaos-3d__wa-icon ${className}`} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function ChartTrendIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`chaos-3d__panel-icon chaos-3d__panel-icon--chart ${className}`} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M4 19V5M4 19h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M7 14l4-5 4 3 5-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 4h2.5v2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FunnelIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`chaos-3d__panel-icon chaos-3d__panel-icon--funnel ${className}`} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M4 5h16l-5.5 7v6L12 20l-2.5-2V12L4 5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 2" opacity="0.7" />
    </svg>
  );
}

interface WindowContentProps {
  alerts: ReturnType<typeof problemChaosAlerts>;
  scrollProgress: number;
}

function ChaosWindowContent({ alerts, scrollProgress }: WindowContentProps) {
  return (
    <div className="chaos-3d__window">
      <div className="chaos-3d__titlebar" data-chaos-part="titlebar" data-chaos-hover="title">
        <div className="chaos-3d__traffic" aria-hidden>
          <span data-chaos-hover="dot" />
          <span data-chaos-hover="dot" />
          <span data-chaos-hover="dot" />
        </div>
        <span data-chaos-hover="label">Dashboard — Clínica Sorriso</span>
        <ChaosSlaBadge scrollProgress={scrollProgress} />
      </div>

      <div className="chaos-3d__body chaos-3d__body--stack">
        <div className="chaos-3d__row chaos-3d__row--hero">
          <div
            className="chaos-3d__panel chaos-3d__panel--wa"
            data-chaos-part="panel-wa"
            data-chaos-hover="panel"
          >
            <header data-chaos-hover="label">
              <WhatsAppIcon />
              <span>WhatsApp · Inbox</span>
              <em>+23 não lidas</em>
            </header>
            <div className="chaos-3d__thread chaos-3d__thread--chat">
              {WA_THREAD.map((msg, i) => (
                <div
                  key={`${msg.text}-${i}`}
                  className={`chaos-3d__chat-row chaos-3d__chat-row--${msg.from}${msg.lost ? " is-lost" : ""}`}
                >
                  {msg.from === "lead" ? <WhatsAppIcon className="chaos-3d__chat-avatar" /> : null}
                  <p
                    data-chaos-part="thread-msg"
                    data-chaos-hover="thread"
                    data-msg-index={i}
                    className={`chaos-3d__chat-bubble${msg.urgent ? " is-urgent" : ""}${msg.lost ? " is-lost" : ""}`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ChaosLossCounter scrollProgress={scrollProgress} slaMinutes={alerts.slaMinutes} />
        </div>

        <div className="chaos-3d__row">
          <div
            className="chaos-3d__panel chaos-3d__panel--chart"
            data-chaos-part="panel-chart"
            data-chaos-hover="panel"
          >
            <header data-chaos-hover="label">
              <ChartTrendIcon />
              Conversões — 7 dias
            </header>
            <div className="chaos-3d__chart" data-chaos-part="chart">
              <div className="chaos-3d__chart-axis" aria-hidden />
              <div className="chaos-3d__chart-bars">
                {CHART_BARS.map((h, i) => (
                  <span
                    key={i}
                    data-chaos-part="chart-bar"
                    data-chaos-hover="bar"
                    data-bar-index={i}
                    style={{ "--h": `${h}%` } as CSSProperties}
                  />
                ))}
              </div>
              <svg className="chaos-3d__chart-line" viewBox="0 0 120 48" aria-hidden>
                <path
                  d={CHART_LINE_PATH}
                  fill="none"
                  stroke="rgba(255, 100, 120, 0.75)"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={CHART_LINE_PATH}
                  fill="none"
                  stroke="rgba(255, 194, 51, 0.35)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
              </svg>
              <span className="chaos-3d__chart-drop" aria-hidden>↓</span>
            </div>
            <p className="chaos-3d__chart-note" data-chaos-hover="label">
              ↓ dados inconsistentes · sem dono
            </p>
          </div>

          <div
            className="chaos-3d__panel chaos-3d__panel--funnel"
            data-chaos-part="panel-funnel"
            data-chaos-hover="panel"
          >
            <header data-chaos-hover="label">
              <FunnelIcon />
              Funil de vendas
            </header>
            <div className="chaos-3d__funnel-h chaos-3d__funnel--broken" data-chaos-part="funnel">
              {FUNNEL_STAGES.map((stage, i) => {
                const heatShrink = alerts.heat * [0, 14, 8][i];
                const w = Math.max(stage.width - heatShrink, stage.tone === "low" ? 14 : 20);
                return (
                  <div key={stage.label} className="chaos-3d__funnel-h-group">
                    {i > 0 ? (
                      <span className={`chaos-3d__funnel-h-gap${i === 2 ? " is-critical" : ""}`} aria-hidden>
                        <svg viewBox="0 0 24 12" className="chaos-3d__funnel-h-arrow">
                          <path d="M2 6h14M14 3l5 3-5 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    ) : null}
                    <div
                      className={`chaos-3d__funnel-h-stage chaos-3d__funnel-h-stage--${stage.tone}`}
                      data-chaos-part="funnel-bar"
                      data-chaos-hover="bar"
                      data-bar-index={i}
                    >
                      <div className="chaos-3d__funnel-h-labels">
                        <em>{stage.label}</em>
                        <i>{stage.value}</i>
                      </div>
                      <div className="chaos-3d__funnel-h-track">
                        <span className="chaos-3d__funnel-h-bar" style={{ width: `${w}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p data-chaos-hover="label">Buracos no funil · follow-up perdido</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrackOverlay({
  opacity,
  draw,
  gapWidth,
}: {
  opacity: number;
  draw: number;
  gapWidth: number;
}) {
  const mainLen = 480;
  const offset = mainLen * (1 - draw);
  const branchDraw = Math.max(0, (draw - 0.18) / 0.82);
  const branchStyle = {
    strokeDasharray: 100,
    strokeDashoffset: 100 * (1 - branchDraw),
  };
  const voidW = 1.5 + gapWidth * 0.18;

  return (
    <div className="chaos-3d__crack-layer" style={{ opacity }}>
      <svg className="chaos-3d__crack-svg" viewBox="0 0 560 320" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="chaos-crack-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 220, 225, 0.9)" />
            <stop offset="50%" stopColor="rgba(255, 90, 110, 0.95)" />
            <stop offset="100%" stopColor="rgba(180, 40, 65, 0.8)" />
          </linearGradient>
        </defs>

        <path
          d={CRACK_MAIN}
          fill="none"
          stroke="rgba(0, 0, 0, 0.92)"
          strokeWidth={voidW + 1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: mainLen, strokeDashoffset: offset }}
        />

        <path
          d={CRACK_MAIN}
          fill="none"
          stroke="url(#chaos-crack-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: mainLen, strokeDashoffset: offset }}
        />

        <path
          d={CRACK_MAIN}
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="0.7"
          strokeLinecap="round"
          style={{ strokeDasharray: mainLen, strokeDashoffset: offset }}
        />

        {CRACK_BRANCHES.slice(0, 5).map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(255, 100, 120, 0.45)"
            strokeWidth="1"
            strokeLinecap="round"
            style={branchStyle}
          />
        ))}
      </svg>
    </div>
  );
}

export function OperationalChaos3D({ scrollProgress = 0, className = "" }: OperationalChaos3DProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const fractureRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const { onMove, onLeave, hovering } = usePointerParallax({
    containerRef: stageRef,
    targetRef: tiltRef,
    maxTiltX: 5,
    maxTiltY: 7,
    lift: 10,
    hoverScale: 1.015,
  });

  const stage = problemChaosStage(scrollProgress);
  const alerts = problemChaosAlerts(scrollProgress);
  const handoff = problemToPillarsHandoff(scrollProgress);
  const { gapX, gapY, shatter, lineOpacity, lineDraw, shardFly, gapWidth } = alerts.crack;
  const shake = alerts.shake;
  const collapse = alerts.collapse;
  const splitActive = shatter > SHATTER_ON;
  const splitT = splitActive ? smoothrange(shatter, SHATTER_ON, 1) : 0;
  const unifiedOpacity = 1 - splitT * 0.92;

  useEffect(() => {
    applySceneTransform(shellRef.current, stage);
  }, [stage]);

  useEffect(() => {
    const root = cardRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return bindChaosHovers(root);
  }, []);

  useEffect(() => {
    const root = cardRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.to(root.querySelectorAll('[data-chaos-part="thread-msg"].is-urgent'), {
        opacity: 0.94,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.3, from: "random" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const fracture = fractureRef.current;
    if (!fracture) return;

    gsap.set(fracture, {
      x: shake * 1.5 * Math.sin(scrollProgress * 14),
      y: shake * 0.8,
      rotateZ: shake * 0.25,
      scale: 1 - collapse * 0.025,
    });
  }, [scrollProgress, shake, collapse]);

  return (
    <div
      ref={stageRef}
      className={`chaos-3d-stage ${hovering ? "is-hover" : ""} ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={shellRef} className="chaos-3d-shell">
        <div ref={tiltRef} className="chaos-3d__tilt">
          <div ref={cardRef} className="chaos-3d">
            <div
              ref={fractureRef}
              className={`chaos-3d__fracture${splitActive ? " is-split" : ""}`}
              style={
                {
                  "--crack-gap": String(lineOpacity),
                  "--crack-width": `${gapWidth}px`,
                  "--split-t": String(splitT),
                } as CSSProperties
              }
            >
              <div className="chaos-3d__surface" style={{ opacity: unifiedOpacity }}>
                <ChaosWindowContent alerts={alerts} scrollProgress={scrollProgress} />
                <div className="chaos-3d__floats">
                  {CORNER_ALERTS.map((alert) => (
                    <div
                      key={alert.label}
                      data-chaos-float="chip"
                      data-chaos-hover="chip"
                      className={`chaos-3d__chip chaos-3d__chip--${alert.tone}`}
                      style={{
                        left: `${alert.x}%`,
                        top: `${alert.y}%`,
                      }}
                    >
                      {alert.tone === "chat" && <WhatsAppIcon className="chaos-3d__chip-wa" />}
                      {alert.label}
                    </div>
                  ))}
                </div>
              </div>

              {splitActive
                ? SHARDS.map((shard) => (
                    <div
                      key={shard.side}
                      className={`chaos-3d__shard chaos-3d__shard--${shard.side}`}
                      style={{
                        clipPath: shard.clip,
                        opacity: splitT,
                        transform: [
                          `translate3d(${shard.dx * gapX * splitT}px, ${shard.dy * gapY * splitT}px, 0)`,
                          `rotateY(${shard.rotY * splitT}deg)`,
                          `rotateX(${shard.rotX * splitT}deg)`,
                          `rotate(${shard.rot * splitT}deg)`,
                        ].join(" "),
                        filter: shardFly > 0.75 ? `blur(${(shardFly - 0.75) * 1.2}px)` : undefined,
                      }}
                    >
                      <ChaosWindowContent alerts={alerts} scrollProgress={scrollProgress} />
                      <div className="chaos-3d__floats" aria-hidden>
                        {CORNER_ALERTS.map((alert) => (
                          <div
                            key={alert.label}
                            className={`chaos-3d__chip chaos-3d__chip--${alert.tone}`}
                            style={{
                              left: `${alert.x}%`,
                              top: `${alert.y}%`,
                            }}
                          >
                            {alert.tone === "chat" && <WhatsAppIcon className="chaos-3d__chip-wa" />}
                            {alert.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                : null}

              <div
                className="chaos-3d__glow"
                style={{ opacity: 0.25 + alerts.heat * 0.35 }}
                aria-hidden
              />
              <div className="chaos-3d__shine" aria-hidden />
              <CrackOverlay opacity={lineOpacity} draw={lineDraw} gapWidth={gapWidth} />
            </div>
          </div>
        </div>

        <div className="chaos-3d__handoff" style={{ opacity: handoff.particleSuck }} aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              style={{
                "--i": String(i),
                "--rise": String(handoff.goldRise),
              } as CSSProperties}
            />
          ))}
        </div>
        <div
          className="chaos-3d__gold-path"
          style={{ opacity: handoff.goldRise, transform: `scaleY(${0.2 + handoff.goldRise * 0.8})` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
