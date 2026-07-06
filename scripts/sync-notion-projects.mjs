import fs from 'node:fs/promises';
import path from 'node:path';

const projectDir = path.resolve(process.cwd(), 'src/content/projects');

const knownProjectMeta = [
  {
    aliases: ['notiiv', '노티브', 'insight', '인사이트', 'bigtablet insight 플랫폼'],
    fileName: '01-notiiv.mdx',
    title: 'Notiiv',
    titleKo: 'Notiiv',
    category: 'Company · Production',
    accentColor: 'accent',
    order: 1,
  },
  {
    aliases: ['bigtablet 사내 디자인 시스템', '디자인 시스템', '사내 디자인 시스템'],
    fileName: '02-design-system.mdx',
    title: 'Bigtablet Design System',
    titleKo: '사내 디자인 시스템',
    category: 'Company · Open Source · NPM',
    accentColor: 'amber',
    order: 2,
  },
  {
    aliases: ['bigtablet 공식 홈페이지', '홈페이지', '공식 홈페이지', '공식 홈페이지 리뉴얼'],
    fileName: '03-homepage.mdx',
    title: 'Bigtablet Homepage Renewal',
    titleKo: '공식 홈페이지 리뉴얼',
    category: 'Company',
    accentColor: 'teal',
    order: 3,
  },
  {
    aliases: ['점주로', 'jeomjuro', 'winwin', 'winwin front', 'winwin frontend'],
    fileName: '04-jeomjuro.mdx',
    title: 'Jeomjuro',
    titleKo: '점주로',
    category: 'Personal · Awarded',
    accentColor: 'sky',
    order: 4,
  },
  {
    aliases: ['marker', 'marker web', 'marker-web', '행복 지도', '행복지도'],
    fileName: '05-marker.mdx',
    title: 'Marker',
    titleKo: 'Marker',
    category: 'Hackathon · Grand Prize',
    badge: '하이톤 12회 대상',
    accentColor: 'rose',
    order: 5,
  },
  {
    aliases: ['echo', 'echo app', 'echo-app', 'ehco', '에코'],
    fileName: '06-echo.mdx',
    title: 'Echo',
    titleKo: 'Echo',
    category: 'Hackathon · Excellence Prize',
    badge: '하이톤 11회 우수상',
    accentColor: 'amber',
    order: 6,
  },
  {
    aliases: ['rust-with-typescript', 'rust with typescript', 'rust typescript'],
    fileName: '07-rust-with-typescript.mdx',
    title: 'rust-with-typescript',
    titleKo: 'rust-with-typescript',
    category: 'Personal · Open Source',
    badge: 'Live',
    accentColor: 'amber',
    order: 7,
  },
  {
    aliases: ['chorus', '코러스'],
    fileName: '08-chorus.mdx',
    title: 'Chorus',
    titleKo: '코러스',
    category: 'Side Project',
    accentColor: 'sky',
    order: 8,
  },
];

