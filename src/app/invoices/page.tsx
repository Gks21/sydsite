import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { publicConfig } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Invoices",
  "Pay a Sydney’s Beauty Lounge invoice securely through Square. This website does not collect card numbers.",
  "/invoices",
);

export default function InvoicesPage() {
  return (
    <section className="section">
      <div className="wrap prose">
        <p className="eyebrow">Square invoices</p>
        <h1>Pay the way Sydney already invoices.</h1>
        <p className="lede">
          Custom events, remaining balances, and special requests may arrive as a Square invoice. Open the link in
          Sydney’s message and pay there — cards, Apple Pay, Google Pay, and other Square wallets, depending on what she
          has enabled.
        </p>
        <p>
          This website never stores raw card information. If you cannot find the invoice email, write through the contact
          form and Sydney can resend it from Square.
        </p>
        <div className="cta-row">
          <Button href={publicConfig.square.customerPortalUrl} external>
            Open Square
          </Button>
          <Button href="/contact" variant="secondary">
            Need the invoice resent?
          </Button>
        </div>
      </div>
    </section>
  );
}
