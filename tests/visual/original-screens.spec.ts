import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { originalScreens, supplementalReferences } from './references';

const workspaceRoot = fileURLToPath(new URL('../../', import.meta.url));

for (const reference of originalScreens) {
  for (const prefix of ['', '/en']) {
  test(`${reference.key} ${prefix ? 'English' : 'Korean'} uses its original screen without visual rewriting`, async ({ page }, testInfo) => {
    const bytes = await readFile(`${workspaceRoot}public${reference.asset}`);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(reference.sha256);

    await page.goto(`${prefix}${reference.route}`);
    await page.evaluate(() => document.fonts.ready);

    const visual = page.locator(`[data-visual="${reference.key}"]`);
    const image = visual.locator('[data-original-screen]');
    await expect(visual).toHaveAttribute('data-fidelity', 'original');
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await image.evaluate((node: HTMLImageElement) => node.decode());
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
        renderedWidth: node.clientWidth,
        renderedHeight: node.clientHeight,
        inline: node.closest('.mdx-content, .content-section') !== null,
        ancestors,
      };
    });

    expect(rendering.complete).toBe(true);
    expect(rendering.naturalWidth).toBe(reference.width);
    expect(rendering.naturalHeight).toBe(reference.height);
    expect(rendering.objectFit).toBe('contain');
    expect(rendering.objectPosition).toBe('50% 50%');
    expect(rendering.inline).toBe(true);
    expect(Math.abs(rendering.renderedHeight - rendering.renderedWidth * reference.height / reference.width)).toBeLessThan(2);
    for (const ancestor of rendering.ancestors) {
      expect(ancestor.filter).toBe('none');
      expect(Number(ancestor.opacity)).toBe(1);
      expect(ancestor.transform).toBe('none');
    }

    await visual.screenshot({ path: testInfo.outputPath(`${reference.key}.png`) });
  });
  }
}

test('supplemental captures preserve source bytes and open at original size in both languages', async ({ page }) => {
  for (const reference of supplementalReferences) {
    const bytes = await readFile(`${workspaceRoot}public${reference.asset}`);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(reference.sha256);
    for (const prefix of ['', '/en']) {
      await page.goto(`${prefix}/projects/${reference.key}/`);
      const image = page.locator(`img[data-supplemental-screen][src="${reference.asset}"]`);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await image.evaluate((node: HTMLImageElement) => node.decode());
      await expect(image.locator('..')).toHaveAttribute('href', reference.asset);
      await expect(image.locator('..')).toHaveAttribute('target', '_blank');
      const rendered = await image.evaluate((node: HTMLImageElement) => ({
        width: node.naturalWidth, height: node.naturalHeight, fit: getComputedStyle(node).objectFit,
      }));
      expect(rendered).toEqual({ width: reference.width, height: reference.height, fit: 'contain' });
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
      expect(await image.evaluate((node) => node.closest('.mdx-content, .content-section') !== null)).toBe(true);
      expect(await image.evaluate((node) => node.closest('#trace') === null)).toBe(true);
    }
  }
});

