# EXPERIENCE.md

## Purpose

Define the visitor journey, section rhythm, navigation, and major interactions. Visual tokens belong in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), choreography in [MOTION.md](MOTION.md), scenes in [THREE_D.md](THREE_D.md), and application structure in [ARCHITECTURE.md](ARCHITECTURE.md).

## Experience Summary

Begin in a nature-inspired 3D world, then move into editorial content. Return to the landscape at selected moments without making it the interface for all content.

**Immersion → Clarity → Exploration → Personality → Reflection → Closing.**

## Narrative Arc

The natural environment can evolve subtly through time.

### Beginning — Dawn

A quiet, low-light, atmospheric opening introduces the world.

### Middle — Daylight

The experience becomes brighter and more structured as projects and capabilities take priority.

### Ending — Sunset

A warmer, reflective landscape closes the journey. Keep the day-cycle metaphor subtle.

# 1. Global Header

## Structure

Two persistent circular controls float above the page: logo at top-left and menu at top-right. No permanent row of navigation text.

## Logo Control

Return to the homepage or its beginning. Keep the logo recognizable on changing backgrounds. An optional hover label (`ANKU SINGH`) or transition treatment must not interfere with navigation.

## Menu Control

A circular button with a restrained hamburger, optionally two lines. On activation, it changes to a close icon and opens the fullscreen menu. The visual transition should connect to the original control.

# 2. Fullscreen Navigation

## General Character

Use spacious editorial typography and clear destinations, with navigation fast enough for repeated use. [ROUTES.md](ROUTES.md) owns the destination list.

## Layout Direction

Prefer an asymmetric composition with large primary links, optional numbering, and secondary identity/contact details near the edges. Use supplied social links/contact information when available; otherwise show clearly identified placeholders, without inventing live personal accounts.

## Navigation Previews

Hover or focus may reveal project media for Work, a photograph for Photography, Anku's portrait for About, or an experiment for Lab. Previews remain secondary; provide an understandable keyboard equivalent.

## Phase 1 Implementation

The menu uses a full-viewport native modal dialog. Opening focuses Home; Tab/Shift+Tab stay within the modal, and Escape or the top-right close control dismisses it. Closing without navigation returns focus to the menu trigger. Route changes dismiss it and the route shell focuses the destination. The page behind the menu is inert and scroll-locked; short screens scroll inside the menu. The logo and close control remain available at the top.

Numbered editorial links sit left; decorative previews sit right at desktop widths (64rem and above). Hover and keyboard focus select the same preview. About uses the real portrait; Photography reuses it with an explicit demo label. Work and Lab use abstract typography/geometry until their actual media exists. Previews are hidden on smaller viewports; every destination remains directly available without hover or a preview tap. No placeholder contact details are displayed. The homepage now includes the Phase 2 hero; later sections remain in their owning phases.

## Menu Exit and Page Transition

A selected word, media preview, or circle may become the transition anchor. [MOTION.md](MOTION.md) owns timing and mechanics.

# 3. Homepage Hero

## Role

The hero is the main immersive introduction and one of the website's signature moments.

It should communicate personality before requiring the visitor to read significant text.

The visitor should feel that they are entering a designed world, not seeing a standard landing-page banner.

## Environment

Use the stylized landscape defined in [THREE_D.md](THREE_D.md), composed together with DOM typography.

## Opening Moment

A possible sequence moves from low light to a visible sun, then landscape and identity. Keep it concise and never trap visitors in an unskippable intro; see [MOTION.md](MOTION.md).

## Hero Content

The user requested a landscape-led opening without the visible name or a pause-motion control. Retain a screen-reader heading for **Anku Singh** and a small Explore cue. Defer positioning paragraphs and discipline lists to later editorial content. The broader positioning remains in [PROJECT.md](PROJECT.md).

## Hero Interaction

### Pointer / Mouse

Pointer movement may subtly influence camera, depth, or reflections. No precise input should be required.

### Scroll

Scroll can progress the camera, sun, fog, typography, or horizon toward the next section. Specific beats belong in [MOTION.md](MOTION.md) and [THREE_D.md](THREE_D.md).

# 4. Transition from 3D Hero to Editorial Content

Make the scene and editorial page feel spatially connected. Options include water becoming the next background, an expanding horizon, a fog/light mask, or receding geometry. Choose the approach during the hero prototype; choreography belongs in [MOTION.md](MOTION.md).

# 5. Introduction / Philosophy

## Role

After the hero, the visitor should receive a clear explanation of Anku's approach.

This section should provide clarity after the immersive opening.

The content can communicate ideas such as:

- Building complete digital experiences
- Combining design and engineering
- Thinking from interface to infrastructure
- Curiosity across software, systems, and visual work

