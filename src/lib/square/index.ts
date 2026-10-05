/**
 * Public contract for Square operations.
 * All authenticated Square calls stay server-side.
 */
export { getSquareClient, isSquareApiConfigured } from "@/lib/square/client";
export {
  getAppointmentServices,
  getRetailProducts,
} from "@/lib/square/catalog";
export {
  groupServicesByCategory,
  inferCategory,
  isLikelyNailService,
} from "@/lib/square/categories";
export { getSquareOAuthUrl, exchangeOAuthCode } from "@/lib/square/oauth";
export { verifySquareWebhook, handleSquareWebhook } from "@/lib/square/webhooks";
export type { AppointmentService, RetailProduct, Money } from "@/lib/square/types";
