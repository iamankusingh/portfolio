# Progress

## Current Status

Phases 2 through 9 are complete by user direction. The Phase 8 contact form remains presentation-only; message delivery is unconfigured. Phase 9 implements a full-viewport dark night footer after Contact, with moonlit 3D water, identity, homepage links, authorship, and an explicit last-updated date. Footer content, rendering, and static fallback live in `Footer.tsx`. Validation remains pending with the user. Phase 10 onward and standalone routes remain deferred.

Photography retains its scroll-driven collage and normal-flow reduced-motion grid. Approved portrait placeholders remain until photographs are supplied. Completion records approved milestones, not unreported validation results.

Current focus: the homepage document-load loader is implemented with GSAP. A centered circle brightens uniformly from black to white with real resource-group completion, then expands and fades into the initialized hero. Loading covers local fonts, the header logo, hero models/buffers/textures, and scene readiness; lazy media and other routes are excluded. Document-load-only display, modal scroll/focus locking, reduced motion, resource-error fallbacks, and a bounded wait are implemented. Source review is complete; lint/build and browser acceptance remain pending with the user. No dependency changes are required.

## Phase Checklist

| Phase | Work | Status |
|---|---|---|
| 0 | Foundation, routing, fonts, design tokens | Implemented; earlier lint/build passed; browser acceptance pending |
| 1 | Header and fullscreen navigation | Implemented; validation pending |
| 2 | Hero and 3D landscape | Complete by user direction |
| 3 | Homepage introduction | Complete by user direction |
| 4 | Selected work | Complete by user direction |
| 5 | About and portrait | Complete by user direction |
| 6 | Capabilities circle interlude | Complete by user direction |
| 7 | Photography | Complete by user direction |
| 8 | Contact form | Complete by user direction; delivery remains unconfigured |
| 9 | Footer | Complete by user direction |
| 10 | Work Page |
| 11 | About Page |
| 12 | Photography Page |
| 13 | Lab and experiments Page |
| 14 | Contact Page |
| 15 | Work index |
| 16 | Contact |
| 17 | Route transitions |
| 18 | Responsive and accessibility review |
| 19 | Performance review |
| 20 | SEO and metadata |
| 21 | Final QA and launch |

## Pending Acceptance

- [ ] Recheck Clouds after the reported `react-hooks/immutability` lint failure: a layout effect owns cloud instances/materials, and a module-level Three.js helper updates clone opacity from frame callbacks. Cleanup removes instances and disposes owned materials, including effect replay. Current lint/build and cloud-animation validation remain pending with the user.

- [ ] Check the homepage loader in a fresh tab: black opening, centered uniform brightness, smooth percentage, white pause, corner-covering expansion, and fade into an already-rendered hero. Check mobile rotation/resize during expansion, keyboard focus and scroll locking, touch, replay on every reload, and no replay on client-side route changes (including entering Home from another initial route). Reload to replay; browser storage is no longer used.
- [ ] Check loader recovery with throttled/failed models, textures, fonts, and logo requests; a stalled load must reveal the static landscape after the 15-second resource deadline plus exit animation. Check Escape, WebGL failure, Save-Data, reduced motion before/during loading, hidden-tab return, and StrictMode cleanup. Confirm lazy photographs, footer rendering, and other-page assets do not gate completion. Validation remains pending.

- [ ] Header social icons are implemented for GitHub, Instagram, LinkedIn, and X, with staggered menu-open entry and reduced-motion support. Supply profile URLs to enable destinations; check repeated opening, mobile wrapping, keyboard access, and reduced motion. Current lint/build and browser validation remain pending with the user.

- [ ] Check LinkButton compass arrows: pointer entry, rapid direction changes, movement across the pivot, exit/return, keyboard activation, touch, and live reduced motion. Current lint/build and browser validation remain pending.

- [ ] Check About portrait parallax in both scroll directions, crop and frame coverage on desktop/mobile, resize, and live reduced motion. Current lint/build and browser validation remain pending.

- [ ] Check Selected Work GSAP image crossfades and staggered text fades, including rapid forward/reverse scrolling and live reduced-motion changes. Short scroll intervals are preserved. Current lint/build and browser validation remain pending.

- [ ] Check Capabilities entry and reverse scrolling: copy is fully transparent and clipped until the post-merge text reveal, then retains the black-to-white transition and end glow. Keyboard focus and reduced motion keep immediate text access. Visual validation is pending.

- [ ] Check the new 300 ms wheel/trackpad hold when the animated hero introduction reaches its reading position: continuous input, reversal, menu interruption, repeat entry, and no jump after release. Touch/keyboard and static modes remain native. Current lint/build and browser validation are pending.

