"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap/register";
import { lerp, smoothrange } from "@/lib/motion-system";

interface ChaosLossCounterProps {
  scrollProgress?: number;
  slaMinutes?: number;
}

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

/** Contador de prejuízo — valores seguem o scroll diretamente (sem tween que reseta) */
export function ChaosLossCounter({ scrollProgress = 0, slaMinutes = 0 }: ChaosLossCounterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const targetMoney = Math.round(lerp(0, 4280, smoothrange(scrollProgress, 0.04, 0.9)));
  const targetMinutes = Math.round(
    lerp(0, Math.max(slaMinutes + 12, 52), smoothrange(scrollProgress, 0.04, 0.9))
  );
  const barScale = 0.35 + smoothrange(scrollProgress, 0, 1) * 0.65;

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(root.querySelector(".chaos-loss__ring"), {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    registerGsap();
    const pulse = pulseRef.current;
    if (!pulse) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (scrollProgress < 0.2) return;

    gsap.fromTo(
      pulse,
      { scale: 0.95, opacity: 0.35 },
      { scale: 1.1, opacity: 0, duration: 0.55, ease: "power2.out" }
    );
  }, [scrollProgress]);

  return (
    <div
      ref={rootRef}
      className="chaos-3d__panel chaos-3d__panel--loss"
      data-chaos-part="panel-loss"
      data-chaos-hover="panel"
    >
      <header data-chaos-hover="label">
        <span className="chaos-loss__icon" aria-hidden />
        <span>Prejuízo em tempo real</span>
        <em className="chaos-loss__live">ao vivo</em>
      </header>

      <div className="chaos-loss__body">
        <div className="chaos-loss__metric chaos-loss__metric--money">
          <span className="chaos-loss__label">Dinheiro perdido</span>
          <strong className="chaos-loss__money" data-chaos-hover="sla">
            {formatBRL(targetMoney)}
          </strong>
          <span className="chaos-loss__hint">leads sem resposta · follow-up zero</span>
        </div>

        <div className="chaos-loss__divider" aria-hidden />

        <div className="chaos-loss__metric chaos-loss__metric--time">
          <span className="chaos-loss__label">Tempo desperdiçado</span>
          <p className="chaos-loss__minutes">
            <strong data-chaos-hover="sla">{targetMinutes}</strong>
            <small>min hoje</small>
          </p>
          <span className="chaos-loss__hint">equipe apagando incêndio</span>
        </div>

        <div className="chaos-loss__meter" aria-hidden>
          <div className="chaos-loss__meter-track">
            <div
              className="chaos-loss__bar-fill"
              style={{
                transform: `scaleX(${barScale})`,
                transformOrigin: "left center",
              }}
            />
          </div>
          <span>escalando a cada minuto</span>
        </div>
      </div>

      <div ref={pulseRef} className="chaos-loss__pulse" aria-hidden />
      <div className="chaos-loss__ring" aria-hidden />
    </div>
  );
}
