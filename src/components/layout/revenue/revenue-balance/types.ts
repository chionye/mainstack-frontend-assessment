/** @format */

import type { Transaction } from "@/api/types";

export interface BalanceSectionProps {
  balance: number;
  walletStats?: WalletStats;
  chartData: Transaction[];
  onWithdraw?: () => void;
  amountFontSize?: string;
}

export interface WithdrawButtonProps {
  onClick?: () => void;
}

export interface BalanceCardProps {
  balance: number;
  onWithdraw?: () => void;
  amountFontSize?: string;
}

export interface WalletStats {
  total_payout?: number;
  total_revenue?: number;
  pending_payout?: number;
  ledger_balance?: number;
  [key: string]: number | undefined;
}

export interface AmountDisplayProps {
  amount: number;
  label?: string;
  fontSize?: string;
  currency?: string;
  showLabel?: boolean;
  showInfo?: boolean;
  labelColor?: string;
  amountColor?: string;
}

export interface StatItemProps {
  label: string;
  amount: number;
  showInfo?: boolean;
  fontSize?: string;
}

export interface ErrorStateProps {
  handleRetry: () => void;
  walletError: Error | null;
  transactionsError: Error | null;
}
