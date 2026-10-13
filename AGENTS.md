# AGENTS.md

## Project

This repository is Anku Singh's personal portfolio: an interactive digital experience presenting a multidisciplinary creative technologist. [PROJECT.md](docs/PROJECT.md) owns positioning, audience, goals, and scope.

## Core Creative Direction

**Technology × Nature × Human Experience.** Nature is part of the identity and storytelling, with editorial content and selective cinematic 3D. See [PROJECT.md](docs/PROJECT.md#core-creative-concept) for the concept and [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) for its visual expression.

## High-Level Experience

Use a hybrid 3D + DOM approach. Follow the journey in [EXPERIENCE.md](docs/EXPERIENCE.md); real content stays semantic HTML and remains accessible without WebGL.

## Hero Direction

The signature opening introduces Anku through a stylized landscape and DOM typography. [THREE_D.md](docs/THREE_D.md) owns the scene; [MOTION.md](docs/MOTION.md) owns choreography. Generated demo copy is authorized under the content rules below.

## Header and Navigation

Keep the preferred two-circle header and fullscreen menu described in [EXPERIENCE.md](docs/EXPERIENCE.md). Navigation must remain discoverable and usable by keyboard and touch.

## Logo

Preserve the circular blue logo with the yellow **A**. Do not redesign, distort, replace, or reinterpret it in 3D without explicit approval. See [ASSETS.md](docs/ASSETS.md) for the source.

## Personal Portrait

Use Anku's real portrait with the editorial treatment in [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md). Do not substitute generated imagery unless explicitly requested.

## Photography

Treat photography as a distinct, calm, image-led experience. [EXPERIENCE.md](docs/EXPERIENCE.md) owns browsing behavior; [ASSETS.md](docs/ASSETS.md) owns selection and metadata. Do not replace real photographs with generated imagery without approval.

## Projects

Use substantial editorial presentations. Dummy projects and repeated existing images are authorized for the initial build; distinguish them from verified work. Follow [PROJECT.md](docs/PROJECT.md#projects) for case-study content and [EXPERIENCE.md](docs/EXPERIENCE.md) for interaction.

## Motion Philosophy

Motion must explain hierarchy, depth, transition, cause and effect, or storytelling. Follow [MOTION.md](docs/MOTION.md), including reduced-motion behavior. Essential content and navigation must not depend on animation.

## 3D / WebGL Principles

Use 3D only where it serves the experience. [THREE_D.md](docs/THREE_D.md) owns scene budgets, quality tiers, loading, fallbacks, and resource cleanup; [ARCHITECTURE.md](docs/ARCHITECTURE.md) owns dependency decisions.

## Engineering Principles

Performance, accessibility, and mobile usability are core requirements. Prefer simple, maintainable solutions; reuse existing systems and native capabilities before adding dependencies or abstractions.

## Agent Workflow

Before significant work:

1. Read this file, [README.md](README.md), and [PROGRESS.md](docs/PROGRESS.md).
2. Read the specialist documents relevant to the task, using the [documentation map](README.md#documentation-responsibilities).
3. Inspect the current implementation and reuse its patterns.
4. Stay within the requested scope. Phases 2, 3, and 4 are complete by user direction. Phase 5 About/portrait is complete by user direction. Phase 6 is complete by user direction. Phase 7 is complete by user direction. Phase 8 is complete by user direction. Phase 9 is authorized for the night footer; Phase 10 onward remain deferred.

The specialist document owns its domain. If documents conflict, surface the conflict and update stale guidance when the evidence or an approved decision resolves it. Do not silently choose a new direction.

## User-Owned Operations

- The user installs, updates, and removes packages. Tell them the exact pnpm command and why a package is needed; do not run package installation commands or change dependency manifests/lockfiles on their behalf.
- The user manages Git. Do not run Git commands, stage changes, commit, create branches, or otherwise change repository history/index state unless explicitly asked.
- The user starts/stops servers, runs the application, and performs tests and validation (including lint, build, type checks, and browser checks). Do not run these commands or launch browsers unless explicitly asked.
- Continue with source/documentation edits and static code review. Provide concise commands and a focused verification checklist for the user. Record validation as pending until the user supplies results; earlier passing checks do not validate later edits.

## Non-Negotiable Rules

- Do not turn the whole website into WebGL or add unrelated 3D models.
- Do not use generic template sections without adapting them to the concept.
- Do not add skill progress bars, arbitrary ratings, or technology-logo walls unless explicitly requested.
- Avoid excessive glassmorphism, gradients, glow, or neon.
- Preserve readability, user-controlled scrolling, and immediate access to content.
- Apply the identity and content protections above and below.

## Structure and Styling

Keep the structure simple. Keep header controls, fullscreen navigation, and header-specific data together in `Header.tsx`; avoid separate files for trivial buttons. Prefer Tailwind utilities for ordinary styling. Use plain CSS only where global rules, native dialog transitions, or keyframes are clearer.

## Code Quality Expectations

Follow [CONVENTIONS.md](docs/CONVENTIONS.md) for strict TypeScript, component boundaries, accessible HTML, naming, and cleanup. The current application is a client-rendered React/Vite app; do not introduce server rendering without a documented requirement.

## Content Safety / Accuracy

**Approved demo-content exception:** Anku has authorized generated personal copy, fictional projects/case studies, and dummy data for the initial build. Existing imagery may be reused across entries; `src/assets/anku.avif` is approved for the photography placeholder.

Make demo content clearly identifiable and keep it replaceable through structured data. Fictional biography, employers, clients, dates, outcomes, or metrics must not be represented as verified facts about Anku. Use placeholder contact details rather than inventing reachable personal accounts.

For real portfolio content, use supplied facts or explicit TBD/TODO markers. Generated copy can be used during implementation without waiting for further copy approval; permission to generate it does not make it factual.

## Progress Tracking

Keep [PROGRESS.md](docs/PROGRESS.md) current after meaningful planning or implementation work. Record completed milestones, current priorities, blockers, and open decisions. Preserve truthful checkboxes; do not turn it into a detailed changelog. Keep all documentation brief and focused on the current state. Replace stale summaries rather than appending every adjustment. Omit minor tuning history, implementation mathematics, coordinates, and duplicated detail; preserve essential requirements, asset licenses, and pending acceptance.

## Current Status

Phases 2 through 8 are complete by user direction. The Phase 8 contact form remains presentation-only; message delivery is unconfigured. Phase 9 implements a full-viewport dark night footer after Contact, with moonlit 3D water, identity, homepage links, authorship, and an explicit last-updated date. Footer content, rendering, and static fallback live in `Footer.tsx`. Validation remains pending with the user. Phase 10 onward and standalone routes remain deferred.

