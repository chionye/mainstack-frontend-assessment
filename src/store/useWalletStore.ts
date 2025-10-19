/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { WalletStats } from "@/components/layout/revenue/revenue-balance/types";

interface WalletState {
  // Wallet data
  balance: number;
  walletStats: WalletStats | null;

  // Actions
  setBalance: (balance: number) => void;
  setWalletStats: (stats: WalletStats) => void;
  setWalletData: (balance: number, stats: WalletStats) => void;
}

export const useWalletStore = create<WalletState>()(
  devtools(
    (set) => ({
      balance: 0,
      walletStats: null,

      setBalance: (balance) => set({ balance }),

      setWalletStats: (walletStats) => set({ walletStats }),

      setWalletData: (balance, walletStats) => set({ balance, walletStats }),
    }),
    {
      name: "wallet-store",
    }
  )
);
