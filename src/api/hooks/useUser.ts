/** @format */

import { useQuery } from "@tanstack/react-query";
import { USERS } from "@/constants/endpoints";
import { API } from "../client";
import type { User } from "../types";

export const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await API.get(USERS);
      return data;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};
