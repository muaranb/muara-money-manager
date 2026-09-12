"use client";

import * as React from "react";
import {
  DailyTimelinePoint,
  InterWalletTransferItem,
} from "@/lib/data/monthly-analytics";
import { TabularCurrency } from "@/components/ui/tabular-currency";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ArrowRightLeft, ShieldCheck, Info } from "lucide-react";

export interface MonthlyOverviewTabProps {
  timeline: DailyTimelinePoint[];
  transfers: InterWalletTransferItem[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload as DailyTimelinePoint;
    return (
      <div className="artisan-card p-3 bg-slate-950/95 border-white/20 shadow-2xl backdrop-blur-2xl text-xs space-y-1.5 font-mono">
        <div className="font-bold text-slate-200">{data.date} (Hari ke-{data.dayNumber})</div>
        <div className="flex items-center justify-between gap-4 text-emerald-400">
          <span>Pemasukan:</span>
          <TabularCurrency cents={data.incomeCents} size="sm" color="income" />
        </div>
        <div className="flex items-center justify-between gap-4 text-rose-400">
          <span>Pengeluaran:</span>
          <TabularCurrency cents={data.expenseCents} size="sm" color="expense" />
        </div>
        <div className="flex items-center justify-between gap-4 pt-1 border-t border-white/10 text-white font-bold">
          <span>Net:</span>
          <TabularCurrency cents={data.netCents} size="sm" showSign={true} />
        </div>
      </div>
    );
  }
  return null;
}

export function MonthlyOverviewTab({
  timeline,
  transfers,
}: MonthlyOverviewTabProps) {
  const chartData = timeline.map((t) => ({
    ...t,
    incomeRp: t.incomeCents / 100,
    expenseRp: t.expenseCents / 100,
  }));

  return (
    <div className="space-y-6">
      {/* Ambient Glow Cashflow Area Chart */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg">Dinamika Arus Kas Harian (1 - 31)</CardTitle>
              <CardDescription>
                Visualisasi Bézier kurva pemasukan vs pengeluaran operasional riil sepanjang bulan.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-slate-300">Pemasukan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="text-slate-300">Pengeluaran</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-0 pb-0">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="dayNumber"
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  fontFamily="var(--font-mono)"
                />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  fontFamily="var(--font-mono)"
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="incomeRp"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#incomeGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="expenseRp"
                  stroke="#F43F5E"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#expenseGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Inter-Wallet Transfer Neutrality Audit */}
      <Card className="p-6 border-indigo-500/20 bg-indigo-500/[0.02]">
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-indigo-300">
                <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
                Audit Mutasi Pindah Uang Antar-Wallet
              </CardTitle>
              <CardDescription>
                Seluruh transaksi transfer antar-rekening/e-wallet internal ini diisolasi dari laporan pengeluaran &amp; pemasukan demi mencegah inflasi semu.
              </CardDescription>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>STRICT TRANSFER NEUTRALITY</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-0 pb-0">
          {transfers.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-slate-500">
              Tidak ada mutasi pindah uang antar-wallet pada periode bulan ini.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-28">Tanggal</TableHead>
                  <TableHead className="w-40">Dari Rekening</TableHead>
                  <TableHead className="w-40">Ke Rekening</TableHead>
                  <TableHead>Keterangan Mutasi</TableHead>
                  <TableHead className="w-32 text-right">Nominal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((tr) => (
                  <TableRow key={tr.id}>
                    <TableCell className="font-mono text-xs text-slate-400">
                      <div>{tr.date}</div>
                      {tr.time && <div className="text-[10px] text-slate-500">{tr.time}</div>}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-slate-200">
                      {tr.sourceAccountName}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-indigo-300 font-semibold">
                      ➔ {tr.targetAccountName}
                    </TableCell>
                    <TableCell className="text-xs text-slate-300">
                      {tr.description}
                      {tr.note && <span className="text-slate-500 ml-1">({tr.note})</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      <TabularCurrency cents={tr.amountCents} size="sm" color="transfer" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
