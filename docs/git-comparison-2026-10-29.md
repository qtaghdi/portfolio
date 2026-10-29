# Git history and portfolio comparison

Reviewed: 2026-10-29 (Asia/Seoul)

Portfolio base: `15c046a`. Removed old local changes as requested and fast-forwarded main. Other existing project checkouts were not reset or edited. Missing public repositories were cloned under a temporary directory.

15 of 17 repositories were freshly fetched. Notiiv only had a cached remote ref because company SSO rejected fetch; Intranet could not be cloned. Representative non-merge authored commits and their changed files were inspected. Commit counts are not outcome metrics. No external project tests, benchmarks, or operational procedures were rerun. Fixed full SHAs, authorship, reachability, and file lists are in [the audit data](git-comparison-2026-10-29.json).

| Project | Main snapshot | Comparison |
| --- | --- | --- |
| notiiv | `7a6b140d` (cached) | SSO 403. Cached remote ref only; not verified as current. Existing capture retained. [1edef5ed](https://github.com/Bigtablet/bigtablet-notiiv-monorepo-web/commit/1edef5edac15847a15eda1364b1e3b2403ecf846) |
| design-system | `07e7a60f` | Verified authorship and changes for ESM/CSS distribution, CSS motion, and October 27 visual regression checks. Added CI baseline images with historical labels. [3a9c7501](https://github.com/Bigtablet/bigtablet-design-system/commit/3a9c75010f1f0aeae551e2127e7c4b5f1e7a355e) [32972ad7](https://github.com/Bigtablet/bigtablet-design-system/commit/32972ad735ff921c2bfc1fa84867cfb50dd1dc96) [1e66a69c](https://github.com/Bigtablet/bigtablet-design-system/commit/1e66a69c76fddd8651e3d3518f8017ac84d75f6b) |
| homepage | `2b5b365c` | Verified rendering, i18n, and animation cleanup. June 30 static-home replacement means current public design differs from the historical renewal case. Added this distinction instead of claiming the current design as authored work. [08d0f567](https://github.com/Bigtablet/bigtablet-homepage-web/commit/08d0f567e70edb9388cbb9a1b7eb4ef934401720) [cae02df0](https://github.com/Bigtablet/bigtablet-homepage-web/commit/cae02df0c5afa0955cf1488c27b4fafe14fcb33f) [2d20f56f](https://github.com/Bigtablet/bigtablet-homepage-web/commit/2d20f56f2d1b35d8f860832151527702dc411297) |
| intranet | SSO blocked | SSO 403 prevented clone. Previous evidence and capture retained; excluded from fresh Git comparison.  |
| document-workspace | `6251b78f` | Current README still says private local XLSX alpha. Inspected validation display-attribute preservation and browser-control follow-ups. Existing October 12 performance records were not rerun. [78caeda6](https://github.com/qtaghdi/document-workspace/commit/78caeda6d8f3ec225ddeb9cae8548d63bedcc8c5) [6c740d6c](https://github.com/qtaghdi/document-workspace/commit/6c740d6c4a7fd69060e1bc4d11b8f8a2f1e81eda) |
| boundra | `a0d82ec6` | Inspected v0.6.0 nested-domain discovery, path validation, and package-import alias resolution. Added the feature scope while retaining July performance figures as historical. [59940b3b](https://github.com/qtaghdi/boundra/commit/59940b3b17c216fe02c216be6d2d747c60bc848b) [c73d99a5](https://github.com/qtaghdi/boundra/commit/c73d99a5ae782495591efad0f0bc3ffa35dd4603) [7d785262](https://github.com/qtaghdi/boundra/commit/7d78526249be79435b47f88d58a302098418ae27) |
| jeomjuro | `ec1b670d` | Reviewed main and develop separately. Editor follow-up is on develop; merging there is not proof of production deployment. Existing attribution boundary retained. [c76035f1](https://github.com/winwin1010/winwin_front04/commit/c76035f14a24f7b7a8124d3c15dc0ac81f90641e) [21fe4437](https://github.com/winwin1010/winwin_front04/commit/21fe44371251dc2cee5bd87a02089332948bed6f) |
| marker | `c18741c5` | Authored commit messages are weak evidence; inspected changed files without treating commit totals as impact. Award remains prior owner-confirmed evidence. Map environment not launched. [b75c3d90](https://github.com/highthon-12/marker-web/commit/b75c3d908a93faa85d887a7ce4288a397bab6d74) [c18741c5](https://github.com/highthon-12/marker-web/commit/c18741c51108af797b30d5c857a84436598f5e63) |
| echo | `890bd7ff` | Inspected authored group UI and creation changes. Native app and voice server not rerun. [890bd7ff](https://github.com/Team-JackOLantern/echo-app/commit/890bd7ff9d47ed726bf89dac803290701abb9eb3) [d55822a9](https://github.com/Team-JackOLantern/echo-app/commit/d55822a91209f1484e8999f736f0639314ce3643) |
| rust-with-typescript | `9f9d96ac` | Verified chapter numbering and SEO changes. Captured public Korean chapter and English home. Execution sandbox not reverified. [23386d4e](https://github.com/qtaghdi/rust-with-typescript/commit/23386d4e70b02a4b24417b4913ba4b17350ba442) [762b934d](https://github.com/qtaghdi/rust-with-typescript/commit/762b934dd894f8c74d341e7fdb64d8e3afa473ab) |
| chorus | `232169f2` | Verified mobile playback and image-download changes. Captured public search entry and original local 3D UI with demo metadata/artwork. Search API returned no results; no API/audio verification claimed. [232169f2](https://github.com/qtaghdi/chorus/commit/232169f21830402f6e0e5dfabee7b8b16ed6ed08) [36e118a0](https://github.com/qtaghdi/chorus/commit/36e118a06e74c7fd8d051cf339df5edcd31b4001) |
| owkr | `91d78631` | Verified collaboration and presence work against current source. Ran actual local team assignment with ten synthetic participants and browser-local auth/user-sheet fixtures. No production writes. [6208942e](https://github.com/Overwatch-KR/owkr-balance/commit/6208942e48f44c32fb9c3b6ea24d201aff0fc523) [7fb3cf75](https://github.com/Overwatch-KR/owkr-balance/commit/7fb3cf75487162d436843888c0dcafe5e8249060) |
| owkr-exam | `c0e25a84` | Inspected answer-state and server time-control changes. No live exam or production login performed. [bc104e78](https://github.com/Overwatch-KR/owkr-exam/commit/bc104e783813ad11263244d9a5fa912d575d6f7e) [0a38521f](https://github.com/Overwatch-KR/owkr-exam/commit/0a38521f542409a2a5efa813209425e1ae8df188) |
| owkr-gather-bot | `db64aba4` | Inspected October 29 erasure-recovery tests and live-backup verification record. Added explicit manual reapplication requirement; no automatic replay claimed. Tests/production procedures not rerun. [ae880a7e](https://github.com/Overwatch-KR/owkr-gather-bot/commit/ae880a7ef65c2d15850fca727e456711b0f0a62f) [b64e749c](https://github.com/Overwatch-KR/owkr-gather-bot/commit/b64e749c1c12dbe35e68aba0baac499a3a0b46d6) |
| owkr-docs | `e5e06c08` | Inspected policy/backup documentation changes and captured the public guide. [2df38a92](https://github.com/Overwatch-KR/owkr-docs/commit/2df38a92e641de3ef00bece2120e92d1d3eac282) [ca2a955c](https://github.com/Overwatch-KR/owkr-docs/commit/ca2a955c7eebd4a396591d8fb718a00fd6b59744) |
| kivra | `1ee244aa` | Inspected authored capture protocol and desktop module separation. Prototype status retained; no native capture claimed. [87ad53be](https://github.com/Kivra-App/Kivra/commit/87ad53be7179c6c767dfcb4d1ff0bf343dee3f47) [7c9b5f66](https://github.com/Kivra-App/Kivra/commit/7c9b5f66c48246669069d5b71134fd64fa5b0b17) |
| apple-music-discord-presence | `81cc2f87` | Verified 0.7.0 and Windows icon/installer changes. Original Discord capture retained. [317967ac](https://github.com/qtaghdi/apple-music-discord-presence/commit/317967ac889f11c56a848d855be33d0c2625ff26) [6056c999](https://github.com/qtaghdi/apple-music-discord-presence/commit/6056c99961fd77b120f63d509152ee35297cffc8) |

## Screenshot provenance

Seven fresh product captures and two unchanged CI baseline PNGs were added. Captions distinguish live public pages, local demo data, and historical test baselines in Korean and English.

- OWKR Match: checkout `91d7863`, Vite frontend. Browser-local auth and empty user-sheet responses, synthetic participants stored locally, then the actual assignment button executed. All API traffic was intercepted locally. No production participant records or notes used.
- Chorus: clone `232169f`. A temporary server-loader branch only for `/track/portfolio-demo` returns demo metadata and an original SVG cover. UI and 3D renderer are unchanged. Public search returned no results, so this is not evidence of API success or audio playback. The public search entry was captured separately.
- Rust docs, OWKR Docs, and Storybook tokens: captured from public services. Their deployed SHA was not exposed and is not assumed equal to the clone SHA.
- Button light/dark references: original PNG bytes extracted from design-system `07e7a60f`, initially added by `45575d93`. These are historical CI baselines, not a fresh test result.
- Homepage: current public design differs from the historical Next.js implementation. No new image attributed to that renewal was added.
- Jeomjuro, Marker, Echo, Kivra: authentication, map keys, or native runtime were not established; no substitute mock screen was published as an actual capture.
- Existing Notiiv, Intranet, document editor, Storybook, and Discord captures remain unchanged.

## Copy updated

Korean and English cases now include design-system visual regression work, Boundra nested-domain discovery, OWKR erasure/restore verification boundaries, and the homepage implementation-period distinction.

## Inline layout and verification

All 14 original screenshots across eight projects now appear inside the relevant explanatory sections in both languages. No separate screenshot gallery is appended to the evidence links. Each image preserves its aspect ratio, includes a source/demo caption, and links to the original image.

- Static build: 30 routes passed.
- Browser checks: 42 passed on desktop and mobile, including Korean and English placement, original file hashes, natural dimensions, rendered aspect ratio, navigation, and overflow.
- Existing data checks: six profile tests and one localized social-image test passed.
- Reading-flow captures: [OWKR desktop](design/evidence-2026-10-29/owkr-1440.png), [design system desktop](design/evidence-2026-10-29/design-system-1440.png), [Chorus mobile](design/evidence-2026-10-29/chorus-390.png), [Rust guide mobile](design/evidence-2026-10-29/rust-with-typescript-390.png).

The detail-page dot rail was replaced with a text contents list. On desktop it sticks beside the article and stops at the article boundary; on compact layouts it becomes a sticky horizontal text list. The current section updates `aria-current` and visible emphasis during scrolling. The global 100px anchor padding is accounted for so clicking a section also selects it. After that adjustment, all six targeted navigation, sticky-boundary, active-section, language, and layout tests passed on desktop and mobile. [Desktop contents](design/evidence-2026-10-29/contents-1440.png), [mobile contents](design/evidence-2026-10-29/contents-390.png).

## Editorial follow-up

OWKR is now a fourth featured case alongside the existing company and independent work. Its visible narrative follows participant identity, collaborative editing, exams, recruitment, and operations. Detailed test and backup conditions are in native expandable notes. Document-workspace and Boundra also separate their main outcome from historical test and benchmark conditions. Korean and English are aligned, and screenshot captions use shorter descriptions.

The initial Chorus limitation above is superseded by the [local repair and verification](chorus-repair/README.md). The Korean catalog returned no matches while the US catalog returned tracks. Search and lookup now share a regional fallback in the reviewable patch. Actual playback and a PNG export passed in the local app. The public deployment has not been changed, so its direct service link is withheld from the portfolio. Updated search/editor captures and the original exported card are explicitly local-app material; the search capture uses the recorded successful API response. No repaired public deployment is claimed.

Final verification: 30 static routes built, all 44 browser checks and seven existing data checks passed. Manual Korean/English desktop/mobile checks confirmed the collapsed notes open and close, four featured projects render, and the exported card is displayed without upscaling. Local Chorus has three passing catalog tests, a passing build, and zero type-check errors (one pre-existing Studio initialization warning).
