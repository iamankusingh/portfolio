# Components

Create components when they have a clear responsibility; avoid speculative wrappers. [ARCHITECTURE.md](ARCHITECTURE.md) owns folder boundaries.

## Implemented

| Component | Responsibility |
|---|---|
| `AppLayout` | Persistent shell, main region, route focus, and scroll restoration |
| `Header` | Both circular controls, fullscreen menu, destinations, previews, and modal lifecycle |
| `Hero` | DOM composition, deferred scene loading, visibility, scrolling, and failure containment |
| `Introduction` | Semantic identity and replaceable description revealed over the hero landscape |
| `About` | Normal-flow editorial portrait, basic details, and labeled draft personal copy from `src/data/anku.ts` |
| `Capabilities` | Phase 6 sticky circle choreography and masked single-paragraph capabilities reveal with staggered lines and local copy; immediate reduced-motion and keyboard access |
| `Photography` | GSAP scroll-driven spread and upward photo field, centered sticky heading, responsive placements, structured image data, and a normal-flow reduced-motion grid |
| `SelectedWork` | Sticky cards with scroll-triggered crossfades, 60/40 image/text layout, and normal-flow responsive/reduced-motion alternatives |
| `LinkButton` | Reusable editorial navigation control rendered as a React Router Link/anchor |
| `LandscapeFallback` | Static SVG used for preferences or scene failure |
| `HeroScene` | Canvas, camera, sun, lighting, and atmosphere |
| `IslandModel` | Imported island |
| `MountainRange` | Distant mountain copies |
| `Clouds` | Sky coverage and looping cloud drift |
| `ShoreBoat` | Parked boat |
| `Water` | Animated ocean and reflections |

`useMediaQuery` tracks live media preferences. Keep trivial header controls in `Header.tsx`.

## Deferred

Later phases may add project case studies, Lab, a dedicated photography gallery, and contact components. Share media/viewer/transition components only when needed. Do not add device-based graphics downgrades.

See [CONVENTIONS.md](CONVENTIONS.md) for component practices and [PROGRESS.md](PROGRESS.md) for scope and acceptance.
