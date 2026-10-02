# COMPONENTS.md

## Purpose

Map proposed component responsibilities. Names may evolve; create components only when needed. [ARCHITECTURE.md](ARCHITECTURE.md) owns folder placement and application boundaries.

## Global / Layout

- **`Header`** — fixed minimal header containing the logo circle and menu circle.
- **`LogoButton`** — top-left circular brand/home control.
- **`MenuButton`** — top-right circular hamburger/close control.
- **`FullscreenMenu`** — fullscreen navigation overlay with large editorial links and optional previews.
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
