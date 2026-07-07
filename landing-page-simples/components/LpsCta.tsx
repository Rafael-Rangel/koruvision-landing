"use client";

import { useRef, useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register";
import { LPS, LPS_CTA } from "../config";

export function LpsCta() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelector(".lps-cta__inner"), {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
      });

      gsap.to(el.querySelector(".lps-cta__bg img"), {
        scale: 1.08,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="lps-cta" id="lps-cta" ref={ref}>
      <div className="lps-cta__bg" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LPS_CTA.image} alt="" width={1920} height={1080} decoding="async" />
      </div>
      <div className="lps-cta__veil" aria-hidden />
      <div className="lps-cta__inner">
        <h2 className="lps-headline" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          {LPS_CTA.headline}
        </h2>
        <p className="lps-sub" style={{ margin: "0 auto 1.5rem" }}>
          {LPS_CTA.subheadline}
        </p>
        <div className="lps-actions" style={{ justifyContent: "center" }}>
          <a href={LPS.signupHref} className="lps-btn lps-btn--primary">
            {LPS.ctaPrimary}
          </a>
          <a href="#lps-planos" className="lps-btn lps-btn--ghost">
            {LPS.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
