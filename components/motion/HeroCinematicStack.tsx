"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { env, imagePath, videoPath } from "@/config/env";
import { heroLayerTransform, applyHeroTransform, type HeroLayer } from "@/lib/hero-choreography";
import { ProceduralOwlScene } from "@/components/motion/ProceduralOwlScene";
import { SmartVideo } from "@/components/performance/SmartVideo";

interface HeroCinematicStackProps {
  layers: [string, string, string];
  video: string;
  assetBase?: string;
  progress: number;
}

const LAYER_KEYS: HeroLayer[] = ["ambient", "energy", "owlPlate"];

export function HeroCinematicStack({ layers, video, assetBase, progress }: HeroCinematicStackProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  useEffect(() => {
    LAYER_KEYS.forEach((key, i) => {
      applyHeroTransform(layerRefs[i].current, heroLayerTransform(progress, key));
    });
    const vt = heroLayerTransform(progress, "owlVideo");
    const pupilX = gaze.x * 8;
    const pupilY = gaze.y * 5;
    applyHeroTransform(videoWrapRef.current, {
      ...vt,
      x: vt.x + pupilX,
      y: vt.y + pupilY,
    });
  }, [progress, gaze]);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    setGaze({ x: Math.max(-1, Math.min(1, nx)), y: Math.max(-1, Math.min(1, ny)) });
  }, []);

  return (
    <div ref={rootRef} className="s01-cinematic-stack" onMouseMove={onMove}>
      <div className="s01-cinematic-rig">
        {(mediaFailed || !env.enableVideo) && (
          <ProceduralOwlScene className="s01-cinematic-procedural" intensity={0.85 + progress * 0.15} />
        )}
        {!mediaFailed && layers.map((file, i) => (
          <div key={file} ref={layerRefs[i]} className={`s01-cinematic-layer s01-cinematic-layer--${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePath(file, assetBase)}
              alt=""
              draggable={false}
              onError={() => { if (i === layers.length - 1) setMediaFailed(true); }}
            />
          </div>
        ))}
        <div ref={videoWrapRef} className="s01-cinematic-owl">
          <div className="s01-owl-glow s01-owl-glow--cinematic" data-ambient-glow aria-hidden />
          {env.enableVideo && !mediaFailed ? (
            <SmartVideo
              className={`s01-owl-video s01-owl-video--cinematic ${ready ? "s01-owl-video--ready" : ""}`}
              src={videoPath(video, assetBase)}
              preload="auto"
              poster={imagePath(layers[2], assetBase)}
              eager
              onLoadedData={() => setReady(true)}
              onError={() => setMediaFailed(true)}
            />
          ) : !mediaFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="s01-owl-video s01-owl-video--cinematic s01-owl-video--ready"
              src={imagePath(layers[2], assetBase)}
              alt=""
              onError={() => setMediaFailed(true)}
            />
          ) : null}
          <div className="s01-owl-vignette" aria-hidden />
        </div>
      </div>
    </div>
  );
}
