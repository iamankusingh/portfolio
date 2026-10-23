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

Numbered editorial links use two columns on desktop and one on smaller screens, without hover previews. GitHub, Instagram, LinkedIn, and X SVG icons sit alongside the menu's identity text, wrapping on small screens. They enter with a brief stagger each time the menu opens and appear immediately with reduced motion. Existing profile destinations are shared with the Contact page through `src/data/socials.ts`.

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

Every homepage document load or reload begins with the approved black fullscreen loader: a centered circle brightens uniformly with actual resource progress, becomes white, expands, and fades into the prepared hero. A monospaced percentage sits beneath it. Background controls and scrolling are temporarily locked. Escape or a 15-second loading deadline reveals the static landscape; reduced motion uses a short fade without expansion. Client-side route changes use the direct dawn entry. See [MOTION.md](MOTION.md) for choreography and [ARCHITECTURE.md](ARCHITECTURE.md#homepage-loading) for resource scope.

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

“View all work” remains in the section header and targets `/work` through `LinkButton`. Case-study links remain deferred. Images are named directly in `src/data/works.ts` and stored in `src/assets/work`; no videos are used.

## Phase 11 Work page

`/work` is a simple full-width list using the same project data and image/details layout as homepage Selected Work. Each card stays beneath the header controls as the next scrolls over it; a subtle GSAP depth transition reinforces the stack. Desktop keeps the 60/40 split and mobile places the image above the details. Content stays in document order, keyboard focus brings a covered card back into view, and overflowing details can scroll independently. Reduced motion and short viewports show the complete list in normal flow. The existing Coming soon copy and placeholder images remain until real work is supplied.

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

Phase 5 implements this moment directly after Selected Work. A light editorial surface pairs oversized typography with a large real portrait and personal copy; two columns stack on mobile. Content comes from `src/data/anku.ts`. The section uses normal document flow without reveal gating, supports `/#about`, and links to the standalone `/about` page.

## Phase 10 About page

`/about` contains exactly two sections. The first pairs the real portrait with Anku's name, location, and the user-supplied disciplines software developer, database designer, and system architect. Generated introductory copy is labeled as draft; location remains TBD until supplied.

The second presents 14 supplied technology logos with visible names as constellation nodes on a dark surface. Figma/HTML/CSS/Tailwind CSS sit together; JavaScript connects to Three.js, React/Next.js, and Node.js/Express/MongoDB. The four MERN technologies have individual nodes. PHP/Laravel/MySQL form a backend and relational-data group. Spatial proximity and lines represent relationships, never proficiency. Each native button selects a description and connected-skill list, highlighting its links without hiding other labels. Touch and keyboard have the same selection behavior; details are announced politely. Mobile repositions nodes instead of scaling down text. All content uses DOM with decorative SVG connections; no WebGL, pinning, or continuous motion is needed.

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

### Flowpaper

The homepage Lab section immediately after About presents the introduction and Flowpaper card on the light editorial theme, with shared page gutters, a top divider, small Lab label, and large left-aligned heading matching About. Its link opens the studio directly at `/lab`, the only Lab route. The studio gives the canvas the full viewport, preserving the two-circle site header. A floating horizontal icon tray at the bottom contains Canvas, Colors, Fluid, Finish, Reset, Randomize, Playback, and Capture. Canvas, Colors, Fluid, and Finish open named configuration boxes above the tray and become crosses while open. Reset and Randomize run immediately; Pause/Play toggles immediately and changes its icon. Capture immediately takes a snapshot and opens its preview with Download PNG and Cancel; there is no recapture action inside the panel. Only one box opens at a time; Escape or an outside pointer press also closes it. The tray scrolls horizontally on narrow screens, and tall panels scroll within the available height. A first-visit modal introduces “Flowpaper. A little chaos. Something beautiful.” and explains painting, the tray, direct actions, capture/download, and keyboard controls. OK or Escape dismisses it; localStorage remembers dismissal in that browser. The canvas stays paused while the dialog is open. The workspace keeps captions/status text hidden, with accessible labels and keyboard instructions retained. Full screen is the default ratio and fills the stage, adapting to viewport resizing and rotation. Desktop, Mobile, and Square retain their fixed ratios. Aspect changes reshape existing artwork. Palette changes affect subsequent strokes; Reset clears ink, Randomize creates a new composition, and Randomize palette changes only paint colors.

Drag or touch to inject ink; pointer capture retains a stroke outside the canvas. Touch drawing prevents page scrolling only on the canvas. Keyboard users can focus the canvas and paint with arrows or add ink with Enter/Space. Pause freezes motion but permits new marks. The Capture tray icon immediately creates an inline preview with texture included, a PNG download, and Cancel. Cancel dismisses the preview or pending capture and returns focus to the tray icon. Capture/preview freezes the flow until dismissed; Escape restores focus to the tray icon. Rendering failure offers a restart and a homepage link. Reduced motion starts paused, with explicit Play available.

# 11. Photography Teaser on Homepage

## Role

The homepage should make it clear that photography is a meaningful part of Anku's identity and should invite visitors into the dedicated photography experience.

## Preferred Treatment

Phase 7 follows Capabilities directly. The black capabilities viewport scrolls upward as a light photography section enters, already showing one centered photograph. Once the section fills the screen, a sticky stage holds while further native scrolling spreads photographs from the center into a spacious collage around a large Photography heading. The first photo moves with the spread. After the spread, the photographs travel upward through additional staggered rows while the Photography heading stays centered in the sticky viewport. The section releases at the end; reverse scrolling retraces both stages. Mobile uses a portrait composition; reduced motion shows all teaser images in a normal-flow grid.

The homepage displays only entries with `displayInHome: true` from `src/data/photograph.ts`, which catalogs all 140 supplied WebP photographs. A one-time random selection enables 25 until final curation. Source dimensions preserve the original aspect ratio in both the GSAP collage and reduced-motion grid, without image cropping or stretching; the original collage positions and staggered scrolling rows are restored by user direction. Outer photographs may meet or extend beyond viewport edges as in the original composition; later rows enter from below and pass upward during scrolling. No visible preview caption is shown. A centered View all photographs button follows the homepage collage in normal flow and links to `/photography`, before Contact. It also follows the reduced-motion grid. The standalone photography route shows the full catalog with the same viewer.

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

## Photography page

The Phase 12 `/photography` page opens with a Photography title followed by "I don't just write code, I capture stories in camera too". All 140 supplied photos follow in a large masonry layout: four columns on desktop, three on tablet, and two on mobile. Photos are sorted by numeric filename and placed in the shortest available column, with ties resolved left to right. This keeps consecutive photos near each other with consistent gutters and no row-height gaps. Keyboard order stays numeric. Images retain original aspect ratios without cropping or stretching; below-fold images load lazily. Click, tap, or keyboard activation opens the shared homepage viewer. An info icon beside the centered page title reveals the user-supplied Android photography and no-colour-grading note on hover, focus, or click/tap. Escape and outside clicks dismiss it. This is the selected gallery direction.

## Image Viewing

Homepage and gallery photographs open in a native fullscreen modal dialog with an uncropped image and a close button. The photograph's supplied location appears in a centered pill below the image when available; viewer sizing reserves room for the label. GSAP moves the clicked photograph smoothly into the center while a subtle backdrop blur develops; closing reverses the movement and blur. Reduced motion presents the viewer immediately. Clicking or tapping the blurred area outside the photograph also closes it, as does Escape; focus returns to the triggering photo. Background content is inert and scrolling is locked while open. Follow [ASSETS.md](ASSETS.md) for accurate alt text and verified metadata.

# 13. Contact / Closing Scene

## Role

The final part of the homepage should feel like a conclusion to the journey rather than a standard footer.

The nature environment can return here.

## Phase 8 contact form

A simple, full-viewport light editorial section follows Photography. Large Instrument Serif typography sits beside the form on desktop; mobile stacks the heading and fields. Use normal flow with a minimum viewport height so short screens, zoom, and a resized message box can extend the section. The form includes name, email, optional company, and message, visible labels, required/email field semantics, autocomplete, and keyboard focus indicated by a dark underline; idle underlines are faded and fields have no rectangular focus outline. The rounded accent action matches the existing controls.

The form submits name, email, optional company, and message to the configured Google Apps Script web app. Native validation precedes sending; repeated submissions are blocked while pending. Confirmed success clears the fields and announces delivery. Errors or timeouts preserve the message and report that delivery could not be confirmed. See [CONTACT_DELIVERY.md](CONTACT_DELIVERY.md) for the deployment contract and pending verification. The navigation Contact link targets `/contact`. Phase 14 presents the matching centered page title and divider, the same contact form, then labeled GitHub, Instagram, LinkedIn, and X links. The homepage section remains available at `/#contact`. The Phase 9 night footer follows the form.

## Phase 9 night footer

A full-viewport dark footer closes the homepage after Contact. Oversized Anku Singh typography, homepage section links, a back-to-top link, authorship, copyright, and an explicit last-updated date remain semantic HTML above and below a moonlit water scene. The lower scene contains gently rippling 3D water and a silver moon reflection. Normal flow allows short screens and zoom to extend the footer. There is no manual pause control by user direction; reduced motion, Save-Data, and rendering failure use a static night fallback. This approved night direction replaces the earlier sunset finale proposal.

# 14. Cursor and Pointer Behavior

A custom mouse cursor expands to show `View` over photograph buttons, hiding the native pointer only during photograph hover. Links and other surfaces show the small dot alongside the native pointer without expansion. It remains visible in the fullscreen menu and photo viewer without intercepting input. Touch, keyboard navigation, reduced motion, forced colors, and form controls retain native interaction. [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) owns appearance; [MOTION.md](MOTION.md) owns response.

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

Follow [AGENTS.md](../AGENTS.md#non-negotiable-rules). In particular, avoid tiny cards as the primary project presentation, photography confined to thumbnails, hidden navigation, scroll-jacking, and simultaneous motion that competes with reading. The approved document-load loader is bounded and supports Escape; do not add further entry gates.

# 23. Indicative Homepage Sequence

The preferred order may change if the narrative improves:

1. Hero — immersive introduction.
2. Introduction — positioning and philosophy.
3. Selected Work — substantial projects and case-study entry points.
4. Nature / 3D Interlude — short chapter transition.
5. Capabilities — range of work.
6. About / Portrait — the person behind the work.
7. Lab — experiments.
8. Photography — homepage collage; currently follows Capabilities, before Contact; the homepage Lab teaser sits immediately after About, with Flowpaper available at `/lab`.
9. Contact: light editorial form.
10. Footer: night sky and moonlit water.

# Source-of-Truth Rules

This file owns the journey, navigation behavior, section purpose/order, major interactions, and the relationship between 3D and DOM. Use the [documentation map](../README.md#documentation-responsibilities) for specialist details. Update this file when the intended journey changes.

## Current Status

**Experience specification.** Layouts, menu composition, project order, gallery model, and transition choices remain provisional. All discussed sections are included and demo content is authorized; these layout choices can be made during implementation. Track decisions in [PROGRESS.md](PROGRESS.md).

## Current implementation

Phase 2 is complete by user direction. The opening contains an island, ocean currents and reflections, distant mountains with the sun behind them, moving clouds across the sky, and a parked boat. Phase 3 begins with no visible hero text, then introduces Anku during the camera approach to the house. Visible credits are deferred; records remain in [ASSETS.md](ASSETS.md).

The document-load loader reveals the prepared hero; client-side return visits retain the direct dark-background dawn intro. Preserve native scrolling after loading, responsive framing, and the same graphics quality across devices. Suspend animation while navigation is open. Use the static fallback for reduced motion, Save-Data, or rendering failure.

Phases 2 through 12 are complete by user direction. Phase 13 Lab/Flowpaper and Phase 14 Contact are implemented with user validation pending. Other experiments and Phase 15 onward remain deferred. Current validation is tracked in [PROGRESS.md](PROGRESS.md).

