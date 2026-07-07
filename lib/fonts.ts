import { Archivo, Inter, Space_Grotesk } from "next/font/google";

export const fontBody = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-archivo",
  preload: true,
});

export const fontInter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
  preload: true,
});

export const fontClassNames = `${fontBody.variable} ${fontInter.variable} ${fontDisplay.variable}`;
