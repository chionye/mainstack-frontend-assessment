/** @format */

import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import type { BalanceCardProps } from "./types";
import CustomButton from "@/components/shared/Button";
import AmountDisplay from "./AmountDisplay";

const BalanceCard = ({
  balance,
  onWithdraw,
  amountFontSize = "36px",
}: BalanceCardProps) => {
  const spacing = useBreakpointValue({ base: 5, md: 10 });
  const padding = useBreakpointValue({ base: 5, md: 0 });

  return (
    <Flex gap={spacing} px={padding} align='flex-start'>
      {/* Balance Display */}
      <Box textAlign='left'>
        <AmountDisplay
          amount={balance}
          label='Available Balance'
          fontSize={amountFontSize}
          showLabel
        />
      </Box>

      {/* Withdraw Button */}
      <Flex align='center'>
        <CustomButton onClick={onWithdraw} variant='solid'>Withdraw</CustomButton>
      </Flex>
    </Flex>
  );
};

export default BalanceCard;
