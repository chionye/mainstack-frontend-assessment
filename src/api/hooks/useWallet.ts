
import { useQuery } from "@tanstack/react-query";
import {  WALLET } from "@/constants/endpoints";
import type { WalletData } from "@/api/types";
import { API } from "../client";

export const useWallet = () => {
  return useQuery<WalletData>({
    queryKey: ["wallet"],
    queryFn: async () => {
      const { data } = await API.get(WALLET);
      return data;
    },
  });
};
