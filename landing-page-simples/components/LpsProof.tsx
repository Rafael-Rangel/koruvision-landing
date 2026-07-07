"use client";

import { useRef, useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register";
import { LPS_PROOF } from "../config";

function animateStat(el: HTMLElement, target: string) {
  const cleaned = target.replace(/\./g, "").replace(",", ".");
  const numMatch = cleaned.match(/^([+−-]?)(\d+(?:\.\d+)?)(.*)$/i);
  if (!numMatch || /[M/]/.test(target)) {
    el.textContent = target;
    return;
  }
  const [, sign, numStr, suffix] = numMatch;
  const end = parseFloat(numStr);
  const obj = { v: 0 };
  gsap.to(obj, {
    v: end,
    duration: 1.6,
    ease: "power2.out",
    onUpdate: () => {
      const decimals = numStr.includes(".") ? 1 : 0;
      el.textContent = `${sign ?? ""}${obj.v.toFixed(decimals)}${suffix}`;
    },
  });
}

export function LpsProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll<HTMLElement>("[data-stat]").forEach((el) => {
        const target = el.dataset.stat;
        if (!target) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => animateStat(el, target),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="lps-section" id="lps-prova" ref={sectionRef}>
      <div className="lps-inner">
        <div className="lps-split">
          <div className="lps-split__copy lps-reveal">
            <p className="lps-eyebrow">{LPS_PROOF.eyebrow}</p>
            <h2 className="lps-headline">
              {LPS_PROOF.headline} <em>{LPS_PROOF.headlineEm}</em>
            </h2>
            <p className="lps-sub">{LPS_PROOF.subheadline}</p>
            <div className="lps-stats">
              {LPS_PROOF.stats.map((s) => (
                <div key={s.label} className="lps-stat">
                  <strong data-stat={s.value}>0</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lps-split__media lps-reveal">
            <div className="lps-media-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LPS_PROOF.image} alt="" width={1600} height={1200} loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
        <div className="lps-reveal" style={{ marginTop: "3rem" }}>
          <div className="lps-plans-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {LPS_PROOF.cases.map((c) => (
              <article key={c.vertical} className="lps-pillar-card" style={{ flex: "unset" }}>
                <div className="lps-pillar-card__n">{c.vertical}</div>
                <h3>
                  {c.metric} <span style={{ fontSize: "0.85rem", color: "var(--sub)" }}>{c.label}</span>
                </h3>
                <p>{c.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
