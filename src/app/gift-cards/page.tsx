import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { publicConfig } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Gift cards",
  "Order a Sydney’s Beauty Lounge eGift card through Square.",
  "/gift-cards",
);

export default function GiftCardsPage() {
  return (
    <section className="section">
      <div className="wrap prose">
        <p className="eyebrow">A little glam, given</p>
        <h1>Gift cards, still Square.</h1>
        <p className="lede">
          eGift cards are ordered through Sydney’s Square gift card flow. Payment stays with Square; the lounge does not
          collect card numbers on this website.
        </p>
        <div className="cta-row">
          <Button href={publicConfig.square.giftCardUrl} external>
            Order a gift card
          </Button>
          <Button href="/book" variant="ghost">
            Book instead
          </Button>
        </div>
      </div>
    </section>
  );
}
