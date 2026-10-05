import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileBookBar } from "@/components/MobileBookBar";
import { JsonLd } from "@/components/JsonLd";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <JsonLd />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBookBar />
      </body>
    </html>
  );
}
