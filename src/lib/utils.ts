import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes safely with clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts Rupiah amount to integer cents (IDR x 100).
 * Prevents floating point errors in monetary calculations.
 * e.g., 10000 -> 1000000, 93.65 -> 9365
 */
export function toCents(amount: number): number {
  if (isNaN(amount) || !isFinite(amount)) return 0;
  return Math.round(amount * 100);
}

/**
 * Converts integer cents back to floating Rupiah.
 * e.g., 1000000 -> 10000, 9365 -> 93.65
 */
export function fromCents(cents: number): number {
  if (isNaN(cents) || !isFinite(cents)) return 0;
  return cents / 100;
}

/**
 * Formats integer cents into standard Indonesian Rupiah presentation.
 * Returns formatted string with dot as thousands separator and optional comma decimals.
 * e.g., 1000000 -> "10.000" or "10.000,00"
 */
export function formatIDR(cents: number, includeDecimals = false): string {
  const rupiah = fromCents(cents);
  const isNegative = rupiah < 0;
  const absValue = Math.abs(rupiah);
  
  const wholePart = Math.floor(absValue);
  const decimalPart = Math.round((absValue - wholePart) * 100);
  
  const formattedWhole = wholePart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  let result = (isNegative ? "-" : "") + formattedWhole;
  if (includeDecimals || decimalPart > 0) {
    result += `,${decimalPart.toString().padStart(2, "0")}`;
  }
  
  return result;
}

/**
 * Splits integer cents into parts for luxury tri-scale tabular typography:
 * { sign: string, whole: string, decimals: string }
 */
export function splitIDRParts(cents: number) {
  const rupiah = fromCents(cents);
  const isNegative = rupiah < 0;
  const absValue = Math.abs(rupiah);
  
  const wholePart = Math.floor(absValue);
  const decimalPart = Math.round((absValue - wholePart) * 100);
  
  return {
    sign: isNegative ? "-" : "",
    whole: wholePart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    decimals: decimalPart.toString().padStart(2, "0"),
  };
}
