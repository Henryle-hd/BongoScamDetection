import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BongoScam - SMS Scam Detection",
  description: "Detect fraudulent SMS messages in Swahili using machine learning. Our AI model helps identify common scam patterns in Tanzania with 98.7% accuracy. Enter your SMS to check if it's safe or potentially fraudulent.",
  keywords: ["SMS scam detection", "Tanzania", "Swahili", "machine learning", "fraud prevention", "BongoScam", "AI detection"],
  authors: [{ name: "BongoScam" }],
  openGraph: {
    title: "BongoScam - SMS Scam Detection",
    description: "Detect fraudulent SMS messages in Swahili using machine learning",
    type: "website",
  },
  verification: {
    google: "lAT-DvDhCaiIWhZrdUQsyy0QYOAwkxuVzlFi0I7-4ns",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}