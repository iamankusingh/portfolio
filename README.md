# Anku Singh — Personal Portfolio

An interactive portfolio for Anku Singh, combining engineering, editorial design, selective 3D, and personal storytelling.

## Vision

**Technology × Nature × Human Experience.** Mountains, water, sunlight, and atmosphere form a narrative identity, moving from dawn toward sunset. See [PROJECT.md](docs/PROJECT.md) for product intent.

## Portfolio Positioning

Present Anku as a creative technologist working across full-stack development, web experiences, UI/UX, system design, creative development, and photography. The portfolio itself should demonstrate this range through its craft.

## Experience Direction

Use immersive 3D for key moments and semantic DOM for content. The preferred journey moves from hero and introduction through work, capabilities, portrait, lab, and photography to a contact finale. [EXPERIENCE.md](docs/EXPERIENCE.md) owns the sequence and interaction details.

## Hero Concept

A stylized mountain-and-water landscape with a sun, atmosphere, and cinematic typography. Scene options and prototype requirements are in [THREE_D.md](docs/THREE_D.md).

## Header / Navigation Concept

Two floating circular controls: logo at top-left and menu at top-right. The menu opens fullscreen editorial navigation. See [EXPERIENCE.md](docs/EXPERIENCE.md) for behavior and [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) for appearance.

## Photography

A quieter, image-led chapter with its own browsing experience. Use `src/assets/anku.avif` as the initial repeatable gallery image; browsing options are in [EXPERIENCE.md](docs/EXPERIENCE.md).

## Personal Portrait

Anku's real portrait belongs in the story as an editorial composition. The current asset is recorded in [ASSETS.md](docs/ASSETS.md).

## Planned Routes

All discussed sections and the About, Work, project-detail, Photography, and Lab pages are included initially. A separate Contact page is required later; use the homepage finale in the meantime. [ROUTES.md](docs/ROUTES.md) owns the map.

## Planned Technical Direction

The existing foundation is **React + TypeScript + Vite + Tailwind CSS**. React Router is planned but not installed. Three.js, React Three Fiber, Drei, and motion tooling remain proposed additions.

[ARCHITECTURE.md](docs/ARCHITECTURE.md) owns the technical plan; [package.json](package.json) records actual dependencies and scripts.

## Design Priorities

Premium, atmospheric, minimal, and editorial. Visual experimentation should strengthen the portfolio's content and identity. [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) records the selected **Manrope + Instrument Serif** pairing, confirmed color palette, and composition rules. Preserve the same visual identity and complete experience across modern mobile and desktop browsers.

## Performance and Accessibility

The experience must work on mobile, with keyboard input, reduced motion, and without WebGL. Content remains semantic HTML; heavy media loads selectively. Implementation requirements live in [CONVENTIONS.md](docs/CONVENTIONS.md), with scene-specific limits in [THREE_D.md](docs/THREE_D.md).

## Project Documentation

Read [AGENTS.md](AGENTS.md) for contribution rules and [PROGRESS.md](docs/PROGRESS.md) for current status before substantial work.

### Documentation responsibilities

| Document | Owns |
|---|---|
| [AGENTS.md](AGENTS.md) | Agent workflow, guardrails, content accuracy |
| [PROJECT.md](docs/PROJECT.md) | Positioning, audience, goals, scope |
| [EXPERIENCE.md](docs/EXPERIENCE.md) | Visitor journey and interaction requirements |
| [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Visual language, typography, color, layout, tokens |
| [MOTION.md](docs/MOTION.md) | Timing, easing, choreography, reduced motion |
| [THREE_D.md](docs/THREE_D.md) | Scenes, rendering, quality tiers, WebGL fallbacks |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack, application structure, data flow, dependencies |
| [COMPONENTS.md](docs/COMPONENTS.md) | Component responsibilities |
| [ROUTES.md](docs/ROUTES.md) | Route map and page responsibilities |
| [CONVENTIONS.md](docs/CONVENTIONS.md) | Code style and implementation practices |
| [ASSETS.md](docs/ASSETS.md) | Asset inventory, preparation, source and license tracking |
| [PROGRESS.md](docs/PROGRESS.md) | Phase checklist, priorities, blockers, decisions |

Specialist documents own their domains; summaries link to them instead of repeating their specifications. Values marked suggested, possible, or TBD remain provisional.

## Repository Status

**Planning and specification.** A minimal application scaffold, logo, favicon, and portrait are present. Portfolio features are not implemented. Initial scope, demo content, fonts, palette, pnpm, and device goals are confirmed. See [PROGRESS.md](docs/PROGRESS.md) for the preparation checklist and phased roadmap.

## Development

Use **pnpm**. Existing package scripts are `pnpm dev`, `pnpm build`, `pnpm lint`, and `pnpm preview`; install dependencies with `pnpm install` when implementation begins. Add necessary packages using the policy in [ARCHITECTURE.md](docs/ARCHITECTURE.md). No installation or code changes are part of this planning update.

## Asset Preparation

Generated personal copy, dummy project/Lab data, and repeated available images are approved for the initial build. Use `anku.avif` for photography and the local selected font files. Follow [ASSETS.md](docs/ASSETS.md) for inventory and [AGENTS.md](AGENTS.md#content-safety--accuracy) for identifying demo content. These materials do not block implementation.

## Guiding Principle

**The website itself should be evidence of Anku's ability to build polished digital experiences.**
