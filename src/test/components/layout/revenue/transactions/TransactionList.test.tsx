/** @format */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, render, screen } from "../../../../test-utils";
import TransactionList from "../../../../../components/layout/revenue/transactions/TransactionList";
import type { Transaction } from "../../../../../api/types";
import { useFilterStore } from "../../../../../store/useFilterStore";
import { useUIStore } from "../../../../../store/useUIStore";

describe("TransactionList", () => {
  const mockTransactions: Transaction[] = [
    {
      amount: 5000,
      metadata_id: "meta1",
      metadata: {
        name: "John doe",
        type: "deposit",
        email: "john@example.com",
        quantity: "2",
        country: "Nigeria",
        product_name: "Premium Subscription",
      },
      payment_reference: "ref123",
      status: "successful",
      type: "deposit",
      date: "2024-01-15T10:30:00.000Z",
    },
    {
      amount: 3000,
      metadata_id: "meta2",
      metadata: {
        type: "withdrawal",
        country: "Nigeria",
      },
      payment_reference: "ref456",
      status: "successful",
      type: "withdrawal",
      date: "2024-01-10T14:45:00.000Z",
    },
    {
      amount: 1500,
      metadata_id: "meta3",
      metadata: {
        name: "Jane smith",
        type: "deposit",
        email: "jane@example.com",
        product_name: "Basic Plan",
        country: "Nigeria",
      },
      payment_reference: "ref789",
      status: "pending",
      type: "deposit",
      date: "2024-01-20T09:15:00.000Z",
    },
  ];

  describe("Rendering Transactions", () => {
    beforeEach(() => {
      useFilterStore.setState({
        filteredData: mockTransactions,
      });
      useUIStore.setState({ amountFontSize: "16px" });
    });

    it("should render all transactions when array is not empty", () => {
      render(<TransactionList />);
      expect(screen.getByText("Premium Subscription")).toBeInTheDocument();
      expect(screen.getByText("Cash Withdrawal")).toBeInTheDocument();
      expect(screen.getByText("Basic Plan")).toBeInTheDocument();
    });

    it("should render correct number of transaction items", () => {
      render(<TransactionList />);
      expect(screen.getByText("USD 5000")).toBeInTheDocument();
      expect(screen.getByText("USD 3000")).toBeInTheDocument();
      expect(screen.getByText("USD 1500")).toBeInTheDocument();
    });

    it("should use payment_reference as key for each transaction", () => {
      const { container } = render(<TransactionList />);
      const vStack = container.querySelector('[class*="chakra-stack"]');
      expect(vStack).toBeInTheDocument();
      expect(vStack?.children).toHaveLength(3);
    });
  });

  describe("Empty State", () => {
    it("should render EmptyState when transactions array is empty", () => {
      useFilterStore.setState({
        filteredData: [],
      });
      render(<TransactionList />);

      expect(
        screen.getByText(
          /No matching transaction found for the selected filter/i
        )
      ).toBeInTheDocument();
    });

    it("should not render transaction items when array is empty", () => {
      render(<TransactionList />);

      expect(screen.queryByText("USD")).not.toBeInTheDocument();
    });

    it("should pass onClearFilter to EmptyState", () => {
      useFilterStore.setState({
        clearFilter: vi.fn(),
      });
      render(<TransactionList />);

      expect(
        screen.getByRole("button", { name: /clear filter/i })
      ).toBeInTheDocument();
    });
  });

  describe("Custom Font Size", () => {
    it("should use default font size when not specified", () => {
      useUIStore.setState({ amountFontSize: undefined });
      useFilterStore.setState({
        filteredData: mockTransactions,
      });
      render(<TransactionList />);
      const amountText = screen.getByText("USD 5000");
      expect(amountText).toHaveStyle({ fontSize: "16px" });
    });

    it("should use custom font size when specified", () => {
      useUIStore.setState({ amountFontSize: "20px" });
      render(<TransactionList />);
      const amountText = screen.getByText("USD 5000");
      expect(amountText).toHaveStyle({ fontSize: "20px" });
    });

    it("should apply custom font size to all transaction items", () => {
      useUIStore.setState({ amountFontSize: "18px" });
      render(<TransactionList />);
      const amounts = ["USD 5000", "USD 3000", "USD 1500"];
      amounts.forEach((amount) => {
        const element = screen.getByText(amount);
        expect(element).toHaveStyle({ fontSize: "18px" });
      });
    });
  });

  describe("List Structure", () => {
    it("should render transactions in VStack with proper spacing", () => {
      const { container } = render(<TransactionList />);

      const vStack = container.querySelector('[class*="chakra-stack"]');
      expect(vStack).toBeInTheDocument();
    });

    it("should render transactions with stretch alignment", () => {
      const { container } = render(<TransactionList />);

      const vStack = container.querySelector('[class*="chakra-stack"]');
      expect(vStack).toBeInTheDocument();
    });
  });

  describe("Single Transaction", () => {
    it("should render single transaction correctly", () => {
      render(<TransactionList />);

      expect(screen.getByText("Premium Subscription")).toBeInTheDocument();
      expect(screen.getByText("USD 5000")).toBeInTheDocument();
      expect(screen.getByText("John doe")).toBeInTheDocument();
    });
  });

  describe("Multiple Transactions", () => {
    it("should handle large numb  er of transactions", () => {
      act(() => {
        useFilterStore.setState({
          filteredData: Array.from({ length: 100 }, (_, i) => ({
            ...mockTransactions[0],
            payment_reference: `ref${i}`,
            amount: i * 100,
          })),
        });
      });
      const { container } = render(<TransactionList />);

      const vStack = container.querySelector('[class*="chakra-stack"]');
      expect(vStack?.children).toHaveLength(100);
    });

    it("should render transactions in order", () => {
      act(() => {
        useFilterStore.setState({
          filteredData: mockTransactions,
        });
      });
      render(<TransactionList />);

      const amounts = screen.getAllByText(/USD/);
      expect(amounts).toHaveLength(3);
      expect(amounts[0]).toHaveTextContent("USD 5000");
      expect(amounts[1]).toHaveTextContent("USD 3000");
      expect(amounts[2]).toHaveTextContent("USD 1500");
    });
  });

  describe("Edge Cases", () => {
    it("should handle transactions with missing metadata gracefully", () => {
      act(() => {
        useFilterStore.setState({
          filteredData: [
            {
              amount: 2000,
              metadata_id: "meta4",
              metadata: undefined,
              payment_reference: "ref999",
              status: "successful",
              type: "withdrawal",
              date: "2024-01-01T12:00:00.000Z",
            },
          ],
        });
      });
      render(<TransactionList />);

      expect(screen.getByText("Cash Withdrawal")).toBeInTheDocument();
      expect(screen.getByText("USD 2000")).toBeInTheDocument();
    });

    it("should handle zero amount transactions", () => {
      act(() => {
        useFilterStore.setState({
          filteredData: [
            {
              amount: 0,
              metadata_id: "meta4",
              metadata: undefined,
              payment_reference: "ref999",
              status: "successful",
              type: "withdrawal",
              date: "2024-01-01T12:00:00.000Z",
            },
          ],
        });
      });

      render(<TransactionList />);

      expect(screen.getByText("USD 0")).toBeInTheDocument();
    });

    it("should handle negative amount transactions", () => {
      act(() => {
        useFilterStore.setState({
          filteredData: [
            {
              amount: -1000,
              metadata_id: "meta4",
              metadata: undefined,
              payment_reference: "ref999",
              status: "successful",
              type: "withdrawal",
              date: "2024-01-01T12:00:00.000Z",
            },
          ],
        });
      });

      render(<TransactionList />);

      expect(screen.getByText("USD -1000")).toBeInTheDocument();
    });
  });

  describe("Conditional Rendering", () => {
    it("should switch from transactions to empty state when cleared", () => {
      act(() => {
        useFilterStore.setState({
          filteredData: [],
        });
      });

      render(<TransactionList />);

      expect(
        screen.queryByText("Premium Subscription")
      ).not.toBeInTheDocument();

      expect(
        screen.getByText(
          /No matching transaction found for the selected filter/i
        )
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Premium Subscription")
      ).not.toBeInTheDocument();
    });

    it("should switch from empty state to transactions when populated", () => {
      const { rerender } = render(<TransactionList />);

      expect(
        screen.getByText(
          /No matching transaction found for the selected filter/i
        )
      ).toBeInTheDocument();

      expect(
        screen.queryByText("Premium Subscription")
      ).not.toBeInTheDocument();

      act(() => {
        useFilterStore.setState({
          filteredData: mockTransactions,
        });
      });

      rerender(<TransactionList />);

      expect(screen.getByText("Premium Subscription")).toBeInTheDocument();
      expect(
        screen.queryByText(
          /No matching transaction found for the selected filter/i
        )
      ).not.toBeInTheDocument();
    });
  });
});
