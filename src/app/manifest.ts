import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f0e7",
    theme_color: "#2b201b",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
