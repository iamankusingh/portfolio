# COMPONENTS.md

## Purpose

Map proposed component responsibilities. Names may evolve; create components only when needed. [ARCHITECTURE.md](ARCHITECTURE.md) owns folder placement and application boundaries.

## Global / Layout

- **`Header`** — one file containing logo/menu controls, fullscreen navigation, destinations, previews, and modal state. Keep trivial controls inline and use Tailwind for ordinary styling.
- **`CustomCursor`** — desktop-only enhanced cursor states such as `VIEW`, `OPEN`, or `DRAG`.
- **`PageTransition`** — shared route-transition layer if the final experience requires one.

## Homepage Sections

- **`Hero`** — opening viewport combining hero copy with the immersive landscape.
- **`Intro`** — short positioning / philosophy section after the hero.
- **`SelectedWork`** — homepage showcase of featured projects.
- **`ProjectPreview`** — one large editorial project presentation.
- **`Capabilities`** — communicates full-stack, UI/UX, system design, and creative-development capabilities.
- **`AboutTeaser`** — portrait-led personal story section.
- **`LabTeaser`** — introduces experiments and creative coding.
- **`PhotographyTeaser`** — image-led entry point to the photography page.
- **`ContactFinale`** — closing CTA, contact links, and optional sunset landscape return.

## 3D / WebGL

- **`HeroScene`** — owns the WebGL canvas for the immersive hero.
- **`CameraRig`** — pointer and scroll-based camera movement.
- **`Landscape`** — groups the nature environment.
- **`Terrain`** — stylized mountain geometry.
- **`Water`** — animated reflective water surface.
- **`Sun`** — glowing sun/orb and related lighting.
- **`Atmosphere`** — fog, sky, particles, and environmental depth.
- **`SceneQualityController`** — selects suitable rendering quality for device capability.

Detailed behavior belongs in `THREE_D.md`.

## Work

- **`WorkIndex`** — complete project listing.
- **`ProjectHero`** — project-detail opening section.
- **`ProjectMedia`** — screenshots, video, device mockups, or visual demonstrations.
- **`ProjectCaseStudy`** — semantic case-study content and technical explanation.
- **`ProjectNavigation`** — previous/next project navigation.

## Photography

- **`PhotoGallery`** — primary photography browsing experience.
- **`PhotoItem`** — individual photograph presentation.
- **`PhotoViewer`** — optional fullscreen/lightbox-style viewing experience.
- **`PhotoMetadata`** — optional verified camera/location/date information.

## Shared UI

- **`CircleButton`** — reusable circular control used by header/interface elements.
- **`SectionLabel`** — small editorial section numbering/label treatment.
- **`RevealText`** — shared text-reveal primitive where consistent behavior is needed.
- **`MediaFrame`** — reusable project/image presentation wrapper.
- **`MagneticLink`** — optional subtle pointer-attraction interaction for selected controls.

## Component Rule

Follow [CONVENTIONS.md](CONVENTIONS.md#react) for component practices. This map assigns responsibilities, not a requirement to build every component. Interaction, visuals, motion, and scene details stay in their specialist documents.

## Phase 2 implemented components

`sections/Hero` owns DOM composition, deferred loading, visibility, pause, and local scene failure containment. `sections/LandscapeFallback` supplies the immediate decorative SVG. `three/HeroScene` owns Canvas, camera, quality sampling, atmosphere, and sun, with dedicated `IslandModel` and `Water` components. `hooks/useMediaQuery` subscribes to live media preferences; `data/hero` keeps the minimal identity content replaceable. Later proposed components remain unimplemented.


