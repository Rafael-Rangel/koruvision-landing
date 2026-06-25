export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-inner footer-grid">
        <div>
          <div className="nav-brand">
            <div className="nav-logo">KV</div>
            <span>FlowIA</span>
          </div>
          <p className="footer-tag">CRM + IA para WhatsApp · KORUVISION</p>
        </div>
        <div className="footer-links">
          <a href="#s04">Demo</a>
          <a href="#s17">Planos</a>
          <a href="#s18">FAQ</a>
          <a href="#s19">Começar grátis</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} KORUVISION. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
