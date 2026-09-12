"use client";

import * as React from "react";
import { CategoryBreakdownItem } from "@/lib/data/monthly-analytics";
import { TabularCurrency } from "@/components/ui/tabular-currency";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export interface MonthlyCategoryTabProps {
  categories: CategoryBreakdownItem[];
  totalExpenseCents: number;
}

const LUXURY_PALETTE = [
  "#10B981", // Emerald
  "#6366F1", // Indigo
  "#F59E0B", // Amber
  "#06B6D4", // Cyan
  "#EC4899", // Pink
  "#8B5CF6", // Purple
  "#3B82F6", // Blue
  "#14B8A6", // Teal
  "#F97316", // Orange
  "#84CC16", // Lime
];

export function MonthlyCategoryTab({
  categories,
  totalExpenseCents,
}: MonthlyCategoryTabProps) {
  const [activeCategory, setActiveCategory] = React.useState<CategoryBreakdownItem | null>(null);

  const pieData = categories.map((cat, idx) => ({
    name: cat.categoryName,
    value: cat.totalCents / 100,
    cents: cat.totalCents,
    percentage: cat.percentage,
    color: LUXURY_PALETTE[idx % LUXURY_PALETTE.length],
    raw: cat,
  }));

  const activeStat = activeCategory || {
    categoryName: "Total Belanja Bulanan",
    totalCents: totalExpenseCents,
    percentage: 100,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Col: Dynamic Center-Stat Donut Chart */}
      <div className="lg:col-span-5">
        <Card className="p-6 h-full flex flex-col justify-between">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base sm:text-lg">Proporsi Alokasi Beban</CardTitle>
            <CardDescription>
              Donut chart interaktif dengan pembacaan stat dinamis pada pusat chart.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pb-0 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="90%"
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={(_, idx) => setActiveCategory(categories[idx] || null)}
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#030712"
                        strokeWidth={3}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Dynamic Center Metric */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
                <span className="text-[11px] font-sans font-medium text-slate-400 max-w-[150px] truncate">
                  {activeStat.categoryName}
                </span>
                <TabularCurrency cents={activeStat.totalCents} size="md" color="expense" />
                <span className="text-[10px] font-mono text-emerald-400 font-semibold mt-0.5">
                  {activeStat.percentage}% Alokasi
                </span>
              </div>
            </div>

            {/* Quick Legend Chips */}
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {pieData.slice(0, 6).map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-sans"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-300 truncate max-w-[110px]">{item.name}</span>
                  <span className="font-mono text-slate-500">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Col: Hierarchical Category & Subcategory Accordion Table */}
      <div className="lg:col-span-7">
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base sm:text-lg">Rincian Hierarkis Kategori</CardTitle>
            <CardDescription>
              Klik baris kategori untuk melihat pemecahan alokasi belanja per subkategori.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pb-0">
            {categories.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-slate-500">
                Tidak ada data pengeluaran pada bulan ini.
              </div>
            ) : (
              <Accordion type="multiple" className="space-y-2">
                {categories.map((cat) => (
                  <AccordionItem
                    key={cat.categoryId}
                    value={cat.categoryId}
                    className="border border-white/[0.08] rounded-xl px-4 bg-slate-900/40 backdrop-blur-md"
                  >
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center justify-between w-full pr-4 text-left">
                        <div className="space-y-1">
                          <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            <span>{cat.categoryName}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress
                              value={cat.percentage}
                              className="w-28 sm:w-40 h-1.5"
                            />
                            <span className="text-[11px] font-mono text-slate-400">
                              {cat.percentage}% dari Total
                            </span>
                          </div>
                        </div>

                        <TabularCurrency cents={cat.totalCents} size="sm" color="expense" />
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pt-2 pb-3 border-t border-white/[0.04]">
                      {cat.subcategories.length === 0 ? (
                        <div className="text-xs font-mono text-slate-500 py-1">
                          Tidak ada subkategori terinci.
                        </div>
                      ) : (
                        <div className="space-y-2 pl-2">
                          {cat.subcategories.map((sub) => (
                            <div
                              key={sub.subcategoryId}
                              className="flex items-center justify-between text-xs py-1"
                            >
                              <div className="flex items-center gap-2 text-slate-300">
                                <span className="text-slate-600 font-mono">└</span>
                                <span>{sub.subcategoryName}</span>
                                <span className="text-[10px] font-mono text-slate-500">
                                  ({sub.percentageOfParent.toFixed(0)}%)
                                </span>
                              </div>
                              <TabularCurrency cents={sub.totalCents} size="sm" color="muted" />
                            </div>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
