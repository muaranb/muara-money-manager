import officeCrypto from "officecrypto-tool";
import ExcelJS from "exceljs";
import { toCents, parseIndonesianNumber } from "@/lib/money";

export interface DecryptedMandiriRow {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm:ss
  description: string;
  amountCents: number;
  type: "INCOME" | "EXPENSE";
  balanceCents: number;
}

const MONTH_MAP: Record<string, string> = {
  jan: "01",
  feb: "02",
  mar: "03",
  apr: "04",
  may: "05",
  mei: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  agu: "08",
  sep: "09",
  oct: "10",
  okt: "10",
  nov: "11",
  dec: "12",
  des: "12",
};

function parseMandiriDate(rawDateStr: string): string {
  // e.g. "04 Aug 2026" or "18 Agu 2026"
  const parts = rawDateStr.trim().split(/\s+/);
  if (parts.length >= 3) {
    const day = parts[0].padStart(2, "0");
    const monthKey = parts[1].toLowerCase().slice(0, 3);
    const month = MONTH_MAP[monthKey] || "01";
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split("T")[0];
}

function parseMandiriTime(rawTimeStr: string): string {
  // e.g. "06:41:51 WIB" -> "06:41:51"
  const cleaned = rawTimeStr.replace(/[^\d:]/g, "").trim();
  if (cleaned.length >= 8) {
    return cleaned.slice(0, 8);
  }
  return cleaned || "00:00:00";
}

function cellToString(cell: ExcelJS.Cell): string {
  const val = cell.value;
  if (!val) return "";
  if (typeof val === "object" && (val as any).richText) {
    return (val as any).richText.map((t: any) => t.text).join("");
  }
  return String(val).trim();
}

/**
 * Decrypts password-protected Mandiri Excel e-Statement in memory and parses mutations.
 * Default banking password tested: "01042001".
 */
export async function decryptAndParseMandiriExcel(
  encryptedBuffer: Buffer,
  password = "01042001"
): Promise<DecryptedMandiriRow[]> {
  const decryptedBuffer = await officeCrypto.decrypt(encryptedBuffer, { password });
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(decryptedBuffer as any);

  const worksheet = workbook.getWorksheet("e-Statement") || workbook.worksheets[0];
  if (!worksheet) {
    throw new Error("Worksheet 'e-Statement' not found in decrypted Mandiri file.");
  }

  const results: DecryptedMandiriRow[] = [];

  // Group row pairs by transaction number (No column in col 1 or 2)
  // Headers are rows 16 & 17. Data starts at row 18.
  let pendingDateRow: {
    no: string;
    date: string;
    description: string;
    incoming: string;
    outgoing: string;
    balance: string;
  } | null = null;

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber < 18) return;

    // Col 1 or 2 contains sequence number (1, 2, 3...)
    const no = cellToString(row.getCell(1)) || cellToString(row.getCell(2));
    const col5 = cellToString(row.getCell(5));
    const description = cellToString(row.getCell(8));
    const incoming = cellToString(row.getCell(16));
    const outgoing = cellToString(row.getCell(19));
    const balance = cellToString(row.getCell(22));

    if (!no && !col5) return;

    if (!pendingDateRow) {
      // First line of pair has the Date (e.g. "04 Aug 2026")
      pendingDateRow = {
        no,
        date: parseMandiriDate(col5),
        description,
        incoming,
        outgoing,
        balance,
      };
    } else {
      // Second line of pair has Time (e.g. "06:41:51 WIB")
      const time = parseMandiriTime(col5);
      const isIncome = Boolean(pendingDateRow.incoming && parseIndonesianNumber(pendingDateRow.incoming) > 0);
      const rawAmount = isIncome
        ? parseIndonesianNumber(pendingDateRow.incoming)
        : parseIndonesianNumber(pendingDateRow.outgoing);
      const rawBalance = parseIndonesianNumber(pendingDateRow.balance);

      results.push({
        date: pendingDateRow.date,
        time,
        description: pendingDateRow.description,
        amountCents: toCents(Math.abs(rawAmount)),
        type: isIncome ? "INCOME" : "EXPENSE",
        balanceCents: toCents(rawBalance),
      });

      pendingDateRow = null;
    }
  });

  return results;
}
