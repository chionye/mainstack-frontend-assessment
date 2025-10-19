/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UIState {
  // Drawer state
  isFilterDrawerOpen: boolean;

  // Font sizes
  amountFontSize: string;

  // Actions
  openFilterDrawer: () => void;
  closeFilterDrawer: () => void;
  setAmountFontSize: (size: string) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isFilterDrawerOpen: false,
      amountFontSize: "16px",

      openFilterDrawer: () => set({ isFilterDrawerOpen: true }),
      closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),
      setAmountFontSize: (size) => set({ amountFontSize: size }),
    }),
    {
      name: "ui-store",
    }
  )
);
