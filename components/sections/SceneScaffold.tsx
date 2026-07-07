"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { gsap, SplitText, registerGsap } from "@/lib/gsap/register";
import { MagneticButton } from "@/components/motion/MagneticButton";
import type { SceneCopy } from "@/config/landing-v10";

interface SceneScaffoldProps {
  copy: SceneCopy;
  children?: ReactNode;
  className?: string;
  layout?: "split" | "stack" | "center";
  visualFirst?: boolean;
  /** S03 — mockup + copy dentro de um único card */
  unifiedCard?: boolean;
  /** Pontos + CTA primário numa única faixa horizontal */
  pointsBar?: boolean;
}

/**
 * Wrapper de cena (componentes v10). Cuida de legibilidade, hue de continuidade
 * e do reveal cinematografico (SplitText em linhas + stagger de elementos).
 */
export function SceneScaffold({
  copy,
  children,
  className = "",
  layout = "split",
  visualFirst = false,
  unifiedCard = false,
  pointsBar = false,
}: SceneScaffoldProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const heading = root.querySelector<HTMLElement>(".scene-headline");
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);

      if (reduce || unifiedCard) {
        if (heading) gsap.set(heading, { opacity: 1, y: 0, clearProps: "transform" });
        gsap.set(reveals, { opacity: 1, y: 0 });
        return;
      }

      let split: SplitText | null = null;
      if (heading) {
        split = new SplitText(heading, { type: "lines", linesClass: "split-line", mask: "lines" });
        gsap.set(split.lines, { yPercent: 115 });
      }
      gsap.set(reveals, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 74%", once: true },
      });
      if (split) {
        tl.to(split.lines, { yPercent: 0, duration: 0.95, ease: "power4.out", stagger: 0.12 }, 0);
      }
      tl.to(reveals, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.09 }, 0.18);
    }, root);

    return () => ctx.revert();
  }, [copy.id, unifiedCard, pointsBar]);

  const copyHeader = (
    <>
      <div className="eyebrow" data-reveal>
        {copy.eyebrow}
      </div>
      <h2 className="section-headline scene-headline">
        {copy.headline}
        {copy.headlineEm ? (
          <>
            {copy.headlineBreakBeforeEm ? <br /> : " "}
            <em>{copy.headlineEm}</em>
          </>
        ) : null}
      </h2>
      {!pointsBar && copy.subheadline ? (
        <p className="section-lede" data-reveal>
          {copy.subheadline}
        </p>
      ) : null}
      {!pointsBar && copy.points ? (
        <ul className="scene-points" data-reveal>
          {copy.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      ) : null}
    </>
  );

  const copyCta =
    copy.ctaPrimary || copy.ctaSecondary ? (
      <div className="cta-row" data-reveal>
        {copy.ctaPrimary && (
          <MagneticButton href={copy.ctaPrimaryHref ?? "#s-cta-eco"}>{copy.ctaPrimary}</MagneticButton>
        )}
        {copy.ctaSecondary && (
          <MagneticButton href={copy.ctaSecondaryHref ?? "#s04"} variant="ghost">
            {copy.ctaSecondary}
          </MagneticButton>
        )}
      </div>
    ) : null;

  const pointsBarBlock =
    pointsBar && (copy.points?.length || copy.ctaPrimary) ? (
      <div className="scene-points-bar" data-reveal>
        {copy.points?.length ? (
          <ul className="scene-points scene-points--inline">
            {copy.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        ) : null}
        {copy.ctaPrimary ? (
          <MagneticButton href={copy.ctaPrimaryHref ?? "#s-cta-eco"}>{copy.ctaPrimary}</MagneticButton>
        ) : null}
      </div>
    ) : null;

  const copyBlock = (
    <div className={`scene-copy readability-panel${pointsBar ? " scene-copy--points-bar" : ""}`}>
      {copyHeader}
      {pointsBar ? pointsBarBlock : copyCta}
    </div>
  );

  return (
    <section
      ref={ref}
      id={copy.id}
      className={`scene scene--${layout} ${visualFirst ? "scene--visual-first" : ""} ${unifiedCard ? "scene--unified-card" : ""} ${pointsBar ? "scene--points-bar" : ""} ${className}`}
      style={{ "--scene-hue": String(copy.hue) } as CSSProperties}
    >
      {copy.bg && (
        <div className="scene-bg-atmos" aria-hidden data-ambient-breathe>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={copy.bg} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      <div className="scene-scrim" aria-hidden />
      <div className="scene-aura" aria-hidden data-ambient-glow />
      <div className={`section-inner scene-inner${unifiedCard ? " scene-inner--unified" : ""}`}>
        {unifiedCard ? (
          <div className="problem-mega-card problem-mega-card--stack">
            <div className="problem-mega-card__header scene-copy readability-panel">{copyHeader}</div>
            <div className="problem-mega-card__visual scene-visual">{children}</div>
            {(pointsBar ? pointsBarBlock : copyCta) ? (
              <div
                className={`problem-mega-card__cta${pointsBar ? " problem-mega-card__cta--points-bar" : ""}`}
              >
                {pointsBar ? pointsBarBlock : copyCta}
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {copyBlock}
            {children && <div className="scene-visual">{children}</div>}
          </>
        )}
      </div>
    </section>
  );
}
