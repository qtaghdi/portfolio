# Portfolio evidence register

최근 내용 검토일: 2026-10-29 (Asia/Seoul). 아래 과거 스냅샷은 당시 기록이며 최신 상태와 구분합니다.

최신 Git 대조: [17개 저장소 검토와 화면 출처](git-comparison-2026-10-29.md). 15개는 원격 최신 참조를 받았고, Notiiv·인트라넷은 회사 SSO 제한을 명시했다. 신규 화면 7장과 과거 CI 기준 이미지 2장을 추가했다. 성능 수치나 외부 프로젝트의 테스트는 이번에 재실행하지 않았다.

이 문서는 포트폴리오에 적은 주장과 근거를 분리해 관리하기 위한 내부 기록이다. 커밋 수는 작업 참여 범위를 탐색하는 색인으로만 사용하며, 사용자 성과나 생산성 지표로 공개하지 않는다.

## Measurement policy

- 공개 수치는 동일 저장소에서 다시 실행하거나 파일·문서로 확인할 수 있어야 한다.
- 시간 측정은 하드웨어, OS, 런타임, fixture와 날짜를 함께 기록한다.
- 테스트 파일 수와 코드 파일 수는 품질이나 임팩트로 해석하지 않고 저장소 규모를 설명하는 보조 자료로만 사용한다.
- 회사 프로젝트는 고객, 조직, 매출, 트래픽과 실제 내부 화면을 공개하지 않는다.
- 분석·대시보드 원본이 없는 개선율은 공개하지 않는다.

## Public evidence

| Project | Claim | Source | Reproduction / snapshot | Confidence |
| --- | --- | --- | --- | --- |
| Notiiv | 4 frontend apps | `bigtablet-notiiv-monorepo-web/apps` | first-level directories: admin, owner, status, support | High |
| Notiiv | 13 shared packages | `bigtablet-notiiv-monorepo-web/packages` | first-level directory count on 2026-08-25 | High |
| Notiiv | 90%+ shared package test coverage | shared package coverage report | user-confirmed update on 2026-08-25 | User-confirmed |
| Design System | 40+ public components | `bigtablet-design-system/README.md` | public README capability statement | High |
| Design System | 11 token domains | `bigtablet-design-system/README.md` | public README and `src/styles` | High |
| Design System | 68 Storybook story files | `bigtablet-design-system/src` | count `*.stories.tsx`, `*.stories.ts`, `*.stories.mdx` | High |
| Intranet | 19 test files | `bigtablet-intranet-app/test` | count `*_test.dart` on 2026-08-05 | Medium: scope only |
| document-workspace | 400,000-cell release profile | `document-workspace/docs/release-evidence/xlsx-performance-2026-10-12.md` | 4 sheets, 1,000 by 100, darwin-arm64 | High |
| document-workspace | 1,000-cell commit in 287.74ms | `document-workspace/docs/release-evidence/xlsx-performance-2026-10-12.md` | release profile, Go 1.25.0 | High |
| document-workspace | X-01 to X-06 safety gates passed | `document-workspace/docs/release-evidence/xlsx-safety-2026-10-12.md` | race detector and frontend recovery tests | High |
| Boundra | 10,000 files / 164.20ms warm median | `boundra/docs/performance.md` | darwin-arm64, Node 24.14.0, baseline 2026-07-03 | High |
| Boundra | 2,559 normalized imports, 0 missing / 0 extra | `boundra/docs/dogfooding-notes.md` | comparison with TypeScript 6 `preProcessFile` on a 773-file snapshot | High |
| OWKR Balance | 운영진 내부 실사용 | user confirmation, `owkr-match/README.md` | 실사용 상태를 2026-08-05에 교정 | User-confirmed |
| OWKR Gather Bot | 18-user concurrent reaction scenario | `owkr-gather-bot/README.md`, tests | 개발 자동 시나리오이며 실제 운영에는 미도입 | High |
| Marker | 제12회 하이톤 대상 | user confirmation and project record | award label corrected on 2026-08-05 | User-confirmed |

## Commit trace: internal only

Authored commit counts below use unique SHAs across all local refs and the known author aliases `Engy Park`, `박상민`, `상만`. They include merges and do not represent impact.

