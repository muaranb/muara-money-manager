"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MonthlyKPISummary } from "@/lib/data/monthly-analytics";
import { TabularCurrency } from "@/components/ui/tabular-currency";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Percent,
} from "lucide-react";

export interface MonthlyHeaderProps {
  summary: MonthlyKPISummary;
  onExportSlides?: () => void;
  isExporting?: boolean;
}

export function MonthlyHeader({
  summary,
  onExportSlides,
  isExporting = false,
}: MonthlyHeaderProps) {
  const router = useRouter();

  const handleMonthChange = (delta: number) => {
    const [y, m] = summary.yearMonth.split("-").map(Number);
    const targetDate = new Date(Date.UTC(y, m - 1 + delta, 1));
    const nextY = targetDate.getUTCFullYear();
    const nextM = String(targetDate.getUTCMonth() + 1).padStart(2, "0");
    router.push(`/monthly?month=${nextY}-${nextM}`);
  };

  const formatMonthTitle = (ym: string) => {
    const [y, m] = ym.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, 1));
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      {/* Month Navigation & Slide Deck Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl bg-slate-900/80 border border-white/10 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => handleMonthChange(-1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Bulan Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-3 font-mono font-bold text-sm text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{formatMonthTitle(summary.yearMonth)}</span>
            </div>
            <button
              type="button"
              onClick={() => handleMonthChange(1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Bulan Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            PERIODE: {summary.yearMonth}
          </span>
        </div>

        {onExportSlides && (
          <Button
            onClick={onExportSlides}
            disabled={isExporting}
            variant="outline"
            className="text-xs h-9 font-semibold border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-400/50"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
            {isExporting ? "Menyiapkan Slide Deck..." : "Ekspor Presentasi Eksekutif (.html)"}
          </Button>
        )}
      </div>

      {/* 4 Hero KPI Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pemasukan Operasional */}
        <div className="artisan-card p-5 relative overflow-hidden group hover:border-emerald-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Pemasukan Operasional</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <TabularCurrency cents={summary.totalIncomeCents} size="lg" color="income" />
            <div className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className={summary.incomeMomDeltaPercentage >= 0 ? "text-emerald-400" : "text-rose-400"}>
                {summary.incomeMomDeltaPercentage >= 0 ? "▲ +" : "▼ "}
                {summary.incomeMomDeltaPercentage}% MoM
              </span>
              <span className="text-slate-500">• Penghasilan riil</span>
            </div>
          </div>
        </div>

        {/* Card 2: Pengeluaran Riil */}
        <div className="artisan-card p-5 relative overflow-hidden group hover:border-rose-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Pengeluaran Riil</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <TabularCurrency cents={summary.totalExpenseCents} size="lg" color="expense" />
            <div className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className={summary.expenseMomDeltaPercentage <= 0 ? "text-emerald-400" : "text-rose-400"}>
                {summary.expenseMomDeltaPercentage >= 0 ? "▲ +" : "▼ "}
                {summary.expenseMomDeltaPercentage}% MoM
              </span>
              <span className="text-slate-500">• Biaya hidup riil</span>
            </div>
          </div>
        </div>

        {/* Card 3: Net Cashflow */}
        <div className="artisan-card p-5 relative overflow-hidden group hover:border-teal-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Net Cashflow</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <TabularCurrency
              cents={summary.netCashflowCents}
              size="lg"
              color={summary.netCashflowCents >= 0 ? "income" : "expense"}
              showSign={true}
            />
            <div className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className="text-teal-400 font-bold">
                Rasio Tabungan: {summary.savingsRatePercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Strict Transfer Neutrality (Volume Pindah Uang) */}
        <div className="artisan-card p-5 relative overflow-hidden border-indigo-500/30 bg-indigo-500/[0.04] group hover:border-indigo-400/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-indigo-300">🔄 Volume Pindah Uang</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <TabularCurrency cents={summary.totalTransferVolumeCents} size="lg" color="transfer" />
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-indigo-300">
              <span className="font-bold">{summary.transferCount}x Mutasi</span>
              <span className="text-indigo-400/80">• Netral (0 Inflasi)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
