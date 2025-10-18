/** @format */

import { Box, Flex } from "@chakra-ui/react";
import BalanceSection from "@/components/layout/body/revenue-balance";
import { useWallet } from "@/api/hooks/useWallet";
import { useTransactions } from "@/api/hooks/useTransactions";
import { useTransactionFilter } from "@/hooks/useTransactionFilter";
import Loader from "@/components/shared/Loader";

const Revenue = () => {
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: transactions = [], isLoading: transactionsLoading } =
    useTransactions();

  const { filteredData } = useTransactionFilter({ transactions });

  const handleWithdraw = () => {
    console.log("Withdraw clicked");
  };

  if (walletLoading || transactionsLoading) {
    return (
      <Flex justify='center' align='center' height='100vh'>
        <Loader />
      </Flex>
    );
  }

  return (
    <Box lg={{ px: 24 }} md={{ px: 16 }} base={{ px: 10 }}>
      <BalanceSection
        balance={wallet?.balance ?? 0}
        walletStats={{
          total_payout: wallet?.total_payout,
          total_revenue: wallet?.total_revenue,
          pending_payout: wallet?.pending_payout,
          ledger_balance: wallet?.ledger_balance,
        }}
        chartData={filteredData}
        onWithdraw={handleWithdraw}
        amountFontSize='36px'
      />
    </Box>
  );
};

export default Revenue;
