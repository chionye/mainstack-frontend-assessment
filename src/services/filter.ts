/** @format */

import type { Transaction } from "@/api/types";

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const normalizeTransactionType = (type: string): string => {
  if (type === "Withdrawals") return "withdrawal";
  return type.replace(" ", "_").toLowerCase();
};

const filterByDateRange = (
  transactions: Transaction[],
  range: string
): Transaction[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (range.toLowerCase()) {
    case "today":
      return transactions.filter((t) => isSameDay(new Date(t.date), today));

    case "last 7 days": {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      return transactions.filter((t) => new Date(t.date) >= sevenDaysAgo);
    }

    case "this month":
      return transactions.filter((t) => {
        const date = new Date(t.date);
        return (
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      });

    case "last 3 months": {
      const threeMonthsAgo = new Date(today);
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      return transactions.filter((t) => new Date(t.date) >= threeMonthsAgo);
    }

    default:
      return transactions;
  }
};

const filterByCustomRange = (
  transactions: Transaction[],
  start: string,
  end: string
): Transaction[] => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= startDate && date <= endDate;
  });
};

export const filterData = (
  transactions: Transaction[],
  dateRange: string,
  startDate?: string,
  endDate?: string,
  trans_type: string[] = [],
  trans_status: string[] = []
): Transaction[] => {
  let filtered = [...transactions];

  // Date filtering
  if (dateRange && dateRange !== "all time") {
    filtered = filterByDateRange(filtered, dateRange);
  }

  // Custom date range
  if (startDate && endDate) {
    filtered = filterByCustomRange(filtered, startDate, endDate);
  }

  // Type filtering
  if (trans_type.length > 0) {
    const normalizedTypes = trans_type.map(normalizeTransactionType);
    filtered = filtered.filter((t) => normalizedTypes.includes(t.type));
  }

  // Status filtering
  if (trans_status.length > 0) {
    const normalizedStatuses = trans_status.map((s) => s.toLowerCase());
    filtered = filtered.filter((t) =>
      normalizedStatuses.includes(t.status.toLowerCase())
    );
  }

  return filtered;
};
