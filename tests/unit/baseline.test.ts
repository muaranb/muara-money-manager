import { describe, it, expect } from "vitest";
import { toCents, fromCents, formatIDR, splitIDRParts } from "@/lib/utils";

describe("Baseline Mathematical Precision & Formatting", () => {
  it("converts whole Rupiah to integer cents correctly", () => {
    expect(toCents(10000)).toBe(1000000);
    expect(toCents(0)).toBe(0);
    expect(toCents(-50000)).toBe(-5000000);
  });

  it("converts decimal Rupiah (bank interest) to integer cents accurately", () => {
    expect(toCents(93.65)).toBe(9365);
    expect(toCents(0.01)).toBe(1);
    expect(toCents(178.277)).toBe(17828); // 178.28 rounds properly
  });

  it("converts integer cents back to Rupiah", () => {
    expect(fromCents(1000000)).toBe(10000);
    expect(fromCents(9365)).toBe(93.65);
    expect(fromCents(0)).toBe(0);
  });

  it("formats integer cents to standard Indonesian Rupiah presentation", () => {
    expect(formatIDR(1000000)).toBe("10.000");
    expect(formatIDR(100000000)).toBe("1.000.000");
    expect(formatIDR(9365, true)).toBe("93,65");
    expect(formatIDR(-5000000)).toBe("-50.000");
  });

  it("splits IDR parts for tri-scale tabular currency component", () => {
    const parts = splitIDRParts(1245000000);
    expect(parts.sign).toBe("");
    expect(parts.whole).toBe("12.450.000");
    expect(parts.decimals).toBe("00");

    const negativeParts = splitIDRParts(-3277100);
    expect(negativeParts.sign).toBe("-");
    expect(negativeParts.whole).toBe("32.771");
    expect(negativeParts.decimals).toBe("00");
  });
});
