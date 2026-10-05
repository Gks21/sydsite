import { getSquareClient, isSquareApiConfigured } from "@/lib/square/client";
import { serverConfig } from "@/lib/server-config";

export async function searchAvailabilityPlaceholder() {
  if (!isSquareApiConfigured()) return [];
  const client = getSquareClient();
  if (!client) return [];
  return client.bookings;
}

export function getBookingLocationId() {
  return serverConfig.square.locationId;
}
