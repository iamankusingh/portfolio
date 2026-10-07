# THREE_D.md

## Purpose

Define scene direction, rendering architecture, camera/environment behavior, quality budgets, loading, and WebGL fallbacks. [EXPERIENCE.md](EXPERIENCE.md) owns the journey; [MOTION.md](MOTION.md) owns cross-layer choreography.

# 1. Core Rule

**3D creates storytelling moments; DOM presents information.** Use scenes for the hero, chapter transitions and selected project accents, finale, and relevant lab experiments. Keep navigation, body text, case studies, and photography interfaces in semantic HTML.

# 2. Creative Direction

A stylized mountain, water, sun, horizon, and fog environment should feel sculptural, cinematic, calm, and slightly surreal. Prioritize silhouette and art direction over photorealism and asset complexity.

# 3. Narrative Scene States

The environment may support multiple states.

## 3.1 Dawn / Hero

Low light, cool atmosphere, a rising sun, fog depth, calm water, and readable terrain silhouettes.

## 3.2 Daylight / Mid Experience Accent

An optional chapter accent with clearer sky, brighter reflections, and more open framing.

## 3.3 Sunset / Finale

Warm sun, dark silhouettes, amber reflections, and deeper atmosphere. Keep progression subtle.

# 4. Scene Architecture

Likely React Three Fiber structure:

```text
<SceneCanvas>
  <SceneQualityController />
  <CameraRig />
  <EnvironmentRoot>
    <Sky />
    <Sun />
    <Terrain />
    <Water />
    <Atmosphere />
    <Particles />
  </EnvironmentRoot>
  <PostProcessing />
</SceneCanvas>
```

Exact component names may change during implementation.

The scene should remain modular so individual systems can be disabled for performance.

# 5. Terrain

## 5.1 Preferred Approach

Choose among procedural displacement, custom low-poly Blender terrain, a height-map mesh, or simplified sculpted geometry. Prioritize silhouette and composition.

## 5.2 Geometry Budget

Initial target:

- Desktop terrain: approximately 30k–120k triangles total
- Mobile terrain: approximately 15k–60k triangles total

These are guidelines, not hard limits.

Use LOD or simplified meshes if necessary.

## 5.3 Materials

Matte or semi-matte rock, soft lighting, controlled roughness, and minimal high-frequency texture. Avoid realistic PBR detail that fights the stylized direction.

# 6. Water

Water is one of the signature environmental elements.

## 6.1 Desired Behavior

Gentle movement, reflected sky/light, and subtle distortion should reinforce the horizon and transitions. An ocean simulation is unnecessary.

## 6.2 Implementation Direction

Options: custom shader plane, adapted Three.js/Drei water, normal-map distortion, or Fresnel approximation. Prefer a lightweight shader if it meets the visual need.

At the user's request for visibly three-dimensional water despite additional cost, Phase 2 uses four Gerstner wave layers with vertical and horizontal displacement. Wavelengths are 21, 13, 8, and 5.4 world units; amplitudes are 0.42, 0.25, 0.14, and 0.065. Tangent-derived vertex normals interpolate across a dense mesh; pixel-filtered fragment ripples break up reflections further. At the user's request, full-strength waves now reach the island shoreline; the earlier 13–24-unit calm zone is removed. Only the 100–220-unit distant taper remains to avoid undersampled horizon waves. Moving wave intersections at rocks and the dock await user visual acceptance.

Three.js Reflector supplies a clipped planar scene reflection of the island, clouds, and sun. The water shader distorts and softly filters that reflection, combines it with Fresnel response, deeper/shallow color tint, sun highlights, restrained crest foam, and haze. The reflection is an approximation around the ocean's mean plane, not ray tracing or a fluid simulation. The surface is genuinely displaced geometry, rather than a color pattern on an unchanged plane.

## 6.3 Performance

The user explicitly authorized additional rendering cost for this revision, superseding the earlier prototype preference to avoid planar reflections before profiling. Reflection resolution and mesh density remain bounded, with shared high-quality rendering and inactive-scene suspension; automatic downgrades are removed at the user's request. Performance acceptance is pending.

