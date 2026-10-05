import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { publicConfig } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Your appointments",
  "Manage upcoming and past Sydney’s Beauty Lounge appointments through Square, including profile, payments, and receipts.",
  "/account",
);

export default function AccountPage() {
  return (
    <section className="section">
      <div className="wrap prose">
        <p className="eyebrow">Customer experience</p>
        <h1>Your appointments live in Square.</h1>
        <p className="lede">
          Upcoming visits, past visits, your profile, payment methods Square has on file, receipts, and any changes to a
          booking are part of Square’s customer experience — not a second login invented for this website.
        </p>
        <ul>
          <li>Review or change an appointment in Square</li>
          <li>Read confirmations and reminders Square already sends</li>
          <li>Pay invoices and deposits through Square’s secure checkout</li>
        </ul>
        <div className="cta-row">
          <Button href={publicConfig.square.customerPortalUrl} external>
            Manage in Square
          </Button>
          <Button href="/book" variant="ghost">
            Book a new appointment
          </Button>
        </div>
      </div>
    </section>
  );
}