test('home shows small project icons in both work lists', async ({ page }) => {
  await page.goto('/');
  const icons = page.locator('#projects .project-icon:visible');
  await expect(icons).toHaveCount(19);
  await expect(icons.nth(0)).toHaveAttribute('src', '/projects/design-system/favicon.png');
  await expect(icons.nth(1)).toHaveAttribute('src', '/projects/notiiv/favicon.svg');
  for (const icon of await icons.all()) {
    await icon.scrollIntoViewIfNeeded();
    await expect(icon).toBeVisible();
    await icon.evaluate((image: HTMLImageElement) => image.decode());
    await expect(icon).toHaveCSS('width', '24px');
    await expect(icon).toHaveCSS('height', '24px');
    expect(await icon.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(icon).toHaveAttribute('alt', '');
  }
  const profile = page.locator('#hero .hero-heading .profile-avatar');
  await expect(profile).toHaveAttribute('alt', /프로필 사진$/);
  await expect(page.locator('#hero a[href="https://github.com/qtaghdi"]')).toHaveCount(1);
  await expect(page.locator('#more-work .project-icon:visible')).toHaveCount(7);
  await expect(page.locator('.featured-list .project-icon').nth(2)).toHaveAttribute('src', '/projects/document-workspace/favicon.svg');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('home uses project branding and Foloom uses its favicon beside the title in both languages', async ({ page }) => {
  for (const prefix of ['', '/en']) {
    await page.goto(`${prefix}/`);
    await expect(page.locator('#projects a[href$="/interaction-inspector"]')).toBeVisible();
    await expect(page.locator('#projects [data-home-screen], #projects [data-project-diagram]')).toHaveCount(0);
    const foloom = page.locator('.featured-project').filter({ has: page.getByRole('heading', { name: 'Foloom' }) });
    await expect(foloom.locator('.project-icon')).toHaveAttribute('src', '/projects/document-workspace/favicon.svg');
    const favicon = foloom.locator('.project-title .project-icon');
    await expect(foloom.locator('img')).toHaveCount(1);
    await favicon.evaluate((image: HTMLImageElement) => image.decode());

    await expect(page.locator('.featured-project')).toHaveCount(4);
    const oddmash = page.locator('#oddmash');
    await expect(oddmash.getByRole('heading', { name: 'Oddmash', exact: true })).toBeVisible();
    const agents = oddmash.getByRole('link', { name: /Oddmash Agents/ });
    await expect(agents).toHaveAttribute('href', 'https://github.com/Oddmash/oddmash-agents/blob/main/docs/public-onboarding.md');
    await expect(agents.locator('img')).toHaveAttribute('src', '/projects/oddmash/lead.svg');
    await expect(agents.locator('.usage')).toContainText(prefix ? 'enrolled Oddmash repository' : '리뷰가 설정된 Oddmash 저장소');
    const skills = oddmash.getByRole('link', { name: /Oddmash Skills/ });
    await expect(skills).toHaveAttribute('href', 'https://github.com/Oddmash/oddmash-skills');
    await expect(skills.locator('img')).toHaveAttribute('src', '/projects/oddmash/mark.png');
    await expect(skills.locator('.usage')).toContainText(prefix ? 'visual media skill' : '시각 자료 스킬');
    const boundra = oddmash.locator(`a[href="${prefix}/projects/boundra"]`);
    await expect(boundra.locator('img')).toHaveAttribute('src', '/projects/boundra/icon.svg');
    await expect(page.locator('#more-work a[href$="/projects/boundra"], #more-work a[href$="/projects/juliya"], #more-work a[href$="/projects/interaction-inspector"]')).toHaveCount(0);
    const juliya = oddmash.locator(`a[href="${prefix}/projects/juliya"]`);
    const juliyaIcon = juliya.locator('strong > img.project-icon');
    await expect(juliya.locator('img')).toHaveCount(1);
    await expect(juliyaIcon).toHaveAttribute('src', '/projects/juliya/favicon.svg');
    await juliyaIcon.scrollIntoViewIfNeeded();
    await juliyaIcon.evaluate((image: HTMLImageElement) => image.decode());
    await expect(page.locator('#writing').getByRole('link', { name: prefix ? 'Yeobaek ↗' : '여백 ↗' })).toHaveAttribute('href', 'https://qtaghdi.github.io/yeobaek/');

    const archive = page.locator('#more-work details');
    const disclosure = archive.locator('summary');
    const echo = archive.getByRole('link', { name: /Echo/, includeHidden: true });
    const chorus = archive.getByRole('link', { name: /Chorus/, includeHidden: true });
    await expect(echo).toBeHidden();
    await expect(chorus).toBeHidden();
    await disclosure.focus();
    await disclosure.press('Enter');
    await expect(echo).toBeVisible();
    await expect(chorus).toBeVisible();
    await expect(echo).toHaveAttribute('href', `${prefix}/projects/echo`);
    await expect(chorus).toHaveAttribute('href', `${prefix}/projects/chorus`);

    await juliya.click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Juliya');
    await expect(page.locator('.project-hero img')).toHaveCount(1);
    await expect(page.locator('.project-hero .case-logo')).toHaveAttribute('src', '/projects/juliya/favicon.svg');
    await expect(page.locator('#trace a[href$="/v0.4.3"]')).toBeVisible();
  }
});

test('work, contents and language links retain navigation', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('link', { name: '작업 보기', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await page.getByRole('link', { name: 'Bigtablet Design System 자세히 보기', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bigtablet Design System');
  await page.getByRole('navigation', { name: '목차', exact: true }).getByRole('link', { name: '컴포넌트 배포와 모션 구조 개선', exact: true }).click();
  await expect(page.locator('h2[id="컴포넌트-배포와-모션-구조-개선"]')).toBeInViewport();
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: '메뉴 열기' }).click();
    await expect(page.getByRole('button', { name: '메뉴 열기' })).toHaveAttribute('aria-expanded', 'true');
  }
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/projects\/design-system\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bigtablet Design System');
  await expect(page.getByRole('link', { name: 'Per-component distribution commit' })).toBeVisible();
});

test('layouts stay within narrow and desktop viewports', async ({ page }, testInfo) => {
  const widths = testInfo.project.name === 'mobile' ? [320, 375, 390] : [1440, 1505];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1045 });
    for (const route of ['/', '/en/', '/projects/design-system/', '/en/projects/document-workspace/']) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
    }
  }
});

