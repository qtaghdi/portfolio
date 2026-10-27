import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const meta = (html, key) => html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`))?.[1];
async function pages(directory) {
  const found = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) found.push(...await pages(path));
    else if (item.name === 'index.html') found.push(path);
  }
  return found;
}

test('every page has a matching, readable localized sharing image', async () => {
  const files = await pages(dist);
  assert.ok(files.length > 2);
  const images = new Set();
  for (const path of files) {
    const html = await readFile(path, 'utf8');
    const image = meta(html, 'og:image');
    const url = new URL(image);
    const english = /<html\b[^>]*\blang="en"/.test(html);
    assert.equal(url.origin, 'https://park-sangmin.vercel.app', path);
    assert.ok(url.pathname.startsWith(`/social/v1/${english ? 'en' : 'ko'}/`), path);
    assert.equal(meta(html, 'og:image:secure_url'), image, path);
    assert.equal(meta(html, 'twitter:image'), image, path);
    assert.equal(meta(html, 'og:title'), meta(html, 'twitter:title'), path);
    assert.ok(meta(html, 'og:description'), path);
    assert.ok(meta(html, 'og:image:alt'), path);
    assert.equal(meta(html, 'og:image:alt'), meta(html, 'twitter:image:alt'), path);
    assert.equal(meta(html, 'og:locale'), english ? 'en_US' : 'ko_KR', path);
    assert.equal(meta(html, 'twitter:card'), 'summary_large_image', path);
    const png = await readFile(join(dist, url.pathname));
    assert.equal(png.subarray(1, 4).toString(), 'PNG', path);
    assert.equal(png.readUInt32BE(16), 1200, path);
    assert.equal(png.readUInt32BE(20), 630, path);
    images.add(image);
  }
  assert.equal(images.size, files.length, 'Project and language cards must be distinct');
});
