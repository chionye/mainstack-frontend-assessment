/** @format */

import { Box, VStack, useBreakpointValue } from "@chakra-ui/react";
import { generatePascalCase } from "@/services/helpers";
import StatItem from "./StatItem";
import { useWalletStore } from "@/store/useWalletStore";

const WalletStatsPanel = () => {
  const { walletStats } = useWalletStore();
  const width = useBreakpointValue({ base: "full", md: "271px" });
  const padding = useBreakpointValue({ base: 5, md: 0 });
  const marginTop = useBreakpointValue({ base: 10, md: 0 });

  if (!walletStats) return null;

  const statsToDisplay = Object.keys(walletStats).filter(
    (key) => key !== "balance" && walletStats[key] !== undefined
  );

  return (
    <Box w={width} px={padding} mt={marginTop}>
      <VStack gap={7} align='stretch'>
        {statsToDisplay.map((key) => {
          const amount = walletStats[key] ?? 0;
          return (
            <StatItem
              key={key}
              fontSize='24px'
              label={generatePascalCase(key)}
              amount={amount}
              showInfo
            />
          );
        })}
      </VStack>
    </Box>
  );
};

export default WalletStatsPanel;
