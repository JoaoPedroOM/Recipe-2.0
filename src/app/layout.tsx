import type { Metadata } from "next";
import { Nunito, Rokkitt } from "next/font/google";
import "./globals.css";
import 'easymde/dist/easymde.min.css'

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
  title: "Recipe",
  description: "Compartilhe suas receitas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${NunitoFonte.variable} ${RokkittFonte.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
