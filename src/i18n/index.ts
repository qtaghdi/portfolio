export type Locale = 'ko' | 'en';

export const localePath = (locale: Locale, path = '/') => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? `/en${normalized === '/' ? '/' : normalized}` : normalized;
};

export const projectPath = (locale: Locale, slug: string) =>
  localePath(locale, `/projects/${slug.replace(/^\d+-/, '')}`);

export const copy = {
  ko: {
    skip: '본문으로 건너뛰기',
    nav: { work: '작업', about: '소개', contact: '연락' },
    hero: {
      eyebrow: 'Frontend Engineer · Daegu, Korea',
      lines: ['프론트엔드 개발자', '박상민입니다.'],
      description: '제품 화면과 공통 UI 라이브러리를 만듭니다. Bigtablet에서 웹 서비스와 디자인 시스템을 개발하고 있습니다.',
      cta: '작업 보기',
    },
    selected: {
      kicker: 'SELECTED WORK',
      title: '주요 작업',
      description: '각 프로젝트에서 맡은 역할과 설계 과정을 정리했습니다.',
      detail: '자세히 보기',
      moreKicker: 'MORE WORK',
      moreTitle: '다른 작업',
      moreDescription: '개발 도구, 커뮤니티 서비스와 팀 프로젝트입니다.',
    },
    about: {
      kicker: 'ABOUT',
      statement: '제품 화면과\n공통 UI를 만듭니다.',
      description: '2025년 9월부터 Bigtablet에서 프론트엔드 개발자로 일하고 있습니다. 웹 서비스의 운영 화면과 사내 디자인 시스템을 개발하며, 반복되는 인증과 API 처리를 공통 코드로 정리하는 작업에도 참여했습니다.',
      principles: [
        ['01', '사용자 흐름부터 봅니다', '기능보다 사용자의 흐름과 맥락에서 문제를 정의하고 우선순위를 정합니다.'],
        ['02', '운영 가능한 구조를 만듭니다', '지금뿐 아니라 팀이 함께 성장할 수 있는 명확한 규칙과 구조를 고민합니다.'],
        ['03', '근거로 설명합니다', '테스트, 성능 기록과 재현 가능한 검증으로 의사결정을 설명합니다.'],
      ],
      profile: ['Park Sangmin', 'Frontend Engineer', 'Daegu, Korea'],
    },
    contact: {
      kicker: 'CONTACT',
      title: '함께 일할 기회를\n기다립니다.',
      description: '프론트엔드 개발 포지션과 프로젝트 제안은 이메일로 연락해 주세요.',
      email: '이메일 보내기',
    },
    detail: {
      back: '작업 목록', role: '역할', focus: '집중한 영역', stack: '기술',
      index: '목차', problem: '문제', decisions: '선택한 방법', outcome: '확인한 결과', trace: '근거',
      live: '사이트', github: 'GitHub', next: '다음 작업',
    },
    meta: {
      title: '박상민 | 프론트엔드 개발자',
      description: 'Bigtablet에서 웹 서비스와 디자인 시스템을 개발하는 프론트엔드 개발자 박상민의 포트폴리오입니다. 담당한 문제, 구현과 검증 기록을 소개합니다.',
    },
  },
  en: {
    skip: 'Skip to content',
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    hero: {
      eyebrow: 'Frontend Engineer · Daegu, Korea',
      lines: ['Frontend engineer', 'Park Sangmin.'],
      description: 'I build product interfaces and shared UI libraries. At Bigtablet, I work on web services and the design system.',
      cta: 'Selected work',
    },
    selected: {
      kicker: 'SELECTED WORK',
      title: 'Selected work',
      description: 'My role and design decisions in selected projects.',
      detail: 'View project',
      moreKicker: 'MORE WORK',
      moreTitle: 'More work',
      moreDescription: 'Developer tools, community services, and team projects.',
    },
    about: {
      kicker: 'ABOUT',
      statement: 'I build product interfaces\nand shared UI.',
      description: 'I have worked as a frontend engineer at Bigtablet since September 2025, developing operational interfaces and the design system. I also contribute to shared authentication and API code.',
      principles: [
        ['01', 'Start with user flow', 'I define priorities from the user context before individual features.'],
        ['02', 'Build operable structure', 'I create rules and systems that can grow with the team.'],
        ['03', 'Explain with evidence', 'I use tests and reproducible records to support decisions.'],
      ],
      profile: ['PARK SANGMIN', 'FRONTEND ENGINEER', 'DAEGU, KOREA'],
    },
    contact: {
      kicker: 'CONTACT',
      title: 'Let’s work\ntogether.',
      description: 'Contact me by email about frontend engineering roles and project opportunities.',
      email: 'Send an email',
    },
    detail: {
      back: 'All work', role: 'Role', focus: 'Focus', stack: 'Stack',
      index: 'Index', problem: 'Problem', decisions: 'Decisions', outcome: 'Outcome', trace: 'Trace',
      live: 'Live site', github: 'GitHub', next: 'Next work',
    },
    meta: {
      title: 'Park Sangmin | Frontend Engineer',
      description: 'Portfolio of Park Sangmin, a frontend engineer working on web services and the design system at Bigtablet. Explore project contributions and verification records.',
    },
  },
} as const;
