export interface ProjectSection {
  id: 'problem' | 'decisions' | 'outcome';
  title: string;
  paragraphs: string[];
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
  visibility?: string;
  focus: string[];
  evidence?: { val: string; label: string; detail?: string }[];
  sections: ProjectSection[];
}

export const projectKey = (slug: string) => slug.replace(/^\d+-/, '');

export const projectEn: Record<string, ProjectTranslation> = {
  notiiv: {
    category: 'Company · Production',
    badge: 'Flagship',
    role: 'Frontend Engineer',
    thesis: 'Operating four product apps and shared packages as one monorepo',
    responsibility: 'pnpm and Turborepo multi-app architecture, shared frontend infrastructure, operational UX, authentication, sharing, and webview edge conditions',
    visibility: 'Based on public product and repository structures. Internal customer and operational data are excluded.',
    focus: ['pnpm monorepo', 'Turborepo', 'BFF and WebAuthn', 'Operational UX'],
    summary: 'Operated admin, owner, status, and support apps with 12 shared packages in a pnpm and Turborepo monorepo, consolidating repeated authentication, API, sharing, and webview boundaries.',
    evidence: [
      { val: '4 apps', label: 'One product monorepo', detail: 'admin · owner · status · support' },
      { val: '12 packages', label: 'Shared foundation', detail: 'Repository snapshot from 2026-08-05' },
      { val: 'BFF + WebAuthn', label: 'Authentication boundary', detail: 'Cross-checked with code and commits' },
    ],
    sections: [
      { id: 'problem', title: 'Four products were repeating the same risk', paragraphs: [
        'Admin, customer support, owner dashboards, and shared pages each needed authentication, session handling, BFF proxies, customer registration, document viewing, and sharing. Similar logic was duplicated while browser and server edge conditions could still fail in different ways.',
        'Operator tools also exposed product friction. FAQ previews differed from the customer view, simple customer entry depended on spreadsheets, and mobile webviews could break OAuth, deep links, blob downloads, or browser APIs.',
      ] },
      { id: 'decisions', title: 'Make the boundaries shared and explicit', paragraphs: [
        'I extracted shared QueryClient and BFF proxy factories, added path validation and authentication options, and moved WebAuthn responses to Zod-based runtime parsing. Shared paths became a single source of truth across apps.',
        'I aligned the FAQ editor with the public renderer, added unsaved-change protection, simplified direct customer entry, and used optimistic updates for operator actions. Calendar exports followed RFC 5545, while webview fallbacks and PDF viewer gesture rules protected mobile edge cases.',
      ] },
      { id: 'outcome', title: 'A product surface that is easier to operate', paragraphs: [
        'Shared infrastructure reduced the need to fix the same issue in multiple apps. Operator workflows became shorter and more predictable, and real-world browser failures were handled as part of the product experience.',
      ] },
    ],
  },
  'design-system': {
    category: 'Company · Open Source · NPM', badge: 'NPM Published', role: 'Design System Engineer',
    thesis: 'From a component set to an interface platform for assembling and validating products',
    responsibility: 'Tokens, themes, component APIs, mobile layouts, accessibility, testing, and NPM releases',
    visibility: 'All figures can be reproduced from the public GitHub repository and NPM package.',
    focus: ['Design tokens', 'Component API', 'Accessibility', 'Release system'],
    summary: 'Built the foundation for product teams to create and validate interfaces with shared rules across tokens, layouts, motion, overlays, and releases.',
    evidence: [
      { val: '40+', label: 'Public components', detail: 'Public README' },
      { val: '11', label: 'Token domains', detail: 'SCSS variables and CSS custom properties' },
      { val: '68', label: 'Story files', detail: 'Repository snapshot from 2026-08-05' },
    ],
    sections: [
      { id: 'problem', title: 'Consistency had to include behavior', paragraphs: ['Shared UI meant more than matching colors. Component APIs, accessibility, themes, mobile navigation, motion, Storybook, tests, and publishing all had to behave consistently across products.'] },
      { id: 'decisions', title: 'Build a platform around the components', paragraphs: ['I organized light, dark, and system themes around CSS custom properties, added layout primitives and responsive mobile navigation, and used polymorphic types to protect link and button semantics.', 'Motion moved to a shared react-spring presence pattern. Storybook viewport resets and deterministic test setup made verification reliable, while NPM Trusted Publishing removed long-lived publish tokens.'] },
      { id: 'outcome', title: 'One shared way to build product UI', paragraphs: ['The system now covers more than 40 public components, 11 token domains, and 68 Storybook story files. Product teams can share interface rules, responsive behavior, and release practices through one package.'] },
    ],
  },
  intranet: {
    category: 'Company · Flutter App · Production', badge: 'Mobile', role: 'Flutter Developer',
    thesis: 'Connecting collaborative work and state inside one Flutter app',
    responsibility: 'Flutter app shell, messenger, mail and approval screens, offline data, notification deep links, and failure recovery',
    visibility: 'Internal business data is excluded. The case focuses on implementation structure and reproducible behavior.',
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
  boundra: {
    category: 'Open Source · Developer Tool', badge: 'Public Preview', role: 'Creator',
    thesis: 'Checking TypeScript monorepo domain boundaries with a Rust CLI',
    responsibility: 'Rule model, Rust analyzer, configuration validation, editor overlay, and benchmark design',
    visibility: 'Benchmarks use public fixtures and a documented local environment.',
    focus: ['Static analysis', 'Architecture rules', 'Vite overlay', 'Benchmarking'],
    summary: 'Built a Rust CLI that checks client, server, shared, domain, and app boundaries through BR-001 to BR-005, with Zod runtime contracts and a Vite development overlay.',
    evidence: [
      { val: '5 rules', label: 'BR-001 through BR-005' },
      { val: '10K files', label: 'Large fixture benchmark' },
      { val: '164.20 ms', label: 'Measured analysis time' },
    ],
    sections: [
      { id: 'problem', title: 'Architecture documents drift from the code', paragraphs: ['Layer and import rules are easy to agree on and hard to enforce. Reviewers repeatedly catch the same violations, while developers receive feedback too late.'] },
      { id: 'decisions', title: 'Make the rule executable and local', paragraphs: ['I implemented BR001 through BR005 in a Rust analyzer, validated configuration at runtime with Zod, and connected results to a Vite overlay for immediate feedback.', 'Benchmarks include generated fixtures and a real monorepo snapshot so performance claims remain reproducible instead of anecdotal.'] },
      { id: 'outcome', title: 'Fast feedback at repository scale', paragraphs: ['The analyzer processed a 10,000-file fixture in 164.20 ms and matched 2,559 import edges. Architecture rules became part of the development loop rather than a document checked after the fact.'] },
    ],
  },
  owkr: {
    title: 'OWKR Balance', category: 'Community · Live Operations', role: 'Creator',
    thesis: 'Bringing participant review and team setup into one live operations tool',
    responsibility: 'Product design, balancing algorithm, operator interface, shared user sheet, and data architecture for OWKR Balance',
    focus: ['Live operations', 'Constraint matching', 'Admin workflow', 'Shared roster'],
    summary: 'Built the live balancing tool used by OWKR operators to review Discord rosters, match teams by role and tier, share results, and maintain a shared user sheet.',
    evidence: [{ val: 'In use', label: 'OWKR live operations' }, { val: '10 players', label: 'Role and tier matching' }, { val: 'Discord OAuth', label: 'Operator access control' }],
    sections: [
      { id: 'problem', title: 'Every match repeated the same coordination work', paragraphs: ['Operators had to reconcile Discord rosters, actual participants, role preferences, tiers, team assignments, and shareable results across separate tools.'] },
      { id: 'decisions', title: 'Follow the operator workflow from roster to result', paragraphs: ['OWKR Balance imports or manually accepts rosters, checks actual participants, and evaluates team candidates using role preferences, unranked states, tank gaps, and microphone status.', 'Shared user sheets, private operator notes, Discord OAuth, and Upstash Redis keep team data, personal notes, and access control clearly separated. Operators can copy the final matchup as an image and paste it directly into Discord.'] },
      { id: 'outcome', title: 'Keep live use separate from development validation', paragraphs: ['OWKR Balance is actively used by OWKR operators. The separately developed Gather Bot passed automated concurrency and restart-recovery scenarios but was not adopted, so its results are presented only as development validation.'] },
    ],
  },
  jeomjuro: {
    title: 'Jeomjuro', category: 'Team Product · Monorepo', badge: 'pnpm Monorepo', role: 'Frontend Engineer',
    thesis: 'Operating the consumer app and admin tools as one product monorepo',
    responsibility: 'pnpm and Turborepo migration, consumer, admin and Storybook apps, shared API, design-system and test packages, notifications, and CI',
    focus: ['Monorepo', 'Admin tools', 'Optimistic UI', 'Delivery'],
    summary: 'Reorganized the store-owner community into a pnpm and Turborepo monorepo with consumer, admin, and Storybook apps plus shared API, configuration, design-system, and test packages.',
    evidence: [
      { val: '3 apps', label: 'consumer · admin · storybook' },
      { val: '4 packages', label: 'api · config · design-system · test-utils' },
      { val: 'Turborepo', label: 'Build, test, and typecheck flow' },
    ],
    sections: [
      { id: 'problem', title: 'Consumer and admin work needed one operating structure', paragraphs: ['Community, brand, profile, notification, and moderation features were growing inside one repository without clear boundaries between applications, shared UI, API clients, tests, Storybook, and delivery rules.'] },
      { id: 'decisions', title: 'Rebuild the repository as a product monorepo', paragraphs: ['I moved the existing app into apps/consumer, added apps/admin and apps/storybook, and separated API, configuration, design-system, and test utilities into packages. pnpm workspace and Turborepo now coordinate builds, tests, and type checks.', 'Consumer tokens and flows were refined alongside admin authentication, moderation tables, search, filters, delete and restore actions, optimistic notification reads, Storybook, and CI.'] },
      { id: 'outcome', title: 'One repository for the product and its operations', paragraphs: ['Consumer and operator experiences now evolve inside explicit app and package boundaries, with shared interface rules and repeatable verification from development through deployment.'] },
    ],
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
    category: 'Developer Tool · Prototype', role: 'Creator',
    thesis: 'Making execution, errors, and solutions searchable in the next development session',
    responsibility: 'Tauri desktop app, editor plugin protocol, and development memory model',
    focus: ['Tauri', 'Developer memory', 'IDE protocol', 'Local-first'],
    summary: 'A local-first developer memory prototype that connects terminal context and solution notes across VS Code and JetBrains.',
    sections: [
      { id: 'problem', title: 'Solutions lose the context that made them useful', paragraphs: ['Execution history, errors, fixes, and notes are scattered across terminals, editors, chat, and personal documents.'] },
      { id: 'decisions', title: 'Share a memory protocol across tools', paragraphs: ['Kivra stores project execution context locally and lets VS Code and JetBrains plugins access it through one editor-neutral protocol.'] },
      { id: 'outcome', title: 'A prototype for portable development memory', paragraphs: ['The project currently validates the product model and basic integrations. It is presented as a design experiment, not a finished production result.'] },
    ],
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
