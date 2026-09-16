"use server";

import { db } from "@/db";
import { accounts, importBatches, transactions } from "@/db/schema";
import { decryptAndParseMandiriExcel } from "@/lib/parser/excel-decryptor";
import { preprocessBluCsv } from "@/lib/parser/file-preprocessor";
import { extractTransactionsWithGemini, ExtractedTransaction } from "@/lib/gemini/extractor";
import {
  detectIntraBatchContraTransfers,
  CandidateTransaction,
} from "@/lib/reconciliation/transfer-detector";
import { markDuplicateCandidates } from "@/lib/reconciliation/fingerprint";
import { toCents } from "@/lib/money";
import { and, eq, gte, lte, inArray } from "drizzle-orm";

export interface IngestActionResult {
  success: boolean;
  message: string;
  batchId?: string;
  detectedAccountName?: string;
  transactions?: CandidateTransaction[];
  duplicateCount?: number;
  newCount?: number;
}

export async function ingestDocumentAction(formData: FormData): Promise<IngestActionResult> {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, message: "No document file provided." };
    }

    const selectedAccountId = formData.get("selectedAccountId") as string | null;
    const filePassword = (formData.get("filePassword") as string) || "01042001";

    // 1. Fetch user accounts for context
    const allAccounts = await db.select().from(accounts);
    let selectedWalletName: string | undefined = undefined;

    if (selectedAccountId && selectedAccountId !== "AUTO") {
      const selectedAcc = allAccounts.find((a) => a.id === selectedAccountId);
      if (selectedAcc) {
        selectedWalletName = selectedAcc.name;
      }
    }

    const knownAccounts = allAccounts.map((a) => ({
      name: a.name,
      accountNumber: a.accountNumber,
    }));

    const fileName = file.name;
    const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedList: CandidateTransaction[] = [];
    let detectedAccount = selectedWalletName || "Unknown Account";
    let detectedSource = "AUTO";

    // 2. Route by file type
    if (fileExtension === "xlsx" || fileExtension === "xls") {
      // Proactive check: If this is accidentally a Money Manager multi-wallet file
      try {
        const ExcelJS = (await import("exceljs")).default;
        const testWb = new ExcelJS.Workbook();
        await testWb.xlsx.load(buffer as any);
        const ws = testWb.worksheets[0];
        const row1Values = ws ? Object.values(ws.getRow(1).values || {}).map((v) => String(v).toLowerCase()) : [];
        if (ws?.name === "Money Manager" || (row1Values.includes("account") && row1Values.includes("category"))) {
          return {
            success: false,
            message: "File ini terdeteksi sebagai backup Money Manager (Multi-Wallet). Silakan gunakan tab 'Migrasi Money Manager (Multi-Wallet)' di atas untuk memigrasikan 16 dompet secara terisolasi.",
          };
        }
      } catch {
        // If loading fails, it is likely password-encrypted (Mandiri Excel)
      }

      // Mandiri Encrypted Excel
      detectedSource = "EXCEL_MANDIRI";
      const mandiriRows = await decryptAndParseMandiriExcel(buffer, filePassword);
      detectedAccount = selectedWalletName || "Mandiri (Baim)";

      extractedList = mandiriRows.map((r, idx) => ({
        id: `mandiri-${Date.now()}-${idx}`,
        sourceWalletName: detectedAccount,
        amountCents: r.amountCents,
        type: r.type,
        date: r.date,
        time: r.time,
        description: r.description,
        targetWalletName: null,
      }));
    } else if (fileExtension === "csv") {
      // Blu BCA CSV or generic CSV
      detectedSource = "CSV_BLU";
      const csvText = buffer.toString("utf-8");
      const { cleanCsv, accountNumber, accountHolder } = preprocessBluCsv(csvText);

      if (!selectedWalletName) {
        const matched = allAccounts.find((a) => a.accountNumber === accountNumber);
        detectedAccount = matched ? matched.name : "Blu BCA (Baim)";
      }

      const geminiResult = await extractTransactionsWithGemini({
        contents: [
          {
            text: `CSV STATEMENT CONTENT:\n${cleanCsv}\nDetected Account Holder: ${accountHolder}, Account No: ${accountNumber}`,
          },
        ],
        selectedWalletName: detectedAccount,
        knownAccounts,
      });

      detectedAccount = geminiResult.detectedAccountName;
      extractedList = geminiResult.transactions.map((t, idx) => ({
        id: `csv-${Date.now()}-${idx}`,
        sourceWalletName: t.sourceWalletName,
        amountCents: t.amountCents,
        type: t.type,
        date: t.date,
        time: t.time,
        description: t.description,
        targetWalletName: t.targetWalletName,
      }));
    } else if (fileExtension === "pdf") {
      // BCA / DANA PDF Statement
      detectedSource = fileName.toLowerCase().includes("dana") ? "PDF_DANA" : "PDF_BCA";
      const base64Data = buffer.toString("base64");

      const geminiResult = await extractTransactionsWithGemini({
        contents: [
          {
            inlineData: {
              data: base64Data,
              mimeType: "application/pdf",
            },
          },
        ],
        selectedWalletName,
        knownAccounts,
      });

      detectedAccount = geminiResult.detectedAccountName;
      extractedList = geminiResult.transactions.map((t, idx) => ({
        id: `pdf-${Date.now()}-${idx}`,
        sourceWalletName: t.sourceWalletName,
        amountCents: t.amountCents,
        type: t.type,
        date: t.date,
        time: t.time,
        description: t.description,
        targetWalletName: t.targetWalletName,
      }));
    } else if (["png", "jpg", "jpeg", "webp"].includes(fileExtension)) {
      // Receipt / Mobile Screenshot
      detectedSource = "SCREENSHOT";
      const base64Data = buffer.toString("base64");
      const mimeType = fileExtension === "png" ? "image/png" : "image/jpeg";

      const geminiResult = await extractTransactionsWithGemini({
        contents: [
          {
            inlineData: {
              data: base64Data,
              mimeType,
            },
          },
        ],
        selectedWalletName,
        knownAccounts,
      });

      detectedAccount = geminiResult.detectedAccountName;
      extractedList = geminiResult.transactions.map((t, idx) => ({
        id: `img-${Date.now()}-${idx}`,
        sourceWalletName: t.sourceWalletName,
        amountCents: t.amountCents,
        type: t.type,
        date: t.date,
        time: t.time,
        description: t.description,
        targetWalletName: t.targetWalletName,
      }));
    } else {
      return { success: false, message: `Unsupported file format: .${fileExtension}` };
    }

    // 3. Run Contra-Transfer Pairing
    const reconciledList = detectIntraBatchContraTransfers(extractedList);

    // 4. Run Smart Fingerprint Duplicate Detection against DB
    const dates = reconciledList.map((t) => t.date).filter(Boolean);
    let finalCandidateList = reconciledList;
    let duplicateCount = 0;

    if (dates.length > 0) {
      const minDate = dates.reduce((a, b) => (a < b ? a : b));
      const maxDate = dates.reduce((a, b) => (a > b ? a : b));

      const accountMap = new Map<string, string>();
      for (const a of allAccounts) {
        accountMap.set(a.name.toLowerCase(), a.id);
      }

      const relevantAccountIds = Array.from(
        new Set(
          reconciledList
            .map((t) => accountMap.get(t.sourceWalletName.toLowerCase()))
            .filter((id): id is string => Boolean(id))
        )
      );

      if (relevantAccountIds.length > 0) {
        const existingTxs = await db
          .select({
            accountId: transactions.accountId,
            date: transactions.date,
            time: transactions.time,
            amount: transactions.amount,
            type: transactions.type,
            description: transactions.description,
          })
          .from(transactions)
          .where(
            and(
              inArray(transactions.accountId, relevantAccountIds),
              gte(transactions.date, minDate),
              lte(transactions.date, maxDate)
            )
          );

        finalCandidateList = markDuplicateCandidates(reconciledList, existingTxs, accountMap);
        duplicateCount = finalCandidateList.filter((t) => t.isDuplicate).length;
      }
    }

    const newCount = finalCandidateList.length - duplicateCount;

    // 5. Create Pending Import Batch Record in DB
    const [batch] = await db
      .insert(importBatches)
      .values({
        fileName,
        fileType: fileExtension,
        selectedAccountId: selectedAccountId !== "AUTO" ? selectedAccountId : null,
        detectedSource,
        totalExtracted: finalCandidateList.length,
        totalCommitted: 0,
        status: "PENDING",
      })
      .returning();

    const resultMessage =
      duplicateCount > 0
        ? `Mengekstrak ${finalCandidateList.length} transaksi (${newCount} baru, ${duplicateCount} sudah ada di buku besar).`
        : `Berhasil mengekstrak ${finalCandidateList.length} transaksi dari ${fileName}.`;

    return {
      success: true,
      message: resultMessage,
      batchId: batch.id,
      detectedAccountName: detectedAccount,
      transactions: finalCandidateList,
      duplicateCount,
      newCount,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to ingest financial document.",
    };
  }
}
