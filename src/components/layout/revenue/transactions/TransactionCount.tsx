/** @format */

import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Heading, Text } from "@chakra-ui/react";
import type { TransactionCountProps } from "./types";

const TransactionCount = ({ count, period }: TransactionCountProps) => {
  const headingColor = useColorModeValue("#131316", "white");
  const textColor = useColorModeValue("#56616B", "gray.400");

  const formatPeriodText = () => {
    if (period === "this month" || period === "all time") {
      return period;
    }
    return `${period}`;
  };

  return (
    <Box>
      <Heading
        as='h3'
        fontSize='20px'
        fontWeight='semibold'
        color={headingColor}>
        {count} Transactions
      </Heading>
      <Text color={textColor} fontSize='14px' mt={1}>
        Your transactions for {formatPeriodText()}
      </Text>
    </Box>
  );
};

export default TransactionCount;
