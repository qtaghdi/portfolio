export interface SupplementalScreen {
  src: string;
  width: number;
  height: number;
  ko: string;
  en: string;
  englishImage?: { src: string; width: number; height: number };
}

export const supplementalScreens: Record<string, SupplementalScreen[]> = {
  'design-system': [
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
  intranet: [{
    src: '/projects/intranet/approval.png', width: 1320, height: 2868,
    englishImage: { src: '/projects/intranet/approval-en.png', width: 2752, height: 2064 },
    ko: '데모 데이터로 실행한 iPhone 앱의 결재 대기 목록과 문서 상태',
    en: 'Approval queue and selected document on an iPad running with demo data',
  }],
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

export const primaryScreens: Record<string, SupplementalScreen> = {
  'interaction-inspector': {
    src: '/projects/interaction-inspector/inspector-demo.png', width: 1280, height: 720,
    ko: 'Chromium 데모에서 Interaction Inspector로 버튼의 포커스 상태와 DOM 이벤트를 확인하는 화면',
    en: 'Interaction Inspector showing button focus and DOM events in the Chromium demo',
  },
  notiiv: { src: '/projects/notiiv/img.png', width: 1905, height: 956, ko: 'Notiiv 고객지원 실제 화면', en: 'Actual Notiiv customer support screen' },
  intranet: { src: '/projects/intranet/home.png', width: 390, height: 788, ko: '데모 데이터로 실행한 Bigtablet 인트라넷 모바일 홈', en: 'Bigtablet intranet mobile home running with fixture data' },
  'document-workspace': { src: '/projects/document-workspace/editor.png', width: 1440, height: 900, ko: '호환성 검증용 XLSX를 연 Foloom(이전 이름 document-workspace) 실제 편집기', en: 'Actual Foloom editor (formerly document-workspace) with a compatibility XLSX fixture' },
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
  'interaction-inspector': [['problem', null, 'primary']],
  notiiv: [['decisions', 2, 'primary']],
  'design-system': [['outcome', 0, 'button-light-reference'], ['outcome', 0, 'button-dark-reference']],
  intranet: [['problem', null, 'primary'], ['decisions', 1, 'approval']],
  'document-workspace': [['problem', null, 'primary']],
  'apple-music-discord-presence': [['problem', null, 'primary']],
  owkr: [['identity', null, 'primary'], ['operations', null, 'operations-guide']],
  chorus: [['problem', null, 'search'], ['decisions', 1, 'primary'], ['decisions', 2, 'export']],
  'rust-with-typescript': [['problem', null, 'home'], ['decisions', 0, 'primary']],
};

export function englishScreens(project: string, section: string, subsection: number | null = null): string[] {
  return (englishPlacements[project] ?? []).filter(([id, index]) => id === section && index === subsection).map(([, , screen]) => screen);
}

// These are implementation diagrams, not product screenshots.
export const projectDiagrams: Record<string, SupplementalScreen> = Object.fromEntries(
  ['boundra', 'homepage', 'jeomjuro', 'marker', 'kivra', 'echo'].map((key) => [key, {
    src: `/projects/${key}/implementation.svg`, width: 1400, height: 840,
    ko: '구현 구조 요약 · 실제 제품 화면이 아닌 설명용 다이어그램',
    en: 'Implementation overview · explanatory diagram, not a product screenshot',
  }]),
);
