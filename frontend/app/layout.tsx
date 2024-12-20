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
  title: "BongoScam - Ni tumie kwa namba hii sms Detection with Machine Learning",
  description: "scammers often use SMS to steal money by pretending to be people you trust, such as close friends or relatives, or by continuing fake conversations about money transfers. These scams are commonly recognized with phrases like 'NI TUMIE KWA NAMBA HII', or they claim to be agents like Freemasons, landlords, or employers offering fake jobs.",
  keywords: ["SMS scam detection", "Tanzania sms", "Swahili-sms", "machine learning in swahili", "nitumie kwa namba hii", "BongoScam", "AI detection",'swahili sms datset'],
  authors: [{ name: "Henrylee Hd" }],
  openGraph: {
    title: "BongoScam - Ni tumie kwa namba hii sms Detection with Machine Learning",
    description: "scammers often use SMS to steal money by pretending to be people you trust, such as close friends or relatives, or by continuing fake conversations about money transfers. These scams are commonly recognized with phrases like 'NI TUMIE KWA NAMBA HII', or they claim to be agents like Freemasons, landlords, or employers offering fake jobs.",
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