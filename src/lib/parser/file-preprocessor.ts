/**
 * File Preprocessor Module (Muara Ingestion Pipeline)
 * Normalizes multi-format banking statements and receipts before AI extraction.
 */

export interface PreprocessedDocument {
  fileType: "PDF" | "IMAGE" | "CSV" | "EXCEL_MANDIRI";
  mimeType: string;
  base64Data?: string;
  textContent?: string;
  detectedAccountHint?: string;
  detectedYear?: string;
}

/**
 * Preprocesses Blu BCA CSV files by stripping metadata headers and recap footers.
 */
export function preprocessBluCsv(csvContent: string): {
  cleanCsv: string;
  accountNumber: string;
  accountHolder: string;
} {
  const lines = csvContent.split(/\r?\n/);
  let accountNumber = "000777929188";
  let accountHolder = "Bima Aurasakti Rochmatullah";

  for (const line of lines.slice(0, 5)) {
    if (line.includes("bluAccount")) {
      const match = line.match(/000\d+/);
      if (match) accountNumber = match[0];
    }
    if (line.includes("Nama") || line.includes("Name")) {
      const parts = line.split(",");
      if (parts[2]) accountHolder = parts[2].trim();
    }
  }

  // Find table header row (starts with "Tanggal" or "Date")
  const headerIdx = lines.findIndex((l) =>
    l.toLowerCase().includes("tanggal") || l.toLowerCase().includes("date")
  );

  if (headerIdx === -1) {
    return { cleanCsv: csvContent, accountNumber, accountHolder };
  }

  // Collect data rows until an empty line or summary footer
  const contentLines: string[] = [lines[headerIdx]];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith(",,,,")) break;
    // Check if line starts with date DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}/.test(line)) {
      contentLines.push(line);
    }
  }

  return {
    cleanCsv: contentLines.join("\n"),
    accountNumber,
    accountHolder,
  };
}

/**
 * Deduplicates DANA e-wallet transactions where split breakdown rows
 * (item line vs Saldo DANA payment line) appear for the same transaction.
 */
export function deduplicateDanaTransactions<T extends {
  date: string;
  time?: string | null;
  amountCents: number;
  description: string;
}>(items: T[]): T[] {
  const seen = new Set<string>();
  const results: T[] = [];

  for (const item of items) {
    // Key based on date + amount + time (hour and minute)
    const timeKey = item.time ? item.time.slice(0, 5) : "";
    const key = `${item.date}_${timeKey}_${item.amountCents}`;

    if (seen.has(key)) {
      // If we've already seen this exact amount on the same minute:
      // If current item mentions "Saldo DANA", prefer it or keep the existing one
      continue;
    }

    seen.add(key);
    results.push(item);
  }

  return results;
}
