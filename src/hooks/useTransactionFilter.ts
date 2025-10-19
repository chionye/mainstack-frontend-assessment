/** @format */

import { useState, useEffect, useCallback } from "react";
import type { Transaction } from "@/api/types";
import { filterData } from "@/services/filter";

interface SelectedItems {
  trans_type: string[];
  trans_status: string[];
}

interface UseTransactionFilterProps {
  transactions: Transaction[];
}

export const useTransactionFilter = ({
  transactions,
}: UseTransactionFilterProps) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    trans_type: [],
    trans_status: [],
  });
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [transactionPeriod, setTransactionPeriod] =
    useState<string>("all time");
  const [filteredData, setFilteredData] = useState<Transaction[]>([]);
  const [hasAppliedFilter, setHasAppliedFilter] = useState(false);

  // Only update filteredData when transactions change AND no filter has been applied
  useEffect(() => {
    if (!hasAppliedFilter) {
      setFilteredData(transactions);
    }
  }, [transactions, hasAppliedFilter]);

  const handleFilter = useCallback(() => {
    const result = filterData(
      transactions,
      transactionPeriod,
      startDate,
      endDate,
      selectedItems.trans_type,
      selectedItems.trans_status
    );
    setFilteredData(result);
    setHasAppliedFilter(true);
  }, [transactions, transactionPeriod, startDate, endDate, selectedItems]);

  const handleClearFilter = useCallback(() => {
    setFilteredData(transactions);
    setStartDate("");
    setEndDate("");
    setSelectedItems({ trans_type: [], trans_status: [] });
    setTransactionPeriod("all time");
    setHasAppliedFilter(false);
  }, [transactions]);

  const toggleSelection = useCallback((item: string, key: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [key]: prev[key as keyof SelectedItems].includes(item)
        ? prev[key as keyof SelectedItems].filter((i) => i !== item)
        : [...prev[key as keyof SelectedItems], item],
    }));
  }, []);

  return {
    selectedItems,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    transactionPeriod,
    setTransactionPeriod,
    filteredData,
    handleFilter,
    handleClearFilter,
    toggleSelection,
  };
};
