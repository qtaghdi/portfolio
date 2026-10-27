const username = 'qtaghdi';
const fallback = Object.freeze({
  login: username,
  name: '박상민',
  url: `https://github.com/${username}`,
  avatarUrl: 'https://avatars.githubusercontent.com/u/135234546?v=4',
});

export async function loadGitHubProfile(fetcher = globalThis.fetch) {
  try {
    const response = await fetcher(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'park-sangmin-portfolio',
      },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return fallback;
    const profile = await response.json();
    if (profile?.login !== username || profile.html_url !== fallback.url) return fallback;
    const avatar = new URL(profile.avatar_url);
    if (avatar.protocol !== 'https:' || avatar.hostname !== 'avatars.githubusercontent.com') return fallback;
    return {
      login: username,
      name: typeof profile.name === 'string' && profile.name.trim() ? profile.name.trim() : fallback.name,
      url: fallback.url,
      avatarUrl: avatar.href,
    };
  } catch {
    return fallback;
  }
}

let profilePromise;
export function getGitHubProfile() {
  profilePromise ??= loadGitHubProfile();
  return profilePromise;
}
