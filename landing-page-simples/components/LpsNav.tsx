"use client";

import { LPS } from "../config";

export function LpsNav() {
  return (
    <header className="lps-nav">
      <span className="lps-nav__brand">{LPS.brand}</span>
      <nav className="lps-nav__links" aria-label="Principal">
        <a href="#lps-pilares">Pilares</a>
        <a href="#lps-demo">Produto</a>
        <a href="#lps-prova">Prova</a>
        <a href="#lps-planos">Planos</a>
      </nav>
      <a href={LPS.signupHref} className="lps-btn lps-btn--primary" style={{ padding: "0.55rem 1rem", fontSize: "0.8rem" }}>
        {LPS.ctaPrimary}
      </a>
    </header>
  );
}
