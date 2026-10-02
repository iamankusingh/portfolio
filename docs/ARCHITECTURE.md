# Architecture

## Purpose

Define the application stack, folder responsibilities, routing integration, state/data flow, and loading boundaries. Use the [documentation map](../README.md#documentation-responsibilities) for visual, motion, scene, and coding rules.

## Stack

**Present:** React, TypeScript, Vite, and Tailwind CSS (including the Vite plugin).

**Planned, not installed:** React Router; Three.js, React Three Fiber, and Drei for selected scenes; GSAP where complex choreography warrants it. Smooth-scroll tooling remains optional.

**Package manager:** pnpm. The user authorizes necessary dependencies during implementation; choose them using the dependency policy below without reopening the baseline decision. Planned packages remain uninstalled until added.

**Compatibility goal:** modern browsers on mobile and desktop, with responsive tablet support. Maintain visual/functional consistency, high-quality graphics, and reasonable loading and interaction performance. Validate across representative current browser engines and hardware; tune concrete performance targets through profiling.

[package.json](../package.json) is authoritative for installed packages, scripts, and versions.

## Application Model

A client-rendered React/Vite application with route pages, reusable DOM components, isolated interactive/3D modules, and local assets. Do not add backend services, server rendering, global state libraries, or API layers without a real requirement.

## Current Project Structure

```text
portfolio/
├── docs/
├── public/
│   ├── favicon.ico
│   └── logo.svg
│
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── photographs/
│   │   └── anku.avif
│   │
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── AGENTS.md
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Recommended Source Structure

As the project grows, keep `src` organized like this:

```text
src/
├── assets/
│   ├── fonts/
│   ├── photographs/
│   ├── project-media/
│   └── textures/
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── sections/
│   ├── ui/
│   └── three/
│
├── pages/
│   ├── Home.tsx
│   ├── Work.tsx
│   ├── ProjectDetail.tsx
│   ├── Photography.tsx
│   ├── About.tsx
│   ├── Lab.tsx
│   └── NotFound.tsx
│
├── data/
│   ├── projects.ts
│   ├── photography.ts
│   └── navigation.ts
│
├── hooks/
├── lib/
├── types/
│
├── App.tsx
├── main.tsx
└── index.css
```

Only create folders when they are actually needed.

## Responsibilities

### `main.tsx`

Bootstrap React, necessary app-wide providers, and global styles only.

### `App.tsx`

Compose routes, persistent layout/navigation, and any global transition/UI layer. Keep page implementation in route components.

### `pages/`

Compose sections and route-specific components for each page.

### `components/`

Group reusable components by responsibility: layout, navigation, sections, UI, and 3D. [COMPONENTS.md](COMPONENTS.md) maps proposed components.

### `components/three/`

Isolate scene code from content and routing. [THREE_D.md](THREE_D.md) owns scene decomposition and behavior.

### `assets/`

Store imported assets that benefit from Vite processing/hashing. Locations and preparation rules belong in [ASSETS.md](ASSETS.md).

### `public/`

Use for files served directly by stable URL, such as favicon, logo, or intentionally unprocessed large files. It is not the default for all media.

### `data/`

Hold structured projects, photographs, navigation, social links, and shared metadata so components do not duplicate content.

### `hooks/`

Reusable React behavior, such as media queries, reduced motion, or scroll progress.

### `lib/`

Shared framework-independent helpers for formatting, images, animation, math, or Three.js. Do not place React components here.

### `types/`

Types shared across features; keep local types near their feature.

## Routing

Adopt React Router as the application router when implementation starts. Centralize definitions in `App.tsx` or a small router module. [ROUTES.md](ROUTES.md) owns the route map, including project details and catch-all behavior; [CONVENTIONS.md](CONVENTIONS.md) owns navigation code rules.

## Layout Architecture

The persistent application shell should be conceptually:

```text
App
├── Header
│   ├── LogoButton
│   └── MenuButton
│
├── FullscreenMenu
│
├── RouteContent
│
└── GlobalInteractionLayer
```

The header and fullscreen navigation should remain outside individual pages unless a future requirement explicitly changes that behavior.

## Styling

Tailwind is the primary styling system. Keep global fonts, tokens, and base styles in `src/index.css`; use scoped CSS for complex local effects when clearer. [CONVENTIONS.md](CONVENTIONS.md) owns usage rules and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) owns visual values.

## State

Prefer local state, then lifted state, then context when genuinely shared. Menu, transition, or interaction state may be shared if needed. External state libraries require demonstrated complexity.

## Content and Data Flow

**Structured data → page → section/component → presentation.** Keep repeated project and photograph metadata out of duplicated JSX. Initial records may use authorized demo copy and repeated media, with an explicit demo marker so they remain distinguishable and easy to replace.

## 3D and DOM Separation

DOM owns content, navigation, photography UI, and semantics. Isolated WebGL modules own landscapes and selected visual interactions. Scene failure must not remove the DOM layer.

## Lazy Loading

Consider route pages, galleries, case studies, scenes, and experiments as loading boundaries. Split when useful; avoid creating a chunk for every small component.

## Asset Loading

Defer noncritical photography, project media, and 3D assets. [ASSETS.md](ASSETS.md) owns formats/exports; [THREE_D.md](THREE_D.md) owns progressive scene loading.

## Error Boundaries and Fallbacks

Isolate risky interactive modules with error boundaries where useful. Provide static alternatives so an optional effect cannot crash the main content or navigation.

## Performance Boundaries

Prioritize initial rendering, stable layout, responsive scroll, controlled JavaScript, and selective WebGL. Use event-driven/CSS updates when a persistent DOM render loop is unnecessary. Scene budgets belong in [THREE_D.md](THREE_D.md).

## Dependency Rules

Before adding a package, check existing functionality and native browser/React/CSS options. Add only a focused dependency that solves a meaningful problem; avoid overlapping libraries and packages for trivial helpers.

## Architecture Rules for Agents

Preserve the documented stack and boundaries; create folders and abstractions only when needed. Follow [AGENTS.md](../AGENTS.md) for workflow and [CONVENTIONS.md](CONVENTIONS.md) for implementation practices. Update this document when an approved architecture decision changes.
