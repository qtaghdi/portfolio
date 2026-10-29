export interface ProjectSection {
  id: string;
  title: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
  notes?: { title: string; paragraphs: string[] };
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
  'apple-music-discord-presence': {
    category: 'Personal · Desktop Tool',
    badge: 'macOS · Windows',
    role: 'Creator',
    thesis: 'An installable bridge from native playback state to Discord',
    responsibility: 'Platform metadata, Discord IPC, playback and artwork synchronization, local settings, packaging, and releases',
    focus: ['Native integration', 'Connection recovery', 'Local settings', 'Desktop distribution'],
    summary: 'A personal macOS and Windows tool connecting Apple Music playback to Discord activity, including native metadata, reconnection, settings UI, and installable packages.',
    evidence: [
      {
        "val": "Music presence",
        "label": "Show the current Apple Music track, album, and playback time on a Discord profile"
      },
      {
        "val": "Display settings",
        "label": "Choose which music information to share and how it appears through local settings"
      }
    ],
    sections: [
      {
        id: 'problem',
        title: 'Playback, connections, and artwork have different lifetimes',
        paragraphs: [
          'I built this personal tool to show the current Apple Music track, album, and playback progress in Discord. Native playback data, the Discord connection, and network artwork lookups can start, stop, or complete independently.',
          'Track changes and seeks must replace earlier state, and restarting Discord must republish the current track. Installation also needed to work without a separate Node.js installation or developer application setup.',
        ],
      },
      {
        id: 'decisions',
        title: 'Separate native collection, publishing, and desktop delivery',
        paragraphs: [],
        subsections: [
          {
            title: 'Normalize platform data into one playback snapshot',
            paragraphs: [
              'A Swift helper uses ScriptingBridge on macOS; a PowerShell helper finds Apple Music through Windows media-session APIs. Both emit the same state, track, artist, album, duration, and position fields.',
              'The TypeScript watcher reads helper output line by line and passes shared snapshots to the activity formatter. Unexpected helper exits trigger a restart, separating platform collection from Discord publishing.',
            ],
          },
          {
            title: 'Recover the connection and republish current state',
            paragraphs: [
              'I implemented local Discord IPC framing and slot discovery for Unix sockets and Windows named pipes. Failed connections use retry backoff with jitter.',
              'A ready event clears the previous publication signature and sends the latest snapshot. Signature comparisons reduce duplicate activity updates, while track changes, play and pause transitions, and detected seeks trigger publication. Start and end timestamps derive progress from the current playback position.',
            ],
          },
          {
            title: 'Keep artwork optional and reject stale responses',
            paragraphs: [
              'Text activity is published before the asynchronous iTunes artwork lookup. A generation check prevents an earlier track’s late response from updating the current activity.',
              'Search results are checked against artist, title, album, and duration. Regional failures fall through to alternate catalogs and queries. Album-only matches can provide artwork without creating a song link. Successful and empty results are cached, and playback publication continues without artwork.',
            ],
          },
          {
            title: 'Apply local display settings without a restart',
            paragraphs: [
              'The settings interface previews activity and controls album information, artwork, progress, pause visibility, and metadata order. Saved changes immediately republish the current activity.',
              'The server binds to a local address and checks the Origin and JSON format of settings changes. English and Korean interfaces preserve unsaved options when switching language and keep track metadata separate from interface translation.',
            ],
          },
          {
            title: 'Deliver a desktop lifecycle and installable packages',
            paragraphs: [
              'The macOS menu bar and Windows tray expose settings, connection status, reconnect, logs, and launch-at-login controls. The desktop host owns the background worker so quitting also stops publication.',
              'Release ZIPs bundle Node.js and use a shared public Discord Application ID by default. A tag-based workflow verifies and packages both platforms before publishing their files together. The Windows installer also checks extraction and required files.',
            ],
          },
        ],
      },
      {
        id: 'outcome',
        title: 'A published desktop tool with visible implementation evidence',
        paragraphs: [
          'The v0.8.0 release provides installation ZIPs for macOS Apple Silicon and Windows x64. The product site and settings interface support Korean and English. The capture in the sharing section shows track information, artwork, and progress in Discord on macOS.',
          'Tests cover activity formatting, timestamps, IPC frames and paths, artwork matching, and local settings boundaries. The project connects native integration, recovery, settings UI, and installation and release workflows in one local tool.',
        ],
      },
    ],
  },
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
        "val": "Product operations",
        "label": "Connects admin, owner, service status, and customer support interfaces"
      },
      {
        "val": "Shared foundation",
        "label": "Handles authentication, API requests, and sharing consistently across apps"
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
        "val": "Product UI",
        "label": "Shared components and styles used by the four Notiiv apps"
      },
      {
        "val": "Storybook",
        "label": "Browse component states, design tokens, and usage examples"
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
                        "Migration documentation records consumer CSS and theme requirements. Four Notiiv apps reference the package. The result is a dependency-aligned distribution model with CSS-driven overlay motion.",
                        "On October 27, 2026, I added light and dark visual regression checks for core components in the CI Playwright environment. Failures retain actual, diff, and candidate baseline images; intended updates import baselines from that CI run. The Button captures below are the committed CI baselines."
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
    "category": "Company · Flutter App · Production",
    "badge": "Mobile",
    "role": "Flutter Developer",
    "thesis": "Connecting collaborative work and state inside one Flutter app",
    "responsibility": "Flutter app shell, mail and approval state, notification deep links, failure handling, and training resume",
    "focus": [
      "Flutter app shell",
      "BLoC architecture",
      "Offline cache",
      "Notification routing"
    ],
    "summary": "Improved mail caching, notification destinations, batch-action feedback, and training resume in the company’s Flutter mobile app.",
    "evidence": [
      {
        "val": "Mobile work",
        "label": "Access internal mail, approvals, and schedules on mobile"
      },
      {
        "val": "Notifications",
        "label": "Open the relevant work item directly from a notification"
      }
    ],
    "sections": [
      {
        "id": "problem",
        "title": "Mobile work spans more than one request or screen",
        "paragraphs": [
          "The company intranet combines Home, Messenger, and Work tabs with mail, approvals, schedules, documents, and organization information. Slow requests and notification launches can expose data from different moments.",
          "I worked on preserving readable state, opening the correct destination from notifications, and preventing partial failures or late responses from looking like successful current results."
        ]
      },
      {
        "id": "decisions",
        "title": "Make data sources and completion states explicit",
        "paragraphs": [],
        "subsections": [
          {
            "title": "Cache first, then replace with the network result",
            "paragraphs": [
              "The mail inbox paints its local SQLite snapshot before receiving live data. Cache-only and network reads are separate so the user starts with readable content and the same screen can then receive the latest result."
            ]
          },
          {
            "title": "Route notifications into their actual context",
            "paragraphs": [
              "I connected mail and approval notifications to their detail screens, including launch-time routing. FCM token rotation re-registers the token, and channel mute state is reflected while connected."
            ]
          },
          {
            "title": "Distinguish partial failure and stale responses",
            "paragraphs": [
              "Mail and approval batch actions distinguish transport failures, partial success, and duplicate results. Late responses are discarded after page changes instead of replacing the current list."
            ]
          },
          {
            "title": "Resume training from server-owned progress",
            "paragraphs": [
              "I carried lastPositionSec from the training response through the domain model to the player. Both the native video player and YouTube path receive the resume position when the user reopens the lesson."
            ]
          }
        ]
      },
      {
        "id": "outcome",
        "title": "More predictable behavior around everyday interruptions",
        "paragraphs": [
          "Mail starts with readable cached content and swaps in fresh results. Notifications open the related document, batch actions report actual completion, and training screens receive saved playback progress.",
          "The work focuses on explaining which state is visible and what a request completed when connectivity, navigation, and background events overlap."
        ]
      }
    ]
  },
  'document-workspace': {
    "category": "Personal · MCP · Document Tool",
    "badge": "Local XLSX Alpha",
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
        "val": "Document collaboration",
        "label": "People and AI edit cells, formulas, and styles in the same XLSX workbook"
      },
      {
        "val": "Change management",
        "label": "Inspect edit history, undo or redo changes, and save the workbook"
      }
    ],
    "sections": [
      {
        "id": "problem",
        "title": "Two editors still need one definition of saved state",
        "paragraphs": [
          "I independently designed and implemented the product, XLSX adapter, transports, editor, and recovery model as a local XLSX alpha.",
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
        "title": "One editing path for changes, saving, and recovery",
        "paragraphs": [
          "People and AI edit through the same authoritative state. Automated checks cover partial writes, stale revisions, persistence failures, and connection recovery. A recorded 400,000-cell workload provides a repeatable performance baseline. The project is a private local XLSX alpha; source and installation packages are not publicly distributed."
        ],
        "notes": {
          "title": "Safety checks and benchmark conditions",
          "paragraphs": [
            "Automated safety evidence",
            "The 2026-10-12 report records X-01 through X-06 passing, with race-enabled Go checks and separate browser recovery tests.",
            "Input boundaries, atomic batches, and exactly one commit from competing same-revision writes.",
            "Persistence rollback, pending history recovery, external replacement, and stale sessions.",
            "Replay gaps, slow subscribers, lost-response protection against duplicate structural edits, and session resync.",
            "Durable undo and redo, restart recovery, bounded history, and monotonic revisions.",
            "Performance in its recorded environment",
            "The 2026-10-12 release profile used a synthetic 400,000-cell workbook across four sheets on darwin/arm64, Go 1.25.0, and Excelize 2.11.0. Recorded times were 757.79 ms to open, 7.81 ms for a 10,000-cell read, 336.87 ms for one-cell commit, and 287.74 ms for a 1,000-cell commit.",
            "The values were recorded on 2026-10-12 using the same synthetic workbook and environment. This workload serves as a release regression baseline."
          ]
        }
      }
    ]
  },
  'boundra': {
    "category": "Open Source · Developer Tool",
    "badge": "Public Preview",
    "role": "Creator",
    "thesis": "Checking TypeScript domain boundaries with a Rust CLI",
    "responsibility": "Rule model, Rust analyzer, TypeScript runtime, diagnostics, benchmarks, and releases",
    "focus": [
      "Static analysis",
      "Runtime contracts",
      "Vite overlay",
      "Benchmarking"
    ],
    "summary": "A published Rust CLI and TypeScript runtime connecting BR-001 through BR-006 architecture checks with Zod contracts, scaffolding, and Vite feedback.",
    "evidence": [
      {
        "val": "Boundary checks",
        "label": "Check import rules between domains and execution environments in TypeScript projects"
      },
      {
        "val": "Developer workflow",
        "label": "Use CLI diagnostics and Vite feedback to locate and fix boundary violations"
      }
    ],
    "sections": [
      {
        "id": "problem",
        "title": "An architecture convention needs an enforceable boundary",
        "paragraphs": [
          "Client code can import server internals or bypass a domain’s public API while still building successfully. I wanted one model for declared domains, execution environments, and public entry points, with diagnostics that explain how to fix a violation."
        ]
      },
      {
        "id": "decisions",
        "title": "Connect static structure with runtime feedback",
        "paragraphs": [],
        "subsections": [
          {
            "title": "Stable architecture rule codes",
            "paragraphs": [
              "The Rust analyzer uses domain manifests and BR-001 through BR-006 for client and server boundaries, shared-layer dependencies, private domain access, composition roots, and undeclared dependencies. Diagnostics retain stable codes and actionable paths."
            ]
          },
          {
            "title": "Validate requests and results at runtime",
            "paragraphs": [
              "Zod contracts derive query and mutation inputs and results from schemas and validate actual transport data. A Vite overlay exposes development violations without changing production interfaces."
            ]
          },
          {
            "title": "Measure repeatable workloads",
            "paragraphs": [
              "The release CLI benchmark generates 1,000- and 10,000-file fixtures and records cold and warm medians. A 773-file monorepo comparison checks import-level output against TypeScript preprocessing and helped identify parser exceptions."
            ]
          },
          {
            "title": "Distribute an installable tool",
            "paragraphs": [
              "The NPM launcher retrieves a platform-specific native CLI and verifies its checksum. Scaffolding, resource generation, checks, and Vite feedback are part of the tool flow, with native binaries published through GitHub Releases.",
              "Version 0.6.0 extends discovery to nested domains, resolves package import aliases, and hardens nested-domain path validation."
            ]
          }
        ]
      },
      {
        "id": "outcome",
        "title": "An installable developer tool",
        "paragraphs": [
          "Boundra brings declared architecture rules, static analysis, runtime contracts, and Vite feedback into one NPM tool. Developers can locate boundary violations while working and follow actionable diagnostics."
        ],
        "notes": {
          "title": "Benchmark conditions and recorded results",
          "paragraphs": [
            "The July 3, 2026 benchmark recorded 163.32 ms cold and a 164.20 ms warm median for the 10,000-file fixture on darwin-arm64 with Node 24.14.0. The recorded environment and fixture make this workload a repeatable release regression baseline."
          ]
        }
      }
    ]
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
        "val": "OWKR Match",
        "label": "Operators edit participant rosters together, assign teams, and share results"
      },
      {
        "val": "OWKR Exam",
        "label": "A web tool for admin selection exams, answer submission, and grading"
      },
      {
        "val": "시간을달리는소녀",
        "label": "A Discord bot for match recruitment, sign-ups, tier collection, and lobby guidance"
      },
      {
        "val": "OWKR Docs",
        "label": "Rules, participation instructions, and bot guidance for players and operators"
      }
    ],
    "sections": [
      {
        "id": "problem",
        "title": "Community tools built around operator workflows",
        "paragraphs": [
          "OWKR operators manage participant rosters, team setup, admin selection exams, and Discord recruitment. I worked with other contributors on Match and on the connected exam, bot, and documentation workflows.",
          "My focus was reliable participant identity and preserving edits and answers when several people work at the same time."
        ]
      },
      {
        "id": "identity",
        "title": "From participant identity to team setup and sharing",
        "paragraphs": [
          "Discord IDs link players to the user sheet even when names change or overlap. Operators review new participants and ambiguous matches before applying them; missing display names preserve existing data.",
          "Operators can edit a roster together or send a completed team result. Shares retain participant IDs and team positions, while loading refreshes tiers from the user sheet."
        ]
      },
      {
        "id": "decisions",
        "title": "Preserving edits between operators",
        "paragraphs": [
          "Two operators saving the same roster could overwrite each other. A shared revision and atomic Redis Lua comparison and update reject stale writes with the latest roster.",
          "The client keeps unsent edits separate from polling responses. After a conflict it shows the current roster and asks the operator to reapply the intended change. Editor presence is delivered through the same read flow."
        ],
        "notes": {
          "title": "Collaboration implementation and checks",
          "paragraphs": [
            "Sessions store participant IDs, order, and team positions. Validation rejects duplicate IDs and incomplete placements. Polling distinguishes pending edits from read responses and skips unnecessary background-tab requests.",
            "PR #10 tests revision increments and stale-write rejection with a Redis test double; this is separate from live Redis concurrency testing. PR #17 adds editor presence."
          ]
        }
      },
      {
        "id": "exam",
        "title": "Keeping answers through saving, submission, and grading",
        "paragraphs": [
          "Candidates see remaining time and save status and can retry a failed save. Submission waits for pending saves and locks input so the answer cannot change halfway through.",
          "Operators navigate unanswered, review, and ungraded questions and control pause, resume, and time extensions. Admin edits pin the initial revision and restore drafts after conflicts. Test attempts are separated from regular administration."
        ]
      },
      {
        "id": "recruitment",
        "title": "Recruitment and lobby guidance with 시간을달리는소녀",
        "paragraphs": [
          "The Discord bot keeps participant data separate for each recruitment message and reserves two voice lobbies without overlap. Reservations include sessions still being created; failure or cancellation releases only that session.",
          "Incomplete recruitment at the deadline or confirmed deletion of its announcement cancels the match. Failed message cleanup is recorded for retry after restart, keeping cancellation scoped to the right session."
        ]
      },
      {
        "id": "operations",
        "title": "Connecting guidance, backups, and recovery",
        "paragraphs": [
          "OWKR Docs brings match rules, participation instructions, and bot guidance together. Recruitment and cancellation instructions follow the behavior of the tools.",
          "Operating schedules and backups share a lock, while retention rules drive backup and log cleanup. Restoring an old backup requires reapplying deletion requests before reconnecting the bot."
        ],
        "notes": {
          "title": "Backup and deletion verification scope",
          "paragraphs": [
            "Cleanup previews by default and aborts before deletion when creation records are invalid. It does not follow links or unrelated files.",
            "PR #19 records isolated erasure and restore checks; PR #20 records a live backup inspection. Deletion requests are not replayed automatically and require the request-ledger procedure."
          ]
        }
      },
      {
        "id": "outcome",
        "title": "Use and contribution",
        "paragraphs": [
          "Match is used by community operators to edit rosters, assign teams, and share results. Exam supports admin selection and OWKR Docs provides rules and instructions. 시간을달리는소녀 remains a test-server pilot.",
          "My contributions connect participant identity, collaborative editing, answer saving and grading, and recruitment recovery. They keep displayed state aligned with stored state and let operators continue after interruptions."
        ],
        "notes": {
          "title": "Usage and test conditions",
          "paragraphs": [
            "The October 28, 2026 bot pilot check used no real participants and covered recovery and cancellation procedures. The tenth reaction and departures after recruitment are automated-test scenarios, not a ten-person live exercise. Exam checks used test answers and did not cover the full production Discord login flow."
          ]
        }
      }
    ]
  },
  jeomjuro: {
    "category": "Team Product · Production",
    "role": "Frontend Engineer",
    "thesis": "Improving consumer features and admin workflows in one team codebase",
    "responsibility": "Notification and refresh BFF, admin search and moderation, shared UI, editor, and consumer rendering",
    "focus": [
      "BFF integration",
      "Admin workflow",
      "Shared UI",
      "Editor UX"
    ],
    "summary": "Improved notification and refresh boundaries, admin workflows, shared UI, and consumer behavior in a community product with production deployments.",
    "evidence": [
      {
        "val": "Community",
        "label": "Interfaces for prospective and current store owners to write posts and exchange information"
      },
      {
        "val": "Moderation",
        "label": "Admin interfaces for searching posts and performing deletion and restoration"
      }
    ],
    "sections": [
      {
        "id": "problem",
        "title": "Consumer and admin features were growing together",
        "paragraphs": [
          "Jeomjuro is a collaborative community product for current and future store owners. Consumer and admin apps share a monorepo, so authentication, notifications, shared components, and moderation need consistent boundaries.",
          "My work covered the request path for notification and token refresh, admin search state, article editing, and consumer rendering and session behavior."
        ]
      },
      {
        "id": "decisions",
        "title": "Connect product behavior across requests, state, and UI",
        "paragraphs": [],
        "subsections": [
          {
            "title": "Notification and refresh request boundaries",
            "paragraphs": [
              "I introduced Next.js Route Handler proxies for notifications and token refresh, forwarding authentication cookies and Authorization and reflecting upstream Set-Cookie responses.",
              "A same-origin proxy handles the browser EventSource constraint on custom authentication headers. This introduced the boundary where it was needed while preserving the existing API integration."
            ]
          },
          {
            "title": "Admin search and moderation",
            "paragraphs": [
              "I connected user, post, and comment search with comment deletion and restoration. Draft search input is separate from the applied query, and changing filters resets pagination.",
              "The changes reject invalid post IDs, refresh related lists after actions, and expand shared UI and Storybook examples. I also aligned CI and Storybook workflows with pnpm."
            ]
          },
          {
            "title": "Rich article editing",
            "paragraphs": [
              "I replaced Markdown input with a Tiptap editor supporting formatting, links, colors, and image upload. Popovers close on outside interaction or Escape, while rendered content uses permitted color forms and sanitization."
            ]
          },
          {
            "title": "Consumer rendering and session order",
            "paragraphs": [
              "I reduced work on public routes and initial home hydration and corrected ad-banner hydration behavior. Logout keeps the token needed by the server request until that request settles, then clears the client session. This keeps the visible state aligned with the authentication operation."
            ]
          }
        ]
      },
      {
        "id": "outcome",
        "title": "Changes delivered through consumer and admin deployments",
        "paragraphs": [
          "The notification and refresh BFF and admin improvements moved from develop into main and were included in successful production deployments of both apps. Consumer rendering and logout changes are also present in that deployed code.",
          "I subsequently extended article editing and shared UI examples. Working alongside the team’s social-login and deployment foundation, I improved both the consumer experience and the tools used to operate it."
        ]
      }
    ]
  },
  marker: {
    "category": "Hackathon · Grand Prize",
    "badge": "12th Highthon Grand Prize",
    "role": "Frontend Engineer",
    "thesis": "Recording places through emotions and stories",
    "responsibility": "Map UI, place recording, emotion filters, mobile sheets, and API specification",
    "focus": [
      "Kakao Map",
      "Mobile sheets",
      "Location UX",
      "API design"
    ],
    "summary": "A collaborative map app for recording and exploring emotions attached to places, awarded the 12th Highthon Grand Prize.",
    "evidence": [
      {
        "val": "Emotion map",
        "label": "Record emotions, stories, and photos at places and explore other entries on a map"
      }
    ],
    "sections": [
      {
        "id": "problem",
        "title": "Selecting a coordinate needs to lead to a useful action",
        "paragraphs": [
          "The hackathon team built a map for recording emotions and stories at places. Location permission, address search, recording, and discovery needed to work as one flow while frontend and backend development happened in parallel."
        ]
      },
      {
        "id": "decisions",
        "title": "Connect location, recording, and exploration",
        "paragraphs": [],
        "subsections": [
          {
            "title": "Map and server state",
            "paragraphs": [
              "React, TypeScript, and Vite provide the app foundation, with TanStack Router and Query for navigation and server state. Kakao Map supports current-location movement, coordinate selection, markers, and address search with coordinate conversion."
            ]
          },
          {
            "title": "Two-step recording",
            "paragraphs": [
              "Users first choose an emotion and then add a title, story, and photo. The selected emotion appears in the marker and badge, preserving the meaning of the record beyond its coordinates."
            ]
          },
          {
            "title": "Discovery on a mobile map",
            "paragraphs": [
              "Emotion filters, newest and popular sorting, personal records, and a top-places sheet support discovery. Records sharing a coordinate can be explored with previous and next navigation.",
              "Forms, place details, and popular lists use bottom sheets, with action and filter placement arranged around the map."
            ]
          },
          {
            "title": "An explicit backend contract",
            "paragraphs": [
              "I documented place-list, detail, creation, deletion, like, and liked-state endpoints with multipart image upload. The shared specification provided a concrete integration target during parallel development."
            ]
          }
        ]
      },
      {
        "id": "outcome",
        "title": "Grand Prize at the 12th Highthon",
        "paragraphs": [
          "Marker connected map selection, emotional recording, image upload, filtering, likes, and sheet interactions in one web app and received the event Grand Prize.",
          "The main design work was turning a selected location into a clear recording or exploration flow, supported by an explicit API contract."
        ]
      }
    ]
  },
  'rust-with-typescript': {
    "category": "Personal · Open Source",
    "badge": "Live",
    "role": "Creator",
    "thesis": "Explaining Rust through concepts TypeScript developers already know",
    "responsibility": "Fourteen-chapter curriculum, bilingual content, example validation, browser runner, and deployment",
    "focus": [
      "Developer education",
      "Rust",
      "Bilingual docs",
      "Browser runner"
    ],
    "summary": "A deployed bilingual Rust guide with 14 chapters, paired TypeScript examples, and a browser runner restricted to documented code.",
    "evidence": [
      {
        "val": "Learning guide",
        "label": "Learn concepts by comparing TypeScript and Rust examples side by side"
      },
      {
        "val": "Runnable examples",
        "label": "Run documented Rust examples and inspect output and compiler errors"
      }
    ],
    "sections": [
      {
        "id": "problem",
        "title": "New syntax is only part of learning Rust",
        "paragraphs": [
          "TypeScript developers need a bridge from familiar concepts to ownership, borrowing, and lifetimes. I built a learning environment that pairs examples and displays compiler feedback beside the explanation.",
          "Running examples also turns a documentation site into an entry point to an execution service. The learning flow and the boundary on accepted requests needed to be designed together."
        ]
      },
      {
        "id": "decisions",
        "title": "Connect the curriculum, execution boundary, and deployment",
        "paragraphs": [],
        "subsections": [
          {
            "title": "Fourteen chapters built around familiar concepts",
            "paragraphs": [
              "Astro and Starlight provide Korean and English content. Paired examples cover ownership, borrowing, enums, pattern matching, traits, error handling, and concurrency, explaining how the two type systems express the same problem."
            ]
          },
          {
            "title": "Separate the document from the Rust process",
            "paragraphs": [
              "The site and execution API run on Cloudflare Workers and forward accepted examples to a separate Rust/Axum service. Code blocks display stdout, stderr, exit code, and duration, keeping compiler errors within the learning flow."
            ]
          },
          {
            "title": "Accept examples included in the documentation",
            "paragraphs": [
              "A build step generates a SHA-256 allowlist of runnable snippets. The API normalizes requests and rejects undocumented code before forwarding it, matching a product built for running examples rather than accepting arbitrary input.",
              "The execution service limits concurrent compilations and per-IP requests, uses separate compile and run timeouts and per-run temporary directories, and truncates returned output."
            ]
          },
          {
            "title": "Verify and publish the two parts",
            "paragraphs": [
              "CI checks the Astro site and the Rust service separately through type checks, builds, clippy, and tests. Main-branch changes deploy to Workers before a version tag and GitHub Release are generated."
            ]
          }
        ]
      },
      {
        "id": "outcome",
        "title": "A published curriculum with an integrated execution flow",
        "paragraphs": [
          "The project provides 14 chapters in Korean and English and an implemented in-document Rust execution flow. The Workers site, source, deployment workflow, and release history are publicly accessible.",
          "The work extends from technical writing to build-time example validation, API and execution-service separation, feedback display, and release automation."
        ]
      }
    ]
  },
  kivra: {
    "category": "Team Developer Tool · Local Desktop App",
    "role": "Developer contributor",
    "thesis": "Capturing execution context across terminals and editors",
    "responsibility": "Execution-capture contract, terminal and IDE integrations, and desktop module separation",
    "focus": [
      "Tauri",
      "Execution capture",
      "IDE protocol",
      "Module boundaries"
    ],
    "summary": "A collaborative local-first desktop tool connecting project execution context across a Tauri app, terminal, VS Code, and JetBrains.",
    "evidence": [
      {
        "val": "Run history",
        "label": "Collect terminal and IDE runs, errors, and resolution notes by project"
      },
      {
        "val": "Local workspace",
        "label": "Find previous execution context in a desktop app while working on the next task"
      }
    ],
    "sections": [
      {
        "id": "problem",
        "title": "Execution context is scattered across tools",
        "paragraphs": [
          "Kivra collects projects, execution history, and solution notes in a local desktop app. I worked on collecting terminal and editor runs in a shared format and showing them alongside project context."
        ]
      },
      {
        "id": "decisions",
        "title": "Share a capture contract and separate responsibilities",
        "paragraphs": [],
        "subsections": [
          {
            "title": "One contract for execution start, events, and completion",
            "paragraphs": [
              "In PR #1, I added the capture contract in packages/protocol and connected zsh shell capture, Rust ingestion, and the runs interface. External execution records are included in the desktop Runs list with their output and completion information.",
              "VS Code and JetBrains use the same capture flow rather than independent record formats. Each integration can evolve while retaining a shared contract for the desktop reader."
            ]
          },
          {
            "title": "Separate the existing desktop responsibilities",
            "paragraphs": [
              "In PR #4, I split the existing Rust entry point into authentication, captured-run, project, and integration modules. Renderer components, services, and settings were also separated, preserving behavior while making the responsibilities easier to change independently."
            ]
          },
          {
            "title": "Collaborate on the same integration boundary",
            "paragraphs": [
              "Another contributor updated central captured-run storage in PR #2, including VS Code tests and diagnostics. The team refined record creation, storage paths, and integration diagnostics around the same collection flow."
            ]
          }
        ]
      },
      {
        "id": "outcome",
        "title": "External runs appear in the local desktop workflow",
        "paragraphs": [
          "Terminal, VS Code, and JetBrains integrations produce a shared execution record that Rust reads and passes to the desktop Runs interface.",
          "Local collection is separate from optional account and synchronization features. My contribution connects the protocol, editor integrations, and module boundaries that let several tools share execution context."
        ]
      }
    ]
  },
  homepage: {
    evidence: [{ val: 'Company website', label: 'Introduces company technology and products and directs visitors to inquiries' }],
    "title": "Bigtablet Homepage Renewal",
    "category": "Company · Public Website",
    "role": "Frontend Engineer",
    "thesis": "Keeping localized content, rendering, and motion coherent",
    "responsibility": "Server and client boundaries, localization, responsive UI, motion cleanup, and SEO",
    "focus": [
      "Rendering boundaries",
      "i18n",
      "Motion lifecycle",
      "SEO"
    ],
    "summary": "Contributed to the company website renewal and maintenance, covering server rendering, bilingual error flows, animation cleanup, and public-site delivery.",
    "sections": [
      {
        "id": "problem",
        "title": "Localization and interaction extend beyond the main content",
        "paragraphs": [
          "I contributed to the renewal and maintenance of Bigtablet’s Korean and English company website, including company information, history, and recruitment content.",
          "Error screens could retain Korean copy or display mismatched history content. Rapid year changes could also leave an earlier GSAP animation running against the new screen."
        ]
      },
      {
        "id": "decisions",
        "title": "Align rendering, language, and interaction lifetimes",
        "paragraphs": [],
        "subsections": [
          {
            "title": "Keep static composition on the server",
            "paragraphs": [
              "I removed the unnecessary client declaration from the main page’s static widget composition. The about page reads localized messages in a server component and validates the history structure with Zod instead of relying on a type assertion."
            ]
          },
          {
            "title": "Translate failure and return paths",
            "paragraphs": [
              "The next-intl messages cover errors, retries, and back-to-list actions across recruitment, blog, about, root error, and 404 pages. I also corrected multiline message rendering and news-image alternative text."
            ]
          },
          {
            "title": "Clean up the animations an effect creates",
            "paragraphs": [
              "History animations run inside a gsap.context scoped to the content element and revert on cleanup. This cleans up the created tweens as well as the animation frame when the year changes or the screen unmounts.",
              "A reduced-motion hook is applied to scroll effects and the banner so interaction respects the user’s system preference."
            ]
          },
          {
            "title": "Maintain the public delivery surface",
            "paragraphs": [
              "I maintained metadata, sitemap and robots output, asset paths, localized links, and responsive behavior alongside build checks and deployment-branch changes."
            ]
          }
        ]
      },
      {
        "id": "outcome",
        "title": "Concrete changes to rendering, language, and motion",
        "paragraphs": [
          "Static page composition moved to server rendering while interactive areas retained client behavior. Localization now includes error, retry, and return actions.",
          "History animations clean up on transitions and support reduced-motion preferences. Public commits show the authored changes to these rendering and interaction boundaries.",
          "This case describes the earlier Next.js renewal and maintenance work. A June 30, 2026 follow-up changed the root to a temporary static home, so the current public design should not be treated as a screenshot of that implementation."
        ]
      }
    ]
  },
  echo: {
    "category": "Hackathon · Excellence Prize",
    "badge": "11th Highthon Excellence Prize",
    "role": "Frontend Engineer",
    "thesis": "Connecting voice detection feedback with a clear recording lifecycle",
    "responsibility": "Expo interfaces, WebSocket state, audio lifecycle, group flows, and statistics UI",
    "focus": [
      "React Native",
      "WebSocket",
      "Audio lifecycle",
      "Data visualization"
    ],
    "summary": "An Expo hackathon app connecting voice-detection feedback, group management, and statistics interfaces, awarded the 11th Highthon Excellence Prize.",
    "evidence": [
      {
        "val": "Voice feedback",
        "label": "Review detected language during recording and reflect on language habits"
      },
      {
        "val": "Groups and statistics",
        "label": "Create or join groups and review detection results through statistics"
      }
    ],
    "sections": [
      {
        "id": "problem",
        "title": "Recording and connection state change independently",
        "paragraphs": [
          "The team built a voice-feedback app with group and statistics screens. I worked on Expo interfaces, group integration, connection state, and audio resource handling.",
          "Permission, server connection, and recording can change at different moments. Starting, stopping, and disconnecting needed clear ordering so the screen and microphone state did not drift apart."
        ]
      },
      {
        "id": "decisions",
        "title": "Model the lifecycle alongside the interface",
        "paragraphs": [],
        "subsections": [
          {
            "title": "Show recording and server feedback together",
            "paragraphs": [
              "Expo Router separates Home, Group, Create, and Statistics. The home screen reflects the recording toggle, connection, and parsed server text, detection, confidence, and energy values.",
              "Connection timeouts, errors, and close codes are distinguished. An unexpected disconnect triggers cleanup and a reconnect attempt while the user has the feature enabled. Resource cleanup is separate from stop-API calls to avoid a recursive shutdown path."
            ]
          },
          {
            "title": "Use environment-specific audio paths",
            "paragraphs": [
              "The browser converts Web Audio input to Int16 samples and sends them over WebSocket. The native path uses expo-av to start and stop recording and sends recording-status messages.",
              "Cleanup covers processors, audio contexts, stream tracks, recording objects, and timers. Permission, recording API, and connection checks run in sequence, with toggle state restored when a step fails."
            ]
          },
          {
            "title": "Connect group operations and build exploratory statistics UI",
            "paragraphs": [
              "The group flow covers creation, joined groups, invitation codes, forbidden-word actions, and sortable member lists.",
              "The statistics interface uses sample data for React Native SVG charts, hourly and weekly views, point selection, tooltips, and metric cards. Horizontal scrolling keeps hourly values explorable on a narrow screen."
            ]
          }
        ]
      },
      {
        "id": "outcome",
        "title": "A complete hackathon presentation across the main screens",
        "paragraphs": [
          "The app connected detection feedback, recording and connection state, group operations, and statistics interfaces and received the 11th Highthon Excellence Prize.",
          "The project combined fast interface delivery with explicit permission, connection, and audio cleanup sequencing."
        ]
      }
    ]
  },
  chorus: {
    "category": "Personal · Creative Tool",
    "role": "Creator",
    "thesis": "Giving shared music a sense of material and motion",
    "responsibility": "Music search, Web Audio behavior, 3D rendering, mobile composition, and image export",
    "focus": [
      "Svelte 5",
      "Threlte",
      "Three.js",
      "Image export"
    ],
    "summary": "A deployed music-card maker connecting iTunes search, audio preview, reactive 3D vinyl, and vertical image export.",
    "evidence": [
      {
        "val": "Music cards",
        "label": "Choose a track and add a message to create a 3D vinyl card"
      },
      {
        "val": "Sharing",
        "label": "Save the finished card as a portrait image or share its link"
      }
    ],
    "sections": [
      {
        "id": "problem",
        "title": "A visual card still needs to work on a phone",
        "paragraphs": [
          "I wanted to turn a song, album cover, and short message into a vertical sharing card. Search, audio preview, 3D rendering, and saving needed to form one mobile flow.",
          "This required handling browser audio policies, capturing WebGL content, and adapting image saving to different devices."
        ]
      },
      {
        "id": "decisions",
        "title": "Connect rendering to playback and export behavior",
        "paragraphs": [],
        "subsections": [
          {
            "title": "Search and card state",
            "paragraphs": [
              "SvelteKit and Svelte 5 Runes connect iTunes search and track selection to the studio. The cover, title, artist, and custom message are reflected in one composition."
            ]
          },
          {
            "title": "Audio-driven material and motion",
            "paragraphs": [
              "Threlte and Three.js render a reflective vinyl record. Web Audio frequency data drives a bass-responsive visualizer, while playback controls rotation and visual state.",
              "Audio context creation, resume, and playback begin from a user gesture for mobile browsers. Leaving the screen pauses audio, closes the context, and cancels the animation frame."
            ]
          },
          {
            "title": "Capture WebGL and text together",
            "paragraphs": [
              "The WebGL renderer preserves its drawing buffer and html-to-image captures the canvas with the surrounding card. A saving guard prevents duplicate requests and a brief render delay precedes capture.",
              "Desktop export triggers a download; mobile export opens the image for saving. Link sharing prefers the Web Share API and falls back to copying the URL."
            ]
          }
        ]
      },
      {
        "id": "outcome",
        "title": "From a selected track to a shareable card",
        "paragraphs": [
          "Chorus connects music search, audio preview, reactive 3D rendering, message editing, and vertical PNG export in one creation flow.",
          "The implementation connects track selection, playback, message editing, and image saving while accounting for browser differences."
        ]
      }
    ]
  },

};
