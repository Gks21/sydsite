import { describe, expect, it } from "vitest";
import { formatInquiryMessage, validateInquiry } from "@/lib/inquiries";

describe("validateInquiry", () => {
  it("accepts a complete event inquiry", () => {
    const result = validateInquiry({
      name: "Jordan Lee",
      email: "jordan@example.com",
      phone: "5025550100",
      preferredDate: "2026-11-08",
      eventType: "Bridal event",
      guestCount: "6",
      services: ["Nails", "Makeup"],
      details: "Getting ready together before the ceremony.",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects missing event fields", () => {
    const result = validateInquiry({ name: "A", email: "bad", phone: "1" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.name).toBeTruthy();
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.phone).toBeTruthy();
      expect(result.errors.eventType).toBeTruthy();
    }
  });

  it("requires detail on contact inquiries", () => {
    const result = validateInquiry(
      { name: "Jordan Lee", email: "jordan@example.com", phone: "5025550100", details: "Hi" },
      "contact",
    );
    expect(result.ok).toBe(false);
  });

  it("formats a message without inventing services", () => {
    const message = formatInquiryMessage({
      name: "Jordan Lee",
      email: "jordan@example.com",
      phone: "5025550100",
      preferredDate: "2026-11-08",
      eventType: "Custom beauty event",
      guestCount: "4",
      services: ["Nails"],
      details: "Please invoice through Square if we book.",
      kind: "event",
    });
    expect(message).toContain("Event type: Custom beauty event");
    expect(message).toContain("Services: Nails");
  });
});
