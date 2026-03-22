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
  title: "Easter Games - CCAA | Teacher Breno Vitoriano",
  description: "Plataforma de jogos educativos para aprendizado de inglês do CCAA. Desenvolvida pelo Teacher Breno Vitoriano.",
  keywords: ["CCAA", "Easter Games", "Inglês", "Jogos Educativos", "Aprendizado", "Teacher Breno"],
  authors: [{ name: "Teacher Breno Vitoriano" }],
  icons: {
    icon: "/ccaa-logo.svg",
  },
  openGraph: {
    title: "Easter Games - CCAA",
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
