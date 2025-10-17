/** @format */

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface QueryParam {
  id: string;
  url: string;
}

const Query = (queryParamsArray: QueryParam[]) => {
  const queries = queryParamsArray.map((param) =>
    useQuery({
      queryKey: [param.id],
      queryFn: async () => {
        const response = await axios.get(param.url);
        return response.data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    })
  );

  return { queries };
};

export default Query;
