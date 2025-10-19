/** @format */

import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import CustomButton from "@/components/shared/Button";
import AmountDisplay from "./AmountDisplay";
import { useWalletStore } from "@/store/useWalletStore";
import { useActionsStore } from "@/store/useActionsStore";

const BalanceCard = () => {
  const { balance } = useWalletStore();
  const { handleWithdraw } = useActionsStore();
  const spacing = useBreakpointValue({ base: 5, md: 10 });
  const padding = useBreakpointValue({ base: 5, md: 0 });

  return (
    <Flex gap={spacing} px={padding} align='flex-start'>
      <Box textAlign='left'>
        <AmountDisplay
          amount={balance}
          label='Available Balance'
          showLabel
        />
      </Box>

      <Flex align='center'>
        <CustomButton onClick={handleWithdraw} variant='solid'>
          Withdraw
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default BalanceCard;
