# Spider-Man Reading Tree

An interactive visual reading guide to Spider-Man's first three decades in print,
1962–1990. A chronological timeline of every issue he headlined, plus the guest
appearances that carry real story weight, with a focus graph showing how any
issue connects to what came before and after.

Vite + React, no backend. UI and content are in English.

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
npm run build:data   # regenerate the dataset
npm run build        # build:data + production build
```

## The four data layers

The single most important thing to understand about this codebase:

| # | Layer | File | Hand-edited? |
|---|-------|------|--------------|
| 1 | Generated runs | `src/generated/issues.json` | **Never** |
| 2 | Corrections & notes | `data/overrides.js` | Yes |
| 3 | Guest appearances | `data/appearances.js` | Yes |
| 4 | Arcs & crossovers | `data/arcs.js` | Yes |

`src/generated/issues.json` is disposable output, rebuilt from scratch by
`scripts/build-dataset.mjs` on every `npm run build:data`. **Editing it directly
loses your work on the next build.** Everything curated lives in `data/` and is
merged over the generated layer at runtime by `src/lib/dataset.js`.

To correct one issue — a wrong date, a missing first appearance, a note — add it
to `data/overrides.js` keyed by its id. Ids are `<series-key>-<number>`, e.g.
`amazing-spider-man-31`.

## How cover dates work

`data/series.js` defines each run as segments between *anchor* dates rather than
as a cadence to accumulate. The generator spreads issues evenly between two
anchors.

This is not incidental. The Amazing Spider-Man went semi-monthly in 1988, so a
naive "+1 month per issue" model lands its 1990 issues eight months late. Marvel
Team-Up started bimonthly and drifted three months by #75. Anchors fix both.

Anchor dates carrying `startExact` / `endExact` were checked against Marvel
Database. Issues generated *between* anchors are estimates, ship with
`dateExact: false`, and the UI marks them with a leading `~`. Spot checks against
real data currently land most interpolated dates exactly on the month.

To improve accuracy anywhere, add another anchor segment — it costs one lookup
and immediately tightens every issue around it.

## Scope

Included: every issue of the titles Spider-Man headlines (Amazing Fantasy #15,
Amazing Spider-Man, Peter Parker/Spectacular, Marvel Team-Up, Web of Spider-Man,
their annuals), plus curated guest appearances with narrative weight.

`relevance: 'optional'` covers reprints (Marvel Tales) and out-of-continuity
material (Spidey Super Stories). Hidden by default — it triples the node count
without adding a story.

Deliberately excluded: single-panel cameos, and anything after 1990.

## Covers and copyright

This project stores publication metadata and its own notes, nothing else. No
cover images are hosted or hot-linked. Each issue links out to Marvel Database,
League of Comic Geeks, Marvel.com and Comic Vine, where the artwork lives.

Only Marvel Database gets a direct URL — its page titles are exactly
`<Series Title> Vol N <number>`, which is why every series carries a `wikiTitle`,
and why a renamed run needs a per-segment `wikiTitle` (see
`peter-parker-spectacular`, which becomes `Spectacular Spider-Man Vol 1` at
#134). The other three key their URLs on internal numeric ids, so they get site
search URLs instead.

Notes in `data/` are original one-line framings. Do not paste synopses from other
sources into them.

## Layout notes

- `src/lib/graph.js` lays the focus graph out by hop distance in fixed columns
  rather than running a force simulation. The subgraph is 5–15 nodes; a graph
  library would cost more than it saves.
- `YearBand` mounts its cards only when near the viewport. All ~1100 at once is
  survivable but makes filtering sluggish.
- Halftone texture is restricted to backgrounds and year headers, never behind
  dense text.
- Fonts are referenced by family name — SF Pro is installed system-wide at
  `~/.local/share/fonts/SF-Pro/`. Nothing is bundled; the full set is 137 MB. If
  this is ever published, subset the variable `SF-Pro.ttf` (21 MB) and add real
  `@font-face` rules to `src/styles/global.css`.

## Not built (yet)

Read/unread tracking was explicitly left out of the first pass.
