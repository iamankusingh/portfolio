# Progress

## Current Status

Phases 2 through 10 are complete by user direction. The Phase 8 contact form submits to the configured Google Apps Script web app; deployed script compatibility and spreadsheet delivery await user validation. See [contact delivery](CONTACT_DELIVERY.md). Phase 9 implements a full-viewport dark night footer after Contact, with moonlit 3D water, identity, homepage links, authorship, and an explicit last-updated date. Footer content, rendering, and static fallback live in `Footer.tsx`. Validation remains pending with the user. Phase 10 About is complete by user direction; technical validation and final profile copy/location remain pending. Phase 11 is active: `/work` shares the homepage work layout and data, with overlapping sticky cards and GSAP scroll-driven depth. User validation remains pending. Phase 12 onward remain deferred.

Photography uses the 140 supplied WebP assets in `src/assets/photographs/`, cataloged in `src/data/photograph.ts`. A stable random selection of 25 entries has `displayInHome: true`; final curation remains with the user. The GSAP collage and reduced-motion grid preserve original aspect ratios. The original opening collage positions and staggered scrolling rows are restored by user direction, including edge-framed photographs. Collage images are enlarged uniformly while preserving their centers and original aspect ratios. Clicking a photograph opens a native fullscreen dialog with a GSAP transition from the clicked image to the center, a simultaneous subtle backdrop blur, and a reverse close transition. The uncropped image, close button, Escape support, and restored trigger focus remain; reduced motion opens immediately. Viewer smoothing now waits for image decode before handing off from the source, uses GSAP transforms for travel, and fades a fixed blur layer instead of tweening blur strength. The viewer locks only root scrolling so the sticky collage retains its position behind the blurred backdrop. The reported stutter and background-visibility fixes await browser validation. Numbered alt labels await descriptive curation. Completion records approved milestones, not unreported validation results.

The homepage document-load loader is implemented with GSAP, resource-based progress, modal scroll/focus locking, reduced motion, resource-error fallbacks, and a bounded wait. Loader acceptance remains pending below.

Current focus: Phase 11 implements `/work` using the same Coming soon entries, images, and shared `WorkContent` layout as homepage Selected Work. Cards stack over preceding cards during scrolling; GSAP ScrollTrigger gently scales the covered card. Desktop retains the 60/40 image/details layout, and mobile stacks image above details. Keyboard focus restores the focused card to view; reduced motion and short viewports use normal flow. Menu and homepage links reach the route. Source review is complete; lint/build and browser acceptance remain pending. No dependencies changed.

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
| 8 | Contact form | Complete by user direction; submission implemented, delivery validation pending |
| 9 | Footer | Complete by user direction |
| 10 | About Page | Complete by user direction; technical validation and final copy/location pending |
| 11 | Work Page | Implemented; active, user validation pending |
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

- [ ] Review `/work` through the menu, homepage link, direct load, and browser back/forward. Check forward/reverse and rapid stacking, final-card release, mobile layout, short screens, resize, zoom, keyboard focus into covered cards, scrollable details, and live reduced motion. Recheck homepage Selected Work after shared markup extraction. Run current lint/build; validation remains with the user.

- [ ] Review `/about` through the menu, homepage link, direct load, and browser back/forward. Check portrait crop, two-section composition, all 14 logos and retained labels, blue hover/focus glow and its fade-out, mobile/desktop node spacing, zoom, keyboard node activation and focus, touch selection, connection highlighting, screen-reader announcements, and reduced motion. Confirm location and draft biography. Run current lint/build; validation remains with the user.

- [ ] Check the custom cursor on light/dark sections, all links (including fullscreen navigation), photography triggers and viewer, rapid hover changes, scrolling beneath a stationary pointer, route changes, viewport exit/return, and tab switching. Confirm native form-field cursors, keyboard focus, touch behavior, live reduced motion/forced colors, and StrictMode cleanup. Run current lint/build; browser validation remains pending with the user.

- [ ] Check the photography viewer: click/tap and keyboard activation, full-image fit, blurred backdrop, close button, Escape, focus return, background scroll locking, mobile rotation, and reduced motion. Current lint/build and browser checks remain pending.

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

