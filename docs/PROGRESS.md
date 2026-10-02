# Progress

## Purpose

Track planning readiness and implementation milestones. Checkboxes describe actual completion, not approval of every proposed feature. Detailed specifications remain in their owning documents.

## Current Status

**Phase:** Phase 1 implementation complete; user-run build and browser acceptance remain pending. Phase 0 browser acceptance is also still open.

**Latest decisions recorded:** All four audience goals; all discussed sections and Lab; a separate Contact page later; generated demo content and repeated imagery; `anku.avif` for photography; Manrope and Instrument Serif; the existing palette; pnpm; modern mobile/desktop support; and the established hero concept.

**Structure:** Header controls, fullscreen menu, and navigation data are consolidated in `src/components/layout/Header.tsx`. The navigation component folder and standalone navigation data file have been removed. Ordinary styling now uses Tailwind; shared geometry, scroll locking, dialog transitions, and keyframes remain in `src/index.css`. Static review only; user validation remains pending.

**Current scope:** Header/navigation only on the homepage. Placeholder pages, demo homepage sections, and unused page-preview data were removed as requested. Not-found/error handling and the foundation remain. Scrollbars are hidden globally while scrolling remains enabled. Unbuilt menu destinations show NotFound, including `/contact`.

**Completed:** Phase 0 foundation plus the fixed two-circle header, fullscreen modal navigation, structured destinations, hover/focus previews, current-route indicators, route dismissal, responsive layout, and reduced-motion CSS. The interrupted Phase 1 edits were recovered and statically reviewed; no new packages are needed.

**Working agreement:** The user owns package installation, Git, app/server execution, and all validation. Agents edit source/docs and perform static review. Historical Phase 0 check results below do not validate the Phase 1 changes.

# Phase 0 — Foundation

Goal: establish a usable technical baseline after planning decisions are ready.

- [x] Initialize React + TypeScript + Vite project
- [x] Add and configure Tailwind CSS
- [x] Create base `src` folders
- [x] Add initial logo, favicon, and portrait files
- [x] Create and consolidate project documentation
- [x] Confirm pnpm and authorize necessary implementation dependencies
- [x] Select Manrope, Instrument Serif, and the existing design-system palette
- [x] Add React Router (`react-router` 8.4.0; pnpm lockfile updated)
- [x] Establish approved fonts and base design tokens
- [x] Build route shell and global error/fallback strategy
- [x] Pass `pnpm.cmd lint` and `pnpm.cmd build` (including strict TypeScript)
- [x] Start development/production-preview servers and verify HTTP delivery of route URLs, JS/CSS, favicon, and all three font files; confirm generated token utilities
- [ ] Finish browser acceptance: rendered routes, back/forward, contact hash, skip link and focus, font loading, responsive/reduced-motion layouts, and forced error recovery

**Done when:** the app boots cleanly, routing and global styling work, and feature work can begin without restructuring. The build and local development server pass; Phase 0 remains open until browser acceptance is verified. HTTP delivery does not establish rendered route correctness. The homepage is intentionally empty apart from its header/navigation; unbuilt routes use NotFound.

# Phase 1 — Header & Navigation

Goal: implement the persistent navigation defined in [EXPERIENCE.md](EXPERIENCE.md).

- [x] Build fixed header with logo and menu controls
- [x] Build fullscreen links, previews, and open/close state
- [x] Add menu reveal, close, and focus/hover treatments
- [x] Integrate route changes and menu dismissal
- [ ] User: run lint and build for the Phase 1 changes
- [ ] User: validate keyboard, touch, mobile, and reduced-motion behavior

**Done when:** navigation works across routes and input modes.

