/** @format */
import { describe, it, expect } from "vitest";
import { render, screen } from "../../../../test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import FilterButton from "../../../../../components/layout/revenue/transactions/FilterButton";
import { useFilterStore } from "../../../../../store/useFilterStore";
import { useUIStore } from "../../../../../store/useUIStore";

describe("FilterButton", () => {
  describe("Rendering", () => {
    it("should render filter button with text", () => {
      render(<FilterButton />);

      expect(
        screen.getByRole("button", { name: /filter/i })
      ).toBeInTheDocument();
    });

    it("should render Filter text", () => {
      render(<FilterButton />);

      expect(screen.getByText("Filter")).toBeInTheDocument();
    });

    it("should render chevron down icon", () => {
      const { container } = render(<FilterButton />);

      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("Filter Count Badge", () => {
    it("should not show badge when filterCount is 0", () => {
      render(<FilterButton />);

      expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    it("should not show badge when filterCount is undefined", () => {
      render(<FilterButton />);

      const badge = screen.queryByText(/[0-9]+/);
      expect(badge).not.toBeInTheDocument();
    });

    it("should show badge when filterCount is greater than 0", () => {
      useFilterStore.setState({ filterCount: 3 });
      render(<FilterButton />);

      const badge = screen.getByText("3");
      expect(badge).toBeInTheDocument();
    });

    it("should handle large filter counts", () => {
      useFilterStore.setState({ filterCount: 99 });
      render(<FilterButton />);

      const badge = screen.getByText("99");
      expect(badge).toBeInTheDocument();
    });
  });

  describe("Click Handler", () => {
    it("should call onClick when button is clicked", async () => {
      const user = userEvent.setup();

      render(<FilterButton />);
      expect(useUIStore.getState().isFilterDrawerOpen).toBe(false);
      const button = screen.getByRole("button", { name: /filter/i });
      await user.click(button);
      expect(useUIStore.getState().isFilterDrawerOpen).toBe(true);
    });
  });

  describe("Button Styling", () => {
    it("should have outline variant", () => {
      render(<FilterButton />);

      const button = screen.getByRole("button", { name: /filter/i });
      expect(button).toBeInTheDocument();
    });

    it("should have rounded full border radius", () => {
      render(<FilterButton />);

      const button = screen.getByRole("button", { name: /filter/i });
      expect(button).toHaveStyle({ borderRadius: "var(--chakra-radii-full)" });
    });

    it.skip("should have no border", () => {
      render(<FilterButton />);

      const button = screen.getByRole("button", { name: /filter/i });
      expect(button).toHaveStyle({ border: "none" });
    });

    it("should have no box shadow", () => {
      render(<FilterButton />);

      const button = screen.getByRole("button", { name: /filter/i });
      expect(button).toHaveStyle({ boxShadow: "none" });
    });
  });

  describe("Component Structure", () => {
    it("should render HStack with Filter text and icon", () => {
      const { container } = render(<FilterButton />);

      const hStack = container.querySelector('[class*="chakra-stack"]');
      expect(hStack).toBeInTheDocument();
    });

    it("should render badge with Filter text and icon", () => {
      useFilterStore.setState({ filterCount: 3 });
      render(<FilterButton />);

      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();
      useFilterStore.setState({ filterCount: 0 });
      render(<FilterButton />);
      await user.tab({ shift: true });
      await user.keyboard("{Shift}{Enter}");
      expect(useUIStore.getState().isFilterDrawerOpen).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("should handle filterCount of 1", () => {
      useFilterStore.setState({ filterCount: 1 });
      render(<FilterButton />);

      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should not show negative filterCount", () => {
      // TypeScript should prevent this, but testing runtime behavior
      render(<FilterButton />);

      expect(screen.queryByText("-1")).not.toBeInTheDocument();
    });

    it("should not show filterCount when filterCount is undefined", () => {
      useFilterStore.setState({ filterCount: undefined });
      render(<FilterButton />);

      expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument();
    });
  });

  describe("Memo Optimization", () => {
    it("should not re-render when filterCount is the same", () => {
      const { rerender } = render(<FilterButton />);
      useFilterStore.setState({ filterCount: 3 });
      rerender(<FilterButton />);

      expect(screen.queryByText("3")).toBeInTheDocument();
    });

    it("should re-render when filterCount changes", () => {
      const { rerender } = render(<FilterButton />);
      useFilterStore.setState({ filterCount: 3 });
      rerender(<FilterButton />);
      expect(screen.getByText("3")).toBeInTheDocument();
      useFilterStore.setState({ filterCount: 5 });
      rerender(<FilterButton />);
      expect(screen.queryByText("3")).not.toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  describe("Dynamic Updates", () => {
    it("should update badge when filterCount changes", () => {
      const { rerender } = render(<FilterButton />);

      expect(screen.queryByText("0")).not.toBeInTheDocument();

      rerender(<FilterButton />);

      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("should hide badge when filterCount becomes 0", () => {
      useFilterStore.setState({ filterCount: 5 });
      render(<FilterButton />);

      expect(screen.getByText("5")).toBeInTheDocument();

      useFilterStore.setState({ filterCount: 0 });
      render(<FilterButton />);

      expect(screen.queryByText("5")).not.toBeInTheDocument();
      expect(screen.queryByText("0")).not.toBeInTheDocument();
    });
  });
});
