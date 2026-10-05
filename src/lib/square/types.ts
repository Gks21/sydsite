export type Money = {
  amount: number;
  currency: string;
  formatted: string;
};

export type ServiceVariation = {
  id: string;
  name: string;
  durationMinutes?: number;
  price?: Money;
  description?: string;
};

export type AppointmentService = {
  id: string;
  name: string;
  description: string;
  categoryName?: string;
  durationMinutes?: number;
  price?: Money;
  variations: ServiceVariation[];
  source: "square";
};

export type RetailProduct = {
  id: string;
  name: string;
  description: string;
  price: Money;
  squareUrl: string;
  source: "square";
};

export function formatMoney(amountCents: number, currency = "USD"): Money {
  const amount = amountCents / 100;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
  return { amount, currency, formatted };
}

export function formatDuration(minutes?: number) {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!rest) return hours === 1 ? "1 hr" : `${hours} hr`;
  return `${hours} hr ${rest} min`;
}
