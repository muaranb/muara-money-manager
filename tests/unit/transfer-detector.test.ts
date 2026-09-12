import { describe, it, expect } from "vitest";
import {
  isWithinSmartWindow,
  detectIntraBatchContraTransfers,
  CandidateTransaction,
} from "@/lib/reconciliation/transfer-detector";

describe("Automatic Contra-Transfer Detection Engine", () => {
  it("validates the Hierarchical Smart Window tolerance", () => {
    // Exact same time
    expect(isWithinSmartWindow("2026-08-05", "10:00:00", "2026-08-05", "10:00:00")).toBe(true);
    // 10 minutes difference (<= 15 min)
    expect(isWithinSmartWindow("2026-08-05", "10:00:00", "2026-08-05", "10:10:00")).toBe(true);
    // 20 minutes difference (> 15 min)
    expect(isWithinSmartWindow("2026-08-05", "10:00:00", "2026-08-05", "10:20:00")).toBe(false);
    // Different dates
    expect(isWithinSmartWindow("2026-08-05", "10:00:00", "2026-08-06", "10:00:00")).toBe(false);
    // One lacks time: same date is accepted
    expect(isWithinSmartWindow("2026-08-05", null, "2026-08-05", "14:30:00")).toBe(true);
  });

  it("automatically pairs opposite debit/credit between two different wallets (e.g. DANA Sendmoney & Blu Dana Masuk)", () => {
    const raw: CandidateTransaction[] = [
      {
        id: "tx-dana-out",
        sourceWalletName: "Dana (Baim)",
        amountCents: 3277100, // Rp 32.771,00
        type: "EXPENSE",
        date: "2026-08-05",
        time: "14:30:00",
        description: "Sendmoney ke Blu",
      },
      {
        id: "tx-blu-in",
        sourceWalletName: "Blu BCA (Baim)",
        amountCents: 3277100, // Rp 32.771,00
        type: "INCOME",
        date: "2026-08-05",
        time: "14:32:15", // 2 minutes later
        description: "Dana Masuk dari BIMA AURASAKTI ROCHMATULLAH",
      },
    ];

    const paired = detectIntraBatchContraTransfers(raw);

    expect(paired[0].type).toBe("TRANSFER");
    expect(paired[1].type).toBe("TRANSFER");
    expect(paired[0].transferPairId).toBeTruthy();
    expect(paired[0].transferPairId).toBe(paired[1].transferPairId);
    expect(paired[0].targetWalletName).toBe("Blu BCA (Baim)");
    expect(paired[1].targetWalletName).toBe("Dana (Baim)");
    expect(paired[0].pairConfidence).toBe("HIGH");
  });

  it("does not pair when transactions are on the same wallet", () => {
    const raw: CandidateTransaction[] = [
      {
        id: "tx-1",
        sourceWalletName: "BCA (Baim)",
        amountCents: 1000000,
        type: "EXPENSE",
        date: "2026-08-10",
        description: "Penarikan",
      },
      {
        id: "tx-2",
        sourceWalletName: "BCA (Baim)",
        amountCents: 1000000,
        type: "INCOME",
        date: "2026-08-10",
        description: "Setoran",
      },
    ];

    const result = detectIntraBatchContraTransfers(raw);
    expect(result[0].type).toBe("EXPENSE");
    expect(result[1].type).toBe("INCOME");
    expect(result[0].transferPairId).toBeUndefined();
  });

  it("marks as AMBIGUOUS when multiple counterpart candidates exist", () => {
    const raw: CandidateTransaction[] = [
      {
        id: "tx-debit",
        sourceWalletName: "BCA (Baim)",
        amountCents: 5000000, // Rp 50.000
        type: "EXPENSE",
        date: "2026-08-15",
        description: "Transfer ke E-Wallet",
      },
      {
        id: "tx-credit-1",
        sourceWalletName: "Dana (Baim)",
        amountCents: 5000000,
        type: "INCOME",
        date: "2026-08-15",
        description: "Topup DANA",
      },
      {
        id: "tx-credit-2",
        sourceWalletName: "Dana (Piya)",
        amountCents: 5000000,
        type: "INCOME",
        date: "2026-08-15",
        description: "Topup DANA Piya",
      },
    ];

    const result = detectIntraBatchContraTransfers(raw);
    expect(result[0].pairConfidence).toBe("AMBIGUOUS");
    expect(result[0].candidatePairIds?.length).toBe(2);
  });
});
