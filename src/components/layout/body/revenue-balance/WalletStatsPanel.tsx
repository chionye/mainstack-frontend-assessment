/** @format */

import { Box, VStack, useBreakpointValue } from "@chakra-ui/react";
import { generatePascalCase } from "@/services/helpers";
import type { WalletStats } from "./types";
import StatItem from "./StatItem";

interface WalletStatsPanelProps {
  walletStats?: WalletStats;
}

const WalletStatsPanel = ({ walletStats }: WalletStatsPanelProps) => {
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
        {statsToDisplay.map((key, index) => (
          <StatItem
            key={index}
            fontSize='24px'
            label={generatePascalCase(key)}
            amount={walletStats[key] as number}
            showInfo
          />
        ))}
      </VStack>
    </Box>
  );
};

export default WalletStatsPanel;
