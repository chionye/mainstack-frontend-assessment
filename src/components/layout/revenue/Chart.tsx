/** @format */

import { memo, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { format, parseISO } from "date-fns";
import { Box } from "@chakra-ui/react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import type { Transaction } from "@/api/types";

interface ChartDataPoint {
  date: string;
  amount: number;
  formattedDate: string;
}

const Chart = ({ data }: { data: Transaction[] }) => {
  const { width } = useWindowDimensions();
  const chartWidth = useMemo(
    () => (width > 500 ? width / 2 + 35 : width),
    [width]
  );

  // Process and format chart data
  const chartData = useMemo(() => {
    // Filter out transactions with 0 or negative amounts
    const validTransactions = data.filter((t) => t.amount > 0);

    // Sort by date
    const sorted = validTransactions.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Transform data with formatted dates
    return sorted.map((transaction) => ({
      date: transaction.date,
      amount: transaction.amount,
      formattedDate: format(parseISO(transaction.date), "MMM dd, yyyy"),
    }));
  }, [data]);

  const xAxisTicks = useMemo(() => {
    if (chartData.length === 0) return [];
    if (chartData.length === 1) return [chartData[0].date];
    return [chartData[0].date, chartData[chartData.length - 1].date];
  }, [chartData]);

  const formatXAxis = (value: string) => {
    if (!value) return "";
    try {
      return format(parseISO(value), "MMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  return (
    <Box overflow='visible' px={2}>
      <LineChart
        width={chartWidth}
        height={257}
        data={chartData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <Line
          type='monotone'
          dataKey='amount'
          stroke='#FF5403'
          strokeWidth={2}
          dot={false}
          connectNulls
        />
        <XAxis
          dataKey='date'
          stroke='#DBDEE5'
          ticks={xAxisTicks}
          tickFormatter={formatXAxis}
          style={{ fontSize: "12px" }}
          domain={["dataMin", "dataMax"]}
          tickMargin={8}
          interval='preserveStartEnd'
        />
        <YAxis hide />
        {chartData.length > 0 && (
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload as ChartDataPoint;
                return (
                  <Box
                    bg='white'
                    p={2}
                    border='1px solid'
                    borderColor='gray.200'
                    borderRadius='md'
                    boxShadow='sm'>
                    <Box fontSize='12px' color='gray.600'>
                      {data.formattedDate}
                    </Box>
                    <Box fontSize='14px' fontWeight='bold' color='#FF5403'>
                      USD {data.amount.toFixed(2)}
                    </Box>
                  </Box>
                );
              }
              return null;
            }}
          />
        )}
      </LineChart>
    </Box>
  );
};

export default memo(Chart);
