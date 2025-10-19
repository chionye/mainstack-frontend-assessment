/** @format */

import { useMemo, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import BalanceSection from "@/components/layout/revenue/revenue-balance";
import { useWallet } from "@/api/hooks/useWallet";
import { useTransactions } from "@/api/hooks/useTransactions";
import { useFilterStore } from "@/store/useFilterStore";
import { useActionsStore } from "@/store/useActionsStore";
import { useWalletStore } from "@/store/useWalletStore";
import Loader from "@/components/shared/Loader";
import FilterDrawer from "@/components/layout/revenue/transactions/FilterDrawer";
import TransactionList from "@/components/layout/revenue/transactions/TransactionList";
import TransactionHeader from "@/components/layout/revenue/transactions/TransactionHeader";
import ErrorState from "@/components/layout/revenue/revenue-balance/ErrorState";

const Revenue = () => {
  const {
    data: wallet,
    isLoading: walletLoading,
    error: walletError,
    refetch: refetchWallet,
  } = useWallet();
  const {
    data: transactions = [],
    isLoading: transactionsLoading,
    error: transactionsError,
    refetch: refetchTransactions,
  } = useTransactions();

  const { setTransactions } = useFilterStore();
  const { setWalletData } = useWalletStore();

  const { setWithdrawHandler, setExportHandler, setRetryHandler } =
    useActionsStore();

  useEffect(() => {
    const withdrawHandler = () => console.log("Withdraw clicked");
    const exportHandler = () => console.log("Export transactions");
    const retryHandler = () => {
      refetchWallet();
      refetchTransactions();
    };

    setWithdrawHandler(withdrawHandler);
    setExportHandler(exportHandler);
    setRetryHandler(retryHandler);
  }, [
    refetchWallet,
    refetchTransactions,
    setWithdrawHandler,
    setExportHandler,
    setRetryHandler,
  ]);

  useEffect(() => {
    setTransactions(transactions);
  }, [transactions, setTransactions]);

  const walletStats = useMemo(
    () => ({
      total_payout: wallet?.total_payout,
      total_revenue: wallet?.total_revenue,
      pending_payout: wallet?.pending_payout,
      ledger_balance: wallet?.ledger_balance,
    }),
    [wallet]
  );

  useEffect(() => {
    if (wallet) {
      setWalletData(wallet.balance ?? 0, walletStats);
    }
  }, [wallet, walletStats, setWalletData]);

  if (walletLoading || transactionsLoading) {
    return (
      <Flex justify='center' align='center' height='100vh'>
        <Loader />
      </Flex>
    );
  }

  if (walletError || transactionsError) {
    return (
      <ErrorState
        walletError={walletError}
        transactionsError={transactionsError}
      />
    );
  }

  return (
    <Box>
      <BalanceSection />
      <TransactionHeader />
      <FilterDrawer />
      <TransactionList />
    </Box>
  );
};

export default Revenue;
