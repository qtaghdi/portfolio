import { createServer } from 'node:http';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const baseColor = '#18181b';
const accent = '#2454d6';
const escape = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

async function build() {
  await new Promise((resolveBuild, reject) => {
    const child = spawn('pnpm', ['build'], { cwd: root, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => code === 0 ? resolveBuild() : reject(new Error(`Build failed (${code})`)));
  });
}

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.name === 'index.html') files.push(path);
  }
  return files;
}

function cardHtml(data, origin) {
  const ko = data.locale === 'ko';
  const heading = data.home ? (ko ? '박상민' : 'Park Sangmin.') : data.title;
  const subtitle = data.home ? (ko ? '제품 화면과 공통 UI를 만듭니다.' : 'Product interfaces and shared UI.') : data.subtitle;
  const label = data.home ? (ko ? '프론트엔드 개발자' : 'FRONTEND ENGINEER') : data.group;
  const footer = data.home ? 'Web Services · Design Systems · Developer Tools' : data.tech;
  return `<!doctype html><html lang="${data.locale}"><head><meta charset="utf-8"><style>
    @font-face{font-family:Pretendard;src:url('${origin}/fonts/Pretendard-Regular.woff2');font-weight:400}
    @font-face{font-family:Pretendard;src:url('${origin}/fonts/Pretendard-Medium.woff2');font-weight:500}
    @font-face{font-family:Pretendard;src:url('${origin}/fonts/Pretendard-SemiBold.woff2');font-weight:600}
    *{box-sizing:border-box}body{margin:0;background:#fff;color:${baseColor};font-family:Pretendard,sans-serif;-webkit-font-smoothing:antialiased}
    main{width:1200px;height:630px;padding:44px 64px 36px;display:flex;flex-direction:column}
    header{display:flex;align-items:center;justify-content:space-between;padding-bottom:24px;border-bottom:1px solid #e4e4e7;font-size:18px;line-height:1.4}
    .name{font-weight:600;letter-spacing:.035em}.edition{color:#71717a;font-size:15px;letter-spacing:.08em}
    article{flex:1;display:flex;flex-direction:column;justify-content:center;padding:24px 0 30px}
    .label{margin:0 0 18px;color:${accent};font-size:21px;font-weight:500;line-height:1.5;letter-spacing:.02em}
    h1{margin:0;font-size:${data.home ? '86' : '64'}px;font-weight:600;line-height:1.17;letter-spacing:-.045em;word-break:keep-all;overflow-wrap:anywhere}
    .subtitle{margin:22px 0 0;max-width:1030px;color:#52525b;font-size:${data.home ? '32' : '27'}px;line-height:1.5;letter-spacing:-.025em;word-break:keep-all}
    footer{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-top:24px;border-top:1px solid #e4e4e7;font-size:17px;line-height:1.5}
    .topics{color:#71717a;max-width:740px}.domain{color:${accent};white-space:nowrap;font-weight:500}
  </style></head><body><main><header><span class="name">PARK SANGMIN</span><span class="edition">${data.home ? 'PORTFOLIO' : 'SELECTED WORK'}</span></header><article><p class="label">${escape(label)}</p><h1>${escape(heading)}</h1><p class="subtitle">${escape(subtitle)}</p></article><footer><span class="topics">${escape(footer)}</span><span class="domain">park-sangmin.vercel.app</span></footer></main></body></html>`;
}

await build();
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1');
    let path = resolve(dist, '.' + decodeURIComponent(url.pathname));
    if (path !== dist && !path.startsWith(dist + sep)) throw new Error('Invalid path');
    if (!extname(path)) path = join(path, 'index.html');
    const mime = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.css': 'text/css', '.js': 'text/javascript' };
    const bytes = await readFile(path);
    response.writeHead(200, { 'Content-Type': mime[extname(path)] ?? 'application/octet-stream' });
    response.end(bytes);
  } catch {
    response.writeHead(404); response.end('Not found');
  }
});
await new Promise((ready) => server.listen(0, '127.0.0.1', ready));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const card = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const files = await htmlFiles(dist);
  let count = 0;
  for (const file of files) {
    const route = '/' + file.slice(dist.length + 1).replace(/index\.html$/, '');
    await page.goto(origin + route);
    const data = await page.evaluate(() => ({
      locale: document.documentElement.lang,
      home: !document.querySelector('.project-hero'),
      title: document.querySelector('h1').textContent,
      subtitle: document.querySelector('.thesis')?.textContent ?? document.querySelector('meta[name="description"]').content,
      group: document.querySelector('.project-meta dd')?.textContent ?? '',
      tech: document.querySelector('.project-meta > div:last-child dd')?.textContent.split(', ').slice(0, 5).join(' · ') ?? '',
      image: new URL(document.querySelector('meta[property="og:image"]').content).pathname,
    }));
    if (!data.image.startsWith('/social/v1/')) throw new Error(`Unexpected social image: ${data.image}`);
    await card.setContent(cardHtml(data, origin));
    await card.evaluate(() => document.fonts.ready);
    const clipped = await card.evaluate(() => {
      const article = document.querySelector('article').getBoundingClientRect();
      const footer = document.querySelector('footer').getBoundingClientRect();
      return document.documentElement.scrollHeight > 630 || article.bottom > footer.top + 1 || [...document.querySelectorAll('h1,.subtitle')].some((node) => node.scrollWidth > node.clientWidth);
    });
    if (clipped) throw new Error(`Social card overflows: ${route}`);
    const output = join(root, 'public', data.image);
    await mkdir(dirname(output), { recursive: true });
    await card.screenshot({ path: output });
    count++;
  }

  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto(origin + '/');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.profile-avatar').evaluate((image) => image.decode());
  const height = await page.locator('.featured-list').evaluate((node) => Math.ceil(node.getBoundingClientRect().bottom + 48));
  await page.setViewportSize({ width: 1440, height });
  await page.locator('.featured-list img').evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
  const readmeImage = join(root, 'docs/images/portfolio-preview.png');
  await mkdir(dirname(readmeImage), { recursive: true });
  await page.screenshot({ path: readmeImage });
  console.log(`Generated ${count} social cards (1200 x 630) and the current README preview.`);
} finally {
  await browser?.close();
  await new Promise((done) => server.close(done));
}
await build();
