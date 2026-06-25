"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { getSection, type SectionConfig } from "@/config/sections";
import { PinWrap, SectionHeadline } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { MagneticButton } from "@/components/motion/MagneticButton";
import {
  DeviceShell,
  UIKanbanBoard,
  UICalendarView,
} from "@/components/golden/GoldenUI";
import { MacInboxMockup, MacAutomationMockup, MacMetricsMockup } from "@/components/product/MacWindowMockup";
import { InteractiveSurface } from "@/components/motion/InteractiveSurface";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { elementState, smoothrange, smoothstep, lerp } from "@/lib/motion-system";
import { gsap, ScrollTrigger } from "@/lib/gsap/register";

const ACTS = [
  { label: "WhatsApp", copy: "Lead entra pelo WhatsApp — contexto capturado instantaneamente." },
  { label: "IA", copy: "Agente qualifica com personalidade da marca — score e intenção em tempo real." },
  { label: "Kanban", copy: "Maria avança no funil com snap magnético — R$ 2.400 em movimento." },
  { label: "Agenda", copy: "Consulta confirmada automaticamente — zero atrito operacional." },
  { label: "Dashboard", copy: "Pipeline R$ 47.800 e conversão 23% — visão executiva completa." },
];

const ACT_UI = [
  <MacInboxMockup key="wa" tilt={false} />,
  <MacAutomationMockup key="ia" tilt={false} />,
  <UIKanbanBoard key="kb" />,
  <UICalendarView key="cal" />,
  <MacMetricsMockup key="dash" tilt={false} />,
];

const CAM = [
  { z: -40, ry: -12, rx: 8, scale: 0.92 },
  { z: 50, ry: 8, rx: 4, scale: 1.04 },
  { z: 80, ry: -6, rx: -6, scale: 1.08 },
  { z: 35, ry: 10, rx: 6, scale: 1.02 },
  { z: -30, ry: 0, rx: -3, scale: 0.96 },
];

function getActProgress(p: number) {
  const clamped = Math.max(0, Math.min(1, p));
  const actF = clamped * ACTS.length;
  const idx = Math.min(ACTS.length - 1, Math.floor(actF));
  const local = idx === ACTS.length - 1 && clamped >= 1 ? 1 : actF - idx;
  return { idx, local, actF };
}

function cameraAt(actF: number) {
  const i = Math.min(CAM.length - 2, Math.max(0, Math.floor(actF)));
  const t = smoothstep(actF - i);
  const a = CAM[i];
  const b = CAM[i + 1];
  return {
    z: lerp(a.z, b.z, t),
    ry: lerp(a.ry, b.ry, t),
    rx: lerp(a.rx, b.rx, t),
    scale: lerp(a.scale, b.scale, t),
  };
}

