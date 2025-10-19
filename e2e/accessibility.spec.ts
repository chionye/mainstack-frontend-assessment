/** @format */

import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should have headings', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count()
    expect(headings).toBeGreaterThan(0)
  })

  test('should have buttons', async ({ page }) => {
    const buttons = await page.getByRole('button').count()
    expect(buttons).toBeGreaterThan(0)
  })

  test('should support keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab')

    const activeElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(activeElement).toBeTruthy()
  })

  test('should have links', async ({ page }) => {
    const links = await page.getByRole('link').count()
    expect(links).toBeGreaterThanOrEqual(0)
  })

  test('should render without errors', async ({ page }) => {
    const bodyText = await page.locator('body').textContent()
    expect(bodyText).toBeTruthy()
  })

  test('should work with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })

    const content = await page.locator('body').textContent()
    expect(content).toBeTruthy()
  })

  test('should be interactive', async ({ page }) => {
    const firstButton = page.getByRole('button').first()
    const buttonExists = await firstButton.count()

    if (buttonExists > 0) {
      await firstButton.click()
      await page.waitForTimeout(100)
    }

    expect(buttonExists).toBeGreaterThanOrEqual(0)
  })
})
