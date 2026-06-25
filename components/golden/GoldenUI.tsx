export function UIWhatsAppChat() {
  return (
    <div className="ui-golden ui-wa">
      <div className="ui-wa-header">
        <div>
          <span className="ui-wa-dot online" />
          Clínica Sorriso
        </div>
        <span className="ui-status-pill">IA ativa</span>
      </div>
      <div className="ui-wa-kpis">
        <span>4 conversas</span>
        <span>2 quentes</span>
        <span>R$ 8.200</span>
      </div>
      <div className="ui-wa-thread">
        <div className="bubble in">Quanto custa a consulta?</div>
        <div className="bubble out">Olá! Consulta inicial R$ 180. Posso agendar para você?</div>
        <div className="bubble in">Sim, amanhã de manhã</div>
        <div className="bubble out ai">Perfeito! Tenho 9h ou 10h30. Qual prefere?</div>
      </div>
      <div className="ui-wa-footer">
        <span>Score 87%</span>
        <strong>Enviar para funil</strong>
      </div>
    </div>
  );
}

export function UIAgentPanel() {
  return (
    <div className="ui-golden ui-agent">
      <div className="ui-agent-top">
        <div className="ui-agent-score">Score <strong>87%</strong></div>
        <div className="ui-agent-pulse">analisando</div>
      </div>
      <div className="ui-agent-intent">Intenção: <span>Agendar consulta</span></div>
      <div className="ui-agent-bars" aria-hidden>
        {[82, 64, 91, 56].map((w, i) => <span key={i} style={{ width: `${w}%` }} />)}
      </div>
      <div className="ui-agent-tags">
        <span className="tag">Qualificado</span>
        <span className="tag gold">Alta urgência</span>
      </div>
      <div className="ui-agent-next">Próxima ação: confirmar horário e criar deal</div>
    </div>
  );
}

export function UIKanbanBoard() {
  const cols = ["Lead", "Qualificado", "Proposta", "Fechado"];
  return (
    <div className="ui-golden ui-kanban">
      {cols.map((col, i) => (
        <div key={col} className="k-col">
          <div className="k-col-head">
            {col}
            <span>{[12, 8, 4, 2][i]}</span>
          </div>
          {[
            ["Maria S.", "R$ 2.400", "WhatsApp"],
            ["João P.", "R$ 1.800", "Site"],
            ["Clara M.", "R$ 4.000", "Instagram"],
          ].slice(0, i === 0 ? 2 : i === 1 ? 3 : 1).map((card, idx) => (
            <div key={`${col}-${card[0]}`} className={`k-card ${i === 1 && idx === 0 ? "featured" : ""}`}>
              <strong>{card[0]}</strong>
              <span>{card[1]}</span>
              <small>{card[2]}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function UICalendarView() {
  return (
    <div className="ui-golden ui-cal">
      <div className="ui-cal-head">
        <strong>Agenda inteligente</strong>
        <span>Hoje</span>
      </div>
      <div className="ui-cal-event confirmed">
        <span className="time">14:00</span>
        <span>Consulta confirmada — Maria S.</span>
      </div>
      <div className="ui-cal-event">
        <span className="time">16:30</span>
        <span>Retorno — João P.</span>
      </div>
      <div className="ui-cal-event ai">
        <span className="time">18:00</span>
        <span>IA sugeriu follow-up automático</span>
      </div>
    </div>
  );
}

export function UIDashboard() {
  return (
    <div className="ui-golden ui-dash">
      <div className="ui-dash-top">
        <strong>Dashboard executivo</strong>
        <span>tempo real</span>
      </div>
      <div className="dash-grid">
        <div className="dash-metric">
          <span className="label">Pipeline</span>
          <strong>R$ 47.800</strong>
          <small>+18%</small>
        </div>
        <div className="dash-metric">
          <span className="label">Conversão</span>
          <strong>23%</strong>
          <small>+5,2%</small>
        </div>
        <div className="dash-metric">
          <span className="label">Leads</span>
          <strong>156</strong>
          <small>+31</small>
        </div>
      </div>
      <div className="dash-bars">
        {[40, 65, 45, 80, 55].map((h, i) => (
          <div key={i} className="bar" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="dash-funnel">
        {["Lead", "Qual.", "Prop.", "Fech."].map((l, i) => <span key={l} style={{ opacity: 1 - i * 0.12 }}>{l}</span>)}
      </div>
    </div>
  );
}

export function UIInboxThreeCol() {
  return (
    <div className="ui-golden ui-inbox">
      <div className="inbox-col">
        <div className="inbox-row active">Maria S. · Agendar</div>
        <div className="inbox-row">João P. · Orçamento</div>
      </div>
      <div className="inbox-col wide">
        <div className="thread-msg">Posso agendar para amanhã?</div>
        <div className="thread-msg out">Claro! 9h ou 10h30?</div>
      </div>
      <div className="inbox-col">
        <div className="panel-tag">Handoff IA → Humano</div>
        <div className="panel-deal">Deal R$ 2.400</div>
      </div>
    </div>
  );
}

export function UIWorkflowCanvas() {
  const nodes = ["Lead", "Tag", "IA", "Kanban", "Email", "Fechado"];
  return (
    <div className="ui-golden ui-workflow">
      {nodes.map((n, i) => (
        <div key={n} className={`wf-node ${i === 2 ? "active" : ""}`}>
          {n}
        </div>
      ))}
    </div>
  );
}

export function UIAgencyTenants() {
  return (
    <div className="ui-golden ui-agency">
      <div className="agency-mrr">MRR <strong>R$ 128.400</strong></div>
      <div className="tenant-grid">
        {["Clínica A", "Imob B", "Agência C", "E-com D", "Consult E", "Saúde F"].map((t) => (
          <div key={t} className="tenant">{t}</div>
        ))}
      </div>
    </div>
  );
}

export function UIPricingCards() {
  const plans = [
    { name: "Starter", price: "R$ 97", popular: false },
    { name: "Pro", price: "R$ 197", popular: true },
    { name: "Agency", price: "R$ 497", popular: false },
  ];
  return (
    <div className="ui-golden ui-pricing">
      {plans.map((p) => (
        <div key={p.name} className={`price-card ${p.popular ? "popular" : ""}`}>
          <h4>{p.name}</h4>
          <div className="price">{p.price}<span>/mês</span></div>
        </div>
      ))}
    </div>
  );
}

export function FAQAccordion() {
  const items = [
    { q: "Preciso de cartão para o trial?", a: "Não. São 14 dias grátis, sem cartão." },
    { q: "Integra com WhatsApp Business?", a: "Sim, via API oficial e QR code em 5 minutos." },
    { q: "Posso usar como agência?", a: "Plano Agency com multi-tenant e white-label." },
  ];
  return (
    <div className="ui-golden ui-faq">
      {items.map((item) => (
        <details key={item.q} className="faq-item">
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function DeviceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="device-shell">
      <div className="device-bezel">
        <div className="device-screen">{children}</div>
      </div>
      <div className="device-shadow" />
    </div>
  );
}
