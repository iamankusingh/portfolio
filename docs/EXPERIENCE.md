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

Numbered editorial links sit left; decorative previews sit right at desktop widths (64rem and above). Hover and keyboard focus select the same preview. About uses the real portrait; Photography reuses it with an explicit demo label. Work and Lab use abstract typography/geometry until their actual media exists. Previews are hidden on smaller viewports; every destination remains directly available without hover or a preview tap. No placeholder contact details are displayed. The homepage includes the completed Phase 2 hero, Phase 3 introduction, and Phase 4 selected work; later sections remain in their owning phases.

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

The opening viewport contains the landscape and persistent header controls, without visible hero text, Explore, or scene credits. The following introduction supplies the semantic heading for **Anku Singh**, the role **Creative technologist**, and a short replaceable description. A focus-only skip link gives keyboard visitors immediate access to the introduction.

## Hero Interaction

### Pointer / Mouse

Pointer movement may subtly influence camera, depth, or reflections. No precise input should be required.

### Scroll

Scroll can progress the camera, sun, fog, typography, or horizon toward the next section. Specific beats belong in [MOTION.md](MOTION.md) and [THREE_D.md](THREE_D.md).

# 4. Transition from 3D Hero to Editorial Content

Phase 3 keeps the landscape sticky while native scrolling moves the camera toward the island house. The introduction rises naturally over the same scene as a restrained directional shade protects text contrast. Reverse scrolling retraces the journey. Static modes use the landscape followed by a normal-flow introduction, without camera travel or reveal gating. Choreography belongs in [MOTION.md](MOTION.md).

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

Phase 4 uses a viewport-height sticky Selected Work stage across screen sizes. Each project has a card in the same position, with a still image on the left (60%) and Coming soon title, description, role, and technology text on the right (40%) on desktop. Mobile stacks image above text within the pinned card. Scrolling fades between cards; reverse scrolling revisits earlier entries. The stage releases after the final card. Overflowing details are independently scrollable and keyboard-focusable. Only reduced motion shows every card in normal flow. Inactive overlapping cards are inert and hidden from assistive technology.

“View all work” remains in the section header and targets `/work` through `LinkButton`. The index remains deferred to its own phase and currently uses NotFound. Case-study links remain deferred. Images are named directly in `src/data/works.ts` and stored in `src/assets/work`; no videos are used.

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

Phase 6 currently implements the user-requested, Sharingan-inspired circle interlude directly after About. A light viewport stays sticky while a small black center appears, three larger black circles gradually orbit it, then merge into the center before it expands to fill the screen. Soft dark shadows surround the circles; a thin orbit ring echoes the supplied reference. The header remains available. One large white paragraph stays in place and is revealed by a circular mask matching the expanding black center. It occupies the same viewport as six spacious, staggered lines, alternating left alignment with modest insets. Copy and line placement live together in `src/components/sections/Capabilities.tsx`; mobile reduces the insets and allows natural wrapping. Reduced motion shows the paragraph immediately on black in normal flow. Keyboard focus reveals it immediately; zoom or unusually short screens can scroll the text to preserve access.

Use large typographic groups, expandable categories, clusters, or subtle spatial organization. Avoid ratings and progress bars; category names in [PROJECT.md](PROJECT.md#capabilities-to-showcase) remain provisional.

# 9. Personal Portrait / About Moment

Phase 5 implements this moment directly after Selected Work. A light editorial surface pairs oversized name typography with a large real portrait and personal copy; two columns stack on mobile. Content comes from `src/data/anku.ts`, with generated personal copy explicitly marked as a draft preview. The section uses normal document flow without reveal gating and supports `/#about`. The standalone `/about` page remains deferred.

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

Phase 7 follows Capabilities directly. The black capabilities viewport scrolls upward as a light photography section enters, already showing one centered photograph. Once the section fills the screen, a sticky stage holds while further native scrolling spreads photographs from the center into an asymmetric, edge-cropped collage around a large Photography heading. The first photo moves with the spread. After the spread, the photographs travel upward through additional staggered rows while the Photography heading stays centered in the sticky viewport. The section releases at the end; reverse scrolling retraces both stages. Mobile uses a portrait composition; reduced motion shows all teaser images in a normal-flow grid.

The homepage displays all ordered entries from `src/data/photographs.ts`, currently 26 portrait placeholders. Additional entries extend the scrolling composition automatically. Supplied photographs will replace the placeholders, which remain identified in data and alt text; there is no visible preview caption, by user direction. The standalone photography route and full-gallery interactions remain deferred.

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

## Phase 8 contact form

A simple, full-viewport light editorial section follows Photography. Large Instrument Serif typography sits beside the form on desktop; mobile stacks the heading and fields. Use normal flow with a minimum viewport height so short screens, zoom, and a resized message box can extend the section. The form includes name, email, optional company, and message, visible labels, required/email field semantics, autocomplete, and keyboard focus indicated by a dark underline; idle underlines are faded and fields have no rectangular focus outline. The rounded accent action matches the existing controls.

The form is presentation-only by user direction, with no submission handler, state, or feedback. The Send message control uses a non-submit button until delivery is implemented. The navigation Contact link targets `/#contact`; the separate contact page and any sunset closing scene remain deferred.

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

Keep the same content order and hierarchy with immediate navigation and static or brief-fade alternatives. The complete adaptation rules live in [MOTION.md](MOTION.md#19-reduced-motion), with scene behavior in [THREE_D.md](THREE_D.md#reduced-motion).

# 20. WebGL Failure / Fallback Experience

If 3D fails or is reduced, show a lightweight nature-inspired fallback while keeping hero copy, navigation, projects, personal story, photography, and contact available. [THREE_D.md](THREE_D.md#fallback-strategy) owns fallback options.

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
8. Photography — homepage collage; currently follows Capabilities, before Contact; Lab remains deferred.
9. Finale / Contact — sunset and next action.

# Source-of-Truth Rules

This file owns the journey, navigation behavior, section purpose/order, major interactions, and the relationship between 3D and DOM. Use the [documentation map](../README.md#documentation-responsibilities) for specialist details. Update this file when the intended journey changes.

## Current Status

**Experience specification.** Layouts, menu composition, project order, gallery model, and transition choices remain provisional. All discussed sections are included and demo content is authorized; these layout choices can be made during implementation. Track decisions in [PROGRESS.md](PROGRESS.md).

## Current implementation

Phase 2 is complete by user direction. The opening contains an island, ocean currents and reflections, distant mountains with the sun behind them, moving clouds across the sky, and a parked boat. Phase 3 begins with no visible hero text, then introduces Anku during the camera approach to the house. Visible credits are deferred; records remain in [ASSETS.md](ASSETS.md).

Reveal the scene directly from a dark background with the dawn intro. Preserve native scrolling, responsive framing, and the same graphics quality across devices. Suspend animation while navigation is open. Use the static fallback for reduced motion, Save-Data, or rendering failure.

Phase 4 selected work is complete by user direction. Phase 5 About/portrait is complete by user direction and follows Selected Work. Phase 6 is complete by user direction. Phase 7 adds the photography collage after Capabilities. Phase 7 is complete by user direction. Phase 8 adds the homepage contact form; Phase 9 onward remain deferred; current validation is tracked in [PROGRESS.md](PROGRESS.md).

