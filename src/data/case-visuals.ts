export type Visual = readonly [title: string, beforeLabel: string, before: readonly string[], afterLabel: string, after: readonly string[], result: string];

export const caseVisuals: Record<string, { ko: Visual; en: Visual }> = {
  "design-system": {
    "ko": [
      "컴포넌트별 CSS 배포",
      "기존: 전체 CSS 진입점",
      [
        "Button 사용",
        "전체 style.css 로드",
        "미사용 컴포넌트 CSS 포함"
      ],
      "변경: 의존성에 맞춘 배포",
      [
        "Button → Button.css",
        "DatePicker → DatePicker.css + Popover.css",
        "배럴에는 재수출만 유지"
      ],
      "네 Notiiv 앱에서 전체 스타일 import 제거"
    ],
    "en": [
      "Component-level CSS distribution",
      "Before: shared stylesheet",
      [
        "Use Button",
        "Load the whole style.css",
        "Include unused component styles"
      ],
      "After: dependency-aligned output",
      [
        "Button → Button.css",
        "DatePicker → DatePicker.css + Popover.css",
        "Barrel retains re-exports only"
      ],
      "Removed full stylesheet imports from all four Notiiv apps"
    ]
  },
  "notiiv": {
    "ko": [
      "BFF 책임 분리",
      "기존: 앱별 처리",
      [
        "Admin · Owner · Status · Support",
        "각 진입점의 요청 검증과 인증 처리",
        "수정 사항의 앱별 반영"
      ],
      "변경: 공유 처리 + 앱 정책",
      [
        "공통 BFF: 경로 검증 · 인증 · 재발급",
        "앱별 훅: 로그인 · 가입 응답",
        "업로드와 공개 경로는 별도 정책"
      ],
      "공통 요청 경계를 유지하면서 제품 정책을 분리"
    ],
    "en": [
      "BFF responsibility split",
      "Before: per-app handling",
      [
        "Admin · Owner · Status · Support",
        "Request validation and authentication per entry point",
        "Apply fixes separately"
      ],
      "After: shared processing and app policy",
      [
        "Shared BFF: validation · auth · refresh",
        "App hooks: login · signup responses",
        "Separate upload and public-route policies"
      ],
      "Shared request boundaries without merging product policies"
    ]
  },
  "document-workspace": {
    "ko": [
      "같은 XLSX 버전의 경쟁 요청",
      "덮어쓰기 방식의 위험",
      [
        "사람과 AI가 버전 12 읽기",
        "사람 저장 → 버전 13",
        "AI의 이전 변경으로 덮어쓰기"
      ],
      "구현한 버전 계약",
      [
        "사람과 AI가 버전 12 읽기",
        "사람 저장 → 버전 13",
        "AI의 버전 12 요청 → 충돌 반환"
      ],
      "먼저 저장한 변경 보존 · 자동 병합하지 않음"
    ],
    "en": [
      "Competing edits on the same XLSX revision",
      "Risk of last-write-wins",
      [
        "Person and AI read revision 12",
        "Person saves → revision 13",
        "Stale AI change overwrites the result"
      ],
      "Implemented revision contract",
      [
        "Person and AI read revision 12",
        "Person saves → revision 13",
        "AI request from revision 12 → conflict"
      ],
      "Preserves the first commit without blind automatic merges"
    ]
  },
  "oddmash-agents": {
    "ko": [
      "같은 커밋에서 CI 재실행을 판정",
      "기존 문제: PR #51",
      [
        "이전 실행 취소",
        "같은 커밋 후속 실행 성공",
        "취소 결과 때문에 리뷰 대기"
      ],
      "수정한 판정",
      [
        "워크플로 · PR · 커밋 비교",
        "교체된 이전 실행만 제외",
        "현재 필수 검사 결과로 판단"
      ],
      "실제 검사 데이터 재생으로 확인"
    ],
    "en": [
      "CI rerun evidence on the same commit",
      "Original issue: PR #51",
      [
        "Earlier run canceled",
        "Replacement succeeds on same commit",
        "Canceled result blocks review"
      ],
      "Corrected decision",
      [
        "Match workflow · PR · commit",
        "Exclude only superseded runs",
        "Evaluate current required checks"
      ],
      "Verified by replaying actual check data"
    ]
  },
  "juliya": {
    "ko": [
      "의미 단위 줄바꿈 예시",
      "일반 줄바꿈 예시",
      [
        "화면의 너비에 맞춰서 자연스럽게 줄",
        "바꿈을 다듬는 웹 라이브러리"
      ],
      "의미 단위 유지 예시",
      [
        "화면의 너비에 맞춰서",
        "자연스럽게 줄바꿈을 다듬는",
        "웹 라이브러리"
      ],
      "설명용 예시이며 실제 결과는 글꼴·너비·언어에 따라 달라짐"
    ],
    "en": [
      "Meaning-aware wrapping example",
      "Ordinary wrapping illustration",
      [
        "A library for natural line breaking that",
        "fits the available width and language"
      ],
      "Meaning-aware illustration",
      [
        "A library for natural line breaking",
        "that fits the available width",
        "and language"
      ],
      "Illustrative only: output depends on font, width and language"
    ]
  },
  "boundra": {
    "ko": [
      "아키텍처 규칙을 검사로 연결",
      "규칙을 문서에만 둘 때",
      [
        "client/list.ts",
        "서버 구현 직접 import",
        "빌드가 성공해도 경계 위반 가능"
      ],
      "Boundra 검사 경로",
      [
        "도메인 manifest → import 분석",
        "BR-001: 브라우저·서버 경계 위반",
        "해당 파일과 줄에 진단"
      ],
      "정적 검사와 런타임 계약을 별도로 유지"
    ],
    "en": [
      "Turn architecture rules into checks",
      "Documentation-only convention",
      [
        "client/list.ts",
        "Direct import of server implementation",
        "Build can still succeed"
      ],
      "Boundra check path",
      [
        "Domain manifest → import analysis",
        "BR-001: browser/server boundary violation",
        "Diagnostic points to file and line"
      ],
      "Static analysis and runtime contracts remain distinct"
    ]
  },
  "owkr": {
    "ko": [
      "공동 편집에서 수정 보존",
      "기존 위험",
      [
        "운영자 A와 B가 같은 목록 편집",
        "A가 저장",
        "B의 이전 목록으로 덮어쓰기"
      ],
      "구현한 비교·갱신",
      [
        "각 요청에 roster revision 포함",
        "Redis에서 비교와 저장을 원자 처리",
        "충돌 시 최신 목록과 미전송 수정 분리"
      ],
      "운영자가 최신 목록에서 변경을 다시 적용"
    ],
    "en": [
      "Preserve edits across operators",
      "Original risk",
      [
        "Operators A and B edit the same roster",
        "A saves",
        "B overwrites with an older roster"
      ],
      "Implemented compare-and-update",
      [
        "Include roster revision in each request",
        "Atomically compare and update in Redis",
        "Separate current roster from unsent edits on conflict"
      ],
      "Operator can reapply intended changes to the current roster"
    ]
  },
  "intranet": {
    "ko": [
      "메일 로딩과 최신 상태",
      "네트워크에만 의존",
      [
        "메일 화면 열기",
        "네트워크 응답 대기",
        "응답 후 표시"
      ],
      "캐시 우선 조회",
      [
        "메일 화면 열기",
        "SQLite 스냅샷 먼저 표시",
        "네트워크 결과로 갱신"
      ],
      "대기 중에도 이전 메일을 읽을 수 있음"
    ],
    "en": [
      "Mail loading and freshness",
      "Network-only path",
      [
        "Open inbox",
        "Wait for network response",
        "Display result"
      ],
      "Cache-first path",
      [
        "Open inbox",
        "Display local SQLite snapshot",
        "Update with network result"
      ],
      "Mail remains readable while waiting"
    ]
  },
  "interaction-inspector": {
    "ko": [
      "키보드 상호작용을 한곳에서 확인",
      "분리된 관찰",
      [
        "포커스된 요소 확인",
        "DOM 이벤트 별도로 확인",
        "동작 사이 관계 추적"
      ],
      "Inspector의 관찰 경로",
      [
        "대상 요소 선택",
        "포커스 상태와 DOM 이벤트 기록",
        "시간 순서로 함께 검토"
      ],
      "Chromium 데모 화면은 본문에서 확인 가능"
    ],
    "en": [
      "Inspect keyboard interactions together",
      "Separate observations",
      [
        "Inspect focused element",
        "Inspect DOM events separately",
        "Trace relationships between actions"
      ],
      "Inspector workflow",
      [
        "Select target element",
        "Record focus state and DOM events",
        "Review together in chronological order"
      ],
      "The Chromium demo capture appears in the case study"
    ]
  },
  "apple-music-discord-presence": {
    "ko": [
      "재생 상태와 비동기 앨범 이미지",
      "문제 상황",
      [
        "곡 A의 이미지 요청",
        "곡 B로 전환",
        "늦게 끝난 곡 A 이미지 응답"
      ],
      "구현한 상태 경계",
      [
        "현재 곡의 텍스트 먼저 게시",
        "이미지 응답의 generation 확인",
        "이전 곡의 응답은 반영하지 않음"
      ],
      "이미지 없이도 재생 상태 게시 유지"
    ],
    "en": [
      "Playback and asynchronous artwork",
      "Problem scenario",
      [
        "Request artwork for track A",
        "Switch to track B",
        "Artwork for track A arrives late"
      ],
      "Implemented state boundary",
      [
        "Publish current text activity first",
        "Check artwork response generation",
        "Ignore earlier track responses"
      ],
      "Playback activity continues without artwork"
    ]
  },
  "jeomjuro": {
    "ko": [
      "관리자 검색 상태",
      "입력과 검색 결과가 섞일 때",
      [
        "검색어 입력",
        "필터 변경",
        "이전 페이지 번호가 남을 수 있음"
      ],
      "분리한 검색 상태",
      [
        "입력 초안과 적용 검색어 분리",
        "필터 변경 시 페이지 초기화",
        "삭제·복원 뒤 관련 목록 갱신"
      ],
      "관리 작업과 화면 상태를 일치시킴"
    ],
    "en": [
      "Admin search state",
      "When input and results are coupled",
      [
        "Enter query",
        "Change filters",
        "Previous page number may remain"
      ],
      "Separated search state",
      [
        "Separate draft and applied query",
        "Reset page on filter change",
        "Refresh related lists after moderation"
      ],
      "Keep moderation actions and visible state aligned"
    ]
  },
  "kivra": {
    "ko": [
      "실행 기록의 공통 계약",
      "분산된 실행 맥락",
      [
        "터미널",
        "VS Code",
        "JetBrains"
      ],
      "공유 실행 기록",
      [
        "시작 · 이벤트 · 완료 공통 형식",
        "Rust에서 수집",
        "프로젝트별 Runs 목록 표시"
      ],
      "각 연동이 독립적으로 발전해도 기록 형식 유지"
    ],
    "en": [
      "Shared execution contract",
      "Scattered execution context",
      [
        "Terminal",
        "VS Code",
        "JetBrains"
      ],
      "Shared run records",
      [
        "Common start · event · completion format",
        "Rust ingestion",
        "Project-level Runs list"
      ],
      "Integrations can evolve independently while preserving the record format"
    ]
  },
  "homepage": {
    "ko": [
      "다국어와 화면 전환의 일관성",
      "문제 상황",
      [
        "언어 변경",
        "오류 화면에 한국어 잔존 가능",
        "연도 전환 시 이전 모션 잔존"
      ],
      "정리한 경계",
      [
        "공통 오류와 콘텐츠의 언어 적용",
        "연도별 표시 내용 정리",
        "이전 GSAP 애니메이션 종료"
      ],
      "콘텐츠와 화면 전환의 상태를 함께 관리"
    ],
    "en": [
      "Localization and transition consistency",
      "Problem scenario",
      [
        "Change language",
        "Error screens may retain Korean copy",
        "Old animation may outlive year change"
      ],
      "Aligned boundaries",
      [
        "Localize shared errors and content",
        "Align year-specific displayed content",
        "Stop previous GSAP animation"
      ],
      "Manage content and transition state together"
    ]
  },
  "marker": {
    "ko": [
      "좌표 선택을 장소 기록으로 연결",
      "지도 좌표만 선택",
      [
        "현재 위치 또는 주소 검색",
        "좌표 선택",
        "기록에 필요한 정보 추가"
      ],
      "두 단계 기록 흐름",
      [
        "감정 선택",
        "제목 · 이야기 · 사진 입력",
        "감정을 마커와 배지에 표시"
      ],
      "지도상의 위치와 기록의 의미를 함께 전달"
    ],
    "en": [
      "Turn a map coordinate into a place entry",
      "Coordinate selection alone",
      [
        "Locate or search address",
        "Select coordinate",
        "Add record information"
      ],
      "Two-step recording flow",
      [
        "Choose emotion",
        "Add title · story · photo",
        "Reflect emotion in marker and badge"
      ],
      "Communicate both location and meaning"
    ]
  },
  "rust-with-typescript": {
    "ko": [
      "언어 개념을 비교하고 실행",
      "문법 설명만 읽을 때",
      [
        "Rust 문법 읽기",
        "기존 TypeScript 개념과 연결",
        "컴파일 결과는 별도로 확인"
      ],
      "비교 학습 구조",
      [
        "TypeScript와 Rust 예제 나란히",
        "문서에 등록된 예제 실행",
        "출력과 컴파일 오류 확인"
      ],
      "14개 챕터의 예제 중심 학습"
    ],
    "en": [
      "Compare concepts and execute examples",
      "Syntax-only reading",
      [
        "Read Rust syntax",
        "Relate it to TypeScript concepts",
        "Check compiler behavior separately"
      ],
      "Comparative learning workflow",
      [
        "Side-by-side TypeScript and Rust examples",
        "Run documented examples",
        "Inspect output and compiler errors"
      ],
      "Example-based learning across 14 chapters"
    ]
  },
  "echo": {
    "ko": [
      "녹음과 연결 상태의 수명",
      "독립적으로 바뀌는 상태",
      [
        "마이크 권한",
        "서버 연결",
        "녹음 상태"
      ],
      "상태를 함께 표현",
      [
        "연결과 녹음 시작·중지 순서 관리",
        "오류 · 연결 종료 구분",
        "서버 검출 결과 화면 표시"
      ],
      "마이크와 화면 상태 불일치 방지"
    ],
    "en": [
      "Recording and connection lifetimes",
      "Independently changing states",
      [
        "Microphone permission",
        "Server connection",
        "Recording state"
      ],
      "Represent state together",
      [
        "Order connection and recording start/stop",
        "Distinguish errors and disconnects",
        "Show server detection feedback"
      ],
      "Avoid divergence between microphone and on-screen state"
    ]
  },
  "chorus": {
    "ko": [
      "음악을 공유 가능한 카드로 변환",
      "입력과 재생",
      [
        "iTunes 곡 검색",
        "앨범 이미지 · 메시지 지정",
        "오디오 미리듣기"
      ],
      "렌더링과 내보내기",
      [
        "3D 바이닐 렌더링",
        "주파수 기반 시각 효과",
        "세로 이미지 저장"
      ],
      "실제 편집과 저장 이미지로 결과 확인"
    ],
    "en": [
      "Transform music into a shareable card",
      "Input and playback",
      [
        "Search iTunes tracks",
        "Set artwork · message",
        "Preview audio"
      ],
      "Rendering and export",
      [
        "Render 3D vinyl",
        "Audio-frequency visual effects",
        "Save portrait image"
      ],
      "Actual editing and saved-image captures show the result"
    ]
  }
};