All devices use a 256×256 grid (131,072 triangles) and a 768×768 half-float reflection target without multisampling. The 1800-unit sea spans beneath the distant range. Vertex spacing concentrates 70% of each grid axis within 80 units of the island, with coarse outer geometry where the waves flatten. Each presented frame adds one scene render; the ocean hides itself during reflection to avoid recursion. Cleanup disposes geometry, material, and render target on unmount, including Strict Mode cleanup. There are no device-specific reductions or mobile frame-rate caps. Frame time and GPU memory acceptance remain pending.

# 7. Sun / Orb

Possible implementations: emissive sphere, shader billboard/sprite, directional light plus visual orb, or restrained bloom. The visible sun and light source can be separate; keep the form graphic and controlled.

The visible orb is centered at x=0, z=-700 behind the full mountain range, with radius 32 and a dawn rise from y=16 to y=26. Mountains occlude it through normal depth testing. The water shader uses its final position for the highlight. Camera and fog limits accommodate the longer view while keeping the existing light sources.

# 8. Lighting

Use a directional key, ambient/hemisphere fill, optional environment light, and emissive sun as needed. Avoid many dynamic lights. Record HDRI provenance in [ASSETS.md](ASSETS.md).

# 9. Fog and Atmosphere

Scene fog, height-fog approximations, transparent planes, shader falloff, or soft particles may establish depth. Preserve clarity and avoid heavy transparent overdraw.

# 10. Particles

Optional dust, mist, or moisture should stay subtle. Use low-count instanced/point rendering, reduce or disable on mobile, and avoid bright fantasy particle fields.

# 11. Camera

The camera is central to the storytelling.

## 11.1 Hero Camera

Start with a composed landscape. Forward drift, scroll progression, and slight pointer yaw/pitch are optional; avoid first-person game behavior.

## 11.2 Scroll Relationship

Use a few intentional beats for camera position/target, limited field of view, sun, fog, or intensity. Choreography belongs in [MOTION.md](MOTION.md).

## 11.3 Pointer Interaction

Desktop yaw, pitch, or parallax should have approximately **1–3 degrees** maximum perceptual shift. Preserve readability and comfort; disable on touch.

# 12. Hero Composition

Compose the island with an Explore cue and the floating header controls. The user removed the visible DOM name and manual pause control; retain a screen-reader heading. Keep the landscape dominant; positioning paragraphs and supporting metadata belong after the hero. Terrain silhouettes must support text contrast.

# 13. DOM and WebGL Layering

The website should keep critical text in the DOM.

Recommended layering:

```text
DOM header
DOM hero copy
WebGL canvas
DOM section content
```

The WebGL canvas may be fixed or strategically positioned during immersive chapters.

Do not render essential headings or navigation as WebGL text unless there is a strong reason.

# 14. Transition Out of Hero

