/** @format */

import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "../types";
import { API } from "../client";
import { TRANSACTIONS } from "@/constants/endpoints";

export const useTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data } = await API.get(TRANSACTIONS);
      return data;
    },
  });
};
