import { hasLocalBusinessAddress, publicConfig, site } from "@/lib/config";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: site.name,
    description: site.description,
    url: publicConfig.siteUrl,
    image: `${publicConfig.siteUrl}/images/hero-nails.jpg`,
    telephone: publicConfig.phone || undefined,
    email: publicConfig.email || undefined,
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, Debit Card, Apple Pay, Google Pay, Cash App, Square",
    priceRange: "$$",
    sameAs: [publicConfig.instagramUrl, publicConfig.facebookUrl, publicConfig.tiktokUrl, publicConfig.square.onlineSiteUrl].filter(
      Boolean,
    ),
    ...(hasLocalBusinessAddress()
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: publicConfig.addressLine,
            addressLocality: publicConfig.city,
            addressRegion: publicConfig.region,
            postalCode: publicConfig.postalCode,
            addressCountry: publicConfig.country,
          },
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Beauty services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Glamour nail services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Beauty services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private beauty events" } },
      ],
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: publicConfig.square.bookingUrl,
      name: "Book an appointment",
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
