"use client";

import * as React from "react";
import { TabularCurrency } from "@/components/ui/tabular-currency";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContraPairTether } from "@/components/ui/contra-pair-tether";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Receipt } from "lucide-react";

export interface TransactionRow {
  id: string;
  date: string;
  time: string | null;
  amount: number;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  description: string;
  note: string | null;
  sourceType: string;
  transferPairId: string | null;
  accountName: string;
  categoryName: string | null;
}

export interface TransactionsClientProps {
  initialTransactions: TransactionRow[];
  accounts: string[];
}

export function TransactionsClient({
  initialTransactions,
  accounts,
}: TransactionsClientProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedWallet, setSelectedWallet] = React.useState("ALL");
  const [selectedType, setSelectedType] = React.useState("ALL");

  const filtered = initialTransactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.note && t.note.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.categoryName && t.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesWallet =
      selectedWallet === "ALL" || t.accountName.toLowerCase() === selectedWallet.toLowerCase();

    const matchesType = selectedType === "ALL" || t.type === selectedType;

    return matchesSearch && matchesWallet && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Search Bar */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Buku Besar Transaksi (General Ledger)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
          Daftar seluruh mutasi perbankan, e-wallet, dan arsip data historis.
        </p>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari transaksi, merchant, atau catatan..."
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Wallet Filter */}
          <Select value={selectedWallet} onValueChange={setSelectedWallet}>
            <SelectTrigger className="h-9 w-40 text-xs bg-slate-900 border-white/10">
              <SelectValue placeholder="Semua Wallet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua Wallet</SelectItem>
              {accounts.map((acc) => (
                <SelectItem key={acc} value={acc}>
                  {acc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="h-9 w-36 text-xs bg-slate-900 border-white/10">
              <SelectValue placeholder="Semua Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua Tipe</SelectItem>
              <SelectItem value="EXPENSE">Pengeluaran</SelectItem>
              <SelectItem value="INCOME">Pemasukan</SelectItem>
              <SelectItem value="TRANSFER">Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Ledger Table */}
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">Tanggal</TableHead>
              <TableHead className="w-36">Rekening / Wallet</TableHead>
              <TableHead>Keterangan Mutasi</TableHead>
              <TableHead className="w-44">Kategori</TableHead>
              <TableHead className="w-32 text-right">Nominal</TableHead>
              <TableHead className="w-24 text-center">Tipe</TableHead>
              <TableHead className="w-40">Status Transfer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-xs font-mono text-slate-500">
                  Tidak ada transaksi yang sesuai dengan filter pencarian.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-white/[0.02]">
                  <TableCell className="font-mono text-xs text-slate-300">
                    <div>{tx.date}</div>
                    {tx.time && <div className="text-[10px] text-slate-500">{tx.time}</div>}
                  </TableCell>

                  <TableCell className="font-mono text-xs text-slate-200">
                    {tx.accountName}
                  </TableCell>

                  <TableCell>
                    <div className="font-medium text-slate-100 text-xs sm:text-sm line-clamp-1">
                      {tx.description}
                    </div>
                    {tx.note && <div className="text-[11px] text-slate-500">{tx.note}</div>}
                  </TableCell>

                  <TableCell className="text-xs text-slate-400">
                    {tx.categoryName || "—"}
                  </TableCell>

                  <TableCell className="text-right">
                    <TabularCurrency
                      cents={tx.amount}
                      size="sm"
                      color={
                        tx.type === "INCOME"
                          ? "income"
                          : tx.type === "EXPENSE"
                          ? "expense"
                          : "transfer"
                      }
                      showSign={tx.type !== "TRANSFER"}
                    />
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge
                      variant={
                        tx.type === "INCOME"
                          ? "income"
                          : tx.type === "EXPENSE"
                          ? "expense"
                          : "transfer"
                      }
                    >
                      {tx.type === "INCOME"
                        ? "Pemasukan"
                        : tx.type === "EXPENSE"
                        ? "Pengeluaran"
                        : "Transfer"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {tx.type === "TRANSFER" && (
                      <ContraPairTether
                        pairId={tx.transferPairId}
                        targetWalletName={tx.categoryName === "🔄 Pindah Uang" ? null : tx.categoryName}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
