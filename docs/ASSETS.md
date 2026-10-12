# Assets

## Core Assets

| Asset | Location / use |
|---|---|
| Logo | `public/logo.svg`; preserve the blue circle and yellow A |
| Favicon | `public/favicon.ico` |
| Portrait | `src/assets/anku.avif`; use the real image |
| Photography | `src/assets/photography/`; ordered filenames and alt text in `src/data/photographs.ts`. Reuse `anku.avif` for clearly labeled placeholders; see the asset-folder README |
| Project media | `src/assets/work/`; see its README for filenames. Original authored `placeholder.svg` is shared until still images are supplied |
| Fallback landscape | Authored SVG in `LandscapeFallback.tsx` |
| Ocean | Code-authored water in `Water.tsx` |

## Selected Fonts

Files are under `src/assets/fonts/`.

| Family | File | Role |
|---|---|---|
| Manrope | `Manrope/Manrope-VariableFont_wght.ttf` | Body and UI |
| Instrument Serif | `Instrument_Serif/InstrumentSerif-Regular.ttf` | Editorial display |
| Instrument Serif Italic | `Instrument_Serif/InstrumentSerif-Italic.ttf` | Selective emphasis |

Font sources/licenses still need recording. Optimized web exports remain a production task.

## Imported Island

**Low-Poly Floating Island** by [Ram Surya](https://sketchfab.com/ramsurya). [Source model](https://sketchfab.com/3d-models/low-poly-floating-island-9700497248364520bd2a9e61272d6b62).

Stored in `src/assets/3Dmodel/island/` with its Sketchfab Standard License. Authored material colors are preserved; this export has no image textures. Its included water plane is omitted so the scene ocean surrounds the island.

## Imported Mountain

**Low Poly Mountain Free** by [Poly Craftsman](https://sketchfab.com/lowpolyartwork). [Source model](https://sketchfab.com/3d-models/low-poly-mountain-free-dabda46f9be2416c93a4b584be17786b).

Stored in `src/assets/3Dmodel/mountain/`, licensed **CC BY 4.0**. Repeated with varied size and rotation to form the distant range; authored rock and snow materials are preserved.

## Imported Boat

**Fishing Boat** by [JasperTobias](https://sketchfab.com/JasperTobias). [Source model](https://sketchfab.com/3d-models/fishing-boat-e07c8b9cc38543879a4e2fe145e62df6).

Stored in `src/assets/3Dmodel/boat/`, licensed **CC BY-NC 4.0** (attribution required; noncommercial use only). One stationary shore boat retains its authored textures.

## Imported Cloud

**Cloud Test** by [Andrey Martyanov](https://sketchfab.com/3dartel). [Source model](https://sketchfab.com/3d-models/cloud-test-6d1fff581b3a424d88ee2125f909f3f3).

Stored in `src/assets/3Dmodel/cloud/`, licensed **CC BY 4.0**. Repeated across the sky with varied size/rotation, transparency, and looping drift. Authored maps and vertex colors are preserved.

## Preparation Rules

Preserve original model files and each folder's `license.txt`. Visible scene credits are deferred at the user's request; restore public attribution in the eventual credits placement before launch. Sources and authors remain recorded above. Resolve binaries and textures through Vite URLs.

Preserved adaptation notices: island scale and placement changed, embedded water omitted, custom water/lighting/intro added; cloud opacity, lighting response, scale, and placement changed and clouds repeated; mountain scale, rotation, and placement changed and copies repeated; boat scale, rotation, and shore placement changed.

Use responsive image crops, descriptive alt text, and verified metadata. Clearly identify repeated/demo images; never substitute generated portraits or photographs without approval.

Optimize production media for its display size and avoid duplicate exports. Prefer compressed images, web fonts, and optimized model exports when justified. Audio is not planned; any future sound must be optional and user-controlled.

Validation and remaining preparation are tracked in [PROGRESS.md](PROGRESS.md).
