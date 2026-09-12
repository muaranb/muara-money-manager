import { GoogleGenAI, Type } from "@google/genai";
import { buildIngestionSystemPrompt } from "./prompts";
import { deduplicateDanaTransactions } from "../parser/file-preprocessor";
import { toCents } from "../money";

export interface ExtractedTransaction {
  date: string; // YYYY-MM-DD
  time: string | null;
  description: string;
  note: string | null;
  amount: number; // floating Rupiah
  amountCents: number; // integer cents
  type: "EXPENSE" | "INCOME" | "TRANSFER";
  category: string;
  subcategory: string | null;
  sourceWalletName: string;
  targetWalletName: string | null;
  confidence: number;
}

export interface ExtractionResult {
  detectedAccountName: string;
  statementPeriod: string;
  transactions: ExtractedTransaction[];
}

const transactionSchema = {
  type: Type.OBJECT,
  properties: {
    detectedAccountName: {
      type: Type.STRING,
      description: "Name of the detected bank or wallet account from document headers.",
    },
    statementPeriod: {
      type: Type.STRING,
      description: "Statement period if available, e.g., 'Agustus 2026'.",
    },
    transactions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING, description: "Date in YYYY-MM-DD format." },
          time: { type: Type.STRING, description: "Time in HH:mm:ss format if available." },
          description: { type: Type.STRING, description: "Merchant, store, or transaction description." },
          note: { type: Type.STRING, description: "Additional notes or purpose." },
          amount: { type: Type.NUMBER, description: "Absolute transaction amount in IDR (always positive number)." },
          type: {
            type: Type.STRING,
            enum: ["EXPENSE", "INCOME", "TRANSFER"],
            description: "Transaction flow type.",
          },
          category: { type: Type.STRING, description: "Category name." },
          subcategory: { type: Type.STRING, description: "Subcategory name." },
          targetWalletName: {
            type: Type.STRING,
            description: "Destination wallet name if type is TRANSFER.",
          },
          confidence: {
            type: Type.INTEGER,
            description: "Extraction confidence score between 0 and 100.",
          },
        },
        required: ["date", "description", "amount", "type", "category"],
      },
    },
  },
  required: ["transactions"],
};

/**
 * Extracts financial transactions using Google Gemini 2.5 Flash with structured JSON output.
 */
export async function extractTransactionsWithGemini(params: {
  contents: any[]; // inlineData parts or text strings
  selectedWalletName?: string;
  knownAccounts?: { name: string; accountNumber?: string | null }[];
}): Promise<ExtractionResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const systemPrompt = buildIngestionSystemPrompt(
    params.selectedWalletName,
    params.knownAccounts
  );

  // Exponential backoff retry logic (up to 3 attempts)
  let attempts = 0;
  let lastError: any = null;

  while (attempts < 3) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          { role: "user", parts: [{ text: systemPrompt }, ...params.contents] },
        ],
        config: {
          responseMimeType: "application/json",
          responseJsonSchema: transactionSchema,
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);

      const detectedAccountName =
        params.selectedWalletName || parsed.detectedAccountName || "Unknown Account";
      const statementPeriod = parsed.statementPeriod || "";

      const rawTxs = Array.isArray(parsed.transactions) ? parsed.transactions : [];

      const transactions: ExtractedTransaction[] = rawTxs.map((t: any) => ({
        date: t.date || new Date().toISOString().split("T")[0],
        time: t.time || null,
        description: t.description || "Transaksi Tanpa Judul",
        note: t.note || null,
        amount: Math.abs(Number(t.amount) || 0),
        amountCents: toCents(Math.abs(Number(t.amount) || 0)),
        type: (t.type as any) || "EXPENSE",
        category: t.category || "⚠️ Tidak Terduga",
        subcategory: t.subcategory || null,
        sourceWalletName: detectedAccountName,
        targetWalletName: t.targetWalletName || null,
        confidence: typeof t.confidence === "number" ? t.confidence : 95,
      }));

      // Apply server-level deduplication for DANA split payments
      const deduplicated = deduplicateDanaTransactions(transactions);

      return {
        detectedAccountName,
        statementPeriod,
        transactions: deduplicated,
      };
    } catch (error: any) {
      lastError = error;
      if (error?.status === 429 || error?.message?.includes("429")) {
        // Wait with exponential backoff before retry
        const delayMs = Math.pow(2, attempts) * 1000;
        await new Promise((res) => setTimeout(res, delayMs));
      } else {
        throw error;
      }
    }
  }

  throw lastError || new Error("Failed to extract transactions after 3 attempts.");
}
