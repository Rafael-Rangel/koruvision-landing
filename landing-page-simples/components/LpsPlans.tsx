"use client";

import { useRef, useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register";
import { LPS, LPS_PLANS } from "../config";

export function LpsPlans() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".lps-plan");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 56,
        rotateX: 12,
        transformPerspective: 800,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 82%",
          once: true,
        },
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="lps-section" id="lps-planos">
      <div className="lps-inner lps-reveal">
        <p className="lps-eyebrow">{LPS_PLANS.eyebrow}</p>
        <h2 className="lps-headline">
          {LPS_PLANS.headline} <em>{LPS_PLANS.headlineEm}</em>
        </h2>
        <p className="lps-sub">{LPS_PLANS.subheadline}</p>
        <div className="lps-plans-grid" ref={gridRef}>
          {LPS_PLANS.plans.map((plan) => (
            <article
              key={plan.name}
              className={`lps-plan${plan.popular ? " lps-plan--popular" : ""}`}
            >
              {plan.popular ? <span className="lps-plan__badge">Popular</span> : null}
              <h3>{plan.name}</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--sub)", margin: 0 }}>{plan.copy}</p>
              <p className="lps-plan__price">
                {plan.price}
                <small>{plan.period}</small>
              </p>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="lps-actions" style={{ marginTop: "2rem", justifyContent: "center" }}>
          <a href={LPS.signupHref} className="lps-btn lps-btn--primary">
            {LPS.ctaPrimary}
          </a>
        </div>
      </div>
    </section>
  );
}
