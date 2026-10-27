import assert from 'node:assert/strict';
import test from 'node:test';
import { loadGitHubProfile } from '../../src/lib/github-profile.mjs';

const publicProfile = {
  login: 'qtaghdi',
  name: '박상민',
  html_url: 'https://github.com/qtaghdi',
  avatar_url: 'https://avatars.githubusercontent.com/u/135234546?v=5',
};

test('uses the public profile endpoint and returns only display fields', async () => {
  const profile = await loadGitHubProfile(async (url, options) => {
    assert.equal(url, 'https://api.github.com/users/qtaghdi');
    assert.equal(options.headers.Authorization, undefined);
    assert.ok(options.signal instanceof AbortSignal);
    return { ok: true, json: async () => ({ ...publicProfile, email: 'unused@example.com', private_repos: 12 }) };
  });
  assert.deepEqual(profile, {
    login: 'qtaghdi', name: '박상민', url: 'https://github.com/qtaghdi',
    avatarUrl: publicProfile.avatar_url,
  });
});

for (const [name, fetcher] of [
  ['rate limit', async () => ({ ok: false, status: 403 })],
  ['network failure', async () => { throw new Error('offline'); }],
  ['invalid JSON', async () => ({ ok: true, json: async () => { throw new Error('invalid'); } })],
  ['wrong account', async () => ({ ok: true, json: async () => ({ ...publicProfile, login: 'someone-else' }) })],
  ['unexpected avatar host', async () => ({ ok: true, json: async () => ({ ...publicProfile, avatar_url: 'https://example.com/avatar.png' }) })],
]) {
  test(`retains the known profile on ${name}`, async () => {
    const profile = await loadGitHubProfile(fetcher);
    assert.equal(profile.login, 'qtaghdi');
    assert.equal(profile.avatarUrl, 'https://avatars.githubusercontent.com/u/135234546?v=4');
    assert.equal(profile.url, 'https://github.com/qtaghdi');
  });
}
