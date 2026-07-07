"use client";

import { useRef, useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { ScrollTrigger } from "@/lib/gsap/register";
import { SectionVisionBridge, type VisionBridgeScrubMode } from "@/sections/SectionVisionBridge";
import { SceneProblem } from "@/sections/v10/scenes";
import { usePinSection } from "@/lib/hooks/useGsapContext";
import {
  OWL_CHAOS_FLOW_PIN_VH,
  OWL_CHAOS_FLOW_PIN_MOBILE_VH,
  owlChaosFlowMap,
  visionBridgeVideoExit,
} from "@/lib/scene-choreography";
import { OWL_CFG, PROBLEM_CFG } from "@/config/landing-v10";
import { smoothrange } from "@/lib/motion-system";

const FLOW_OWL_END = 0.42;
const FLOW_REVEAL_END = 0.72;

interface OwlChaosFlowProps {
  scrubMode?: VisionBridgeScrubMode;
  problemCopy?: typeof PROBLEM_CFG;
  pointsBar?: boolean;
  unifiedCard?: boolean;
}

/**
 * Pin único S02→S03 — coruja abre o olho, zoom na pupila, íris revela o caos operacional.
 */
export function OwlChaosFlow({
  scrubMode = "frames",
  problemCopy = PROBLEM_CFG,
  pointsBar = false,
  unifiedCard = true,
}: OwlChaosFlowProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const [flow, setFlow] = useState(() => owlChaosFlowMap(0));

  usePinSection(
    pinRef,
    {
      pinVh: OWL_CHAOS_FLOW_PIN_VH,
      pinMobileVh: OWL_CHAOS_FLOW_PIN_MOBILE_VH,
      scrub: OWL_CFG.scrub,
      smoothDuration: 0.18,
      onUpdate: (p) => setFlow(owlChaosFlowMap(p)),
    },
    []
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  const exitProgress =
    flow.phase === "exit" || flow.phase === "reveal"
      ? 0.82 + smoothrange(flow.global, FLOW_OWL_END, FLOW_REVEAL_END) * 0.18
      : flow.phase === "owl"
        ? Math.min(flow.s02Progress, 0.78)
        : 1;
  const exit = visionBridgeVideoExit(Math.min(1, exitProgress));

  const s02Style: CSSProperties = {
    opacity: flow.s02Opacity,
    transform: `scale(${exit.scale})`,
    filter: exit.blur > 0.01 ? `blur(${exit.blur}px)` : undefined,
    transformOrigin: "50% 42%",
    willChange: "opacity, transform, filter",
  };

  const s03Style: CSSProperties = {
    opacity: flow.s03Opacity,
    pointerEvents: flow.s03Opacity > 0.4 ? "auto" : "none",
  };

  return (
    <div className="flow-couple flow-couple--owl-chaos flow-couple--unified" id="owl-chaos-flow">
      <div ref={pinRef} className="flow-couple__pin" id="s02-vision-pin">
        <div className="flow-couple__stage">
          <div className="flow-couple__s02" style={s02Style}>
            <SectionVisionBridge cfg={OWL_CFG} scrubMode={scrubMode} embedded progress={flow.s02Progress} />
          </div>

          {flow.phase === "exit" || flow.phase === "reveal" ? (
            <>
              <div
                className="s02-vision-exit-tunnel"
                style={{
                  opacity: exit.tunnel * flow.s02Opacity,
                  background: `radial-gradient(circle at 50% 42%, transparent ${exit.irisRadius}vmin, rgba(3,6,15,0.96) ${exit.irisRadius + 1.5}vmin)`,
                }}
                aria-hidden
              />
              <div
                className="s02-vision-exit-mist"
                style={{ opacity: exit.mist * flow.s02Opacity }}
                aria-hidden
              />
              <div
                className="s02-vision-exit-blackout"
                style={{ opacity: exit.blackout * flow.s02Opacity }}
                aria-hidden
              />
            </>
          ) : null}

          <div className="flow-couple__s03" style={s03Style} id="cena-problema-pin">
            <SceneProblem
              copy={problemCopy}
              pointsBar={pointsBar}
              unifiedCard={unifiedCard}
              embedded
              blendEnter
              rawProgress={flow.s03RawProgress}
              animProgress={flow.s03AnimProgress}
              irisReveal={flow.irisReveal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
