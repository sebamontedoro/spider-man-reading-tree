# Spider-Man Reading Tree

An interactive visual reading guide to Spider-Man's first three decades in print,
1962–1990. A chronological timeline of every issue he headlined, plus the guest
appearances that carry real story weight, with a focus graph showing how any
issue connects to what came before and after.

Vite + React, no backend. UI and content are in English.

## Running it

```bash
npm install
npm run dev            # http://localhost:5173
npm run build:data     # regenerate the dataset skeleton
npm run verify:wiki    # refresh dates and Marvel ids from the wiki (network)
npm run build          # build:data + production build
```

## The four data layers

The single most important thing to understand about this codebase:

| # | Layer | File | Hand-edited? |
|---|-------|------|--------------|
| 1 | Generated runs | `src/generated/issues.json` | **Never** |
| 2 | Verified cover dates | `data/cover-dates.json` | **Never** |
| 3 | Marvel issue ids | `data/marvel-unlimited.json` | **Never** |
| 4 | Corrections & notes | `data/overrides.js` | Yes |
| 5 | Guest appearances | `data/appearances.js` | Yes |
| 6 | Arcs & crossovers | `data/arcs.js` | Yes |

Layers 1–3 are machine-produced and disposable — 1 from `npm run build:data`,
2 and 3 from a single `npm run verify:wiki` crawl. **Editing either directly
loses your work on the next run.** Layers 3 to 5 are hand-curated and always
win. `src/lib/dataset.js` merges all five at load time.

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

### Verified dates override the estimates

`npm run verify:wiki` looks every issue up on Marvel Database and writes both
the real cover dates and Marvel's catalogue ids. Both come out of one crawl —
they live on the same page, and fetching twice would be gratuitous load on
someone else's wiki. The wiki API takes 50 page titles per request, so the whole dataset
costs about twenty calls.

**1106 of 1109 issues now carry a verified date.** The three that do not are
annuals the wiki dates by year alone; there we keep the generated month and
trust the year. Anything unresolved simply keeps its estimate and stays marked
with a leading `~` in the UI.

The anchors in `data/series.js` still matter — they are what the tree falls back
on for any issue the wiki cannot resolve, and they were worth getting right:
before verification, the anchored estimates were exact for 96% of Amazing
Spider-Man and 90% of Spectacular, but only 2% of Marvel Tales, where one issue
was off by five years.

Useful flags:

```bash
npm run verify:wiki -- --missing                   # only unverified issues
npm run verify:wiki -- --only=marvel-tales         # one series
```

If a series comes back entirely unresolved, its `wikiTitle` is wrong. Marvel
Database renames runs mid-stream — both `peter-parker-spectacular` and
`spectacular-spider-man-annual` need a per-segment `wikiTitle` for exactly this
reason.

## Deploying

### The live deployment

Running at **http://dell-server:8082**, deployed with:

```bash
./scripts/deploy.sh server@dell-server \
  --dir /home/server/docker-services/spider-man \
  --port 8082
```

Three things about that host are not the script's defaults and are worth
remembering: the SSH user is `server` (not the local username), services live
under `/home/server/docker-services/<name>/` by convention rather than in
`/opt`, and port 8080 is already taken by qbittorrent. The host also runs Caddy
as a reverse proxy on 80/443, routing `*.lan` names to `192.168.1.14:<port>`,
so this can be given a hostname by adding one block to its Caddyfile.

### The script

`scripts/deploy.sh user@host` deploys over SSH. The remote clones or updates the
repo, builds the image and runs docker compose; nothing is copied from the
developer machine, so what runs is exactly what is on the branch.

The script refuses to touch the deploy directory if it exists and is either not
a git checkout or a checkout of a different repository. That guard is
deliberate — do not remove it to make a deploy "just work".

The image is multi-stage: `node:22-alpine` builds, `nginx:alpine` serves. There
is no Node in the running container. `docker/nginx.conf` caches fingerprinted
assets for a year and explicitly refuses to cache `index.html`, without which a
deploy strands clients on stale bundles.

## Digital availability

`data/marvel-unlimited.json` maps issue ids to Marvel's own catalogue id, which
is what turns the Marvel link from a fuzzy site search into a direct one. Its
absence is information too, and the UI shows it: a quiet dot beside the date
means there is a digital edition, and the detail panel says so when there is
not.

706 of 1085 generated issues have one. That headline figure is misleading on
its own — it is dragged down by the 301 reprint and out-of-continuity issues,
none of which have a digital edition. Across the material actually worth
reading it is **700 of 793**, and Amazing Spider-Man is complete.

Do not read a missing id as "unavailable anywhere": it means Marvel has no
digital catalogue entry, not that no edition exists.

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
