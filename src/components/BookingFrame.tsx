"use client";

import { useEffect, useState } from "react";
import { publicConfig } from "@/lib/config";
import { Button } from "@/components/Button";

type Props = {
  embedHtml?: string;
  heading?: string;
};

export function BookingFrame({ embedHtml }: Props) {
  const [failed, setFailed] = useState(false);
  const bookingUrl = publicConfig.square.bookingUrl;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const frame = document.querySelector<HTMLIFrameElement>(".booking-frame");
      if (frame && frame.offsetHeight < 120) setFailed(true);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, []);

  if (embedHtml) {
    return (
      <div className="booking-shell">
        <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
        <p className="booking-fallback quiet">
          If the scheduler does not appear,{" "}
          <a href={bookingUrl} rel="noreferrer" target="_blank">
            open Square booking
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="booking-shell">
      {!failed ? (
        <iframe
          className="booking-frame"
          title="Book an appointment with Sydney’s Beauty Lounge through Square"
          src={bookingUrl}
          allow="payment *; publickey-credentials-get *"
          referrerPolicy="no-referrer-when-downgrade"
          onError={() => setFailed(true)}
        />
      ) : null}
      {failed ? (
        <div className="booking-fallback">
          <h2>Continue in Square</h2>
          <p>
            Availability, staff, deposits, and payment open in Sydney’s Square Appointments scheduler — the same system
            that sends your confirmation.
          </p>
          <Button href={bookingUrl} external>
            Find your appointment
          </Button>
        </div>
      ) : (
        <p className="booking-fallback quiet">
          Prefer a full page?{" "}
          <a href={bookingUrl} rel="noreferrer" target="_blank">
            Open Square booking
          </a>
          .
        </p>
      )}
    </div>
  );
}
