import type { MetadataRoute } from "next";
import { publicConfig } from "@/lib/config";

const pages = ["", "/services", "/nails", "/events", "/gallery", "/about", "/book", "/contact", "/invoices", "/account", "/gift-cards"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((path) => ({
    url: `${publicConfig.siteUrl}${path || "/"}`,
    lastModified,
    changeFrequency: path === "/book" ? "daily" : "weekly",
    priority: path === "" || path === "/book" ? 1 : 0.7,
  }));
}
