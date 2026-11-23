import { expect, test } from '@playwright/test';

const targets = '[data-kowrap]';
const routes = ['/', '/projects/design-system/'];

test('Korean wrapping preserves text, fits the viewport, and responds to resizing', async ({ page, browser }, testInfo) => {
  test.setTimeout(120_000);
  const fallback = await browser.newPage({ javaScriptEnabled: false });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.text().includes('Kowrap enhancement unavailable')) errors.push(message.text());
  });

  const comparisons: { route: string; width: number; css: number[]; kowrap: number[]; insertedBreaks: number }[] = [];
  try {
    for (const route of routes) {
      await page.goto(route);
      await fallback.goto(new URL(route, page.url()).href);
      const original = await fallback.locator(targets).allTextContents();
      expect(original.length).toBeGreaterThan(0);
      const elements = page.locator(targets);
      await expect(page.locator('[data-kowrap-mounted]')).toHaveCount(original.length);

      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await fallback.setViewportSize({ width, height: 900 });
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        });
        await fallback.evaluate(() => document.fonts.ready.then(() => undefined));
        await expect.poll(async () => elements.evaluateAll((nodes) => nodes.every((node) => node.scrollWidth <= node.clientWidth + 1))).toBe(true);
        expect(await elements.allTextContents()).toEqual(original);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
        comparisons.push({
          route, width,
          css: await fallback.locator(targets).evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height)),
          kowrap: await elements.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height)),
          insertedBreaks: await page.locator('[data-kowrap-break]').count(),
        });
        await page.screenshot({ path: testInfo.outputPath(`kowrap-${route === '/' ? 'home' : 'case'}-${width}.png`), fullPage: true, animations: 'disabled' });
        await fallback.screenshot({ path: testInfo.outputPath(`css-${route === '/' ? 'home' : 'case'}-${width}.png`), fullPage: true, animations: 'disabled' });
      }
    }
    expect(errors).toEqual([]);
    expect(comparisons.some((sample) => sample.insertedBreaks > 0)).toBe(true);
    await testInfo.attach('kowrap-comparison', { body: JSON.stringify(comparisons, null, 2), contentType: 'application/json' });
  } finally {
    await fallback.close();
  }
});

test('English pages do not mount Kowrap', async ({ page }) => {
  for (const route of routes) {
    await page.goto(`/en${route}`);
    await expect(page.locator(targets)).toHaveCount(0);
    await expect(page.locator('[data-kowrap-mounted]')).toHaveCount(0);
  }
});
