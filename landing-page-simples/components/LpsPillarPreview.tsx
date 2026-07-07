"use client";

import type { CSSProperties } from "react";
import { smoothrange } from "@/lib/motion-system";
import { PILLARS } from "@/config/landing-v10";
import { pillarLayerOpacity, type PillarsScrollState } from "../lib/pillars-choreography";

const PILLAR_KEYS = ["atendimento", "ia", "pipeline", "automacao"] as const;

function InboxPreview({ t }: { t: number }) {
  const msgs = [
    { from: "lead", text: "Oi! Vi o anúncio. Tem horário?" },
    { from: "lead", text: "Preciso de resposta ainda hoje." },
    { from: "team", text: "Claro! Já te passo as opções ✓" },
  ];
  return (
    <div className="lps-p4-preview__ui lps-p4-preview__ui--inbox">
      <div className="lps-p4-preview__body">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`lps-p4-preview__bubble lps-p4-preview__bubble--${m.from}`}
            style={{ opacity: smoothrange(t, 0.15 + i * 0.1, 0.35 + i * 0.1) }}
          >
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function BrainPreview({ t }: { t: number }) {
  return (
    <div className="lps-p4-preview__ui lps-p4-preview__ui--brain">
      <div className="lps-p4-preview__brain-core" style={{ opacity: 0.45 + t * 0.55 }} />
      {["SDR", "Score", "Closer", "Tom"].map((n, i) => (
        <span
          key={n}
          className="lps-p4-preview__brain-node"
          style={{ opacity: smoothrange(t, 0.12 + i * 0.08, 0.32 + i * 0.08) }}
        >
          {n}
        </span>
      ))}
      <svg className="lps-p4-preview__brain-lines" viewBox="0 0 200 120" aria-hidden>
        <path d="M100 58 L42 32 M100 58 L158 30 M100 58 L36 88 M100 58 L164 90" stroke="rgba(139,92,246,0.45)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

function PipelinePreview({ t }: { t: number }) {
  const cols = [
    { label: "Novos", n: 24 },
    { label: "Quentes", n: 11 },
    { label: "Fechando", n: 6 },
  ];
  return (
    <div className="lps-p4-preview__ui lps-p4-preview__ui--pipeline">
      <div className="lps-p4-preview__pipeline-head">Pipeline · previsão R$ 128k</div>
      <div className="lps-p4-preview__kanban">
        {cols.map((c, i) => (
          <div key={c.label} className="lps-p4-preview__col" style={{ opacity: smoothrange(t, 0.12 + i * 0.1, 0.32 + i * 0.1) }}>
            <header>{c.label}</header>
            <div className="lps-p4-preview__deal" />
            <div className="lps-p4-preview__deal lps-p4-preview__deal--hot" />
            <span className="lps-p4-preview__col-n">{c.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationPreview({ t }: { t: number }) {
  const nodes = ["Lead entra", "IA qualifica", "WhatsApp", "CRM atualiza"];
  return (
    <div className="lps-p4-preview__ui lps-p4-preview__ui--auto">
      {nodes.map((n, i) => (
        <div key={n} className="lps-p4-preview__flow-row" style={{ opacity: smoothrange(t, 0.1 + i * 0.08, 0.28 + i * 0.08) }}>
          <span className="lps-p4-preview__flow-node">{n}</span>
          {i < nodes.length - 1 ? <span className="lps-p4-preview__flow-arrow">→</span> : null}
        </div>
      ))}
      <div className="lps-p4-preview__auto-badge" style={{ opacity: smoothrange(t, 0.5, 0.75) }}>
        24/7 · sem clique manual
      </div>
    </div>
  );
}

function OrganismPreview({ t }: { t: number }) {
  return (
    <div className="lps-p4-preview__ui lps-p4-preview__ui--organism">
      <div className="lps-p4-preview__organism-hub" style={{ transform: `scale(${0.88 + t * 0.18})` }}>
        <span>FlowIA</span>
        <small>um organismo</small>
      </div>
      {PILLAR_KEYS.map((k, i) => (
        <span
          key={k}
          className="lps-p4-preview__orbit"
          style={
            {
              "--a": `${i * 90}deg`,
              opacity: smoothrange(t, 0.12 + i * 0.07, 0.38 + i * 0.07),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

const PREVIEW_LABELS = ["Inbox omnichannel", "Agentes de IA", "Funil visual", "Fluxos automáticos", "Tela unificada"];

interface LpsPillarPreviewProps {
  map: PillarsScrollState;
}

export function LpsPillarPreview({ map }: LpsPillarPreviewProps) {
  const themeIndex = map.isClimax ? 4 : map.activeIndex;
  const title = map.isClimax ? "Um organismo" : PILLARS[map.activeIndex]?.title ?? "";
  const subtitle = map.isClimax
    ? "Quatro pilares em sincronia"
    : PILLARS[map.activeIndex]?.copy ?? "";
  const innerT = map.focus;

  const layers = [
    <InboxPreview key="0" t={innerT} />,
    <BrainPreview key="1" t={innerT} />,
    <PipelinePreview key="2" t={innerT} />,
    <AutomationPreview key="3" t={innerT} />,
    <OrganismPreview key="4" t={innerT} />,
  ];

  return (
    <div
      className="lps-p4-preview"
      style={{
        opacity: map.focus > 0.02 ? 0.55 + map.focus * 0.45 : 0,
        borderColor: `rgba(${map.themeA}, ${0.15 + map.focus * 0.35})`,
        boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 40px rgba(${map.themeA}, ${map.glowOpacity * 0.25})`,
      }}
    >
      <header className="lps-p4-preview__head" style={{ opacity: 0.4 + map.focus * 0.6 }}>
        <span className="lps-p4-preview__head-n">{map.isClimax ? "→" : `0${map.activeIndex + 1}`}</span>
        <div className="lps-p4-preview__head-text">
          <strong>{title}</strong>
          <small>{PREVIEW_LABELS[themeIndex]}</small>
        </div>
        <span className="lps-p4-preview__head-tag">{subtitle}</span>
        <span
          className="lps-p4-preview__head-meter"
          style={{
            transform: `scaleX(${map.focus})`,
            background: `linear-gradient(90deg, rgba(${map.themeA}, 0.9), rgba(${map.themeB}, 0.65))`,
          }}
          aria-hidden
        />
      </header>

      <div className="lps-p4-preview__chrome" aria-hidden>
        <span /><span /><span />
        <em>FlowIA · {PREVIEW_LABELS[themeIndex]}</em>
      </div>

      <div className="lps-p4-preview__layers">
        {layers.map((layer, i) => (
          <div
            key={i}
            className="lps-p4-preview__layer"
            style={{
              opacity: pillarLayerOpacity(map, i),
              pointerEvents: pillarLayerOpacity(map, i) > 0.5 ? "auto" : "none",
            }}
          >
            {layer}
          </div>
        ))}
      </div>
    </div>
  );
}
