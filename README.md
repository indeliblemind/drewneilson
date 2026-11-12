# drewneilson.com

Local Astro portfolio, migrated from the V3 prototype. Nothing is deployed.

## Start the site

Open Terminal in this folder, then run:

```sh
npm run dev
```

Open the local address Astro prints (usually http://localhost:4321). Keep Terminal running; Control-C stops the site. Dependencies are already installed on this Mac. On another machine, run `npm ci` first.

## Edit the content

- `src/content/pieces/*.md`: jobs, stories, and thought experiments. Edit the prose below the second `---`.
- `src/data/relationships.json`: connections, each with `source`, `target`, `type` (`context` or `related`), and `label` explaining why the connection matters. IDs are Markdown filenames without `.md`. Write a relationship once; it appears in both directions.
- `src/components/`: Hero, PieceCard, RelationshipMap, Digression, About, Footer.
- `src/layouts/Base.astro`: navigation and shared page metadata.
- `src/styles/global.css`: V3 palette, type, layout, and responsive styles.
- `reference/drewneilson-homepage-v3.html`: unchanged original prototype.
- `public/`: images and files served as-is.

Piece fields: `title` (story headline), optional `label` (short map name), `kind` (`job`, `story`, `thought-experiment`), `summary`, `status` (preserve authorship and development stage), `layout` (`featured`, `story`, `fragment`, `context`), `order`, `draft`. New pieces default to drafts. Set `draft: false` to include them in this local build. Drafts are omitted from pages, navigation, and map connections. Keep filenames stable once published.

For a new piece, copy an existing Markdown file, change its fields, and add relationships using its filename. Unknown endpoints, duplicate relationships, and self-links fail the build with a useful error. Earlier setup examples and the four thematic lenses are preserved under `reference/earlier-content/`. They are not map nodes.

## Explore the map

The map distinguishes jobs (larger dark circles), stories (green), and thought experiments (rust). Faint job-to-story lines establish context. Other relationships appear only when a node is selected, alongside an item profile. The four broad themes are no longer map nodes.

Select a node or a related item to explore; “Read the piece” opens its page. Escape or the profile close button clears selection. Drag the background to pan, use +/− to zoom, and Fit to restore the view. Map nodes support Tab, Enter, and Space. The List view offers the same items grouped by type and is the default on phones. Without JavaScript, the directory links still open ordinary pages.

`positions` in `src/components/RelationshipMap.astro` holds the current editorial placement of nodes. Add coordinates there when adding a piece. This is a stable, manually arranged canvas, not a force simulation or an embedded Kumu map.

## Verify changes

```sh
npm run check
npm run build
```

Build output is `dist/`. The site uses static pages, with browser JavaScript only for map selection. Dependency versions are recorded in `package-lock.json`; use `npm ci` for repeatable installation.

## Before publishing

Review the imported professional claims, metrics, education, authorship, and development statuses against original notes. Contact links were withheld because V3 marked the email as a placeholder. The site includes `noindex, nofollow` while it is a working draft; remove that deliberately when ready. This is not access protection. No Cloudflare or hosting account has been changed. Configure Cloudflare after the design and content are reviewed.
