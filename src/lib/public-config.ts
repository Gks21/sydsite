function env(name: string, fallback = "") {
  return (process.env[name] ?? fallback).trim();
}

export const site = {
  name: "Sydney’s Beauty Lounge",
  shortName: "Sydney’s",
  tagline: "Beauty, but make it glam.",
  nailsHeadline: "Glamour at your fingertips.",
  eventsHeadline: "Make it a beauty event.",
  description:
    "A boutique beauty lounge specializing in glamorous nail services, with cosmetics, beauty appointments, and private event experiences. Appointments, payments, and invoices are handled securely through Square.",
} as const;

export const publicConfig = {
  siteUrl: env("NEXT_PUBLIC_SITE_URL", "http://localhost:3000").replace(/\/$/, ""),
  phone: env("NEXT_PUBLIC_PHONE"),
  email: env("NEXT_PUBLIC_EMAIL"),
  addressLine: env("NEXT_PUBLIC_ADDRESS_LINE"),
  city: env("NEXT_PUBLIC_CITY"),
  region: env("NEXT_PUBLIC_REGION"),
  postalCode: env("NEXT_PUBLIC_POSTAL_CODE"),
  country: env("NEXT_PUBLIC_COUNTRY", "US"),
  instagramUrl: env("NEXT_PUBLIC_INSTAGRAM_URL"),
  facebookUrl: env("NEXT_PUBLIC_FACEBOOK_URL"),
  tiktokUrl: env("NEXT_PUBLIC_TIKTOK_URL"),
  square: {
    bookingUrl: env(
      "NEXT_PUBLIC_SQUARE_BOOKING_URL",
      "https://book.squareup.com/appointments/MLSNCXNS7XG1F/location/LBRYDNMWG7G70/services",
    ),
    onlineSiteUrl: env(
      "NEXT_PUBLIC_SQUARE_ONLINE_SITE_URL",
      "https://xn--sydneysbeautylounge-qc6k.square.site/",
    ),
    giftCardUrl: env(
      "NEXT_PUBLIC_SQUARE_GIFT_CARD_URL",
      "https://app.squareup.com/gift/MLSNCXNS7XG1F/order",
    ),
    customerPortalUrl: env(
      "NEXT_PUBLIC_SQUARE_CUSTOMER_PORTAL_URL",
      "https://book.squareup.com/appointments/MLSNCXNS7XG1F/location/LBRYDNMWG7G70/services",
    ),
  },
};

export function hasLocalBusinessAddress() {
  return Boolean(publicConfig.addressLine && publicConfig.city);
}

export function formattedAddress() {
  const parts = [
    publicConfig.addressLine,
    [publicConfig.city, publicConfig.region, publicConfig.postalCode].filter(Boolean).join(", "),
  ].filter(Boolean);
  return parts.join(" · ");
}

export function telHref() {
  const digits = publicConfig.phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/nails", label: "Nails" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
] as const;

export const bookNav = { href: "/book", label: "Book" } as const;
