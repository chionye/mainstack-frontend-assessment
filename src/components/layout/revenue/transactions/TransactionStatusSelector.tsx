/** @format */

import MultiSelectCheckbox from "@/components/shared/MultiSelectCheckbox";
import { selectTransactionStatusItems } from "@/constants/data";
import type { TransactionStatusSelectorProps } from "./types";

const TransactionStatusSelector = ({
  isOpen,
  selectedItems,
  onToggle,
  onOpenChange,
}: TransactionStatusSelectorProps) => {
  return (
    <MultiSelectCheckbox
      label='Transaction Status'
      items={selectTransactionStatusItems}
      selectedItems={selectedItems}
      onToggle={onToggle}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
};

export default TransactionStatusSelector;
