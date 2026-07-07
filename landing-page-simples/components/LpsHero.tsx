"use client";

import { useRef, useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register";
import { LPS, LPS_HERO } from "../config";

function splitHeadline(text: string) {
  return text.split(/\s+/).map((word, i) => (
    <span key={i} className="lps-split-line">
      <span>{word}&nbsp;</span>
    </span>
  ));
}

export function LpsHero() {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const lines = linesRef.current?.querySelectorAll<HTMLElement>(".lps-split-line span");
      if (lines?.length) {
        gsap.set(lines, { yPercent: 110, opacity: 0 });
        gsap.to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.15,
        });
      }

      gsap.from(".lps-hero__eyebrow, .lps-hero__sub, .lps-hero__actions", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      });

      if (accentRef.current) {
        gsap.to(accentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.7,
        });
      }

      const media = mediaRef.current;
      if (media) {
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(media, {
              scale: 1 + p * 0.18,
              y: p * 40,
            });
            if (accentRef.current) {
              gsap.set(accentRef.current, {
                y: -p * 60,
                rotate: p * 8,
              });
            }
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="lps-hero" ref={rootRef} id="lps-top">
      <div className="lps-hero__pin">
        <div className="lps-hero__media" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={mediaRef} src={LPS_HERO.image} alt="" decoding="async" />
        </div>
        <div className="lps-hero__veil" aria-hidden />
        <div className="lps-hero__content">
          <p className="lps-eyebrow lps-hero__eyebrow">{LPS_HERO.eyebrow}</p>
          <h1 className="lps-headline" ref={linesRef}>
            {splitHeadline(LPS_HERO.headline)}
          </h1>
          <p className="lps-sub lps-hero__sub">{LPS_HERO.subheadline}</p>
          <div className="lps-actions lps-hero__actions">
            <a href="#lps-cta" className="lps-btn lps-btn--primary">
              {LPS.ctaPrimary}
            </a>
            <a href={LPS.demoHref} className="lps-btn lps-btn--ghost">
              Ver o produto
            </a>
          </div>
        </div>
        <div className="lps-hero__accent" ref={accentRef} style={{ opacity: 0, transform: "scale(0.85)" }} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LPS_HERO.accent} alt="" />
        </div>
      </div>
    </section>
  );
}
