# Anku Singh — Personal Portfolio

An interactive creative-technologist portfolio built around **Technology × Nature × Human Experience**: selective cinematic 3D with accessible editorial content.

## Current Status

Phases 2 and 3 are complete by user direction. Phase 4 adds sticky selected-work cards with still images and Coming soon data. Phase 3 source adds a text-free landscape opening, a native-scroll camera approach to the house, and Anku's introduction over the same scene. The two-circle header, ocean, mountains, clouds, and boat remain. Phase 5 onward and unbuilt routes stay deferred; current validation is pending.

See [PROGRESS.md](docs/PROGRESS.md) for phase status and [AGENTS.md](AGENTS.md) before contributing.

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
