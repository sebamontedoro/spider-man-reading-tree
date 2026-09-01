# Spider-Man Reading Tree

An interactive visual reading guide to Spider-Man's first three decades in print,
1962–1990. A chronological timeline of every issue he headlined, plus the guest
appearances that carry real story weight, with a focus graph showing how any
issue connects to what came before and after.

Vite + React. The site itself is static; a small companion service serves
pages out of local .cbz/.cbr files when there is a shelf to read from, and the
site works without it. UI and content are in English.

## Running it

```bash
npm install
npm run dev            # http://localhost:5173
npm run build:data     # regenerate the dataset skeleton
npm run verify:wiki    # refresh dates and Marvel ids from the wiki (network)
npm run build          # build:data + production build
```

## The data layers

The single most important thing to understand about this codebase:

| # | Layer | File | Hand-edited? |
|---|-------|------|--------------|
| 1 | Generated runs | `src/generated/issues.json` | **Never** |
| 2 | Verified cover dates | `data/cover-dates.json` | **Never** |
| 3 | Marvel issue ids | `data/marvel-unlimited.json` | **Never** |
| 4 | Corrections & notes | `data/overrides.js` | Yes |
| 5 | Guest appearances | `data/appearances.js` | Yes |
| 6 | Arcs & crossovers | `data/arcs.js` | Yes |
| 7 | Comic shelf folders | `data/library.js` | Yes |

Layers 1–3 are machine-produced and disposable — 1 from `npm run build:data`,
2 and 3 from a single `npm run verify:wiki` crawl. **Editing either directly
loses your work on the next run.** Layers 4 to 7 are hand-curated and always
win. `src/lib/dataset.js` merges 1–6 at load time; layer 7 is read by the comic
reader instead, and is the only one that describes files rather than issues.

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

### Numbers that are not steps in the run

A segment is a contiguous range of whole numbers. That is the right model for a
monthly book and no model at all for the two things Marvel does to one, so a
series may also carry `extras` — single issues listed outright:

- **`#-1`.** For one month in 1997 every title shipped one, slotted between two
  ordinary issues and set before its own first.
- **Point-one issues.** `#654.1` sits between #654 and #655, not after it.
  Numeric sort puts them in the right place for free.

Both default to `relevance: 'notable'`: they are worth reading and are not the
spine of the run.

`#700.1`–`#700.5` all carry a February 2014 cover date. That is right — they
shipped across three weeks of December 2013 as one run-on — so five issues
sharing a month is not a fault to go fixing.

### When the number does not derive the page at all

A segment may also carry `wikiPages`, a map from issue number to the page's
full title, for the issues where no `wikiTitle` would produce it. That is not a
hypothetical: Marvel stopped numbering the Spider-Man annuals in 1996 and the
wiki files them by year, so annual **#31 lives at
`Amazing Spider-Man Annual Vol 1 1998`** and there is no `Vol 1 31` page to
find. The 2008 revival then restarts at `Vol 2 1` before jumping to the legacy
number from `Vol 2 36` on.

The only thing tying the two numberings together is the wiki's own
**`LegacyNumber`** field on each issue page. Read that rather than inferring a
sequence — #29 and #30 have redirects from their legacy numbers, but #31–#34
do not, so a run of redirects tells you nothing about the rest. `wikiPage`
flows through the generator to both `verify:wiki` and the outbound link, so an
issue named this way is verified and linked like any other.

## The comic reader

Issues with a local file behind them can be read in the page. `data/` still
holds no artwork and no file paths — the shelf is discovered at runtime.

### Why there is a service at all

A third of the shelf is `.cbr`, which is RAR, and the archives run 30–50 MB
each. Unpacking those in the browser means shipping a WASM extractor and
downloading a whole archive to show its first page. `reader/server.mjs` opens
one page instead, in about 15 ms, and works the same for both containers.

It has **no npm dependencies** — Node builtins plus `bsdtar` — which is worth
keeping. Two details earn their place:

- **`.cbz` is read in process.** `reader/lib/zip.mjs` is a small
  random-access zip reader: central directory, then a seek straight to the one
  entry wanted. Verified against all 445 zip archives on the shelf.
- **`.cbr` is unpacked once, whole,** into a disposable page cache, then served
  from disk (0.5 s cold, 3 ms after). `bsdtar` and not `7z`: Debian and Alpine
  both ship p7zip *without* the RAR decoder, because its licence is not free,
  and it fails every entry with "Unsupported Method" after listing the archive
  quite happily.

The cache is a named volume, and it has to be one. Bind-mounting a host
directory gives root ownership to a container that runs as `node`, and every
`.cbr` then fails one request at a time; the service warns about that at
startup rather than letting it be discovered a page at a time.

### The service knows nothing about issues

`/api/library` returns, per archive, the issue ids it *could* be — in priority
order — and the browser picks the first that names a real issue, because the
browser is where the dataset lives. So extending the tree needs no redeploy of
the service, and adding comics needs no rebuild of the site.

`data/library.js` maps a folder to the series keys its files may belong to.
Order is priority, which is what lets one folder hold two series: the 1963
directory contains both #1–441 and the post-renumbering #500–700, and only the
second lot are vol. 2. Anything in an unmapped folder falls back to matching on
the series name parsed out of the filename, against a table derived from
`data/series.js` — so a folder of Web of Spider-Man would resolve with no
configuration at all.

**All 748 files on the shelf match an issue.**

One of them only because it is aliased. `Amazing Spider-Man 000 (1997)` is the
Flashback issue **#-1** — the scene release is named `-001` and whoever
organised the folder renamed it; same inode, same release tag, and there is no
Amazing Spider-Man #0 for it to be. A folder in `data/library.js` can pin a
parsed number to specific issue ids for exactly this, which beats renaming
someone's files.

Filenames are parsed by reading only up to the first bracket. Sixty-one files
on the shelf have an unclosed one and five carry a bare `c2c` after the last
group, and stripping balanced groups instead loses the issue number in all of
them.

### Reading position

`src/lib/progress.js` keeps the last page per issue in localStorage — per
browser, never leaving the machine. Read/unread on the cards and the two shelf
filters are derived from it rather than stored separately.

## Deploying

### The live deployment

Running at **http://dell-server:8082**, deployed with:

```bash
./scripts/deploy.sh server@dell-server \
  --dir /home/server/docker-services/spider-man \
  --port 8082
```

The shelf defaults to `/mnt/hdd/media/books/comics` on that host — 748
archives, hardlinked to the torrent directory, so it costs no extra disk. Point
it elsewhere with `--comics <path>`, or pass `--comics ""` to deploy the site
without the reader. A missing directory is not an error: the script says so and
deploys the site alone.

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

Read/unread tracking was explicitly left out of the first pass. What exists now
is only what the reader could not do without — a resume position per issue, in
localStorage — and everything on top of it is derived from that.

The reader is one page at a time: no two-page spreads, and no downscaling for
phones. Pages are served at their scan resolution (often 2175×3075, ~1.4 MB)
because zoom needs it, which is fine on a LAN and would not be over the
internet.
