"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface DeferredMountProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  reserveVh?: number;
  className?: string;
}

export function DeferredMount({
  children,
  fallback,
  rootMargin = "1200px 0px",
  reserveVh = 160,
  className = "",
}: DeferredMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div
      ref={ref}
      className={`deferred-mount ${mounted ? "deferred-mount--ready" : ""} ${className}`}
      style={!mounted ? { minHeight: `${reserveVh}vh` } : undefined}
    >
      {mounted ? children : fallback ?? <div className="deferred-skeleton" aria-hidden />}
    </div>
  );
}

export function useDeferredReady(delay = 0) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const win = window as Window & { requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => {
        if (!cancelled) setReady(true);
      }, { timeout: Math.max(800, delay) });
      return () => {
        cancelled = true;
        win.cancelIdleCallback?.(id);
      };
    }

    const id = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, delay || 600);

    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [delay]);

  return ready;
}
