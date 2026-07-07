import { NV11_BASE } from "@/config/nv11-assets";
import { fetchF2fFrameCount, preloadF2fSequence, probeF2fFrame } from "@/lib/f2f-frame-cache";

/** Pré-carrega assets críticos do fluxo S02 (coruja). */
export function warmLandingAssets() {
  void import("@/sections/SectionVisionBridge");
  void probeF2fFrame("NV11-F2F-001", 0, NV11_BASE).then((available) => {
    if (!available) return;
    void fetchF2fFrameCount("NV11-F2F-001", NV11_BASE, 90).then((count) => {
      if (count < 4) return;
      preloadF2fSequence("NV11-F2F-001", count, NV11_BASE, { priorityCount: 24, concurrency: 6 });
    });
  });
}
