import { expect, test } from '@playwright/test';
import { caseVisuals } from '../../src/data/case-visuals';

for (const [key, visual] of Object.entries(caseVisuals)) {
  for (const locale of ['ko', 'en'] as const) {
    test(`${key} ${locale} has a localized explanatory comparison`, async ({ page }) => {
      await page.goto(`${locale === 'en' ? '/en' : ''}/projects/${key}/`);
      const comparison = page.locator(`[data-case-comparison="${key}"]`);
      await expect(comparison).toHaveCount(1);
      await expect(comparison).toHaveAttribute('data-fidelity', 'explanation');
      await expect(comparison.getByText(visual[locale][0], { exact: true })).toBeVisible();
      await expect(comparison.getByText(visual[locale][5], { exact: true })).toBeVisible();
      await expect(comparison.locator('.comparison-panel')).toHaveCount(2);
      await page.setViewportSize({ width: 320, height: 800 });
      await expect(comparison).toBeVisible();
      expect(await comparison.evaluate((node) => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    });
  }
}
