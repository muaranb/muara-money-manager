import { describe, it, expect } from "vitest";
import {
  normalizeDescription,
  sanitizeTimeString,
  getFlowDirection,
  buildTransactionFingerprint,
  markDuplicateCandidates,
  ExistingDbTransaction,
} from "@/lib/reconciliation/fingerprint";
import { CandidateTransaction } from "@/lib/reconciliation/transfer-detector";
import { useStagingStore } from "@/store/use-staging-store";

describe("Smart Transaction Fingerprint & Anti-Duplication Engine", () => {
  describe("normalizeDescription", () => {
    it("strips banking channel noise, punctuation, and extra whitespace", () => {
      expect(normalizeDescription("  KARTU DEBIT   SPBU54.601117NGAGL  ")).toBe(
        "spbu54.601117ngagl"
      );
      expect(normalizeDescription("TRSF E-BANKING CR - RIZQI FATIMAH")).toBe(
        "rizqi fatimah"
      );
    });

    it("strips BCA FT sequence & workstation codes (e.g. 2408/FTSCY/WS95011)", () => {
      expect(
        normalizeDescription("TRSF E-BANKING CR 2408/FTSCY/WS95011 LM UTI UMI ADHIYATI")
      ).toBe("lm uti umi adhiyati");

      expect(
        normalizeDescription("TRSF E-BANKING DB 2608/FTFVA/WS95271 72345/DANA 081261531480")
      ).toBe("dana 081261531480");
    });

    it("strips 16-digit debit card numbers", () => {
      expect(
        normalizeDescription("KARTU DEBIT SPBU54.601117NGAGL 6019005055989045")
      ).toBe("spbu54.601117ngagl");
    });

    it("strips VA routing prefixes (e.g. 72345/)", () => {
      expect(
        normalizeDescription("TRSF E-BANKING DB 72345/DANA 081261531480")
      ).toBe("dana 081261531480");
    });

    it("handles BCA payroll codes like 3108/PYBCA/WS95051 vs PYBCA", () => {
      expect(
        normalizeDescription("TRSF E-BANKING CR 3108/PYBCA/WS95051")
      ).toBe("pybca");
      expect(
        normalizeDescription("TRSF E-BANKING CR PYBCA")
      ).toBe("pybca");
    });
  });

  describe("sanitizeTimeString & getFlowDirection", () => {
    it("sanitizes 'null' string and 00:00:00 to empty string", () => {
      expect(sanitizeTimeString("null")).toBe("");
      expect(sanitizeTimeString("undefined")).toBe("");
      expect(sanitizeTimeString("00:00:00")).toBe("");
      expect(sanitizeTimeString("00:00")).toBe("");
      expect(sanitizeTimeString(null)).toBe("");
      expect(sanitizeTimeString(undefined)).toBe("");
      expect(sanitizeTimeString("14:30:15")).toBe("14:30:15");
    });

    it("unifies cash flow directions for INCOME and TRANSFER with CR indicator", () => {
      expect(getFlowDirection("INCOME")).toBe("INFLOW");
      expect(getFlowDirection("EXPENSE")).toBe("OUTFLOW");
      expect(getFlowDirection("TRANSFER", "TRSF E-BANKING CR 3108/PYBCA/WS95051")).toBe("INFLOW");
      expect(getFlowDirection("TRANSFER", "TRSF E-BANKING DB 72345/DANA")).toBe("OUTFLOW");
    });
  });

  describe("buildTransactionFingerprint", () => {
    it("generates identical keys for statements without specific time (BCA PDF)", () => {
      const key1 = buildTransactionFingerprint({
        accountId: "acc-bca",
        date: "2026-08-01",
        amountCents: 1000000,
        type: "EXPENSE",
        description: "BIAYA ADM",
        time: "00:00:00",
      });

      const key2 = buildTransactionFingerprint({
        accountId: "acc-bca",
        date: "2026-08-01",
        amountCents: 1000000,
        type: "EXPENSE",
        description: "   Biaya  Adm   ",
        time: "null", // Even if string "null" is passed!
      });

      expect(key1).toBe(key2);
      expect(key1).toBe("acc-bca|2026-08-01|1000000|OUTFLOW|biaya adm");
    });

    it("includes specific time when available (Mandiri Excel / DANA / QRIS)", () => {
      const keyWithTime = buildTransactionFingerprint({
        accountId: "acc-mandiri",
        date: "2026-08-15",
        amountCents: 5000000,
        type: "EXPENSE",
        description: "Kopi Kenangan",
        time: "14:30:15",
      });

      expect(keyWithTime).toBe(
        "acc-mandiri|2026-08-15|5000000|OUTFLOW|14:30:15|kopi kenangan"
      );
    });
  });

  describe("Real-World BCA Multi-Batch Duplication Simulation", () => {
    const accountMap = new Map<string, string>([
      ["bca (baim)", "acc-bca-id"],
    ]);

    // Simulating Batch 1 already committed in DB:
    const dbTransactions: ExistingDbTransaction[] = [
      {
        accountId: "acc-bca-id",
        date: "2026-08-01",
        amount: 1000000,
        type: "EXPENSE",
        description: "BIAYA ADM",
        time: "00:00:00",
      },
      {
        accountId: "acc-bca-id",
        date: "2026-08-02",
        amount: 10000000,
        type: "EXPENSE",
        description: "KARTU DEBIT SPBU54.601117NGAGL 6019005055989045", // With card number
        time: "00:00:00",
      },
      {
        accountId: "acc-bca-id",
        date: "2026-08-24",
        amount: 2452650000,
        type: "INCOME",
        description: "TRSF E-BANKING CR 2408/FTSCY/WS95011 LM UTI UMI ADHIYATI", // With ref code
        time: "00:00:00",
      },
      {
        accountId: "acc-bca-id",
        date: "2026-08-26",
        amount: 1300000000,
        type: "TRANSFER",
        description: "TRSF E-BANKING DB 2608/FTFVA/WS95271 72345/DANA 081261531480", // With ref and VA
        time: "00:00:00",
      },
      {
        accountId: "acc-bca-id",
        date: "2026-08-31",
        amount: 1707400000,
        type: "TRANSFER", // Classified as TRANSFER in Batch 1
        description: "TRSF E-BANKING CR 3108/PYBCA/WS95051",
        time: "00:00:00",
      },
    ];

    it("successfully detects Batch 2 variations as 100% duplicates", () => {
      // Batch 2 variations: ref codes omitted, time is 'null', card omitted, type is INCOME instead of TRANSFER
      const batch2Candidates: CandidateTransaction[] = [
        {
          id: "b2-1",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-01",
          amountCents: 1000000,
          type: "EXPENSE",
          description: "BIAYA ADM",
          time: "null", // String "null" from AI
        },
        {
          id: "b2-2",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-02",
          amountCents: 10000000,
          type: "EXPENSE",
          description: "KARTU DEBIT SPBU54.601117NGAGL", // Without card number
          time: null,
        },
        {
          id: "b2-3",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-24",
          amountCents: 2452650000,
          type: "INCOME",
          description: "TRSF E-BANKING CR LM UTI UMI ADHIYATI", // Without ref code
          time: "null",
        },
        {
          id: "b2-4",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-26",
          amountCents: 1300000000,
          type: "TRANSFER",
          description: "TRSF E-BANKING DB DANA 081261531480", // Without ref and without VA
          time: "null",
        },
        {
          id: "b2-5",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-31",
          amountCents: 1707400000,
          type: "INCOME", // Classified as INCOME instead of TRANSFER
          description: "TRSF E-BANKING CR 3108/PYBCA/WS95051",
          time: "null",
        },
      ];

      const results = markDuplicateCandidates(batch2Candidates, dbTransactions, accountMap);

      expect(results.every((r) => r.isDuplicate === true)).toBe(true);
      expect(results.filter((r) => r.isDuplicate).length).toBe(5);
    });

    it("successfully detects Batch 3 variations as 100% duplicates", () => {
      // Batch 3 variations: PYBCA without dates or workstations
      const batch3Candidates: CandidateTransaction[] = [
        {
          id: "b3-1",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-26",
          amountCents: 1300000000,
          type: "TRANSFER",
          description: "TRSF E-BANKING DB 72345/DANA 081261531480",
          time: "00:00:00",
        },
        {
          id: "b3-2",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-31",
          amountCents: 1707400000,
          type: "INCOME",
          description: "TRSF E-BANKING CR PYBCA", // Only PYBCA
          time: "00:00:00",
        },
      ];

      const results = markDuplicateCandidates(batch3Candidates, dbTransactions, accountMap);

      expect(results.every((r) => r.isDuplicate === true)).toBe(true);
      expect(results.filter((r) => r.isDuplicate).length).toBe(2);
    });
  });

  describe("Frequency-Aware Multi-Occurrence Matching", () => {
    const accountMap = new Map<string, string>([["bca (baim)", "acc-bca-id"]]);
    const existingDbTransactions: ExistingDbTransaction[] = [
      {
        accountId: "acc-bca-id",
        date: "2026-08-05",
        amount: 5000000,
        type: "EXPENSE",
        description: "Beli Pulsa",
        time: "00:00:00",
      },
    ];

    it("handles multiple identical transactions on the same day via frequency counting", () => {
      const candidates: CandidateTransaction[] = [
        {
          id: "cand-pulsa-1",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-05",
          amountCents: 5000000,
          type: "EXPENSE",
          description: "Beli Pulsa",
          time: "00:00:00",
        },
        {
          id: "cand-pulsa-2",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-05",
          amountCents: 5000000,
          type: "EXPENSE",
          description: "Beli Pulsa",
          time: "00:00:00",
        },
      ];

      const result = markDuplicateCandidates(candidates, existingDbTransactions, accountMap);

      expect(result[0].isDuplicate).toBe(true); // 1st matches the 1 in DB
      expect(result[1].isDuplicate).toBe(false); // 2nd is genuinely new!
    });
  });

  describe("Staging Store Integration", () => {
    it("automatically unchecks duplicate rows by default in setBatch", () => {
      const candidates: CandidateTransaction[] = [
        {
          id: "tx-dupe-1",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-01",
          amountCents: 1000000,
          type: "EXPENSE",
          description: "BIAYA ADM",
          isDuplicate: true,
        },
        {
          id: "tx-new-2",
          sourceWalletName: "BCA (Baim)",
          date: "2026-08-10",
          amountCents: 5000000,
          type: "INCOME",
          description: "Gaji Baru",
          isDuplicate: false,
        },
      ];

      useStagingStore.getState().setBatch("batch-test", "BCA (Baim)", candidates);

      const state = useStagingStore.getState();
      expect(state.selectedRowIds).toEqual(["tx-new-2"]);
      expect(state.selectedRowIds.includes("tx-dupe-1")).toBe(false);
    });
  });
});
