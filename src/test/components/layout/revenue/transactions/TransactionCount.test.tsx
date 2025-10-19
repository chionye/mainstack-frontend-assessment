/** @format */

import { describe, it, expect } from "vitest";
import { act, render, screen } from "../../../../test-utils";
import TransactionCount from "../../../../../components/layout/revenue/transactions/TransactionCount";
import { useFilterStore } from "../../../../../store/useFilterStore";

describe("TransactionCount", () => {
  describe("Rendering", () => {
    it("should render transaction count heading", () => {
      const { container } = render(<TransactionCount />);

      expect(container).toBeInTheDocument();
    });

    it("should render period description", () => {
      render(<TransactionCount />);

      expect(
        screen.getByText(/Your transactions for all time/i)
      ).toBeInTheDocument();
    });

    it("should render as h3 heading", () => {
      const { container } = render(<TransactionCount />);

      const heading = container.querySelector("h3");
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Count Display", () => {
    it("should display single transaction correctly", () => {
      const { container } = render(<TransactionCount />);

      expect(container).toBeInTheDocument();
    });

    it("should display zero transactions", () => {
      const { container } = render(<TransactionCount />);

      expect(container).toBeInTheDocument();
    });

    it("should display large number of transactions", () => {
      useFilterStore.setState({
        filteredData: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          amount: 100,
          date: new Date(),
          region: "Region 1",
          category: "Category 1",
          type: "Type 1",
        })),
      });
      const { container } = render(<TransactionCount />);

      expect(container).toBeInTheDocument();
    });
  });

  describe("Period Formatting", () => {
    it('should format "all time" period correctly', () => {
      render(<TransactionCount />);

      expect(
        screen.getByText("Your transactions for all time")
      ).toBeInTheDocument();
    });

    it('should format "this month" period correctly', () => {
      useFilterStore.setState({
        transactionPeriod: "this month",
      });
      render(<TransactionCount />);

      expect(
        screen.getByText("Your transactions for this month")
      ).toBeInTheDocument();
    });

    it('should format "last 7 days" period correctly', () => {
      useFilterStore.setState({
        transactionPeriod: "last 7 days",
      });
      render(<TransactionCount />);

      expect(
        screen.getByText("Your transactions for last 7 days")
      ).toBeInTheDocument();
    });

    it('should format "last 3 months" period correctly', () => {
      useFilterStore.setState({
        transactionPeriod: "last 3 months",
      });
      render(<TransactionCount />);

      expect(
        screen.getByText("Your transactions for last 3 months")
      ).toBeInTheDocument();
    });

    it('should format "today" period correctly', () => {
      useFilterStore.setState({
        transactionPeriod: "today",
      });
      render(<TransactionCount />);

      expect(
        screen.getByText("Your transactions for today")
      ).toBeInTheDocument();
    });
  });

  describe("Period Text Formatting", () => {
    it('should return period as-is for "this month"', () => {
      useFilterStore.setState({
        transactionPeriod: "this month",
      });
      render(<TransactionCount />);

      const text = screen.getByText(/Your transactions for/i);
      expect(text.textContent).toBe("Your transactions for this month");
    });

    it('should return period as-is for "all time"', () => {
      useFilterStore.setState({
        transactionPeriod: "all time",
      });
      render(<TransactionCount />);

      const text = screen.getByText(/Your transactions for/i);
      expect(text.textContent).toBe("Your transactions for all time");
    });

    it("should return formatted period for other periods", () => {
      useFilterStore.setState({
        transactionPeriod: "last 30 days",
      });
      render(<TransactionCount />);

      const text = screen.getByText(/Your transactions for/i);
      expect(text.textContent).toBe("Your transactions for last 30 days");
    });
  });

  describe("Component Structure", () => {
    it("should render Box wrapper", () => {
      const { container } = render(<TransactionCount />);

      const box = container.querySelector("div");
      expect(box).toBeInTheDocument();
    });

    it("should render heading and description text", () => {
      const { container } = render(<TransactionCount />);

      const heading = container.querySelector("h3");
      const description = container.querySelector("p");

      expect(heading).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    it("should have proper heading hierarchy", () => {
      const { container } = render(<TransactionCount />);

      const h3 = container.querySelector("h3");
      expect(h3).toBeInTheDocument();
    });
  });

  describe("Typography", () => {
    it("should render heading with correct font size", () => {
      const { container } = render(<TransactionCount />);

      const heading = container.querySelector("h3");
      expect(heading).toHaveStyle({ fontSize: "20px" });
    });

    it("should render description with correct font size", () => {
      render(<TransactionCount />);

      const description = screen.getByText(/Your transactions for/i);
      expect(description).toHaveStyle({ fontSize: "14px" });
    });
  });

  describe("Dynamic Updates", () => {
    it("should update count when prop changes", () => {
      useFilterStore.setState({
        filteredData: Array.from({ length: 10 }, (_, i) => ({
          id: i,
          amount: 100,
          date: new Date(),
          region: "Region 1",
          category: "Category 1",
          type: "Type 1",
        })),
      });
      const { rerender } = render(<TransactionCount />);

      expect(screen.getByText("10 Transactions")).toBeInTheDocument();

      act(() => {
        useFilterStore.setState({
          filteredData: Array.from({ length: 25 }, (_, i) => ({
            id: i,
            amount: 100,
            date: new Date(),
            region: "Region 1",
            category: "Category 1",
            type: "Type 1",
          })),
        });
      });

      rerender(<TransactionCount />);

      expect(screen.getByText("25 Transactions")).toBeInTheDocument();
    });

    it("should update both count and period simultaneously", () => {
      useFilterStore.setState({
        filteredData: Array.from({ length: 10 }, (_, i) => ({
          id: i,
          amount: 100,
          date: new Date(),
          region: "Region 1",
          category: "Category 1",
          type: "Type 1",
        })),
        transactionPeriod: "all time",
      });

      const { rerender } = render(<TransactionCount />);

      expect(screen.getByText("10 Transactions")).toBeInTheDocument();
      expect(
        screen.getByText("Your transactions for all time")
      ).toBeInTheDocument();
      act(() => {
        useFilterStore.setState({
          filteredData: Array.from({ length: 5 }, (_, i) => ({
            id: i,
            amount: 100,
            date: new Date(),
            region: "Region 1",
            category: "Category 1",
            type: "Type 1",
          })),
          transactionPeriod: "this month",
        });
      });

      rerender(<TransactionCount />);

      expect(screen.getByText("5 Transactions")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty period string", () => {
      useFilterStore.setState({
        filteredData: [],
        transactionPeriod: "",
      });
      render(<TransactionCount />);

      expect(screen.getByText("Your transactions for")).toBeInTheDocument();
    });

    it("should handle very long period text", () => {
      const longPeriod =
        "from January 1st 2024 to December 31st 2024 for all regions";

      useFilterStore.setState({
        filteredData: [],
        transactionPeriod: longPeriod,
      });
      render(<TransactionCount />);

      expect(
        screen.getByText(`Your transactions for ${longPeriod}`)
      ).toBeInTheDocument();
    });

    it("should handle negative count gracefully", () => {
      useFilterStore.setState({
        filteredData: Array.from({ length: 1 }, (_, i) => ({
          id: i,
          amount: -100,
          date: new Date(),
          region: "Region 1",
          category: "Category 1",
          type: "Type 1",
        })),
        transactionPeriod: "all time",
      });
      render(<TransactionCount />);

      expect(screen.getByText("1 Transactions")).toBeInTheDocument();
    });

    it("should handle empty transaction list", () => {
      useFilterStore.setState({
        filteredData: [],
        transactionPeriod: "all time",
      });
      render(<TransactionCount />);

      expect(screen.getByText("0 Transactions")).toBeInTheDocument();
    });
  });

  describe("Period Variations", () => {
    const periods = [
      "all time",
      "this month",
      "last 7 days",
      "last 30 days",
      "last 3 months",
      "today",
      "yesterday",
      "this week",
      "last week",
      "this year",
    ];

    periods.forEach((period) => {
      it(`should display period "${period}" correctly`, () => {
        useFilterStore.setState({
          transactionPeriod: period,
        });
        render(<TransactionCount />);

        expect(
          screen.getByText(`Your transactions for ${period}`)
        ).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading role", () => {
      useFilterStore.setState({
        filteredData: Array.from({ length: 10 }, (_, i) => ({
          id: i,
          amount: 100,
          date: new Date(),
          region: "Region 1",
          category: "Category 1",
          type: "Type 1",
        })),
        transactionPeriod: "all time",
      });

      render(<TransactionCount />);

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("10 Transactions");
    });

    it("should be readable by screen readers", () => {
      render(<TransactionCount />);

      const heading = screen.getByRole("heading", { level: 3 });
      const description = screen.getByText(/Your transactions for/i);

      expect(heading).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });
});
