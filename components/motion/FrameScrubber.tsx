"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { env } from "@/config/env";
import { F2F_SEQUENCES, getF2fFramePath } from "@/config/assets";

interface FrameScrubberProps {
  sequenceId: string;
  progress: number;
  className?: string;
  frameCount?: number;
  blendMode?: "normal" | "screen" | "overlay";
  assetBase?: string;
}

export function FrameScrubber({
  sequenceId,
  progress,
  className = "",
  frameCount: frameCountProp,
  blendMode = "normal",
  assetBase,
}: FrameScrubberProps) {
  const meta = F2F_SEQUENCES[sequenceId];
  const frameCount = frameCountProp ?? meta?.frames ?? 120;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const rafRef = useRef<number>(0);
  const [hasFrames, setHasFrames] = useState(false);
  const lastFrameRef = useRef(-1);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !env.enableF2f) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const clamped = Math.max(0, Math.min(frameCount - 1, Math.floor(index)));
      if (clamped === lastFrameRef.current) return;
      lastFrameRef.current = clamped;

      const draw = (img: HTMLImageElement) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
        setHasFrames(true);
      };

      const cached = cacheRef.current.get(clamped);
      if (cached?.complete && cached.naturalWidth) {
        draw(cached);
        return;
      }

      const img = new Image();
      img.onload = () => {
        cacheRef.current.set(clamped, img);
        draw(img);
        // Preload adjacent frames
        [clamped - 1, clamped + 1, clamped + 2].forEach((i) => {
          if (i < 0 || i >= frameCount || cacheRef.current.has(i)) return;
          const pre = new Image();
          pre.onload = () => cacheRef.current.set(i, pre);
          pre.src = getF2fFramePath(sequenceId, i, assetBase);
        });
      };
      img.onerror = () => {
        if (!hasFrames) {
          ctx.fillStyle = "rgba(1,2,8,0)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      };
      img.src = getF2fFramePath(sequenceId, clamped, assetBase);
    },
    [frameCount, sequenceId, hasFrames, assetBase]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      lastFrameRef.current = -1;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      drawFrame(progress * (frameCount - 1));
    });
  }, [progress, frameCount, drawFrame]);

  useEffect(() => {
    drawFrame(0);
  }, [drawFrame]);

  if (!env.enableF2f) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`frame-scrubber ${hasFrames ? "frame-scrubber--active" : ""} ${className}`}
      style={{ mixBlendMode: blendMode }}
      aria-hidden
    />
  );
}
