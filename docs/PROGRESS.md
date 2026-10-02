# Progress

## Purpose

Track planning readiness and implementation milestones. Checkboxes describe actual completion, not approval of every proposed feature. Detailed specifications remain in their owning documents.

## Current Status

**Phase:** Planning and specification, with a minimal application scaffold present.

**Latest decisions recorded:** All four audience goals; all discussed sections and Lab; a separate Contact page later; generated demo content and repeated imagery; `anku.avif` for photography; Manrope and Instrument Serif; the existing palette; pnpm; modern mobile/desktop support; and the established hero concept.

**In progress:** Implementation planning and prototype composition. No portfolio features were implemented in this documentation update.

# Phase 0 — Foundation

Goal: establish a usable technical baseline after planning decisions are ready.

- [x] Initialize React + TypeScript + Vite project
- [x] Add and configure Tailwind CSS
- [x] Create base `src` folders
- [x] Add initial logo, favicon, and portrait files
- [x] Create and consolidate project documentation
- [x] Confirm pnpm and authorize necessary implementation dependencies
- [x] Select Manrope, Instrument Serif, and the existing design-system palette
- [ ] Add React Router (planned; absent from `package.json`)
- [ ] Establish approved fonts and base design tokens
- [ ] Build route shell and global error/fallback strategy
- [ ] Verify the application baseline with the agreed development checks

**Done when:** the app boots cleanly, routing and global styling work, and feature work can begin without restructuring. The existing scaffold was inspected, not run, during this documentation pass.

# Phase 1 — Header & Navigation

Goal: implement the persistent navigation defined in [EXPERIENCE.md](EXPERIENCE.md).

- [ ] Build fixed header with logo and menu controls
- [ ] Build fullscreen links, previews, and open/close state
- [ ] Add menu reveal, close, and focus/hover treatments
- [ ] Integrate route changes and menu dismissal
- [ ] Validate keyboard, touch, mobile, and reduced-motion behavior

**Done when:** navigation works across routes and input modes.

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

1. Use the confirmed decisions below; missing real content does not block the initial demo build.
2. Compose the experience with the selected fonts, palette, and available imagery across desktop/mobile.
3. Once implementation is requested, finish the foundation and navigation using pnpm.
4. Validate the established hero concept with consistent visuals and adaptive performance.
5. Build all included content sections/routes; defer the separate Contact page.

This update records decisions only and does not start implementation.

## Blockers

No user-input blocker remains for an initial implementation. Dummy content and repeated images are authorized. Detailed layouts, gallery behavior, technical methods, and performance thresholds can be chosen during prototyping. Font license records remain a production asset-preparation task.

## Known Decisions Still Pending

**Confirmed decisions:**

- [x] **Audience:** hiring, client work, collaboration, and creative exploration; no exclusive ranking specified.
- [x] **Scope:** all discussed sections and Lab included; About, Work, case studies, Photography, and Lab pages included; standalone Contact required later. See [ROUTES.md](ROUTES.md).
- [x] **Content:** generated personal copy, dummy project/Lab data, and repeated available imagery authorized under [AGENTS.md](../AGENTS.md#content-safety--accuracy).
- [x] **Photography:** use `src/assets/anku.avif` initially.
- [x] **Visual system:** Manrope and Instrument Serif from local assets, existing [design-system palette](DESIGN_SYSTEM.md), and the same overall look and feel across devices.
- [x] **Technical baseline:** pnpm; necessary dependencies may be chosen during implementation; target modern mobile and desktop browsers.
- [x] **Quality goal:** high-quality graphics and experience with decent performance, adapted to hardware without losing the identity.
- [x] **Hero brief:** follow the established concept in [PROJECT.md](PROJECT.md#core-creative-concept).

**Implementation choices to resolve through design/prototyping:**

- [ ] Detailed compositions, font-role balance, type/spacing scales, breakpoints, and token wiring.
- [ ] Number/order of dummy projects and Lab entries; gallery model using repeated imagery.
- [ ] Menu composition, motion timings, camera path, and hero-to-DOM handoff.
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
