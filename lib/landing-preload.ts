import { NV11_BASE } from "@/config/nv11-assets";
import { fetchF2fFrameCount, preloadF2fSequence, probeF2fFrame } from "@/lib/f2f-frame-cache";

function scheduleIdle(task: () => void) {
  if (typeof window === "undefined") return;
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(task, { timeout: 5000 });
    return;
  }
  window.addEventListener("load", task, { once: true });
}

/** Pré-carrega poucos frames do S02 após idle — não compete com o hero/LCP. */
export function warmLandingAssets() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(max-width: 900px)").matches) return;

  scheduleIdle(() => {
    void import("@/sections/SectionVisionBridge");
    void probeF2fFrame("NV11-F2F-001", 0, NV11_BASE).then((available) => {
      if (!available) return;
      void fetchF2fFrameCount("NV11-F2F-001", NV11_BASE, 90).then((count) => {
        if (count < 4) return;
        preloadF2fSequence("NV11-F2F-001", count, NV11_BASE, {
          priorityCount: 8,
          concurrency: 3,
        });
      });
    });
  });
}
