import { create } from "zustand";

export interface PrivacyState {
  isBalanceHidden: boolean;
  toggleBalanceVisibility: () => void;
  setBalanceHidden: (hidden: boolean) => void;
}

export const usePrivacyStore = create<PrivacyState>((set) => ({
  // Default is true (hide nominal on fresh load / reload)
  isBalanceHidden: true,

  toggleBalanceVisibility: () =>
    set((state) => ({ isBalanceHidden: !state.isBalanceHidden })),

  setBalanceHidden: (hidden: boolean) =>
    set({ isBalanceHidden: hidden }),
}));
