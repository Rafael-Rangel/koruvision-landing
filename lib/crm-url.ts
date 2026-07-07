/** URLs do CRM Stackflow — CTAs da landing apontam para o subdomínio crm. */

const CRM_BASE = (
  process.env.NEXT_PUBLIC_CRM_URL || "https://crm.koruvision.com.br"
).replace(/\/$/, "");

export function crmUrl(path = ""): string {
  const p = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${CRM_BASE}${p}`;
}

export const CRM_URLS = {
  signup: crmUrl("/signup"),
  login: crmUrl("/login"),
  interesse: crmUrl("/interesse"),
  planos: crmUrl("/planos"),
} as const;
