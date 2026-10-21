# Components

Create components when they have a clear responsibility; avoid speculative wrappers. [ARCHITECTURE.md](ARCHITECTURE.md) owns folder boundaries.

## Implemented

| Component | Responsibility |
|---|---|
| `AppLayout` | Persistent shell, main region, route focus, and scroll restoration |
| `AboutPage` | Standalone `/about` route with a profile section and skills constellation; profile data from `src/data/anku.ts` |
| `PhotographyPage` | Standalone `/photography` route with the complete catalog in a large, uncropped responsive masonry layout |
| `WorkPage` | Standalone `/work` route with sticky overlapping cards, GSAP depth transitions, keyboard focus recovery, and normal-flow fallbacks |
| `WorkContent` | Shared project image and semantic details for homepage Selected Work and the Work page, using `src/data/works.ts` |
| `SkillsConstellation` | Responsive DOM skill nodes, decorative SVG connections, native button selection, and announced descriptions from `src/data/skills.ts` |
| `Footer` | Homepage night closing scene, DOM identity/links/metadata, self-contained moonlit water, suspension, and static fallback |
| `Header` | Both circular controls, fullscreen menu, destinations, previews, and modal lifecycle |
| `Hero` | DOM composition, deferred scene loading, visibility, scrolling, and failure containment |
| `PageLoader` | Fullscreen modal progress circle, GSAP brightness/expansion/fade, scroll lock, and reduced-motion alternative; homepage resource coordination lives in `useHomepageLoading` |
| `Introduction` | Semantic identity and replaceable description revealed over the hero landscape |
| `About` | Normal-flow editorial portrait, basic details, and labeled draft personal copy from `src/data/anku.ts` |
| `Capabilities` | Phase 6 sticky circle choreography and masked single-paragraph capabilities reveal with staggered lines and local copy; immediate reduced-motion and keyboard access |
| `Photography` | GSAP scroll-driven spread and upward photo field, centered sticky heading, responsive placements, structured image data, and a normal-flow reduced-motion grid |
| `SelectedWork` | Sticky cards with scroll-triggered crossfades, 60/40 image/text layout, and normal-flow responsive/reduced-motion alternatives |
| `Contact` | Full-viewport editorial form with underline focus styling; Google Apps Script submission with pending/success/error feedback and preserved values on unconfirmed delivery |
| `LinkButton` | Reusable editorial navigation control rendered as a React Router Link/anchor |
| `CustomCursor` | Shared GSAP dot and contextual labels, native dialog layering, pointer tracking, and native-cursor fallbacks |
| `LandscapeFallback` | Static SVG used for preferences or scene failure |
| `HeroScene` | Canvas, camera, sun, lighting, and atmosphere |
| `IslandModel` | Imported island |
| `MountainRange` | Distant mountain copies |
| `Clouds` | Sky coverage and looping cloud drift |
| `ShoreBoat` | Parked boat |
| `Water` | Animated ocean and reflections |

`usePhotoViewer` shares the native fullscreen photo dialog, GSAP transitions, reduced motion, and trigger focus restoration between the homepage and gallery.

`useMediaQuery` tracks live media preferences. Keep trivial header controls in `Header.tsx`.

## Deferred

Later phases may add project case studies, Lab and a standalone contact page. Share media/viewer/transition components only when needed. Do not add device-based graphics downgrades.

See [CONVENTIONS.md](CONVENTIONS.md) for component practices and [PROGRESS.md](PROGRESS.md) for scope and acceptance.
