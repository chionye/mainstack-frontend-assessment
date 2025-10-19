/** @format */

import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import type { BalanceSectionProps } from "./types";
import Chart from "@/components/layout/revenue/Chart";
import BalanceCard from "./BalanceCard";
import WalletStatsPanel from "./WalletStatsPanel";

const BalanceSection = ({
  balance,
  walletStats,
  chartData,
  onWithdraw,
  amountFontSize = "36px",
}: BalanceSectionProps) => {
  const flexDirection = useBreakpointValue<"column" | "row">({
    base: "column",
    md: "row",
  });

  return (
    <Flex
      direction={flexDirection}
      justify='space-between'
      gap={{ base: 10, md: 0 }}>
      {/* Left Section - Balance & Chart */}
      <Box flex={1}>
        <BalanceCard
          balance={balance}
          onWithdraw={onWithdraw}
          amountFontSize={amountFontSize}
        />
        <Chart data={chartData} />
      </Box>

      {/* Right Section - Wallet Stats */}
      <WalletStatsPanel walletStats={walletStats} />
    </Flex>
  );
};

export default BalanceSection;
