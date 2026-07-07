import { env } from "@/config/env";
import { getF2fFramePath } from "@/config/assets";

const frameCache = new Map<string, Map<number, HTMLImageElement>>();

export function f2fCacheKey(sequenceId: string, assetBase?: string) {
  return `${assetBase ?? env.assetBase}:${sequenceId}`;
}

export function getF2fCache(sequenceId: string, assetBase?: string) {
  const key = f2fCacheKey(sequenceId, assetBase);
  let cache = frameCache.get(key);
  if (!cache) {
    cache = new Map();
    frameCache.set(key, cache);
  }
  return cache;
}

export function preloadF2fFrame(
  sequenceId: string,
  index: number,
  frameCount: number,
  assetBase?: string
): Promise<void> {
  if (index < 0 || index >= frameCount) return Promise.resolve();
  const cache = getF2fCache(sequenceId, assetBase);
  const existing = cache.get(index);
  if (existing?.complete && existing.naturalWidth > 0) return Promise.resolve();

  return new Promise((resolve) => {
    let img = existing;
    if (!img) {
      img = new Image();
      img.decoding = "async";
      img.src = getF2fFramePath(sequenceId, index, assetBase);
      cache.set(index, img);
    }
    if (img.complete && img.naturalWidth > 0) {
      resolve();
      return;
    }
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
}

/** Verifica se o primeiro frame da sequência existe no servidor. */
export function probeF2fFrame(
  sequenceId: string,
  index: number,
  assetBase?: string
): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth > 0);
    img.onerror = () => resolve(false);
    img.src = getF2fFramePath(sequenceId, index, assetBase);
  });
}

/** Carrega frames em lotes — prioridade nos primeiros (scroll inicial S02). */
export async function preloadF2fSequence(
  sequenceId: string,
  frameCount: number,
  assetBase?: string,
  options?: { priorityCount?: number; concurrency?: number }
) {
  const priority = options?.priorityCount ?? Math.min(40, frameCount);
  const concurrency = options?.concurrency ?? 8;

  const order: number[] = [];
  for (let i = 0; i < priority; i++) order.push(i);
  for (let i = priority; i < frameCount; i++) order.push(i);

  let cursor = 0;
  async function worker() {
    while (cursor < order.length) {
      const idx = order[cursor++];
      await preloadF2fFrame(sequenceId, idx, frameCount, assetBase);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
}

export async function fetchF2fFrameCount(
  sequenceId: string,
  assetBase?: string,
  fallback = 120
): Promise<number> {
  const base = (assetBase ?? env.assetBase).replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/f2f/${sequenceId}/manifest.json`);
    if (!res.ok) return fallback;
    const data = (await res.json()) as { count?: number };
    return data.count ?? fallback;
  } catch {
    return fallback;
  }
}
