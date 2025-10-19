/** @format */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { useActionsStore } from "../../store/useActionsStore";

describe("useActionsStore", () => {
  beforeEach(() => {
    useActionsStore.setState({
      handleWithdraw: () => {},
      handleExport: () => {},
      handleRetry: () => {},
    });
  });

  it("should set the handleWithdraw handler", () => {
    useActionsStore.getState().setWithdrawHandler(() => {});
    expect(useActionsStore.getState().handleWithdraw).toBeDefined();
  });

  it("should set the handleExport handler", () => {
    useActionsStore.getState().setExportHandler(() => {});
    expect(useActionsStore.getState().handleExport).toBeDefined();
  });

  it("should set the handleRetry handler", () => {
    useActionsStore.getState().setRetryHandler(() => {});
    expect(useActionsStore.getState().handleRetry).toBeDefined();
  });

  it("should call the handleWithdraw handler", () => {
    const mockHandler = vi.fn();
    useActionsStore.getState().setWithdrawHandler(mockHandler);
    useActionsStore.getState().handleWithdraw();
    expect(mockHandler).toHaveBeenCalled();
  });

  it("should call the handleExport handler", () => {
    const mockHandler = vi.fn();
    useActionsStore.getState().setExportHandler(mockHandler);
    useActionsStore.getState().handleExport();
    expect(mockHandler).toHaveBeenCalled();
  });

  it("should call the handleRetry handler", () => {
    const mockHandler = vi.fn();
    useActionsStore.getState().setRetryHandler(mockHandler);
    useActionsStore.getState().handleRetry();
    expect(mockHandler).toHaveBeenCalled();
  });
});
