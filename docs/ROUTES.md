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

The homepage renders Hero/Introduction, Selected Work, About, Capabilities, Photography, and Contact. Phases 2 through 7 are complete by user direction; Phase 8 contact UI is implemented with delivery and validation pending. Homepage anchors include `/#introduction`, `/#selected-work`, `/#about`, `/#photography`, and `/#contact`. Phase 9 onward and standalone pages remain deferred; unbuilt destinations use NotFound. Route focus, scroll restoration, and error boundaries remain.

## Menu destinations

The menu retains Home, Work, About, Photography, Lab, and Contact. Contact targets `/#contact` until the standalone page is built. Normal links dismiss the menu; modified clicks retain native behavior. The logo returns to `/`. Selected Work links to `/work`, which remains deferred.
