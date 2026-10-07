# Architecture

## Purpose

Define the application stack, folder responsibilities, routing integration, state/data flow, and loading boundaries. Use the [documentation map](../README.md#documentation-responsibilities) for visual, motion, scene, and coding rules.

## Stack

**Present:** React, strict TypeScript, Vite, Tailwind CSS (including the Vite plugin), and React Router.

**Recorded scene dependencies:** Three.js, React Three Fiber, and Drei. Phase 2 uses Three.js and Fiber directly; Drei is not needed by this scene. GSAP and scroll smoothing remain optional and unadopted. `@types/three` is now recorded in the user-managed development dependencies.

**Package manager:** pnpm. Agents may recommend necessary dependencies with an exact pnpm command and rationale; the user performs all installation and dependency changes. Planned packages remain uninstalled until the user adds them. Phase 1 uses the existing packages only.

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

React Router data mode is configured in `App.tsx` with a single `createBrowserRouter` instance and the DOM `RouterProvider`. `AppLayout` owns the semantic main region, skip link, route focus, and `ScrollRestoration`. Keep feature pages inside its outlet. The tiny foundation pages are eagerly loaded; introduce lazy boundaries when substantial page/scene code arrives. [ROUTES.md](ROUTES.md) owns the route map, including project details and catch-all behavior; [CONVENTIONS.md](CONVENTIONS.md) owns navigation code rules.

## Layout Architecture

The persistent `AppLayout` renders `Header` outside the route outlet. `src/components/layout/Header.tsx` contains both circular controls, the fullscreen modal, its destination data, preview state, and dialog lifecycle. No separate navigation folder or button components are needed.

The native dialog provides background inertness and focus containment. Normal link activation closes it before routing; location changes also close it for browser history. Controls appear in both the page and modal top layer so they remain available while the background is inert. Tailwind handles layout, responsive sizing, typography, controls, previews, and interaction states. Shared geometry, scroll locking, native dialog transitions, and animation keyframes live in `src/index.css`.

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

Root and child route error boundaries render `RouteError` with retry/home recovery links and log the error without exposing a stack trace in the UI. The child boundary preserves the layout; the root boundary covers layout failures. Unknown routes and project slugs use `NotFound`. `index.html` includes a JavaScript-disabled explanation. No WebGL is required by the foundation. Isolate future risky interactive modules with local error boundaries so their static DOM alternatives and navigation survive scene failures. Provide static alternatives so an optional effect cannot crash the main content or navigation.

## Performance Boundaries

Prioritize initial rendering, stable layout, responsive scroll, controlled JavaScript, and selective WebGL. Use event-driven/CSS updates when a persistent DOM render loop is unnecessary. Scene budgets belong in [THREE_D.md](THREE_D.md).

## Dependency Rules

Before recommending a package, check existing functionality and native browser/React/CSS options. Give the user the exact installation command; do not install it or edit dependency manifests/lockfiles yourself. Recommend only a focused dependency that solves a meaningful problem; avoid overlapping libraries and packages for trivial helpers.

## Architecture Rules for Agents

Preserve the documented stack and boundaries; create folders and abstractions only when needed. Follow [AGENTS.md](../AGENTS.md) for workflow and [CONVENTIONS.md](CONVENTIONS.md) for implementation practices. Update this document when an approved architecture decision changes.

## Local verification and hosting

The user owns all installation, application execution, and validation. User commands: `pnpm install --frozen-lockfile`, `pnpm lint`, and `pnpm build`. Agents do not run these commands or launch servers/browsers unless explicitly asked. The build includes the strict TypeScript check. Use `pnpm dev` for local development and `pnpm preview` to inspect the production output. On Windows where PowerShell blocks package-manager scripts, use `pnpm.cmd` with the same arguments. Check direct route loads, back/forward history, contact hashes, keyboard focus, font loading, narrow/wide viewports, and error recovery in a browser. Production hosting must rewrite non-asset application URLs to `index.html`; hosting configuration and deployed deep-link checks remain launch work.

## Phase 2 hero boundary

`Home` composes `sections/Hero`. The route shell removes its content gutters only for `/`, allowing the landscape to fill the viewport while retaining semantic main/skip-link/focus handling. Header code and unbuilt routes are unchanged.

`Hero` owns screen-reader identity data from `data/hero.ts`, an authored SVG for static preferences or scene failure, native scroll and its Explore cue, visibility/menu observation, and an error boundary. The visible name and manual pause control were removed at the user's request. `HeroScene` is dynamically imported when the hero becomes visible; reduced-motion visitors never mount it. Save-Data retains the fallback; CPU count and input type do not lower quality. No new animation library or asset pipeline is used.

`three/HeroScene` owns rendering quality, lifecycle, camera motion, sun, lights, and fog; `IslandModel` loads and normalizes the supplied glTF with a private binary-URL resolver; `Water` owns its shader. React Three Fiber owns declarative GPU resource disposal and canvas teardown. Event listeners, observers, and CSS handoff properties have explicit cleanup. Runtime disposal and memory behavior still need user profiling. Rendering uses Fiber's [Canvas API](https://r3f.docs.pmnd.rs/api/canvas) and [frame hooks](https://r3f.docs.pmnd.rs/api/hooks).


Normal loading shows the dark background, not the SVG. HeroScene reports readiness after a completed frame and reports failure to Hero, which selects the static fallback. The local error boundary also reports import/renderer errors. The DOM intro starts from scene readiness; identity and navigation stay available while loading.


The imported island and cloud models are cached by useLoader. Cloned hierarchies use shared geometry/materials with disposal disabled. `Clouds` maps its binary and two texture sidecars to Vite URLs and places four copies without a new animation loop. The full scene waits inside Suspense so the intro cannot reveal water before either model arrives. DawnReveal and Water share a stable sun-position vector for the orb and its animated reflection.

`MountainRange` follows the same cached-resource pattern, using a private binary resolver and eight cloned hierarchies with varied scale/rotation beyond the ocean. Its glTF shares the scene Suspense boundary, error handling, and reflection pass. No dependency was added; user-adjusted foreground island, clouds, lights, and controls are preserved.

Water uses the already-installed Three.js Reflector with a custom Gerstner wave shader and a bounded offscreen scene-reflection pass. A React effect owns its imperatively attached surface; cleanup removes it and disposes geometry, material, and the reflection target on unmount. Other procedural resources retain Fiber cleanup. This adds rendering cost explicitly authorized by the user; no dependency change was needed. Runtime performance and disposal remain pending user verification.

