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


## Dynamic competency résumé

A conventional résumé now sits directly below the map. It reuses Jobs, their dates/roles, and accomplishments nested in existing Job/Project Markdown files. The graph has the same subjects as before; competencies and accomplishments are not graph nodes. Original body text and relationships remain unchanged. New example evidence is explicitly fictional and is limited to the existing fictional collection; real career content has not been imported.

`src/components/DynamicResume.astro` renders the complete curated chronological résumé at build time. It works without JavaScript. Contacts and Education have explicit pending placeholders because no approved résumé details have been supplied. Put the single fixed introduction, approved contact entries, and education into `src/data/site.ts` under `resume`. No alternate introductions are generated.

`src/data/competencies.ts` defines the provisional vocabulary: Operations, Process Improvement, Experience Design, Communication, Strategic Planning. Competency IDs are used in Markdown. Marketing and Business Development are intentionally absent because the current fictional fixtures do not demonstrate them. Add categories when there is supporting content, updating the ID tuple alongside the labels.

```yaml
competencies: [operations, process-improvement]
accomplishments:
  - id: documented-handoff
    text: "An approved, factual résumé statement."
    competencies: [operations, process-improvement]
    default: true
    priority: 80
    supporting: an-existing-project
```

Accomplishment IDs are local to their parent file; the stable global ID is parent-id:accomplishment-id. Text is canonical. Parent references are implicit, not duplicated. `default` defaults to false, `priority` defaults to zero (higher ranks earlier), and `supporting` is optional. Duplicate local IDs, unknown supporting references, and accomplishments attached to Ideas fail validation. A supporting draft is not linked from the visible résumé; its parent page is used instead.

`src/lib/resume-data.ts` resolves Job context for Project evidence via existing part-of relationships. Project evidence is displayed once, under its first context in reverse-chronological Job order. In relevance mode, all associated employers, roles, and dates are retained. Independent Project evidence retains its project context. Dated Jobs are reverse-chronological; undated Jobs follow deterministically by ID/title. Jobs without accomplishments retain their existing summary rather than receiving invented bullets.

Competency buttons are multi-select toggles with OR matching. No selected competency means the curated defaults, not every available accomplishment. With filters active, matching defaults remain, matching supplemental items appear, and unrelated defaults remain but are de-emphasized. Relevance score is the number of distinct selected tags matched. Ties use editorial priority, chronological context, then stable ID. The chronological view always retains all Jobs and only reorders evidence inside each Job. The relevance view ranks the same evidence across Jobs, with context preserved. Switching modes retains the active tags. Clearing competencies retains the selected mode; the map's Reset restores the full default state including chronological résumé mode.

The map's existing category filter, Only related control, animation, and timeline selection are unchanged. Competency matching adds a separate opacity treatment to unrelated nodes/edges. It uses a node's own competencies plus those of its attached accomplishments. It does not infer tags by traversing the graph. Clicking a map node never activates a competency or rewrites the résumé. The selected map node remains readable even when it is not a competency match, so navigation remains independent. The timeline is not filtered by competency.

Core logic: `src/lib/resume-model.ts`; UI state: `src/scripts/dynamic-resume.ts`. `competencies:change` shares competency state with the existing network; no map-node selection state is shared with the résumé. All professional wording is pre-rendered from content. Client code only changes visibility, emphasis, ordering, and UI status messages.

## Richer optional frontmatter

See [CONTENT-REFERENCE.md](CONTENT-REFERENCE.md) for all fields, defaults, and nested evidence/connection rules. Start with the commented Job, Project, or Idea template in `templates/`. Only `title`, `kind`, and `summary` are required; `draft` still defaults to true. New descriptors are stored without creating visible sections.