**Implementation status:** Ready for user validation. `Header` persists in the route shell and preserves the existing logo. The native dialog handles modal focus/background inertness; Escape and close dismiss it, and navigation remains immediate. The menu includes Home, Work, About, Photography, Lab, and Contact (currently an unbuilt route). Desktop previews respond to both hover and focus; smaller layouts retain every link. See [EXPERIENCE.md](EXPERIENCE.md#phase-1-implementation) and [MOTION.md](MOTION.md#phase-1-timing-choice).

**User verification:** Run `pnpm.cmd lint` and `pnpm.cmd build`, then start the app with `pnpm.cmd dev`. Check:

1. Open/close from each route, the current route, unknown URLs, and project URLs. Verify the logo returns home and unbuilt destinations, including Contact, show NotFound.
2. Use Tab/Shift+Tab, Enter, and Escape; confirm visible focus, focus containment, trigger focus restoration on dismiss, and destination focus after navigation.
3. Navigate back/forward while the menu is open; try rapid reopen/close and Ctrl/Cmd-clicking a link.
4. Check desktop previews with hover and keyboard focus; check 320px-wide and short landscape screens, touch scrolling inside the menu, and no background scrolling while open. Focused links should stay clear of fixed controls.
5. Enable reduced motion: links and controls remain available without reveal/transform effects. Verify scrolling resumes after close and scrollbars stay hidden, including inside the menu.

No tests, builds, servers, browsers, package operations, or Git commands were run for Phase 1. Keep acceptance unchecked until the user provides results.

# Phase 2 — Hero / 3D Landscape

Goal: validate and build the signature opening in [THREE_D.md](THREE_D.md).

- [ ] Compose DOM typography with the canvas and static fallback
- [ ] Prototype terrain, water, sun, atmosphere, and camera
- [ ] Validate desktop/mobile performance before expanding the asset pipeline
- [ ] Add restrained pointer and scroll progression
- [ ] Coordinate entry, typography, and 3D-to-DOM handoff
- [ ] Implement progressive loading and reduced-motion/low-power behavior
- [ ] Check frame rate, memory, and cleanup

**Done when:** the hero communicates the identity, loads reliably, and hands off to content across quality tiers.

# Phase 3 — Homepage Introduction

Goal: explain Anku's positioning after the hero.

- [ ] Generate demo philosophy copy and build the editorial composition
- [ ] Connect the hero handoff and restrained reveal
- [ ] Validate responsive type and reduced motion

**Done when:** the immersive opening leads naturally into a clear introduction.

# Phase 4 — Selected Work

Goal: present editorial project showcases, using dummy entries and repeated images initially.

- [ ] Define structured project content and select featured entries
- [ ] Build editorial previews with media, metadata, and case-study links
- [ ] Add justified pointer/hover interactions
- [ ] Validate responsive layout and selective media loading

**Done when:** visitors can understand the work and open deeper project pages.

# Phase 5 — Project Detail Pages

Goal: support reusable case studies.

- [ ] Implement `/work/:slug` and invalid-slug handling
- [ ] Build hero, overview/role/stack, problem/solution, and media sections
- [ ] Support relevant design/system explanations
- [ ] Add previous/next navigation and route transitions

**Done when:** selected projects can be presented fully without building each page separately.

# Phase 6 — Capabilities

Goal: communicate the intended capability groups using demo copy initially.

- [ ] Finalize development, design, systems, and creative-development content
- [ ] Build responsive typographic groups and any justified interaction

**Done when:** the section explains breadth without ratings or a generic skills grid.

# Phase 7 — About / Portrait

Goal: build the portrait section and included About page, with generated demo personal copy initially.

### Homepage About Preview

- [ ] Integrate `anku.avif`, demo biography, and editorial typography
- [ ] Add subtle reveal/depth treatment if retained
- [ ] Link to the included About route

### About Page

- [ ] Build `/about`
- [ ] Add clearly identified demo biography and personal-story content
- [ ] Compose the portrait and verified contact/social links

**Done when:** visitors understand the person behind the work through concise, accurate content.

# Phase 8 — Photography

Goal: build the photography chapter using `anku.avif` as the repeatable initial image.

### Homepage Photography Preview

- [ ] Use `anku.avif` to build the image-led teaser
- [ ] Connect it to the gallery route

### Photography Page

- [ ] Define replaceable photograph data with repeated `anku.avif` demo entries
- [ ] Build `/photography` using the chosen gallery model
- [ ] Add fullscreen viewing and supplied metadata where retained
- [ ] Validate keyboard/touch browsing, lazy loading, and image performance

**Done when:** photography feels calmer while remaining connected to the portfolio.

# Phase 9 — Lab / Experiments

Goal: make experimental work independently maintainable.

- [ ] Define demo experiment entries and their data
- [ ] Build the included `/lab` page; add individual views where useful
- [ ] Isolate heavy/experimental code and load it on demand

**Done when:** experiments can be added without destabilizing the main site.

# Phase 10 — Work Index

Goal: offer direct project browsing outside the homepage story.

- [ ] Build `/work` from shared project data
- [ ] Add responsive case-study links and filtering only if useful

**Done when:** visitors can browse the full project collection clearly.

# Phase 11 — Contact / Final Scene

Goal: conclude the homepage with a clear next action.

- [ ] Add generated contact CTA and supplied links or identified placeholders
- [ ] Build the sunset treatment and transition
- [ ] Later iteration: add the required `/contact` page and update the menu destination (deferred from the initial version)
- [ ] Validate mobile, reduced motion, and static fallback

**Done when:** the closing chapter is coherent and contact is obvious.

# Phase 12 — Route Transitions

Goal: connect pages without slowing navigation.

- [ ] Coordinate page enter/exit and fullscreen-menu transitions
- [ ] Preserve back/forward behavior and prompt interaction
- [ ] Validate reduced motion and slower devices

**Done when:** transitions preserve orientation and navigation reliability.

# Phase 13 — Responsive & Accessibility Pass

Goal: verify the complete experience across devices and input needs.

- [ ] Audit semantics, headings, alt text, contrast, and visible focus
- [ ] Test keyboard, touch, reduced motion, and WebGL-disabled access
- [ ] Review small screens, tablets, and large/high-density displays

**Done when:** the complete site is usable beyond the ideal desktop setup.

# Phase 14 — Performance Pass

Goal: validate the visual ambition under practical constraints.

- [ ] Inspect production bundles, initial JavaScript, and WebGL cost
- [ ] Audit image/model/texture/font payloads and loading boundaries
- [ ] Check layout shift, idle work, and unused dependencies/assets
- [ ] Test slower mobile hardware and throttled networks

**Done when:** measured performance meets the agreed targets without relying on high-end hardware.

# Phase 15 — SEO & Metadata

Goal: make every public route discoverable and shareable.

- [ ] Add titles, descriptions, social metadata, and Open Graph imagery
- [ ] Verify favicon/app icons, canonical URLs, and structured data where useful
- [ ] Confirm route content/heading semantics using the accessibility audit

**Done when:** public routes have intentional metadata and working social previews.

# Phase 16 — Final QA & Launch

Goal: prepare a complete public release.

- [ ] Test routes, internal/external links, and target desktop/mobile browsers
- [ ] Confirm the responsive, accessibility, fallback, and performance checks pass
- [ ] Verify demo content is clearly identified, or replace it with supplied real material where ready
- [ ] Remove debug output and verify production asset paths
- [ ] Run final build, deploy, and verify the deployed site
- [ ] Update README with confirmed setup and deployment details

**Done when:** the deployed site is stable, accurate, complete, and ready to share.

## Current Priorities

1. User: run the Phase 1 lint/build and focused browser checklist above, including the outstanding Phase 0 route checks.
2. Address any issues the user reports; keep validation status truthful.
3. When requested, begin the Phase 2 hero prototype with consistent visuals and adaptive performance.
4. Build portfolio content in its owning phases; add substantive route content and defer the separate Contact page.

This pass completes Phase 1 implementation only. Acceptance and later phases remain open.

## Blockers

No package or content blocker remains for Phase 1. Runtime, build, and browser verification await user results under the agreed workflow. Dummy content and repeated images remain authorized. Gallery behavior, hero techniques, and performance thresholds belong to later prototypes. Font license records remain a production asset-preparation task.

## Known Decisions Still Pending

**Confirmed decisions:**

- [x] **Audience:** hiring, client work, collaboration, and creative exploration; no exclusive ranking specified.
- [x] **Scope:** all discussed sections and Lab included; About, Work, case studies, Photography, and Lab pages included; standalone Contact required later. See [ROUTES.md](ROUTES.md).
- [x] **Content:** generated personal copy, dummy project/Lab data, and repeated available imagery authorized under [AGENTS.md](../AGENTS.md#content-safety--accuracy).
- [x] **Photography:** use `src/assets/anku.avif` initially.
- [x] **Visual system:** Manrope and Instrument Serif from local assets, existing [design-system palette](DESIGN_SYSTEM.md), and the same overall look and feel across devices.
- [x] **Technical baseline:** pnpm; agents may recommend necessary dependencies, and the user installs them; target modern mobile and desktop browsers.
- [x] **Workflow:** user owns package operations, Git, server/app execution, and all testing; agents own requested source/docs edits and static review.
- [x] **Quality goal:** high-quality graphics and experience with decent performance, adapted to hardware without losing the identity.
- [x] **Hero brief:** follow the established concept in [PROJECT.md](PROJECT.md#core-creative-concept).

**Implementation choices to resolve through design/prototyping:**

- [x] Wire local fonts, palette, and initial type/spacing/layout/radius/stacking tokens with default Tailwind breakpoints.
- [ ] Refine detailed compositions, font-role balance, scales, and breakpoints through feature prototypes.
- [ ] Number/order of dummy projects and Lab entries; gallery model using repeated imagery.
- [x] Implement numbered fullscreen menu composition and initial CSS motion timings; user visual acceptance pending.
- [ ] Choose camera path and hero-to-DOM handoff.
- [ ] Rendering techniques, quality thresholds, and measurable performance budgets.
- [ ] Optional cursor/smoothing/particles and advanced transitions where they improve the experience.
- [ ] Final scene assets, source/license records, and optimized exports.

**Later preparation:**

- [ ] Add the separate Contact page in its later iteration.
- [ ] Replace demo material with real portfolio content when available; any published fictional content must remain clearly identified.
- [ ] Record font sources/licenses and prepare optimized web exports as appropriate.
- [ ] Choose domain/hosting and verify client-side routes and share previews.
- [ ] Finalize metadata, Open Graph imagery, and launch QA.

Do not reopen confirmed choices merely because their implementation details remain unfinished.

## Progress Update Rule

After meaningful work, update checkboxes, current phase/priorities, blockers, and open decisions. Add tasks under their owning phase and mark a phase complete only when its **Done when** condition is met. Keep this a current status reference, not a detailed changelog.
