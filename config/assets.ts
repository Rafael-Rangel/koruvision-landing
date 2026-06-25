import { imagePath, videoPath, f2fPath } from "./env";

export interface F2FSequence {
  id: string;
  frames: number;
  fps: number;
  sourceVideo: string;
}

/** Frame counts alinhados com f2f-sequences.md / nv5_pipeline F2F_MAP */
export const F2F_SEQUENCES: Record<string, F2FSequence> = {
  "NV5-F2F-001": { id: "NV5-F2F-001", frames: 150, fps: 25, sourceVideo: "nv5-vid-001.mp4" },
  "NV5-F2F-002": { id: "NV5-F2F-002", frames: 100, fps: 25, sourceVideo: "nv5-vid-002.mp4" },
  "NV5-F2F-003": { id: "NV5-F2F-003", frames: 180, fps: 30, sourceVideo: "nv5-vid-003.mp4" },
  "NV5-F2F-004": { id: "NV5-F2F-004", frames: 250, fps: 25, sourceVideo: "nv5-vid-004.mp4" },
  "NV5-F2F-005": { id: "NV5-F2F-005", frames: 120, fps: 24, sourceVideo: "nv5-vid-006.mp4" },
  "NV5-F2F-006": { id: "NV5-F2F-006", frames: 80, fps: 24, sourceVideo: "nv5-vid-002.mp4" },
  "NV5-F2F-007": { id: "NV5-F2F-007", frames: 60, fps: 24, sourceVideo: "nv5-vid-004.mp4" },
  "NV5-F2F-008": { id: "NV5-F2F-008", frames: 60, fps: 24, sourceVideo: "nv5-vid-007.mp4" },
  "NV5-F2F-009": { id: "NV5-F2F-009", frames: 120, fps: 24, sourceVideo: "nv5-vid-008.mp4" },
  "NV5-F2F-010": { id: "NV5-F2F-010", frames: 40, fps: 20, sourceVideo: "nv5-vid-010.mp4" },
  "NV5-F2F-011": { id: "NV5-F2F-011", frames: 100, fps: 24, sourceVideo: "nv5-vid-009.mp4" },
  "NV5-F2F-012": { id: "NV5-F2F-012", frames: 120, fps: 24, sourceVideo: "nv5-vid-010.mp4" },
  "NV5-F2F-013": { id: "NV5-F2F-013", frames: 60, fps: 20, sourceVideo: "nv5-vid-010.mp4" },
  "NV5-F2F-014": { id: "NV5-F2F-014", frames: 70, fps: 24, sourceVideo: "nv5-vid-012.mp4" },
  "NV5-F2F-015": { id: "NV5-F2F-015", frames: 80, fps: 24, sourceVideo: "nv5-vid-008.mp4" },
  "NV5-F2F-016": { id: "NV5-F2F-016", frames: 120, fps: 20, sourceVideo: "nv5-vid-014.mp4" },
  "NV9-F2F-001": { id: "NV9-F2F-001", frames: 90, fps: 24, sourceVideo: "nv9-vid-vision.mp4" },
  "NV9-F2F-002": { id: "NV9-F2F-002", frames: 72, fps: 24, sourceVideo: "nv9-vid-chaos.mp4" },
  "NV9-F2F-003": { id: "NV9-F2F-003", frames: 96, fps: 24, sourceVideo: "nv9-vid-connect.mp4" },
  "NV9-F2F-004": { id: "NV9-F2F-004", frames: 80, fps: 24, sourceVideo: "nv9-vid-cta.mp4" },
  "NV11-F2F-000": { id: "NV11-F2F-000", frames: 72, fps: 24, sourceVideo: "nv11-vid-f2f-000-hero-core.mp4" },
  "NV11-F2F-001": { id: "NV11-F2F-001", frames: 90, fps: 25, sourceVideo: "nv11-vid-f2f-001-owl-eyes.mp4" },
  "NV11-F2F-002": { id: "NV11-F2F-002", frames: 120, fps: 24, sourceVideo: "nv11-vid-f2f-002-crm-awaken.mp4" },
  "NV11-F2F-003": { id: "NV11-F2F-003", frames: 96, fps: 24, sourceVideo: "nv11-vid-f2f-003-data-evolution.mp4" },
  "NV11-F2F-004": { id: "NV11-F2F-004", frames: 80, fps: 25, sourceVideo: "nv11-vid-f2f-004-cta-convergence.mp4" },
};

export function getF2fFramePath(seqId: string, frameIndex: number, assetBase?: string): string {
  return f2fPath(seqId, frameIndex + 1, assetBase);
}

export function getSectionImages(sectionId: string): string[] {
  const map: Record<string, string[]> = {
    S01: ["hero-observatory-corridor-wide.webp", "hero-liquid-data-river-apex.webp", "hero-floating-glass-platform.webp"],
    S02: ["problem-vignette-full.webp", "problem-shattered-holographic-slabs.webp"],
    S03: ["bridge-tunnel-light-rings.webp", "bridge-golden-convergence.webp"],
    S04: ["demo-stage-void-premium.webp", "demo-neural-energy-field.webp"],
    S19: ["cta-convergence-vortex-wide.webp", "cta-god-rays-apex.webp"],
  };
  return map[sectionId] ?? [];
}

export { imagePath, videoPath };
