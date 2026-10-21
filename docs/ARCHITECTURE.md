# Architecture

## Stack

Client-rendered React, strict TypeScript, Vite, Tailwind CSS, and React Router. Three.js and React Three Fiber power the hero; Drei is recorded but unused by this scene. User-installed GSAP drives velocity-based wheel smoothing; ScrollToPlugin supplies document scroll limits. Capabilities uses GSAP ScrollTrigger for its early-entry circle sequence. Photography uses the installed GSAP ScrollTrigger plugin to scrub its spread and upward image travel against native window scrolling; CSS owns its sticky stage. No backend or server rendering is required.

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

`AboutPage` composes the Phase 10 `/about` route with full-width profile and skills sections. `AppLayout` allows that route to own its gutters and top spacing. Profile data stays in `anku.ts`; `skills.ts` owns labels, descriptions, relationships, and responsive positions. `SkillsConstellation` uses semantic DOM buttons, decorative SVG lines, and local selection state; it adds no rendering library or animation loop.

`WorkPage` owns the Phase 11 `/work` route, its gutters, sticky card layout, and GSAP ScrollTrigger depth transitions. `WorkContent` shares image and semantic details markup with homepage `SelectedWork`; both consume `works.ts`. CSS owns sticky positioning and GSAP owns the inner surface scale. Normal-flow fallbacks, keyboard focus recovery, and animation cleanup stay in the page. No dependencies are added.

`PhotographyPage` renders all entries from the shared URL-resolved `photographCollection` in `photograph.ts`. The homepage filters the same collection by `displayInHome`. Both use `usePhotoViewer` for the existing native dialog and GSAP preview lifecycle. The page uses CSS grid masonry with measured row spans and shortest-column placement in numeric filename order. A cleaned-up ResizeObserver and resize listener recalculate placement from catalog dimensions; the page retains unbroken photo items and native lazy image loading without new dependencies.

## Styling

Use Tailwind for ordinary styling. Keep fonts, design tokens, global rules, dialog transitions, and keyframes in `src/index.css`. See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) and [CONVENTIONS.md](CONVENTIONS.md).

## State

Prefer local state, then lifted state, then context when shared. Use refs for animation values; avoid React state updates each frame. Add state libraries only for demonstrated complexity.

## Content

Structured data flows through pages and components. Keep demo entries clearly identified and easy to replace. DOM owns content and navigation; optional WebGL failure must leave them usable.

## Hero Boundary

`Hero` owns loading, fallback selection, visibility, native-scroll progress, and scene failure containment. One event-scheduled animation frame updates a shared progress ref and DOM reveal properties; resize observations refresh measurements. `Introduction` renders semantic text from `src/data/anku.ts`. `HeroScene` reads the shared progress and owns the canvas, camera path, lighting, sun, and fog. Separate components handle the island, mountains, clouds, boat, and water.

Load the scene lazily and coordinate its intro with readiness. Imported models share cached resources; clouds own fading material copies. Water owns its reflection resources. Clean up owned resources and event subscriptions. See [THREE_D.md](THREE_D.md) for scene behavior.

## Homepage Loading

`Home` coordinates `useHomepageLoading`, the reusable GSAP `PageLoader`, and hero readiness. The hook tracks the three local font faces, decoded header logo, four model groups (including their buffers/textures through the existing private loading managers), and the first rendered scene frame. `heroLoading.ts` shares resource completion with the hook without eagerly importing Three.js. Progress represents completed resource groups, not downloaded bytes; no simulated progress timer is used. Lazy photographs, below-fold images, footer rendering, and other routes are excluded.

The native modal loader makes background controls inert and locks document scrolling while the hero initializes underneath. The loader appears on every homepage document load or reload. A module-memory flag prevents replay during client-side navigation, including interrupted loading and navigation to Home from another initial route. No browser storage is used. Resource errors settle with existing fallbacks; a 15-second deadline or Escape selects the static landscape and releases pending resource waits. Unmount removes modal state, animations, listeners, subscriptions, and timers. No dependencies are added.

## Footer Boundary

By explicit user direction, `Footer.tsx` contains all footer content, metadata, shaders, scene lifecycle, and static fallback. `AppLayout` mounts it after the semantic main region on the homepage only. It dynamically imports the existing Three.js dependency on visibility; the hero retains React Three Fiber. No dependency changes are needed.

## Contact Delivery

`Contact.tsx` posts URL-encoded fields directly to Google Apps Script using fetch, follows redirects, and requires explicit JSON success. Vite resolves `Web_app` or `Deployment_ID` from the existing environment and exposes only the public endpoint. No packages or app server are added. Pending state prevents concurrent requests; timeout and unmount abort the browser request. The deployed script contract and user verification are documented in [CONTACT_DELIVERY.md](CONTACT_DELIVERY.md).

## Dependency Rules

Reuse existing packages and native capabilities before recommending dependencies. Give an exact pnpm command and reason when a package is needed; the user installs it. Do not change manifests or lockfiles on their behalf.

## Local Verification and Hosting

The user owns package operations, Git, application execution, and validation. Commands: `pnpm.cmd lint`, `pnpm.cmd build`, `pnpm.cmd dev`, and `pnpm.cmd preview`. Build includes TypeScript checks. Agents perform source edits and static review unless explicitly asked otherwise.

Check routes, keyboard/touch behavior, responsive layouts, fallbacks, and scene performance. Acceptance stays in [PROGRESS.md](PROGRESS.md). Production hosting must rewrite non-asset application URLs to `index.html`.
