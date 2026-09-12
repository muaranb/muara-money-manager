"use client";

import * as React from "react";
import { Account } from "@/db/schema";
import { TabularCurrency } from "@/components/ui/tabular-currency";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { runLegacyMigrationAction } from "@/actions/migration-action";
import {
  Wallet2,
  Building2,
  Smartphone,
  TrendingUp,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

export interface AccountsClientProps {
  initialAccounts: Account[];
}

function EmvChipSvg() {
  return (
    <svg className="w-9 h-7 rounded bg-amber-200/20 border border-amber-300/40 p-1" viewBox="0 0 36 28">
      <rect x="2" y="2" width="32" height="24" rx="3" fill="#D97706" opacity="0.4" />
      <path d="M 2 10 H 34 M 2 18 H 34 M 14 2 V 26 M 22 2 V 26" stroke="#FBBF24" strokeWidth="1" />
    </svg>
  );
}

export function AccountsClient({ initialAccounts }: AccountsClientProps) {
  const [accountList, setAccountList] = React.useState<Account[]>(initialAccounts);
  const [isMigrating, setIsMigrating] = React.useState<boolean>(false);
  const [migrationStatus, setMigrationStatus] = React.useState<string | null>(null);

  const totalNetWorthCents = accountList.reduce((sum, acc) => sum + acc.currentBalance, 0);

  const handleRunMigration = async () => {
    if (!confirm("Jalankan migrasi 455 transaksi historis dari Money Manager? Seluruh saldo 16 akun akan dihitung ulang secara otomatis.")) {
      return;
    }

    setIsMigrating(true);
    setMigrationStatus("Mengimpor 455 transaksi historis dari Money Manager...");

    try {
      const res = await runLegacyMigrationAction();
      if (res.success) {
        setMigrationStatus(`Sukses: ${res.message}`);
        // Reload page to refresh account balances
        window.location.reload();
      } else {
        setMigrationStatus(`Error: ${res.message}`);
      }
    } catch (err: any) {
      setMigrationStatus(`Error: ${err?.message || "Gagal migrasi"}`);
    } finally {
      setIsMigrating(false);
    }
  };

  const getCardTheme = (acc: Account) => {
    const name = acc.name.toLowerCase();
    if (name.includes("mandiri")) {
      return "border-amber-500/40 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-950";
    }
    if (name.includes("dana")) {
      return "border-cyan-500/40 bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-950";
    }
    if (name.includes("blu")) {
      return "border-sky-500/40 bg-gradient-to-br from-slate-900 via-sky-950/20 to-slate-950";
    }
    if (name.includes("bca")) {
      return "border-blue-500/40 bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-950";
    }
    if (acc.type === "INVESTMENT") {
      return "border-purple-500/40 bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-950";
    }
    return "border-emerald-500/30 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-950";
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Net Worth Bento */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Portofolio Rekening &amp; Dompet
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Manajemen saldo real-time dan buku besar 16 kantong keuangan pengguna.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleRunMigration}
            disabled={isMigrating}
            variant="outline"
            className="text-xs h-9 font-semibold border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isMigrating ? "animate-spin" : ""}`} />
            <span>Migrasi Data Money Manager (455 Transaksi)</span>
          </Button>
        </div>
      </div>

      {migrationStatus && (
        <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-200">
          {migrationStatus}
        </div>
      )}

      {/* Net Worth Hero Bento */}
      <Card className="p-6 relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border-white/15">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>TOTAL KEKAYAAN BERSIH (NET WORTH)</span>
            </div>
            <TabularCurrency cents={totalNetWorthCents} size="2xl" color="income" />
            <p className="text-xs text-slate-400">
              Konsolidasi saldo berjalan 16 rekening bank, e-wallet, dan aset investasi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/import">
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs">
                + Tambah Mutasi
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 16 Accounts Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {accountList.map((acc) => {
          const themeClass = getCardTheme(acc);
          const maskedNumber = acc.accountNumber ? `•••• ${acc.accountNumber.slice(-4)}` : "Akun Terverifikasi";

          return (
            <div
              key={acc.id}
              className={`p-5 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl flex flex-col justify-between h-48 relative overflow-hidden group ${themeClass}`}
            >
              {/* Card Top: Chip & Type */}
              <div className="flex items-center justify-between">
                <EmvChipSvg />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/10">
                  {acc.type}
                </span>
              </div>

              {/* Card Middle: Account Name & Number */}
              <div className="space-y-1 my-auto">
                <h3 className="font-bold text-slate-100 text-sm tracking-tight truncate" title={acc.name}>
                  {acc.name}
                </h3>
                <div className="font-mono text-[11px] text-slate-400">
                  {maskedNumber}
                </div>
              </div>

              {/* Card Bottom: Balance & Currency */}
              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Saldo</span>
                <TabularCurrency cents={acc.currentBalance} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
