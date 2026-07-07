"use client";

import { MagneticButton } from "@/components/motion/MagneticButton";
import { CRM_URLS } from "@/lib/crm-url";

export function SiteNav() {
  return (
    <nav className="site-nav">
      <a className="nav-brand" href="#s01">
        <div className="nav-logo">KV</div>
        <span>FlowIA</span>
      </a>
      <div className="nav-links">
        <a href="#s04">Demo</a>
        <a href="#s10">Benefícios</a>
        <a href="#s17">Planos</a>
        <a href="#s18">FAQ</a>
        <MagneticButton href={CRM_URLS.signup} className="nav-cta">
          Começar grátis
        </MagneticButton>
      </div>
    </nav>
  );
}
