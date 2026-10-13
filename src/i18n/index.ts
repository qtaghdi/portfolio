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
      description: '제품이 커질수록 반복되는 문제를 찾아, 사용자 흐름과 프론트엔드 구조를 함께 정리합니다.',
      cta: '선택한 작업',
    },
    selected: {
      kicker: 'SELECTED WORK',
      title: '선택한 작업',
      description: '최근 실무와 개인 작업 중, 문제를 바라본 방식과 구현의 근거를 함께 남길 수 있는 세 가지를 골랐습니다.',
      detail: '작업 기록 읽기',
      moreKicker: 'MORE WORK',
      moreTitle: '그 밖의 작업',
      moreDescription: '완성도와 현재 상태를 과장하지 않고, 각 프로젝트에서 검증한 문제를 짧게 기록했습니다.',
    },
    about: {
      kicker: 'ABOUT',
      statement: '화면을 만드는 일에서 시작했지만,\n지금은 팀이 같은 기준으로 더 빠르게 판단하도록 돕는 일에 관심이 많습니다.',
      description: '디자인 시스템, BFF 인증, WebAuthn, 데이터 패칭 구조처럼 화면 뒤의 문제까지 함께 다룹니다. 한 번의 구현보다 다음 사람이 이해하고 고칠 수 있는 구조를 오래 고민합니다.',
      principles: [
        ['01', '사용자 흐름부터 봅니다', '기능보다 사용자의 흐름과 맥락에서 문제를 정의하고 우선순위를 정합니다.'],
        ['02', '운영 가능한 구조를 만듭니다', '지금뿐 아니라 팀이 함께 성장할 수 있는 명확한 규칙과 구조를 고민합니다.'],
        ['03', '근거로 설명합니다', '테스트, 성능 기록과 재현 가능한 검증으로 의사결정을 설명합니다.'],
      ],
      profile: ['Park Sangmin', 'Frontend Engineer', 'Daegu, Korea'],
    },
    contact: {
      kicker: 'CONTACT',
      title: '같이 풀어볼 문제가 있다면\n이야기해 주세요.',
      description: '새 제품을 만들거나, 이미 커진 제품의 흐름과 구조를 다시 정리하는 대화를 환영합니다.',
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
      eyebrow: 'Frontend Engineer · Daegu, Korea',
      lines: ['Frontend engineer', 'Park Sangmin.'],
      description: 'As products grow, I find recurring problems and organize user flows and frontend structure together.',
      cta: 'Selected work',
    },
    selected: {
      kicker: 'SELECTED WORK',
      title: 'Selected work',
      description: 'Three recent projects where I can show both the problem-solving process and the implementation evidence.',
      detail: 'Read the work log',
      moreKicker: 'MORE WORK',
      moreTitle: 'More work',
      moreDescription: 'Short, honest records of what each project tested and where it stands today.',
    },
    about: {
      kicker: 'ABOUT',
      statement: 'I started by building screens.\nNow I care about helping teams make faster decisions from shared standards.',
      description: 'I work on the problems behind the interface too, including design systems, BFF authentication, WebAuthn, and data-fetching structure. I value structures the next person can understand and change.',
      principles: [
        ['01', 'Start with user flow', 'I define priorities from the user context before individual features.'],
        ['02', 'Build operable structure', 'I create rules and systems that can grow with the team.'],
        ['03', 'Explain with evidence', 'I use tests and reproducible records to support decisions.'],
      ],
      profile: ['PARK SANGMIN', 'FRONTEND ENGINEER', 'DAEGU, KOREA'],
    },
    contact: {
      kicker: 'CONTACT',
      title: 'Have a problem worth\nsolving together?',
      description: 'I welcome conversations about new products and about untangling the flow and structure of products that have already grown.',
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
