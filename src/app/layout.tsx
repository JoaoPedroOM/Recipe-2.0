import type { Metadata } from "next";
import { Nunito, Rokkitt } from "next/font/google";
import "./globals.css";
import 'easymde/dist/easymde.min.css'
import { Toaster } from "@/components/ui/toaster";

const NunitoFonte = Nunito({
  variable: "--nunito",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const RokkittFonte = Rokkitt({
  variable: "--rokkitt",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Chef House",
  description: "Chef House é a plataforma ideal para compartilhar suas receitas culinárias com uma comunidade apaixonada por gastronomia."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        suppressHydrationWarning={true}
        className={`${NunitoFonte.variable} ${RokkittFonte.variable} antialiased`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
