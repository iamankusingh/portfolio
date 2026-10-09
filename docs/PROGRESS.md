# Progress

## Current Status

Phase 2 is complete at the user's request. Phase 3 introduction source is implemented and awaits user validation. Phase 4 onward and unbuilt routes remain deferred. Completion records the approved milestone, not unreported validation results.

- Existing two-circle header and fullscreen navigation.
- Imported island and parked shore boat.
- 3D ocean with currents and reflections throughout.
- Eight distant mountains, sun, and moving clouds across the sky.
- Text-free opening; visible Explore and scene credits removed.
- Native-scroll camera approach to the house and a semantic introduction over the landscape.
- Replaceable introduction copy with an explicit preview label; keyboard skip link.
- Dawn intro, responsive framing, and equal graphics quality across devices.
- Static fallback, reduced-motion support, automatic suspension, and cleanup.

## Phase Checklist

| Phase | Work | Status |
|---|---|---|
| 0 | Foundation, routing, fonts, design tokens | Implemented; earlier lint/build passed; browser acceptance pending |
| 1 | Header and fullscreen navigation | Implemented; validation pending |
| 2 | Hero and 3D landscape | Complete by user direction |
| 3 | Homepage introduction | Implemented; user validation pending |
| 4 | Selected work | Deferred |
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
- [ ] Check the text-free opening, house framing, forward/reverse camera travel, and introduction contrast on wide, portrait, and short screens.
- [ ] Check `/#introduction`, keyboard skip, reload/back navigation, fast scrolling before scene readiness, and live reduced-motion changes.
- [ ] Check scene loading, model textures, waterline, reflections, and cloud movement.
- [ ] Check reduced motion, Save-Data, rendering failure, and inactive-scene suspension.
- [ ] Profile performance and resource cleanup on desktop, tablet, and smartphone.

Earlier passing checks do not validate later edits. The user runs commands, servers, browsers, and profiling.

## Decisions and Preparation

Confirmed: pnpm, Manrope + Instrument Serif, existing palette, approved demo content, real portrait/photography, and shared high graphics quality. See [AGENTS.md](../AGENTS.md) for workflow and content rules.

Pending: Phase 3 acceptance, later-page compositions and gallery behavior, public credits placement before launch, font license records, production asset optimization, metadata, and hosting. Original model licenses and attribution/adaptation records remain in place. No content or asset blocker prevents current Phase 3 work.

## Update Rule

Keep a short overview of the current state, phase status, blockers, and pending decisions. Replace outdated summaries instead of appending change history. Omit minor adjustments, implementation mathematics, coordinates, and repeated verification notes.
