# Progress

## Current Status

Phases 2 through 7 are complete by user direction. Phase 8 adds a full-viewport homepage contact form after Photography, using the existing light palette, editorial typography, and rounded accent control. Name, email, and message are required; company is optional. The Contact menu links to `/#contact`. The form is presentation-only: submission handling and feedback are removed by user direction; message delivery remains unconfigured. Validation remains pending with the user. Phase 9 onward and standalone routes remain deferred.

Photography retains its scroll-driven collage and normal-flow reduced-motion grid. Approved portrait placeholders remain until photographs are supplied. Completion records approved milestones, not unreported validation results.

Contact field underlines smoothly darken on focus and fade on blur, with immediate changes for reduced motion. Browser acceptance remains pending.

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
| 8 | Contact form | UI implemented; delivery configuration and user validation pending |
| 9 | Footer |
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

Phase 7 is complete by user direction. Technical checks and replacement photography remain pending.

- [ ] Review Phase 8 after Photography: desktop/mobile and short-screen layouts, zoom, keyboard focus, faded field underlines that turn dark on focus without rectangular outlines, optional company, resizable message box, and Contact menu/`/#contact` navigation. Supply a receiving endpoint/service before enabling delivery.

- [ ] Review Phase 7: black capabilities exit, centered photo during entry, spread starting only at full-screen coverage, upward photo travel with a stationary heading, all 26 entries, reverse/fast scrolling, reload mid-section, mobile/short screens, orientation changes, header access, and live reduced motion. Add photographs using `src/assets/photography/README.md`; verify crops, alt text, missing-image fallback, and `/#photography`.

- [ ] Review Phase 6 after About: center appearance, gradual three-circle orbit, merge, and edge-to-edge black expansion. Check reverse/fast scrolling, reload within the section, mobile/short screens, orientation changes, header/menu access, and live reduced motion (immediately readable paragraph without pinning). Check the white paragraph reveal, one-screen fit, keyboard access, and zoom overflow. Capability copy and line placement live in `src/components/sections/Capabilities.tsx`; check the staggered line layout across screen sizes.
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
