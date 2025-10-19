/** @format */

import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import Chart from "@/components/layout/revenue/Chart";
import BalanceCard from "./BalanceCard";
import WalletStatsPanel from "./WalletStatsPanel";
import { useFilterStore } from "@/store/useFilterStore";

const BalanceSection = () => {
  const { filteredData } = useFilterStore();
  const flexDirection = useBreakpointValue<"column" | "row">({
    base: "column",
    md: "row",
  });

  return (
    <Flex
      direction={flexDirection}
      justify='space-between'
      gap={{ base: 10, md: 0 }}>
      <Box flex={1}>
        <BalanceCard />
        <Chart data={filteredData} />
      </Box>

      <WalletStatsPanel />
    </Flex>
  );
};

export default BalanceSection;
