/** @format */

import { VStack } from "@chakra-ui/react";
import { useFilterStore } from "@/store/useFilterStore";
import { useUIStore } from "@/store/useUIStore";
import EmptyState from "./EmptyState";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  const { filteredData, clearFilter } = useFilterStore();
  const { amountFontSize } = useUIStore();

  if (filteredData.length === 0) {
    return <EmptyState onClearFilter={clearFilter} />;
  }

  return (
    <VStack gap={6} align='stretch' mt={6} pb={10}>
      {filteredData.map((transaction) => (
        <TransactionItem
          key={transaction.payment_reference}
          transaction={transaction}
          amountFontSize={amountFontSize}
        />
      ))}
    </VStack>
  );
};

export default TransactionList;
