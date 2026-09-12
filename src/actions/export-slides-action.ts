"use server";

import {
  getMonthlyKPISummary,
  getCategoryBreakdown,
  getTitleBreakdown,
} from "@/lib/data/monthly-analytics";
import { generateExecutiveDeckHtml } from "@/lib/export/executive-deck-generator";

export async function exportExecutiveDeckAction(yearMonth: string): Promise<{
  success: boolean;
  html?: string;
  message?: string;
}> {
  try {
    const [summary, categories, titles] = await Promise.all([
      getMonthlyKPISummary(yearMonth),
      getCategoryBreakdown(yearMonth),
      getTitleBreakdown(yearMonth),
    ]);

    const html = generateExecutiveDeckHtml({
      summary,
      categories,
      topTitles: titles,
    });

    return { success: true, html };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to generate executive presentation slides.",
    };
  }
}