Support the handoff in [MOTION.md](MOTION.md#8-3d--dom-transition): matching environmental and DOM tones, with canvas intensity/opacity reduced as content takes over.

# 15. Returning 3D Moments

The environment may return after work, around Lab, or at the sunset finale. Pause or reduce rendering when offscreen rather than maintaining maximum quality throughout.

# 16. Project 3D Usage

Use layered interfaces, devices, or spatial architecture diagrams only when they improve understanding. Avoid applying a 3D device mockup to every screenshot.

# 17. Logo in 3D

Possible future treatments include an extruded `A`, layered disc, or circle-to-sun transition. Any geometry reinterpretation requires design approval under [AGENTS.md](../AGENTS.md#logo).

# 18. Asset Strategy

Prefer custom, lightweight, or procedural assets. Possible sources include custom Blender work, Poly Haven, or carefully selected Sketchfab models. [ASSETS.md](ASSETS.md) owns source/license tracking, originals, and production exports.

# 19. Model Format

Prefer **.glb** in production. Consider Draco, Meshopt, KTX2/Basis textures, and geometry simplification where supported and justified. Do not ship raw Blender files.

# 20. Texture Strategy

Use a small reusable texture set with GPU-friendly compression where practical. Start at **1K–2K** for hero textures and provide smaller mobile variants. Larger resolutions need visual justification.

# 21. Renderer Settings

Use React Three Fiber's renderer with deliberate color management and tone mapping. Enable alpha and `powerPreference="high-performance"` only when justified; do not maximize quality by default.

The hero enables native antialiasing while retaining the existing DPR caps, opaque canvas, default power preference, ACES tone mapping, and sRGB output. A 0.5-unit camera near plane improves depth precision without approaching the island. The warm directional key at (-12,22,12) rises from 0.45 to 1.35, with hemisphere fill at 0.85 and a cool rear directional fill at 0.35. Sky and fog use #91a6ac. Device cost and final material appearance await user validation.

# 22. Device Pixel Ratio

All devices use the same DPR range of 1.0–1.75, bounded by their native pixel ratio, with antialiasing enabled.

# 23. Shared High Quality

The user requested identical high-quality graphics on PC, tablet, and smartphone, superseding the earlier three-tier policy. All devices use full geometry, a 256×256 water mesh, and 768×768 reflections. There is no automatic downgrade, 30fps mobile cap, or CPU-based static fallback. Reduced-motion/Save-Data preferences and actual rendering failures retain fallbacks.

# 24. Performance Targets

The user prioritizes **high-quality graphics, a consistent experience across modern mobile/desktop browsers, and decent performance**. Preserve the composition, atmosphere, and complete story with the same high-quality rendering configuration across devices.

Validate loading, responsive interaction, frame times, and memory on representative devices. Numerical budgets may be set during profiling; they are implementation choices, not missing user decisions. Essential DOM content must remain promptly available.

# 25. Loading Strategy

Render DOM first on a dark atmospheric background, progressively load the scene, then reveal the actual rendered island when ready. The user requested no alternate landscape during normal loading; static imagery is reserved for fallback conditions. Any loader should be brief and nonblocking.

# 26. Fallback Strategy

Use a static render, CSS/layered image treatment, or an approved lightweight video when WebGL is unavailable or unsuitable. Preserve all semantic content and navigation, as required by [EXPERIENCE.md](EXPERIENCE.md#20-webgl-failure--fallback-experience).

# 27. Reduced Motion

Freeze or simplify camera travel, remove pointer response, reduce water motion, omit continuous particles, and use short fades. A calm static scene may remain. Follow [MOTION.md](MOTION.md#19-reduced-motion) for the broader interface.

# 28. Mobile Strategy

Keep geometry, shader detail, reflections, lighting, and DPR cap identical on desktop, tablet, and smartphone. Adapt composition and input to viewport/touch without lowering graphics quality. Respect reduced-motion/Save-Data preferences and retain fallbacks for actual rendering failures.

# 29. Cleanup and Lifecycle

Dispose unused geometry/materials, prevent duplicate texture loads, reuse resources, stop inactive loops, remove listeners, and avoid per-frame allocations.

# 30. React Three Fiber Rules

Keep scene objects declarative, use `useFrame` sparingly, memoize expensive calculations, and reuse vectors/matrices. Use refs for per-frame values; keep business logic and per-frame React state updates out of the loop.

# 31. Shader Rules

Possible shader uses: water, atmosphere, sun glow, terrain blending, and masks. Keep each shader focused, document non-obvious math, and offer cheaper variants where needed.

# 32. Post-Processing

Optional subtle bloom, vignette, or color grading must justify their cost. Prefer material/lighting solutions when cheaper. Avoid heavy chromatic aberration, bloom, interaction-time depth of field, or glitch effects.

# 33. 3D Anti-Patterns

Avoid game controls, free camera travel, giant photorealistic downloads, unnecessary physics, and unprofiled effects. Follow the budgets and constraints above and the hybrid-content rule in [AGENTS.md](../AGENTS.md).

# 34. Implementation Direction

Three.js, React Three Fiber, and Drei are recorded dependencies. The Phase 2 prototype uses Fiber and Three.js without Drei or GSAP. [ARCHITECTURE.md](ARCHITECTURE.md) owns adoption decisions; `package.json` records installed versions.

# 35. Status

**Hero brief confirmed:** use the concept in [PROJECT.md](PROJECT.md#core-creative-concept). Implementation may choose procedural/assets/shader techniques as needed. Before production implementation, validate terrain, water, sun, fog, camera path, DOM handoff, and desktop/mobile performance in a focused hero prototype. Do not commit to a complex asset pipeline before that validation.

# 36. Phase 2 Prototype Decisions

`MountainRange` loads the supplied Low Poly Mountain Free glTF and repeats it eight times as a tightly overlapping distant range. Centers at x=-210 to 210 are spaced 60 units apart, with different yaw angles, widths of 135–190 units, and z=-420 to -455. Bases sit at y=-2 beneath the sea. Original rock/snow materials remain shared in the loader cache, adding 41,096 triangles across eight copies and appearing in the water reflection. All device classes use the same geometry. The camera far plane is 1100; fog clears to near=120/far=1400 so the range remains visible. The sun is farther away at z=-700 and can be obscured naturally by the mountain geometry. Asset URLs, silhouettes, clipping, portrait composition, and resource/performance acceptance remain pending. See [ASSETS.md](ASSETS.md#imported-mountain).

The hero now loads the user-provided Low-Poly Floating Island glTF from `src/assets/3Dmodel/island/` through `IslandModel`. Its existing materials and island geometry are preserved. The export's large cyan ocean plane is named `Object_2` with the generic `Material`, so the loader explicitly omits it before calculating bounds. World bounds normalize the island to 28 units across, and its lowest point is anchored 1.25 world units below the mean ocean surface. An outer group rotates the centered island around world Y, retaining its position and waterline; the user's current yaw is +36 degrees. Placement and viewing angle await user visual acceptance.

`Clouds` loads the supplied Cloud Test glTF once and shares its cached geometry, materials, and two textures among four cloned hierarchies. Deterministic placements behind the island vary height, depth, width (8–13 world units), and yaw; they do not add a continuous animation loop. The 800-triangle source adds approximately 3,200 triangles across four copies. Its translucent material retains the authored maps and vertex colors, disables depth writes, and uses opacity 0.14 with emissive intensity 0.35. A private loading manager resolves the binary and both textures to Vite URLs. Clouds share the scene Suspense/loading/failure boundary; reduced-motion and Save-Data fallback paths do not load them. Transparent overdraw, framing, asset URLs, and memory plateau require user profiling. Attribution is in Scene credits; see [ASSETS.md](ASSETS.md#imported-cloud).

The source model contains approximately 2,476 triangles before water removal and approximately 160 KB of glTF/binary data. Its nine materials use PBR base-color factors; the export contains no image textures or texture references. Preserve these authored colors rather than inventing missing maps or overriding color space. All devices share high-quality rendering settings. CPU/input heuristics, frame-time downgrades, and the mobile frame-rate cap are removed. Performance has not been measured.

The scene and its intro share a Suspense boundary: the sun/fog animation and readiness signal wait for the island model. Vite URL imports include both the glTF and its binary sidecar; a private loading manager maps the relative binary path to its emitted URL. The loader caches one model resource set across route visits. Each mount clones the object hierarchy, retaining shared materials/geometry with `dispose={null}`; memory should plateau after the first load, not return to zero on route exit. Event/timer cleanup remains explicit.

The SVG fallback is not mounted during normal scene loading. A dark background leads directly into the actual rendered island; its first completed frame triggers the DOM/canvas reveal. A 1.6-second sun/light/fog progression supplies the dawn intro. Reduced motion or explicit Save-Data preference skip the scene; CPU count does not. Import/render errors, shader compilation failure, and context loss preserve the fallback. Context loss ends that scene mount; a later route mount may try again. Hidden tabs, offscreen hero, and open navigation stop continuous rendering. The manual pause control was removed at the user's request. Procedural sun/water resources are disposed by Fiber; imported model resources intentionally remain in the single loader cache; listeners/timers are cleaned up explicitly. Profile actual renderer memory after repeated route entry/exit before claiming cleanup acceptance.

The elevated camera looks toward `(0, 4, -8)` to add sky room while keeping the foreground island, revealing surrounding water. Portrait viewports increase camera distance based on aspect ratio to preserve the whole island. Camera travel is limited to 2.5 world units forward and 0.65 down across one viewport of native scroll. Pointer offsets are at most 0.45 horizontally and 0.18 vertically (well under three degrees at the chosen target distance), mouse only. Camera position damps without per-frame React updates. A dark DOM veil takes over as scroll progresses; a quiet, text-free end of the landscape establishes the tone for Phase 3 without adding its content.

Provisional acceptance targets: approximately 60fps on representative desktop, tablet, and smartphone hardware, immediate DOM/fallback availability, no accumulating GPU resources across route changes, and no continuous frames while inactive. These are targets, not measured results. Production acceptance, mobile composition, and frame/memory profiling remain pending with the user; do not expand the asset pipeline yet.




