# Conventions

## Purpose

Define coding and repository practices. [ARCHITECTURE.md](ARCHITECTURE.md) owns application boundaries and dependency policy; specialist documents own design and behavior.

## General Principles

Prefer clear, maintainable code and small components with meaningful responsibilities. Avoid premature abstractions; separate content, layout, motion, and scenes where practical. Follow [AGENTS.md](../AGENTS.md) for project guardrails.

## TypeScript

Use strict TypeScript. Prefer `type` for objects/unions unless interface extension is useful, explicit domain types for content, and `unknown` for unknown values. Avoid assertions and `any`; document unavoidable exceptions. Keep local types with features and shared types in `src/types/`.

## React

Use functional components and composition. Prefer props/local state; introduce shared state only when needed. Hooks should express reusable React behavior, not hide ordinary functions. Avoid unnecessary memoization and effects for render-derived values. Clean up listeners, observers, animation instances, and resources.

## Component Naming

Use PascalCase components (`Header`, `FullscreenMenu`), camelCase hooks with a `use` prefix (`useReducedMotion`), and camelCase utilities (`mapRange`). Name data modules after their content (`projects`, `photography`, `navigation`).

## File Naming

Match component names with `PascalCase.tsx` and hooks/utilities with `camelCase.ts`. Use lowercase descriptive asset names and kebab-case route slugs. Prefer `mountain-dawn.webp` over `image1.jpg`; avoid temporary names such as `final-final` or `test2`.

## Component Structure

Order files as imports, local types, constants, component, and small local helpers. Keep related logic close; split by responsibility when a file becomes hard to scan.

## Imports

Order imports: external packages, application modules, local components, assets, styles. Avoid deeply nested relative paths. If an alias is introduced for a practical reason, use it consistently.

## Tailwind CSS

Use Tailwind utilities for layout, type, spacing, responsive behavior, and states. Reuse [design tokens](DESIGN_SYSTEM.md) before arbitrary values; allow one-off art direction where justified. Extract long class strings only when readability improves, and avoid wrapper components solely to hide classes. Keep global CSS global; scoped CSS is acceptable for complex effects.

## Responsive Design

Validate small, medium, and large viewports intentionally. Follow [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for layouts/touch targets, [MOTION.md](MOTION.md) for interaction adaptations, and [THREE_D.md](THREE_D.md) for device quality.

## Navigation

Use React Router's `Link`, `NavLink`, or navigation APIs for internal routes. Preserve back/forward behavior and close the fullscreen menu appropriately after navigation. Centralization belongs in [ARCHITECTURE.md](ARCHITECTURE.md).

## State Management

Follow the local → lifted → context preference in [ARCHITECTURE.md](ARCHITECTURE.md#state). Do not add a state library for simple UI.

## Data and Content

Keep reusable projects, photographs, navigation, social links, and metadata in structured data. Follow [AGENTS.md](../AGENTS.md#content-safety--accuracy) for the approved demo-content exception and real-content accuracy rules. Generated dummy entries and repeated images are allowed initially; keep them clearly identified and replaceable.

## Animation

Follow [MOTION.md](MOTION.md). Reuse helpers, keep choreography separate from unrelated content logic, clean up timelines/observers/handlers, and avoid multiple systems controlling the same property.

## 3D

Follow [THREE_D.md](THREE_D.md), especially lifecycle, frame-loop, and fallback requirements. Keep scene components within the architecture's dedicated 3D area.

## Assets

Follow [ASSETS.md](ASSETS.md) for locations, naming, optimization, originals, and licensing. Avoid duplicate exports.

## Accessibility

Use semantic HTML, meaningful image alt text, empty alt text for decorative images, buttons for actions, and links for navigation. Preserve keyboard navigation and visible focus. Follow [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for visual access and [MOTION.md](MOTION.md) for reduced motion. Essential functionality must work without cursor effects or WebGL.

## Performance

Respect the loading boundaries in [ARCHITECTURE.md](ARCHITECTURE.md). Avoid unnecessary rerenders and idle animation loops. Test production builds and profile before adding complex optimization.

## Comments

Explain non-obvious reasoning, browser workarounds, shader/math logic, and constraints. Do not narrate obvious operations.

## Error Handling

Do not swallow errors. Log useful development context and provide a fallback for optional interactive failures without crashing the application.

## Dependency Rules

Apply [ARCHITECTURE.md](ARCHITECTURE.md#dependency-rules). `package.json` records actual dependencies and versions.

## Git / Change Discipline

Keep changes focused and avoid unrelated refactors or broad renaming. Update the owning documentation when behavior or architecture changes and [PROGRESS.md](PROGRESS.md) after meaningful milestones.

Suggested commit forms: `feat: build fullscreen navigation`, `fix: improve mobile menu interaction`, `docs: update 3D asset rules`.

## Agent Rules

Follow the workflow in [AGENTS.md](../AGENTS.md#agent-workflow). Inspect existing patterns, keep the requested scope, and avoid rewriting working code without a clear benefit.
