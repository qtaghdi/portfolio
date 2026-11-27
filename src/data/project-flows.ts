type Step = { label: string; detail: string };
type Flow = { caption: string; steps: Step[] };

export const projectFlows = {
  'agents-review': {
    ko: {
      caption: 'Oddmash에서 PR을 열고 리뷰를 받기까지',
      steps: [
        { label: 'PR 열기', detail: '기여자가 리뷰 대상 저장소에 변경 제안' },
        { label: '필수 CI 확인', detail: 'Lead가 현재 커밋의 검사 통과를 확인' },
        { label: 'GitHub 리뷰', detail: 'Lead가 근거를 남기고 유지보수자가 대응을 판단' },
      ],
    },
    en: {
      caption: 'From opening a pull request to receiving a review',
      steps: [
        { label: 'Open a PR', detail: 'A contributor proposes a change in an enrolled repository' },
        { label: 'Check required CI', detail: 'Lead verifies the required checks on the current commit' },
        { label: 'Review in GitHub', detail: 'Lead posts its findings and the maintainer decides how to respond' },
      ],
    },
  },
  'agents-ci': {
    ko: {
      caption: 'Oddmash UI PR #51의 검사 결과를 재현한 흐름',
      steps: [
        { label: '이전 실행 취소', detail: '취소된 검사 결과가 커밋에 남음' },
        { label: '후속 실행 성공', detail: '같은 커밋에서 새 워크플로 실행이 통과' },
        { label: '현재 결과로 판단', detail: '교체 관계를 확인해 이전 실행을 제외하고 리뷰 진행' },
      ],
    },
    en: {
      caption: 'Replay of CI evidence from Oddmash UI pull request #51',
      steps: [
        { label: 'Earlier run canceled', detail: 'Canceled checks remain attached to the commit' },
        { label: 'Replacement passes', detail: 'A newer workflow run passes on the same commit' },
        { label: 'Use current results', detail: 'Confirm the replacement, exclude the older run, and proceed to review' },
      ],
    },
  },
  'foloom-revision': {
    ko: {
      caption: '예시 · 같은 문서 버전에서 시작한 두 요청',
      steps: [
        { label: '버전 12 열기', detail: '사람과 AI가 같은 버전의 문서를 읽음' },
        { label: '사람의 변경 저장', detail: '먼저 저장된 요청이 반영되어 버전 13 생성' },
        { label: 'AI 요청에 충돌 반환', detail: '버전 12를 기준으로 보낸 변경을 거절하고 버전 13 보존' },
      ],
    },
    en: {
      caption: 'Example · Two edits start from the same workbook revision',
      steps: [
        { label: 'Read revision 12', detail: 'A person and an AI read the same workbook revision' },
        { label: 'Save the first edit', detail: 'The first successful save creates revision 13' },
        { label: 'Return a conflict', detail: 'The AI’s edit was based on revision 12, so revision 13 is preserved' },
      ],
    },
  },
  'boundra-import': {
    ko: {
      caption: 'BR-001 예시 · 같은 도메인에서 브라우저 코드가 서버 구현을 가져오는 경우',
      steps: [
        { label: 'client/list.ts', detail: '상품 목록을 그리는 브라우저 코드' },
        { label: 'server/repository.ts', detail: '가져오려는 서버 데이터 접근 코드' },
        { label: 'CLI 진단 · BR-001', detail: '가져온 파일과 줄을 표시해 브라우저·서버 경계 위반을 알림' },
      ],
    },
    en: {
      caption: 'BR-001 example · Browser code imports a server implementation in the same domain',
      steps: [
        { label: 'client/list.ts', detail: 'Browser code that renders the product list' },
        { label: 'server/repository.ts', detail: 'Server-side data access the import points to' },
        { label: 'CLI diagnostic · BR-001', detail: 'The diagnostic identifies the import location that crossed the boundary' },
      ],
    },
  },
} satisfies Record<string, Record<'ko' | 'en', Flow>>;

export type ProjectFlowId = keyof typeof projectFlows | 'foloom-save';
