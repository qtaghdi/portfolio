import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { declaredReconstructions, originalScreens } from './references';

const workspaceRoot = fileURLToPath(new URL('../../', import.meta.url));

for (const reference of originalScreens) {
  test(`${reference.key} uses its original screen without visual rewriting`, async ({ page }, testInfo) => {
    const bytes = await readFile(`${workspaceRoot}public${reference.asset}`);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(reference.sha256);

    await page.goto(reference.route);
    await page.evaluate(() => document.fonts.ready);

    const visual = page.locator(`[data-visual="${reference.key}"]`);
    const image = visual.locator('[data-original-screen]');
    await expect(visual).toHaveAttribute('data-fidelity', 'original');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', reference.asset);

    const rendering = await image.evaluate((node: HTMLImageElement) => {
      const style = getComputedStyle(node);
      const ancestors: Array<{ filter: string; opacity: string; transform: string }> = [];
      let current: HTMLElement | null = node;
      while (current) {
        const currentStyle = getComputedStyle(current);
        ancestors.push({
          filter: currentStyle.filter,
          opacity: currentStyle.opacity,
          transform: currentStyle.transform,
        });
        if (current.hasAttribute('data-visual')) break;
        current = current.parentElement;
      }
      return {
        complete: node.complete,
        naturalWidth: node.naturalWidth,
        naturalHeight: node.naturalHeight,
        objectFit: style.objectFit,
        objectPosition: style.objectPosition,
        ancestors,
      };
    });

    expect(rendering.complete).toBe(true);
    expect(rendering.naturalWidth).toBe(reference.width);
    expect(rendering.naturalHeight).toBe(reference.height);
    expect(rendering.objectFit).toBe('contain');
    expect(rendering.objectPosition).toBe('50% 50%');
    for (const ancestor of rendering.ancestors) {
      expect(ancestor.filter).toBe('none');
      expect(Number(ancestor.opacity)).toBe(1);
      expect(ancestor.transform).toBe('none');
    }

    await visual.screenshot({ path: testInfo.outputPath(`${reference.key}.png`) });
  });
}

for (const reference of declaredReconstructions) {
  test(`${reference.key} is explicitly marked as a reconstruction`, async ({ page }) => {
    await page.goto(reference.route);
    const visual = page.locator(`[data-visual="${reference.key}"]`);
    await expect(visual).toHaveAttribute('data-fidelity', 'reconstruction');
    await expect(visual.locator('[data-original-screen]')).toHaveCount(0);
  });
}

test('home page keeps every original screen uncropped and free of visual filters', async ({ page }) => {
  await page.goto('/');
  for (const reference of originalScreens) {
    const visual = page.locator(`[data-visual="${reference.key}"]`);
    await visual.scrollIntoViewIfNeeded();
    const image = visual.locator('[data-original-screen]');
    await expect(image).toBeVisible();
    await expect(image).toHaveCSS('object-fit', 'contain');
    await expect(image).toHaveCSS('filter', 'none');
    await expect(image).toHaveCSS('transform', 'none');
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
