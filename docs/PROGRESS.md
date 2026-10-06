# Progress

## Purpose

Track planning readiness and implementation milestones. Checkboxes describe actual completion, not approval of every proposed feature. Detailed specifications remain in their owning documents.

## Current Status

**Shared high quality:** The user requested identical graphics on PC, tablet, and smartphone. Removed device/CPU tier selection, frame-time downgrades and slow-frame fallback, mobile 30fps timer, and CPU-based static fallback. All devices use antialiasing, DPR cap 1.75, 256×256 water geometry, and 768×768 reflections. Reduced-motion/Save-Data preferences, rendering failure fallbacks, and menu/tab/offscreen suspension remain. Static review only; lint/build and cross-device appearance, frame-time, and resource checks remain pending.

**Phase:** Phase 2 hero source is implemented; the reported `Hero.tsx` syntax error has been fixed. User-run build/browser/performance acceptance remains pending. Phase 0 browser and Phase 1 validation are still open.

**3D water revision:** The user authorized extra rendering cost for visible wave geometry. Water now uses four Gerstner layers with horizontal/vertical movement, tangent-derived normals, shoreline attenuation, pixel-filtered ripples, and distorted planar reflections of the actual island/clouds/sun through the installed Three.js Reflector. All devices use 131,072 triangles and a 768-square reflection target. Each presented frame adds a scene render. Wave time persists while mounted; geometry/material/render-target cleanup is explicit. No packages, tests, builds, servers, or browsers were run. Static review only; shader compilation, rolling wave appearance, reflection alignment/clipping, waterline, frame time, and GPU resource disposal remain pending user validation.

**Clouds and lighting:** Added four copies of the supplied Cloud Test glTF at different sky positions, widths, and yaw angles. The cloud's binary and both textures use explicit Vite URL mapping. Cached cloud geometry/materials/textures are shared; transparent surfaces disable depth writes. Reduced warm key strength, added a restrained cool fill, and narrowed/dimmed the water highlight. The sun now rises from y=7 to y=10 at z=-36, with its animated position shared by the water reflection, to fit the elevated camera. The visible name and pause control had returned in the current source and are removed again. Scene credits and the Explore destination are restored, including CC BY 4.0 cloud attribution. The user's island yaw is currently +36 degrees and is preserved. Static review only; lint/build, all asset URLs, cloud transparency/framing, lighting, mobile performance, and reduced-motion checks remain pending with the user.

**Hero simplification:** Removed the visible name and the manual pause/resume feature at the user's request. A screen-reader heading preserves semantic identity; Explore remains at the bottom of the opening. The island rotates around its centered world-Y pivot without changing its shoreline height; its current yaw follows the user's source adjustment. The current asset folder is `src/assets/3Dmodel/island/`. Reduced-motion fallback and menu/tab/offscreen suspension remain. Static review only; build, mobile framing, rotation, Explore, and automatic suspension checks are pending with the user.

**Opening correction:** Normal loading starts on a dark background and reveals only the actual 3D island after its first rendered frame. The sun rises, light increases, and fog clears over 1.6 seconds; the Explore cue receives short, coordinated emphasis. The alternate SVG no longer flashes before WebGL. Static/failure paths still use it. Cold-load, throttled-network, reduced-motion, and failure checks remain pending with the user.

**Material and line-artifact correction:** The current glTF has nine colored PBR materials and no image textures or texture references; authored materials remain intact. Renderer antialiasing is enabled, camera near distance increased to 0.5 for depth precision, and key/fill lighting reduced to preserve model colors. Water no longer displaces undersampled short waves or derives flat normals from individual triangles: three grid-resolved swells and continuous analytic normals replace them, with two pixel-filtered fragment ripple layers on high/medium. Repeating glint stripes are removed and wave time survives quality changes. Static review only; island colors, line artifacts, shader compilation, desktop/mobile cost, shoreline, and automatic suspension await user validation.

**Model integration:** The user changed the hero asset to Low-Poly Floating Island, now in `src/assets/3Dmodel/island/scene.gltf`. Its large cyan water plane uses the generic `Material`, so it is removed by its `Object_2` node identity before bounds are calculated. The remaining island is normalized independently and lifted so only 0.12 world units of its lowest point sit below the animated ocean. Credits identify Low-Poly Floating Island by Ram Surya. No dependency changes or validation commands were run. User checks: cold reload, production binary URL, shoreline height, mobile framing, reduced motion, and memory plateau across route visits.

**Earlier composition decision:** Replace the water corridor with a contained grassy mountain island, preserve the faceted mesh style, and reduce hero text to the name and small controls. Responsive camera framing and the static fallback were revised with it. Static review only; prior checks do not validate this revision.

**Current scope:** The user authorized Phase 2, superseding the earlier header-only homepage. The homepage now contains the existing navigation and the hero with its DOM handoff. Phase 3 introduction and later content/routes remain deferred; unbuilt destinations still use NotFound. Native scrolling and hidden scrollbar chrome remain.

**Implemented:** Screen-reader hero identity and visible Explore cue; a faceted grassy mountain island, visible shoreline, sparse grass tufts, and surrounding water; SVG fallback only for static preferences or scene failure; lazy imported island, procedural water, sun, fog, and camera; shared high-quality rendering across devices; restrained pointer/native-scroll progression; reduced-motion/data-saving fallbacks; offscreen/menu/tab suspension; scene failure isolation and resource cleanup paths.

