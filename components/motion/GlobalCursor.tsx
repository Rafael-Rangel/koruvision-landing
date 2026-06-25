"use client";

import { useEffect } from "react";

/** Glow suave que segue o cursor — reforça sensação de ecossistema vivo */
export function GlobalCursor() {
  useEffect(() => {
    const el = document.getElementById("global-cursor-glow");
    if (!el) return;

    let x = window.innerWidth * 0.5;
    let y = window.innerHeight * 0.4;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate(${x - 180}px, ${y - 180}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div id="global-cursor-glow" className="global-cursor-glow" aria-hidden />;
}
