"use client";

const deals = [
  { name: "Maria S.", value: "R$ 2.400", source: "WhatsApp", stage: "Qualificado" },
  { name: "João P.", value: "R$ 1.800", source: "Instagram", stage: "Proposta" },
  { name: "Clara M.", value: "R$ 4.000", source: "Site", stage: "Fechado" },
];

const stages = [
  { label: "Novo lead", count: 24 },
  { label: "Qualificado", count: 12 },
  { label: "Proposta", count: 7 },
  { label: "Fechado", count: 4 },
];

export function ProductCommandCenter({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`product-command ${compact ? "product-command--compact" : ""}`} data-ambient-breathe>
      <div className="product-topbar">
        <div>
          <span className="product-brand-dot" />
          <strong>KORUVISION CRM</strong>
        </div>
        <div className="product-topbar-actions">
          <span>WhatsApp conectado</span>
          <span>IA em tempo real</span>
        </div>
      </div>

      <div className="product-kpis">
        <div className="product-kpi">
          <span>Pipeline</span>
          <strong>R$ 152.000</strong>
          <small>+18% este mês</small>
        </div>
        <div className="product-kpi">
          <span>Leads qualificados</span>
          <strong>156</strong>
          <small>31 novos hoje</small>
        </div>
        <div className="product-kpi">
          <span>Conversão</span>
          <strong>23%</strong>
          <small>+5,2%</small>
        </div>
      </div>

      <div className="product-grid">
        <div className="product-panel product-panel--pipeline">
          <div className="product-panel-head">
            <strong>Funil de vendas</strong>
            <span>atualizado agora</span>
          </div>
          <div className="product-stages">
            {stages.map((stage, i) => (
              <div key={stage.label} className="product-stage">
                <div className="product-stage-head">
                  <span>{stage.label}</span>
                  <b>{stage.count}</b>
                </div>
                {deals.slice(0, i === 0 ? 2 : 1).map((deal) => (
                  <div key={`${stage.label}-${deal.name}`} className={`product-deal ${deal.stage === stage.label ? "is-hot" : ""}`}>
                    <strong>{deal.name}</strong>
                    <span>{deal.value}</span>
                    <small>{deal.source}</small>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="product-panel product-panel--ai">
          <div className="product-panel-head">
            <strong>Agente IA</strong>
            <span>qualificando</span>
          </div>
          <div className="product-chat">
            <p>Cliente: "Quero agendar uma demonstração."</p>
            <p className="is-ai">IA: "Perfeito. Vou confirmar o horário e criar a oportunidade."</p>
          </div>
          <div className="product-ai-score">
            <span>Score do lead</span>
            <strong>87%</strong>
          </div>
        </div>

        <div className="product-panel product-panel--automation">
          <div className="product-panel-head">
            <strong>Automação ativa</strong>
            <span>sem intervenção</span>
          </div>
          <div className="product-flow">
            {["Lead", "IA", "CRM", "Equipe", "Venda"].map((step, i) => (
              <div key={step} className={`product-flow-node ${i === 2 ? "is-active" : ""}`}>{step}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="product-ecosystem-row">
        <div className="product-mobile-preview">
          <div className="mobile-notch" />
          <strong>WhatsApp</strong>
          <p>IA respondeu, qualificou e criou o deal automaticamente.</p>
          <span>Lead quente · R$ 2.400</span>
        </div>
        <div className="product-integrations">
          {["WhatsApp", "Instagram", "Email", "API", "Google"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
