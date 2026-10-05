export const EVENT_TYPES = [
  "Birthday celebration",
  "Girls’ night",
  "Bridal event",
  "Private beauty party",
  "Nail party",
  "Makeup experience",
  "Custom beauty event",
] as const;

export const SERVICE_INTERESTS = [
  "Nails",
  "Nail art",
  "Makeup",
  "Beauty services",
  "Cosmetics",
  "Not sure yet",
] as const;

export type EventInquiryInput = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  eventType: string;
  guestCount: string;
  services: string[];
  details: string;
  kind?: "event" | "contact";
};

export type InquiryValidation =
  | { ok: true; value: EventInquiryInput }
  | { ok: false; errors: Record<string, string> };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(input: Partial<EventInquiryInput>, kind: "event" | "contact" = "event"): InquiryValidation {
  const errors: Record<string, string> = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const preferredDate = (input.preferredDate ?? "").trim();
  const eventType = (input.eventType ?? "").trim();
  const guestCount = (input.guestCount ?? "").trim();
  const details = (input.details ?? "").trim();
  const services = Array.isArray(input.services) ? input.services.map((s) => s.trim()).filter(Boolean) : [];

  if (name.length < 2) errors.name = "Please share your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email.";
  if (phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a phone number.";

  if (kind === "event") {
    if (!preferredDate) errors.preferredDate = "Add a preferred date, even if it might change.";
    if (!eventType) errors.eventType = "Tell Sydney what you’re celebrating.";
    const guests = Number(guestCount);
    if (!guestCount || !Number.isFinite(guests) || guests < 1 || guests > 50) {
      errors.guestCount = "Enter the number of guests.";
    }
    if (!services.length) errors.services = "Choose at least one service of interest.";
  }

  if (kind === "contact" && details.length < 8) {
    errors.details = "A little more detail helps Sydney reply.";
  }

  if (Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      preferredDate,
      eventType,
      guestCount,
      services,
      details,
      kind,
    },
  };
}

export function formatInquiryMessage(inquiry: EventInquiryInput) {
  const lines = [
    `Kind: ${inquiry.kind === "contact" ? "General inquiry" : "Event inquiry"}`,
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
  ];

  if (inquiry.kind !== "contact") {
    lines.push(`Preferred date: ${inquiry.preferredDate}`);
    lines.push(`Event type: ${inquiry.eventType}`);
    lines.push(`Guests: ${inquiry.guestCount}`);
    lines.push(`Services: ${inquiry.services.join(", ")}`);
  }

  if (inquiry.details) lines.push(`Details: ${inquiry.details}`);
  return lines.join("\n");
}
