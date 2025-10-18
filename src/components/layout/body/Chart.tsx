/** @format */

import { LineChart, Line, XAxis } from "recharts";
import { filterAndSortGraphData } from "@/services/helpers";
import { Box } from "@chakra-ui/react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import type { Transaction } from "@/api/types/transactions.types";

const Chart = ({ data }: { data: Transaction[] }) => {
  const filteredData = filterAndSortGraphData(data);
  const { width } = useWindowDimensions();
  const chartWidth = width > 500 ? width / 2 + 35 : width;

  return (
    <Box>
      <LineChart width={chartWidth} height={257} data={filteredData}>
        <Line type='monotone' dataKey='amount' stroke='#FF5403' dot={false} />
        <XAxis stroke='#DBDEE5' dataKey={"date"} interval='preserveStartEnd' />
      </LineChart>
    </Box>
  );
};

export default Chart;
