/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ActionsState {
  // Action handlers
  handleWithdraw: () => void;
  handleExport: () => void;
  handleRetry: () => void;

  // Actions to set handlers
  setWithdrawHandler: (handler: () => void) => void;
  setExportHandler: (handler: () => void) => void;
  setRetryHandler: (handler: () => void) => void;
}

export const useActionsStore = create<ActionsState>()(
  devtools(
    (set) => ({
      handleWithdraw: () => console.log("Withdraw clicked"),
      handleExport: () => console.log("Export transactions"),
      handleRetry: () => console.log("Retry"),

      setWithdrawHandler: (handler) => set({ handleWithdraw: handler }),
      setExportHandler: (handler) => set({ handleExport: handler }),
      setRetryHandler: (handler) => set({ handleRetry: handler }),
    }),
    {
      name: "actions-store",
    }
  )
);
