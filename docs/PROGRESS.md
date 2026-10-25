# Progress

## Current Status

Phases 2 through 14 are complete by user direction, including the Lab entry and Flowpaper at `/lab`. Phase 15 is active: subtle scroll-driven morning-to-day-to-evening atmosphere across the homepage, ending at the existing night footer. Other experiments and Phase 16 onward remain deferred. Technical and browser validation remain pending with the user, including Flowpaper and contact delivery. Final About copy/location and photography curation remain pending.

Photography uses the 140 supplied WebP assets in `src/assets/photographs/`, cataloged in `src/data/photograph.ts`. A stable random selection of 25 entries has `displayInHome: true`; final curation remains with the user. The GSAP collage and reduced-motion grid preserve original aspect ratios. The original opening collage positions and staggered scrolling rows are restored by user direction, including edge-framed photographs. Collage images are enlarged uniformly while preserving their centers and original aspect ratios. Clicking a photograph opens a native fullscreen dialog with a GSAP transition from the clicked image to the center, a simultaneous subtle backdrop blur, and a reverse close transition. The uncropped image, close button, Escape support, and restored trigger focus remain; reduced motion opens immediately. Viewer smoothing now waits for image decode before handing off from the source, uses GSAP transforms for travel, and fades a fixed blur layer instead of tweening blur strength. The viewer locks only root scrolling so the sticky collage retains its position behind the blurred backdrop. The reported stutter and background-visibility fixes await browser validation. Numbered alt labels await descriptive curation. Completion records approved milestones, not unreported validation results.

The homepage loader keeps model requests active in the background and counts only visible, focused waiting toward its fallback deadline. Model preloads use the existing cache independently of canvas frames; rendering resumes on return. The fallback is now explicitly labeled as a simplified illustration, with a page-reload action for failed, timed-out, or skipped loading; preference-driven fallbacks explain the active preference. The background-tab/window fix and fallback notice/reload action await user validation, alongside existing loader acceptance.

Current focus: Phase 15 adds faint warm daylight to Work, soft gray afternoon light to Lab, a mainly white golden-hour surface with diffuse primary-gold light behind Photography, and cooler dusk around Contact fading into the existing night footer. Hero, About, and Capabilities remain unchanged. Background-only opacity follows scroll through existing GSAP ScrollTrigger; reduced motion uses static atmosphere. Photography shares one continuous golden background across the collage and its normal-flow gallery-link area; the button retains its original position and spacing. No dependencies changed. Visual acceptance and current lint/build remain pending.

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
| 11 | Work Page | Complete by user direction; technical validation pending |
| 12 | Photography Page | Complete by user direction; technical validation pending |
| 13 | Lab and experiments Page | Complete by user direction; technical validation pending; other experiments deferred |
| 14 | Contact Page | Complete by user direction; technical and delivery validation pending |
| 15 | Homepage day-cycle atmosphere | Implemented; active, user validation pending |
| 16 | Route transitions |
| 17 | Responsive and accessibility review |
| 18 | Performance review |
| 19 | SEO and metadata |
| 20 | Final QA and launch |

## Pending Acceptance

- [ ] Hero loading: reload and immediately switch tabs or windows for more than 15 seconds, then return and confirm the animated hero appears without another reload. Repeat with a homepage opened in a background tab, slow loading, several hide/focus cycles, and route changes. Confirm foreground stalls still time out, Escape works, and reduced motion/Save-Data/errors retain their fallback. Check the simplified-view notice and keyboard/touch reload button after failure, timeout, or skip; preference-driven views should explain the preference without a misleading retry. Run current `pnpm.cmd lint` and `pnpm.cmd build`; no runtime validation has been performed.

- [ ] Phase 15: run `pnpm.cmd lint` and `pnpm.cmd build`; review gradual lighting forward/backward, direct anchors and restored scroll, desktop/mobile and rotation, reduced motion (including live changes), photography viewer, Contact fields/focus, and the dusk-to-footer boundary. Confirm the effect stays subtle and the approved Hero, About, and Capabilities treatments are preserved.

- [ ] Check the first-visit Flowpaper instructions: title/copy, OK and Escape, keyboard focus, mobile scrolling, paused background, and dismissal persistence after reload or leaving/returning. Check blocked storage and reduced motion. Run current lint/build; validation remains with the user.

- [ ] Run `pnpm.cmd lint` and `pnpm.cmd build`. Review the homepage Lab section immediately after About, its studio link, `/lab` via menu/direct load/back-forward, and site-header navigation. Check the icon tray at desktop/mobile widths, every panel and cross toggle, Escape/focus return, outside dismissal, horizontal tray scrolling, tall-panel scrolling, viewport rotation, and safe-area clearance. Check mouse/touch/keyboard painting, palette editing/cycling, all sliders and textures, pause/reset/randomize, aspect changes, mobile controls, zoom, and rotation. Verify all three fixed PNG sizes and viewport-matched Full screen PNGs, captured texture, inline preview Escape/close/focus return, closing or switching panels during capture, and downloads on desktop/mobile. Check reduced motion at load and live changes, hidden tab/menu/offscreen suspension, WebGL2 or float-rendering failure, context loss/restart, repeated navigation/StrictMode cleanup, and real-device fluid appearance/performance. No runtime validation has been performed for these edits.

