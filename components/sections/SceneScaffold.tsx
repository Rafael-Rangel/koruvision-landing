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

      if (reduce) {
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
  }, [copy.id]);

  return (
    <section
      ref={ref}
      id={copy.id}
      className={`scene scene--${layout} ${visualFirst ? "scene--visual-first" : ""} ${className}`}
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
      <div className="section-inner scene-inner">
        <div className="scene-copy readability-panel">
          <div className="eyebrow" data-reveal>{copy.eyebrow}</div>
          <h2 className="section-headline scene-headline">
            {copy.headline}
            {copy.headlineEm ? <> <em>{copy.headlineEm}</em></> : null}
          </h2>
          <p className="section-lede" data-reveal>{copy.subheadline}</p>
          {copy.points && (
            <ul className="scene-points" data-reveal>
              {copy.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
          {(copy.ctaPrimary || copy.ctaSecondary) && (
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
          )}
        </div>
        {children && <div className="scene-visual">{children}</div>}
      </div>
    </section>
  );
}