export function SectionDemo({ cfg: cfgOverride }: { cfg?: SectionConfig }) {
  const cfg = cfgOverride ?? getSection("S04");
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [displayAct, setDisplayAct] = useState(0);

  const runScene = useCallback((p: number) => {
    const root = pinRef.current;
    if (!root) return;

    const { idx, local } = getActProgress(p);
    const cam = cameraAt(p * ACTS.length);

    const rig = root.querySelector(".camera-rig");
    if (rig) {
      gsap.set(rig, {
        z: cam.z + local * 6,
        rotateY: cam.ry + local * 3,
        rotateX: cam.rx,
        scale: cam.scale,
        transformPerspective: 1200,
      });
    }

    root.querySelectorAll(".ui-screen").forEach((screen, i) => {
      let opacity = 0;
      if (i === idx) {
        opacity = 1 - smoothrange(local, 0.78, 1) * 0.85;
      } else if (i === idx + 1) {
        opacity = smoothrange(local, 0.72, 1);
      } else if (i < idx) {
        opacity = 0;
      }
      gsap.set(screen, { opacity, pointerEvents: opacity > 0.5 ? "auto" : "none" });
    });

    root.querySelectorAll(".act-pip").forEach((pip, i) => {
      const active = i === idx;
      const st = elementState(local, 0.05, 0.2, 0.75, 0.95, { scaleIn: 0.9 });
      gsap.set(pip, {
        opacity: active ? 1 : 0.45,
        scale: active ? 1.05 : 1,
        borderColor: active ? "rgba(46,232,192,0.8)" : "rgba(30,41,64,0.8)",
      });
      pip.classList.toggle("active", active);
    });

    const copy = root.querySelector(".act-copy");
    if (copy) {
      const st = elementState(local, 0.08, 0.28, 0.72, 0.92, { yIn: 16 });
      gsap.set(copy, { opacity: st.opacity, y: st.y });
      if (copy.textContent !== ACTS[idx].copy) {
        copy.textContent = ACTS[idx].copy;
      }
    }

    const actNum = root.querySelector(".act-num");
    if (actNum) actNum.textContent = `${idx + 1} / ${ACTS.length}`;

    const ring = root.querySelector(".s04-progress-ring-fg") as SVGCircleElement | null;
    if (ring) {
      const len = ring.getTotalLength();
      ring.style.strokeDashoffset = `${len * (1 - p)}`;
    }

    const cta = root.querySelector(".s04-cta-wrap");
    if (cta) {
      const show = idx === ACTS.length - 1 && local > 0.35;
      gsap.set(cta, { opacity: show ? smoothrange(local, 0.35, 0.65) : 0, y: show ? 0 : 12 });
    }

    const chips = root.querySelectorAll(".s04-float-chip");
    chips.forEach((chip, i) => {
      const visible = (i === 0 && idx <= 1) || (i === 1 && idx >= 2 && idx <= 3) || (i === 2 && idx === 4);
      gsap.set(chip, { opacity: visible ? 0.9 : 0, y: visible ? 0 : 8 });
    });
  }, []);

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh!,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub,
      smoothDuration: 0.22,
      onUpdate: (p) => {
        setProgress(p);
        const { idx } = getActProgress(p);
        setDisplayAct((prev) => (prev !== idx ? idx : prev));
        runScene(p);
      },
    },
    []
  );

  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      runScene(0);
    }, 400);
    return () => clearTimeout(t);
  }, [runScene]);

  return (
    <PinWrap id="s04" pinVh={cfg.pinVh}>
      <div ref={pinRef} className="pin-section s04-section" id="s04">
        <SectionMediaLayers cfg={cfg} progress={progress} />

        <div className="s04-progress-ring" aria-hidden>
          <svg viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <circle
              className="s04-progress-ring-fg"
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#2EE8C0"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="113"
              strokeDashoffset="113"
              transform="rotate(-90 22 22)"
            />
          </svg>
        </div>

        <div className="section-inner s04-grid">
          <div className="s04-narrative">
            <div className="act-meta">
              <span className="act-num">1 / 5</span>
              <span className="act-hint">Role para percorrer os 5 atos</span>
            </div>
            <SectionHeadline
              eyebrow={cfg.eyebrow}
              headline={cfg.headline}
              headlineEm={cfg.headlineEm}
              subheadline={cfg.subheadline}
            />
            <div className="act-nav" role="tablist" aria-label="Atos da demonstração">
              {ACTS.map((a, i) => (
                <span
                  key={a.label}
                  role="tab"
                  aria-selected={i === displayAct}
                  className={`act-pip ${i === displayAct ? "active" : ""}`}
                >
                  {a.label}
                </span>
              ))}
            </div>
            <p className="act-copy">{ACTS[displayAct].copy}</p>
            <div className="s04-cta-wrap">
              <MagneticButton href="#s-cta-eco">{cfg.ctaPrimary}</MagneticButton>
            </div>
          </div>

          <div className="stage-zone">
            <div className="s04-float-chip c1">+1 lead qualificado</div>
            <div className="s04-float-chip c2">Maria → Fechado</div>
            <div className="s04-float-chip c3">R$ 47.800 pipeline</div>
            <div className="camera-rig" data-ambient-breathe>
              <InteractiveSurface className="device-stack-wrap" intensity={0.7}>
                <div className="device-stack">
                  {ACT_UI.map((ui, i) => (
                    <div key={ACTS[i].label} className={`ui-screen ui-screen-${i}`} aria-hidden={i !== displayAct}>
                      {i === 2 || i === 3 ? <DeviceShell>{ui}</DeviceShell> : ui}
                    </div>
                  ))}
                </div>
              </InteractiveSurface>
            </div>
          </div>
        </div>
      </div>
    </PinWrap>
  );
}
