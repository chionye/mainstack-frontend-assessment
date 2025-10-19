/** @format */

import type { Transaction } from "@/api/types";

export interface TransactionsSectionProps {
  transactions: Transaction[];
  transactionPeriod: string;
  onFilterApply: () => void;
  onFilterClear: () => void;
  onExport?: () => void;
}

export interface TransactionHeaderProps {
  count: number;
  period: string;
  onFilterApply: () => void;
  onFilterClear?: () => void;
  onExport?: () => void;
  filterCount?: number;
}

export interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transactionPeriod: string;
  onPeriodChange: (period: string) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  selectedTypes: string[];
  selectedStatuses: string[];
  onTypeToggle: (type: string) => void;
  onStatusToggle: (status: string) => void;
  onApply: () => void;
  onClear: () => void;
  startDate?: string;
  endDate?: string;
}


export interface SelectItem {
  id: string;
  label: string;
  value?: string;
}

export interface MultiSelectCheckboxProps {
  label: string;
  items: SelectItem[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  isOpen: boolean;
  onOpenChange: () => void;
}

export interface PeriodButton {
  label: string;
}


export interface TransactionTypeSelectorProps {
  isOpen: boolean;
  selectedItems: string[];
  onToggle: (item: string) => void;
  onOpenChange: () => void;
}

export interface TransactionStatusSelectorProps {
  isOpen: boolean;
  selectedItems: string[];
  onToggle: (item: string) => void;
  onOpenChange: () => void;
}

export interface TransactionListProps {
  transactions: Transaction[];
  onClearFilter: () => void;
  amountFontSize?: string;
}

export interface TransactionItemProps {
  transaction: Transaction;
  amountFontSize?: string;
}

export interface EmptyStateProps {
  onClearFilter: () => void;
}

export interface DateRangeSelectorProps {
  label?: string;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
}

export interface FilterButtonProps {
  onClick: () => void;
  filterCount?: number;
}