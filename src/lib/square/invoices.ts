import { getSquareClient, isSquareApiConfigured } from "@/lib/square/client";
import { serverConfig } from "@/lib/server-config";

export async function listRecentInvoices() {
  if (!isSquareApiConfigured()) return [];
  const client = getSquareClient();
  if (!client) return [];

  const response = await client.invoices.list({
    locationId: serverConfig.square.locationId,
    limit: 5,
  });

  return response.data ?? [];
}