**Dependencies:** Three.js, React Three Fiber, and Drei are already recorded in `package.json`. Scene code uses Three.js/Fiber. `@types/three` is now recorded in the user-managed manifest; no additional package is needed for the island revision. No manifests or lockfiles were edited by the agent.

**Working agreement:** Static source review only. The user owns packages, Git, servers, builds, lint, browsers, and profiling. Earlier passing checks do not validate Phase 2. Do not mark the phase accepted before runtime and performance evidence is supplied.

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

**Done when:** the app boots cleanly, routing and global styling work, and feature work can begin without restructuring. The build and local development server pass; Phase 0 remains open until browser acceptance is verified. HTTP delivery does not establish rendered route correctness. The homepage now includes the Phase 2 hero; unbuilt routes use NotFound.

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

- [x] Compose DOM typography with the canvas and static fallback
- [x] Implement the terrain, water, sun, atmosphere, and camera prototype
- [ ] User: validate desktop/mobile performance before expanding the asset pipeline
- [x] Add restrained pointer and scroll progression
- [x] Coordinate entry, typography, and 3D-to-DOM handoff (Phase 3 content remains deferred)
- [x] Implement progressive loading and reduced-motion/data-saving behavior
- [x] Add visibility suspension, error/context-loss fallback, and cleanup paths
- [x] User added `@types/three` (confirmed in package.json)
- [ ] User: run lint and build for the revised island hero
- [ ] User: verify frame rate, memory, cleanup, accessibility, and visual behavior

**Done when:** the hero communicates the identity, loads reliably, and hands off to content across devices. Source implementation is ready for user verification; this acceptance condition is not yet confirmed.

**Prototype decisions:** Imported Low-Poly Floating Island glTF plus an analytic water shader. The source has approximately 2,476 triangles before removing its ocean plane. All devices use full geometry, DPR cap 1.75, full water detail, and 768-square reflections. There is no mobile frame-rate cap or automatic downgrade. See [THREE_D.md](THREE_D.md#23-shared-high-quality) for rendering policy.

**User commands:**

```powershell
pnpm.cmd lint
pnpm.cmd build
pnpm.cmd dev
```

**Focused acceptance checklist:**

1. At 320px, tablet, desktop, and short landscape sizes, check the left-turned island's complete shoreline, grassy slopes, rocky summit, sun, and surrounding water, readable Explore cue, header clearance, and absence of horizontal overflow. Confirm there is no visible name or pause control and the screen-reader heading remains. Confirm the model's sand/grass/rock colors remain visible and water has no triangular grid lines or pixelated horizon bands. Check late font loading and browser zoom.
2. Follow “Explore” by keyboard and touch; confirm native scroll, reachable end of the landscape, visible focus, and back/forward behavior. Opening the menu or hiding the tab should freeze water and camera, resuming when active. Retest Phase 1 menu focus/scroll locking.
3. Enable reduced motion before load and toggle it live: preserve the landscape/copy without the canvas or entry transform. Check Save-Data where available. Block the lazy scene chunk or disable WebGL: navigation and fallback must remain usable.
4. With the scene loaded, use developer tools to simulate `WEBGL_lose_context` on its canvas. Confirm the static landscape survives without route failure. Reload or navigate away/back to try a fresh mount.
5. Profile a production preview (`pnpm.cmd preview` after build) on desktop, tablet, and smartphone using identical high-quality settings. About 60fps is a provisional target, not a measured guarantee. Confirm `data-scene-quality` stays `high` even under CPU throttling, with no automatic downgrade or slow-frame fallback.
6. Record frames/CPU with the menu open, tab hidden, and hero offscreen (once later content allows scrolling fully past it). Confirm continuous work stops. Repeat Home → unbuilt route → Home at least ten times and check that WebGL contexts, geometry/material memory, listeners, and timers do not accumulate. Report device/browser, timing, and memory observations.
7. Cold-load development and production preview: confirm the cloud glTF, binary, and both texture URLs load; check four soft clouds at varied sky locations without rectangular edges or dark depth artifacts. Verify the sun is visible below the header, the water highlight is restrained, Scene credits contain the cloud attribution, and the visible name/pause control are absent. Profile transparent cloud overdraw on mobile.
8. Check the revised ocean from desktop and portrait viewports: visible moving wave ridges, distorted island/cloud reflections, stable shoreline, no mirror seams or triangular bands. Check menu/tab suspension and reduced-motion fallback. Profile production frame times on desktop/tablet/smartphone and verify reflection targets do not accumulate after repeated route visits.

No lint, build, server, browser, test, package, or Git commands were run by the agent. Visual, accessibility, performance, and GPU cleanup acceptance remain pending.

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

1. User: run Phase 2 lint/build and the focused acceptance checklist for the revised island composition.
2. Resolve reported visual, accessibility, rendering, or performance issues; keep acceptance truthful.
3. Finish outstanding Phase 0/1 browser checks against the current build.
4. Validate the supplied glTF on desktop/mobile before adding more assets. Begin Phase 3 only when requested.

## Blockers

Runtime/build/browser/performance evidence is pending under the user-owned validation workflow. No content or external scene-asset blocker exists. Font license records remain a production preparation task.

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
- [x] Choose a restrained forward/down camera path and dark DOM handoff for the Phase 2 prototype; user visual acceptance pending.
- [x] Define procedural terrain/water techniques, initial quality thresholds, and provisional performance targets; measurements remain pending.
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