test('text contents follow the article and highlight the current section', async ({ page }, testInfo) => {
  for (const prefix of ['', '/en']) {
    await page.goto(`${prefix}/projects/owkr/`);
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    const rail = page.locator('.section-rail');
    const links = rail.locator('a');
    await expect(rail).toHaveCSS('position', 'sticky');
    await expect(rail.locator('i')).toHaveCount(0);
    const next = links.nth(1);
    await next.click();
    await expect(next).toHaveAttribute('aria-current', 'location');
    await expect(rail.locator('[aria-current]')).toHaveCount(1);
    await page.evaluate(() => window.scrollBy(0, 240));
    await expect.poll(() => rail.evaluate((node) => Math.round(node.getBoundingClientRect().top))).toBe(testInfo.project.name === 'mobile' ? 68 : 108);
    const later = links.nth(2);
    const id = decodeURIComponent((await later.getAttribute('href'))!.slice(1));
    await page.evaluate((id) => {
      const node = document.getElementById(id)!;
      window.scrollBy(0, node.getBoundingClientRect().top - 100);
    }, id);
    await expect(later).toHaveAttribute('aria-current', 'location');
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(links.last()).toHaveAttribute('aria-current', 'location');
    const bounds = await rail.evaluate((node) => ({ rail: node.getBoundingClientRect().bottom, container: node.closest('.case-layout')!.getBoundingClientRect().bottom }));
    expect(bounds.rail).toBeLessThanOrEqual(bounds.container + 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  }
});

test('every project detail has a working product capture or logo in Korean and English', async ({ page }) => {
  await page.goto('/');
  const routes = await page.locator('#projects a[href*="/projects/"]').evaluateAll((links) => [...new Set(links.map((link) => new URL((link as HTMLAnchorElement).href).pathname))]);
  expect(routes).toHaveLength(16);
  for (const prefix of ['', '/en']) {
    for (const route of routes) {
      const response = await page.goto(`${prefix}${route}`);
      expect(response?.status(), `${prefix}${route}`).toBe(200);
      await expect(page.locator('[data-project-diagram]')).toHaveCount(0);
      const images = page.locator('[data-original-screen], .case-logo');
      expect(await images.count(), `${prefix}${route} has no project image`).toBeGreaterThan(0);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((node: HTMLImageElement) => node.decode());
        expect(await image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    }
  }
});

test('intranet shows the localized approval capture after notification routing', async ({ page }) => {
  for (const { prefix, asset, dimensions, heading } of [
    { prefix: '', asset: 'approval.png', dimensions: [1320, 2868], heading: /Notification Routing/ },
    { prefix: '/en', asset: 'approval-en.png', dimensions: [2752, 2064], heading: /Route notifications/ },
  ]) {
    await page.goto(`${prefix}/projects/intranet/`);
    const capture = page.locator('[data-case-image="intranet/approval"]');
    await expect(capture).toHaveCount(1);
    const image = capture.locator('img');
    const src = `/projects/intranet/${asset}`;
    await expect(image).toHaveAttribute('src', src);
    await expect(image.locator('..')).toHaveAttribute('href', src);
    await image.scrollIntoViewIfNeeded();
    const rendered = await image.evaluate(async (node: HTMLImageElement) => {
      await node.decode();
      return [node.naturalWidth, node.naturalHeight];
    });
    expect(rendered).toEqual(dimensions);

    const sectionHeading = await capture.evaluate((figure) => {
      let sibling = figure.previousElementSibling;
      while (sibling && sibling.tagName !== 'H3') sibling = sibling.previousElementSibling;
      return sibling?.textContent;
    });
    expect(sectionHeading).toMatch(heading);
  }
});

test('each featured project has one link covering the card', async ({ page }) => {
  for (const prefix of ['', '/en']) {
    await page.goto(`${prefix}/`);
    const card = page.locator('.featured-project').first();
    const link = card.getByRole('link');
    await expect(link).toHaveCount(1);
    await link.focus();
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS('outline-style', 'solid');
    await link.click({ position: { x: 6, y: 6 } });
    await expect(page).toHaveURL(new RegExp(`${prefix}/projects/design-system/?$`));
  }
});
