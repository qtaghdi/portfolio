export interface ProjectSection {
  id: 'problem' | 'decisions' | 'outcome';
  title: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
  subsections?: { title: string; paragraphs: string[]; items?: string[] }[];
}

export interface ProjectTranslation {
  title?: string;
  titleKo?: string;
  category: string;
  badge?: string;
  role: string;
  summary: string;
  thesis?: string;
  responsibility?: string;
  focus: string[];
  evidence?: { val: string; label: string; detail?: string }[];
  sections: ProjectSection[];
}

export const projectKey = (slug: string) => slug.replace(/^\d+-/, '');

export const projectEn: Record<string, ProjectTranslation> = {
  notiiv: {
    "category": "Company · Production",
    "badge": "Flagship",
    "role": "Frontend Engineer",
    "thesis": "Consolidating repeated authentication and API handling across apps",
    "responsibility": "Shared BFF and Query infrastructure, operational interfaces, and authentication, sharing, and webview edge conditions",
    "focus": [
        "pnpm monorepo",
        "BFF boundaries",
        "Operational UX",
        "Browser edge conditions"
    ],
    "summary": "Maintained shared frontend infrastructure and improved operational interfaces, authentication, sharing, and webview behavior across four apps and 13 shared packages.",
    "evidence": [
        {
            "val": "4 Frontend Apps",
            "label": "One product monorepo"
        },
        {
            "val": "13 packages",
            "label": "Shared API, Query, Schema, and UI foundation"
        },
        {
            "val": "Shared BFF",
            "label": "Shared request validation, authentication, and refresh"
        }
    ],
    "sections": [
        {
            "id": "problem",
            "title": "The same authentication boundary was maintained in several apps",
            "paragraphs": [
                "Notiiv includes an admin console, owner dashboard, status app, and support site. I maintained shared BFF and Query infrastructure and improved operational interfaces and browser boundaries.",
                "Separate proxies duplicated path checks, cookie injection, refresh, and error handling. Fixing one app could leave another behind. A single rigid proxy would introduce a different problem: app-specific login responses and uploads would become entangled with shared infrastructure.",
                "Operators also encountered mismatched FAQ previews, spreadsheet-dependent customer entry, webview download restrictions, and PDF page navigation during zoom."
            ]
        },
        {
            "id": "decisions",
            "title": "Separate shared request handling from product policy",
            "paragraphs": [],
            "subsections": [
                {
                    "title": "One pipeline, app-owned response policy",
                    "paragraphs": [
                        "I consolidated path validation, URL construction, authentication injection, and refresh-and-retry handling in createSimpleBffProxy. The owner app moved away from its separate request and response pipeline.",
                        "Login and signup responses still use an app-owned hook to move returned tokens into cookies. Public paths do not receive an old session token or trigger refresh. JSON and upload routes share the pipeline with different body, content-type, and timeout limits.",
                        "A protected request receiving 401 and a failed login returning 401 require different behavior. Cookie injection and refresh also depend on each other, so invalid option combinations fail when the proxy is created instead of leaving stale sessions to trigger navigation loops."
                    ]
                },
                {
                    "title": "Verify that rejection prevents upstream effects",
                    "paragraphs": [
                        "Path and origin tests check both the response and whether the backend was called: invalid segments return 400, disallowed prefixes return 404, and cross-origin state changes return 403 without forwarding.",
                        "The redirect helper rejects protocol-relative external targets as well as obvious external URLs. Merely starting with a slash is insufficient. QueryClient factories retain per-app overrides, and Zod distinguishes TypeScript assumptions from actual API response validity."
                    ]
                },
                {
                    "title": "Improve the task operators need to finish",
                    "paragraphs": [
                        "I aligned FAQ preview and support rendering, improved editor error and focus states, and connected unsaved-change protection to form state so successful saves could still navigate.",
                        "Direct customer input, empty-row checks, phone formatting, and optimistic image deletion support operational tasks without requiring every small entry to pass through a spreadsheet."
                    ]
                },
                {
                    "title": "Treat shared pages and mobile browsers as distinct conditions",
                    "paragraphs": [
                        "Calendar sharing moved from inferring dates from titles to explicit backend follow-up events displayed on the share card and exported together. Handling includes time zones, invalid dates, escaping, and long lines.",
                        "Webview guidance and browser fallbacks cover unsupported downloads and APIs. PDF interaction separates zoom from page swipes and accounts for Korean IME keyboard-event differences."
                    ]
                }
            ]
        },
        {
            "id": "outcome",
            "title": "Shared boundaries with app-level verification",
            "paragraphs": [],
            "subsections": [
                {
                    "title": "What changed",
                    "paragraphs": [
                        "The owner app now uses the shared proxy while retaining login and signup response policy. QueryClient, runtime parsing, and share paths also have shared boundaries. Authored changes cover operational entry and preview behavior alongside browser-specific failures."
                    ]
                },
                {
                    "title": "Regression checks for authentication boundaries",
                    "paragraphs": [
                        "Proxy tests verify rejection status and upstream-call prevention. Refresh and owner-route tests cover authentication behavior after consolidation, keeping input validation, token renewal, and response handling on a shared verification baseline."
                    ]
                }
            ]
        }
    ]
},
  'design-system': {
    "category": "Company · UI Library · NPM",
    "role": "Frontend Engineer and Design System Contributor",
    "thesis": "Load CSS for the components in use",
    "responsibility": "Per-component ESM and CSS output, token generation, overlay motion, component maintenance, and consumer migration",
    "focus": [
        "Package distribution",
        "Design tokens",
        "Overlay behavior",
        "Consumer migration"
    ],
    "summary": "Changed distribution so component dependencies bring their own CSS, separated overlay lifetime from CSS motion, and updated migration guidance and consuming apps.",
    "evidence": [
        {
            "val": "ESM + CSS",
            "label": "Per-component distribution"
        },
        {
            "val": "4 apps",
            "label": "Package dependencies in the Notiiv monorepo"
        },
        {
            "val": "CSS motion",
            "label": "Removed the react-spring runtime dependency"
        }
    ],
    "sections": [
        {
            "id": "problem",
            "title": "Using one component still brought the whole stylesheet",
            "paragraphs": [
                "I maintained an existing company library across package distribution, tokens, overlays, and consumer migration. A page using only a button could still import styles for overlays and every other component through one shared stylesheet.",
                "JavaScript tree shaking did not remove that explicit CSS import. Removing a motion dependency also required preserving DOM lifetime: immediate unmount removes exit motion, while an outdated exit callback can close an overlay that has already reopened."
            ]
        },
        {
            "id": "decisions",
            "title": "Align styles, module dependencies, and element lifetime",
            "paragraphs": [],
            "subsections": [
                {
                    "title": "Split modules and remove barrel side effects",
                    "paragraphs": [
                        "I emitted component-level ESM with adjacent CSS. Components import their own styles and bring styles for dependencies such as a DatePicker using Popover.",
                        "Splitting files alone was insufficient while the barrel still imported shared CSS. Theme, autofill, and link styles moved to the modules that need them, leaving the barrel with re-exports. Package side-effect declarations preserve CSS without retaining every unused JavaScript module.",
                        "The postprocessor resolves real ESM file paths and compiles SCSS into the same CSS layer. Unsupported barrel exports fail the build instead of disappearing silently. Watch rebuilds run the same postprocessing as distribution builds."
                    ]
                },
                {
                    "title": "Let CSS animate and a small hook manage lifetime",
                    "paragraphs": [
                        "usePresence mounts on the opening render, then waits for the overlay element's animations before unmounting. Reopening cancels the previous exit wait. No active animation, including reduced motion, means immediate removal.",
                        "The wait excludes child animations so an infinite spinner cannot keep an overlay mounted forever. This preserves lifecycle boundaries while removing react-spring and the public spring hooks."
                    ]
                },
                {
                    "title": "Complete the change in consuming apps",
                    "paragraphs": [
                        "The previous full stylesheet remains available for compatibility. Migration guidance distinguishes removing it from cases requiring theme variables, and documents the package-import optimization needed for webpack.",
                        "tokens.json generates SCSS, TypeScript, and theme output. A stale-output check detects divergence. Consumer updates include package versions and stylesheet imports rather than stopping at a successful package build."
                    ]
                }
            ]
        },
        {
            "id": "outcome",
            "title": "A different distribution and consumption model",
            "paragraphs": [],
            "subsections": [
                {
                    "title": "Checks and implementation evidence",
                    "paragraphs": [
                        "Authored changes establish the output modules, rewritten imports, pure re-export barrel, and guards for unsupported exports and watch rebuilds. Presence tests cover immediate mount, no-animation removal, exit completion, interrupted exit, and callbacks for an overlay that never opened.",
                        "Migration documentation records consumer CSS and theme requirements. Four Notiiv apps reference the package. The result is a dependency-aligned distribution model with CSS-driven overlay motion."
                    ]
                }
            ],
            "links": [
                {
                    "label": "Per-component distribution commit",
                    "href": "https://github.com/Bigtablet/bigtablet-design-system/commit/3a9c75010f1f0aeae551e2127e7c4b5f1e7a355e"
                },
                {
                    "label": "CSS motion migration commit",
                    "href": "https://github.com/Bigtablet/bigtablet-design-system/commit/32972ad735ff921c2bfc1fa84867cfb50dd1dc96"
                },
                {
                    "label": "Consumer migration guidance",
                    "href": "https://github.com/Bigtablet/bigtablet-design-system/blob/develop/docs/MIGRATION.md"
                }
            ]
        }
    ]
},
  intranet: {
    category: 'Company · Flutter App · Production', badge: 'Mobile', role: 'Flutter Developer',
    thesis: 'Connecting collaborative work and state inside one Flutter app',
    responsibility: 'Flutter app shell, messenger, mail and approval screens, offline data, notification deep links, and failure recovery',
    focus: ['Flutter app shell', 'BLoC architecture', 'Offline-first', 'Real-time sync'],
    summary: 'Built a Flutter mobile app shell connecting Home, Messenger, and Work apps, then designed cache and real-time boundaries for mail, approvals, notifications, deep links, and partial failures.',
    evidence: [
      { val: 'Flutter', label: 'iOS and Android app' },
      { val: 'BLoC + SQLite', label: 'State and offline cache' },
      { val: 'SSE + FCM', label: 'Real-time and push' },
    ],
    sections: [
      { id: 'problem', title: 'Mobile work cannot stop with the network', paragraphs: ['Messages, mail, approvals, and notifications had to remain understandable when requests were slow, duplicated, or partially failed. Real-time events and push notifications could also arrive out of order.'] },
      { id: 'decisions', title: 'Separate immediate feedback from eventual truth', paragraphs: ['I used cache-then-network reads, explicit stale states, and optimistic actions with rollback. SSE handled in-app freshness while FCM handled background delivery, with idempotent reconciliation between them.', 'Critical transitions were covered with focused tests so reconnects, partial failures, and stale responses produced predictable UI states.'] },
      { id: 'outcome', title: 'A calmer experience under unreliable conditions', paragraphs: ['Users can continue reading and acting with clear feedback while the system reconnects. The interface exposes uncertainty instead of silently replacing state.'] },
    ],
  },
  'document-workspace': {
    "category": "Personal · MCP · Document Tool",
    "badge": "Private XLSX Alpha",
    "role": "Creator",
    "thesis": "One authoritative document state for human and AI edits",
    "responsibility": "Product design, Go XLSX adapter, MCP transport, Univer editor, revision, history, persistence, and verification",
    "focus": [
        "Human-AI collaboration",
        "Revision conflicts",
        "XLSX fidelity",
        "Recovery"
    ],
    "summary": "Built a local XLSX workspace connecting human and AI edits through revisioned commits, durable history, atomic persistence, and bounded range loading.",
    "evidence": [
        {
            "val": "400K cells",
            "label": "Release profile workbook",
            "detail": "4 sheets · 1,000 by 100"
        },
        {
            "val": "287.74 ms",
            "label": "Recorded 1,000-cell batch commit",
            "detail": "2026-10-12 · darwin-arm64 · Go 1.25"
        },
        {
            "val": "X-01 to X-06",
            "label": "Recorded automated safety gates",
            "detail": "Local atomicity, recovery, and history"
        }
    ],
    "sections": [
        {
            "id": "problem",
            "title": "Two editors still need one definition of saved state",
            "paragraphs": [
                "I designed and implemented the product, XLSX adapter, transports, editor, and recovery model as an independent project. It remains a private local XLSX alpha.",
                "If a person and an AI both read revision 12, accepting both writes without a revision boundary can lose the earlier change. A successful save followed by a lost response is different: automatically retrying a row insertion can duplicate it, and a higher server revision does not identify which request succeeded.",
                "A workbook is more than displayed cell values. A small edit must not silently discard formulas, validation, or charts. The UI engine cannot be assumed to own the original document state."
            ]
        },
        {
            "id": "decisions",
            "title": "Keep format preservation and commit authority on the server",
            "paragraphs": [],
            "subsections": [
                {
                    "title": "Choose a UI engine behind a replaceable boundary",
                    "paragraphs": [
                        "The recorded ADR compares Univer, ONLYOFFICE, and a custom engine. A custom grid would require selection, keyboard, clipboard, and formula UI work. ONLYOFFICE offers broad editing but introduces frame and deployment considerations for an embedded MCP App.",
                        "I chose Univer OSS behind SpreadsheetEngine for direct range control and embedding, while the Go adapter owns validated operations, revisions, conflicts, and persistence. This preserves a path to replace the UI engine, at the cost of maintaining compatibility mapping and verification."
                    ]
                },
                {
                    "title": "Reject stale writes rather than guessing a merge",
                    "paragraphs": [
                        "Browser and AI writes carry an actor, base revision, and operations through one commit path. Of two requests based on revision 12, the first saves revision 13 and the second receives a conflict. A whole batch is validated before candidate mutation.",
                        "Structural edits such as row insertion and merges make blind replay unsafe. This coarse boundary may reject simultaneous edits to different cells, but keeps the source state explicit. Finer automatic merging requires additional semantic rules."
                    ]
                },
                {
                    "title": "Separate persistence failure from an uncertain response",
                    "paragraphs": [
                        "A candidate workbook is written to a temporary file in the same directory and atomically replaces the original. Failure during preparation, writing, sync, close, or replacement preserves the previous authoritative state. If the workbook commits but the history manifest cannot finalize, pending history is reconciled before another write.",
                        "On an uncertain write response or event resync, the browser pauses its queue, checks the server snapshot, and presents draft and recovery state instead of replaying writes. SSE replay gaps and session mismatch also require resynchronization.",
                        "Source hashes and a cooperative writer lock detect external changes, but do not eliminate an uncooperative writer racing between the last check and replacement."
                    ]
                },
                {
                    "title": "Make undo a new server revision",
                    "paragraphs": [
                        "Undo and redo restore content through a new revision instead of moving the revision counter backward. Disk snapshots and a manifest recover bounded history after restart. Snapshot count and size limits separate unavailable history from a failed document commit."
                    ]
                },
                {
                    "title": "Bound reads and defer unproven abstractions",
                    "paragraphs": [
                        "The browser loads viewport ranges incrementally; MCP reads metadata and needed ranges. Browser and MCP credentials are separate, with a single-use fallback URL expiring after two minutes.",
                        "Format rules remain in the XLSX adapter. A shared multi-format abstraction is deferred until a second real adapter demonstrates it. Formulas are stored but not calculated by the server, and browser previews are distinguished from source cached results."
                    ]
                }
            ]
        },
        {
            "id": "outcome",
            "title": "Recorded evidence for failure behavior and performance",
            "paragraphs": [
                "Human and AI changes, conflicts, persistence, and history now follow one server-owned document state."
            ],
            "subsections": [
                {
                    "title": "Automated safety evidence",
                    "paragraphs": [
                        "The 2026-10-12 report records X-01 through X-06 passing, with race-enabled Go checks and separate browser recovery tests."
                    ],
                    "items": [
                        "Input boundaries, atomic batches, and exactly one commit from competing same-revision writes.",
                        "Persistence rollback, pending history recovery, external replacement, and stale sessions.",
                        "Replay gaps, slow subscribers, lost-response protection against duplicate structural edits, and session resync.",
                        "Durable undo and redo, restart recovery, bounded history, and monotonic revisions."
                    ]
                },
                {
                    "title": "Performance in its recorded environment",
                    "paragraphs": [
                        "The 2026-10-12 release profile used a synthetic 400,000-cell workbook across four sheets on darwin/arm64, Go 1.25.0, and Excelize 2.11.0. Recorded times were 757.79 ms to open, 7.81 ms for a 10,000-cell read, 336.87 ms for one-cell commit, and 287.74 ms for a 1,000-cell commit.",
                        "The values were recorded on 2026-10-12 using the same synthetic workbook and environment. This workload serves as a release regression baseline."
                    ]
                }
            ]
        }
    ]
},
  boundra: {
    category: 'Open Source · Developer Tool', badge: 'Public Preview', role: 'Creator',
    thesis: 'Checking TypeScript monorepo domain boundaries with a Rust CLI',
    responsibility: 'Rule model, Rust analyzer, configuration validation, editor overlay, and benchmark design',
    focus: ['Static analysis', 'Architecture rules', 'Vite overlay', 'Benchmarking'],
    summary: 'Built a Rust CLI that checks client, server, shared, domain, and app boundaries through BR-001 to BR-006, with Zod runtime contracts and a Vite development overlay.',
    evidence: [
      { val: '6 rules', label: 'BR-001 through BR-006' },
      { val: '10K files', label: 'Large fixture benchmark' },
      { val: '164.20 ms', label: 'Measured analysis time' },
    ],
    sections: [
      { id: 'problem', title: 'Architecture documents drift from the code', paragraphs: ['Layer and import rules are easy to agree on and hard to enforce. Reviewers repeatedly catch the same violations, while developers receive feedback too late.'] },
      { id: 'decisions', title: 'Make the rule executable and local', paragraphs: ['I implemented BR-001 through BR-006 in a Rust analyzer, validated configuration at runtime with Zod, and connected results to a Vite overlay for immediate feedback.', 'Benchmarks include generated fixtures and a real monorepo snapshot so performance claims remain reproducible instead of anecdotal.'] },
      { id: 'outcome', title: 'Fast feedback at repository scale', paragraphs: ['The analyzer processed a 10,000-file fixture in 164.20 ms and matched 2,559 import edges. Architecture rules became part of the development loop rather than a document checked after the fact.'] },
    ],
  },
  owkr: {
    "title": "OWKR Community Tools",
    "category": "Community · Collaboration",
    "role": "Developer contributor",
    "thesis": "Tools for match setup, admin exams, recruitment, and community guidance",
    "responsibility": "Match collaboration, revision conflicts and editor presence; exam improvements; recruitment bot and operations documentation",
    "focus": [
        "Collaborative editing",
        "Exam workflow",
        "Session recovery",
        "Operations docs"
    ],
    "summary": "A community tooling case covering the collaborative OWKR Match project, an admin exam app, a Discord recruitment bot, and operations documentation.",
    "evidence": [
        {
            "val": "Match",
            "label": "Used by community operators"
        },
        {
            "val": "Exam",
            "label": "Implemented and deployed"
        },
        {
            "val": "Gather Bot",
            "label": "Development and testing"
        }
    ],
    "sections": [
        {
            "id": "problem",
            "title": "Operators need shared state as well as fast updates",
            "paragraphs": [
                "OWKR operations include team setup, admin selection exams, recruitment, waiting lists, and rules. Match editing must prevent one operator from silently overwriting another, rather than merely showing updates quickly."
            ]
        },
        {
            "id": "decisions",
            "title": "Give each operational tool an explicit state boundary",
            "paragraphs": [],
            "subsections": [
                {
                    "title": "Match: two operators editing the same roster",
                    "paragraphs": [
                        "In PR #10, I implemented shared roster editing. If one operator adds a participant while another rearranges positions, replacing the full roster with the last write can lose the first change.",
                        "A Redis Lua operation checks the expected revision and updates atomically. Separate read and write calls could both pass the same check. A stale write receives a conflict with the current state.",
                        "The PR #10 client applies the current roster on conflict and asks the operator to reapply needed changes. Participant order and team positions are validated under one revision to keep the saved roster consistent."
                    ]
                },
                {
                    "title": "Match: limit replicated data and update scope",
                    "paragraphs": [
                        "Sessions store Discord IDs, participant order, and optional team positions. Display names and role tiers are hydrated from the user sheet rather than copied into every session. Missing or duplicate IDs and incomplete team positions are rejected.",
                        "PR #10 uses polling with delayed local publishing. Polling avoids overwriting pending local edits, skips hidden tabs, and does not run while publishing. PR #17 adds authenticated editor presence and recent changes to the existing response.",
                        "Presence and recent changes travel through the existing polling response, while revision checks validate the final save. Collaboration feedback and persistence rules have separate responsibilities."
                    ]
                },
                {
                    "title": "Match: evidence and collaboration scope",
                    "paragraphs": [
                        "Store tests check revision advancement and stale-write conflicts; contract tests check participant and waiting-list order, full team positions, and invalid IDs.",
                        "Other contributors improved authentication and matchup UI. My work covers the shared contract, API, hook, UI integration, and editor presence."
                    ]
                },
                {
                    "title": "Exam: server-owned time controls",
                    "paragraphs": [
                        "The app covers Discord sign-in, assigned codes, answer saving, submission, questions, and grading. In PR #4, I added pause, resume, and extension state on the server with regression checks for ownership, admin authority, expiration, submission locks, and repeated actions. PR #5 separates test attempts from normal admin records."
                    ]
                },
                {
                    "title": "Gather Bot: recruitment and restart recovery",
                    "paragraphs": [
                        "I worked on the Python and SQLite recruitment bot with per-session actors, participants, waiting lists, tier collection, and restart recovery. Authored changes include substitute recruitment, lobby assignment, migrations, and tests. It remains in development and testing without automatic Match integration."
                    ]
                },
                {
                    "title": "Docs: maintain guidance alongside the tools",
                    "paragraphs": [
                        "The Astro site provides rules, participation instructions, and FAQs. My commits update participation and notification rules and connect the entry points for the tools."
                    ]
                }
            ]
        },
        {
            "id": "outcome",
            "title": "A connected set of community operations tools",
            "paragraphs": [
                "Match is used for community match setup and result sharing. Exam implements the admin testing workflow and is deployed. Gather Bot is in development and testing, with recruitment state and restart recovery implemented.",
                "The work covers collaborative editing conflicts, server-owned exam state, event processing, recovery, and operational documentation."
            ]
        }
    ]
},
  jeomjuro: {
    "title": "Jeomjuro",
    "category": "Team Product · Monorepo",
    "role": "Frontend Engineer",
    "thesis": "Improving consumer and admin workflows within a shared team codebase",
    "responsibility": "Notification and token-reissue BFF, admin search and comment moderation, shared UI and CI, and the post editor",
    "focus": [
        "BFF integration",
        "Admin workflow",
        "Shared UI",
        "Editor UX"
    ],
    "summary": "A collaborative community product for current and future store owners, with contributions to the consumer app, admin tools, shared UI, and writing experience.",
    "evidence": [
        {
            "val": "BFF",
            "label": "Notifications and token reissue"
        },
        {
            "val": "Admin",
            "label": "Search, deletion, restoration, and state"
        },
        {
            "val": "Editor",
            "label": "Tiptap writing experience"
        }
    ],
    "sections": [
        {
            "id": "problem",
            "title": "Consumer and admin changes shared the same codebase",
            "paragraphs": [
                "The product needed more consistent authentication and notification requests, admin search state, and post authoring while multiple contributors worked in the same monorepo."
            ]
        },
        {
            "id": "decisions",
            "title": "Integrate user and admin workflows",
            "paragraphs": [
                "I added a Next.js Route Handler proxy limited to notifications and token reissue. It forwards authentication and response cookies and handles the EventSource authentication-header limitation.",
                "I integrated admin user, post, and comment search plus comment deletion and restoration. I separated typed and applied search values, reset pagination on condition changes, rejected invalid post IDs, and invalidated affected lists. The same change adds shared UI and Storybook examples and standardizes CI workflows on pnpm.",
                "I replaced Markdown input with a Tiptap editor, connecting formatting, links, colors, image uploads, popover dismissal, and sanitized rendering. Other contributors handled social-login, authentication-state, and deployment changes; my changes build on that shared foundation."
            ]
        },
        {
            "id": "outcome",
            "title": "Shared foundations for product and admin changes",
            "paragraphs": [
                "The changes were merged into develop, bringing notification and authentication requests, admin search and moderation, shared UI, and post authoring into clearer implementation boundaries."
            ]
        }
    ]
},
  marker: {
    category: 'Hackathon · Grand Prize', badge: '12th Highthon Grand Prize', role: 'Frontend Engineer',
    thesis: 'Connecting emotions to places as a shared map',
    responsibility: 'Map interaction, two-step contribution form, API contract, and presentation flow',
    focus: ['Kakao Map', 'Interaction flow', 'API contract', 'Hackathon delivery'],
    summary: 'A place-based emotion map that won the Grand Prize at the 12th Highthon.',
    evidence: [{ val: 'Grand Prize', label: '12th Highthon', detail: '2026' }],
    sections: [
      { id: 'problem', title: 'Feelings are easier to share with context', paragraphs: ['The team wanted to make emotions visible through places instead of reducing them to an isolated text post.'] },
      { id: 'decisions', title: 'Keep contribution simple and spatial', paragraphs: ['I built the Kakao Map experience, a two-step place and emotion form, marker sheets, and the frontend API contract. The interaction was scoped for a working hackathon demo.'] },
      { id: 'outcome', title: 'Grand Prize at the 12th Highthon', paragraphs: ['Marker connected place discovery and emotional expression in one clear flow and received the event Grand Prize.'] },
    ],
  },
  'rust-with-typescript': {
    category: 'Open Source · Learning', role: 'Creator',
    thesis: 'Explaining Rust through concepts TypeScript developers already know',
    responsibility: 'Curriculum structure, bilingual documentation, examples, and browser runner',
    focus: ['Technical writing', 'Rust', 'TypeScript', 'Bilingual docs'],
    summary: 'A bilingual learning project that compares Rust and TypeScript side by side and lets readers run examples in the browser.',
    sections: [
      { id: 'problem', title: 'New syntax is not the hardest part of Rust', paragraphs: ['TypeScript developers often understand syntax quickly but struggle to map ownership, borrowing, enums, and traits onto familiar mental models.'] },
      { id: 'decisions', title: 'Teach through contrast and execution', paragraphs: ['Each chapter pairs TypeScript and Rust examples, explains where the models differ, and provides a browser runner for immediate feedback. Korean and English content share the same curriculum structure.'] },
      { id: 'outcome', title: 'A bridge between two programming models', paragraphs: ['The project turns abstract Rust concepts into concrete comparisons that web developers can explore without leaving the document.'] },
    ],
  },
  kivra: {
    "category": "Team Developer Tool · Prototype",
    "role": "Developer contributor",
    "thesis": "Capturing execution context across terminals and editors",
    "responsibility": "Execution-capture contract, terminal and IDE integrations, and desktop module separation",
    "focus": [
        "Tauri",
        "Execution capture",
        "IDE protocol",
        "Module boundaries"
    ],
    "summary": "A collaborative local-first developer-memory prototype connecting execution context across a desktop app, VS Code, and JetBrains.",
    "evidence": [
        {
            "val": "Capture",
            "label": "Execution capture flow",
            "detail": "PR #1"
        },
        {
            "val": "Modules",
            "label": "Rust and renderer responsibility split",
            "detail": "PR #4"
        }
    ],
    "sections": [
        {
            "id": "problem",
            "title": "Execution context is scattered across tools",
            "paragraphs": [
                "The team explored collecting terminal execution, errors, and solution context locally and making it accessible from different editors."
            ]
        },
        {
            "id": "decisions",
            "title": "Share a capture contract and separate responsibilities",
            "paragraphs": [
                "In PR #1, I added shared start, event, and end contracts and connected shell capture, Rust ingestion, the runs UI, and VS Code and JetBrains integrations.",
                "In PR #4, I split the existing Rust entry point into authentication, captured-run, project, and integration modules, alongside renderer components, services, and settings. The refactor preserves existing functionality while making each responsibility easier to change independently.",
                "Another contributor changed central captured-run storage in PR #2, updating VS Code tests and diagnostics. This demonstrates shared work on the same integration boundary after the capture implementation."
            ]
        },
        {
            "id": "outcome",
            "title": "A prototype with identifiable contributions",
            "paragraphs": [
                "The capture contract, integrations, and module split were merged. Kivra is a prototype for execution capture and editor integration."
            ]
        }
    ]
},
  homepage: {
    title: 'Bigtablet Homepage Renewal', category: 'Company', role: 'Frontend Engineer',
    thesis: 'Maintaining one coherent brand experience across languages, devices, and releases',
    responsibility: 'Bilingual content, responsive UI, SEO, and delivery quality',
    focus: ['Brand experience', 'i18n', 'SEO', 'Delivery'],
    summary: 'Improved brand expression, bilingual content, responsive behavior, interactions, and delivery quality for the company website.',
    sections: [
      { id: 'problem', title: 'Every small detail becomes part of brand trust', paragraphs: ['A company website combines product, company, hiring, policy, and contact content across Korean and English. Copy, links, metadata, and responsive behavior all need to stay accurate.'] },
      { id: 'decisions', title: 'Treat content and delivery as product quality', paragraphs: ['I organized localized content with next-intl, refined hierarchy and responsive layouts, applied restrained GSAP interactions, and maintained metadata, links, assets, CI, and deployment flows.'] },
      { id: 'outcome', title: 'A more coherent public product surface', paragraphs: ['The site communicates the company more consistently across languages and devices while remaining easier to maintain and release.'] },
    ],
  },
  echo: {
    category: 'Hackathon · Excellence Prize', badge: '제11회 하이톤 우수상', role: 'Frontend Engineer',
    thesis: 'Turning a live voice into a shared group experience',
    responsibility: 'Real-time audio UI, WebSocket lifecycle, group flows, and statistics',
    focus: ['WebSocket audio', 'Resource cleanup', 'Group UX', 'Hackathon delivery'],
    summary: 'A real-time voice experience that received the Excellence Prize at the 11th Highthon.',
    sections: [
      { id: 'problem', title: 'Real-time audio is also a lifecycle problem', paragraphs: ['Recording, streaming, reconnecting, and leaving a room all create resources that must be reflected clearly in the UI and cleaned up correctly.'] },
      { id: 'decisions', title: 'Model connection state as product state', paragraphs: ['I connected audio streaming over WebSocket with explicit cleanup, group participation flows, and result statistics, keeping the hackathon scope focused on one complete experience.'] },
      { id: 'outcome', title: 'Excellence Prize at the 11th Highthon', paragraphs: ['Echo delivered an end-to-end real-time voice experience and received the event Excellence Prize.'] },
    ],
  },
  chorus: {
    category: 'Creative Tool', role: 'Creator',
    thesis: 'Giving shared music a sense of material and motion',
    responsibility: 'Music search, 3D vinyl rendering, mobile composition, and image export',
    focus: ['Svelte 5', 'Threlte', 'Three.js', 'Image export'],
    summary: 'A mobile music-card maker that turns a selected song into a rotating 3D vinyl and exports a story-sized image.',
    sections: [
      { id: 'problem', title: 'Most music sharing cards feel interchangeable', paragraphs: ['Listeners needed a fast way to search, preview, and export a more tactile vertical composition from a phone.'] },
      { id: 'decisions', title: 'Combine a simple flow with a physical object', paragraphs: ['SvelteKit manages the search and selection flow, while Threlte and Three.js render album art as a rotating vinyl with reflective materials. The WebGL result can be exported as a high-resolution PNG.'] },
      { id: 'outcome', title: 'Search, render, and export in one flow', paragraphs: ['Users can turn an iTunes search result into a vertical 3D music card ready for social sharing.'] },
    ],
  },
};
