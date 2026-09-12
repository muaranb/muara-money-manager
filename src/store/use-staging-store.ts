import { create } from "zustand";
import { CandidateTransaction } from "@/lib/reconciliation/transfer-detector";

export interface StagingState {
  batchId: string | null;
  detectedAccountName: string;
  transactions: CandidateTransaction[];
  selectedRowIds: string[]; // store as array for simple Zustand immutability

  // Actions
  setBatch: (
    batchId: string,
    detectedAccountName: string,
    transactions: CandidateTransaction[]
  ) => void;
  toggleSelectRow: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  updateRow: (id: string, partial: Partial<CandidateTransaction>) => void;
  removeRow: (id: string) => void;
  removeSelectedRows: () => void;
  bulkReassignWallet: (walletName: string) => void;
  unpairTransfer: (rowId: string) => void;
  confirmTransferPair: (rowIdA: string, rowIdB: string) => void;
  addManualRow: (row: Omit<CandidateTransaction, "id">) => void;
  reset: () => void;
}

export const useStagingStore = create<StagingState>((set) => ({
  batchId: null,
  detectedAccountName: "Auto-Detect by AI",
  transactions: [],
  selectedRowIds: [],

  setBatch: (batchId, detectedAccountName, transactions) =>
    set({
      batchId,
      detectedAccountName,
      transactions,
      selectedRowIds: [],
    }),

  toggleSelectRow: (id) =>
    set((state) => {
      const exists = state.selectedRowIds.includes(id);
      return {
        selectedRowIds: exists
          ? state.selectedRowIds.filter((rowId) => rowId !== id)
          : [...state.selectedRowIds, id],
      };
    }),

  selectAll: () =>
    set((state) => ({
      selectedRowIds: state.transactions.map((t) => t.id),
    })),

  clearSelection: () => set({ selectedRowIds: [] }),

  updateRow: (id, partial) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...partial } : t
      ),
    })),

  removeRow: (id) =>
    set((state) => {
      const target = state.transactions.find((t) => t.id === id);
      const updatedTxs = state.transactions
        .filter((t) => t.id !== id)
        .map((t) => {
          // If this row was paired with another row, unpair the partner
          if (target?.transferPairId && t.transferPairId === target.transferPairId) {
            return {
              ...t,
              transferPairId: null,
              targetWalletName: null,
              pairConfidence: "NONE" as const,
              type: "EXPENSE" as const,
            };
          }
          return t;
        });

      return {
        transactions: updatedTxs,
        selectedRowIds: state.selectedRowIds.filter((rowId) => rowId !== id),
      };
    }),

  removeSelectedRows: () =>
    set((state) => {
      const selectedSet = new Set(state.selectedRowIds);
      return {
        transactions: state.transactions.filter((t) => !selectedSet.has(t.id)),
        selectedRowIds: [],
      };
    }),

  bulkReassignWallet: (walletName) =>
    set((state) => {
      const selectedSet = new Set(state.selectedRowIds);
      return {
        transactions: state.transactions.map((t) => {
          if (selectedSet.has(t.id)) {
            return { ...t, sourceWalletName: walletName };
          }
          return t;
        }),
      };
    }),

  unpairTransfer: (rowId) =>
    set((state) => {
      const row = state.transactions.find((t) => t.id === rowId);
      if (!row || !row.transferPairId) return state;

      const pairId = row.transferPairId;
      return {
        transactions: state.transactions.map((t) => {
          if (t.transferPairId === pairId) {
            return {
              ...t,
              transferPairId: null,
              targetWalletName: null,
              pairConfidence: "NONE" as const,
              type: "EXPENSE" as const,
            };
          }
          return t;
        }),
      };
    }),

  confirmTransferPair: (rowIdA, rowIdB) =>
    set((state) => {
      const txA = state.transactions.find((t) => t.id === rowIdA);
      const txB = state.transactions.find((t) => t.id === rowIdB);
      if (!txA || !txB) return state;

      const pairId = crypto.randomUUID();
      return {
        transactions: state.transactions.map((t) => {
          if (t.id === rowIdA) {
            return {
              ...t,
              transferPairId: pairId,
              targetWalletName: txB.sourceWalletName,
              pairConfidence: "HIGH" as const,
              candidatePairIds: [],
              type: "TRANSFER" as const,
            };
          }
          if (t.id === rowIdB) {
            return {
              ...t,
              transferPairId: pairId,
              targetWalletName: txA.sourceWalletName,
              pairConfidence: "HIGH" as const,
              candidatePairIds: [],
              type: "TRANSFER" as const,
            };
          }
          return t;
        }),
      };
    }),

  addManualRow: (row) =>
    set((state) => ({
      transactions: [
        {
          id: `manual-${Date.now()}`,
          ...row,
        },
        ...state.transactions,
      ],
    })),

  reset: () =>
    set({
      batchId: null,
      detectedAccountName: "Auto-Detect by AI",
      transactions: [],
      selectedRowIds: [],
    }),
}));
