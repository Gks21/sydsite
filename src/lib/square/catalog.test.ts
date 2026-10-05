import { describe, expect, it } from "vitest";
import { formatDuration, formatMoney } from "@/lib/square/types";
import { inferCategory } from "@/lib/square/categories";

describe("square catalog helpers", () => {
  it("formats USD from Square cents", () => {
    expect(formatMoney(750).formatted).toBe("$7.50");
  });

  it("formats durations from minutes", () => {
    expect(formatDuration(45)).toBe("45 min");
    expect(formatDuration(60)).toBe("1 hr");
    expect(formatDuration(90)).toBe("1 hr 30 min");
  });

  it("classifies nail services from Square names without inventing prices", () => {
    expect(
      inferCategory({
        id: "1",
        name: "Gel overlay",
        description: "",
        variations: [],
        source: "square",
      }),
    ).toBe("Nails");
  });
});
