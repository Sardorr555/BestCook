import type { Metadata } from "next";
import "./globals.css";
import AIAssistant from "@/components/common/AIAssistant";

export const metadata: Metadata = {
  title: "Best Cook — Shaxsiy taom dizayni va buyurtma",
  description:
    "Professional oshpazlar, novvoylar va restoranlardan shaxsiy taom mahsulotlarini dizayn qiling va buyurtma bering. Tort konstruktor, desert, fast food va milliy taomlar.",
  keywords: [
    "tort buyurtma",
    "shaxsiy tort",
    "3D tort dizayn",
    "desert buyurtma",
    "milliy taomlar",
    "Best Cook",
    "food marketplace",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FAF7F2" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <AIAssistant />
      </body>
    </html>
  );
}
