import type { Metadata } from "next";
import { BookingFrame } from "@/components/BookingFrame";
import { Button } from "@/components/Button";
import { serverConfig } from "@/lib/server-config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Book",
  "Ready to get glam? Book Sydney’s Beauty Lounge appointments securely through Square Appointments.",
  "/book",
);

export default function BookPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-intro">
          <p className="eyebrow">Appointments</p>
          <h1>Ready to get glam?</h1>
          <p className="lede">
            Appointments are booked securely through Sydney’s Square scheduling system. Choose a service, pick a time
            that Square shows as open, add your details, and complete any deposit or prepayment she has attached to that
            service. Confirmations and reminders come from Square, not from a second calendar.
          </p>
        </div>
        <BookingFrame embedHtml={serverConfig.square.bookingEmbedHtml || undefined} />
        <div className="cta-row">
          <Button href="/account" variant="ghost">
            Already booked? Manage it in Square
          </Button>
          <Button href="/invoices" variant="ghost">
            Pay an invoice
          </Button>
        </div>
      </div>
    </section>
  );
}
