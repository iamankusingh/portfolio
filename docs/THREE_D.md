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

## 6.3 Performance

Avoid real-time planar reflections unless profiling justifies them. Consider environment/cubemap sampling, screen-space approximation, or simplified reflection color. Reduce water complexity on mobile.

# 7. Sun / Orb

Possible implementations: emissive sphere, shader billboard/sprite, directional light plus visual orb, or restrained bloom. The visible sun and light source can be separate; keep the form graphic and controlled.

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

Compose the scene with space for DOM title, positioning, supporting metadata, scroll cue, and floating controls. Terrain silhouettes must support text contrast.

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

# 22. Device Pixel Ratio

Cap DPR. Suggested starting ranges: **1.0–1.75 desktop**, **1.0–1.5 mobile**. Avoid native DPR 3 on phones; lower quality dynamically if necessary.

# 23. Quality Tiers

The scene should support at least three practical quality levels.

## High

Capable desktops may use denser terrain, better water, richer atmosphere, and selected post-processing.

## Medium

Average desktops/tablets use reduced geometry, reflection complexity, particle counts, and post-processing.

## Low

Constrained devices use simpler terrain/water/fog, lower DPR, and no expensive post effects.

# 24. Performance Targets

The user prioritizes **high-quality graphics, a consistent experience across modern mobile/desktop browsers, and decent performance**. Preserve the composition, atmosphere, and complete story while adapting rendering cost to hardware.

Validate loading, responsive interaction, frame times, and memory on representative devices. Numerical budgets may be set during profiling; they are implementation choices, not missing user decisions. Essential DOM content must remain promptly available.

# 25. Loading Strategy

Render DOM first, show a lightweight environmental fallback, progressively load scene assets, then reveal the scene when ready. Any loader should be brief and nonblocking.

# 26. Fallback Strategy

Use a static render, CSS/layered image treatment, or an approved lightweight video when WebGL is unavailable or unsuitable. Preserve all semantic content and navigation, as required by [EXPERIENCE.md](EXPERIENCE.md#20-webgl-failure--fallback-experience).

# 27. Reduced Motion

Freeze or simplify camera travel, remove pointer response, reduce water motion, omit continuous particles, and use short fades. A calm static scene may remain. Follow [MOTION.md](MOTION.md#19-reduced-motion) for the broader interface.

# 28. Mobile Strategy

Preserve the same landscape identity, lighting direction, and narrative beats as desktop. Adapt geometry, DPR, shaders, fog, particles, and input to device capability. Use the least visible quality reductions first, and a coherent fallback when needed; do not give mobile an unrelated or incomplete design.

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

Three.js, React Three Fiber, Drei, and GSAP coordination remain proposed additions. [ARCHITECTURE.md](ARCHITECTURE.md) owns adoption decisions; `package.json` records installed versions.

# 35. Status

**Hero brief confirmed:** use the concept in [PROJECT.md](PROJECT.md#core-creative-concept). Implementation may choose procedural/assets/shader techniques as needed. Before production implementation, validate terrain, water, sun, fog, camera path, DOM handoff, and desktop/mobile performance in a focused hero prototype. Do not commit to a complex asset pipeline before that validation.
