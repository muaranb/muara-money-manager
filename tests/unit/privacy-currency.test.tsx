import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TabularCurrency } from "@/components/ui/tabular-currency";
import { PrivacyToggle } from "@/components/ui/privacy-toggle";
import { usePrivacyStore } from "@/store/use-privacy-store";

describe("Privacy Mode & TabularCurrency Masking", () => {
  beforeEach(() => {
    // Reset to default
    usePrivacyStore.setState({ isBalanceHidden: true });
  });

  it("defaults to isBalanceHidden = true (hidden nominal on fresh load)", () => {
    expect(usePrivacyStore.getState().isBalanceHidden).toBe(true);
  });

  it("toggles privacy state correctly", () => {
    const { toggleBalanceVisibility } = usePrivacyStore.getState();
    toggleBalanceVisibility();
    expect(usePrivacyStore.getState().isBalanceHidden).toBe(false);

    toggleBalanceVisibility();
    expect(usePrivacyStore.getState().isBalanceHidden).toBe(true);
  });

  it("renders masked bullets when isMasked is true", () => {
    const { container } = render(<TabularCurrency cents={125000000} isMasked={true} />);
    expect(container.textContent).toContain("Rp");
    expect(container.textContent).toContain("••••••••");
    expect(container.textContent).not.toContain("1.250.000");
  });

  it("renders full currency values when isMasked is false", () => {
    const { container } = render(<TabularCurrency cents={125000000} isMasked={false} />);
    expect(container.textContent).toContain("Rp");
    expect(container.textContent).toContain("1.250.000");
    expect(container.textContent).not.toContain("••••••••");
  });

  it("PrivacyToggle updates store when clicked", () => {
    render(<PrivacyToggle />);
    const toggleBtn = screen.getByRole("button", { name: /nominal/i });
    expect(toggleBtn).toBeDefined();

    expect(usePrivacyStore.getState().isBalanceHidden).toBe(true);
    fireEvent.click(toggleBtn);
    expect(usePrivacyStore.getState().isBalanceHidden).toBe(false);
  });
});
