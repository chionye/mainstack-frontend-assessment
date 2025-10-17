/** @format */

import { useQueries } from "@tanstack/react-query";
import { API } from "./client";

interface QueryParam {
  id: string;
  url: string;
}

const Query = (queryParamsArray: QueryParam[]) => {
  const queries = useQueries({
    queries: queryParamsArray.map((param) => ({
      queryKey: [param.id],
      queryFn: async () => {
        const response = await API.get(param.url);
        return response.data;
      },
      staleTime: 5 * 60 * 1000,
      retry: 2,
    })),
  });

  return { queries };
};

export default Query;