async function loadEnvFile(fileName) {
  let raw = '';
  try {
    raw = await fs.readFile(path.resolve(process.cwd(), fileName), 'utf8');
  } catch {
    return;
  }

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

await loadEnvFile('.env.local');
await loadEnvFile('.env');

const token = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY;
const parentPageId = process.env.NOTION_PROJECT_PAGE_ID;
const notionVersion = process.env.NOTION_API_VERSION || '2022-06-28';

if (!token || !parentPageId) {
  console.log('[notion-sync] skip: NOTION_TOKEN or NOTION_PROJECT_PAGE_ID is missing.');
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Notion-Version': notionVersion,
  'Content-Type': 'application/json',
};

function normalizeNotionId(input) {
  const match = input.trim().match(/[0-9a-fA-F]{32}|[0-9a-fA-F]{8}-[0-9a-fA-F-]{27}/);
  if (!match) return input.trim();
  const raw = match[0].replace(/-/g, '').toLowerCase();
  return `${raw.slice(0, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}-${raw.slice(16, 20)}-${raw.slice(20)}`;
}

function normalizeName(input) {
  return (input || '').toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
}

function simplifyName(input) {
  return normalizeName(input)
    .replace(/bigtablet/g, '')
    .replace(/리뉴얼/g, '')
    .replace(/플랫폼/g, '')
    .replace(/공식/g, '')
    .replace(/사내/g, '');
}

function getKnownProjectMeta(input) {
  const key = normalizeName(input);
  const simpleKey = simplifyName(input);

  return knownProjectMeta.find((meta) => {
    const keys = [meta.fileName, meta.title, meta.titleKo, ...meta.aliases].map(normalizeName);
    const simpleKeys = [meta.fileName, meta.title, meta.titleKo, ...meta.aliases].map(simplifyName);
    if (keys.includes(key) || simpleKeys.includes(simpleKey)) return true;

    return simpleKeys.some((candidate) => {
      if (candidate.length < 4 || simpleKey.length < 4) return false;
      return candidate.includes(simpleKey) || simpleKey.includes(candidate);
    });
  });
}

function normalizeKey(input) {
  return (input || '').toLowerCase().replace(/\s+/g, '').replace(/[-_·.:/()[\]]/g, '');
}

function richTextToPlain(richText = []) {
  return richText.map((part) => part.plain_text ?? '').join('');
}

function escapeMdxText(text) {
  return text.replaceAll('{', '&#123;').replaceAll('}', '&#125;');
}

async function notionGet(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`[notion-sync] request failed: ${response.status} ${text}`);
  }
  return response.json();
}

async function fetchChildBlocks(blockId) {
  let cursor = undefined;
  const blocks = [];

  do {
    const query = new URLSearchParams({ page_size: '100' });
    if (cursor) query.set('start_cursor', cursor);
    const json = await notionGet(
      `https://api.notion.com/v1/blocks/${blockId}/children?${query.toString()}`
    );
    blocks.push(...(json.results ?? []));
    cursor = json.has_more ? json.next_cursor : undefined;
  } while (cursor);

  return blocks;
}

