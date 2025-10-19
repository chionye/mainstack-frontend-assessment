/** @format */

import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "../types";
import { API } from "../client";
import { TRANSACTIONS } from "@/constants/endpoints";

export const useTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        const { data } = await API.get(TRANSACTIONS);
        return data;
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        throw error;
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
