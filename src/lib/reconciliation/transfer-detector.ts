/**
 * Automatic Contra-Transaction Pairing & Transfer Reconciliation Engine
 * Strictly enforces Operational Cash Flow Isolation (Transfer Neutrality).
 */

export interface CandidateTransaction {
  id: string;
  sourceWalletName: string;
  amountCents: number;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  date: string; // YYYY-MM-DD
  time?: string | null; // HH:mm:ss
  description: string;
  targetWalletName?: string | null;
  transferPairId?: string | null;
  pairConfidence?: "HIGH" | "AMBIGUOUS" | "NONE";
  candidatePairIds?: string[];
}

/**
 * Checks if two transactions fall within the Hierarchical Smart Window:
 * - If both have time: within +/- 15 minutes (900 seconds)
 * - If time is absent: same calendar date (YYYY-MM-DD)
 */
export function isWithinSmartWindow(
  dateA: string,
  timeA: string | null | undefined,
  dateB: string,
  timeB: string | null | undefined
): boolean {
  if (dateA !== dateB) return false;

  // If either lacks time, matching the same calendar date is sufficient
  if (!timeA || !timeB) return true;

  try {
    const [hA, mA, sA] = timeA.split(":").map(Number);
    const [hB, mB, sB] = timeB.split(":").map(Number);

    const secondsA = (hA || 0) * 3600 + (mA || 0) * 60 + (sA || 0);
    const secondsB = (hB || 0) * 3600 + (mB || 0) * 60 + (sB || 0);

    const diffSeconds = Math.abs(secondsA - secondsB);
    return diffSeconds <= 15 * 60; // 15 minutes tolerance
  } catch {
    return true; // Fallback to same date
  }
}

/**
 * Runs Phase A (Intra-Batch) Contra-Transfer Pairing:
 * Finds opposite debit/credit pairs with identical amount between 2 different wallets.
 * Strictly requires mutual 1-to-1 matching for HIGH confidence.
 */
export function detectIntraBatchContraTransfers(
  transactions: CandidateTransaction[]
): CandidateTransaction[] {
  const result = transactions.map((t) => ({ ...t, candidatePairIds: [] as string[] }));
  
  // Map index -> array of matching counterpart indices
  const candidateMap = new Map<number, number[]>();
  for (let i = 0; i < result.length; i++) {
    candidateMap.set(i, []);
  }

  // Step 1: Find all valid candidate matches between opposites
  for (let i = 0; i < result.length; i++) {
    const txA = result[i];
    for (let j = i + 1; j < result.length; j++) {
      const txB = result[j];

      // Rule 1: Opposite directions (one INCOME, one EXPENSE)
      const isOpposite =
        (txA.type === "EXPENSE" && txB.type === "INCOME") ||
        (txA.type === "INCOME" && txB.type === "EXPENSE");
      if (!isOpposite) continue;

      // Rule 2: Identical amount in cents
      if (txA.amountCents !== txB.amountCents) continue;

      // Rule 3: Different wallets
      if (
        txA.sourceWalletName &&
        txB.sourceWalletName &&
        txA.sourceWalletName.toLowerCase() === txB.sourceWalletName.toLowerCase()
      ) {
        continue;
      }

      // Rule 4: Within Hierarchical Smart Window
      if (isWithinSmartWindow(txA.date, txA.time, txB.date, txB.time)) {
        candidateMap.get(i)!.push(j);
        candidateMap.get(j)!.push(i);
      }
    }
  }

  // Step 2: Classify pairs as HIGH (mutual 1-to-1) or AMBIGUOUS (1-to-N or N-to-M)
  const pairedIndices = new Set<number>();

  for (let i = 0; i < result.length; i++) {
    const matches = candidateMap.get(i) || [];
    if (matches.length === 0) continue;

    if (matches.length === 1) {
      const j = matches[0];
      const jMatches = candidateMap.get(j) || [];

      if (jMatches.length === 1 && jMatches[0] === i) {
        // Mutual 1-to-1 match: HIGH confidence
        if (!pairedIndices.has(i) && !pairedIndices.has(j)) {
          const pairId = crypto.randomUUID();
          result[i].transferPairId = pairId;
          result[i].type = "TRANSFER";
          result[i].targetWalletName = result[j].sourceWalletName;
          result[i].pairConfidence = "HIGH";

          result[j].transferPairId = pairId;
          result[j].type = "TRANSFER";
          result[j].targetWalletName = result[i].sourceWalletName;
          result[j].pairConfidence = "HIGH";

          pairedIndices.add(i);
          pairedIndices.add(j);
        }
      } else {
        // Partner has multiple candidates
        result[i].pairConfidence = "AMBIGUOUS";
        result[i].candidatePairIds = matches.map((idx) => result[idx].id);
      }
    } else {
      // Multiple candidates: AMBIGUOUS
      result[i].pairConfidence = "AMBIGUOUS";
      result[i].candidatePairIds = matches.map((idx) => result[idx].id);
    }
  }

  return result;
}
