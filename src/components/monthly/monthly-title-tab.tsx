"use client";

import * as React from "react";
import { TitleBreakdownItem } from "@/lib/data/monthly-analytics";
import { TabularCurrency } from "@/components/ui/tabular-currency";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Trophy, Store, ChevronRight } from "lucide-react";

export interface MonthlyTitleTabProps {
  titles: TitleBreakdownItem[];
}

export function MonthlyTitleTab({ titles }: MonthlyTitleTabProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTitle, setActiveTitle] = React.useState<TitleBreakdownItem | null>(null);

  const filteredTitles = titles.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Stats Bar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama merchant atau judul..."
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <span>Menampilkan <strong className="text-white">{filteredTitles.length}</strong> Merchant</span>
          <span>•</span>
          <span>Beban Operasional Murni</span>
        </div>
      </Card>

      {/* Merchant Leaderboard Table */}
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14 text-center">Rank</TableHead>
              <TableHead>Nama Judul / Merchant</TableHead>
              <TableHead className="w-48">Kategori Terkait</TableHead>
              <TableHead className="w-28 text-center">Frekuensi</TableHead>
              <TableHead className="w-36 text-right">Rata-rata</TableHead>
              <TableHead className="w-36 text-right">Total Belanja</TableHead>
              <TableHead className="w-28 text-right">% Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTitles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-xs font-mono text-slate-500">
                  Tidak ada merchant atau judul yang cocok dengan pencarian &quot;{searchTerm}&quot;.
                </TableCell>
              </TableRow>
            ) : (
              filteredTitles.map((t, idx) => {
                const rank = idx + 1;
                return (
                  <TableRow
                    key={`${t.title}-${idx}`}
                    onClick={() => setActiveTitle(t)}
                    className="cursor-pointer group hover:bg-white/[0.03]"
                  >
                    <TableCell className="text-center font-mono font-bold text-xs">
                      {rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          🥇
                        </span>
                      ) : rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300/20 text-slate-300 border border-slate-300/30">
                          🥈
                        </span>
                      ) : rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700/20 text-amber-600 border border-amber-700/30">
                          🥉
                        </span>
                      ) : (
                        <span className="text-slate-500">#{rank}</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                        <span className="font-semibold text-slate-100 text-xs sm:text-sm line-clamp-1">
                          {t.title}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs text-slate-400">
                      {t.categoryName}
                    </TableCell>

                    <TableCell className="text-center font-mono text-xs text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 font-bold">
                        {t.frequency}x
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <TabularCurrency cents={t.averageCents} size="sm" color="muted" />
                    </TableCell>

                    <TableCell className="text-right font-bold">
                      <TabularCurrency cents={t.totalCents} size="sm" color="expense" />
                    </TableCell>

                    <TableCell className="text-right font-mono text-xs text-slate-400 font-semibold">
                      {t.percentageOfTotal}%
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Modal Detail Merchant */}
      <Dialog open={Boolean(activeTitle)} onOpenChange={(o) => !o && setActiveTitle(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Store className="w-5 h-5 text-emerald-400" />
              Detail Belanja Merchant
            </DialogTitle>
            <DialogDescription>
              Rincian komprehensif riwayat transaksi pengeluaran pada merchant ini:
            </DialogDescription>
          </DialogHeader>

          {activeTitle && (
            <div className="space-y-4 py-2">
              <div className="artisan-card p-4 bg-slate-900/90 space-y-2">
                <div className="text-xs font-mono text-slate-400">Nama Merchant / Judul:</div>
                <div className="text-base font-bold text-white">{activeTitle.title}</div>
                <div className="text-xs text-slate-400">Kategori: {activeTitle.categoryName}</div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="artisan-card p-3 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">Frekuensi</div>
                  <div className="font-mono text-sm font-bold text-white mt-1">
                    {activeTitle.frequency}x
                  </div>
                </div>
                <div className="artisan-card p-3 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">Rata-Rata</div>
                  <TabularCurrency cents={activeTitle.averageCents} size="sm" className="mt-1" />
                </div>
                <div className="artisan-card p-3 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">Total Beban</div>
                  <TabularCurrency cents={activeTitle.totalCents} size="sm" color="expense" className="mt-1" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
