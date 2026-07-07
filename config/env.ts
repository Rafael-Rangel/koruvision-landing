export const env = {
  replicateToken: process.env.REPLICATE_API_TOKEN ?? process.env.API_KEY ?? "",
  assetBase: process.env.NEXT_PUBLIC_ASSET_BASE ?? "/assets/nv11",
  enableF2f: process.env.NEXT_PUBLIC_ENABLE_F2F !== "false",
  enableVideo: process.env.NEXT_PUBLIC_ENABLE_VIDEO !== "false",
  mobileBreakpoint: Number(process.env.NEXT_PUBLIC_MOBILE_BREAKPOINT ?? 900),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  crmUrl: process.env.NEXT_PUBLIC_CRM_URL ?? "https://crm.koruvision.com.br",
} as const;

export function assetPath(...parts: string[]): string {
  const base = env.assetBase.replace(/\/$/, "");
  return `${base}/${parts.join("/").replace(/^\//, "")}`;
}

export function imagePath(filename: string | undefined | null, base?: string): string {
  if (!filename) return "";
  const root = (base ?? env.assetBase).replace(/\/$/, "");
  return `${root}/images/${filename.replace(/^\//, "")}`;
}

export function videoPath(filename: string | undefined | null, base?: string): string {
  if (!filename) return "";
  const root = (base ?? env.assetBase).replace(/\/$/, "");
  return `${root}/videos/${filename.replace(/^\//, "")}`;
}

export function f2fPath(seqId: string, frame: number, base?: string): string {
  const root = (base ?? env.assetBase).replace(/\/$/, "");
  return `${root}/f2f/${seqId}/frame_${String(frame).padStart(4, "0")}.webp`;
}
