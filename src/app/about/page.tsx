import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { formattedAddress, hasLocalBusinessAddress, publicConfig, telHref } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "About",
  "Meet Sydney’s Beauty Lounge — a boutique space for glamorous nails, beauty services, and private events, with Square quietly running the business.",
  "/about",
);

export default function AboutPage() {
  return (
    <section className="section">
      <div className="wrap split">
        <div className="prose">
          <p className="eyebrow">The lounge</p>
          <h1>Sydney, and the room she made for glam.</h1>
          <p>
            Sydney’s Beauty Lounge is a boutique practice with a very particular center of gravity: nails that feel
            dressed up without looking costume. Around that, she keeps beauty services, cosmetics, and the option to
            gather privately when a celebration wants more than one appointment.
          </p>
          <p>
            The pace is personal. You book the chair, not a crowd. Confirmations, reminders, invoices, deposits, and
            cards stay in Square so Sydney can keep one calendar, one customer list, and one record of the work.
          </p>
          <p>
            If you already have an appointment, Square is still the place to review it, reschedule, or pay. If you are
            planning something larger — a bridal morning, a birthday, a night in with friends — start on the events
            page and she will meet you there.
          </p>
          {hasLocalBusinessAddress() ? <p>{formattedAddress()}</p> : null}
          {publicConfig.phone ? (
            <p>
              <a href={telHref()}>{publicConfig.phone}</a>
            </p>
          ) : null}
          <div className="cta-row">
            <Button href="/book">Book with Sydney</Button>
            <Button href="/contact" variant="ghost">
              Ask a question
            </Button>
          </div>
        </div>
        <div className="frame" style={{ position: "relative", minHeight: "28rem" }}>
          <Image
            src="/images/lounge-interior.jpg"
            alt="Cream lounge chair and blush roses in a quiet beauty room"
            fill
            sizes="(max-width: 720px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
