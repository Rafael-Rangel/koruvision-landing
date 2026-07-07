"use client";

import { useRef, useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { ScrollTrigger } from "@/lib/gsap/register";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import { FourPillars3D } from "@/components/3d/nv11/protagonists";
import { NeuralFlowCanvas } from "@/components/motion/NeuralFlowCanvas";
import { PILLARS } from "@/config/landing-v10";
import { LPS_PILLARS } from "../config";
import {
  isCurrentPillar,
  organismCardLit,
  pillarCardLit,
  pillarsScrollMap,
} from "../lib/pillars-choreography";
import { LpsPillarPreview } from "./LpsPillarPreview";

const PIN_VH = 220;
const PIN_MOBILE_VH = 175;
const OWL_FLOW_SELECTOR = "#owl-chaos-flow";
const PROGRESS_HOLD = 0.22;

function owlFlowHasExited(): boolean {
  if (typeof document === "undefined") return false;
  const owl = document.querySelector<HTMLElement>(OWL_FLOW_SELECTOR);
  if (!owl) return true;
  return owl.getBoundingClientRect().bottom <= 1;
}

export function LpsPillars() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const map = pillarsScrollMap(progress);

  usePinSection(
    pinRef,
    {
      pinVh: PIN_VH,
      pinMobileVh: PIN_MOBILE_VH,
      scrub: 0.42,
      smoothDuration: 0,
      anticipatePin: 0,
      progressHold: PROGRESS_HOLD,
      onUpdate: (p) => {
        if (!owlFlowHasExited()) {
          setProgress(0);
          pinRef.current?.classList.remove("is-scrolling");
          return;
        }
        setProgress(p);
        pinRef.current?.classList.toggle("is-scrolling", p > 0.01);
      },
    },
    []
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  const ambientStyle = {
    "--p4-theme-a": map.themeA,
    "--p4-theme-b": map.themeB,
    "--p4-grid": map.gridRgb,
    "--p4-ambient": map.ambientOpacity,
    "--p4-glow": map.glowOpacity,
  } as CSSProperties;

  return (
    <section className="lps-p4" id="lps-pilares" style={{ "--p4-hue": "200" } as CSSProperties}>
      <div ref={pinRef} className="lps-p4__pin">
        <div className="lps-p4__ambient" style={ambientStyle} aria-hidden>
          <div className="lps-p4__aurora lps-p4__aurora--a" />
          <div className="lps-p4__aurora lps-p4__aurora--b" />
          <div className="lps-p4__grid" />
          <NeuralFlowCanvas progress={map.meshProgress} className="lps-p4__mesh" />
        </div>

        <div className="lps-p4__stage">
          <header
            className="lps-p4__copy"
            style={{
              opacity: map.copyOpacity,
              transform: `translate3d(0, ${(1 - map.copyOpacity) * 18}px, 0)`,
            }}
          >
            <p className="lps-eyebrow">{LPS_PILLARS.eyebrow}</p>
            <h2 className="lps-headline lps-p4__headline">
              {LPS_PILLARS.headline} <em>{LPS_PILLARS.headlineEm}</em>
            </h2>
            <p className="lps-sub lps-p4__sub">{LPS_PILLARS.subheadline}</p>
          </header>

          <div className="lps-p4__hero">
            <div
              className="lps-p4__three-d"
              style={{
                opacity: map.isClimax ? 0.5 + (1 - map.focus) * 0.25 : 0.7 + map.focus * 0.3,
                transform: `scale(${map.isClimax ? 0.9 : 0.92 + map.focus * 0.06})`,
              }}
            >
              <FourPillars3D progress={map.threeDProgress} />
            </div>

            <div className="lps-p4__preview-wrap">
              <div
                className="lps-p4__preview-glow"
                style={{
                  opacity: map.glowOpacity,
                  background: `radial-gradient(ellipse 70% 60% at 50% 45%, rgba(${map.themeA}, 0.45), transparent 70%)`,
                }}
                aria-hidden
              />
              <LpsPillarPreview map={map} />
            </div>
          </div>

          <div className="lps-p4__rail" aria-label="Quatro pilares da plataforma">
            <div
              className="lps-p4__rail-track"
              aria-hidden
              style={{
                transform: `scaleX(${map.isClimax ? 1 : map.railProgress})`,
                background: `linear-gradient(90deg, rgba(${map.themeA}, 0.85), rgba(${map.themeB}, 0.55))`,
                opacity: 0.35 + map.focus * 0.65,
              }}
            />
            {PILLARS.map((pillar, i) => {
              const lit = pillarCardLit(map, i);
              const current = isCurrentPillar(map, i);
              return (
                <article
                  key={pillar.key}
                  className={`lps-p4__chip${lit > 0.55 ? " is-lit" : ""}${current ? " is-current" : ""}`}
                  style={
                    {
                      "--lit": lit,
                      "--chip-accent": map.themeA,
                      opacity: 0.38 + lit * 0.62,
                    } as CSSProperties
                  }
                >
                  <span className="lps-p4__chip-n">0{i + 1}</span>
                  <strong>{pillar.title}</strong>
                  <p>{pillar.copy}</p>
                  <span className="lps-p4__chip-meter" style={{ transform: `scaleX(${lit})` }} />
                </article>
              );
            })}
            <article
              className={`lps-p4__chip lps-p4__chip--organism${map.isClimax && map.focus > 0.4 ? " is-lit is-current" : ""}`}
              style={{
                opacity: 0.38 + organismCardLit(map) * 0.62,
                "--lit": organismCardLit(map),
              } as CSSProperties}
            >
              <span className="lps-p4__chip-n">→</span>
              <strong>Um organismo</strong>
              <p>Sincronia total na mesma tela.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
