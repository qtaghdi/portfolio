# Contribution audit

Checked on 2026-10-26. Scope: project attribution, authored implementation, and OWKR repository coverage.

## Attribution

- Company: Bigtablet Design System, Notiiv, Bigtablet Homepage Renewal, Bigtablet Intranet.
- Personal: document-workspace, Boundra, Rust with TypeScript, Chorus.
- Collaborative: OWKR, Jeomjuro, Kivra, Marker, Echo.
- Company affiliation comes from the owner's correction. Authorship does not establish sole ownership of a company product.

## Evidence used

| Project | Evidence | What it establishes |
| --- | --- | --- |
| OWKR Match | [PR #10](https://github.com/Overwatch-KR/owkr-balance/pull/10), [PR #17](https://github.com/Overwatch-KR/owkr-balance/pull/17) | qtaghdi authored shared roster editing, atomic revision checks, polling presence and associated tests. Other contributors' merged changes establish a shared codebase. |
| OWKR Exam | [PR #4](https://github.com/Overwatch-KR/owkr-exam/pull/4), [PR #5](https://github.com/Overwatch-KR/owkr-exam/pull/5), repository README | Server time controls and regression checks, separation of test attempts, implemented and deployed exam workflow. No adoption scale established. |
| Gather Bot | [Authored implementation commit](https://github.com/Overwatch-KR/owkr-gather-bot/commit/67ffc442960669e36c1ea4cc386d51b3f7ca7ec2), README and source tree | Session actor, SQLite recovery, substitute recruitment and lobby assignment changes. Development and testing status, not adopted. |
| OWKR Docs | [Participation commit](https://github.com/Overwatch-KR/owkr-docs/commit/c26f43a94b24e8f4c22baa3b94150fdf297bc3cd), [notification rules](https://github.com/Overwatch-KR/owkr-docs/commit/fa385f6b0d872a4a217c61eb8d7f584987709a98), README | Astro operations documentation and authored guidance maintenance. |
| Jeomjuro | Private PRs [#262](https://github.com/winwin1010/winwin_front04/pull/262), [#273](https://github.com/winwin1010/winwin_front04/pull/273), [#310](https://github.com/winwin1010/winwin_front04/pull/310) | qtaghdi authored limited notification/auth BFF, admin moderation and shared UI, editor changes. Merged into develop, not proof of production deployment. |
| Kivra | [PR #1](https://github.com/Kivra-App/Kivra/pull/1), [PR #4](https://github.com/Kivra-App/Kivra/pull/4), collaborator [PR #2](https://github.com/Kivra-App/Kivra/pull/2) | Capture contract/integrations and module split, followed by another contributor's storage integration change. Prototype status. |

GitHub connector could not access the private Jeomjuro repository; authenticated local GitHub CLI could. Only high-level implementation descriptions and permission-gated PR links are included, without private source or operational data.

## OWKR coverage

Organization listing contains owkr-balance, owkr-exam, owkr-gather-bot, owkr-docs, .github, and owkr-scrim-workshop. The first four are grouped in one case, with distinct implementation and adoption status. The .github profile is an entry point, not a separate product. The workshop README describes OverPy source in preparation; excluded according to the owner's request.

## Claim boundaries

Commit totals, line totals and contribution percentages are not used as ability scores. Checked Match and Kivra review endpoints did not establish human code review, persuasion or team decision-making. Merged contributions establish shared implementation, not interpersonal process. Existing bot test descriptions and regression files were inspected, but the external projects' test suites were not rerun for this audit. Match operational use is an existing owner-supplied claim, not new telemetry. The unverified homepage build-time metric was removed from metadata.

Both Korean and English cases share source links. Existing OWKR route remains /projects/owkr/ to retain inbound navigation.

## Detailed case-study expansion, 2026-10-26

The main list stays concise. Four detail cases now explain concrete failure scenarios, responsibility boundaries, choices and costs, validation scope, and next evidence. Korean and English include matching subheadings.

- Design System: local authored commits `3a9c750`, `32972ad`, plus follow-up `ea67630` and `2d63f3c` in the design-system repository. Inspected build-modules.mjs, use-presence.ts and its tests, token generation, and MIGRATION.md. Explained why splitting CSS without removing barrel side effects is insufficient, why animation and mount lifetime differ, and why consumer settings remain necessary. Migration documentation contains size observations, but no new bundle improvement percentage was published without a matched report.
- Notiiv: local authored commits `8fe8506`, `1d5144c`, `0c34526`, `1edef5e`, `b4f5131`, and `3a17003`. Inspected shared proxy implementation, owner route policy, path/origin tests, API coverage configuration, and calendar tests. Four apps and 13 packages still match the local directory structure. Claims distinguish app policy from common infrastructure and rejection status from preventing upstream calls. No whole-product coverage or operational savings claim was added.
- document-workspace: connected GitHub README, architecture, engine ADR, and the safety and performance reports dated 2026-10-12 were read again. The ADR explicitly compares Univer, ONLYOFFICE and custom implementation. The safety report candidate is `393411c324e08a1cf07c2185cf4e8c8ce02a13b7`; performance candidate is `54a08bce7fc59fda499fa74261738ce109262b72`. Recorded values are historical single-workload observations, not a fresh run or general latency guarantee. Current status is private local XLSX alpha. Preserved remaining native Excel, external-use, uncooperative-writer and filesystem boundaries.
- OWKR: inspected the actual PR #10 patches, including Redis Lua compare-and-update, the client conflict handler, ID-based hydration, polling guards, and contract/store tests. The store test uses a Redis test double, so the page explicitly avoids presenting it as a real Redis concurrency test. The explanation describes the PR implementation, not a measured conflict rate or a claim of automatic merge. Exam, Gather Bot and Docs remain in the same multi-tool case.

Engineering rationales are derived from the implementation and failure modes. The engine comparison has an explicit ADR. None of the other explanations invents a historical team discussion, user interview, benchmark, or rejected prototype. External project suites and benchmarks were not rerun during this content expansion.

## External open-source contributions, 2026-10-26

A small bilingual section now follows the project list. It contains accepted external work rather than open proposals or the owner's own repositories.

- OverPy PR #476: merged on 2026-09-09. Inspected the changed data model, LSP completion/hover/signature handling, language setting and localization tests. The maintainer's comments requested localization in source data rather than postprocessing and separation of Workshop and documentation languages; the author's replies and final patch reflect that change. The maintainer confirms release in 9.7.16, and the release notes list localized LSP documentation support. The copy does not imply all existing descriptions were translated to Korean.
  - PR: https://github.com/Zezombye/overpy/pull/476
  - Feedback: https://github.com/Zezombye/overpy/pull/476#issuecomment-5463006801
  - Release: https://github.com/Zezombye/overpy/releases/tag/v9.7.16
- Pretext PR #24: closed without merge. The maintainer explicitly adopted the proposed material as a second Korean corpus in commit 08a5ba080045538d9c3ff63fcf01cd5abee34c1e, whose message credits Engy Park with the qtaghdi GitHub address. The copy distinguishes the original replacement proposal from the upstream addition and does not attribute the maintainer's benchmark runs to the contributor.
  - PR: https://github.com/chenglou/pretext/pull/24
  - Commit: https://github.com/chenglou/pretext/commit/08a5ba080045538d9c3ff63fcf01cd5abee34c1e
- Axios docs PR #320: one Korean example-heading wording correction, merged on 2026-02-27. Presented as a secondary documentation link, not an architectural contribution.
  - PR: https://github.com/axios/axios-docs/pull/320

Next.js PR #91883 and GitRank PR #5 are open and are omitted from the accepted-contribution section. OverPy PR #477 is merged data localization, but is not needed as another highlighted row. No new upstream tests or benchmarks were run during portfolio editing.
