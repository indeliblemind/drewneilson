# drewneilson.com — V2 interaction, existing example content

The homepage now follows the supplied Version 2 HTML prototype: modernist typography, fixed career chronology, animated network, and contextual detail panel. It still uses the existing fictional examples and user-created test pieces. No career nodes, accomplishments, or relationships from the reference have been imported.

## Open locally

Run `npm run dev` from this folder and open the printed local address. Keep Terminal running; Control-C stops it. Run `npm ci` first on another machine.

## Authoring remains one file per subject

Content is in `src/content/pieces/*.md`. Use `templates/node.md` as the commented starter. Types remain `job`, `project`, and `idea`. Required fields are title, kind, and summary. Write the body below the information block. Missing `draft` defaults to true. Set `draft: false` to include a piece locally. This does not publish it online.

Connections remain in the source piece's `connections` array: `to`, `relation` (part-of, led-to, informed, related), and optional `note`. The site generates reverse wording and preserves the direction and meaning. The map draws connections without arrows to preserve the supplied prototype's interaction, while detail panels and individual pages explain the relationship. No separate relationship file or map coordinates need editing.

## Chronology

Only Jobs with usable dates get proportional bars. Jobs without dates remain in a separate selectable row. The timeline never reorders or collapses when the map changes. Overlapping ranges occupy separate lanes; non-overlapping roles can reuse a lane.

Optional `startDate` and `endDate` accept YYYY-MM or YYYY. An omitted endDate means present when startDate is provided. Ending months/years are inclusive; layout uses exclusive end boundaries internally. Invalid ranges fail the build. Current-month resolution happens when the site builds.

The two existing `period` strings marked `(example)` are recognized as year-only fictional ranges. Their precision is preserved: no exact months are claimed. Other free-text period labels are not guessed into dates. No real career dates are introduced here.

## Interaction

- Select a timeline bar, an undated Job, or a map node to select the same subject everywhere.
- The network animates the selection to the center, connected subjects closer, and other subjects farther away and faded. It settles after a bounded animation.
- The timeline retains its positions, widths, overlaps, and gaps. Related Jobs are highlighted, including Jobs reached through a directly connected Project.
- All / Jobs / Projects / Ideas filter the map by category. The selected subject remains visible as in V2.
- Only related hides unrelated nodes; without a selection it shows the current category.
- Use the panel's connection buttons to continue exploring; Read the full page opens the existing content page.
- Reset restores the overview, All, and Only related off. Escape clears selection without changing category controls.
- Keyboard: Tab to controls/nodes, Enter or Space to select.
- On phones the chronology and diagram can scroll horizontally, and the panel moves below the diagram. Browse all subjects is a touch-friendly alternative to small labels.
- Reduced-motion preference skips movement and places subjects at their destinations immediately.

## Implementation

- `src/pages/index.astro`: adapts the current collection and renders the fixed timeline and controls.
- `src/scripts/connected-work.ts`: shared selection, synchronized highlighting, safe detail rendering, and the reference's spring/damping animation. The initial targets use Job relationships rather than the reference's index spiral. Label boxes are spread before animation.
- `src/styles/connected-work.css`: the reference CSS, followed by narrowly scoped integration refinements. No extra visualization dependency.
- `src/lib/chronology.ts`: calendar-month ranges and compact overlap lanes.
- `src/lib/content.ts` and `src/lib/relations.ts`: collection loading, validation, and relationship semantics.
- `src/layouts/ConnectedWork.astro`: isolated V2 layout, also used by individual pages.

## Preserved material

`reference/interaction-v2/original.html` and `handoff.md` are unchanged reference inputs. `reference/before-v2-integration/` preserves the previous homepage, layout, map component, and stylesheet as text. Other earlier components remain available in source. `reference/personal-content/` retains the previous personal material; the active examples have not been replaced or silently reclassified.

## Verify and deploy

Run `npm test`, `npm run check`, and `npm run build`. Output is `dist/`. Cloudflare and the private GitHub repository have not been changed by this local work. Nothing is published or pushed automatically.
