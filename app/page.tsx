import type { Metadata } from "next";
import { SimpleLanding } from "@/landing-page-simples/SimpleLanding";

export const metadata: Metadata = {
  title: "KORUVISION — CRM + IA para WhatsApp",
  description: "Suas conversas viram receita previsível. Landing leve com animações GSAP.",
};

export default function HomePage() {
  return <SimpleLanding />;
}
