import type { Metadata } from "next";
import "./globals.css";
import { TokensProvider } from "@/components/providers/TokensProvider";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DataRiver } from "@/components/motion/DataRiver";
import { fontClassNames } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "KORUVISION — CRM + IA para WhatsApp",
  description: "Suas conversas viram receita previsível. CRM com IA para WhatsApp.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontClassNames} suppressHydrationWarning>
      <body suppressHydrationWarning>
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
