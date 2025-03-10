import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/ui/CustomCursor";
import CustomBackground from "./components/ui/CustomBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venâncio Wapinda",
  description: "Venâncio Wapinda é um desenvolvedor de software especializado em desenvolvimento web e mobile. Ele é apaixonado por criar produtos digitais que ajudam as pessoas a resolver problemas do mundo real. Venâncio é um desenvolvedor autodidata que adora aprender novas tecnologias e compartilhar conhecimento com a comunidade.",
  keywords: [
    "Developer", "Ui Designer", "Frontend Developer", "Backend Developer", "Fullstack Developer", "React Developer", "Nextjs Developer", "Nodejs Developer", "Javascript Developer", "Typescript Developer", "Web Developer", "Mobile Developer", "Desktop Developer", "Software Developer", "Venâncio Wapinda"
  ],
  other: {
    "google-site-verification": ""
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="PT-pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
