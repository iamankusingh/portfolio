# Anku Singh — Personal Portfolio

An interactive creative-technologist portfolio built around **Technology × Nature × Human Experience**: selective cinematic 3D with accessible editorial content.

## Current Status

Phases 2 through 11 are complete by user direction. The Phase 8 contact form submits to the configured Google Apps Script web app; deployed script compatibility and spreadsheet delivery await user validation. See [contact delivery](docs/CONTACT_DELIVERY.md). Phase 9 implements a full-viewport dark night footer after Contact, with moonlit 3D water, identity, homepage links, authorship, and an explicit last-updated date. Footer content, rendering, and static fallback live in `Footer.tsx`. Validation remains pending with the user. Phase 10 About is complete by user direction; technical validation and final profile copy/location remain pending. Phase 11 Work is complete by user direction; technical validation remains pending. Phase 12 implements `/photography` with all 140 supplied photos in a large, uncropped responsive masonry layout and the shared homepage fullscreen viewer. User validation remains pending. Phase 13 onward remain deferred.


## Stack and Development

React, TypeScript, Vite, Tailwind CSS, React Router, Three.js, and React Three Fiber. Use pnpm; [package.json](package.json) records dependencies and scripts.

The user manages package installation, Git, servers, and validation. Available commands:

```powershell
pnpm.cmd install --frozen-lockfile
pnpm.cmd dev
pnpm.cmd lint
pnpm.cmd build
pnpm.cmd preview
```

Build includes TypeScript checks. On systems without the PowerShell script restriction, `pnpm` works too. See [ARCHITECTURE.md](docs/ARCHITECTURE.md#local-verification-and-hosting) for hosting requirements.

## Design and Content

Preserve the existing blue/yellow logo, real portrait, Manrope + Instrument Serif, and the selected palette. Keep hero text minimal and maintain the same graphics quality across modern PCs, tablets, and smartphones. Navigation and content remain usable without WebGL.

Generated demo copy, fictional case studies, and repeated existing imagery are authorized for the initial build. Clearly identify demo material and keep it replaceable; see [AGENTS.md](AGENTS.md#content-safety--accuracy).

## Documentation Responsibilities

| Document | Owns |
|---|---|
| [AGENTS.md](AGENTS.md) | Workflow, guardrails, content accuracy |
| [PROJECT.md](docs/PROJECT.md) | Positioning, audience, goals, scope |
| [EXPERIENCE.md](docs/EXPERIENCE.md) | Journey and interactions |
| [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Visual language and tokens |
| [MOTION.md](docs/MOTION.md) | Choreography and reduced motion |
| [THREE_D.md](docs/THREE_D.md) | Scene, quality, loading, fallback, lifecycle |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack, structure, data, dependencies |
| [COMPONENTS.md](docs/COMPONENTS.md) | Component responsibilities |
| [ROUTES.md](docs/ROUTES.md) | Route map |
| [CONVENTIONS.md](docs/CONVENTIONS.md) | Coding practices |
| [ASSETS.md](docs/ASSETS.md) | Asset inventory, sources, licenses |
| [PROGRESS.md](docs/PROGRESS.md) | Current milestones and pending work |

Keep docs brief and current. Describe the resulting experience and necessary rules; avoid change logs, minor tuning history, repeated details, and implementation mathematics.
