# 3D Scenes

## Direction

Use selective cinematic 3D to express **Technology × Nature × Human Experience**. Keep navigation and portfolio content in semantic HTML. The landscape should feel calm, sculptural, and atmospheric.

## Current Hero

- User-supplied island with its lower edge immersed in the ocean.
- 3D water with currents across the ocean, ripples, and scene reflections.
- Eight large, closely grouped mountains beyond the ocean, with the sun behind them.
- Fourteen clouds spread across the sky, moving right to left and recycling offscreen.
- One boat parked beside the shore.
- Soft lighting, fog, restrained pointer response, and native-scroll camera progression.
- Text-free opening, followed by DOM introduction text during the camera approach to the house.

Model sources and licenses belong in [ASSETS.md](ASSETS.md). Component boundaries belong in [ARCHITECTURE.md](ARCHITECTURE.md).

## Phase 3 Camera

Use a bounded curved approach from the existing opening view toward the house. Frame the house beside the introduction on wide screens and above it on portrait screens. `Hero` owns native-scroll progress; the scene reads that ref without React updates per frame. Camera travel settles before the reading endpoint, and pointer influence falls away during the approach. The house target corresponds to the current imported model placement; revisit it if island transforms or assets change.

## Loading and Intro

Show the dark hero background while loading. Reveal the actual scene once rendered, then introduce rising sunlight and clearing fog. Do not show a different island before the main scene. Navigation and scrolling remain available throughout.

## Shared High Quality

PCs, tablets, and smartphones use the same geometry, water detail, reflections, and graphics quality. Adapt framing and input to the viewport; do not automatically lower mobile quality. Keep rendering cost bounded and verify performance on real devices.

## Fallback Strategy

Use the authored SVG landscape for reduced motion, Save-Data, or rendering failure. WebGL errors must not remove navigation or DOM content.

## Reduced Motion

Use the static fallback without camera travel or continuous scene animation. Follow [MOTION.md](MOTION.md#19-reduced-motion) for interface behavior.

## Lifecycle and Resources

Suspend animation when the menu is open, the tab is hidden, or the hero is offscreen. Cache imported assets and share reusable resources. Dispose owned materials, water geometry, and reflection targets; remove listeners and observers on cleanup. Avoid per-frame React state updates and unnecessary allocations.

## Asset and Rendering Guidelines

Preserve authored model materials and texture colors. Resolve model sidecars through Vite asset imports. Prefer optimized production exports, limited dynamic lights, and restrained transparency. Add effects or dependencies only when they improve the experience.

The current implementation uses React Three Fiber and Three.js, including displaced water and planar reflections. There are no game controls, free camera movement, or required post-processing effects.

## Phase 9 Night Footer

The approved closing scene is night rather than sunset. `Footer.tsx` owns a lazily imported Three.js scene, hero-style Gerstner water geometry, displaced-surface normals, fine ripples, Fresnel shading, subtle crest foam, and a planar reflection of the visible moon with silver specular highlights. Foreground-dense geometry and a multisampled reflection target exceed the hero resolution. It uses no external textures or post-processing. Geometry and the capped pixel ratio are shared across devices. All text and links remain DOM content.

Load on visibility and keep the scene area dark until its first completed frame; do not show the SVG during loading. Stop rendering offscreen, behind the menu, or in a hidden tab. Reduced motion, Save-Data, and rendering failure show an inline static night scene. Dispose geometry, materials, renderer, observers, and listeners on teardown. This self-contained footer is an explicit user-approved exception to the usual separate 3D component directory. Later scenes remain deferred.

## Acceptance

Current source is implemented; visual, accessibility, performance, and cleanup acceptance remain pending. Track checks in [PROGRESS.md](PROGRESS.md).
