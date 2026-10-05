import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { GalleryGrid } from "@/components/GalleryGrid";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Gallery",
  "An editorial look at glamour nails, nail art, makeup, beauty, and events at Sydney’s Beauty Lounge.",
  "/gallery",
);

export default function GalleryPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-intro">
          <p className="eyebrow">Editorial</p>
          <h1>The look of the lounge.</h1>
          <p className="lede">
            Nail photography leads. Makeup, beauty, and events sit beside it. These images set the mood of the brand —
            the live work happens in the chair, and booking happens in Square.
          </p>
        </div>
        <GalleryGrid />
        <div className="cta-row">
          <Button href="/book">Book an appointment</Button>
        </div>
      </div>
    </section>
  );
}
