import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Olamilekan David Adegoke | Pacy Labs — Systems Architect & Doctor of Optometry",
  description:
    "Portfolio and engineering lab of Olamilekan David Adegoke (@kryptopacy). Engineering deterministic enterprise operating systems, W3C WebMCP standards, autonomous agent protocols, and high-concurrency state machines with clinical diagnostic rigor.",
  keywords: [
    "Olamilekan David Adegoke",
    "kryptopacy",
    "Pacy Labs",
    "pacylabs.xyz",
    "Systems Architect",
    "Doctor of Optometry",
    "WebMCP",
    "Autonomous Agent Skills",
    "Wetaego",
    "CruiseHQ",
    "GEBO",
    "CaelumOS",
    "PitchBuddy",
    "Joebrown Palace Hotel",
    "DreamwiseHUB",
  ],
  authors: [{ name: "Olamilekan David Adegoke", url: "https://pacylabs.xyz" }],
  openGraph: {
    title: "Olamilekan David Adegoke | Pacy Labs",
    description:
      "Engineering deterministic distributed systems, W3C WebMCP standards, and autonomous agent protocols with clinical diagnostic rigor.",
    url: "https://pacylabs.xyz",
    siteName: "Pacy Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olamilekan David Adegoke | Pacy Labs",
    description:
      "Systems Architect & Doctor of Optometry. Engineering autonomous agent protocols and deterministic state machines.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#090a0d] text-[#ededed]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
