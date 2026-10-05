import { getSquareClient, isSquareApiConfigured } from "@/lib/square/client";
import { serverConfig } from "@/lib/server-config";
import { formatMoney, type AppointmentService, type RetailProduct } from "@/lib/square/types";
import { squareRetailProducts } from "@/content/retail";

type CatalogItem = {
  id?: string;
  itemData?: {
    name?: string;
    description?: string;
    productType?: string;
    categories?: { id?: string }[];
    variations?: {
      id?: string;
      itemVariationData?: {
        name?: string;
        priceMoney?: { amount?: bigint | number; currency?: string };
        serviceDuration?: bigint | number;
      };
    }[];
  };
};

function minutesFromMs(value?: bigint | number) {
  if (value === undefined) return undefined;
  const ms = typeof value === "bigint" ? Number(value) : value;
  if (!Number.isFinite(ms) || ms <= 0) return undefined;
  return Math.round(ms / 60000);
}

function moneyFromSquare(price?: { amount?: bigint | number; currency?: string }) {
  if (!price || price.amount === undefined) return undefined;
  const cents = typeof price.amount === "bigint" ? Number(price.amount) : price.amount;
  if (!Number.isFinite(cents)) return undefined;
  return formatMoney(cents, price.currency || "USD");
}

function mapAppointmentService(item: CatalogItem): AppointmentService | null {
  const data = item.itemData;
  if (!item.id || !data?.name) return null;

  const variations =
    data.variations
      ?.map((variation) => {
        if (!variation.id) return null;
        const v = variation.itemVariationData;
        return {
          id: variation.id,
          name: v?.name && v.name !== "Regular" ? v.name : data.name ?? "Service",
          durationMinutes: minutesFromMs(v?.serviceDuration),
          price: moneyFromSquare(v?.priceMoney),
        };
      })
      .filter((value): value is NonNullable<typeof value> => Boolean(value)) ?? [];

  const primary = variations[0];

  return {
    id: item.id,
    name: data.name,
    description: data.description?.trim() ?? "",
    durationMinutes: primary?.durationMinutes,
    price: primary?.price,
    variations,
    source: "square",
  };
}

export async function getAppointmentServices(): Promise<AppointmentService[]> {
  if (!isSquareApiConfigured()) return [];

  const client = getSquareClient();
  if (!client) return [];

  try {
    const response = await client.catalog.searchItems({
      productTypes: ["APPOINTMENTS_SERVICE"],
      enabledLocationIds: serverConfig.square.locationId
        ? [serverConfig.square.locationId]
        : undefined,
    });

    const items = (response.items ?? []) as CatalogItem[];
    return items
      .map(mapAppointmentService)
      .filter((value): value is AppointmentService => Boolean(value));
  } catch (error) {
    console.error("Square catalog search failed", error);
    return [];
  }
}

export async function getRetailProducts(): Promise<RetailProduct[]> {
  if (!isSquareApiConfigured()) return squareRetailProducts;

  const client = getSquareClient();
  if (!client) return squareRetailProducts;

  try {
    const response = await client.catalog.searchItems({
      productTypes: ["REGULAR"],
    });
    const items = (response.items ?? []) as CatalogItem[];
    const mapped = items
      .map((item) => {
        const data = item.itemData;
        if (!item.id || !data?.name) return null;
        const variation = data.variations?.[0]?.itemVariationData;
        const price = moneyFromSquare(variation?.priceMoney);
        if (!price) return null;
        return {
          id: item.id,
          name: data.name,
          description: data.description?.trim() ?? "",
          price,
          squareUrl: `${process.env.NEXT_PUBLIC_SQUARE_ONLINE_SITE_URL ?? "https://xn--sydneysbeautylounge-qc6k.square.site/"}`,
          source: "square" as const,
        };
      })
      .filter((value): value is RetailProduct => Boolean(value));

    return mapped.length ? mapped : squareRetailProducts;
  } catch (error) {
    console.error("Square retail catalog search failed", error);
    return squareRetailProducts;
  }
}
