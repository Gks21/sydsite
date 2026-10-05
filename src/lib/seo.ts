import type { Metadata } from "next";
import { publicConfig, site } from "@/lib/config";

const title = {
  default: `${site.name} · ${site.tagline}`,
  template: `%s · ${site.name}`,
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(publicConfig.siteUrl),
  title,
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Sydney’s Beauty Lounge",
    "glamour nails",
    "nail art",
    "nail services",
    "makeup",
    "beauty services",
    "beauty events",
    publicConfig.city,
    publicConfig.region,
  ].filter(Boolean),
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_US",
    url: publicConfig.siteUrl,
    siteName: site.name,
    images: [{ url: "/images/hero-nails.jpg", width: 1600, height: 900, alt: "Glamorous nails in champagne light" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/images/hero-nails.jpg"],
  },
  alternates: { canonical: "/" },
};

export function pageMeta(titleText: string, description: string, path: string): Metadata {
  return {
    title: titleText,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${titleText} · ${site.name}`, description, url: path },
  };
}
