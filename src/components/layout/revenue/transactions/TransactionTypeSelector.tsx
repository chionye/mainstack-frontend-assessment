import { selectTransactionTypeItems } from "@/constants/data";
import MultiSelectCheckbox from "./MultiSelectCheckbox";
import type { TransactionTypeSelectorProps } from "./types";

const TransactionTypeSelector = ({
  isOpen,
  selectedItems,
  onToggle,
  onOpenChange,
}: TransactionTypeSelectorProps) => {
  return (
    <MultiSelectCheckbox
      label="Transaction Type"
      items={selectTransactionTypeItems}
      selectedItems={selectedItems}
      onToggle={onToggle}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
};

export default TransactionTypeSelector;