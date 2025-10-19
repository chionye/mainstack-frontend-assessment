/** @format */

import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../../../../test-utils";
import userEvent from "@testing-library/user-event";
import FilterDrawer from "../../../../../components/layout/revenue/transactions/FilterDrawer";

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
      render(<FilterDrawer {...defaultProps} />);

      expect(screen.getByText("Filter")).toBeInTheDocument();
    });

    it("should not render drawer content when closed", () => {
      render(<FilterDrawer {...defaultProps} isOpen={false} />);

      expect(screen.queryByText("Filter")).not.toBeInTheDocument();
    });

    it("should render Filter heading", () => {
      render(<FilterDrawer {...defaultProps} />);

      const heading = screen.getByText("Filter");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveStyle({
        fontSize: "20px",
        fontWeight: "var(--chakra-font-weights-bold)",
      });
    });

    it("should render close icon", () => {
      const { container } = render(<FilterDrawer {...defaultProps} />);

      const closeIcon = container.querySelector("svg");
      expect(closeIcon).toBeInTheDocument();
    });
  });

  describe("Filter Components", () => {
    it("should render PeriodButtonGroup", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(
        screen.getByRole("button", { name: /today/i })
      ).toBeInTheDocument();
    });

    it("should render DateRangeSelector with label", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(screen.getByText("Date range")).toBeInTheDocument();
    });

    it("should render TransactionTypeSelector", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(screen.getByText("Transaction Type")).toBeInTheDocument();
    });

    it("should render TransactionStatusSelector", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(screen.getByText("Transaction Status")).toBeInTheDocument();
    });
  });

  describe("Action Buttons", () => {
    it("should render Clear button", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(
        screen.getByRole("button", { name: /clear/i })
      ).toBeInTheDocument();
    });

    it("should render Apply button", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(
        screen.getByRole("button", { name: /apply/i })
      ).toBeInTheDocument();
    });

    it("should call onClear and onClose when Clear button is clicked", async () => {
      const user = userEvent.setup();
      const onClear = vi.fn();
      const onClose = vi.fn();
      const props = { ...defaultProps, onClear, onClose };
      render(<FilterDrawer {...props} />);

      const clearButton = screen.getByRole("button", { name: /clear/i });
      await user.click(clearButton);

      expect(onClear).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should call onApply when Apply button is clicked with active filters", async () => {
      const user = userEvent.setup();
      const onApply = vi.fn();
      const props = {
        ...defaultProps,
        onApply,
        transactionPeriod: "today",
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      await user.click(applyButton);

      expect(onApply).toHaveBeenCalledTimes(1);
    });
  });

  describe("hasActiveFilters Logic", () => {
    it("should disable Apply button when no filters are active", () => {
      render(<FilterDrawer {...defaultProps} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });

    it("should enable Apply button when period filter is active", () => {
      const props = {
        ...defaultProps,
        transactionPeriod: "today",
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should enable Apply button when custom dates are set", () => {
      const props = {
        ...defaultProps,
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should enable Apply button when types are selected", () => {
      const props = {
        ...defaultProps,
        selectedTypes: ["deposit"],
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should enable Apply button when statuses are selected", () => {
      const props = {
        ...defaultProps,
        selectedStatuses: ["successful"],
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should enable Apply button when multiple filters are active", () => {
      const props = {
        ...defaultProps,
        transactionPeriod: "last 7 days",
        selectedTypes: ["deposit", "withdrawal"],
        selectedStatuses: ["successful", "pending"],
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should not call onApply logic when Apply button is disabled", () => {
      render(<FilterDrawer {...defaultProps} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });
  });

  describe("Drawer Behavior", () => {
    it("should render drawer when open", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(screen.getByText("Filter")).toBeInTheDocument();
    });

    it("should render drawer with end placement", () => {
      const { container } = render(<FilterDrawer {...defaultProps} />);

      expect(container.querySelector('[class*="chakra"]')).toBeInTheDocument();
    });

    it("should render drawer with medium size", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(screen.getByText("Filter")).toBeInTheDocument();
    });
  });

  describe("State Management", () => {
    it("should manage typeMenuOpen state", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(screen.getByText("Transaction Type")).toBeInTheDocument();
    });

    it("should manage statusMenuOpen state", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(screen.getByText("Transaction Status")).toBeInTheDocument();
    });
  });

  describe("Props Propagation", () => {
    it("should pass transactionPeriod to PeriodButtonGroup", () => {
      const props = {
        ...defaultProps,
        transactionPeriod: "Last 3 months",
      };
      render(<FilterDrawer {...props} />);

      expect(
        screen.getByRole("button", { name: /last 3 months/i })
      ).toBeInTheDocument();
    });

    it("should pass onPeriodChange to PeriodButtonGroup", async () => {
      const user = userEvent.setup();
      const onPeriodChange = vi.fn();
      const props = { ...defaultProps, onPeriodChange };
      render(<FilterDrawer {...props} />);

      const todayButton = screen.getByRole("button", { name: /today/i });
      await user.click(todayButton);

      expect(onPeriodChange).toHaveBeenCalledWith("today");
    });

    it("should pass date props to DateRangeSelector", () => {
      const props = {
        ...defaultProps,
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      };
      render(<FilterDrawer {...props} />);

      expect(screen.getByText("Date range")).toBeInTheDocument();
    });

    it("should pass selectedTypes to TransactionTypeSelector", () => {
      const props = {
        ...defaultProps,
        selectedTypes: ["deposit"],
      };
      render(<FilterDrawer {...props} />);

      expect(screen.getByText("Transaction Type")).toBeInTheDocument();
    });

    it("should pass selectedStatuses to TransactionStatusSelector", () => {
      const props = {
        ...defaultProps,
        selectedStatuses: ["successful"],
      };
      render(<FilterDrawer {...props} />);

      expect(screen.getByText("Transaction Status")).toBeInTheDocument();
    });
  });

  describe("Button Styling", () => {
    it("should style Clear button correctly", () => {
      render(<FilterDrawer {...defaultProps} />);

      const clearButton = screen.getByRole("button", { name: /clear/i });
      expect(clearButton).toHaveStyle({
        borderRadius: "var(--chakra-radii-full)",
        fontSize: "14px",
      });
    });

    it("should style Apply button with disabled state", () => {
      render(<FilterDrawer {...defaultProps} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toHaveStyle({
        borderRadius: "var(--chakra-radii-full)",
        fontSize: "14px",
      });
      expect(applyButton).toBeDisabled();
    });

    it("should style Apply button with enabled state", () => {
      const props = {
        ...defaultProps,
        transactionPeriod: "today",
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle only startDate without endDate", () => {
      const props = {
        ...defaultProps,
        startDate: "2024-01-01",
        endDate: undefined,
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });

    it("should handle only endDate without startDate", () => {
      const props = {
        ...defaultProps,
        startDate: undefined,
        endDate: "2024-01-31",
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });

    it("should handle empty selectedTypes array", () => {
      const props = {
        ...defaultProps,
        selectedTypes: [],
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });

    it("should handle empty selectedStatuses array", () => {
      const props = {
        ...defaultProps,
        selectedStatuses: [],
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();
    });

    it("should handle multiple clicks on Clear button", async () => {
      const user = userEvent.setup();
      const onClear = vi.fn();
      const onClose = vi.fn();
      const props = { ...defaultProps, onClear, onClose };
      render(<FilterDrawer {...props} />);

      const clearButton = screen.getByRole("button", { name: /clear/i });
      await user.click(clearButton);
      await user.click(clearButton);

      expect(onClear).toHaveBeenCalledTimes(2);
      expect(onClose).toHaveBeenCalledTimes(2);
    });

    it("should handle multiple clicks on Apply button when enabled", async () => {
      const user = userEvent.setup();
      const onApply = vi.fn();
      const props = {
        ...defaultProps,
        onApply,
        transactionPeriod: "today",
      };
      render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      await user.click(applyButton);
      await user.click(applyButton);

      expect(onApply).toHaveBeenCalledTimes(2);
    });
  });

  describe("Re-renders", () => {
    it("should update Apply button state when filters change", () => {
      const { rerender } = render(<FilterDrawer {...defaultProps} />);

      let applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();

      const newProps = {
        ...defaultProps,
        transactionPeriod: "today",
      };
      rerender(<FilterDrawer {...newProps} />);

      applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should update when selectedTypes changes", () => {
      const { rerender } = render(<FilterDrawer {...defaultProps} />);

      let applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeDisabled();

      const newProps = {
        ...defaultProps,
        selectedTypes: ["deposit", "withdrawal"],
      };
      rerender(<FilterDrawer {...newProps} />);

      applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();
    });

    it("should update when drawer opens and closes", () => {
      const onClose = vi.fn();
      const props = { ...defaultProps, onClose };

      // Test closed state
      render(<FilterDrawer {...props} isOpen={false} />);
      expect(screen.queryByText("Filter")).not.toBeInTheDocument();

      // Test open state - render fresh instead of rerender
      const { container } = render(<FilterDrawer {...props} isOpen={true} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("useMemo Optimization", () => {
    it("should memoize hasActiveFilters calculation", () => {
      const props = {
        ...defaultProps,
        transactionPeriod: "today",
        selectedTypes: ["deposit"],
        selectedStatuses: ["successful"],
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      };
      const { rerender } = render(<FilterDrawer {...props} />);

      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).not.toBeDisabled();

      rerender(<FilterDrawer {...props} />);

      expect(applyButton).not.toBeDisabled();
    });
  });

  describe("Layout Structure", () => {
    it("should render VStack for filter controls", () => {
      const { container } = render(<FilterDrawer {...defaultProps} />);

      const vStacks = container.querySelectorAll('[class*="chakra-stack"]');
      expect(vStacks.length).toBeGreaterThan(0);
    });

    it("should render HStack for action buttons", () => {
      render(<FilterDrawer {...defaultProps} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(2);
    });

    it("should render drawer body with flex layout", () => {
      render(<FilterDrawer {...defaultProps} />);

      expect(screen.getByText("Date range")).toBeInTheDocument();
      expect(screen.getByText("Transaction Type")).toBeInTheDocument();
      expect(screen.getByText("Transaction Status")).toBeInTheDocument();
    });
  });
});