async function fetchPageMarkdown(pageId) {
  const blocks = await fetchChildBlocks(pageId);
  const lines = [];

  for (const block of blocks) {
    const text = escapeMdxText(richTextToPlain(block[block.type]?.rich_text || []).trim());
    if (block.type === 'heading_2') lines.push(`## ${text}`, '');
    else if (block.type === 'heading_1') lines.push(`# ${text}`, '');
    else if (block.type === 'heading_3') lines.push(`### ${text}`, '');
    else if (block.type === 'bulleted_list_item') lines.push(`- ${text}`);
    else if (block.type === 'numbered_list_item') lines.push(`1. ${text}`);
    else if (block.type === 'paragraph') lines.push(text, '');
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function splitFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;
  return { frontmatter: match[1], body: match[2] };
}

async function readLocalProjects() {
  const files = (await fs.readdir(projectDir)).filter((file) => file.endsWith('.mdx'));
  const projects = [];

  for (const fileName of files) {
    const absPath = path.join(projectDir, fileName);
    const raw = await fs.readFile(absPath, 'utf8');
    const parsed = splitFrontmatter(raw);
    if (!parsed) continue;
    const title = parsed.frontmatter.match(/^title:\s*"?(.*?)"?$/m)?.[1] || '';
    const titleKo = parsed.frontmatter.match(/^titleKo:\s*"?(.*?)"?$/m)?.[1] || '';
    const slug = fileName.replace(/^\d+-/, '').replace(/\.mdx$/, '');
    const aliases = knownProjectMeta.find((meta) => meta.fileName === fileName)?.aliases || [];
    projects.push({
      absPath,
      fileName,
      raw,
      parsed,
      keys: [slug, title, titleKo, ...aliases].map(normalizeName).filter(Boolean),
      simpleKeys: [slug, title, titleKo, ...aliases].map(simplifyName).filter(Boolean),
    });
  }

  return projects;
}

function slugifyTitle(input) {
  const slug = normalizeName(input).replace(/[가-힣]+/g, '').replace(/[^a-z0-9]+/g, '-');
  return slug.replace(/^-+|-+$/g, '') || 'project';
}

function quoteYaml(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

async function getAvailableFileName(preferredFileName) {
  const files = new Set((await fs.readdir(projectDir)).filter((file) => file.endsWith('.mdx')));
  if (!files.has(preferredFileName)) return preferredFileName;

  const base = preferredFileName.replace(/\.mdx$/, '');
  let index = 2;
  while (files.has(`${base}-${index}.mdx`)) index += 1;
  return `${base}-${index}.mdx`;
}

async function createLocalProject(notionTitle, basic, tech, body) {
  const meta = getKnownProjectMeta(notionTitle);
  const group = groupFromKorean(basic[normalizeKey('구분')]) || 'personal';
  const title = meta?.title || notionTitle;
  const titleKo = meta?.titleKo || notionTitle;
  const category = meta?.category || (group === 'company' ? 'Company' : 'Personal');
  const accentColor = meta?.accentColor || 'accent';
  const fileName = await getAvailableFileName(meta?.fileName || `99-${slugifyTitle(notionTitle)}.mdx`);

  const fields = [
    `order: ${meta?.order || 99}`,
    `title: ${quoteYaml(title)}`,
    `titleKo: ${quoteYaml(titleKo)}`,
    `group: ${group}`,
    'featured: false',
    `category: ${quoteYaml(category)}`,
  ];

  if (meta?.badge) fields.push(`badge: ${quoteYaml(meta.badge)}`);
  fields.push(`year: ${quoteYaml(basic[normalizeKey('연도')] || '')}`);
  fields.push(`role: ${quoteYaml(basic[normalizeKey('역할')] || '')}`);
  fields.push(`accentColor: ${accentColor}`);
  fields.push(`summary: ${quoteYaml(basic[normalizeKey('요약')] || '')}`);
  fields.push('metrics: []');
  fields.push('callouts: []');
  fields.push('tech:');
  fields.push(...tech.map((item) => `  - ${quoteYaml(item)}`));

  const link = basic[normalizeKey('링크')];
  const github = basic[normalizeKey('깃허브')];
  if (link) fields.push(`link: ${quoteYaml(link)}`);
  if (github) fields.push(`github: ${quoteYaml(github)}`);

  const next = `---\n${fields.join('\n')}\n---\n\n${body}`;
  const absPath = path.join(projectDir, fileName);
  await fs.writeFile(absPath, next, 'utf8');
  return fileName;
}

function findLocalProject(localProjects, notionTitle) {
  const key = normalizeName(notionTitle);
  const simpleKey = simplifyName(notionTitle);

  return localProjects.find((project) => {
    if (project.keys.includes(key)) return true;
    if (project.simpleKeys.includes(simpleKey)) return true;

    return project.simpleKeys.some((candidate) => {
      if (candidate.length < 4 || simpleKey.length < 4) return false;
      return candidate.includes(simpleKey) || simpleKey.includes(candidate);
    });
  });
}

function parseSections(markdown) {
  const map = new Map();
  let current = '';

  for (const line of markdown.split('\n')) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      current = match[1].trim();
      map.set(current, []);
      continue;
    }
    if (current) map.get(current).push(line);
  }

  return (name) => (map.get(name) || []).join('\n').trim();
}

function parseBasicInfo(text) {
  const info = {};
  for (const line of text.split('\n')) {
    const match = line.trim().match(/^-+\s*(.+?):\s*(.*)$/);
    if (!match) continue;
    info[normalizeKey(match[1])] = match[2].trim();
  }
  return info;
}

function parseTech(text) {
  return text
    .split('\n')
    .map((line) => line.trim().replace(/^-+\s*/, '').trim())
    .filter(Boolean);
}

function groupFromKorean(value) {
  const key = normalizeKey(value);
  if (key.includes('회사')) return 'company';
  if (key.includes('개인')) return 'personal';
  return '';
}

function updateScalar(frontmatter, key, value, quote = true) {
  if (!value) return frontmatter;
  const safe = quote ? `"${String(value).replace(/"/g, '\\"')}"` : String(value);
  const regex = new RegExp(`^${key}:\\s*.*$`, 'm');
  if (regex.test(frontmatter)) return frontmatter.replace(regex, `${key}: ${safe}`);
  return `${frontmatter.replace(/\n?$/, '\n')}${key}: ${safe}`;
}

