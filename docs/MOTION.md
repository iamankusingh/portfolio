# MOTION.md

## Purpose

Define motion principles, timing, easing, choreography, scroll behavior, interactions, and reduced-motion alternatives. [EXPERIENCE.md](EXPERIENCE.md) owns interaction intent; [THREE_D.md](THREE_D.md) owns scene mechanics.

# 1. Motion Philosophy

**Motion must communicate something:** hierarchy, depth, progression, cause and effect, spatial relationships, navigation, storytelling, or state changes.

# 2. Desired Motion Character

Smooth, cinematic, precise, calm, responsive, weighted, and natural. Avoid hyperactive, cartoonish, elastic, or deliberately sluggish behavior. Separate major motion moments with calm.

# 3. Motion Hierarchy

Use three levels of motion intensity.

## Level 1 — Ambient

Subtle fog, water, parallax, or justified image drift. Continuous motion must not compete with reading.

## Level 2 — Interaction

Immediate feedback for hover, cursor state, menu morphs, magnetic controls, drag, or image depth.

## Level 3 — Narrative

Larger hero, 3D-to-DOM, menu, case-study, photography, or finale transitions. Cinematic pacing must not impose unnecessary waits.

# 4. Timing Tokens

Suggested starting values:

```css
--motion-instant: 120ms;
--motion-fast: 220ms;
--motion-base: 420ms;
--motion-slow: 700ms;
--motion-cinematic: 1100ms;
--motion-long: 1600ms;
```

Guidance:

- Hover feedback: 120–250ms
- UI state change: 200–450ms
- Section reveal: 400–800ms
- Fullscreen menu: 700–1200ms
- Major cinematic transition: 900–1600ms

Do not use cinematic timings for ordinary buttons or links.

# 5. Easing Tokens

Preferred motion should feel controlled rather than bouncy.

