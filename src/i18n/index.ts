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
      eyebrow: 'FRONTEND ENGINEER · DAEGU, KOREA',
      lines: ['복잡한 문제를', '운영 가능한 제품으로', '만듭니다.'],
      description: '사용자의 흐름을 이해하고, 팀이 오래 운영할 수 있는 프론트엔드 구조를 설계합니다.',
      cta: '작업 보기',
    },
    selected: {
      kicker: 'SELECTED WORK',
      title: '구조와 경험을\n함께 개선한 작업입니다.',
      description: '문제를 발견한 과정부터 구현과 결과까지, 다섯 가지 대표 작업으로 정리했습니다.',
      detail: '사례 보기',
      moreKicker: 'MORE WORK',
      moreTitle: '그 밖의 작업',
      moreDescription: '수상 프로젝트와 커뮤니티 도구, 기술 문서, 인터랙션 실험을 모았습니다.',
    },
    about: {
      kicker: 'ABOUT',
      statement: '사용자의 흐름을 이해하고,\n팀이 오래 운영할 구조를 만듭니다.',
      description: '기능을 구현하는 데서 끝내지 않습니다. 사용자가 막히는 지점과 팀이 반복해서 겪는 문제를 찾아, 더 분명한 화면과 유지하기 쉬운 코드로 해결합니다.',
      principles: [
        ['01', '흐름', '사용자가 멈추는 순간을 먼저 찾습니다.'],
        ['02', '구조', '반복되는 문제는 공통 구조로 해결합니다.'],
        ['03', '검증', '테스트와 기록으로 결과를 확인합니다.'],
      ],
      profile: ['박상민', 'FRONTEND ENGINEER', 'DAEGU, KOREA'],
    },
    contact: {
      kicker: 'CONTACT',
      title: '같이 만들고 싶은\n제품이 있다면.',
      description: '새로운 제품을 만들거나 기존 프론트엔드 구조와 사용자 경험을 개선하는 이야기를 환영합니다.',
      email: '이메일 보내기',
    },
    detail: {
      back: '작업 목록', role: '역할', focus: '집중한 영역', stack: '기술', disclosure: '공개 범위',
      index: '목차', problem: '문제', decisions: '결정', outcome: '결과', trace: '근거',
      live: '사이트', github: 'GitHub', next: '다음 작업',
    },
    meta: {
      title: '박상민 | 프론트엔드 개발자',
      description: '사용자 경험과 제품 구조를 함께 고민하며 오래 운영되는 서비스를 만드는 프론트엔드 개발자 박상민의 포트폴리오입니다.',
    },
  },
  en: {
    skip: 'Skip to content',
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    hero: {
      eyebrow: 'FRONTEND ENGINEER · DAEGU, KOREA',
      lines: ['I turn complex', 'problems into', 'operable products.'],
      description: 'I understand user flows and design frontend systems that teams can maintain over time.',
      cta: 'View work',
    },
    selected: {
      kicker: 'SELECTED WORK',
      title: 'Work that improves\nstructure and experience.',
      description: 'Five selected projects, organized around the problem, the decisions I made, and the outcome.',
      detail: 'View case',
      moreKicker: 'MORE WORK',
      moreTitle: 'More work',
      moreDescription: 'Award-winning projects, community tools, technical writing, and interaction experiments in one place.',
    },
    about: {
      kicker: 'ABOUT',
      statement: 'I understand the user flow\nand build structures teams can maintain.',
      description: 'I do not stop at implementation. I find where users get stuck and where teams repeat the same work, then solve both with clearer interfaces and maintainable code.',
      principles: [
        ['01', 'Flow', 'I start with the moment a user gets stuck.'],
        ['02', 'Structure', 'I solve repeated work with shared systems.'],
        ['03', 'Validation', 'I confirm outcomes through tests and records.'],
      ],
      profile: ['PARK SANGMIN', 'FRONTEND ENGINEER', 'DAEGU, KOREA'],
    },
    contact: {
      kicker: 'CONTACT',
      title: 'Have a product\nyou want to build together?',
      description: 'I am open to building new products and improving existing frontend systems and user experiences.',
      email: 'Send an email',
    },
    detail: {
      back: 'All work', role: 'Role', focus: 'Focus', stack: 'Stack', disclosure: 'Disclosure',
      index: 'Index', problem: 'Problem', decisions: 'Decisions', outcome: 'Outcome', trace: 'Trace',
      live: 'Live site', github: 'GitHub', next: 'Next work',
    },
    meta: {
      title: 'Park Sangmin | Frontend Engineer',
      description: 'Portfolio of Park Sangmin, a frontend engineer who connects user experience with maintainable product structure.',
    },
  },
} as const;
