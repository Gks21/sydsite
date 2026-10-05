import { getSquareClient, isSquareApiConfigured } from "@/lib/square/client";

export async function createSquareCustomer(input: {
  givenName: string;
  familyName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  note?: string;
}) {
  if (!isSquareApiConfigured()) return null;
  const client = getSquareClient();
  if (!client) return null;

  const response = await client.customers.create({
    givenName: input.givenName,
    familyName: input.familyName,
    emailAddress: input.emailAddress,
    phoneNumber: input.phoneNumber,
    note: input.note,
  });

  return response.customer ?? null;
}
