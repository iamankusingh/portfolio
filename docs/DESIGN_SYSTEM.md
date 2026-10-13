# DESIGN_SYSTEM.md

## Purpose

Define visual language, typography, color, spacing, layout, surfaces, controls, imagery, and responsive styling. Follow the concept in [PROJECT.md](PROJECT.md); behavior belongs in [EXPERIENCE.md](EXPERIENCE.md), animation in [MOTION.md](MOTION.md), and rendering in [THREE_D.md](THREE_D.md).

# 1. Design Principles

## 1.1 Premium Through Restraint

Use strong composition, clear hierarchy, large typography, whitespace, controlled color, and high-quality imagery. Avoid decorative clutter; the consolidated exclusions are in section 16.

## 1.2 Nature and Interface Must Contrast

The website uses two complementary visual modes.

### Nature Mode

For immersive and personal moments: organic forms, soft depth, atmospheric light, and open compositions.

### Interface Mode

For work, case studies, capabilities, diagrams, and navigation: structured grids, precise alignment, clear metadata, and reduced visual noise.

# 2. Brand Foundation

## 2.1 Current Logo

A circular blue mark with a yellow **A** connects water/sky, sun/light, and circular controls. Header, favicon, loader, and approved transition uses should preserve recognizability. Follow [AGENTS.md](../AGENTS.md#logo) for approval rules and [ASSETS.md](ASSETS.md) for source files.

## 2.2 Recurring Shape Language

Circles can connect the logo, menu, sun, cursor, masks, and small accents. Do not make every container circular.

The approved Phase 6 interlude uses pure black circles with soft surrounding dark shadows on the light editorial background, following the supplied three-orbit-circle reference. Its expanding center finishes on a black surface; the existing logo remains unchanged.

# 3. Color System

The existing neutral and accent palette below is the user-confirmed implementation baseline. Use these values; do not restart palette selection. Check contrast in actual compositions.

## 3.1 Core Neutral Palette

Use a restrained neutral foundation.

Confirmed palette tokens:

```css
--color-bg-dark: #0B0D0E;
--color-bg-deep: #07090A;
--color-surface-dark: #111416;
--color-bg-light: #F1F0EA;
--color-surface-light: #E8E6DE;
--color-text-light: #F4F2EC;
--color-text-dark: #111315;
--color-text-muted-dark: #9A9D9B;
--color-text-muted-light: #666A68;
--color-line-dark: rgba(255, 255, 255, 0.14);
--color-line-light: rgba(0, 0, 0, 0.14);
```

Keep these palette values consistent across device sizes.

## 3.2 Brand / Nature Accents

Confirmed accent tokens:

```css
--color-water: #276DFF;
--color-water-deep: #123B73;
--color-sun: #F5C84B;
--color-sun-warm: #F39A48;
--color-mist: #B7C4C7;
```

Accent colors should be used selectively.

Do not make every button, heading, and border blue or yellow.

The strongest use of these colors should come from:

- Logo
- 3D environment
- Selected interactive states
- Small accent details
- Section transitions

## 3.3 Day-Cycle Color Logic

The natural environment may evolve through a restrained day cycle.

### Dawn

Deep charcoal, cool blue, low saturation, and emerging soft yellow light.

### Daylight

Warm whites, soft grey, clear blue accents, and strong contrast.

### Sunset

Navy/charcoal, amber, soft orange, and muted blue. Apply the day cycle mainly to atmosphere; avoid constantly recoloring DOM content.

### Night footer

The approved Phase 9 finale uses the deep background token, warm-white editorial text, cool muted water, and a restrained silver moon reflection. Keep text on clear dark areas and allow the water to occupy the lower composition.

## 3.4 Contrast Rules

- Body copy must remain highly legible.
- Never place critical text over visually noisy imagery without sufficient contrast treatment.
- Decorative low-contrast text may be used sparingly but must not carry essential information.
- Interactive controls must remain visible across light and dark sections.

# 4. Typography

Typography is one of the primary design tools for this portfolio.

The site should feel editorial rather than UI-template driven.

## 4.1 Font Strategy

Use the selected local families: **Instrument Serif** for display/editorial moments and **Manrope** for functional sans typography. Both are present under `src/assets/fonts/`; exact files are recorded in [ASSETS.md](ASSETS.md#selected-fonts). No additional font family is needed.

### Display / Editorial Font

**Instrument Serif**, regular with italic for selective emphasis. Use for expressive hero statements, major headings, and editorial moments; tune its use with Manrope in navigation and project titles during composition.

### Functional Sans / Grotesk

**Manrope**, using the available variable-weight font. Use for body copy, controls, metadata, technical labels, captions, and supporting headings.

## 4.2 Typography Scale

Use fluid type where practical with `clamp()`.

Suggested initial scale:

```css
--text-display-xl: clamp(4.5rem, 12vw, 11rem);
--text-display-lg: clamp(3.5rem, 9vw, 8rem);
--text-display-md: clamp(2.8rem, 6vw, 5.5rem);
--text-h1: clamp(2.6rem, 5vw, 4.8rem);
--text-h2: clamp(2rem, 4vw, 3.5rem);
--text-h3: clamp(1.5rem, 2.6vw, 2.2rem);
--text-body-lg: clamp(1.1rem, 1.5vw, 1.4rem);
--text-body: 1rem;
--text-small: 0.875rem;
--text-micro: 0.75rem;
```

These are starting values.

Do not treat all section headings as identical components if composition requires variation.

## 4.3 Typography Behavior

Use intentional line breaks, tight display tracking, and wider metadata tracking where useful. Keep body copy sentence case and approximately 55–75 characters per line. Avoid tiny text, uppercase paragraphs, excessive display tracking, and too many weights.

# 5. Layout System

## 5.1 Global Grid

The website should use a flexible editorial grid rather than a rigid dashboard grid.

Recommended desktop foundation:

- 12-column grid
- Fluid outer margins
- Large section spacing
- Content widths based on purpose rather than one universal max-width

Suggested CSS variables:

```css
--page-gutter: clamp(1.25rem, 3vw, 3rem);
--content-max: 1440px;
--reading-max: 760px;
```

For cinematic sections, content may exceed the normal content width and align directly to viewport gutters.

## 5.2 Section Rhythm

Use generous spacing with variation for narrative pacing.

Suggested starting ranges:

```css
--section-space-xl: clamp(8rem, 16vw, 15rem);
--section-space-lg: clamp(6rem, 12vw, 11rem);
--section-space-md: clamp(4rem, 8vw, 7rem);
--section-space-sm: clamp(2.5rem, 5vw, 4rem);
```

## 5.3 Responsive Layout

The site must look and feel like the same complete experience across modern mobile and desktop devices: consistent fonts, palette, identity, section coverage, visual ambition, and interaction intent. Responsive reflow, touch controls, and adaptive rendering preserve that experience at different sizes; identical pixel positions and GPU settings are not the goal.

### Desktop

Use asymmetric layouts, large typography, wide project media, and richer spatial compositions.

### Tablet

Preserve the same identity, hierarchy, and sections with spacing and graphics settings suited to the viewport and hardware.

### Mobile

Preserve expressive typography, large project images, and clear vertical rhythm. Stack content naturally instead of copying desktop asymmetry. Use touch alternatives and clear fullscreen navigation.

# 6. Header and Floating Controls

The persistent header contains only two primary controls.

## 6.1 Logo Button

Fixed top-left circle. Navigation and optional label behavior are defined in [EXPERIENCE.md](EXPERIENCE.md).

## 6.2 Menu Button

Fixed top-right circle with a restrained, preferably two-line hamburger and a clear close state.

## 6.3 Control Sizes

Suggested desktop size: **56px**; mobile: **48px**. Keep touch targets at least **44×44px**, as required in section 15.

## 6.4 Control Surface Treatment

Use a contrasting solid or lightly translucent surface; add minimal blur or a thin border only when needed. The controls should remain legible while floating above changing backgrounds.

# 7. Fullscreen Navigation

The menu should feel editorial and spatial rather than like a mobile drawer enlarged to desktop size.

## 7.1 Layout

Large primary links toward the left or center-left, supporting numbers, secondary identity/contact details near the bottom, optional previews, and close control at top-right. Destinations belong in [ROUTES.md](ROUTES.md).

## 7.2 Navigation Typography

Make link labels dominant and numbers secondary. Use the approved labels from the route map.

## 7.3 Menu Background

A deep neutral, soft nature gradient, subtle shader, or media preview can support the menu. Keep readability dominant; preview behavior belongs in [EXPERIENCE.md](EXPERIENCE.md).

# 8. Buttons and Links

Use buttons for actions and links for navigation. The user-approved `LinkButton` is fully rounded with left-aligned text and a circular trailing arrow pointing 45 degrees up-right. Its background uses `--color-primary: #feb05d`; `--color-secondary: #667ffd` supports hover/focus accents. Both tokens live in the Tailwind theme. Keep other links editorial and preserve visible keyboard focus and reduced-motion behavior.

# 9. Project Presentation

Feature large media, strong titles, numbering, discipline labels, and verified role/year/technology metadata in spacious, sometimes near-fullscreen compositions. Secondary work may use cards. Content and interaction details belong in [PROJECT.md](PROJECT.md#projects) and [EXPERIENCE.md](EXPERIENCE.md).

# 10. Media and Image Treatment

## 10.1 Project Images

Use clean screenshots, meaningful crops, or layered interfaces. Add device frames or browser chrome only when they improve understanding.

## 10.2 Portrait

Use a large editorial crop, strong lighting, minimal framing, and optional typography/depth layering. Avoid a small circular headshot or corporate profile-card treatment.

## 10.3 Photography

Use dark or neutral surroundings, large images, minimal captions, and generous negative space. Photographs remain the dominant element.

# 11. Iconography

Use a small, consistent set of geometric icons with matching stroke weights. Communicate technology mainly through project context and typography, not a skills-logo cloud.

# 12. Cursor

An optional desktop cursor may use a dot/ring and the contextual labels in [EXPERIENCE.md](EXPERIENCE.md). It must stay legible, avoid obscuring content, and fall back to the native cursor. Motion belongs in [MOTION.md](MOTION.md).

# 13. Borders, Radius, and Surfaces

Use borders sparingly.

Suggested:

- Hairline dividers
- Thin metadata separators
- Minimal card boundaries

Avoid excessive rounded cards.

If radius is used:

- Use small / medium radii for structured media
- Use full radius for circles only

Suggested starting tokens:

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-full: 999px;
```

Do not default every container to `border-radius: 24px`.

# 14. Texture and Atmosphere

Very light grain, fog, scene vignettes, or paper-like editorial texture may add atmosphere. Preserve image and text clarity.

# 15. Accessibility Rules

The design system must support accessible implementation.

Requirements:

- Sufficient text/background contrast
- Visible keyboard focus states
- Minimum 44×44 px touch targets
- Icon-only controls require accessible labels
- Do not encode important information through color alone
- Hover states must not be the only way to reveal essential content
- Reduced-motion mode must remain visually coherent

# 16. Design Anti-Patterns

Follow [AGENTS.md](../AGENTS.md#non-negotiable-rules). Additional visual exclusions: generic gradient blobs, glowing borders, primary bento/SaaS project grids, decorative fake terminals, and excessive rounded rectangles.

# 17. Token Strategy

Convert approved visual decisions into reusable tokens for color, type, space, radius, layout, and stacking order. Motion values belong in [MOTION.md](MOTION.md).

The Phase 0 baseline is wired in `src/index.css` using Tailwind theme namespaces. Palette and type names above are retained; layout maps to `--spacing-page`, `--spacing-section-*`, and `--container-content` / `--container-reading`. See [CONVENTIONS.md](CONVENTIONS.md#token-naming) for utility naming. Type, spacing, and breakpoint choices remain adjustable during composition.

# 18. Status

**Confirmed foundation:** Manrope, Instrument Serif, the palette above, and a consistent cross-device experience. Spacing, typography scale, font-role composition, breakpoints, and token wiring will be refined during implementation. Font selection and palette selection are no longer pending.

## Hero and introduction composition

Keep the faceted island and surrounding ocean dominant, with soft sky, distant mountains, and natural material colors. Preserve the global UI palette and floating header. The opening is text-free. During the house approach, introduce Anku with large Instrument Serif typography, a small Manrope role line, and a short description. Use a restrained dark directional shade for contrast, leaving the house visible beside or above the copy. Visible scene credits are deferred.
