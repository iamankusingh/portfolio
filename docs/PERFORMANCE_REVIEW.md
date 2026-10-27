# Phase 18 Performance Review

Baseline source and asset review: 26 October 2026. First code improvements implemented: 27 October 2026. No application, build, lint, browser, or profiler was run. The findings below describe the baseline; current changes are summarized next.

## Current Implementation

Implemented nearby bounded image preparation for About and the homepage collage, observer-based collage focus visibility, offscreen scroll-measurement suspension, cached scroll limits between wheel/resize events, smooth page scrolling over ordinary form fields, and earlier footer setup with asynchronous shader compilation and one warm frame. Images, choreography, and graphics quality are unchanged. These changes target the user-reported symptoms; improvement is not yet measured. Image resizing remains deferred. Current lint/build and the targeted browser checks in PROGRESS.md are pending.

## Assessment

There is substantial room for improvement, especially in photo delivery, scroll-time DOM work, and water rendering. The reported 26 MB homepage and 55 MB whole-site totals are user observations, not independently reproduced measurements. Network weight and scroll smoothness need separate investigation: smaller downloads do not necessarily make an already-loaded GPU scene faster.

Reference device: the user's AMD E2-7110 APU / Radeon R2 laptop, 8 GB DDR3, SATA SSD, Chrome. Treat this device as a useful acceptance baseline. CPU work, image decoding, rasterization, and GPU rendering can each cause missed frames; extra RAM or an SSD does not remove per-frame rendering costs. No exact bottleneck or achievable frame rate is established without a trace.

## Asset inventory

Sizes below are source file bytes in decimal MB (1 MB = 1,000,000 bytes), not production transfer measurements.

| Assets | Size | Observation |
|---|---:|---|
| All 140 photographs | 39.72 MB | Already WebP, but served at original dimensions |
| Current 31 homepage photographs | 8.95 MB | Subset of the total above; old documentation said 25 |
| Four model folders | 1.36 MB | Includes glTF, buffers, textures, and small license files |
| Real portrait | 0.38 MB | Reused URL need not download again with normal caching |
| Three TTF fonts | 0.31 MB | Smaller optimization opportunity |
| Technology logos | 0.16 MB | Lower priority |