Implementation may generate this section's demo copy under the approved content policy; final factual claims must be verified.

## Presentation

Preferred style:

- Large editorial typography
- Strong whitespace
- Minimal competing imagery
- Controlled reveal as the visitor scrolls

This is a moment of relative calm.

# 6. Selected Work

## Role

Selected Work is one of the most important content sections.

Projects should receive enough visual space to feel substantial.

Avoid reducing all projects to a dense grid of small cards unless a secondary index page needs one.

## Project Presentation

Give featured projects large titles, numbers, media, role/discipline metadata, useful technology details, and a clear case-study link. A project may occupy most of a viewport. Use dummy projects and repeated available imagery initially, following [PROJECT.md](PROJECT.md#projects).

## Project Interactions

Optional perspective, pointer depth, restrained scroll scaling, animated previews, or a `VIEW` cursor should preserve screenshot inspection. [MOTION.md](MOTION.md) defines their limits.

## 3D in Project Sections

A device, layered UI, or spatial technical diagram may help a particular project. Let the content justify 3D; see [THREE_D.md](THREE_D.md).

# 7. Nature / 3D Interlude

Include the discussed short landscape return as part of the full homepage scope. It resets rhythm after project content and signals the next chapter through changed lighting or sun position. Keep it simpler than the hero; use an equivalent lightweight treatment where device capability requires it.

# 8. Capabilities

## Role

The capabilities section should show the range of Anku's work without becoming a generic skills list.

A conceptual grouping may be:

- Build
- Design
- Architect
- Explore

The exact labels can change.

## Interaction Direction

Use large typographic groups, expandable categories, clusters, or subtle spatial organization. Avoid ratings and progress bars; category names in [PROJECT.md](PROJECT.md#capabilities-to-showcase) remain provisional.

# 9. Personal Portrait / About Moment

## Role

The portfolio should deliberately introduce the person behind the work.

This section should use a **real photograph of Anku**.

The portrait should not feel like a small résumé headshot placed beside a paragraph.

## Preferred Composition

A large portrait may interact with oversized `ANKU SINGH` typography, depth layers, or an atmospheric reveal. `BEHIND THE WORK` is a possible label, not final copy. Visual treatment belongs in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

## Content

Generate a demo personal introduction, creative philosophy, and supporting personal-story copy for the initial build. Apply [AGENTS.md](../AGENTS.md#content-safety--accuracy) so fictional details remain clearly distinct from verified biography.

# 10. Lab / Experiments

## Role

The Lab gives Anku space to show curiosity beyond polished portfolio case studies.

Possible content:

- WebGL experiments
- 3D scenes
- Creative coding
- Shader experiments
- Generative work
- Interaction studies
- UI experiments
- Technical prototypes

The Lab should feel exploratory, but the interface should still be understandable.

## Presentation

Possible directions:

- Experimental thumbnails
- Interactive tiles
- Small live previews
- Playable mini-experiments

The Lab can be more playful than the main project section.

Performance-heavy experiments should load only when needed.

# 11. Photography Teaser on Homepage

## Role

The homepage should make it clear that photography is a meaningful part of Anku's identity and should invite visitors into the dedicated photography experience.

## Preferred Treatment

The photography teaser may intentionally reduce motion and UI complexity.

Possible behavior:

- One or several large photographs
- Slower pacing
- Minimal text
- Strong crop / composition
- Clear route into the full photography page

The transition into photography should feel like moving into a quieter chapter.

# 12. Photography Experience

## General Character

The dedicated photography experience should feel different from the development portfolio while still belonging to the same identity.

Desired qualities:

- Calm
- Image-led
- Minimal
- Immersive
- Editorial

The photographs themselves should provide most of the visual impact.

## Gallery Interaction

Choose a gallery model during composition using repeated `anku.avif` entries. A curated image collection is not a prerequisite; the models below remain available.

### Horizontal Exploration

A horizontal sequence navigated by drag/scroll, with equivalent usable controls for other input methods.

### Editorial Sequence

Varied image sizes and placement create a paced photographic story.

### Hybrid Gallery

A curated sequence leads into a simpler index.

## Image Viewing

A photograph may open large or fullscreen with a clear close/back control. For the repeated initial image, follow [ASSETS.md](ASSETS.md) for accurate alt text and clearly identified demo metadata.

# 13. Contact / Closing Scene

## Role

The final part of the homepage should feel like a conclusion to the journey rather than a standard footer.

The nature environment can return here.

## Visual Direction

A quieter sunset landscape can return for the finale; the scene state is defined in [THREE_D.md](THREE_D.md).

## Contact Content

Make email and relevant social profiles easy to access, with a path back to work. **Let's build something worth remembering.** is conceptual copy only.

# 14. Cursor and Pointer Behavior

An optional cursor can signal `VIEW`, `OPEN`, `DRAG`, or `PLAY` on pointer devices. It must supplement native interaction cues and be disabled where inappropriate. [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) owns appearance; [MOTION.md](MOTION.md) owns response.

# 15. Microinteractions

Subtle magnetic controls, link responses, image masks, menu-line morphs, or logo hover effects may add tactile feedback. Keep response immediate; use [MOTION.md](MOTION.md) for limits.

# 16. Scrolling

Scroll is a storytelling input for camera progression, reveals, parallax, and chapter transitions. Keep users in control and preserve browser behavior. Smoothing is optional; [MOTION.md](MOTION.md) owns its rules.

# 17. Page Transitions

Transitions should preserve orientation and work with browser history. Possible anchors include a circle, title, image, or environmental mask. [MOTION.md](MOTION.md) owns choreography; [ARCHITECTURE.md](ARCHITECTURE.md) owns integration.

# 18. Mobile Experience

Maintain the same complete story, typography, palette, navigation identity, and visual ambition across modern mobile and desktop devices. Reflow content and adapt controls to viewport/input while retaining every included section. Motion and rendering may scale with hardware under [MOTION.md](MOTION.md) and [THREE_D.md](THREE_D.md), preserving the overall look and feel.

# 19. Reduced Motion

Keep the same content order and hierarchy with immediate navigation and static or brief-fade alternatives. The complete adaptation rules live in [MOTION.md](MOTION.md#19-reduced-motion), with scene behavior in [THREE_D.md](THREE_D.md#27-reduced-motion).

# 20. WebGL Failure / Fallback Experience

If 3D fails or is reduced, show a lightweight nature-inspired fallback while keeping hero copy, navigation, projects, personal story, photography, and contact available. [THREE_D.md](THREE_D.md#26-fallback-strategy) owns fallback options.

# 21. Experience Priorities

When making tradeoffs, use the following order:

1. **Clarity** — visitors understand where they are and what they can do.
2. **Content** — projects, photography, and identity remain the focus.
3. **Usability** — navigation and interaction remain predictable enough to use comfortably.
4. **Performance** — visual ambition must not create a slow or unstable experience.
5. **Accessibility** — the core experience remains available across interaction needs.
6. **Polish** — motion and detail elevate the experience after the fundamentals work.
7. **Spectacle** — dramatic visual effects come last.

When spectacle conflicts with the first five priorities, simplify the spectacle.

# 22. Experience Anti-Patterns

Follow [AGENTS.md](../AGENTS.md#non-negotiable-rules). In particular, avoid tiny cards as the primary project presentation, photography confined to thumbnails, hidden navigation, scroll-jacking, forced intros, and simultaneous motion that competes with reading.

# 23. Indicative Homepage Sequence

The preferred order may change if the narrative improves:

1. Hero — immersive introduction.
2. Introduction — positioning and philosophy.
3. Selected Work — substantial projects and case-study entry points.
4. Nature / 3D Interlude — short chapter transition.
5. Capabilities — range of work.
6. About / Portrait — the person behind the work.
7. Lab — experiments.
8. Photography — quieter teaser leading to the gallery.
9. Finale / Contact — sunset and next action.

# Source-of-Truth Rules

This file owns the journey, navigation behavior, section purpose/order, major interactions, and the relationship between 3D and DOM. Use the [documentation map](../README.md#documentation-responsibilities) for specialist details. Update this file when the intended journey changes.

## Current Status

**Experience specification.** Layouts, menu composition, project order, gallery model, and transition choices remain provisional. All discussed sections are included and demo content is authorized; these layout choices can be made during implementation. Track decisions in [PROGRESS.md](PROGRESS.md).

## Phase 2 implementation

The opening frames a grassy island surrounded by open water, with fourteen clouds at varied higher sky positions and a visible sun behind the island. The visible name and manual pause control are removed at the user's request; identity remains available as a screen-reader heading. The island's centered rotation follows the user's current source adjustment. The Explore anchor reaches the quiet end of the landscape and its collapsed Scene credits; there is no extra slogan or placeholder introduction. Native scrolling remains available, with no forced intro. The menu suspends scene animation while open. Reduced-motion and Save-Data visitors receive the static fallback. Other devices share identical high-quality rendering. Portrait framing pulls the camera back to retain the complete shoreline. Browser and visual acceptance remain pending.


The normal opening now reveals the actual island directly from a dark background, with rising sunlight and clearing fog. The static island appears only for reduced-motion/Save-Data preferences or a rendering failure, avoiding a visible switch between different island compositions. Identity and navigation are available throughout loading and the intro.

