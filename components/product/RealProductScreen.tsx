"use client";

import type { ReactNode } from "react";
import { getRealAsset, type RealAssetSlot } from "@/config/real-assets";

interface RealProductScreenProps {
  slot: RealAssetSlot;
  children: ReactNode;
  className?: string;
}

/** Substitui mockup GoldenUI quando `config/real-assets.ts` tiver `src` preenchido. */
export function RealProductScreen({ slot, children, className = "" }: RealProductScreenProps) {
  const asset = getRealAsset(slot);
  if (!asset) return <>{children}</>;

  return (
    <div className={`real-product-screen ${className}`.trim()}>
      {asset.kind === "video" ? (
        <video
          className="real-product-screen__media"
          src={asset.src!}
          autoPlay
          muted
          loop
          playsInline
          aria-label={asset.alt}
        />
      ) : (
        <img className="real-product-screen__media" src={asset.src!} alt={asset.alt} loading="lazy" />
      )}
    </div>
  );
}