The homepage photo subset plus models, portrait, and fonts is approximately 11 MB before application code and other resources. This does not fully explain the reported 26 MB. Development modules, cache state, repeated navigation, and which Network total was read need checking; they are possible explanations, not measured attribution. Chrome distinguishes transferred bytes from loaded resource size. Neither figure measures decoded image memory. See the [Network reference](https://developer.chrome.com/docs/devtools/network/reference/).

`photograph.ts` eagerly resolves image **URLs**. That alone does not fetch all 140 image files. The rendered images and native lazy-loading decisions determine requests. The homepage filters the collection; the gallery renders all entries with lazy loading except its first two.

## Prioritized findings

### 1. Serve photo derivatives for small frames — highest combined benefit

Evidence: [Photography.tsx](../src/components/sections/Photography.tsx), [PhotographyPage.tsx](../src/pages/PhotographyPage.tsx), and [usePhotoViewer.tsx](../src/hooks/usePhotoViewer.tsx) all use the same `photo.source`. Neither thumbnail view provides `srcset` or `sizes`.

Catalog dimensions imply approximately **1.49 GB** for the homepage selection and **6.57 GB** for all photos if every original were decoded simultaneously into a four-byte-per-pixel buffer. These are arithmetic illustrations, not measured Chrome memory use: decoding, downsampling, eviction, and GPU copies change actual residency. One 4128 × 3096 original alone represents roughly 51 MB at that representation. Fast scrolling can introduce bursts of decoding and raster work even when compressed files are only a few hundred KB.

Proposal: retain originals and generate proportional WebP derivatives, initially considering widths around 480, 960, and 1440 pixels. Use actual frame sizes and device pixel ratio to select candidates; the opening collage's enlarged image must remain sharp. Keep the original or a suitable larger derivative for fullscreen viewing, fetched on opening, with the existing source-to-viewer handoff preserved. Do not change photographs, crops, or curation. Responsive sources let the browser select an appropriate file; see [responsive images](https://web.dev/learn/design/responsive-images).

Expected benefit: lower photo transfer, decode work, and bitmap pressure. Savings require actual generated files and visual comparison; no percentage is promised. Native lazy loading already exists and should remain. Gallery virtualization is a later option only if profiling still shows a DOM/memory problem after derivatives.

### 2. Reduce work during scrolling — high priority, preserves visual direction

Evidence: the collage timeline's `onUpdate` queries a button, reads transformed bounds and opacity, and assigns `tabIndex` for **31 frames on every update**. At 60 updates/second that can mean 1,860 bounds reads/second. Reads after animation writes can force synchronization, though a trace is needed to establish layout cost; this is not proof of 31 full layouts per frame.

Proposal: cache button references, batch reads before writes, only change `tabIndex` when visibility changes, and investigate visibility tracking or known placement/progress calculations. Preserve opacity-aware keyboard access and focus behavior during forward/reverse scrolling. Do not simply remove the accessibility logic. See [layout read/write guidance](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing).

`useSmoothScroll.ts` intercepts wheel input with a non-passive handler, walks ancestors using computed styles, reads document scroll limits during wheel events and active ticker frames, and writes `window.scrollTo`. This makes wheel motion dependent on main-thread availability. Compare against native wheel scrolling in an isolated diagnostic change before tuning spring values. Cache stable measurements with correct invalidation for resize/content/dialog changes if measurements prove costly. Touch and keyboard already remain native; the ticker stops when settled.

`Hero.tsx` continues scheduling its progress measurement and CSS-variable writes on scroll after leaving the hero. `SelectedWork.tsx` likewise measures on window scroll outside its section. Gate work outside relevant ranges, retain boundary synchronization for anchors/history/re-entry, and avoid unchanged writes. The cursor also performs scroll-triggered hit testing, but has no idle loop; profile it after the larger work above.

### 3. Profile reflective water — high priority for hero/footer stutter

| Scene | Water geometry | Reflection | Pixel ratio cap |
|---|---|---|---|
| Hero | 256 × 256 subdivisions; 131,072 triangles | 768 × 768, no multisampling | 1.75 |
| Footer | 320 × 320 subdivisions; 204,800 triangles | 1024 × 1024, 4 samples | 2 |

Evidence: [Water.tsx](../src/components/three/Water.tsx), [HeroScene.tsx](../src/components/three/HeroScene.tsx), and [Footer.tsx](../src/components/layout/Footer.tsx). Both use antialiased renderers, animated wave shaders, and planar reflection passes. The hero computes the wave surface three times per vertex to derive normals. The footer water has more triangles and a larger multisampled reflection target, though the reflected scene is simpler; it is not proven slower overall.

Pixel cost grows with the square of pixel ratio: caps of 1.75 and 2 allow approximately 3.06× and 4× the pixels of DPR 1. These caps may not matter on this laptop if Chrome reports DPR 1. Measure its actual DPR rather than assuming it reaches the cap.

Proposal: inspect frame time and renderer statistics separately in the hero and footer. Explore equivalent-looking shader simplification and geometry distribution first. If GPU time dominates, compare lower common water subdivision counts, reflection resolution/multisampling, and pixel ratio caps one at a time. Such changes need visual acceptance. Existing direction requires shared graphics quality across device classes; automatic low-end/mobile quality tiers are **not** an approved implementation choice.

The model files are small but repeated meshes still require rendering: eight mountain copies, fourteen transparent cloud copies, and an eighteen-primitive boat. The source mountain contains about 5,137 triangles, so eight copies represent about 41,096 before culling/reflection. Transparency adds overdraw. Instancing, material consolidation, or simplifying distant assets are secondary candidates if draw calls or vertex cost prove material. Preserve authored appearance and licenses. Model compression alone would not solve water rendering cost.

### 4. Reduce startup JavaScript and secondary costs — medium/lower priority

`App.tsx` eagerly imports all pages except Lab. Split non-home routes where the production bundle justifies it, preserving pending navigation, route fades, error recovery, and restoration. The hero scene is already lazy; the footer imports Three.js on visibility; Flowpaper is isolated behind the lazy Lab route. Unused installed dependencies are not automatically downloaded: inspect emitted bundles before proposing package removal.

Convert the three TTFs to licensed WOFF2 web exports as a smaller bandwidth improvement, preserving the selected typefaces and updating font loading coordination. Check deployed compression and caching after hosting exists; local file size does not reveal server behavior.

The gallery masonry computes 140 placements on resize, not every scroll; duplicate resize/observer callbacks could be coalesced, but this is lower priority. Day-cycle opacity layers cover large areas and the photo viewer uses backdrop blur; investigate raster/compositing cost if traces point there. Avoid blanket `will-change` or containment on sticky sections, which can increase memory or alter behavior. Route fades are brief opacity changes and should not be assumed to explain continuous in-page stutter.

## Existing strengths to preserve

Scene animation suspends offscreen, behind the menu, and in hidden tabs. Hero assets are cached; owned rendering resources and listeners have cleanup. React is not updated for every scene frame. Images declare dimensions and asynchronous decoding. Reduced-motion and Save-Data fallbacks exist. Flowpaper has bounded simulation/display resolutions and its own suspension lifecycle; it is not mounted on the homepage. These are useful foundations, although runtime cleanup still needs verification.

## User-run measurement plan

1. Run `pnpm.cmd build`, then `pnpm.cmd preview` and open the printed local URL. Compare production output rather than relying on the development server. No new packages are required. Use `pnpm.cmd lint` when implementation changes begin.
2. Record Chrome version, viewport, device pixel ratio, power mode, and whether graphics acceleration is active (`chrome://gpu`). Start on the actual laptop without artificial CPU throttling; keep other workloads consistent.
3. With Preserve log off, clear Network and measure separately: cold homepage initial reveal, full homepage scroll, and full gallery scroll. Record both transferred and resource totals, request counts, and image versus JS totals. Repeat with normal caching enabled. A whole-site traversal is a separate measurement and includes reused resources; do not add page totals blindly.
4. Record short Performance traces for fast forward/reverse scrolling through hero, ordinary DOM sections, collage, and footer. Repeat after images are warm. Compare long tasks, scripting, style/layout, image decode/raster activity, and dropped frames. Inspect the frame track rather than relying only on an average FPS or Lighthouse score. Follow Chrome's [runtime profiling guide](https://developer.chrome.com/docs/devtools/performance).
5. Use reduced motion as a broad diagnostic comparison, recognizing it changes multiple systems at once. Later isolated comparisons should disable only smooth wheel interception, only the relevant WebGL effect, or only the collage measurements to attribute causes.
6. After each improvement, repeat the same route and scroll sequence. Verify keyboard photo access, fullscreen sharpness, native nested scrolling, route restoration, reduced motion, and idle/offscreen suspension. Check memory across repeated home/gallery navigation for sustained growth, rather than expecting asset caches to disappear immediately.

Proposed acceptance: aim for consistent display-refresh pacing (16.7 ms/frame on a 60 Hz display), fewer dropped frames and no repeated >50 ms main-thread tasks during the reference scroll sequence. These are targets, not current results or guaranteed performance on this hardware. Set transfer budgets after the production baseline and derivative trial. Phase 18 remains active: source review and the first code improvements are complete; technical validation, profiling, and measured acceptance are pending.
