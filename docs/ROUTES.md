# ROUTES.md

## Purpose

Map the confirmed initial pages and the deferred contact page. Dummy content is authorized; lack of finished personal/project material must not cause included sections to be omitted.

| Route | Purpose | Planning status |
|---|---|---|
| `/` | Complete homepage journey in [EXPERIENCE.md](EXPERIENCE.md), including the contact finale. | Included initially |
| `/about` | Two sections: personal profile with real portrait, name, location and disciplines; connected skills constellation. | Phase 10 implemented; validation pending |
| `/work` | Project index populated with dummy projects initially. | Included initially |
| `/photography` | Image-led gallery using `anku.webp` as the initial repeatable image. | Included initially |
| `/lab` | Experiments and creative exploration, with demo entries allowed. | Included initially |
| `/contact` | Separate contact page in a later iteration. | Required later; deferred |
| `*` | Not-found handling, including unknown project slugs. | Included with routing |

## Navigation Notes

The menu and homepage should link directly to meaningful destinations; projects may open without visiting the index first. Initially, Contact targets the homepage contact section. Point it to `/contact` once that later page exists.

Build included routes in their owning phases; do not add placeholder pages to the current phased build. [ARCHITECTURE.md](ARCHITECTURE.md) owns routing integration; [CONVENTIONS.md](CONVENTIONS.md) owns navigation code rules.

## Current implementation

The homepage renders Hero/Introduction, Selected Work, About, Capabilities, Photography, and Contact, followed by the night footer. Phases 2 through 9 are complete by user direction; technical validation and contact delivery remain pending. Homepage anchors include `/#introduction`, `/#selected-work`, `/#about`, `/#photography`, and `/#contact`. Phase 10 adds `/about`, reachable through the menu and homepage About link. Phase 11 onward remain deferred; other unbuilt destinations use NotFound. Route focus, scroll restoration, and error boundaries remain.

## Menu destinations

The menu retains Home, Work, About, Photography, Lab, and Contact. Contact targets `/#contact` until the standalone page is built. Normal links dismiss the menu; modified clicks retain native behavior. The logo returns to `/`. Selected Work links to `/work`, which remains deferred.
