# Progress

## Current Status

Phases 2 and 3 are complete at the user's request. Phase 4 selected work is implemented with three Coming soon cards, a sticky scroll-driven crossfade, still images, and a reusable link button. Phase 5 onward and unbuilt routes remain deferred. Completion records the approved milestone, not unreported validation results.

- Existing two-circle header and fullscreen navigation.
- Shared link button uses the approved rounded primary surface, circular up-right arrow, and primary/secondary theme colors; visual and keyboard validation remain pending.
- Site-wide GSAP wheel/trackpad smoothing carries velocity between inputs for smooth acceleration, braking, and settling; it preserves real window scrolling and the sticky hero. Touch, keyboard, nested scrolling, anchors/history, and reduced motion remain native.
- Imported island and parked shore boat.
- 3D ocean with currents and reflections throughout.
- Eight distant mountains, sun, and moving clouds across the sky.
- Text-free opening; visible Explore and scene credits removed.
- Native-scroll camera approach with damped velocity for smooth starts/stops, and a semantic introduction over the landscape.
- Replaceable introduction copy with an explicit preview label; keyboard skip link.
- Dawn intro, responsive framing, and equal graphics quality across devices.
- Static fallback, reduced-motion support, automatic suspension, and cleanup.
- Selected work holds a viewport-height stage in place across screen sizes while scrolling fades between Coming soon cards. Desktop uses a 60/40 image/text split; mobile stacks image and text inside the same pinned card. Overflowing details remain scrollable. Only reduced motion uses normal-flow cards. Data uses plain image filenames in `src/data/works.ts`. Current validation remains pending.
- Place images in `src/assets/work` and set their exact filenames in the project data to replace the authored SVG placeholder. “View all work” targets the deferred `/work` route, which currently uses NotFound.

## Phase Checklist

| Phase | Work | Status |
|---|---|---|
| 0 | Foundation, routing, fonts, design tokens | Implemented; earlier lint/build passed; browser acceptance pending |
| 1 | Header and fullscreen navigation | Implemented; validation pending |
| 2 | Hero and 3D landscape | Complete by user direction |
| 3 | Homepage introduction | Complete by user direction |
| 4 | Selected work | Implemented; user validation pending |
| 5 | Project detail pages | Deferred |
| 6 | Capabilities | Deferred |
| 7 | About and portrait | Deferred |
| 8 | Photography | Deferred |
| 9 | Lab and experiments | Deferred |
| 10 | Work index | Deferred |
| 11 | Contact and closing scene | Deferred; standalone Contact page comes later |
| 12 | Route transitions | Deferred |
| 13 | Responsive and accessibility review | Deferred |
| 14 | Performance review | Deferred |
| 15 | SEO and metadata | Deferred |
| 16 | Final QA and launch | Deferred |

## Pending Acceptance

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

Pending: current validation, real project images/content, later-page compositions and gallery behavior, public credits placement before launch, font license records, production asset optimization, metadata, and hosting. Original model licenses and attribution/adaptation records remain in place. Placeholder images allow Phase 4 review without final assets; case-study links await Phase 5 and the Work index awaits Phase 10.

## Update Rule

Keep a short overview of the current state, phase status, blockers, and pending decisions. Replace outdated summaries instead of appending change history. Omit minor adjustments, implementation mathematics, coordinates, and repeated verification notes.
