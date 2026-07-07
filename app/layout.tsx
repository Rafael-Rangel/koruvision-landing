import type { Metadata } from "next";
import "./globals.css";
import { TokensProvider } from "@/components/providers/TokensProvider";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DataRiver } from "@/components/motion/DataRiver";

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
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
