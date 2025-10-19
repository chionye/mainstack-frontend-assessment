/** @format */

export interface TransactionMetadata {
  name?: string;
  type?: string;
  email?: string;
  quantity?: string;
  country?: string;
  product_name?: string;
}

export interface Transaction {
  metadata_id: string;
  type: string;
  amount: number;
  status: string;
  date: string;
  metadata?: TransactionMetadata;
  payment_reference?: string;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface WalletData {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}