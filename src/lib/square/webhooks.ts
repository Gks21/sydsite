import { createHmac, timingSafeEqual } from "crypto";
import { serverConfig } from "@/lib/server-config";

export function verifySquareWebhook(signature: string, body: string, notificationUrl: string) {
  const key = serverConfig.square.webhookSignatureKey;
  if (!key || !signature) return false;

  const hmac = createHmac("sha256", key);
  hmac.update(notificationUrl + body);
  const digest = Buffer.from(hmac.digest("base64"));
  const incoming = Buffer.from(signature);

  if (digest.length !== incoming.length) return false;
  return timingSafeEqual(digest, incoming);
}

export type SquareWebhookEvent = {
  type?: string;
  event_id?: string;
  merchant_id?: string;
  data?: { type?: string; id?: string; object?: unknown };
};

export async function handleSquareWebhook(event: SquareWebhookEvent) {
  switch (event.type) {
    case "booking.created":
    case "booking.updated":
    case "invoice.published":
    case "invoice.payment_made":
    case "payment.updated":
    case "customer.created":
    case "customer.updated":
      console.info("Square webhook received", { type: event.type, eventId: event.event_id });
      return { handled: true };
    default:
      console.info("Square webhook ignored", { type: event.type, eventId: event.event_id });
      return { handled: false };
  }
}
