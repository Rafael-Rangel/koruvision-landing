"use client";

const cards = [
  {
    key: "crm",
    title: "CRM Comercial",
    copy: "Pipeline, tarefas, clientes e oportunidades em uma visão única.",
    metric: "156 leads",
    type: "pipeline",
  },
  {
    key: "ai",
    title: "Agentes de IA",
    copy: "Qualificação automática, intenção, score e próxima ação.",
    metric: "87% score",
    type: "brain",
  },
  {
    key: "automation",
    title: "Automações",
    copy: "Fluxos que movem leads, notificam equipe e disparam follow-ups.",
    metric: "24/7 ativo",
    type: "nodes",
  },
  {
    key: "analytics",
    title: "Analytics",
    copy: "Pipeline, conversão, receita prevista e performance por canal.",
    metric: "+18% mês",
    type: "chart",
  },
];

function Visual({ type }: { type: string }) {
  if (type === "pipeline") {
    return (
      <div className="feature3d-visual feature3d-pipeline" aria-hidden>
        {[0, 1, 2, 3].map((i) => <span key={i} style={{ "--i": i } as React.CSSProperties} />)}
      </div>
    );
  }

  if (type === "brain") {
    return (
      <div className="feature3d-visual feature3d-brain" aria-hidden>
        <span className="brain-core" />
        {[0, 1, 2, 3, 4, 5].map((i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}
      </div>
    );
  }

  if (type === "nodes") {
    return (
      <div className="feature3d-visual feature3d-nodes" aria-hidden>
        {["Lead", "IA", "CRM", "Venda"].map((n, i) => <span key={n} style={{ "--i": i } as React.CSSProperties}>{n}</span>)}
      </div>
    );
  }

  return (
    <div className="feature3d-visual feature3d-chart" aria-hidden>
      {[46, 68, 52, 82, 74].map((h, i) => <span key={i} style={{ height: `${h}%`, "--i": i } as React.CSSProperties} />)}
    </div>
  );
}

export function Product3DFeatureCards() {
  return (
    <div className="product-feature3d-grid">
      {cards.map((card) => (
        <article key={card.key} className={`product-feature3d product-feature3d--${card.key}`} data-ambient-float data-ambient-amp="4">
          <div className="feature3d-glow" />
          <Visual type={card.type} />
          <div className="feature3d-copy">
            <div className="feature3d-metric">{card.metric}</div>
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
