/**
 * Money and Mathematical Precision Utilities (Muara Financial Monolith)
 * Standardizes integer cents (IDR x 100) across the entire engine.
 */

/**
 * Converts Rupiah amount to integer cents (IDR x 100).
 * Prevents floating point errors in monetary calculations.
 * e.g., 10000 -> 1000000, 93.65 -> 9365
 */
export function toCents(rupiah: number): number {
  if (isNaN(rupiah) || !isFinite(rupiah)) return 0;
  return Math.round(rupiah * 100);
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
export function formatIDR(cents: number, includeCents = false): string {
  const rupiah = fromCents(cents);
  const isNegative = rupiah < 0;
  const absValue = Math.abs(rupiah);

  const wholePart = Math.floor(absValue);
  const decimalPart = Math.round((absValue - wholePart) * 100);

  const formattedWhole = wholePart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  let result = (isNegative ? "-" : "") + formattedWhole;
  if (includeCents || decimalPart > 0) {
    result += `,${decimalPart.toString().padStart(2, "0")}`;
  }

  return result;
}

/**
 * Splits integer cents into parts for luxury tri-scale tabular currency component:
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

/**
 * Converts an Excel serial date number (e.g. 46267.50351798611) to ISO date and time.
 * Excel day 1 is 1899-12-31, and includes the 1900 leap year bug (offset 25569).
 */
export function excelSerialToDateTime(serial: number): { date: string; time: string } {
  if (!serial || isNaN(serial)) {
    return { date: new Date().toISOString().split("T")[0], time: "00:00:00" };
  }
  
  const utcMillis = Math.round((serial - 25569) * 86400 * 1000);
  const d = new Date(utcMillis);

  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const hours = String(d.getUTCHours()).padStart(2, "0");
  const minutes = String(d.getUTCMinutes()).padStart(2, "0");
  const seconds = String(d.getUTCSeconds()).padStart(2, "0");

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
}

/**
 * Parses Indonesian currency strings into standard floating numbers:
 * Handles dots as thousands separators and commas as decimals.
 * e.g. "178.277,00" -> 178277, "Rp 10.500.000" -> 10500000, "-Rp21.000" -> -21000
 */
export function parseIndonesianNumber(val: string | number): number {
  if (typeof val === "number") return val;
  if (!val) return 0;
  
  const isNegative = val.includes("-");
  const cleaned = val
    .replace(/[^\d,\.]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
    
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  return isNegative ? -num : num;
}
