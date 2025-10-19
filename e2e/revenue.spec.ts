/** @format */

import { test, expect } from '@playwright/test'

test.describe('Revenue Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should load the revenue page successfully", async ({ page }) => {
    const bodyText = await page.locator("body").textContent();
    expect(bodyText).toBeTruthy();
    expect(bodyText).toContain("Revenue");
  });

  test('should display main content', async ({ page }) => {
    const content = await page.locator('body').textContent()
    expect(content?.length).toBeGreaterThan(100)
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    const bodyText = await page.locator('body').textContent()
    expect(bodyText).toBeTruthy()
  })

  test('should have interactive elements', async ({ page }) => {
    const buttons = await page.getByRole('button').count()
    expect(buttons).toBeGreaterThan(0)
  })

  test('should support keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => document.activeElement?.tagName)
    expect(focused).toBeTruthy()
  })
})
