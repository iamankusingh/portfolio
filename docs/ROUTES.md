# ROUTES.md

## Purpose

Map the confirmed initial pages and the deferred contact page. Dummy content is authorized; lack of finished personal/project material must not cause included sections to be omitted.

| Route | Purpose | Planning status |
|---|---|---|
| `/` | Complete homepage journey in [EXPERIENCE.md](EXPERIENCE.md), including the contact finale. | Included initially |
| `/about` | Personal story, portrait, philosophy, and capabilities; generated demo copy permitted. | Included initially |
| `/work` | Project index populated with dummy projects initially. | Included initially |
| `/photography` | Image-led gallery using `anku.avif` as the initial repeatable image. | Included initially |
| `/lab` | Experiments and creative exploration, with demo entries allowed. | Included initially |
| `/contact` | Separate contact page in a later iteration. | Required later; deferred |
| `*` | Not-found handling, including unknown project slugs. | Included with routing |

## Navigation Notes

The menu and homepage should link directly to meaningful destinations; projects may open without visiting the index first. Initially, Contact targets the homepage contact section. Point it to `/contact` once that later page exists.

Build included routes in their owning phases; do not add placeholder pages to the current phased build. [ARCHITECTURE.md](ARCHITECTURE.md) owns routing integration; [CONVENTIONS.md](CONVENTIONS.md) owns navigation code rules.

## Current implementation

`/` renders the persistent header/navigation, completed Phase 2 landscape, Phase 3 introduction, and Phase 4 selected work inside the semantic main region. `/#selected-work` targets the work section. `/#introduction` targets the introduction and supports keyboard skipping. Phase 5 onward and unbuilt pages remain deferred. Routing, NotFound, error boundaries, fonts, design tokens, focus handling, and scroll restoration remain. Unbuilt destinations currently use NotFound.

## Menu destinations

Phase 4 “View all work” links target `/work`; the index remains deferred to Phase 10 and currently uses NotFound. Project detail navigation is deferred to Phase 5.

The menu retains Home, Work, About, Photography, Lab, and Contact. Contact temporarily targets `/contact` (not found) because the homepage contact placeholder was removed. When the real homepage finale is implemented, use `/#contact` until the standalone page is built. Normal links dismiss the menu; modified clicks retain native behavior. The logo returns to `/`.
