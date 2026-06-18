import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { StructuredData } from "./structured-data"

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wordassociation.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Word Association — Daily Word Chain Puzzle",
    template: "%s | Word Association",
  },
  description:
    "A free daily word chain puzzle game. Associate 8 words in sequence using compound words and popular phrases. A new challenge every day.",
  keywords: [
    "word association",
    "word game",
    "daily puzzle",
    "word chain",
    "word puzzle",
    "brain game",
    "compound words",
    "free game",
    "wordle alternative",
  ],
  authors: [{ name: "Word Association" }],
  creator: "Word Association",
  publisher: "Word Association",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Word Association",
    title: "Word Association — Daily Word Chain Puzzle",
    description:
      "A free daily word chain puzzle game. Associate 8 words in sequence using compound words and popular phrases. A new challenge every day.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Word Association — Daily Word Chain Puzzle",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Association — Daily Word Chain Puzzle",
    description:
      "A free daily word chain puzzle game. Associate 8 words in sequence using compound words and popular phrases.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StructuredData />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