function updateTech(frontmatter, tech) {
  if (!tech.length) return frontmatter;
  const block = `${['tech:', ...tech.map((item) => `  - "${item.replace(/"/g, '\\"')}"`)].join('\n')}\n`;
  const regex = /^tech:\s*(?:\[[^\]]*\]|\n(?:\s{2}-.*\n?)*)/m;
  if (regex.test(frontmatter)) return frontmatter.replace(regex, block);
  return `${frontmatter.replace(/\n?$/, '\n')}${block}`;
}

function buildBody(problem, approach, result, fallback) {
  const chunks = [];
  if (problem) chunks.push(`## Problem\n\n${problem}`);
  if (approach) chunks.push(`## Approach\n\n${approach}`);
  if (result) chunks.push(`## Result\n\n${result}`);
  return chunks.length ? `${chunks.join('\n\n')}\n` : fallback;
}

function normalizeProjectBody(notionTitle, body) {
  const meta = getKnownProjectMeta(notionTitle);
  if (meta?.titleKo === '점주로') {
    return body.replace(/WinWin 프론트엔드는/g, '점주로 프론트엔드는');
  }
  return body;
}

async function fetchNotionProjects() {
  const blocks = await fetchChildBlocks(normalizeNotionId(parentPageId));
  const childPages = blocks.filter((block) => block.type === 'child_page');

  const projects = [];
  for (const page of childPages) {
    projects.push({
      title: page.child_page?.title || '',
      markdown: await fetchPageMarkdown(page.id),
    });
  }

  return projects;
}

async function main() {
  const [localProjects, notionProjects] = await Promise.all([
    readLocalProjects(),
    fetchNotionProjects(),
  ]);

  let updated = 0;
  let skipped = 0;

  if (!notionProjects.length) {
    console.log('[notion-sync] warning: no child project pages found under parent page.');
  }

  for (const notionProject of notionProjects) {
    const target = findLocalProject(localProjects, notionProject.title);
    const getSection = parseSections(notionProject.markdown);
    const basic = parseBasicInfo(getSection('기본 정보'));
    const tech = parseTech(getSection('기술 스택'));
    const body = normalizeProjectBody(notionProject.title, buildBody(
      getSection('문제'),
      getSection('접근'),
      getSection('결과'),
      ''
    ));

    if (!target) {
      if (!Object.keys(basic).length && !tech.length && !body.trim()) {
        skipped += 1;
        console.log(`[notion-sync] skip: no local MDX match for "${notionProject.title}"`);
        continue;
      }

      const fileName = await createLocalProject(notionProject.title, basic, tech, body);
      updated += 1;
      console.log(`[notion-sync] created ${fileName}`);
      continue;
    }

    let frontmatter = target.parsed.frontmatter;
    frontmatter = updateScalar(frontmatter, 'group', groupFromKorean(basic[normalizeKey('구분')]), false);
    frontmatter = updateScalar(frontmatter, 'year', basic[normalizeKey('연도')]);
    frontmatter = updateScalar(frontmatter, 'role', basic[normalizeKey('역할')]);
    frontmatter = updateScalar(frontmatter, 'summary', basic[normalizeKey('요약')]);
    frontmatter = updateScalar(frontmatter, 'link', basic[normalizeKey('링크')]);
    frontmatter = updateScalar(frontmatter, 'github', basic[normalizeKey('깃허브')]);
    frontmatter = updateTech(frontmatter, tech);

    const nextBody = normalizeProjectBody(notionProject.title, buildBody(
      getSection('문제'),
      getSection('접근'),
      getSection('결과'),
      target.parsed.body
    ));
    const next = `---\n${frontmatter}\n---\n\n${nextBody}`;

    if (next.replace(/\r\n/g, '\n') !== target.raw.replace(/\r\n/g, '\n')) {
      await fs.writeFile(target.absPath, next, 'utf8');
      updated += 1;
      console.log(`[notion-sync] updated ${target.fileName}`);
    }
  }

  console.log(`[notion-sync] done: updated=${updated}, skipped=${skipped}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
