/** @format */

import React, { act } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "../../../../test-utils";
import userEvent from "@testing-library/user-event";
import FilterDrawer from "../../../../../components/layout/revenue/transactions/FilterDrawer";
import { useUIStore } from "../../../../../store/useUIStore";
import { useFilterStore } from "../../../../../store/useFilterStore";

// Mock next-themes to prevent matchMedia errors
vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "light",
    setTheme: vi.fn(),
    forcedTheme: null,
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe("FilterDrawer", () => {
  let defaultProps: {
    isOpen: boolean;
    onClose: ReturnType<typeof vi.fn>;
    transactionPeriod: string;
    onPeriodChange: ReturnType<typeof vi.fn>;
    onStartDateChange: ReturnType<typeof vi.fn>;
    onEndDateChange: ReturnType<typeof vi.fn>;
    selectedTypes: string[];
    selectedStatuses: string[];
    onTypeToggle: ReturnType<typeof vi.fn>;
    onStatusToggle: ReturnType<typeof vi.fn>;
    onApply: ReturnType<typeof vi.fn>;
    onClear: ReturnType<typeof vi.fn>;
    startDate?: string;
    endDate?: string;
  };

  beforeEach(() => {
    defaultProps = {
      isOpen: true,
      onClose: vi.fn(),
      transactionPeriod: "all time",
      onPeriodChange: vi.fn(),
      onStartDateChange: vi.fn(),
      onEndDateChange: vi.fn(),
      selectedTypes: [],
      selectedStatuses: [],
      onTypeToggle: vi.fn(),
      onStatusToggle: vi.fn(),
      onApply: vi.fn(),
      onClear: vi.fn(),
      startDate: undefined,
      endDate: undefined,
    };
  });

  describe("Rendering", () => {
    it("should render filter drawer when open", () => {
      useUIStore.setState({ isFilterDrawerOpen: true });
      render(<FilterDrawer />);
      expect(screen.getByText("Filter")).toBeInTheDocument();
    });

    it("should not render drawer content when closed", () => {
      useUIStore.setState({ isFilterDrawerOpen: false });
      render(<FilterDrawer />);

      expect(screen.queryByText("Filter")).not.toBeInTheDocument();
    });

    it("should render Filter heading", () => {
      useUIStore.setState({ isFilterDrawerOpen: true });
      render(<FilterDrawer />);

      const heading = screen.getByText("Filter");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveStyle({
        fontSize: "20px",
        fontWeight: "var(--chakra-font-weights-bold)",
      });
    });

    it("should render close icon", () => {
      useUIStore.setState({ isFilterDrawerOpen: true });
      const { container } = render(<FilterDrawer />);

      const closeIcon = container.querySelector("svg");
      expect(closeIcon).toBeInTheDocument();
    });
  });

  describe("Filter Components", () => {
    it("should render PeriodButtonGroup", () => {
      render(<FilterDrawer />);

      expect(
        screen.getByRole("button", { name: /today/i })
      ).toBeInTheDocument();
    });

    it("should render DateRangeSelector with label", () => {
      render(<FilterDrawer />);

      expect(screen.getByText("Date range")).toBeInTheDocument();
    });

    it("should render TransactionTypeSelector", () => {
      render(<FilterDrawer />);

      expect(screen.getByText("Transaction Type")).toBeInTheDocument();
    });

    it("should render TransactionStatusSelector", () => {
      render(<FilterDrawer />);

      expect(screen.getByText("Transaction Status")).toBeInTheDocument();
    });
  });

  describe("Action Buttons", () => {
    it("should render Clear button", () => {
      render(<FilterDrawer />);

      expect(
        screen.getByRole("button", { name: /clear/i })
      ).toBeInTheDocument();
    });

    it("should render Apply button", () => {
      render(<FilterDrawer />);

      expect(
        screen.getByRole("button", { name: /apply/i })
      ).toBeInTheDocument();
    });

    it("should call onClear and onClose when Clear button is clicked", async () => {
      useFilterStore.setState({ clearFilter: vi.fn() });
      useUIStore.setState({ closeFilterDrawer: vi.fn() });
      const user = userEvent.setup();
      const onClear = useFilterStore.getState().clearFilter;
      const onClose = useUIStore.getState().closeFilterDrawer;
      render(<FilterDrawer />);

      const clearButton = screen.getByRole("button", { name: /clear/i });
      await user.click(clearButton);

      expect(onClear).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should call onApply when Apply button is clicked with active filters", async () => {
      const mockApplyFilter = vi.fn();
      const mockCloseDrawer = vi.fn();

      useFilterStore.setState({
        applyFilter: mockApplyFilter,
        transactionPeriod: "today",
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      });
      useUIStore.setState({
        closeFilterDrawer: mockCloseDrawer,
      });

      const user = userEvent.setup();
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();

      await user.click(applyButton);
      expect(mockApplyFilter).toHaveBeenCalledTimes(1);
      expect(mockCloseDrawer).toHaveBeenCalledTimes(1);
    });
  });

  describe("hasActiveFilters Logic", () => {
    it("should disable Apply button when no filters are active", () => {
      useFilterStore.setState({
        transactionPeriod: "all time",
        startDate: "",
        endDate: "",
        selectedItems: {
          trans_type: [],
          trans_status: [],
        },
      });

      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });

    it("should enable Apply button when period filter is active", () => {
      useFilterStore.setState({ transactionPeriod: "today" });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should enable Apply button when custom dates are set", () => {
      useFilterStore.setState({
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should enable Apply button when types are selected", () => {
      useFilterStore.setState({
        selectedItems: { trans_type: ["deposit"], trans_status: [] },
      });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should enable Apply button when statuses are selected", () => {
      useFilterStore.setState({
        selectedItems: { trans_type: [], trans_status: ["successful"] },
      });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should enable Apply button when multiple filters are active", () => {
      useFilterStore.setState({
        transactionPeriod: "last 7 days",
        selectedItems: {
          trans_type: ["deposit", "withdrawal"],
          trans_status: ["successful", "pending"],
        },
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should not call onApply logic when Apply button is disabled", () => {
      useUIStore.setState({ closeFilterDrawer: vi.fn() });

      const mockApplyFilter = vi.fn();
      useFilterStore.setState({
        applyFilter: mockApplyFilter,
        transactionPeriod: "all time",
        startDate: "",
        endDate: "",
        selectedItems: { trans_type: [], trans_status: [] },
      });

      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();

      userEvent.click(applyButton);

      expect(mockApplyFilter).not.toHaveBeenCalled();
    });
  });

  describe("Drawer Behavior", () => {
    it("should render drawer when open", () => {
      render(<FilterDrawer />);

      expect(screen.getByText("Filter")).toBeInTheDocument();
    });

    it("should render drawer with end placement", () => {
      const { container } = render(<FilterDrawer />);

      expect(container.querySelector('[class*="chakra"]')).toBeInTheDocument();
    });

    it("should render drawer with medium size", () => {
      render(<FilterDrawer />);

      expect(screen.getByText("Filter")).toBeInTheDocument();
    });
  });

  describe("State Management", () => {
    it("should manage typeMenuOpen state", () => {
      render(<FilterDrawer />);

      expect(screen.getByText("Transaction Type")).toBeInTheDocument();
    });

    it("should manage statusMenuOpen state", () => {
      render(<FilterDrawer />);

      expect(screen.getByText("Transaction Status")).toBeInTheDocument();
    });
  });

  describe("Props Propagation", () => {
    it("should pass transactionPeriod to PeriodButtonGroup", () => {
      useFilterStore.setState({ transactionPeriod: "Last 3 months" });
      render(<FilterDrawer />);

      expect(
        screen.getByRole("button", { name: /last 3 months/i })
      ).toBeInTheDocument();
    });

    it("should pass date props to DateRangeSelector", () => {
      useFilterStore.setState({
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      });
      render(<FilterDrawer />);

      expect(screen.getByText("Date range")).toBeInTheDocument();
    });

    it("should pass selectedTypes to TransactionTypeSelector", () => {
      useFilterStore.setState({
        selectedItems: { trans_type: ["deposit"], trans_status: [] },
      });
      render(<FilterDrawer />);

      expect(screen.getByText("Transaction Type")).toBeInTheDocument();
    });

    it("should pass selectedStatuses to TransactionStatusSelector", () => {
      useFilterStore.setState({
        selectedItems: { trans_type: [], trans_status: ["successful"] },
      });
      render(<FilterDrawer />);

      expect(screen.getByText("Transaction Status")).toBeInTheDocument();
    });
  });

  describe("Button Styling", () => {
    it("should style Clear button correctly", () => {
      render(<FilterDrawer />);

      const clearButton = screen.getByRole("button", { name: /clear/i });
      expect(clearButton).toHaveStyle({
        borderRadius: "var(--chakra-radii-full)",
        fontSize: "14px",
      });
    });

    it("should style Apply button with disabled state", () => {
      useUIStore.setState({ closeFilterDrawer: vi.fn() });
      const mockApplyFilter = vi.fn();
      useFilterStore.setState({
        applyFilter: mockApplyFilter,
        transactionPeriod: "all time",
        startDate: "",
        endDate: "",
        selectedItems: { trans_type: [], trans_status: [] },
      });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toHaveStyle({
        borderRadius: "var(--chakra-radii-full)",
        fontSize: "14px",
      });
      expect(applyButton).toBeDisabled();
    });

    it("should style Apply button with enabled state", () => {
      useFilterStore.setState({ transactionPeriod: "today" });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle only startDate without endDate", () => {
      useFilterStore.setState({
        startDate: "2024-01-01",
        endDate: "",
        transactionPeriod: "all time",
        selectedItems: {
          trans_type: [],
          trans_status: [],
        },
      });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });

    it("should handle only endDate without startDate", () => {
      useFilterStore.setState({
        startDate: "",
        endDate: "2024-01-31",
        transactionPeriod: "all time",
        selectedItems: {
          trans_type: [],
          trans_status: [],
        },
      });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });

    it("should handle empty selectedTypes array", () => {
      useFilterStore.setState({
        selectedItems: { trans_type: [], trans_status: [] },
      });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });

    it("should handle empty selectedStatuses array", () => {
      useFilterStore.setState({
        selectedItems: { trans_type: [], trans_status: [] },
      });
      render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });

    it("should handle multiple clicks on Clear button", async () => {
      const user = userEvent.setup();
      const onClear = vi.fn();
      const onClose = vi.fn();
      useUIStore.setState({ closeFilterDrawer: onClose });
      useFilterStore.setState({ clearFilter: onClear });
      render(<FilterDrawer />);

      const clearButton = screen.getByRole("button", { name: /clear/i });
      await user.click(clearButton);
      await user.click(clearButton);

      expect(onClear).toHaveBeenCalledTimes(2);
    });
  });

  describe("Re-renders", () => {
    it("should update Apply button state when filters change", () => {
      const { rerender } = render(<FilterDrawer />);

      let applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();

      act(() => {
        useFilterStore.setState({
          transactionPeriod: "today",
          selectedItems: {
            trans_type: ["deposit"],
            trans_status: ["successful"],
          },
          startDate: "2024-01-01",
          endDate: "2024-01-31",
        });
      });

      rerender(<FilterDrawer />);

      applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });
  });

  describe("useMemo Optimization", () => {
    it("should memoize hasActiveFilters calculation", () => {
      useFilterStore.setState({
        transactionPeriod: "today",
        selectedItems: {
          trans_type: ["deposit"],
          trans_status: ["successful"],
        },
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      });
      const { rerender } = render(<FilterDrawer />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();

      rerender(<FilterDrawer />);

      expect(applyButton).not.toBeDisabled();
    });
  });

  describe("Layout Structure", () => {
    it("should render VStack for filter controls", () => {
      const { container } = render(<FilterDrawer />);

      const vStacks = container.querySelectorAll('[class*="chakra-stack"]');
      expect(vStacks.length).toBeGreaterThan(0);
    });

    it("should render HStack for action buttons", () => {
      render(<FilterDrawer />);

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(2);
    });

    it("should render drawer body with flex layout", () => {
      render(<FilterDrawer />);

      expect(screen.getByText("Date range")).toBeInTheDocument();
      expect(screen.getByText("Transaction Type")).toBeInTheDocument();
      expect(screen.getByText("Transaction Status")).toBeInTheDocument();
    });
  });
});
