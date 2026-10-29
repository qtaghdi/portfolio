export interface SupplementalScreen {
  src: string;
  width: number;
  height: number;
  ko: string;
  en: string;
}

export const supplementalScreens: Record<string, SupplementalScreen[]> = {
  'design-system': [
    {
      src: '/projects/design-system/tokens-components.png', width: 1600, height: 1000,
      ko: '공개 Storybook의 시맨틱 색상 토큰과 적용 예시 · 2026-10-29 촬영',
      en: 'Semantic color tokens and usage in the public Storybook · captured 2026-10-29',
    },
    {
      src: '/projects/design-system/button-light-reference.png', width: 672, height: 128,
      ko: 'Button 라이트 테마 · 2026-10-27 CI 시각 회귀 기준 이미지',
      en: 'Button, light theme · CI visual regression baseline from 2026-10-27',
    },
    {
      src: '/projects/design-system/button-dark-reference.png', width: 672, height: 128,
      ko: 'Button 다크 테마 · 2026-10-27 CI 시각 회귀 기준 이미지',
      en: 'Button, dark theme · CI visual regression baseline from 2026-10-27',
    },
  ],
  owkr: [{
    src: '/projects/owkr/operations-guide.png', width: 1600, height: 1000,
    ko: 'OWKR Docs 공개 운영 가이드 · 2026-10-29 촬영',
    en: 'Public OWKR Docs operations guide · captured 2026-10-29',
  }],
  chorus: [{
    src: '/projects/chorus/search.png', width: 1600, height: 1000,
    ko: 'Chorus · 실제 카탈로그 응답 데이터로 표시한 로컬 앱의 검색 결과',
    en: 'Chorus search results in the local app using recorded catalog response data',
  }, {
    src: '/projects/chorus/export.png', width: 350, height: 622,
    ko: 'Chorus · 로컬 앱에서 저장한 PNG 카드 원본',
    en: 'Original PNG card saved from the local Chorus app',
  }],
  'rust-with-typescript': [{
    src: '/projects/rust-with-typescript/home.png', width: 1600, height: 1000,
    ko: 'Rust with TypeScript 공개 문서의 영어 홈 · 2026-10-29 촬영',
    en: 'English home on the public Rust with TypeScript site · captured 2026-10-29',
  }],
};

const primaryScreens: Record<string, SupplementalScreen> = {
  notiiv: { src: '/projects/notiiv/img.png', width: 1905, height: 956, ko: 'Notiiv 고객지원 실제 화면', en: 'Actual Notiiv customer support screen' },
  'design-system': { src: '/projects/design-system/storybook-overview.png', width: 1440, height: 900, ko: 'Bigtablet Design System의 Storybook 실제 화면', en: 'Actual Bigtablet Design System Storybook screen' },
  intranet: { src: '/projects/intranet/home.png', width: 390, height: 788, ko: '데모 데이터로 실행한 Bigtablet 인트라넷 모바일 홈', en: 'Bigtablet intranet mobile home running with fixture data' },
  'document-workspace': { src: '/projects/document-workspace/editor.png', width: 1440, height: 900, ko: '호환성 검증용 XLSX를 연 document-workspace 실제 편집기', en: 'Actual document-workspace editor with a compatibility XLSX fixture' },
  'apple-music-discord-presence': { src: '/projects/apple-music-discord-presence/discord-presence.png', width: 828, height: 340, ko: 'macOS Discord에 표시된 Apple Music 활동', en: 'Apple Music activity displayed in Discord on macOS' },
  owkr: { src: '/projects/owkr/team-result.png', width: 1600, height: 1000, ko: 'OWKR Match에서 데모 참가자 10명으로 실행한 팀 배정 · 2026-10-29', en: 'Team assignment executed in OWKR Match with ten demo participants · 2026-10-29' },
  chorus: { src: '/projects/chorus/vinyl.png', width: 600, height: 1000, ko: 'Chorus · 실제 곡을 선택해 확인한 로컬 앱의 3D 카드 편집 화면', en: 'Chorus 3D card editor in the local app with a selected music track' },
  'rust-with-typescript': { src: '/projects/rust-with-typescript/ownership.png', width: 1600, height: 1000, ko: 'Rust with TypeScript의 공개 한국어 Ownership·Borrowing 챕터 · 2026-10-29', en: 'Public Korean Ownership and Borrowing chapter in Rust with TypeScript · 2026-10-29' },
};

export function caseScreen(project: string, screen: string = 'primary'): SupplementalScreen {
  const result = screen === 'primary' ? primaryScreens[project] : supplementalScreens[project]?.find((item) => item.src.split('/').pop()?.replace('.png', '') === screen);
  if (!result) throw new Error(`Unknown case screenshot: ${project}/${screen}`);
  return result;
}

const englishPlacements: Record<string, [section: string, subsection: number | null, screen: string][]> = {
  notiiv: [['decisions', 2, 'primary']],
  'design-system': [['problem', null, 'primary'], ['decisions', 2, 'tokens-components'], ['outcome', 0, 'button-light-reference'], ['outcome', 0, 'button-dark-reference']],
  intranet: [['problem', null, 'primary']],
  'document-workspace': [['decisions', 0, 'primary']],
  'apple-music-discord-presence': [['problem', null, 'primary']],
  owkr: [['identity', null, 'primary'], ['operations', null, 'operations-guide']],
  chorus: [['problem', null, 'search'], ['decisions', 1, 'primary'], ['decisions', 2, 'export']],
  'rust-with-typescript': [['problem', null, 'home'], ['decisions', 0, 'primary']],
};

export function englishScreens(project: string, section: string, subsection: number | null = null): string[] {
  return (englishPlacements[project] ?? []).filter(([id, index]) => id === section && index === subsection).map(([, , screen]) => screen);
}
