# Project screenshot checklist

검토 기준일: 2026-10-29 (Asia/Seoul)

이번 Git 대조와 촬영 출처는 [최신 검토 기록](git-comparison-2026-10-29.md)에 있다. 신규 이미지 9장을 연결했으며, 공개 화면 촬영·로컬 데모·과거 CI 기준 이미지를 캡션으로 구분한다.

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
  - 현재 상태: 원본 화면을 포트폴리오 홈과 상세 페이지에 연결 완료
- [ ] Admin의 FAQ 편집 또는 사용자 관리 화면 (선택)
  - 제안 경로: `public/projects/notiiv/admin.png`
- [ ] Owner 대시보드 화면 (선택)
  - 제안 경로: `public/projects/notiiv/owner.png`
- [ ] Service Status 화면 (선택)
  - 제안 경로: `public/projects/notiiv/status.png`

### Bigtablet Design System

- [x] Storybook 전체 화면
  - 현재 파일: `public/projects/design-system/storybook-overview.png`
  - 현재 상태: 로컬 Storybook의 Introduction 화면을 원본 크기로 캡처해 연결 완료
- [x] 디자인 토큰과 적용 예시가 함께 보이는 화면
  - 현재 파일: `public/projects/design-system/tokens-components.png`
  - 공개 Storybook의 Semantic Colors 화면을 촬영해 연결했다.
- [ ] Sidebar와 BottomNav의 반응형 비교
  - 제안 경로: `public/projects/design-system/responsive-navigation.png`
- [x] 라이트·다크 테마의 Button 상태
  - 현재 파일: `public/projects/design-system/button-light-reference.png`, `button-dark-reference.png`
  - 2026-10-27 CI 기준 이미지를 원본 그대로 연결했다. 새 테스트 실행 결과는 아니다.

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

- [x] 모바일 홈 화면
  - 현재 파일: `public/projects/intranet/home.png`
  - 현재 상태: integration fixture로 실행한 실제 홈 화면을 캡처해 연결 완료
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

- [x] 음악 검색 진입과 3D 바이닐 화면
  - 현재 파일: `public/projects/chorus/search.png`, `vinyl.png`
  - 최신 화면은 지역 카탈로그 대체 조회를 수정한 로컬 앱이다. 검색 화면은 성공한 실제 API 응답 기록을 사용하고, 편집기는 실제 곡 정보를 조회해 촬영했다. 로컬에서 미리 듣기와 PNG 다운로드까지 확인했다.
- [x] 최종 공유 이미지
  - 현재 파일: `public/projects/chorus/export.png`
  - 지역 카탈로그 대체 조회를 수정한 로컬 앱에서 실제 곡을 선택하고 저장한 PNG 원본이다. 공개 서비스의 배포 상태와는 구분한다.

### OWKR Balance

- [x] 팀 배정 결과 화면
  - 현재 파일: `public/projects/owkr/team-result.png`
  - 로컬 앱에 가상 참가자 10명을 입력하고 실제 팀 배정을 실행했다.
- [x] 공개 운영 가이드
  - 현재 파일: `public/projects/owkr/operations-guide.png`
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

현재 터미널 비주얼은 원본 캡처가 없는 재현 화면으로 명시했다. 실제 스크린샷을 추가한다면 규칙 위반과 수정 위치가 한 화면에 보이는 결과를 우선한다.

### document-workspace

- [x] XLSX 편집기 실제 화면
  - 현재 파일: `public/projects/document-workspace/editor.png`
  - 현재 상태: LibreOffice compatibility fixture를 실제 앱에서 열어 캡처하고 연결 완료

### Bigtablet Homepage

라이브 사이트와 현재 대표 비주얼이 있어 우선순위가 낮다. 추가한다면 반응형 메인 화면이나 다국어 비교 화면이 적합하다.

### Kivra

프로토타입 단계이므로 실제 화면이 제품 완성도를 과장하지 않을 때만 추가한다.

### Rust with TypeScript

- [x] 한국어 Ownership·Borrowing 챕터와 영어 홈
  - 현재 파일: `public/projects/rust-with-typescript/ownership.png`, `home.png`
  - 공개 문서를 촬영했다. 코드 실행 결과의 검증은 포함하지 않는다.

## Integration status

스크린샷 파일이 추가되면 아래 항목을 함께 처리한다.

1. `project-screens.ts`에 출처·크기·국문·영문 캡션을 등록하고, MDX 본문의 관련 문단에 `ProjectScreenshot`을 배치한다. 영문은 같은 설명 위치에 연결한다.
2. 한국어와 영어 대체 텍스트를 작성한다.
3. 데스크톱과 모바일에서 잘리지 않는지 확인한다.
4. 이미지 용량을 최적화한다.
5. `pnpm build`로 정적 페이지 생성을 검증한다.

## Automated fidelity audit

`pnpm visual:audit`는 원본 화면 파일의 해시와 크기, 실제 렌더링 경로, `object-fit: contain`, 필터와 변형 미사용, 데스크톱과 모바일 오버플로를 검사한다. GitHub Actions에서도 pull request와 main push마다 같은 검사를 실행한다.
