# Architecture

## Stack

Client-rendered React, strict TypeScript, Vite, Tailwind CSS, and React Router. Three.js and React Three Fiber power the hero; Drei is recorded but unused by this scene. User-installed GSAP drives velocity-based wheel smoothing; ScrollToPlugin supplies document scroll limits. No backend or server rendering is required.

Use pnpm. [package.json](../package.json) owns actual dependencies and scripts; the user manages packages and lockfiles.

## Structure

| Location | Responsibility |
|---|---|
| `src/main.tsx` | Bootstrap and global styles |
| `src/App.tsx` | Router and application shell |
| `src/pages/` | Route composition |
| `src/components/layout/` | Persistent header and layout |
| `src/components/sections/` | DOM sections and scene fallback |
| `src/components/three/` | Isolated WebGL scene |
| `src/assets/` | Vite-managed media, fonts, and models |
| `src/data/` | Replaceable structured content |
| `src/hooks/` | Reusable React behavior |
| `public/` | Stable URLs for logo and favicon |

Create other folders and abstractions only when needed.

## Routing and Layout

React Router data mode provides the route shell. `AppLayout` owns the header, semantic main region, skip link, focus handling, and scroll restoration. Unknown or unbuilt destinations use NotFound; error boundaries provide recovery.

Keep both circular controls, fullscreen dialog, destinations, previews, and menu state together in `Header.tsx`. Native dialog behavior handles modal focus and background inertness.

`AppLayout` mounts `useSmoothScroll` across routes. A critically damped spring on the GSAP ticker eases wheel input while preserving velocity and updating the real window scroll position, preserving sticky positioning and hero measurements without transformed wrappers. Route changes and unmounts remove the owned ticker callback and listeners; React Router still owns restoration. Touch, keyboard, nested scroll areas, and reduced motion use native behavior. Do not combine this with CSS smooth scrolling or another smoothing system.

## Styling

Use Tailwind for ordinary styling. Keep fonts, design tokens, global rules, dialog transitions, and keyframes in `src/index.css`. See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) and [CONVENTIONS.md](CONVENTIONS.md).

## State

Prefer local state, then lifted state, then context when shared. Use refs for animation values; avoid React state updates each frame. Add state libraries only for demonstrated complexity.

## Content

Structured data flows through pages and components. Keep demo entries clearly identified and easy to replace. DOM owns content and navigation; optional WebGL failure must leave them usable.

## Hero Boundary

`Hero` owns loading, fallback selection, visibility, native-scroll progress, and scene failure containment. One event-scheduled animation frame updates a shared progress ref and DOM reveal properties; resize observations refresh measurements. `Introduction` renders semantic text from `src/data/introduction.ts`. `HeroScene` reads the shared progress and owns the canvas, camera path, lighting, sun, and fog. Separate components handle the island, mountains, clouds, boat, and water.

Load the scene lazily and coordinate its intro with readiness. Imported models share cached resources; clouds own fading material copies. Water owns its reflection resources. Clean up owned resources and event subscriptions. See [THREE_D.md](THREE_D.md) for scene behavior.

## Dependency Rules

Reuse existing packages and native capabilities before recommending dependencies. Give an exact pnpm command and reason when a package is needed; the user installs it. Do not change manifests or lockfiles on their behalf.

## Local Verification and Hosting

The user owns package operations, Git, application execution, and validation. Commands: `pnpm.cmd lint`, `pnpm.cmd build`, `pnpm.cmd dev`, and `pnpm.cmd preview`. Build includes TypeScript checks. Agents perform source edits and static review unless explicitly asked otherwise.

Check routes, keyboard/touch behavior, responsive layouts, fallbacks, and scene performance. Acceptance stays in [PROGRESS.md](PROGRESS.md). Production hosting must rewrite non-asset application URLs to `index.html`.
