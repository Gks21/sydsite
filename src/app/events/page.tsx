import type { Metadata } from "next";
import Image from "next/image";
import { InquiryForm } from "@/components/InquiryForm";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Events",
  "Plan a private beauty event with Sydney’s Beauty Lounge. Inquire here, then confirm details and payment through Square.",
  "/events",
);

export default function EventsPage() {
  return (
    <>
      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Private gatherings</p>
            <h1>Make it a beauty event.</h1>
            <p className="lede">
              Some nights ask for more than a single chair. Tell Sydney what you’re celebrating, how many people you
              have in mind, and which services feel right. She’ll shape a custom experience — then send a Square invoice
              when it’s time to confirm.
            </p>
            <p className="price-note">
              Event pricing is custom. This page does not take deposits or card numbers. Square remains the place for
              invoices and payment.
            </p>
          </div>
          <div className="frame" style={{ position: "relative", minHeight: "24rem" }}>
            <Image
              src="/images/events-table.jpg"
              alt="Champagne glasses and cream roses on a candlelit table"
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
      <section className="section section-cream">
        <div className="wrap">
          <p className="eyebrow">Inquiry</p>
          <h2>Start with a conversation.</h2>
          <p className="quiet">Website → event inquiry → Sydney → Square invoice → Square payment.</p>
          <InquiryForm kind="event" />
        </div>
      </section>
    </>
  );
}
