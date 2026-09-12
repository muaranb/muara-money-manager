"use client";

import * as React from "react";
import { useStagingStore } from "@/store/use-staging-store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TabularCurrency } from "@/components/ui/tabular-currency";
import { ContraPairTether } from "@/components/ui/contra-pair-tether";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, CheckCircle2, RotateCcw, Building2, HelpCircle } from "lucide-react";

export interface StagingTableProps {
  availableWallets?: string[];
  onCommit: () => Promise<void>;
  isCommitting?: boolean;
}

export function StagingTable({
  availableWallets = [],
  onCommit,
  isCommitting = false,
}: StagingTableProps) {
  const {
    transactions,
    selectedRowIds,
    toggleSelectRow,
    selectAll,
    clearSelection,
    removeRow,
    removeSelectedRows,
    bulkReassignWallet,
    unpairTransfer,
    confirmTransferPair,
    reset,
  } = useStagingStore();

  const [bulkWallet, setBulkWallet] = React.useState<string>("");
  const [ambiguousRowId, setAmbiguousRowId] = React.useState<string | null>(null);

  const isAllSelected =
    transactions.length > 0 && selectedRowIds.length === transactions.length;

  const handleBulkReassign = () => {
    if (!bulkWallet) return;
    bulkReassignWallet(bulkWallet);
    setBulkWallet("");
  };

  const activeAmbiguousRow = transactions.find((t) => t.id === ambiguousRowId);
  const candidatePartners = activeAmbiguousRow?.candidatePairIds
    ? transactions.filter((t) => activeAmbiguousRow.candidatePairIds?.includes(t.id))
    : [];

  if (transactions.length === 0) {
    return null;
  }

  // Calculate totals
  const totalIncomeCents = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.amountCents, 0);

  const totalExpenseCents = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.amountCents, 0);

  const totalTransferCents = transactions
    .filter((t) => t.type === "TRANSFER")
    .reduce((acc, t) => acc + t.amountCents, 0) / 2; // single-sided volume

  return (
    <div className="space-y-4">
      {/* Top Action & Bulk Toolbar */}
      <div className="artisan-card p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-sm font-sans text-slate-300">
            <span className="font-mono font-bold text-emerald-400">{transactions.length}</span> Transaksi Staging
            {selectedRowIds.length > 0 && (
              <span className="text-slate-400 ml-1">
                (<span className="font-mono text-white">{selectedRowIds.length}</span> terpilih)
              </span>
            )}
          </div>

          {selectedRowIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Select value={bulkWallet} onValueChange={setBulkWallet}>
                <SelectTrigger className="h-8 w-44 text-xs bg-slate-900 border-white/15">
                  <SelectValue placeholder="Pindah ke Wallet..." />
                </SelectTrigger>
                <SelectContent>
                  {availableWallets.map((w) => (
                    <SelectItem key={w} value={w} className="text-xs">
                      {w}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                variant="outline"
                onClick={handleBulkReassign}
                disabled={!bulkWallet}
                className="text-xs h-8"
              >
                Terapkan
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={removeSelectedRows}
                className="text-xs h-8 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus ({selectedRowIds.length})</span>
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={reset}
            className="text-xs text-slate-400 hover:text-rose-400"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset Batch
          </Button>

          <Button
            onClick={onCommit}
            disabled={isCommitting}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 text-xs sm:text-sm h-9 px-5"
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {isCommitting ? "Menyimpan ke Turso..." : "Simpan &amp; Sinkronkan ke Database"}
          </Button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="artisan-card p-3 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-sans">Pemasukan Riil:</span>
          <TabularCurrency cents={totalIncomeCents} color="income" size="sm" />
        </div>
        <div className="artisan-card p-3 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-sans">Pengeluaran Riil:</span>
          <TabularCurrency cents={totalExpenseCents} color="expense" size="sm" />
        </div>
        <div className="artisan-card p-3 flex items-center justify-between border-indigo-500/20 bg-indigo-500/[0.04]">
          <span className="text-xs text-indigo-300 font-sans flex items-center gap-1">
            🔄 Pindah Uang (Netral):
          </span>
          <TabularCurrency cents={totalTransferCents} color="transfer" size="sm" />
        </div>
      </div>

      {/* Main Staging Table */}
      <div className="artisan-card p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => (e.target.checked ? selectAll() : clearSelection())}
                  className="rounded border-white/20 bg-slate-900 text-emerald-500 focus:ring-emerald-400/50 cursor-pointer"
                />
              </TableHead>
              <TableHead className="w-28">Tanggal</TableHead>
              <TableHead className="w-36">Lokasi Wallet</TableHead>
              <TableHead>Keterangan Mutasi</TableHead>
              <TableHead className="w-32 text-right">Nominal</TableHead>
              <TableHead className="w-24 text-center">Tipe</TableHead>
              <TableHead className="w-48">Status Transfer</TableHead>
              <TableHead className="w-12 text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => {
              const isSelected = selectedRowIds.includes(tx.id);
              return (
                <TableRow
                  key={tx.id}
                  className={`group ${isSelected ? "bg-emerald-500/[0.05]" : ""}`}
                >
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(tx.id)}
                      className="rounded border-white/20 bg-slate-900 text-emerald-500 focus:ring-emerald-400/50 cursor-pointer"
                    />
                  </TableCell>

                  <TableCell className="font-mono text-xs text-slate-300">
                    <div>{tx.date}</div>
                    {tx.time && <div className="text-[10px] text-slate-500">{tx.time}</div>}
                  </TableCell>

                  <TableCell>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>{tx.sourceWalletName}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="font-medium text-slate-200 text-xs sm:text-sm line-clamp-1">
                      {tx.description}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <TabularCurrency
                      cents={tx.amountCents}
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
                    {tx.type === "TRANSFER" && tx.transferPairId && (
                      <ContraPairTether
                        pairId={tx.transferPairId}
                        targetWalletName={tx.targetWalletName}
                        confidence={tx.pairConfidence}
                        onUnpair={() => unpairTransfer(tx.id)}
                      />
                    )}
                    {tx.pairConfidence === "AMBIGUOUS" && (
                      <ContraPairTether
                        confidence="AMBIGUOUS"
                        candidateCount={tx.candidatePairIds?.length || 0}
                        onSelectCandidate={() => setAmbiguousRowId(tx.id)}
                      />
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(tx.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                      title="Hapus baris"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Modal Dialog for Ambiguous Contra Candidate Selection */}
      <Dialog open={Boolean(ambiguousRowId)} onOpenChange={(o) => !o && setAmbiguousRowId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-400">
              <HelpCircle className="w-5 h-5" />
              Pilih Pasangan Transfer Rekanan
            </DialogTitle>
            <DialogDescription>
              Ditemukan beberapa transaksi dengan tanggal dan nominal identik. Pilih transaksi mana yang merupakan pasangan pemindahan dana ini:
            </DialogDescription>
          </DialogHeader>

          {activeAmbiguousRow && (
            <div className="space-y-3 py-2">
              <div className="artisan-card p-3 bg-slate-900/90">
                <div className="text-xs text-slate-400 font-mono">Transaksi Saat Ini:</div>
                <div className="font-semibold text-white text-sm mt-1">{activeAmbiguousRow.description}</div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="font-mono text-emerald-400">{activeAmbiguousRow.sourceWalletName}</span>
                  <TabularCurrency cents={activeAmbiguousRow.amountCents} size="sm" />
                </div>
              </div>

              <div className="text-xs font-semibold text-slate-300">Pilih Pasangan Rekanan:</div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {candidatePartners.map((cand) => (
                  <button
                    key={cand.id}
                    type="button"
                    onClick={() => {
                      confirmTransferPair(activeAmbiguousRow.id, cand.id);
                      setAmbiguousRowId(null);
                    }}
                    className="w-full text-left artisan-card p-3 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
                  >
                    <div className="font-medium text-slate-100 text-xs line-clamp-1">{cand.description}</div>
                    <div className="flex items-center justify-between mt-1.5 text-xs">
                      <span className="font-mono text-indigo-300">{cand.sourceWalletName}</span>
                      <span className="font-mono text-slate-400 text-[10px]">{cand.time || cand.date}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
