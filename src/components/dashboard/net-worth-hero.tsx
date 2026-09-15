"use client";

import * as React from "react";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TabularCurrency } from "@/components/ui/tabular-currency";
import { PrivacyToggle } from "@/components/ui/privacy-toggle";
import { usePrivacyStore } from "@/store/use-privacy-store";

export interface NetWorthHeroProps {
  totalNetWorthCents: number;
  accountCount: number;
}

export function NetWorthHero({
  totalNetWorthCents,
  accountCount,
}: NetWorthHeroProps) {
  const isBalanceHidden = usePrivacyStore((s) => s.isBalanceHidden);

  return (
    <div className="lg:col-span-5 artisan-card p-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-950 border-emerald-500/30">
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>TOTAL KEKAYAAN BERSIH</span>
            <PrivacyToggle size="sm" />
          </div>
          <span>{accountCount} Kantong Finansial</span>
        </div>
        <TabularCurrency
          cents={totalNetWorthCents}
          size="2xl"
          color="income"
          isMasked={isBalanceHidden}
        />
        <p className="text-xs text-slate-400 mt-2 font-sans">
          Konsolidasi saldo berjalan perbankan, dompet digital, dan portofolio investasi.
        </p>
      </div>

      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
        <span>Status: Terverifikasi</span>
        <Link
          href="/accounts"
          className="text-emerald-400 hover:underline flex items-center gap-1"
        >
          <span>Kelola {accountCount} Akun</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