- [ ] Check smooth wheel/trackpad scrolling over the Capabilities center and revealed text. The unconditional native-scroll opt-out is removed; overflowing text retains native scrolling on short screens or at zoom. Browser validation remains pending.

- [ ] Check the shorter Selected Work pacing: projects advance with less than half the previous scroll distance; verify forward/reverse fades and final-card release on desktop and mobile. Validation remains pending.

- [ ] Review Phase 9 after Contact: moon and reflection framing, ripple appearance, desktop/mobile and short-screen layouts, zoom, footer links and back-to-top focus, last-updated date, live reduced motion, Save-Data, WebGL failure, menu/tab/offscreen suspension, and resource cleanup.

Phase 7 is complete by user direction. Technical checks and replacement photography remain pending.

- [ ] Review Phase 8 after Photography: desktop/mobile and short-screen layouts, zoom, keyboard focus, faded field underlines that turn dark on focus without rectangular outlines, optional company, resizable message box, and Contact menu/`/#contact` navigation. Supply a receiving endpoint/service before enabling delivery.

- [ ] Review Phase 7: black capabilities exit, centered photo during entry, spread starting only at full-screen coverage, upward photo travel with a stationary heading, all 26 entries, reverse/fast scrolling, reload mid-section, mobile/short screens, orientation changes, header access, and live reduced motion. Add photographs using `src/assets/photography/README.md`; verify crops, alt text, missing-image fallback, and `/#photography`.

- [ ] Review Phase 6 after About: early center appearance as it enters the viewport, GSAP forward/reverse progress and refresh cleanup, gradual three-circle orbit, merge, and edge-to-edge black expansion. Check reverse/fast scrolling, reload within the section, mobile/short screens, orientation changes, header/menu access, and live reduced motion (immediately readable paragraph without pinning). Check the white paragraph reveal, one-screen fit, keyboard access, and zoom overflow. Capability copy and line placement live in `src/components/sections/Capabilities.tsx`; check the staggered line layout across screen sizes.
- [ ] Review the Phase 5 About section after Selected Work: portrait crop, draft personal copy, desktop/mobile layout, zoom, and `/#about` navigation. Content lives in `src/data/anku.ts`; the real portrait is `src/assets/anku.avif`.
- [ ] Run `pnpm.cmd lint` and `pnpm.cmd build` for the current source.
- [ ] Check navigation, keyboard focus, touch, scrolling, and responsive layouts.
- [ ] Check velocity-based GSAP acceleration and settling with wheel ticks, trackpad momentum, quick reversals, page boundaries, menu opening during travel, route/back navigation, and live reduced-motion changes. Confirm touch/keyboard and nested scrolling stay native, with no duplicate listeners under StrictMode.
- [ ] Check pinning on desktop, mobile, and short screens; forward/reverse fades, fast scrolling, reload mid-section, final-card release, overflowing details, and the normal-flow reduced-motion alternative.
- [ ] Add project images using `src/assets/work/README.md`; check replacements and `/#selected-work` navigation.
- [ ] Check the text-free opening, house framing, forward/reverse camera travel, and introduction contrast on wide, portrait, and short screens.
- [ ] Check camera acceleration and settling with wheel ticks, touch scrolling, abrupt stops/reversals, and menu/tab suspension.
- [ ] Check `/#introduction`, keyboard skip, reload/back navigation, fast scrolling before scene readiness, and live reduced-motion changes.
- [ ] Check scene loading, model textures, waterline, reflections, and cloud movement.
- [ ] Check reduced motion, Save-Data, rendering failure, and inactive-scene suspension.
- [ ] Profile performance and resource cleanup on desktop, tablet, and smartphone.

Earlier passing checks do not validate later edits. The user runs commands, servers, browsers, and profiling.

## Decisions and Preparation

Confirmed: pnpm, Manrope + Instrument Serif, existing palette, approved demo content, real portrait/photography, and shared high graphics quality. See [AGENTS.md](../AGENTS.md) for workflow and content rules.

Pending: current validation, real project images/content, later-page compositions and gallery behavior, public credits placement before launch, font license records, production asset optimization, metadata, and hosting. Original model licenses and attribution/adaptation records remain in place. Placeholder images support review without final assets; case-study links and the Work index remain deferred.

## Update Rule

Keep a short overview of the current state, phase status, blockers, and pending decisions. Replace outdated summaries instead of appending change history. Omit minor adjustments, implementation mathematics, coordinates, and repeated verification notes.
