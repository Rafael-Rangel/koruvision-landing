"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { gsap } from "@/lib/gsap/register";

export interface PointerParallaxOptions {
  maxTiltX?: number;
  maxTiltY?: number;
  smooth?: number;
  enabled?: boolean;
  lift?: number;
  hoverScale?: number;
  containerRef?: RefObject<HTMLElement | null>;
  targetRef?: RefObject<HTMLElement | null>;
}

export function usePointerParallax({
  maxTiltX = 12,
  maxTiltY = 18,
  smooth = 0.08,
  enabled = true,
  lift = 16,
  hoverScale = 1.03,
  containerRef,
  targetRef,
}: PointerParallaxOptions = {}) {
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const internalTargetRef = useRef<HTMLDivElement>(null);
  const containerEl = containerRef ?? internalContainerRef;
  const targetEl = targetRef ?? internalTargetRef;
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovering, setHovering] = useState(false);
  const target = useRef({ x: 0, y: 0, lx: 50, ly: 50, active: false });

  const onMove = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (!enabled) return;
      const el = containerEl.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      target.current = {
        x,
        y,
        lx: ((e.clientX - r.left) / r.width) * 100,
        ly: ((e.clientY - r.top) / r.height) * 100,
        active: true,
      };
      setHovering(true);
      setMouse({ x: x + 0.5, y: y + 0.5 });
    },
    [containerEl, enabled]
  );

  useEffect(() => {
    if (!enabled) return;
    const el = targetEl.current;
    if (!el) return;

    let raf = 0;
    const tick = () => {
      const { x, y, lx, ly, active } = target.current;
      const rotY = x * maxTiltY;
      const rotX = -y * maxTiltX;
      gsap.set(el, {
        rotateY: rotY,
        rotateX: rotX,
        z: active ? lift : 0,
        scale: active ? hoverScale : 1,
        "--light-x": `${lx}%`,
        "--light-y": `${ly}%`,
        "--mx": `${lx}%`,
        "--my": `${ly}%`,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, hoverScale, lift, maxTiltX, maxTiltY, targetEl]);

  const onLeave = useCallback(() => {
    target.current = { x: 0, y: 0, lx: 50, ly: 50, active: false };
    setHovering(false);
    const el = targetEl.current;
    if (el) {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.75,
        ease: "elastic.out(1,0.45)",
      });
    }
  }, [targetEl]);

  return {
    stageRef: internalContainerRef,
    targetRef: internalTargetRef,
    mouse,
    hovering,
    onMove,
    onLeave,
  };
}
