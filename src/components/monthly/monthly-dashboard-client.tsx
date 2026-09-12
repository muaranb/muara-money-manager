"use client";

import * as React from "react";
import {
  MonthlyKPISummary,
  DailyTimelinePoint,
  InterWalletTransferItem,
  CategoryBreakdownItem,
  TitleBreakdownItem,
} from "@/lib/data/monthly-analytics";
import { MonthlyHeader } from "./monthly-header";
import { MonthlyOverviewTab } from "./monthly-overview-tab";
import { MonthlyCategoryTab } from "./monthly-category-tab";
import { MonthlyTitleTab } from "./monthly-title-tab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { exportExecutiveDeckAction } from "@/actions/export-slides-action";
import { LayoutDashboard, PieChart, Store } from "lucide-react";

export interface MonthlyDashboardClientProps {
  summary: MonthlyKPISummary;
  timeline: DailyTimelinePoint[];
  transfers: InterWalletTransferItem[];
  categories: CategoryBreakdownItem[];
  titles: TitleBreakdownItem[];
}

export function MonthlyDashboardClient({
  summary,
  timeline,
  transfers,
  categories,
  titles,
}: MonthlyDashboardClientProps) {
  const [activeTab, setActiveTab] = React.useState<string>("overview");
  const [isExporting, setIsExporting] = React.useState<boolean>(false);

  const handleExportSlides = async () => {
    setIsExporting(true);
    try {
      const res = await exportExecutiveDeckAction(summary.yearMonth);
      if (res.success && res.html) {
        const blob = new Blob([res.html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Laporan_Keuangan_Eksekutif_${summary.yearMonth}.html`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        alert(res.message || "Gagal membuat presentasi.");
      }
    } catch (err: any) {
      alert("Terjadi kesalahan saat mengekspor slide deck: " + err?.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* KPI Header & Month Selector */}
      <MonthlyHeader
        summary={summary}
        onExportSlides={handleExportSlides}
        isExporting={isExporting}
      />

      {/* Multi-Dimensional Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Ringkasan</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-1.5">
            <PieChart className="w-3.5 h-3.5" />
            <span>Per Kategori</span>
          </TabsTrigger>
          <TabsTrigger value="titles" className="flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5" />
            <span>Per Judul</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <MonthlyOverviewTab timeline={timeline} transfers={transfers} />
        </TabsContent>

        <TabsContent value="categories">
          <MonthlyCategoryTab
            categories={categories}
            totalExpenseCents={summary.totalExpenseCents}
          />
        </TabsContent>

        <TabsContent value="titles">
          <MonthlyTitleTab titles={titles} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