Suggested CSS starting points:

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
--ease-sharp: cubic-bezier(0.76, 0, 0.24, 1);
```

For GSAP, equivalent custom eases may be introduced.

Avoid random easings per component.

# 6. Scroll System

Site-wide wheel and trackpad smoothing uses a velocity-preserving, critically damped spring driven by the GSAP ticker through `useSmoothScroll`. Input updates the destination without restarting the motion. Scrolling accelerates with input and decelerates toward rest; reversing input discards queued travel while retaining velocity for brief, smooth braking. The ticker detaches when settled. No transformed content wrapper, scroll snapping, or additional smoothing library is used.

Touch momentum, keyboard scrolling, focus, anchors, and history restoration remain native. Nested scroll areas and form controls retain their own input; `data-native-scroll` opts a region out. Reduced motion disables smoothing, including live preference changes. Opening the menu, changing routes, focusing content, resizing, hiding the tab, or switching input cancels pending travel. Clean up owned listeners, observers, and ticker callbacks on teardown. Do not enable CSS `scroll-behavior: smooth` alongside ScrollToPlugin.

# 7. Hero Motion

The hero is one of the primary narrative sequences.

## 7.1 Entry

Current sequence: loading resolves → sun emerges → landscape appears through fog. The opening has no visible text; identity appears only in the scroll-driven introduction. Content remains accessible without waiting for the scene.

## 7.2 Hero Typography

Use masked lines, clipping, or opacity with a small translation. Character sequencing is optional and restrained; avoid letter-by-letter animation for long text.

## 7.3 Scroll-Controlled Camera

Coordinate a few deterministic camera/environment beats with typography and the handoff to DOM. Do not bind every scene property to scroll. Camera limits belong in [THREE_D.md](THREE_D.md).

# 8. 3D → DOM Transition

A possible connected sequence:

1. Approach the horizon, water, or terrain until a dominant surface/color fills the viewport.
2. Reposition or exit hero text; match the next DOM background to the scene.
3. Reveal editorial text while reducing WebGL intensity.

Avoid an accidental hard cut. The prototype should establish the final choreography.

# 9. Section Reveals

Use restrained opacity with **16–48px** translation, text/image masks, or metadata staggers. Avoid animating every paragraph; reduce reveal intensity after the opening.

# 10. Project Motion

Projects should feel substantial, not like cards in a dashboard.

## 10.1 Project Entry

Selected Work uses a fixed viewport-height CSS sticky stage and scroll-scheduled project selection across screen sizes. Cards crossfade in place over 420ms as scroll reaches the next entry; reverse scrolling reverses the order. Viewport and content-fit checks must not disable pinning. Responsive card rows and scrollable details keep short/mobile layouts accessible. The shared velocity-based window scrolling remains the only smoothing system. Listeners, resize observations, and scheduled frames are cleaned up. Reduced motion uses normal-flow cards without fades or added scroll distance.

## 10.2 Project Hover

Optional desktop effects: **1.01–1.04** media scale, mild perspective, `VIEW` cursor, or a small title/underline response. Avoid aggressive tilt.

## 10.3 Opening a Project

Selected media or a title may anchor the route transition as the current page recedes. Shared-layout techniques are optional; do not delay navigation solely for animation.

# Phase 6 circle interlude

After About, a CSS sticky viewport holds a scroll-controlled circle sequence: center reveal, staggered satellite appearance during one revolution, inward merge, then center expansion to cover every viewport corner. Actual document scroll drives reversible transforms and opacity through scheduled animation frames, without an independent timer or input interception. Resize observers refresh framing; listeners and scheduled frames are cleaned up on teardown. The expanding center also drives a circular clip on one stationary white capabilities paragraph, with no text translation or stagger. Reduced motion removes pinning and extra scroll distance, showing the complete paragraph immediately on black. Keyboard focus also reveals the paragraph immediately. The final statement remains in the same viewport until subsequent content is added.

# 11. Fullscreen Menu Motion

The fullscreen navigation should feel like a major interface state change.

## 11.1 Open

Possible sequence: immediate button response → circle/mask expands from top-right → background settles → links stagger briefly → metadata and preview appear.

Suggested perceived duration: **700–1000ms**. Enable interaction before decorative motion finishes.

## 11.2 Close

Close faster than open, with immediate feedback. Suggested duration: **500–800ms**.

## Phase 1 Timing Choice

The implemented CSS menu uses a 700ms decorative surface reveal from the top-right control, 420ms content/preview entry, and 220ms controls and exit fade. The shorter exit intentionally keeps navigation immediate; there is no JavaScript timer gating link activation. Native dialog state changes immediately. Discrete display/overlay transitions progressively enhance exit; unsupported browsers close immediately. Reduced motion removes the reveal, transforms, and transitions. Tailwind animation utilities in `components/layout/Header.tsx` use the dialog transitions and keyframes in `src/index.css`; visual validation is pending with the user.

## 11.3 Menu Hover

A slight type shift, preview reveal, cursor change, or reduced emphasis on other links may indicate focus. Keep all links readable.

# 12. Header Motion

Controls may reduce prominence during downward scrolling and return on upward scroll or pointer approach. Adapt surface contrast without hiding navigation for long periods.

# 13. Magnetic Interaction

Optional for circular controls and selected CTAs: approximately **2–8px** maximum translation, smooth following, and quick return. Disable for touch and disable or greatly reduce for reduced motion.

# 14. Cursor Motion

Use the contextual states in [EXPERIENCE.md](EXPERIENCE.md). Changes should be fast, size expansion soft, labels legible, and lag minimal. Keep the native fallback.

# 15. Portrait Motion

Optional mask/fog reveal, gentle portrait/type parallax, or subtle depth. Keep the treatment composed and avoid playful facial distortion.

# 16. Photography Motion

Favor gentle drag momentum, image transitions, brief metadata reveals, and fullscreen fades/scales. Avoid heavy 3D transforms.

# 17. Lab Motion

Experiments may have distinct motion while retaining site navigation conventions. Keep experimental behavior isolated from other sections.

# 18. Page Transitions

Possible anchors include project media, color wipes, circular masks, typography, or environmental fades. Match the content, preserve orientation, and keep back/forward navigation normal.

# 19. Reduced Motion

Respect `prefers-reduced-motion: reduce`.

Reduced-motion mode should:

- Disable large scroll-linked transforms
- Remove continuous decorative parallax
- Disable magnetic interactions
- Remove cursor lag
- Simplify 3D camera movement
- Avoid large-scale zoom transitions
- Keep fades short and subtle

Critical content must remain fully available.

Reduced motion should not mean "broken layout with animations removed."

Design a coherent static alternative.

# 20. Mobile Motion

Preserve the same motion language and narrative intent across devices. Adapt touch feedback, transition duration, parallax, and motion density where required for responsiveness. No essential hover logic or unnecessary continuous finger-tracking effects. Camera adaptation belongs in [THREE_D.md](THREE_D.md).

# 21. Performance Rules

Motion must not compromise responsiveness.

Guidelines:

- Prefer transform and opacity for DOM animation.
- Avoid animating layout properties repeatedly.
- Batch scroll updates through the animation frame.
- Avoid multiple competing scroll observers.
- Pause offscreen continuous animations where practical.
- Do not keep expensive RAF loops active for hidden sections.
- WebGL motion should follow the quality strategy in `THREE_D.md`.

# 22. Motion Anti-Patterns

Avoid pervasive bounce/floating effects, excessive stagger, forced intros/loaders, click-blocking animation, repeated large text reveals, and competing parallax systems. Scrolling and touch rules are defined above.

# 23. Suggested Motion System Architecture

Current division of responsibility: CSS transitions for small UI states; the GSAP ticker for velocity-based wheel smoothing; React Three Fiber's frame loop for scenes. Hero progress continues to read actual window scroll events.

GSAP is installed by the user. [ARCHITECTURE.md](ARCHITECTURE.md) owns dependency adoption; avoid overlapping systems.

# 24. Status

System direction and timing values are provisional. Validate choreography in the hero/homepage prototype and track decisions in [PROGRESS.md](PROGRESS.md).

## Hero and introduction choreography

Reveal the actual island from a dark background once ready, with rising sunlight and clearing fog. Keep navigation available throughout; no alternate scene or forced intro. The opening viewport is text-free.

Native scroll drives one shared progress value for a curved camera approach to the house and the introduction's opacity/contrast treatment. The DOM text remains in normal flow. Ease into and out of the camera journey, reduce pointer influence during travel, and settle before the end for reading. Reverse scrolling reverses the sequence; keyboard skipping and restored scroll positions do not wait for an animation timeline. Resize observations keep progress aligned with content and viewport changes.

The camera follows scroll through a critically damped velocity response, easing into movement and settling after input stops. Position and look-at share the same smoothed journey. DOM content follows native scroll immediately. Initial scene presentation respects restored scroll positions, and suspension clears residual velocity.

Reduced motion, Save-Data, and scene failure use a static opening followed by immediately readable introduction content, without the extra camera-travel space. Hero choreography needs no scroll interception of its own; shared wheel smoothing is defined in section 6 and is disabled for reduced motion.

Clouds drift right to left and recycle offscreen. Water and subtle camera motion share automatic suspension when the menu is open, the tab is hidden, or the hero is offscreen. Reduced-motion and Save-Data visitors receive the static landscape. There is no manual pause control.

User acceptance remains pending in [PROGRESS.md](PROGRESS.md).
