# ROUTES.md

## Purpose

Map the confirmed portfolio pages. Dummy content is authorized; lack of finished personal/project material must not cause included sections to be omitted.

| Route | Purpose | Planning status |
|---|---|---|
| `/` | Complete homepage journey in [EXPERIENCE.md](EXPERIENCE.md), including the contact finale. | Included initially |
| `/about` | Two sections: personal profile with real portrait, name, location and disciplines; connected skills constellation. | Phase 10 complete by user direction; technical validation pending |
| `/work` | Homepage work layout and data, with cards stacking during scroll. | Phase 11 complete by user direction; technical validation pending |
| `/photography` | All 140 supplied photos in a large responsive masonry layout, preserving source aspect ratios, with fullscreen previews. | Phase 12 complete by user direction; technical validation pending |
| `/lab` | Flowpaper fluid wallpaper studio with PNG capture/download. | Implemented; lazy-loaded; validation pending |
| `/contact` | Shared homepage form followed by social profile links. | Phase 14 implemented; active, validation pending |
| `*` | Not-found handling, including unknown project slugs. | Included with routing |

## Navigation Notes

The menu and homepage should link directly to meaningful destinations; projects may open without visiting the index first. Contact targets `/contact`; the homepage contact section remains available at `/#contact`.

Build included routes in their owning phases; do not add placeholder pages to the current phased build. [ARCHITECTURE.md](ARCHITECTURE.md) owns routing integration; [CONVENTIONS.md](CONVENTIONS.md) owns navigation code rules.

## Current implementation

The homepage renders Hero/Introduction, Selected Work, About, Lab teaser, Capabilities, Photography, and Contact, followed by the night footer. Phases 2 through 12 are complete by user direction; technical validation and contact delivery remain pending. Homepage anchors include `/#introduction`, `/#selected-work`, `/#about`, `/#lab`, `/#photography`, and `/#contact`. `/about`, `/work`, and `/photography` are reachable through the menu and corresponding homepage links. The Lab menu and homepage experiment card open Flowpaper directly at `/lab`. Studio return links target `/#lab`. Phase 14 Contact is implemented. Other experiments and Phase 15 onward remain deferred; unbuilt destinations use NotFound. Route focus, scroll restoration, and error boundaries remain.

## Menu destinations

The menu retains Home, Work, About, Photography, Lab, and Contact. Contact targets `/contact`. Normal links dismiss the menu; modified clicks retain native behavior. The logo returns to `/`. Selected Work links to the implemented `/work` page.
