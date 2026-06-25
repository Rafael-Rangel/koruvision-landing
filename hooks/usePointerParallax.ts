"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap/register";

export interface PointerParallaxOptions {
  maxTiltX?: number;
  maxTiltY?: number;
  smooth?: number;
  enabled?: boolean;
}

export function usePointerParallax({
  maxTiltX = 12,
  maxTiltY = 18,
  smooth = 0.08,
  enabled = true,
}: PointerParallaxOptions = {}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const target = useRef({ x: 0, y: 0, lx: 50, ly: 50 });

  const onMove = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (!enabled) return;
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      target.current = {
        x,
        y,
        lx: ((e.clientX - r.left) / r.width) * 100,
        ly: ((e.clientY - r.top) / r.height) * 100,
      };
      setMouse({ x: x + 0.5, y: y + 0.5 });
    },
    [enabled]
  );

  useEffect(() => {
    if (!enabled) return;
    const el = stageRef.current;
    if (!el) return;

    let raf = 0;
    const tick = () => {
      const rotY = target.current.x * maxTiltY;
      const rotX = -target.current.y * maxTiltX;
      gsap.set(el, {
        rotateY: rotY,
        rotateX: rotX,
        "--light-x": `${target.current.lx}%`,
        "--light-y": `${target.current.ly}%`,
        "--mx": `${target.current.lx}%`,
        "--my": `${target.current.ly}%`,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, maxTiltX, maxTiltY, smooth]);

  const onLeave = useCallback(() => {
    target.current = { x: 0, y: 0, lx: 50, ly: 50 };
    if (stageRef.current) {
      gsap.to(stageRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1,0.4)",
      });
    }
  }, []);

  return { stageRef, mouse, onMove, onLeave };
}
