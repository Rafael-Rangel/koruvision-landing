"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { env } from "@/config/env";
import { F2F_SEQUENCES, getF2fFramePath } from "@/config/assets";
import { getF2fCache, preloadF2fFrame } from "@/lib/f2f-frame-cache";

function preloadAround(
  sequenceId: string,
  center: number,
  frameCount: number,
  assetBase: string | undefined
) {
  void preloadF2fFrame(sequenceId, center, frameCount, assetBase);
  for (let d = 1; d <= 10; d++) {
    void preloadF2fFrame(sequenceId, center - d, frameCount, assetBase);
    void preloadF2fFrame(sequenceId, center + d, frameCount, assetBase);
  }
}

interface FrameScrubberProps {
  sequenceId: string;
  progress: number;
  className?: string;
  frameCount?: number;
  blendMode?: "normal" | "screen" | "overlay";
  assetBase?: string;
  objectPosition?: string;
  crossfade?: boolean;
}

function parseObjectPosition(pos: string) {
  const parts = pos.trim().split(/\s+/);
  const axis = (v: string, fallback: number) => {
    if (!v || v === "center") return fallback;
    if (v.endsWith("%")) return parseFloat(v) / 100;
    if (v === "left" || v === "top") return 0;
    if (v === "right" || v === "bottom") return 1;
    return fallback;
  };
  return { x: axis(parts[0], 0.5), y: axis(parts[1] ?? parts[0], 0.5) };
}

function isFrameReady(img: HTMLImageElement | undefined) {
  return Boolean(img?.complete && img.naturalWidth > 0);
}

/**
 * Scrub F2F via WebP — crossfade entre frames adjacentes para scroll contínuo.
 */
export function FrameScrubber({
  sequenceId,
  progress,
  className = "",
  frameCount: frameCountProp,
  blendMode = "normal",
  assetBase,
  objectPosition = "center center",
  crossfade = true,
}: FrameScrubberProps) {
  const meta = F2F_SEQUENCES[sequenceId];
  const [manifestCount, setManifestCount] = useState<number | null>(null);
  const frameCount = manifestCount ?? frameCountProp ?? meta?.frames ?? 120;
  const floatIndex = Math.max(0, Math.min(frameCount - 1, progress * (frameCount - 1)));
  const frameA = Math.floor(floatIndex);
  const frameB = Math.min(frameA + 1, frameCount - 1);
  const mix = crossfade ? floatIndex - frameA : 0;
  const [hasFrames, setHasFrames] = useState(false);
  const [failed, setFailed] = useState(false);
  const lastGoodRef = useRef({ a: 0, b: 0, mix: 0 });

  const base = useMemo(() => (assetBase ?? env.assetBase).replace(/\/$/, ""), [assetBase]);
  const pos = useMemo(() => parseObjectPosition(objectPosition), [objectPosition]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${base}/f2f/${sequenceId}/manifest.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((m) => {
        if (!cancelled && m?.count) setManifestCount(m.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [base, sequenceId]);

  useEffect(() => {
    if (!env.enableF2f) return;
    preloadAround(sequenceId, frameA, frameCount, assetBase);
  }, [sequenceId, assetBase, frameCount, frameA]);

  const checkReady = useCallback(
    (a: number, b: number) => {
      const cache = getF2fCache(sequenceId, assetBase);
      const imgA = cache.get(a);
      if (isFrameReady(imgA)) {
        setHasFrames(true);
        setFailed(false);
        return true;
      }
      if (a === 0 && imgA) {
        const onLoad = () => {
          setHasFrames(true);
          setFailed(false);
        };
        const onError = () => setFailed(true);
        imgA.addEventListener("load", onLoad, { once: true });
        imgA.addEventListener("error", onError, { once: true });
      }
      return false;
    },
    [sequenceId, assetBase]
  );

  useEffect(() => {
    checkReady(frameA, frameB);
  }, [frameA, frameB, checkReady]);

  if (!env.enableF2f || !meta) return null;

  const cache = getF2fCache(sequenceId, assetBase);
  const frameAReady = isFrameReady(cache.get(frameA));
  const frameBReady = isFrameReady(cache.get(frameB));

  if (frameAReady) {
    lastGoodRef.current = { a: frameA, b: frameB, mix };
  }

  const showA = frameAReady ? frameA : lastGoodRef.current.a;
  const showB = frameBReady || frameA === frameB ? frameB : lastGoodRef.current.b;
  const showMix = frameAReady ? mix : lastGoodRef.current.mix;

  const imgStyle = {
    objectFit: "cover" as const,
    objectPosition,
  };

  const stackStyle = {
    mixBlendMode: blendMode,
    ["--frame-pos-x" as string]: `${pos.x * 100}%`,
    ["--frame-pos-y" as string]: `${pos.y * 100}%`,
  };

  if (!crossfade || showA === showB) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={getF2fFramePath(sequenceId, showA, assetBase)}
        alt=""
        aria-hidden
        decoding="async"
        className={`frame-scrubber ${hasFrames ? "frame-scrubber--active" : ""} ${failed ? "frame-scrubber--failed" : ""} ${className}`}
        style={{ ...imgStyle, mixBlendMode: blendMode }}
      />
    );
  }

  return (
    <div
      className={`frame-scrubber-stack ${hasFrames ? "frame-scrubber--active" : ""} ${failed ? "frame-scrubber--failed" : ""} ${className}`}
      style={stackStyle}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getF2fFramePath(sequenceId, showA, assetBase)}
        alt=""
        decoding="async"
        className="frame-scrubber-stack__layer"
        style={{ ...imgStyle, opacity: 1 - showMix }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getF2fFramePath(sequenceId, showB, assetBase)}
        alt=""
        decoding="async"
        className="frame-scrubber-stack__layer"
        style={{ ...imgStyle, opacity: showMix }}
      />
    </div>
  );
}
