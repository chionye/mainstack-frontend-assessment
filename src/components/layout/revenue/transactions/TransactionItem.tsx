/** @format */

import { memo, useMemo } from "react";
import { HStack, Text, Box } from "@chakra-ui/react";
import { format } from "date-fns";
import { sentenceCase } from "@/services/helpers";
import type { TransactionItemProps } from "./types";
import { useColorModeValue } from "@/components/ui/color-mode";
import TransactionIcon from "./TransactionIcon";

const TransactionItem = ({
  transaction,
  amountFontSize = "16px",
}: TransactionItemProps) => {
  const titleColor = useColorModeValue("#131316", "white");
  const dateColor = useColorModeValue("#56616B", "gray.400");
  const amountColor = useColorModeValue("#131316", "white");

  const statusColor = useMemo(() => {
    if (!transaction.metadata?.name && transaction.status === "successful") {
      return "#0EA163";
    }
    if (!transaction.metadata?.name && transaction.status === "pending") {
      return "#A77A07";
    }
    return "#56616B";
  }, [transaction.metadata?.name, transaction.status]);

  const transactionType = useMemo(
    () => (transaction.metadata?.product_name ? "deposit" : "withdrawal"),
    [transaction.metadata?.product_name]
  );

  const formattedDate = useMemo(
    () => format(new Date(transaction.date), "MMM dd yyyy"),
    [transaction.date]
  );

  return (
    <HStack gap={2} align='center'>
      <TransactionIcon type={transactionType} />

      <Box flex={1}>
        <HStack justify='space-between' mb={3}>
          <Text color={titleColor} fontSize={amountFontSize}>
            {transaction.metadata?.product_name || "Cash Withdrawal"}
          </Text>
          <Text color={amountColor} fontSize={amountFontSize} fontWeight='bold'>
            USD {transaction.amount}
          </Text>
        </HStack>

        <HStack justify='space-between'>
          <Text color={statusColor} fontSize='14px'>
            {sentenceCase(transaction.metadata?.name || transaction.status)}
          </Text>
          <Text color={dateColor} fontSize='14px'>
            {formattedDate}
          </Text>
        </HStack>
      </Box>
    </HStack>
  );
};

export default memo(TransactionItem);
