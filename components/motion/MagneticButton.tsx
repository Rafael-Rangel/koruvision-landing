"use client";

import { ReactNode, useRef, useEffect } from "react";
import { gsap, registerGsap } from "@/lib/gsap/register";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export function MagneticButton({
  href,
  onClick,
  className = "",
  children,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || window.matchMedia("(max-width: 900px)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.35;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
      el.style.setProperty("--btn-mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--btn-my", `${((e.clientY - r.top) / r.height) * 100}%`);
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.6)" });
    };
    const onClick = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.left = `${e.clientX - r.left}px`;
      ripple.style.top = `${e.clientY - r.top}px`;
      ripple.style.width = ripple.style.height = "12px";
      ripple.style.marginLeft = ripple.style.marginTop = "-6px";
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("click", onClick);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("click", onClick);
    };
  }, []);

  const cls = `${variant === "primary" ? "btn-primary" : "btn-ghost"} magnetic-btn ${className}`;

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
