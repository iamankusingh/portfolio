# Assets

## Purpose

Track available assets, preparation, locations, and provenance. Visual treatment belongs in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md); scene budgets belong in [THREE_D.md](THREE_D.md).

## Asset Locations

Current asset structure:

```text
public/
├── favicon.ico
└── logo.svg

src/
└── assets/
    ├── fonts/
    ├── photographs/
    └── anku.avif
```

As the project grows, use:

```text
src/assets/
├── fonts/
├── photographs/
├── project-media/
├── textures/
├── models/
└── icons/
```

Only create folders when needed.

## Brand Assets

### Logo

Available: `public/logo.svg` for the header and brand identity. Preserve the vector source and follow [AGENTS.md](../AGENTS.md#logo) for changes or reinterpretation.

### Favicon

Available: `public/favicon.ico`. Add other formats only when required.

## Portrait

Use the existing `src/assets/anku.avif` for the portrait. It is also the user-approved initial photography image. Choose responsive crops during composition; preserve the real image and follow [AGENTS.md](../AGENTS.md#personal-portrait).

## Photography

Use `src/assets/anku.avif` initially, repeating it across gallery items as needed. `src/assets/photographs/` is currently empty; a new image collection is not required to start.

Store image ID, source, alt text, width, and height in structured data. Describe the actual visible image in alt text. Label repeated entries as demo material; omit unsupplied location/date/camera metadata or identify it explicitly as fictional example metadata.

## Project Media

For the initial dummy projects, reuse any available local image; repeating `src/assets/anku.avif` is allowed. Reference the same source rather than copying it for every entry. Clearly distinguish placeholder imagery from an actual project screenshot.

When dedicated media is ready, use `src/assets/project-media/<project-slug>/`. Possible files: `cover.avif`, `desktop-01.avif`, `mobile-01.avif`, `architecture.svg`, and `demo.webm`.

Prepare screenshots, technical diagrams, design explorations, and useful demos. Keep them large enough for editorial presentation; export for the actual display size instead of shipping raw design files.

## Fonts

The selected local fonts are present as **TTF** files. Use these sources; WOFF2 remains a preferred optimized production export where appropriate. Preload only critical variants. [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#41-font-strategy) defines their roles.

### Selected Fonts

| Family | Available file | Intended role |
|---|---|---|
| Manrope | `src/assets/fonts/Manrope/Manrope-VariableFont_wght.ttf` | Body, UI, metadata, supporting headings |
| Instrument Serif | `src/assets/fonts/Instrument_Serif/InstrumentSerif-Regular.ttf` | Display/editorial typography |
| Instrument Serif Italic | `src/assets/fonts/Instrument_Serif/InstrumentSerif-Italic.ttf` | Selective editorial emphasis |

The font choices are confirmed. Source/license records are not included with the current files; complete the registry during production asset preparation.

## 3D Models

Create `src/assets/models/` only if needed. Prefer **.glb** production exports; `.gltf` may be used where justified. Optimize geometry/materials, preserve source files separately, and follow [THREE_D.md](THREE_D.md) for scene needs and compression.

## Textures and HDRIs

Create `src/assets/textures/` only as needed for terrain, noise/normal maps, environments, or subtle grain. Choose resolutions using [THREE_D.md](THREE_D.md#20-texture-strategy) and test mobile memory. Register external sources.

## Icons

Use a minimal SVG set or clearer text labels. Follow [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#11-iconography); no large icon library is needed by default.

## Video

Prefer **WebM** with MP4 fallback when needed. Use video only when motion adds information. Mute decorative autoplay, avoid audio autoplay, and optimize using the checklist below.

## Audio

Not required. Any future sound must be small, optional, user-controlled, and never autoplay unexpectedly.

## Asset Optimization

Before production, check the applicable list. Preserve originals outside the production bundle; avoid duplicate exports.

### Images

Check dimensions, orientation, AVIF/WebP suitability, compression, descriptive names, and removal of unnecessary metadata.

### 3D

Check polygon/texture/material counts, unused nodes, file size, and mobile behavior against [THREE_D.md](THREE_D.md).

### Fonts

Check license, WOFF2 export, required weights, and critical-only preload.

### Video

Check dimensions, duration, bitrate, mute behavior, poster, and below-the-fold lazy loading.

## External Asset Registry

Record each third-party asset here, including fonts:

| Asset / type | Source / author | License | Local file(s) | Usage |
|---|---|---|---|---|

### Current External Assets

| Asset | Source / author | License record | Local files | Usage |
|---|---|---|---|---|
| Manrope | User-provided local files; upstream source not recorded | Pending documentation | `fonts/Manrope/Manrope-VariableFont_wght.ttf` | Functional sans |
| Instrument Serif | User-provided local files; upstream source not recorded | Pending documentation | `fonts/Instrument_Serif/InstrumentSerif-Regular.ttf`, `InstrumentSerif-Italic.ttf` | Editorial display |

Font paths here are relative to `src/assets/`. File availability does not establish the license record.

## Asset Status

| Asset | Current status |
|---|---|
| Logo | SVG available; preserve existing identity |
| Favicon | File available |
| Portrait | `anku.avif` confirmed; responsive crop to compose |
| Photography | Reuse `anku.avif` for the initial demo gallery |
| Project media | Repeated existing imagery approved; dedicated exports not required initially |
| Fonts | Manrope and Instrument Serif TTF files present; license records/export optimization pending |
| 3D models | Approach/need undecided |
| Textures / HDRIs | Not selected |
| Video | Not added |
| Audio | Not planned |

Update this inventory as selections are finalized; the preparation checklist lives in [PROGRESS.md](PROGRESS.md).
