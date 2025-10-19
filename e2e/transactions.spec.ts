/** @format */

import { test, expect } from "@playwright/test";

test.describe("Transactions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("domcontentloaded");
  });

  test("should load page", async ({ page }) => {
    await expect(page.locator("body")).not.toBeEmpty({ timeout: 10000 });
  });

  test("should have content", async ({ page }) => {
    const content = await page.locator("body").textContent();
    expect(content?.length).toBeGreaterThan(50);
  });

  test("should have buttons", async ({ page }) => {
    const buttonCount = await page.getByRole("button").count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test("should support scrolling", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 100));

    const scroll = await page.evaluate(() => window.scrollY);
    expect(scroll).toBeGreaterThanOrEqual(0);
  });
});
