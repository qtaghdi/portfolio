# Project screenshot checklist

검토 기준일: 2026-08-25 (Asia/Seoul)

포트폴리오 상세 페이지에 실제 제품 화면을 추가하기 위한 준비 목록이다. 스크린샷은 기능 설명을 반복하기보다 프로젝트의 범위와 완성도를 증명하는 화면을 우선한다.

## Capture guidelines

- 가능하면 브라우저 UI를 제외하고 제품 영역만 캡처한다.
- 데스크톱 화면은 1600px 이상의 원본 너비를 권장한다.
- 모바일 화면은 기기 프레임 없이 원본 해상도로 준비한다.
- PNG 또는 WebP 형식을 사용한다.
- 실제 고객, 조직, 이메일, Discord 계정, 매출 데이터는 데모 값으로 교체하거나 가린다.
- 같은 프로젝트에 여러 장을 추가할 때는 화면 비율과 배경 톤을 통일한다.
- 파일명은 아래 제안 경로를 사용한다.

## Priority 1

### Notiiv

- [x] 고객지원 메인 화면
  - 현재 파일: `public/projects/notiiv/img.png`
  - 현재 상태: 원본 추가 완료, 포트폴리오 렌더링 연결은 별도 작업 필요
- [ ] Admin의 FAQ 편집 또는 사용자 관리 화면 (선택)
  - 제안 경로: `public/projects/notiiv/admin.png`
- [ ] Owner 대시보드 화면 (선택)
  - 제안 경로: `public/projects/notiiv/owner.png`
- [ ] Service Status 화면 (선택)
  - 제안 경로: `public/projects/notiiv/status.png`

### Bigtablet Design System

- [ ] Storybook 전체 화면
  - 제안 경로: `public/projects/design-system/storybook-overview.png`
- [ ] 디자인 토큰과 컴포넌트 상태가 함께 보이는 화면
  - 제안 경로: `public/projects/design-system/tokens-components.png`
- [ ] Sidebar와 BottomNav의 반응형 비교
  - 제안 경로: `public/projects/design-system/responsive-navigation.png`
- [ ] Dark theme 화면 (선택)
  - 제안 경로: `public/projects/design-system/dark-theme.png`

### Jeomjuro

- [ ] Consumer 메인 화면
  - 제안 경로: `public/projects/jeomjuro/consumer-home.png`
- [ ] Admin 검색 또는 모더레이션 화면
  - 제안 경로: `public/projects/jeomjuro/admin-moderation.png`
- [ ] 알림 목록 또는 이미지 개선 대시보드
  - 제안 경로: `public/projects/jeomjuro/notification-or-dashboard.png`
- [ ] Storybook 또는 디자인 시스템 화면 (선택)
  - 제안 경로: `public/projects/jeomjuro/storybook.png`

### Bigtablet Intranet

- [ ] 모바일 홈 화면
  - 제안 경로: `public/projects/intranet/home.png`
- [ ] 메일 또는 전자결재 화면
  - 제안 경로: `public/projects/intranet/mail-or-approval.png`
- [ ] 알림에서 상세 화면으로 진입한 상태
  - 제안 경로: `public/projects/intranet/notification-deep-link.png`

## Priority 2

### Marker

- [ ] 지도와 감정 마커가 함께 보이는 메인 화면
  - 제안 경로: `public/projects/marker/map.png`
- [ ] 장소 상세 또는 등록 바텀시트
  - 제안 경로: `public/projects/marker/bottom-sheet.png`

### Chorus

- [ ] 음악 검색과 3D 바이닐 화면
  - 제안 경로: `public/projects/chorus/vinyl.png`
- [ ] 최종 공유 이미지
  - 제안 경로: `public/projects/chorus/export.png`

### OWKR Balance

- [ ] 팀 배정 결과 화면
  - 제안 경로: `public/projects/owkr/team-result.png`
- [ ] 선수 교체 또는 운영 흐름 화면 (선택)
  - 제안 경로: `public/projects/owkr/operator-flow.png`
- Discord 닉네임과 개인 메모는 반드시 익명 처리한다.

## Optional

### Echo

- [ ] 녹음 상태와 실시간 감지 결과 화면
  - 제안 경로: `public/projects/echo/recording.png`
- [ ] 그룹 통계 화면
  - 제안 경로: `public/projects/echo/statistics.png`

### Boundra

현재 터미널 비주얼로 핵심 기능이 전달된다. 실제 스크린샷을 추가한다면 규칙 위반과 수정 위치가 한 화면에 보이는 결과를 우선한다.

### Bigtablet Homepage

라이브 사이트와 현재 대표 비주얼이 있어 우선순위가 낮다. 추가한다면 반응형 메인 화면이나 다국어 비교 화면이 적합하다.

### Kivra

프로토타입 단계이므로 실제 화면이 제품 완성도를 과장하지 않을 때만 추가한다.

### Rust with TypeScript

문서와 브라우저 실행 결과가 한 화면에 보이는 캡처가 있다면 선택적으로 추가한다.

## Integration status

스크린샷 파일이 추가되면 아래 항목을 함께 처리한다.

1. `ProjectVisual.astro` 또는 프로젝트 MDX에서 이미지 경로를 연결한다.
2. 한국어와 영어 대체 텍스트를 작성한다.
3. 데스크톱과 모바일에서 잘리지 않는지 확인한다.
4. 이미지 용량을 최적화한다.
5. `pnpm build`로 정적 페이지 생성을 검증한다.
