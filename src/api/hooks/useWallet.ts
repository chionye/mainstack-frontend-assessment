/** @format */

import { useQuery } from "@tanstack/react-query";
import {  WALLET } from "@/constants/endpoints";
import type { WalletData } from "@/api/types";
import { API } from "../client";

export const useWallet = () => {
  return useQuery<WalletData>({
    queryKey: ["wallet"],
    queryFn: async () => {
      try {
        const { data } = await API.get(WALLET);
        return data;
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
        throw error;
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};
