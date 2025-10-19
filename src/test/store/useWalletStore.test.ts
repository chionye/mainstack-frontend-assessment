/** @format */

import { describe, it, expect, beforeEach } from "vitest";

import { useWalletStore } from "../../store/useWalletStore";

describe("useWalletStore", () => {
  beforeEach(() => {
    useWalletStore.setState({
      balance: 0,
      walletStats: null,
    });
  });

  it("should set the balance state", () => {
    useWalletStore.getState().setBalance(1000);
    expect(useWalletStore.getState().balance).toBe(1000);
  });

  it("should set the walletStats state", () => {
    useWalletStore.getState().setWalletStats({
      total_payout: 1000,
      total_revenue: 2000,
      pending_payout: 3000,
      ledger_balance: 4000,
    });
    expect(useWalletStore.getState().walletStats).toEqual({
      total_payout: 1000,
      total_revenue: 2000,
      pending_payout: 3000,
      ledger_balance: 4000,
    });
  });

  it("should set the setWalletData state", () => {
    useWalletStore.getState().setWalletData(1000, {
      total_payout: 1000,
      total_revenue: 2000,
      pending_payout: 3000,
      ledger_balance: 4000,
    });
    expect(useWalletStore.getState().walletStats).toEqual({
      total_payout: 1000,
      total_revenue: 2000,
      pending_payout: 3000,
      ledger_balance: 4000,
    });
  });
});
