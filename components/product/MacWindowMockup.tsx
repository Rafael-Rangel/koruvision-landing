"use client";

import type { ReactNode, CSSProperties } from "react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import type { ProductMockupKey } from "@/config/mockups";
import { MOCKUP_TITLES, PRODUCT_MOCKUPS } from "@/config/mockups";

interface MacWindowMockupProps {
  mockup?: ProductMockupKey;
  src?: string;
  title?: string;
  alt?: string;
  tilt?: boolean;
  className?: string;
  children?: ReactNode;
  priority?: boolean;
}

/**
 * Mockup real do produto em janela estilo macOS (traffic lights + chrome).
 */
export function MacWindowMockup({
  mockup,
  src,
  title,
  alt,
  tilt = true,
  className = "",
  children,
  priority = false,
}: MacWindowMockupProps) {
  const imageSrc = src ?? (mockup ? PRODUCT_MOCKUPS[mockup] : "");
  const windowTitle = title ?? (mockup ? MOCKUP_TITLES[mockup] : "KoruVision");
  const imageAlt = alt ?? windowTitle;

  const { stageRef, onMove, onLeave } = usePointerParallax({
    maxTiltX: tilt ? 6 : 0,
    maxTiltY: tilt ? 9 : 0,
    enabled: tilt,
  });

  return (
    <div
      className={`mac-window-outer ${tilt ? "mac-window-outer--tilt" : ""} ${className}`}
      onPointerMove={tilt ? onMove : undefined}
      onPointerLeave={tilt ? onLeave : undefined}
    >
      <div ref={tilt ? stageRef : undefined} className="mac-window-stage">
        <div className="mac-window">
          <div className="mac-window__titlebar">
            <div className="mac-window__traffic" aria-hidden>
              <span className="mac-window__dot mac-window__dot--close" />
              <span className="mac-window__dot mac-window__dot--min" />
              <span className="mac-window__dot mac-window__dot--max" />
            </div>
            <span className="mac-window__title">{windowTitle}</span>
            <span className="mac-window__titlebar-spacer" aria-hidden />
          </div>
          <div className="mac-window__body">
            {children ?? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt={imageAlt}
                className="mac-window__screenshot"
                width={1440}
                height={900}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            )}
          </div>
          <div className="mac-window__shine" aria-hidden />
        </div>
      </div>
    </div>
  );
}

export function MacMetricsMockup(props: Omit<MacWindowMockupProps, "mockup">) {
  return <MacWindowMockup mockup="metrics" {...props} />;
}

export function MacInboxMockup(props: Omit<MacWindowMockupProps, "mockup">) {
  return <MacWindowMockup mockup="inbox" {...props} />;
}

export function MacAutomationMockup(props: Omit<MacWindowMockupProps, "mockup">) {
  return <MacWindowMockup mockup="automation" {...props} />;
}
