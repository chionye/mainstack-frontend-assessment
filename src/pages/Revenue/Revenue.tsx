/** @format */

import { useCallback, useMemo, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import BalanceSection from "@/components/layout/revenue/revenue-balance";
import { useWallet } from "@/api/hooks/useWallet";
import { useTransactions } from "@/api/hooks/useTransactions";
import { useFilterStore } from "@/store/useFilterStore";
import Loader from "@/components/shared/Loader";
import FilterDrawer from "@/components/layout/revenue/transactions/FilterDrawer";
import TransactionList from "@/components/layout/revenue/transactions/TransactionList";
import TransactionHeader from "@/components/layout/revenue/transactions/TransactionHeader";

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

  const { open, onOpen, onClose } = useDisclosure();

  const {
    filteredData,
    transactionPeriod,
    selectedItems,
    filterCount,
    startDate,
    endDate,
    setTransactions,
    setTransactionPeriod,
    setStartDate,
    setEndDate,
    toggleSelection,
    applyFilter,
    clearFilter,
  } = useFilterStore();

  // Update store when transactions data changes
  useEffect(() => {
    setTransactions(transactions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  const walletStats = useMemo(
    () => ({
      total_payout: wallet?.total_payout,
      total_revenue: wallet?.total_revenue,
      pending_payout: wallet?.pending_payout,
      ledger_balance: wallet?.ledger_balance,
    }),
    [wallet]
  );

  const handleWithdraw = useCallback(() => {
    console.log("Withdraw clicked");
  }, []);

  const handleExport = useCallback(() => {
    console.log("Export transactions");
    // Implement export logic
  }, []);

  const handleRetry = useCallback(() => {
    refetchWallet();
    refetchTransactions();
  }, [refetchWallet, refetchTransactions]);

  const handleApplyFilter = useCallback(() => {
    applyFilter();
    onClose();
  }, [applyFilter, onClose]);

  // Loading state
  if (walletLoading || transactionsLoading) {
    return (
      <Flex justify='center' align='center' height='100vh'>
        <Loader />
      </Flex>
    );
  }

  // Error state
  if (walletError || transactionsError) {
    return (
      <Flex justify='center' align='center' minH='100vh' px={4}>
        <VStack gap={6} maxW='md' textAlign='center'>
          <Heading size='lg' color='red.600'>
            Failed to load revenue data
          </Heading>
          <Text color='gray.600' fontSize='md'>
            {(walletError as Error)?.message ||
              (transactionsError as Error)?.message ||
              "An error occurred while fetching your revenue information"}
          </Text>
          <Button onClick={handleRetry} colorPalette='blue' size='lg'>
            Retry
          </Button>
        </VStack>
      </Flex>
    );
  }

  return (
    <Box>
      <BalanceSection
        balance={wallet?.balance ?? 0}
        walletStats={walletStats}
        chartData={filteredData}
        onWithdraw={handleWithdraw}
        amountFontSize='36px'
      />
      <TransactionHeader
        count={filteredData.length}
        period={transactionPeriod}
        onFilterApply={onOpen}
        onFilterClear={clearFilter}
        onExport={handleExport}
        filterCount={filterCount}
      />

      <FilterDrawer
        isOpen={open}
        onClose={onClose}
        transactionPeriod={transactionPeriod}
        onPeriodChange={setTransactionPeriod}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        selectedTypes={selectedItems.trans_type}
        selectedStatuses={selectedItems.trans_status}
        onTypeToggle={(type) => toggleSelection(type, "trans_type")}
        onStatusToggle={(status) => toggleSelection(status, "trans_status")}
        onApply={handleApplyFilter}
        onClear={clearFilter}
        startDate={startDate}
        endDate={endDate}
      />

      <TransactionList
        transactions={filteredData}
        onClearFilter={clearFilter}
        amountFontSize='16px'
      />
    </Box>
  );
};

export default Revenue;
