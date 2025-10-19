/** @format */

import { Box } from "@chakra-ui/react";
import TransactionHeader from "./TransactionHeader";
import TransactionList from "./TransactionList";
import type { Transaction } from "@/api/types";

interface TransactionsSectionProps {
  transactions: Transaction[];
  transactionPeriod: string;
  onFilterApply: () => void;
  onFilterClear: () => void;
  onExport?: () => void;
}

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
