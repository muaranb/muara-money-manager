import { describe, it, expect } from "vitest";

describe("Strict Operational Cash Flow Isolation (Transfer Neutrality)", () => {
  it("verifies that inter-wallet transfers do not inflate operational income or expense", () => {
    // Simulating transaction records in a given month
    const mockTransactions = [
      {
        id: "tx-salary",
        amountCents: 1500000000, // Rp 15.000.000
        type: "INCOME",
        transferPairId: null,
        category: "💲 Pemasukan Utama",
      },
      {
        id: "tx-rent",
        amountCents: 250000000, // Rp 2.500.000
        type: "EXPENSE",
        transferPairId: null,
        category: "🏠 Tempat Tinggal",
      },
      {
        id: "tx-transfer-debit",
        amountCents: 500000000, // Rp 5.000.000 moved from BCA to Blu
        type: "TRANSFER",
        transferPairId: "pair-123",
        category: "🔄 Pindah Uang",
      },
      {
        id: "tx-transfer-credit",
        amountCents: 500000000, // Rp 5.000.000 received in Blu from BCA
        type: "TRANSFER",
        transferPairId: "pair-123",
        category: "🔄 Pindah Uang",
      },
    ];

    // Filter operational income (excluding transfers)
    const operationalIncome = mockTransactions
      .filter((t) => t.type === "INCOME" && !t.transferPairId && t.category !== "🔄 Pindah Uang")
      .reduce((sum, t) => sum + t.amountCents, 0);

    // Filter operational expense (excluding transfers)
    const operationalExpense = mockTransactions
      .filter((t) => t.type === "EXPENSE" && !t.transferPairId && t.category !== "🔄 Pindah Uang")
      .reduce((sum, t) => sum + t.amountCents, 0);

    // Filter transfers
    const transferTxs = mockTransactions.filter(
      (t) => t.type === "TRANSFER" || t.transferPairId !== null
    );
    const transferVolume = transferTxs.reduce((sum, t) => sum + t.amountCents, 0) / 2;

    expect(operationalIncome).toBe(1500000000); // Only salary
    expect(operationalExpense).toBe(250000000); // Only rent
    expect(operationalIncome - operationalExpense).toBe(1250000000); // Net cashflow
    expect(transferVolume).toBe(500000000); // Single-sided transfer volume: Rp 5.000.000
  });
});
