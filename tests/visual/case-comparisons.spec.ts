import { expect, test } from '@playwright/test';
import { caseVisuals } from '../../src/data/case-visuals';

const scenes: Record<string, string[]> = {
  'design-system': ['design-system'],
  notiiv: ['notiiv'],
  'document-workspace': ['foloom-revision', 'foloom-save'],
  'oddmash-agents': ['agents-review', 'agents-ci'],
  boundra: ['boundra-import'],
  owkr: ['owkr'],
  intranet: ['intranet'],
  'apple-music-discord-presence': ['apple-music-discord-presence'],
  jeomjuro: ['jeomjuro'],
  kivra: ['kivra'],
  homepage: ['homepage'],
  echo: ['echo'],
};

for (const key of Object.keys(caseVisuals)) {
  for (const locale of ['ko', 'en'] as const) {
    test(`${key} ${locale} uses intentional technical visuals without redundant cards`, async ({ page }, testInfo) => {
      const response = await page.goto(`${locale === 'en' ? '/en' : ''}/projects/${key}/`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('[data-case-comparison]')).toHaveCount(0);
      const figures = page.locator('[data-mechanism]');
      const expected = scenes[key] ?? [];
      await expect(figures).toHaveCount(expected.length);
      for (const [index, id] of expected.entries()) {
        const figure = figures.nth(index);
        await expect(figure).toHaveAttribute('data-mechanism', id);
        await expect(figure).toHaveAttribute('data-fidelity', 'explanation');
        await expect(figure.locator('figcaption')).not.toBeEmpty();
        await expect(figure.locator('h1,h2,h3,h4,h5,h6')).toHaveCount(0);
        await figure.scrollIntoViewIfNeeded();
        await expect(figure).toBeVisible();
        await figure.screenshot({ path: testInfo.outputPath(`${id}-${locale}.png`) });
      }
      await page.setViewportSize({ width: 320, height: 800 });
      for (const figure of await figures.all()) {
        expect(await figure.evaluate(node => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);
        for (const cell of await figure.locator('.node, th, td, .boundary-box, .advice').all()) {
          expect(await cell.evaluate(node => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    });
  }
}

for (const prefix of ['', '/en']) {
  test(`Juliya ${prefix || 'ko'} runs actual core with a native comparison`, async ({ page }, testInfo) => {
    await page.goto(`${prefix}/projects/juliya/`);
    const demo = page.locator('[data-juliya-demo]');
    await expect(demo).toBeVisible();
    const slider = demo.locator('input[type=range]');
    const example = demo.locator('select');
    await expect(slider).toBeVisible();
    await expect(demo).toHaveAttribute('data-result', /equal|different/);
    await expect(demo.locator('[data-enhanced] span').first()).toBeVisible();
    await expect(demo.locator('[data-enhanced] span').first()).toHaveCSS('display', 'block');
    await example.selectOption('short');
    await expect(demo).toHaveAttribute('data-result', 'equal');
    await slider.focus();
    await expect(slider).toBeFocused();
    await slider.press('Home');
    const initial = Number(await slider.inputValue());
    await slider.press('ArrowRight');
    const next = Number(await slider.inputValue());
    expect(next).toBeGreaterThan(initial);
    await expect(demo.locator('[data-width-label]')).toHaveText(next + 'px');
    for (const sample of await demo.locator('.wrap-sample').all()) {
      await expect(sample).toHaveCSS('width', next + 'px');
    }
    await example.selectOption('long');
    const longText = (await demo.getAttribute('data-long'))!;
    await expect(demo.locator('[data-native]')).toHaveText(longText);
    await expect.poll(async () => (await demo.locator('[data-enhanced]').textContent())?.replace(/\s+/g, ' ').trim()).toBe(longText);
    for (const line of await demo.locator('[data-enhanced] span').all()) await expect(line).toHaveCSS('display', 'block');
    await page.setViewportSize({ width: 320, height: 800 });
    await expect(demo.locator('[data-native]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    await demo.screenshot({ path: testInfo.outputPath('juliya-demo.png') });
  });
}
