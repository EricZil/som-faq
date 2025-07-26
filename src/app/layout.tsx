import type { Metadata } from "next";
import { Geist, Geist_Mono, DynaPuff } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dynaPuff = DynaPuff({
  variable: "--font-dynapuff",
  subsets: ["latin"],
});

// Using Phantom Sans to match Hack Club's official branding
const phantomSans = {
  variable: "--font-phantom-sans",
  className: "font-sans",
};

export const metadata: Metadata = {
  title: "SoM FAQ Hub - Summer of Making Support",
  description: "Your one-stop destination for all Summer of Making questions and answers, curated and verified by the SoM support team.",
  openGraph: {
    title: "SoM FAQ Hub - Summer of Making Support",
    description: "Your one-stop destination for all Summer of Making questions and answers, curated and verified by the SoM support team.",
    type: "website",
    url: "https://som-faq.vercel.app",
    siteName: "SoM FAQ Hub",
    images: [
      {
          url: "https://som-faq.vercel.app/banner.png",
          width: 1200,
          height: 630,
          alt: "SoM FAQ Hub - Summer of Making Support",
        },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dynaPuff.variable} ${phantomSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
