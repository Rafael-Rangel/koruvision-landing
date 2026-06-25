import { ReactNode } from "react";

interface SectionHeadlineProps {
  eyebrow: string;
  headline: string;
  headlineEm?: string;
  subheadline: string;
  align?: "left" | "center";
}

export function SectionHeadline({
  eyebrow,
  headline,
  headlineEm,
  subheadline,
  align = "left",
}: SectionHeadlineProps) {
  return (
    <div className={`section-copy ${align === "center" ? "text-center" : ""}`}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="section-headline">
        {headline}
        {headlineEm && <> <em>{headlineEm}</em></>}
      </h2>
      <p className="section-lede" style={align === "center" ? { margin: "0 auto 24px" } : undefined}>
        {subheadline}
      </p>
    </div>
  );
}

interface PinWrapProps {
  id: string;
  pinVh: number | null;
  children: ReactNode;
  className?: string;
}

export function PinWrap({ id, pinVh, children, className = "" }: PinWrapProps) {
  if (pinVh) {
    return (
      <div id={`${id}-pin`} className={`pin-wrap ${className}`}>
        {children}
      </div>
    );
  }
  return (
    <section id={id} className={`section-flow ${className}`}>
      {children}
    </section>
  );
}
