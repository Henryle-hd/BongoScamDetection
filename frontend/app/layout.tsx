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
  title: "BongoScam - SMS Checker | Swahili SMS Scam Detection",
  description: "Tanzania scammers use SMS kuiba pesa by pretending to be watu unaowaaminini, like marafiki wa karibu or ndugu, or by continuing fake mazungumzo about pesa transfers. Common scam phrases like 'NI TUMIE KWA NAMBA HII', fake Freemasons, waganga, landlords, or fake job offers. Using Machine Learning for Swahili SMS detection.",
  keywords: [
    "SMS scam detection",
    "Tanzania SMS",
    "Swahili SMS dataset",
    "machine learning Swahili",
    "nitumie kwa namba hii",
    "BongoScam",
    "AI detection",
    "ujumbe detection",
    "Tanzania scam",
    "SMS checker",
    "Swahili ML model",
    "fraud detection",
    "ujumbe salama",
    "scam prediction",
    "Kaggle dataset",
    "Tanzania cybersecurity"
  ],
  authors: [{ name: "Henrylee Hd" }],
  openGraph: {
    title: "BongoScam - SMS Checker | Swahili SMS Scam Detection",
    description: "Scammers in Tanzania use SMS to steal money by pretending to be people you trust, like close friends or relatives, or by continuing fake conversations about money transfers. Common scam phrases like 'SEND TO THIS NUMBER', fake Freemasons, traditional healers, landlords, or fake job offers. Using Machine Learning for SMS detection. Walaghai Tanzania hutumia SMS kuiba pesa kwa kujifanya ni watu unaowaaminini, kama marafiki wa karibu au ndugu, au kwa kuendeleza mazungumzo ya uongo kuhusu kutuma pesa. Maneno ya kawaida ya utapeli kama 'NI TUMIE KWA NAMBA HII', Freemasons bandia, waganga, wapangaji, au ofa za kazi za uongo. Kutumia Machine Learning kugundua SMS za ulaghai.",    type: "website",
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