import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  TransactionsClient,
  TransactionRow,
} from "@/components/transactions/transactions-client";

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
    date: "2026-08-15",
    time: "14:30:00",
    amount: 12000000,
    type: "INCOME",
    description: "Gaji Bulanan",
    note: null,
    sourceType: "EXCEL",
    transferPairId: null,
    accountName: "Mandiri (Baim)",
    categoryName: "Gaji",
  },
  {
    id: "tx-3",
    date: "2026-08-01",
    time: "09:00:00",
    amount: 2500000,
    type: "TRANSFER",
    description: "Transfer ke Blu",
    note: null,
    sourceType: "MANUAL",
    transferPairId: "pair-1",
    accountName: "BCA (Baim)",
    categoryName: "🔄 Pindah Uang",
  },
  {
    id: "tx-4",
    date: "2025-12-25",
    time: "18:00:00",
    amount: 1500000,
    type: "EXPENSE",
    description: "Kado Natal",
    note: null,
    sourceType: "CSV",
    transferPairId: null,
    accountName: "Blu BCA (Baim)",
    categoryName: "Hadiah",
  },
];

describe("Transactions Month Navigator & Filtering", () => {
  it("defaults to showing current month transactions instead of ALL", () => {
    const { container } = render(
      <TransactionsClient
        initialTransactions={mockTransactions}
        accounts={["BCA (Baim)", "Mandiri (Baim)", "Blu BCA (Baim)"]}
      />
    );

    // Default should show current month transaction
    expect(screen.getByText("Kopi Kenangan")).toBeDefined();
    // Older month transactions should not appear in default view
    expect(screen.queryByText("Gaji Bulanan")).toBeNull();
    expect(screen.queryByText("Kado Natal")).toBeNull();
    expect(container.textContent).toContain("1 dari 4 transaksi");
  });

  it("filters transactions correctly when navigating with chevrons", () => {
    const { container } = render(
      <TransactionsClient
        initialTransactions={mockTransactions}
        accounts={["BCA (Baim)", "Mandiri (Baim)", "Blu BCA (Baim)"]}
        availableMonths={[currentMonthStr, "2026-08", "2025-12"]}
      />
    );

    // Initially on current month
    expect(screen.getByText("Kopi Kenangan")).toBeDefined();

    // Click Prev Month (<) should navigate to 2026-08
    const prevBtn = screen.getByTitle("Bulan Lebih Lampau");
    fireEvent.click(prevBtn);

    expect(screen.queryByText("Kopi Kenangan")).toBeNull();
    expect(screen.getByText("Gaji Bulanan")).toBeDefined();
    expect(screen.getByText("Transfer ke Blu")).toBeDefined();
    expect(screen.queryByText("Kado Natal")).toBeNull();
    expect(container.textContent).toContain("2 dari 4 transaksi");

    // Click Next Month (>) should navigate back to current month
    const nextBtn = screen.getByTitle("Bulan Lebih Baru");
    fireEvent.click(nextBtn);

    expect(screen.getByText("Kopi Kenangan")).toBeDefined();
    expect(screen.queryByText("Gaji Bulanan")).toBeNull();
  });

  it("resets filter back to current month when Reset Filter is clicked", () => {
    const { container } = render(
      <TransactionsClient
        initialTransactions={mockTransactions}
        accounts={["BCA (Baim)", "Mandiri (Baim)", "Blu BCA (Baim)"]}
        availableMonths={[currentMonthStr, "2026-08", "2025-12"]}
      />
    );

    // Initially Reset Filter is not visible (as filters are default)
    expect(screen.queryByText("Reset Filter")).toBeNull();

    // Navigate to previous month
    const prevBtn = screen.getByTitle("Bulan Lebih Lampau");
    fireEvent.click(prevBtn);
    expect(screen.queryByText("Kopi Kenangan")).toBeNull();

    // Now Reset Filter should be visible
    const resetBtn = screen.getByText("Reset Filter");
    expect(resetBtn).toBeDefined();
    fireEvent.click(resetBtn);

    // After reset, returns to current month
    expect(screen.getByText("Kopi Kenangan")).toBeDefined();
    expect(screen.queryByText("Gaji Bulanan")).toBeNull();
    expect(container.textContent).toContain("1 dari 4 transaksi");
  });
});
