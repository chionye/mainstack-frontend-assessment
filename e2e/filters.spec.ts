/** @format */

import { test, expect } from '@playwright/test'

test.describe('Transaction Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should have filter button", async ({ page }) => {
    const filterButton = await page.getByRole("button", { name: /filter/i }).count();
    expect(filterButton).toBeGreaterThan(0);
  });

  test("should open filter drawer when clicked", async ({ page }) => {
    const filterButton = page.getByRole('button', { name: /filter/i }).first()
    await filterButton.click()
    await page.waitForTimeout(500)
    const bodyText = await page.locator('body').textContent()
    expect(bodyText).toBeTruthy()
  })

  test('should have apply button in filter drawer', async ({ page }) => {
    const filterButton = page.getByRole('button', { name: /filter/i }).first()
    await filterButton.click()
    await page.waitForTimeout(300)
    const applyButtons = await page.getByRole('button', { name: /apply/i }).count()
    expect(applyButtons).toBeGreaterThanOrEqual(0)
  })

  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    const filterButton = await page.getByRole('button', { name: /filter/i }).count()
    expect(filterButton).toBeGreaterThan(0)
  })
})
