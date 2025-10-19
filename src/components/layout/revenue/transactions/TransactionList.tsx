/** @format */

import { VStack } from "@chakra-ui/react";
import type { TransactionListProps } from "./types";
import EmptyState from "./EmptyState";
import TransactionItem from "./TransactionItem";

const TransactionList = ({
  transactions,
  onClearFilter,
  amountFontSize = "16px",
}: TransactionListProps) => {
  if (transactions.length === 0) {
    return <EmptyState onClearFilter={onClearFilter} />;
  }

  return (
    <VStack gap={6} align='stretch' mt={6} pb={10}>
      {transactions.map((transaction, index) => (
        <TransactionItem
          key={index}
          transaction={transaction}
          amountFontSize={amountFontSize}
        />
      ))}
    </VStack>
  );
};

export default TransactionList;
