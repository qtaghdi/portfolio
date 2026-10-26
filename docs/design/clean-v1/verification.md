# Clean portfolio implementation review

Reviewed on 2026-10-26, Asia/Seoul.

## Accepted references

- `01-hero.png`: first viewport and opening work row.
- `02-work.png`: open project rows and a compact secondary list.
- `03-about-contact.png`: short introduction, career, technologies and contact.
- `04-project-detail.png`: reading column, contents, decision narrative and evidence.

The user accepted the direction and requested actual project favicons next to main project titles. Icons were added at 24 by 24 CSS pixels, without an extra background, border or shadow. No icon was invented for document-workspace.

## Implementation and fixes

| Comparison | Reference direction | Final implementation |
| --- | --- | --- |
| First-viewport copy | Name, frontend role, two supporting sentences, work and GitHub links | Same visible copy and link order, no added hero pretitle or focus panel |
| Layout | One quiet content column, open rows rather than cards | 1080px content maximum; no large homepage product mockups or nested cards |
| Typography | Restrained Korean sans serif, clear title/body hierarchy | Local Pretendard, 56px desktop hero, 32px section headings, 17-18px body text; mobile title 30-36px |
| Palette | White, near-black, neutral gray and cobalt links | #ffffff, #18181b, #52525b, #e4e4e7, #2454d6; previous orange accent removed |
| Work | Three main entries with summary, role and detail link | Design System, Notiiv, document-workspace in that order; remaining projects retained as short rows |
| Icons | User-approved addition to main list only | Actual Design System PNG and existing Notiiv SVG, both loaded and exactly 24px; empty alt avoids repeating adjacent titles |
| About/contact | Small labels, career rows and direct contact links | Career since 2025.09, technology list, email and three external links |
| Detail | Problem, decisions, outcome and evidence in a reading column | Korean headings and working anchors, 760px reading column, authorship and source links preserved |
| Responsive behavior | One column on mobile | No horizontal overflow at 320, 375, 390, 1440 or 1505px in the checked routes |

The generated concepts contain slightly different image scales. Layout is normalized to the written 1080px content system instead of treating raster text as exact CSS measurements. Visible Korean copy is implemented as selectable text.

## Intentional differences

- Two actual project icons were added after the initial concepts at the user's request.
- All existing secondary projects remain available, while the concept only illustrated two example rows.
- Full project narratives and existing original screenshots remain in detail pages. Screenshots are placed with the lower evidence section rather than in the opening view. Original files, aspect ratios, colors and contents remain unchanged.
- Mobile uses a 44px menu button because the desktop navigation does not fit. It supports closing with Escape and returns focus to the button.
- The shared navigation remains available while scrolling.

## Verification

- Used the in-app browser first to inspect the applied homepage and navigate to the work list.
- Used Playwright with headless Chrome for fixed viewport sizes because the in-app browser API did not expose a viewport-size control.
- Compared source concepts and rendered captures directly with `view_image`, including the first viewport, work, about/contact, detail and mobile list.
- Captured hero and about at the native concept size 1505 by 1045; work and detail at 1374 by 1145; mobile at 390 by 844. Functional checks additionally used 1440px desktop and 320/375px narrow mobile widths.
- Above-the-fold copy check: the hero heading, both supporting sentences, work CTA and GitHub link match the accepted wording. The extra email shortcut, hero label and focus panel were removed to match the concept.
- Production build: 28 static pages generated successfully.
- Existing visual checks updated for the approved layout: 16 passed, covering original screenshot integrity, loaded icons, 24px sizing, narrow viewport overflow, main detail navigation, Korean contents anchors and English switching.
- The four original product screenshots remain byte-for-byte identical to their recorded hashes.

Final captures: `final-hero.png`, `final-work.png`, `final-about-contact.png`, `final-project-detail.png`, `final-mobile.png`.

The in-app browser work-list screenshot is saved as `final-browser-work.png` for the handoff. Its rendered icons and open-row layout were also inspected directly with `view_image`.

## Follow-up: icons for all projects

The user expanded the scope to all work-list entries. All 13 projects now have 24px icons, including the ten secondary entries. Original assets were found for Intranet, OWKR, Jeomjuro, Marker, Chorus, Rust for TypeScript Developers and Kivra. document-workspace, Boundra and Echo use new portfolio-only vector marks. Source provenance and the full 28-commit Echo asset investigation are recorded in `../../project-icons.md`. The production build and all 16 updated browser checks passed. Previous statements about only two icons describe the initial delivery.

## Case-study expansion, 2026-10-26

- Expanded Design System, Notiiv, document-workspace and OWKR in Korean and English. Main list layout remains unchanged.
- Added English subheading and list rendering so long cases retain readable sections in both languages.
- `pnpm build`: 28 pages built successfully.
- Existing Playwright suite: 16 checks passed across desktop and mobile.
- Additional one-off browser inspection: eight detail routes at 320, 390 and 1440px, 24 page/viewport combinations. Every page retained valid chapter anchors, source links and subheadings with no horizontal document overflow. Results: `case-expansion-audit.json`.
- Manually inspected the expanded Design System text in the in-app browser. Capture: `expanded-case-design-system.png`.
- These checks verify the portfolio rendering. The source projects' suites and historical benchmarks were not rerun for this content update.
