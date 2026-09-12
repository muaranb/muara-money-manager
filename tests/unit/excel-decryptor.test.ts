import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { decryptAndParseMandiriExcel } from "@/lib/parser/excel-decryptor";

describe("Mandiri Excel In-Memory Decryptor & Parser", () => {
  const filePath = path.resolve(process.cwd(), "data-example/Mandiri-Agu-2026.xlsx");

  it("successfully decrypts and parses Mandiri e-Statement with password '01042001'", async () => {
    const buffer = fs.readFileSync(filePath);
    const rows = await decryptAndParseMandiriExcel(buffer, "01042001");

    expect(rows.length).toBe(3);

    // Transaction 1: Biaya administrasi kartu debit
    expect(rows[0].date).toBe("2026-08-04");
    expect(rows[0].time).toBe("06:41:51");
    expect(rows[0].type).toBe("EXPENSE");
    expect(rows[0].amountCents).toBe(400000); // Rp 4.000,00 -> 400.000 sen
    expect(rows[0].description).toContain("Biaya administrasi kartu debit");

    // Transaction 2: Transfer ke Bank Mandiri Nafia Mufidah
    expect(rows[1].date).toBe("2026-08-18");
    expect(rows[1].time).toBe("21:32:33");
    expect(rows[1].type).toBe("EXPENSE");
    expect(rows[1].amountCents).toBe(17827700); // Rp 178.277,00 -> 17.827.700 sen
    expect(rows[1].description).toContain("NAFIA MUFIDAH FATCHU");

    // Transaction 3: Biaya administrasi rekening
    expect(rows[2].date).toBe("2026-08-31");
    expect(rows[2].time).toBe("23:59:00");
    expect(rows[2].type).toBe("EXPENSE");
    expect(rows[2].amountCents).toBe(1300000); // Rp 13.000,00 -> 1.300.000 sen
  });

  it("throws an error when an incorrect password is provided", async () => {
    const buffer = fs.readFileSync(filePath);
    await expect(decryptAndParseMandiriExcel(buffer, "wrong_password")).rejects.toThrow();
  });
});
