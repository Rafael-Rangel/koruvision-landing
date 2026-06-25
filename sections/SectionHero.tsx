"use client";

import { useRef, useState, useEffect } from "react";
import { getSection, type SectionConfig } from "@/config/sections";
import { PinWrap } from "@/components/sections/SectionShell";
import { SectionMediaLayers } from "@/components/motion/SectionMediaLayers";
import { HeroCinematicStack } from "@/components/motion/HeroCinematicStack";
import { HeroExperience } from "@/components/motion/HeroExperience";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { BrandMark } from "@/components/motion/BrandMark";
import { DeviceShell, UIWhatsAppChat } from "@/components/golden/GoldenUI";
import { usePinSection, applyState } from "@/lib/hooks/useGsapContext";
import { elementState, splitWords, smoothrange, lerp } from "@/lib/motion-system";
import {
  heroLayerTransform,
  heroWordTransform,
  applyHeroTransform,
} from "@/lib/hero-choreography";
import { gsap } from "@/lib/gsap/register";

export function SectionHero({ cfg: cfgOverride }: { cfg?: SectionConfig }) {
  const cfg = cfgOverride ?? getSection("S01");
  const isOwl = cfg.heroLayout === "owl";
  const isPremium = cfg.experienceMode === "premium";
  const isRiseLayout = isOwl && isPremium;
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (isRiseLayout) {
      setWordCount(0);
      return;
    }
    splitWords(headlineRef.current);
    const words = headlineRef.current?.querySelectorAll(".word").length ?? 0;
    setWordCount(words);
  }, [cfg.headline, isRiseLayout]);

  useEffect(() => {
    if (!isRiseLayout || !pinRef.current) return;
    const root = pinRef.current;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".s01-hero-copy-head > *"), {
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from(root.querySelectorAll(".s01-hero-copy-actions > *"), {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.45,
      });
      gsap.from(root.querySelector(".s01-hero-mockup-rig"), {
        opacity: 0,
        y: 80,
        scale: 0.55,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.35,
      });
    }, root);
    return () => ctx.revert();
  }, [isRiseLayout]);

  usePinSection(
    pinRef,
    {
      pinVh: cfg.pinVh!,
      pinMobileVh: cfg.pinMobileVh,
      scrub: cfg.scrub,
      smoothDuration: 0.18,
      onUpdate: (p) => {
        setProgress(p);

        if (isRiseLayout) {
          const rise = smoothrange(p, 0, 0.52);
          const stackLift = smoothrange(p, 0.1, 0.55);
          const expand = smoothrange(p, 0.34, 0.72);
          const exit = smoothrange(p, 0.72, 1);
          const rig = pinRef.current?.querySelector(".s01-hero-mockup-rig");
          const mockupWrap = pinRef.current?.querySelector(".s01-hero-mockup-wrap");
          const copyHead = pinRef.current?.querySelector(".s01-hero-copy-head");
          const copyActions = pinRef.current?.querySelector(".s01-hero-copy-actions");
          const beam = pinRef.current?.querySelector(".s01-hero-beam:not(.s01-hero-beam--gold)");
          const beamGold = pinRef.current?.querySelector(".s01-hero-beam--gold");
          const floor = pinRef.current?.querySelector(".s01-hero-floor-glow");

          if (mockupWrap) {
            (mockupWrap as HTMLElement).style.zIndex = String(Math.round(lerp(3, 24, stackLift)));
            gsap.set(mockupWrap, {
              alignItems: exit > 0 ? "center" : "flex-end",
            });
          }

          if (rig) {
            gsap.set(rig, {
              y: `${lerp(36, -14, rise) - exit * 36}%`,
              scale: lerp(0.58, 1.28, expand) + exit * 0.18,
              rotateX: lerp(22, 0, smoothrange(p, 0, 0.62)) - exit * 18,
              rotateY: lerp(-6, 0, smoothrange(p, 0, 0.62)),
              z: exit * -260,
              opacity: 1 - exit * 0.18,
              transformPerspective: 1500,
              transformOrigin: "50% 100%",
            });
          }

          if (copyHead) {
            gsap.set(copyHead, {
              y: lerp(0, -10, smoothrange(p, 0.44, 0.78)),
              opacity: 1 - smoothrange(p, 0.52, 0.84) * 0.88,
              scale: lerp(1, 0.96, smoothrange(p, 0.48, 0.82)),
              filter: `blur(${lerp(0, 6, stackLift)}px)`,
            });
          }

          if (copyActions) {
            gsap.set(copyActions, {
              y: lerp(0, -8, smoothrange(p, 0.42, 0.7)),
              opacity: 1 - smoothrange(p, 0.48, 0.76) * 0.92,
              pointerEvents: stackLift > 0.48 ? "none" : "auto",
            });
          }

          if (beam) {
            gsap.set(beam, {
              opacity: lerp(0.35, 0.85, rise),
              scaleY: lerp(0.7, 1.15, rise),
            });
          }
          if (beamGold) {
            gsap.set(beamGold, { opacity: lerp(0.15, 0.45, rise) });
          }
          if (floor) {
            gsap.set(floor, {
              opacity: lerp(0.25, 0.7, rise),
              scale: lerp(0.8, 1.2, rise),
            });
          }

          const handoff = pinRef.current?.querySelector(".s01-handoff-glow");
          if (handoff) {
            const t = Math.max(0, (p - 0.68) / 0.32);
            gsap.set(handoff, { opacity: t * 0.55, scale: 1 + t * 0.15 });
          }
        } else if (isOwl) {
          applyHeroTransform(eyebrowRef.current, heroLayerTransform(p, "eyebrow"));
          applyHeroTransform(ledeRef.current, heroLayerTransform(p, "lede"));
          applyHeroTransform(ctaRef.current, heroLayerTransform(p, "cta"));
          const copyWrapLegacy = pinRef.current?.querySelector(".s01-copy");
          if (copyWrapLegacy) applyHeroTransform(copyWrapLegacy as HTMLElement, heroLayerTransform(p, "copy"));

          pinRef.current?.querySelectorAll(".s01-copy .word").forEach((w, i) => {
            const st = heroWordTransform(p, i, wordCount);
            gsap.set(w, { opacity: st.opacity, y: st.y, x: st.x, scale: st.scale });
          });

          const handoff = pinRef.current?.querySelector(".s01-handoff-glow");
          if (handoff) {
            const t = Math.max(0, (p - 0.68) / 0.32);
            gsap.set(handoff, { opacity: t * 0.55, scale: 1 + t * 0.15 });
          }
        } else {
          pinRef.current?.querySelectorAll(".s01-copy .word").forEach((w, i) => {
            const st = elementState(p, 0.04 + i * 0.04, 0.18 + i * 0.04, 0.78, 0.94, { yIn: 30, scaleIn: 0.88 });
            applyState(w as HTMLElement, st);
          });
          const device = pinRef.current?.querySelector(".s01-device");
          if (device) {
            const st = elementState(p, 0.12, 0.32, 0.8, 0.96, { yIn: 60, scaleIn: 0.85 });
            gsap.set(device, { opacity: st.opacity, y: st.y, scale: st.scale, rotateY: -8 + p * 4 });
          }
        }
      },
    },
    [isOwl, isRiseLayout, wordCount]
  );

  const heroLayers =
    cfg.images.length >= 3
      ? ([cfg.images[0], cfg.images[1], cfg.images[2]] as [string, string, string])
      : ([cfg.images[0] ?? "", cfg.images[1] ?? cfg.images[0] ?? "", cfg.images[1] ?? cfg.images[0] ?? ""] as [
          string,
          string,
          string,
        ]);

  return (
    <PinWrap id="s01" pinVh={cfg.pinVh}>
      <div
        ref={pinRef}
        className={`pin-section ${isOwl ? "s01--owl s01--cinematic" : ""} ${isPremium ? "s01--premium" : ""} ${isRiseLayout ? "s01--rise" : ""}`}
        id="s01"
      >
        {!isOwl && (
          <SectionMediaLayers
            cfg={cfg}
            progress={progress}
            variant="hero"
            ambientVideo={cfg.videos[1]}
            scrubVideoOnly
            f2fBlend="screen"
          />
        )}
        {isOwl && <div className="s01-handoff-glow" aria-hidden />}

        {isRiseLayout ? (
          <>
            <div className="section-inner s01-grid s01-grid--owl s01-grid--rise">
              <div className="s01-hero-copy-head s01-copy s01-copy--vertical">
                <BrandMark variant="compact" className="s01-brand-compact s01-brand-compact--center" />
                <div ref={eyebrowRef} className="eyebrow s01-hero-eyebrow-pill">WhatsApp, IA e funil em um só lugar</div>
                <h1 ref={headlineRef} className="section-headline s01-hero-headline">
                  Transforme dúvidas em leads prontos para comprar.
                </h1>
                <p ref={ledeRef} className="section-lede s01-hero-lede">
                  A KORUVISION responde, qualifica e organiza conversas automaticamente para sua equipe vender com previsibilidade.
                </p>
              </div>
              <div ref={pointsRef} className="s01-hero-copy-actions">
                <HeroAiInput />
                <div className="s01-hero-suggestion-row" aria-label="Exemplos de perguntas">
                  <span>Qualificar lead</span>
                  <span>Tirar dúvidas</span>
                  <span>Recuperar orçamento</span>
                </div>
                <div ref={ctaRef} className="cta-row cta-row--stack">
                  <MagneticButton href="#s-cta-eco">{cfg.ctaPrimary}</MagneticButton>
                  <MagneticButton href="#s04" variant="ghost">{cfg.ctaSecondary}</MagneticButton>
                </div>
              </div>
            </div>
            <div className="s01-hero-mockup-wrap">
              <HeroExperience
                layers={heroLayers}
                heroVideo={cfg.heroVideo ?? ""}
                bgVideo={cfg.heroBgVideo}
                assetBase={cfg.assetBase}
                progress={progress}
              />
            </div>
          </>
        ) : (
          <div className={`section-inner s01-grid ${isOwl ? "s01-grid--owl s01-grid--clean" : ""}`}>
            <div className="s01-copy readability-panel s01-copy-panel s01-copy-panel--hero">
              {isPremium && <BrandMark variant="compact" className="s01-brand-compact" />}
              <div ref={eyebrowRef} className="eyebrow">{cfg.eyebrow}</div>
              <h1 ref={headlineRef} className="section-headline">{cfg.headline}</h1>
              <p ref={ledeRef} className="section-lede">{cfg.subheadline}</p>
              {isPremium && (
                <div className="hero-product-points" aria-label="Principais benefícios">
                  <span>Pipeline visual</span>
                  <span>IA qualificando leads</span>
                  <span>Automação no WhatsApp</span>
                </div>
              )}
              <div ref={ctaRef} className="cta-row">
                <MagneticButton href="#s-cta-eco">{cfg.ctaPrimary}</MagneticButton>
                <MagneticButton href="#s04" variant="ghost">{cfg.ctaSecondary}</MagneticButton>
              </div>
            </div>
            <div className="s01-stage">
              {isOwl && cfg.heroVideo ? (
                isPremium ? (
                  <HeroExperience
                    layers={heroLayers}
                    heroVideo={cfg.heroVideo}
                    bgVideo={cfg.heroBgVideo ?? cfg.heroVideo}
                    assetBase={cfg.assetBase}
                    progress={progress}
                  />
                ) : (
                  <HeroCinematicStack
                    layers={heroLayers}
                    video={cfg.heroVideo}
                    assetBase={cfg.assetBase}
                    progress={progress}
                  />
                )
              ) : (
                <>
                  <div className="s01-device">
                    <DeviceShell><UIWhatsAppChat /></DeviceShell>
                  </div>
                  <div className="s01-chip c1">+1 lead qualificado</div>
                  <div className="s01-chip c2">Pipeline R$ 47.800</div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="s01-scroll-hint"><span>Role para explorar</span>↓</div>
      </div>
    </PinWrap>
  );
}

function HeroAiInput() {
  const examples = [
    "Cliente perguntou preço. Como respondo sem perder a venda?",
    "Quais leads do WhatsApp estão prontos para fechar hoje?",
    "Crie uma automação para recuperar orçamentos parados.",
    "Tire dúvidas sobre planos e envie para o pipeline certo.",
  ];
  const [text, setText] = useState("");

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId = 0;

    const tick = () => {
      const phrase = examples[phraseIndex];
      setText(phrase.slice(0, charIndex));

      if (!deleting && charIndex < phrase.length) {
        charIndex += 1;
        timeoutId = window.setTimeout(tick, 34);
        return;
      }

      if (!deleting) {
        deleting = true;
        timeoutId = window.setTimeout(tick, 1300);
        return;
      }

      if (charIndex > 0) {
        charIndex -= 1;
        timeoutId = window.setTimeout(tick, 18);
        return;
      }

      deleting = false;
      phraseIndex = (phraseIndex + 1) % examples.length;
      timeoutId = window.setTimeout(tick, 240);
    };

    timeoutId = window.setTimeout(tick, 350);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="s01-ai-input" role="search" aria-label="Input de IA KORUVISION">
      <span className="s01-ai-input__icon" aria-hidden>AI</span>
      <span className="s01-ai-input__text">{text || "Pergunte à IA da KORUVISION..."}</span>
      <span className="s01-ai-input__cursor" aria-hidden />
      <button className="s01-ai-input__send" type="button">Enviar</button>
    </div>
  );
}
