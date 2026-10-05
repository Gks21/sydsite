import "server-only";
import { publicConfig } from "@/lib/public-config";

function env(name: string, fallback = "") {
  return (process.env[name] ?? fallback).trim();
}

export const serverConfig = {
  square: {
    accessToken: env("SQUARE_ACCESS_TOKEN"),
    environment: env("SQUARE_ENVIRONMENT", "production") === "sandbox" ? "sandbox" : "production",
    applicationId: env("SQUARE_APPLICATION_ID"),
    applicationSecret: env("SQUARE_APPLICATION_SECRET"),
    oauthRedirectUrl: env("SQUARE_OAUTH_REDIRECT_URL"),
    webhookSignatureKey: env("SQUARE_WEBHOOK_SIGNATURE_KEY"),
    bookingEmbedHtml: env("SQUARE_BOOKING_EMBED_HTML"),
    locationId: env("SQUARE_LOCATION_ID", "LBRYDNMWG7G70"),
    merchantId: env("SQUARE_MERCHANT_ID", "MLSNCXNS7XG1F"),
  },
  inquiry: {
    toEmail: env("INQUIRY_TO_EMAIL"),
    resendApiKey: env("RESEND_API_KEY"),
    fromEmail: env("RESEND_FROM_EMAIL", "Sydney’s Beauty Lounge <inquiries@localhost>"),
  },
};

export { publicConfig };
