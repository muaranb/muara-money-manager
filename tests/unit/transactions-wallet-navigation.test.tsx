import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  TransactionsClient,
  TransactionRow,
} from "@/components/transactions/transactions-client";
import { AccountsClient } from "@/components/accounts/accounts-client";
import { Account } from "@/db/schema";

const currentYear = new Date().getFullYear();
const currentMonthNumber = String(new Date().getMonth() + 1).padStart(2, "0");
const currentMonthStr = `${currentYear}-${currentMonthNumber}`;

const mockTransactions: TransactionRow[] = [
  {
    id: "tx-1",
    date: `${currentMonthStr}-02`,
    time: "10:00:00",
    amount: 5000000,
    type: "EXPENSE",
    description: "Kopi Kenangan",
    note: null,
    sourceType: "CSV",
    transferPairId: null,
    accountName: "BCA (Baim)",
    categoryName: "Makanan & Minuman",
  },
  {
    id: "tx-2",
    date: `${currentMonthStr}-03`,
    time: "14:30:00",
    amount: 12000000,
    type: "INCOME",
    description: "Gaji Mandiri",
    note: null,
    sourceType: "EXCEL",
    transferPairId: null,
    accountName: "Mandiri (Baim)",
    categoryName: "Gaji",
  },
  {
    id: "tx-3",
    date: `${currentMonthStr}-04`,
    time: "09:00:00",
    amount: 2500000,
    type: "TRANSFER",
    description: "Topup DANA",
    note: null,
    sourceType: "MANUAL",
    transferPairId: null,
    accountName: "DANA (Baim)",
    categoryName: "🔄 Pindah Uang",
  },
];

const mockAccounts: Account[] = [
  {
    id: "acc-1",
    name: "BCA (Baim)",
    accountNumber: "1234567890",
    accountHolder: "BIMA",
    currency: "IDR",
    initialBalance: 0,
    type: "BANK",
    currentBalance: 15000000,
    createdAt: "2026-01-01 00:00:00",
    updatedAt: "2026-01-01 00:00:00",
  },
  {
    id: "acc-2",
    name: "Mandiri (Baim)",
    accountNumber: "0987654321",
    accountHolder: "BIMA",
    currency: "IDR",
    initialBalance: 0,
    type: "BANK",
    currentBalance: 25000000,
    createdAt: "2026-01-01 00:00:00",
    updatedAt: "2026-01-01 00:00:00",
  },
];

describe("Wallet Card Click & Navigation to Transactions", () => {
  it("renders wallet cards as semantic Links pointing to /transactions?wallet=...", () => {
    render(<AccountsClient initialAccounts={mockAccounts} />);

    const bcaCard = screen.getByRole("link", {
      name: /Buka riwayat transaksi untuk BCA \(Baim\)/i,
    });
    expect(bcaCard).toBeDefined();
    expect(bcaCard.getAttribute("href")).toBe("/transactions?wallet=BCA%20(Baim)");

    const mandiriCard = screen.getByRole("link", {
      name: /Buka riwayat transaksi untuk Mandiri \(Baim\)/i,
    });
    expect(mandiriCard).toBeDefined();
    expect(mandiriCard.getAttribute("href")).toBe(
      "/transactions?wallet=Mandiri%20(Baim)"
    );
  });

  it("filters transactions automatically when initialWallet is provided", () => {
    const { container } = render(
      <TransactionsClient
        initialTransactions={mockTransactions}
        accounts={["BCA (Baim)", "Mandiri (Baim)", "DANA (Baim)"]}
        initialWallet="BCA (Baim)"
      />
    );

    // Only BCA transactions should be visible
    expect(screen.getByText("Kopi Kenangan")).toBeDefined();
    expect(screen.queryByText("Gaji Mandiri")).toBeNull();
    expect(screen.queryByText("Topup DANA")).toBeNull();
    expect(container.textContent).toContain("1 dari 3 transaksi");

    // Reset filter should be available since wallet filter is active
    const resetBtn = screen.getByText("Reset Filter");
    expect(resetBtn).toBeDefined();
  });

  it("clears wallet filter when Reset Filter is clicked", () => {
    const { container } = render(
      <TransactionsClient
        initialTransactions={mockTransactions}
        accounts={["BCA (Baim)", "Mandiri (Baim)", "DANA (Baim)"]}
        initialWallet="BCA (Baim)"
      />
    );

    expect(screen.queryByText("Gaji Mandiri")).toBeNull();

    // Click Reset Filter
    const resetBtn = screen.getByText("Reset Filter");
    fireEvent.click(resetBtn);

    // All current month transactions from all wallets should now appear
    expect(screen.getByText("Kopi Kenangan")).toBeDefined();
    expect(screen.getByText("Gaji Mandiri")).toBeDefined();
    expect(screen.getByText("Topup DANA")).toBeDefined();
    expect(container.textContent).toContain("3 dari 3 transaksi");
  });
});
