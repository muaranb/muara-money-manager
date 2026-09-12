import { describe, it, expect } from "vitest";
import {
  toCents,
  fromCents,
  formatIDR,
  splitIDRParts,
  excelSerialToDateTime,
  parseIndonesianNumber,
} from "@/lib/money";

describe("Financial Precision & Money Helpers", () => {
  it("converts whole and fractional Rupiah into integer cents", () => {
    expect(toCents(10000)).toBe(1000000);
    expect(toCents(93.65)).toBe(9365);
    expect(toCents(0)).toBe(0);
  });

  it("converts integer cents back to decimal Rupiah", () => {
    expect(fromCents(1000000)).toBe(10000);
    expect(fromCents(9365)).toBe(93.65);
  });

  it("formats IDR accurately with Indonesian dot notation", () => {
    expect(formatIDR(1000000)).toBe("10.000");
    expect(formatIDR(9365, true)).toBe("93,65");
    expect(formatIDR(-2100000)).toBe("-21.000");
  });

  it("splits IDR parts for tri-scale tabular display", () => {
    const parts = splitIDRParts(1718409422); // Rp 17.184.094,22
    expect(parts.sign).toBe("");
    expect(parts.whole).toBe("17.184.094");
    expect(parts.decimals).toBe("22");
  });

  it("converts Excel serial date to ISO date & time (empirically matching Money Manager)", () => {
    // 46267.50351798611 -> 2026-09-02 approx 12:05:04
    const result = excelSerialToDateTime(46267.50351798611);
    expect(result.date).toBe("2026-09-02");
    expect(result.time).toMatch(/^12:05:/);
  });

  it("parses diverse Indonesian number strings into clean floats", () => {
    expect(parseIndonesianNumber("178.277,00")).toBe(178277);
    expect(parseIndonesianNumber("Rp 10.500.000")).toBe(10500000);
    expect(parseIndonesianNumber("-Rp21.000")).toBe(-21000);
    expect(parseIndonesianNumber("50.000")).toBe(50000);
    expect(parseIndonesianNumber(600)).toBe(600);
    expect(parseIndonesianNumber("93,65")).toBe(93.65);
  });
});