- [ ] Review `/contact` through menu/footer, direct load, and back/forward navigation. Check title alignment, mobile layout, keyboard focus, social destinations, required fields, optional company, sending/success/failure states, and spreadsheet delivery. Recheck the homepage after sharing `ContactForm`. Run `pnpm.cmd lint` and `pnpm.cmd build`; validation remains pending.

- [ ] Check the standardized centered About, Work, and Photography page titles: matching top position, typography, horizontal dividers below titles, mobile/desktop alignment, and clearance from header controls. Current lint/build and browser validation remain pending with the user.

- [ ] Review `/photography` through the menu, footer, direct load, and back/forward navigation. Check the Photography info icon and supplied Android/no-colour-grading note on hover, keyboard focus, click/tap, Escape, and outside click; check mobile wrapping. Check the homepage View all photographs button after the collage (including reduced motion and keyboard navigation), the page title and introductory line, all 140 photos, original aspect ratios, masonry spacing at desktop/tablet/mobile sizes, numeric photo placement and keyboard order, resize reflow, lazy loading, keyboard/touch previews, Escape/close, focus return, background scroll lock, rotation, and reduced motion. Recheck the homepage viewer after sharing its implementation. Run current lint/build; validation remains with the user.

- [ ] Review `/work` through the menu, homepage link, direct load, and browser back/forward. Check forward/reverse and rapid stacking, final-card release, mobile layout, short screens, resize, zoom, keyboard focus into covered cards, scrollable details, and live reduced motion. Recheck homepage Selected Work after shared markup extraction. Run current lint/build; validation remains with the user.

- [ ] Review `/about` through the menu, homepage link, direct load, and browser back/forward. Check portrait crop, two-section composition, all 14 logos and retained labels, blue hover/focus glow and its fade-out, mobile/desktop node spacing, zoom, keyboard node activation and focus, touch selection, connection highlighting, screen-reader announcements, and reduced motion. Confirm location and draft biography. Run current lint/build; validation remains with the user.

- [ ] Check the custom cursor on light/dark sections, all links (including fullscreen navigation), photography triggers and viewer, rapid hover changes, scrolling beneath a stationary pointer, route changes, viewport exit/return, and tab switching. Confirm native form-field cursors, keyboard focus, touch behavior, live reduced motion/forced colors, and StrictMode cleanup. Run current lint/build; browser validation remains pending with the user.

- [ ] Check the shared homepage and photography-page viewer: data-driven location pill below the image, long-label wrapping and mobile rotation without clipping, matching 500 ms opening and closing, backdrop click/tap dismissal (including during opening), photo clicks staying open, click/tap and keyboard activation, full-image fit, blurred backdrop, close button, Escape, focus return, background scroll locking, mobile rotation, and reduced motion. Current lint/build and browser checks remain pending.

- [ ] Recheck Clouds after the reported `react-hooks/immutability` lint failure: a layout effect owns cloud instances/materials, and a module-level Three.js helper updates clone opacity from frame callbacks. Cleanup removes instances and disposes owned materials, including effect replay. Current lint/build and cloud-animation validation remain pending with the user.

- [ ] Check the homepage loader in a fresh tab: black opening, centered uniform brightness, smooth percentage, white pause, corner-covering expansion, and fade into an already-rendered hero. Check mobile rotation/resize during expansion, keyboard focus and scroll locking, touch, replay on every reload, and no replay on client-side route changes (including entering Home from another initial route). Reload to replay; browser storage is no longer used.
- [ ] Check loader recovery with throttled/failed models, textures, fonts, and logo requests; a stalled load must reveal the static landscape after 15 seconds of visible, focused resource waiting plus exit animation. Check Escape, WebGL failure, Save-Data, reduced motion before/during loading, hidden-tab return, and StrictMode cleanup. Confirm lazy photographs, footer rendering, and other-page assets do not gate completion. Validation remains pending.

- [ ] Header social icons are implemented for GitHub, Instagram, LinkedIn, and X, with staggered menu-open entry and reduced-motion support. Existing profile URLs are configured in `src/data/socials.ts`; verify destinations and check repeated opening, mobile wrapping, keyboard access, and reduced motion. Current lint/build and browser validation remain pending with the user.

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
- [ ] Check automatic phone tilt without controls, first-tap permission allow/deny, mouse parallax, rotation, reduced motion, and menu/tab suspension on HTTPS. Current lint/build and device validation remain pending.
- [ ] Check `/#introduction`, keyboard skip, reload/back navigation, fast scrolling before scene readiness, and live reduced-motion changes.
- [ ] Check scene loading, model textures, waterline, reflections, and cloud movement.
- [ ] Check reduced motion, Save-Data, rendering failure, and inactive-scene suspension.
- [ ] Profile performance and resource cleanup on desktop, tablet, and smartphone.

Earlier passing checks do not validate later edits. The user runs commands, servers, browsers, and profiling.

## Decisions and Preparation

Confirmed: pnpm, Manrope + Instrument Serif, existing palette, approved demo content, real portrait/photography, and shared high graphics quality. See [AGENTS.md](../AGENTS.md) for workflow and content rules.

Pending: current validation, real project images/content, later-page compositions, public credits placement before launch, font license records, production asset optimization, metadata, and hosting. Original model licenses and attribution/adaptation records remain in place. Placeholder images support review without final assets; case-study links, other Lab experiments, and Phase 16 onward remain deferred.

## Update Rule

Keep a short overview of the current state, phase status, blockers, and pending decisions. Replace outdated summaries instead of appending change history. Omit minor adjustments, implementation mathematics, coordinates, and repeated verification notes.
