import { LPS_FAQ } from "../config";

export function LpsFaq() {
  return (
    <section className="lps-section">
      <div className="lps-inner lps-reveal">
        <p className="lps-eyebrow">FAQ</p>
        <h2 className="lps-headline">Dúvidas frequentes</h2>
        <div className="lps-faq">
          {LPS_FAQ.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
