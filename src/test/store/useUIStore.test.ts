/** @format */

import { describe, it, expect, beforeEach } from "vitest";
import { useUIStore } from "../../store/useUIStore";

describe("useUIStore", () => {
  beforeEach(() => {
    useUIStore.setState({
      isFilterDrawerOpen: false,
      amountFontSize: "16px",
    });
  });

  it("should set the isFilterDrawerOpen state", () => {
    useUIStore.getState().openFilterDrawer();
    expect(useUIStore.getState().isFilterDrawerOpen).toBe(true);
  });

  it("should set the openFilterDrawer state", () => {
    useUIStore.getState().openFilterDrawer();
    expect(useUIStore.getState().isFilterDrawerOpen).toBe(true);
  });

  it("should set the closeFilterDrawer state", () => {
    useUIStore.getState().closeFilterDrawer();
    expect(useUIStore.getState().isFilterDrawerOpen).toBe(false);
  });

  it("should set the setAmountFontSize state", () => {
    useUIStore.getState().setAmountFontSize("20px");
    expect(useUIStore.getState().amountFontSize).toBe("20px");
  });
});
