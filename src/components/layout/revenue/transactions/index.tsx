/** @format */

import { Box } from "@chakra-ui/react";
import TransactionHeader from "./TransactionHeader";
import TransactionList from "./TransactionList";
import type { TransactionsSectionProps } from "./types";

const TransactionsSection = ({
  transactions,
  transactionPeriod,
  onFilterApply,
  onFilterClear,
  onExport,
}: TransactionsSectionProps) => {
  return (
    <Box>
      <TransactionHeader
        count={transactions.length}
        period={transactionPeriod}
        onFilterApply={onFilterApply}
        onFilterClear={onFilterClear}
        onExport={onExport}
      />
      <TransactionList
        transactions={transactions}
        onClearFilter={onFilterClear}
      />
    </Box>
  );
};

export default TransactionsSection;