Phase 7 is complete by user direction. Technical checks, final homepage selection, and descriptive alt text remain pending.

- [ ] Review Phase 8 after Photography: desktop/mobile and short-screen layouts, zoom, keyboard focus, faded field underlines that turn dark on focus without rectangular outlines, optional company, resizable message box, and Contact menu/`/#contact` navigation. Verify the deployed Apps Script contract and spreadsheet row creation using [CONTACT_DELIVERY.md](CONTACT_DELIVERY.md), including success, failure, timeout, and repeat-click behavior.

- [ ] Review Phase 7: black capabilities exit, centered photo during entry, spread starting only at full-screen coverage, upward photo travel with a stationary heading, the 25 selected WebP photographs, reverse/fast scrolling, reload mid-section, mobile/short screens, orientation changes, header access, and live reduced motion. Curate `displayInHome` using `src/data/photograph.ts`; check original aspect ratios, image loading, spacing, alt text, and `/#photography`. Current lint/build and browser checks remain pending.

- [ ] Review Phase 6 after About: early center appearance as it enters the viewport, GSAP forward/reverse progress and refresh cleanup, gradual three-circle orbit, merge, and edge-to-edge black expansion. Check reverse/fast scrolling, reload within the section, mobile/short screens, orientation changes, header/menu access, and live reduced motion (immediately readable paragraph without pinning). Check the white paragraph reveal, one-screen fit, keyboard access, and zoom overflow. Capability copy and line placement live in `src/components/sections/Capabilities.tsx`; check the staggered line layout across screen sizes.
- [ ] Review the Phase 5 About section after Selected Work: portrait crop, draft personal copy, desktop/mobile layout, zoom, and `/#about` navigation. Content lives in `src/data/anku.ts`; the real portrait is `src/assets/anku.webp`.
- [ ] Run `pnpm.cmd lint` and `pnpm.cmd build` for the current source.
- [ ] Check navigation, keyboard focus, touch, scrolling, and responsive layouts.
- [ ] Check velocity-based GSAP acceleration and settling with wheel ticks, trackpad momentum, quick reversals, page boundaries, menu opening during travel, route/back navigation, and live reduced-motion changes. Confirm touch/keyboard and nested scrolling stay native, with no duplicate listeners under StrictMode.
- [ ] Check pinning on desktop, mobile, and short screens; forward/reverse fades, fast scrolling, reload mid-section, final-card release, overflowing details, and the normal-flow reduced-motion alternative.
- [ ] Add project images using `src/assets/work/README.md`; check replacements and `/#selected-work` navigation.
- [ ] Check the text-free opening, house framing, camera travel, and introduction contrast across screen sizes, including gap-free hero coverage when mobile browser controls hide or return.
- [ ] Check camera acceleration and settling with wheel ticks, touch scrolling, abrupt stops/reversals, and menu/tab suspension.
- [ ] Check `/#introduction`, keyboard skip, reload/back navigation, fast scrolling before scene readiness, and live reduced-motion changes.
- [ ] Check scene loading, model textures, waterline, reflections, and cloud movement.
- [ ] Check reduced motion, Save-Data, rendering failure, and inactive-scene suspension.
- [ ] Profile performance and resource cleanup on desktop, tablet, and smartphone.

Earlier passing checks do not validate later edits. The user runs commands, servers, browsers, and profiling.

## Decisions and Preparation

Confirmed: pnpm, Manrope + Instrument Serif, existing palette, approved demo content, real portrait/photography, and shared high graphics quality. See [AGENTS.md](../AGENTS.md) for workflow and content rules.

Pending: current validation, real project images/content, later-page compositions and gallery behavior, public credits placement before launch, font license records, production asset optimization, metadata, and hosting. Original model licenses and attribution/adaptation records remain in place. Placeholder images support review without final assets; case-study links and Phase 12 onward remain deferred.

## Update Rule

Keep a short overview of the current state, phase status, blockers, and pending decisions. Replace outdated summaries instead of appending change history. Omit minor adjustments, implementation mathematics, coordinates, and repeated verification notes.
