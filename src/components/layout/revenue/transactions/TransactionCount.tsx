/** @format */

import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useFilterStore } from "@/store/useFilterStore";

const TransactionCount = () => {
  const { filteredData, transactionPeriod } = useFilterStore();
  const headingColor = useColorModeValue("#131316", "white");
  const textColor = useColorModeValue("#56616B", "gray.400");

  const formatPeriodText = () => {
    if (
      transactionPeriod === "this month" ||
      transactionPeriod === "all time"
    ) {
      return transactionPeriod;
    }
    return `${transactionPeriod}`;
  };

  return (
    <Box>
      <Heading
        as='h3'
        fontSize='20px'
        fontWeight='semibold'
        color={headingColor}>
        {filteredData.length} Transactions
      </Heading>
      <Text color={textColor} fontSize='14px' mt={1}>
        Your transactions for {formatPeriodText()}
      </Text>
    </Box>
  );
};

export default TransactionCount;
