import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ester Games - CCAA | Professor Breno Vitoriano",
  description: "Plataforma de jogos educativos para aprendizado de inglês do CCAA. Desenvolvida pelo Professor Breno Vitoriano.",
  keywords: ["CCAA", "Ester Games", "Inglês", "Jogos Educativos", "Aprendizado", "Professor Breno"],
  authors: [{ name: "Professor Breno Vitoriano" }],
  icons: {
    icon: "/ccaa-logo.gif",
  },
  openGraph: {
    title: "Ester Games - CCAA",
    description: "Jogos educativos para aprender inglês de forma divertida",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
