import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Contact",
  "Questions for Sydney’s Beauty Lounge. Event planning and general notes are welcome here; appointments stay in Square.",
  "/contact",
);

export default function ContactPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-intro">
          <p className="eyebrow">Contact</p>
          <h1>A note, not a second inbox for appointments.</h1>
          <p className="lede">
            Use this for general questions. For a date and time, Square already has Sydney’s availability. For a
            celebration, the events page is the better start.
          </p>
        </div>
        <InquiryForm kind="contact" />
      </div>
    </section>
  );
}