| Repository | Unique authored SHAs | Representative trace |
| --- | ---: | --- |
| bigtablet-notiiv-monorepo-web | 1,964 | `1edef5e` external BFF redirect rejection; `ed0fd08` WebAuthn hydration/support handling; `0475593` PDF viewer edge cases |
| bigtablet-design-system | 1,128 | `506ce12` theme-aware brand fills; `c595e39` viewport-aware overlay positioning; `9ab8876` focus-trap and rAF review fixes |
| bigtablet-intranet-app | 362 | `47ae19d` mail cache-then-network; `b6d1c7e` approval notification deep link; `7a67652` bulk failure and stale response handling |
| boundra | 68 | `d76515c` reproducible CLI benchmark; `ed5d390` real-repository parser hardening; `9367198` framework paths and dependency integrity |
| owkr-balance (local: owkr-match) | 123 | `3abd0a1` participant workspace; `9aa7171` result charts and link states; `3571128` admin matching guide |
| owkr-gather-bot | 16 | `0864d1f` concurrent match workflows; `a725dd6` concurrent operation tests; `67ffc44` substitute recruitment |
| marker-web | 9 | repository contribution trace; commit messages are too weak to use as public evidence |

## Removed or pending claims

| Claim | Status | Reason / next evidence |
| --- | --- | --- |
| 100% BFF test coverage | Removed | source report was not found outside the previous portfolio copy |
| LCP 5.22s → 0.36s / 93% | Removed | Lighthouse or analytics record was not found |
| Design system 0 runtime dependencies | Removed | current v3.7.0 package has `@react-spring/web` as a runtime dependency |
| Homepage build 4m38s → 2m28s | Keep off flagship surfaces | preserve only if CI runs or logs can be linked |
| Business/user outcomes | Pending | add team size, release date, user volume, support-ticket or task-time changes when disclosure is approved |

## Update routine

1. Before publishing a new numeric claim, add its source and reproduction context here.
2. Re-run repository counts on a fixed commit and record the SHA if the number appears publicly.
3. For benchmarks, compare the same fixture on the same class of hardware; never combine results from different environments as an improvement percentage.
4. Review company-project disclosure with the relevant owner before adding screenshots or internal metrics.

## 2026-10-26 copy revision

- 디자인 시스템 대표 사례는 본인 명의 커밋 `3a9c750`의 컴포넌트별 ESM·CSS 배포와 `32972ad`의 CSS 모션 전환으로 교체했다. 과거 spring 기반 설계를 현재 상태처럼 소개하던 본문을 수정했다.
- Notiiv의 네 앱이 디자인 시스템 패키지를 참조하는 것을 로컬 package.json에서 확인했다. 사용자 수나 독립적인 고객사 수를 뜻하지 않는다.
- 90% 커버리지는 현재 전체 제품의 측정 결과로 재검증하지 않았다. 대표 화면에는 API 패키지의 커버리지 임계값 90%로 구분해 표기한다. 과거 사용자 확인 기록은 위 표에 보존한다.
- Boundra 공개 README 기준 BR-001부터 BR-006까지 여섯 규칙으로 갱신했다. 기존 벤치마크는 과거 기록이며 이번 작업에서 다시 실행하지 않았다.
- document-workspace는 GitHub 저장소 목록에서 private로 확인했다. 공개 저장소라는 표현과 production 상태를 암시하는 배지를 교체했다. 기존 검증 수치는 프로젝트에 기록되어 있던 값이며 이번에 재실행한 수치가 아니다.
- OWKR 서비스 이름은 OWKR Match로 정리했다. README에 따라 마이크는 참가 필수 조건이며 선택적인 팀 배정 변수로 설명하지 않는다.

## Design concept delivery

`docs/design/clean-v1/index.html`은 Image Gen 시안 네 개를 포함한 독립적인 디자인 검토 문서다. 생성 프롬프트는 동일 폴더의 `prompts.md`에 기록한다. 초기 구상 단계에서 한·영 소개와 내용을 먼저 수정했다. 이후 사용자 승인에 따라 시안의 레이아웃과 스타일을 적용하고 주요 작업의 실제 아이콘을 추가했다. 검증 기록은 `docs/design/clean-v1/verification.md`에 있다.
