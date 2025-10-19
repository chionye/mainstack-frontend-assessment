/** @format */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Transaction } from "@/api/types";
import { filterData } from "@/services/filter";

interface SelectedItems {
  trans_type: string[];
  trans_status: string[];
}

interface FilterState {
  // Filter criteria
  selectedItems: SelectedItems;
  startDate: string;
  endDate: string;
  transactionPeriod: string;

  // Data
  transactions: Transaction[];
  filteredData: Transaction[];

  // UI state
  hasAppliedFilter: boolean;
  filterCount: number;

  // Actions
  setTransactions: (transactions: Transaction[]) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setTransactionPeriod: (period: string) => void;
  toggleSelection: (item: string, key: keyof SelectedItems) => void;
  applyFilter: () => void;
  clearFilter: () => void;
  resetFilterCriteria: () => void;
}

const initialFilterState = {
  selectedItems: {
    trans_type: [],
    trans_status: [],
  },
  startDate: "",
  endDate: "",
  transactionPeriod: "all time",
  transactions: [],
  filteredData: [],
  hasAppliedFilter: false,
  filterCount: 0,
};

// Helper to compare transaction arrays deeply
const areTransactionsEqual = (a: Transaction[], b: Transaction[]): boolean => {
  if (a.length !== b.length) return false;
  return JSON.stringify(a) === JSON.stringify(b);
};

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialFilterState,

        setTransactions: (transactions) => {
          const { hasAppliedFilter, transactions: currentTransactions } = get();

          // Deep comparison to prevent infinite loops
          if (areTransactionsEqual(currentTransactions, transactions)) {
            return;
          }

          // If no filter has been applied, update filteredData with new transactions
          if (!hasAppliedFilter) {
            set({ transactions, filteredData: transactions });
          } else {
            // If filter is applied, update transactions and re-apply filter
            set({ transactions }, false, "setTransactions");

            // Re-apply filter with new data
            const {
              transactionPeriod,
              startDate,
              endDate,
              selectedItems,
            } = get();

            const result = filterData(
              transactions,
              transactionPeriod,
              startDate,
              endDate,
              selectedItems.trans_type,
              selectedItems.trans_status
            );

            // Calculate filter count
            let count = 0;
            const hasCustomDates = startDate && endDate;
            const hasPeriod = transactionPeriod !== "all time";

            if (hasCustomDates || hasPeriod) count++;
            if (selectedItems.trans_type.length > 0) count++;
            if (selectedItems.trans_status.length > 0) count++;

            const finalCount = result.length > 0 ? count : 0;

            set({
              filteredData: result,
              filterCount: finalCount,
            }, false, "setTransactions/applyFilter");
          }
        },

        setStartDate: (date) => set({ startDate: date }),

        setEndDate: (date) => set({ endDate: date }),

        setTransactionPeriod: (period) => set({ transactionPeriod: period }),

        toggleSelection: (item, key) =>
          set((state) => ({
            selectedItems: {
              ...state.selectedItems,
              [key]: state.selectedItems[key].includes(item)
                ? state.selectedItems[key].filter((i) => i !== item)
                : [...state.selectedItems[key], item],
            },
          })),

        applyFilter: () => {
          const {
            transactions,
            transactionPeriod,
            startDate,
            endDate,
            selectedItems,
          } = get();

          const result = filterData(
            transactions,
            transactionPeriod,
            startDate,
            endDate,
            selectedItems.trans_type,
            selectedItems.trans_status
          );

          // Calculate filter count - only show if filters are applied AND results exist
          let count = 0;

          // Date filter - only count if period is set OR custom dates are used
          const hasCustomDates = startDate && endDate;
          const hasPeriod = transactionPeriod !== "all time";

          if (hasCustomDates || hasPeriod) {
            count++; // Count as one filter (either period or custom range)
          }

          if (selectedItems.trans_type.length > 0) count++;
          if (selectedItems.trans_status.length > 0) count++;

          // Only show count if there are actual results
          const finalCount = result.length > 0 ? count : 0;

          set({
            filteredData: result,
            hasAppliedFilter: true,
            filterCount: finalCount,
          });
        },

        clearFilter: () => {
          const { transactions } = get();
          set({
            ...initialFilterState,
            transactions,
            filteredData: transactions,
          });
        },

        resetFilterCriteria: () => {
          set({
            selectedItems: initialFilterState.selectedItems,
            startDate: initialFilterState.startDate,
            endDate: initialFilterState.endDate,
            transactionPeriod: initialFilterState.transactionPeriod,
          });
        },
      }),
      {
        name: "filter-store",
        // Only persist filter criteria, not the data
        partialize: (state) => ({
          selectedItems: state.selectedItems,
          startDate: state.startDate,
          endDate: state.endDate,
          transactionPeriod: state.transactionPeriod,
          hasAppliedFilter: state.hasAppliedFilter,
          filterCount: state.filterCount,
        }),
      }
    )
  )
);
