"use client";

import { useRef, useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register";

interface LpsSplitSectionProps {
  id: string;
  eyebrow: string;
  headline: string;
  headlineEm?: string;
  subheadline: string;
  image: string;
  reverse?: boolean;
  points?: string[];
  children?: React.ReactNode;
}

export function LpsSplitSection({
  id,
  eyebrow,
  headline,
  headlineEm,
  subheadline,
  image,
  reverse,
  points,
  children,
}: LpsSplitSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const ctx = gsap.context(() => {
      gsap.from(img, {
        scale: 1.12,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.from(img, {
        clipPath: "inset(12% 12% 12% 12% round 20px)",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 35%",
          scrub: 0.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="lps-section" id={id} ref={sectionRef}>
      <div className={`lps-inner lps-split${reverse ? " lps-split--reverse" : ""}`}>
        <div className="lps-split__copy lps-reveal">
          <p className="lps-eyebrow">{eyebrow}</p>
          <h2 className="lps-headline">
            {headline}
            {headlineEm ? (
              <>
                {" "}
                <em>{headlineEm}</em>
              </>
            ) : null}
          </h2>
          <p className="lps-sub">{subheadline}</p>
          {points?.length ? (
            <ul className="lps-points">
              {points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          ) : null}
          {children}
        </div>
        <div className="lps-split__media lps-reveal">
          <div className="lps-media-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={image}
              alt=""
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
            />
            <div className="lps-media-frame__glow" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
