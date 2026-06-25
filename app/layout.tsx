import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TokensProvider } from "@/components/providers/TokensProvider";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DataRiver } from "@/components/motion/DataRiver";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FlowIA — CRM + IA WhatsApp · KORUVISION",
  description: "Suas conversas viram receita previsível. CRM com IA para WhatsApp.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <TokensProvider>
          <DataRiver />
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
        </TokensProvider>
      </body>
    </html>
  );
}
