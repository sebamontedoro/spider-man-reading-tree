# Reading Trees

Interactive visual reading guides to Marvel characters in print, one tree per
character in one app: every issue of every title the character headlines, the
guest appearances that carry real story weight, and a focus graph showing how
any issue connects to what came before and after.

**Spider-Man** (1962–2026) is complete. **Daredevil** (1964–2026) has its runs,
verified, and nothing curated yet — see
[Characters](#characters). In the Spider-Man tree, three continuities — the
main line, the 2000 Ultimate line and the 2024 one — render as separate lines
rather than one mixed run.

Vite + React. The site itself is static; a small companion service serves
pages out of local .cbz/.cbr files when there is a shelf to read from, and the
site works without it. UI and content are in English. Code comments are English
in the older files and Spanish in the newer ones — match the file you are in.

**Spider-Man, as of 2026-09-07: complete.** 2556 issues (2410 generated + 146
guest appearances), and every one of them has a file on the shelf. Do not copy counts
like these into new prose: `STATS` in `src/lib/dataset.js` computes them, and
hardcoded figures are what made the previous version of this file wrong.

## Running it

```bash
npm install
npm run dev            # http://localhost:5173
npm run dev:reader     # the reader service over ./comics, on :8787
npm run build:data     # regenerate the dataset skeleton
npm run verify:wiki    # refresh dates and Marvel ids from the wiki (network)
npm run build          # build:data + production build
```

The dev server proxies `/api` to the reader, so `dev` and `dev:reader` side by
side give you both. `READER_ORIGIN=https://comics.lan npm run dev` points it at
the deployed one instead. Open `/spider-man/` or `/daredevil/`; `/` goes to the
default tree.

On the live host the checkout has **no `node_modules`**: the build runs inside
Docker. `scripts/build-dataset.mjs` still runs with a bare `node`, since it only
imports each tree's `series.js`.

## The data layers

The single most important thing to understand about this codebase.

Per tree, `<char>` being `spider-man`, `daredevil`…:

| Layer | File | Hand-edited? | Read by |
|-------|------|--------------|---------|
| Generated runs | `src/generated/<char>.json` | **Never** | site |
| Series definitions | `data/<char>/series.js` | Yes | generator, site, **reader** |
| Corrections & notes | `data/<char>/overrides.js` | Yes | site |
| Guest appearances | `data/<char>/appearances.js` | Yes | site |
| Arcs & crossovers | `data/<char>/arcs.js` | Yes | site |
| Milestones | `data/<char>/milestones.js` | Yes | site |
| Reading paths | `data/<char>/paths.js` | Yes | site |
| Arc colours | `data/<char>/arc-palette.js` | Yes | site |

Shared by every tree:

| Layer | File | Hand-edited? | Read by |
|-------|------|--------------|---------|
| Verified cover dates | `data/cover-dates.json` | **Never** | site |
| Marvel issue ids | `data/marvel-unlimited.json` | **Never** | site |
| The trees there are | `data/characters.js` | Yes | everything |
| Milestone types | `data/milestone-types.js` | Yes | site |
| Shelf folders | `data/library.js` | Yes | **reader** |
| Collected editions | `data/collections.js` | Yes | **reader** |

`data/<char>/index.js` gathers a tree's layers into the one module the site
loads. The shared ones are all keyed by issue id or by folder, which is what
lets them be shared — see [Characters](#characters).

Three are machine-produced and disposable — the generated runs from
`npm run build:data`, dates and Marvel ids from a single `npm run verify:wiki`
crawl over every tree.
**Editing any of them directly loses your work on the next run.** Everything
hand-edited always wins. `src/lib/dataset.js` merges the site's layers once, at
module load.

The file headers number these layers ("a seventh…", "a ninth…") and the
numbers do not agree with each other. Ignore them; the table above is current.

To correct one issue — a wrong date, a missing first appearance, a note — add it
to that tree's `overrides.js` keyed by its id. Ids are `<series-key>-<number>`,
e.g. `amazing-spider-man-31`.

## Characters

One app, one shelf, one reader; a tree per character, listed in
`data/characters.js`. The tree is the first segment of the path —
`comics.lan/spider-man/`, `comics.lan/daredevil/` — and changing it is a page
load.

**Issue ids are global.** Daredevil #16 is a guest appearance in the Spider-Man
tree and a lead issue in the Daredevil one, and both call it `daredevil-16`:
one file on the shelf, one reading position, one verified date. So a series
key means the same run in every tree. Before adding a series, check that its
key is not already in use as a guest id in another tree — and if it is, use
that one: the Spider-Man guests already fix `daredevil-N` as Daredevil vol. 1
and `devils-reign-N` as the 2021 event.

**Never import a tree's data statically.** Everything that builds from a tree
does it once, at module load, from `ACTIVE.data` in `src/lib/character.js`.
`main.jsx` calls `boot()` — which settles the character and loads its chunk —
and only then imports the app. A module that imports `data/<char>/…` directly
is pinned to that character and breaks the others silently. Shared layers
(`cover-dates.json`, `milestone-types.js`) are imported directly as before.

**Browser storage is shared across trees**, for the same reason ids are:
positions and skin live under `STORAGE` in `character.js`. The `spider-man:`
prefix on those keys is historical — renaming it loses what is stored.

**Old hostnames carry storage over.** A character's `legacyHosts`
(`spiderman.lan`) still serve the app, which packs localStorage into the URL
and moves to `comics.lan` — a plain redirect would drop every reading position,
since storage is per origin. On arrival it merges per issue, the newer position
winning. Caddy must keep proxying a legacy host, not redirect it.

To add a character: a folder in `data/` with the same files as
`data/spider-man/` plus an `index.js`, an entry in `characters.js`, then
`npm run build:data` and `npm run verify:wiki -- --only=<its series>` — and
the post-crawl checks under [Verified dates](#verified-dates-override-the-estimates).
Its shelf folders go in the shared `library.js`, its era colours in
`tokens.css` as `--s-<accent>` (light and both dark blocks), and its two skins
in `tokens.css` under `[data-character="<key>"]`.

### Daredevil

Started 2026-09-11: 851 generated issues across 57 series, every one verified
against the wiki on the first crawl. The curated layers — arcs, milestones,
paths, guests, notes — are empty, and nothing of his own is on the shelf yet
beyond what the Spider-Man tree already brought (Devil's Reign #1-6 and four
Epic Collections). The header of `data/daredevil/series.js` lists what is in,
what is optional and why, and what was left out.

Numbering that will bite:

- **Annual "#4B".** Marvel printed two Annual #4s (1976, 1989). The tree calls
  the second #5 and names its page (`Daredevil Annual Vol 1 4B`). Its file will
  parse to 4: alias it in `library.js`, or it claims the 1976 issue.
- **Vol. 4 #1.50** is id `daredevil-v4-1.5`; the page keeps the printed name.
- **Vol. 9 is ongoing.** Its segment lists what is on sale, not what is
  solicited; extend `to` as issues come out.
- **Devil's Trigger #3 and #4** share a Marvel id on the wiki; #4's is dropped
  in `overrides.js` until the wiki is fixed.
- The Shadowland and Devil's Reign **tie-ins are not in**: they are other
  characters' books, for `appearances.js` if he carries weight in them.

### What is derived rather than stored

Two fields drifted badly while they were set by hand — both were written
carefully for the first three decades and thinly after — so `dataset.js` now
derives them from the milestones:

- **`firstAppearances`** is filled from every `debut` milestone that carries a
  `character`. The milestone's `label` is written to read in a timeline row and
  does **not** index anything; `character` does, and takes a list when one
  arrival introduces two.
- **`keyIssue`** is set on any issue with a `status-quo` or `universe`
  milestone. A hand-set flag in `overrides.js` still wins. The Essentials path
  and the Key issues filter both read it.

### Reading paths

`data/paths.js` builds each path from any combination of a `match` predicate,
arc keys (expanded to those arcs' issues) and explicit ids, then sorts by cover
date. A `match` runs over the merged dataset, so it can use derived fields.

## How cover dates work

Each tree's `series.js` defines each run as segments between *anchor* dates
rather than as a cadence to accumulate. The generator spreads issues evenly
between two anchors.

This is not incidental. The Amazing Spider-Man went semi-monthly in 1988, so a
naive "+1 month per issue" model lands its 1990 issues eight months late. Marvel
Team-Up started bimonthly and drifted three months by #75. Anchors fix both.

### Verified dates override the estimates

`npm run verify:wiki` looks every issue up on Marvel Database and writes both
the real cover dates and Marvel's catalogue ids. Both come out of one crawl —
they live on the same page, and fetching twice would be gratuitous load on
someone else's wiki. The API takes 50 page titles per request; keep the delay
between batches. Anything unresolved keeps its estimate and shows a leading `~`
in the UI.

Every date in the tree is now verified. The last two were Amazing Spider-Man
Annual #10 and #13, which carry only a year on the cover — the wiki's `Month`
is empty because there is no month to find. An annual is displayed by its year
alone, so `overrides.js` marks them exact and gives each a month purely for
placement, taken from the on-sale date and the sibling annuals. A year-only
annual turning up as "estimated" means exactly this and nothing else.

The wiki writes months both ways, "October" and "Oct"; `parseMonth` reads
both. Before it did, four issues had carried a verified year and an
interpolated month since the first crawl — Ultimate Spider-Man #128 three
months off.

**After adding a series, crawl it:** `npm run verify:wiki -- --only=<key>`.
Nothing does it for you — Ultimate Comics: Spider-Man (2009) sat unverified
for five days because it went in after the last crawl.

**A wrong `wikiTitle` that names another real series fails silently.** That
same series carried `Ultimate Comics Spider-Man Vol 1`, which is Miles' 2011
book; the wiki files the 2009 one as `Ultimate Spider-Man Vol 2`. The crawl
resolved every page, reported no errors, and copied Miles' dates and Marvel ids
onto Peter's issues. A missing page is loud; a wrong one is not. After a crawl,
check that the verified dates grow with the issue number and land near the
anchors — #1 of a 2009 run dated 2011 is the tell. The fix also found Miles'
own series pointing at a `Vol 2` that does not exist, which had broken all its
Marvel Database links without anyone noticing.

The crawl only reads the generated runs, so **guest appearances never get a
Marvel id**. Their dates were checked by hand when each was added.

Useful flags:

```bash
npm run verify:wiki -- --missing                   # only unverified issues
npm run verify:wiki -- --only=amazing-spider-man   # one or more series, comma-separated
```

If a series comes back entirely unresolved, its `wikiTitle` is wrong. Marvel
Database renames runs mid-stream — `peter-parker-spectacular` and
`spectacular-spider-man-annual` need a per-segment `wikiTitle` for exactly this
reason — and spells some titles its own way (`Ultimate Marvel Team Up Vol 1`,
no hyphen).

### Numbers that are not steps in the run

A segment is a contiguous range of whole numbers. That is the right model for a
monthly book and no model at all for the things Marvel does to one, so a
series may also carry `extras` — single issues listed outright:

- **`#-1`.** For one month in 1997 every title shipped one, slotted between two
  ordinary issues and set before its own first.
- **Point-one issues.** `#654.1` sits between #654 and #655, not after it.
  Numeric sort puts them in the right place for free.
- **One-shots under an old title.** Spectacular #1000 is a 2011 one-shot of a
  run that ended in 1998, and lands in 2011 under that series.

`#700.1`–`#700.5` all carry a February 2014 cover date. That is right — they
shipped across three weeks of December 2013 as one run-on — so five issues
sharing a month is not a fault to go fixing.

Several runs switch to legacy numbering mid-volume (ASM vol. 4 goes #32 →
#789, Zdarsky's Spectacular #6 → #297, Ultimate Comics 2009 #15 → #150). That is
two segments of one series, not two series.

### When the number does not derive the page at all

A segment may also carry `wikiPages`, a map from issue number to the page's
full title, for the issues where no `wikiTitle` would produce it. Marvel
stopped numbering the Spider-Man annuals in 1996 and the wiki files them by
year, so annual **#31 lives at `Amazing Spider-Man Annual Vol 1 1998`**. The
2008 revival then restarts at `Vol 2 1` before jumping to the legacy number
from `Vol 2 36` on.

The only thing tying the two numberings together is the wiki's own
**`LegacyNumber`** field. Read that rather than inferring a sequence from
redirects — some legacy numbers have one and some do not.

### Continuities

`universe` on a series defaults to `earth-616`. The Ultimate books carry
`ultimate` (2000–2015) and the 2024 relaunch `ultimate-6160`: same character,
no shared history, so each forks the tree instead of folding into the main
line. Miles Morales appears in both — his Ultimate books carry `ultimate`, his
books after 2015 do not.

## The comic reader

Issues with a local file behind them can be read in the page. `data/` holds no
artwork and no file paths — the shelf is discovered at runtime.

### Why there is a service at all

A third of the shelf is `.cbr`, which is RAR, and the archives run 30–50 MB
each. Unpacking those in the browser means shipping a WASM extractor and
downloading a whole archive to show its first page. `reader/server.mjs` opens
one page instead, in about 15 ms.

It has **no npm dependencies** — Node builtins plus the `bsdtar` and `vips`
binaries — which is worth
keeping. Two details earn their place:

- **`.cbz` is read in process.** `reader/lib/zip.mjs` is a small random-access
  zip reader: central directory, then a seek straight to the one entry wanted.
- **`.cbr` is unpacked once, whole,** into a disposable page cache, then served
  from disk (0.5 s cold, 3 ms after). `bsdtar` and not `7z`: Debian and Alpine
  both ship p7zip *without* the RAR decoder, and it fails every entry with
  "Unsupported Method" after listing the archive quite happily.

The cache is a named volume, and it has to be one. Bind-mounting a host
directory gives root ownership to a container that runs as `node`, and every
`.cbr` then fails one request at a time.

The shelf is rescanned when a request arrives more than five minutes after the
last scan (`SCAN_TTL_MS`), so new files show up without a restart.

### The service knows nothing about issues

`/api/library` returns, per archive, the issue ids it *could* be — in priority
order — and the browser (`src/lib/shelf.js`) picks the first that names a real
issue. The reader builds ids by concatenation, `${key}-${number}`, and never
validates them.

`data/library.js` maps a folder to the series keys its files may belong to.
Order is priority, which is what lets one folder hold two series: the 1963
directory contains both #1–441 and the post-renumbering #500–700, and only the
second lot are vol. 2. A folder entry can also carry:

- `aliases` — pin a filename, or a parsed number, to specific ids. For files
  whose name is wrong about what they hold (ASM `000` is really #-1).
- `titles` — route by a substring of the parsed title, for folders that shelve
  a run and its annuals together. `titles: { annual: [] }` says "the tree does
  not index these" instead of letting them claim someone else's number.

Anything in an unmapped folder falls back to matching the series name parsed
from the filename against a table derived from every tree's `series.js`.

### Pin every folder

The fallback returns **every** series whose name matches, and that bites
constantly: six volumes are called "Amazing Spider-Man", three books are
"Spider-Man", three are "Superior Spider-Man". Unpinned, the browser takes the
first id that exists, so one file can satisfy the #1 of several volumes and
coverage reports an issue as present when it is not. **When adding a folder,
add it to `library.js`**, even if the fallback seems to resolve it.

Guest-appearance folders (`Invitados/…`) never resolve on their own:
`appearances.js` is not something the reader imports, so the fallback knows
nothing about those series. An unpinned guest folder is indexed and matches no
id at all — on the disk and invisible to the tree.

The obvious id can belong to another series: `secret-wars-N` is the **1984**
Secret Wars; the 2015 event is `secret-wars-2015-N`.

### Collected editions

`data/collections.js` maps page ranges of one file to issue ids — the only way
some issues exist on the shelf (ASM vol. 4 #1–32 only exist inside the
*Worldwide* volumes). Pages are 1-based over the archive's images in order,
front matter included, and were read off the book itself; they cannot be
derived.

A part is a **fallback**: `shelf.js` claims whole files first and lets
collections fill only what is left. So listing every issue a volume contains is
right even when most already have their own file.

Filenames are parsed by reading only up to the first bracket. Sixty-one files
on the shelf have an unclosed one and five carry a bare `c2c` after the last
group, and stripping balanced groups instead loses the issue number in all of
them. `reader/lib/index.mjs` documents the rest of the parse.

### Pages sized to the screen

A scanned page is typically 2000×3000 and ~1.8 MB. A phone at fit-width shows a
third of those pixels and paid for all of them — on the wire and again
decoded, three pages ahead. So a page can be asked for at a width
(`/page/:n?w=1440`): `reader/lib/resize.mjs` resizes it with libvips, over
stdin/stdout, and keeps the result in the cache volume, one directory per comic
and width so the existing eviction covers it. Measured on ASM #298 on a phone:
819 KB instead of 1.9 MB for the first page, 186 ms cold and 10 ms after.

- **The service owns the list of widths** (720, 1080, 1440, 1920) and returns
  it as `widths` in `/api/comic/:key`. An empty list — no libvips — means the
  client asks for originals. Any other `w` is a 400, not rounded, or every
  window size would become its own cache entry.
- **The client picks once per comic**: the narrowest width covering the page as
  it will be drawn, in device pixels. Past 1.15 device pixels per image pixel
  it fetches the original and swaps it in; while zoomed, new pages come
  straight in whole.
- **Layout is always in sized-page pixels** (`layoutSize` in `Reader.jsx`),
  whichever copy is loaded. Pan-zoom works in image pixels and keeps a hand zoom
  across page turns; if that space followed the bitmap, the same zoom would
  mean a different magnification on every other page. The original is drawn
  into the same box, so the swap moves nothing.
- **Under a fit, judge sharpness from the fit, not the view.** The view is one
  render late: on opening it is still the pan-zoom's starting scale of 1, which
  on a phone reads as zoomed in, and the first version downloaded every
  original only to throw it away. The page looked right the whole time; only
  the list of requests showed it. Check that list after touching this.
- A resize only wins if it is at least 10% lighter. Scans narrower than the
  width would otherwise be re-encoded — losing quality to save 1%.

The zoom readout is a multiple of the whole page on screen, not the bitmap
scale — the latter now depends on which copy is loaded.

### Reading position

`src/lib/progress.js` keeps the last page per issue in localStorage — per
browser, never leaving the machine. The shelf/part-read/read marks on the cards
and the shelf filters are derived from it rather than stored separately.

## The interface

- **Four dimensions** — series, arc, reading path, first appearance — combine
  as an intersection. `src/lib/scope.js` gives each option the set of series it
  covers, and a picker only offers what still crosses what is already chosen,
  so an empty combination is unreachable rather than designed for.
- **A selection replaces the timeline** (`SelectionView`) with its issues in
  reading order: an arc's or path's declared order, otherwise chronological.
  Crossover order matters — Kraven's Last Hunt crosses three titles inside one
  cover month, and sorting by date would shuffle it. The timeline is one click back and keeps its scroll position.
- **Routes** live in the hash (`#/arc/kravens-last-hunt/series/web-of-spider-man`)
  and every key is checked on the way in; one that does not resolve is dropped.
- **Two skins per tree**, each named by its character (Spider-Man/Venom,
  Daredevil/Elektra) behind the same System / light / dark switch. An explicit
  choice stamps `data-theme` on the root; System stamps nothing and follows
  `prefers-color-scheme`; the tree stamps `data-character`, which is what
  selects its palette. Arc colours are written once, for the light skin, and
  `src/lib/palette.js` lifts them at paint time via the `--arc-lift` token.
- **A series' colour** is its `--s-<accent>` token, set on each card inline by
  `IssueCard.jsx`. There used to be a CSS class per series; a new series without
  one fell through to the skin's accent silently, which is how every Daredevil
  card first came out blue.
- `src/lib/graph.js` lays the focus graph out by hop distance in fixed columns
  rather than running a force simulation. The subgraph is 5–15 nodes; a graph
  library would cost more than it saves.
- `YearBand` mounts its cards only when near the viewport.
- Halftone texture is restricted to backgrounds and year headers, never behind
  dense text.
- Fonts are referenced by family name (SF Pro); nothing is bundled — the full
  set is 137 MB. If this is ever published, subset the variable `SF-Pro.ttf`
  and add real `@font-face` rules to `src/styles/global.css`.

## Deploying

### The live deployment

Runs on dell-server (`server@192.168.1.14`) at **https://comics.lan**, and
the deploy directory **is** the working checkout:
`/home/server/docker-services/spider-man`. Changes are made and committed
there, then pushed to `origin`.

No host port is published. Both containers join the `docker-services_default`
network and Caddy reaches the site by container name — the blocks live in
`~/docker-services/caddy/conf/Caddyfile` (`reverse_proxy
spider-man-reading-tree:80`), one for `comics.lan` and one for the legacy
`spiderman.lan`. Any `*.lan` name already resolves to the server (a dnsmasq
wildcard in Pi-hole), so a new name only needs its Caddy block. The containers
and the repo keep their Spider-Man names. Inside the site container, nginx proxies `/api/`
to `spider-man-reader:8787`, resolving it lazily so the site starts without it.
The shelf is `/mnt/hdd/media/books/comics`, mounted read-only.

### What needs rebuilding

The two images bake in different files, and nothing rebuilds them for you:

| You changed | Rebuild |
|-------------|---------|
| any `series.js`, `library.js`, `collections.js`, `characters.js`, `reader/` | `spider-man-reader` |
| anything in `data/`, `src/` | `spider-man` |
| Only files on the shelf | nothing — the next scan picks them up |

```bash
docker compose build spider-man-reader && docker compose up -d spider-man-reader
docker compose build spider-man && docker compose up -d spider-man
```

The reader image copies `data/` at build time. Pinning a folder and not rebuilding it changes nothing live, and gives no
error. To check what the running reader has:
`docker exec spider-man-reader cat /app/data/library.js | diff - data/library.js`.

### The script

`scripts/deploy.sh user@host` deploys to another host over SSH: the remote
clones or updates the repo, builds and runs docker compose, so what runs is
exactly what is on the branch — push first. Pass `--comics ""` to deploy the
site without the reader. It refuses to touch a deploy directory that is not a
checkout of this repository; that guard is deliberate — do not remove it to
make a deploy "just work".

The site image is multi-stage: `node:22-alpine` builds, `nginx:alpine` serves.
`docker/nginx.conf` caches fingerprinted assets for a year and explicitly
refuses to cache `index.html`, without which a deploy strands clients on stale
bundles.

## Digital availability

`data/marvel-unlimited.json` maps issue ids to Marvel's own catalogue id, which
turns the Marvel link from a fuzzy site search into a direct one. Its absence
is information too: a quiet dot beside the date means there is a digital
edition, and the detail panel says so when there is not.

Do not read a missing id as "unavailable anywhere": it means Marvel has no
digital catalogue entry — or, for guests and for any series added since its
last crawl, that nobody looked.

## Scope

Included: every issue of the titles Spider-Man headlines, including the Clone
Saga miniseries, the team-up titles and both Ultimate continuities, plus curated
guest appearances with narrative weight. `appearances.js` holds singles by
decade, then complete events by event; the test for an event is whether his
own book afterwards treats it as settled fact.

`relevance: 'optional'` covers out-of-continuity material (Spidey Super
Stories) and is hidden by default.

Deliberately excluded: single-panel cameos, and reprints. Marvel Tales was in
the tree and was dropped — it republished stories the tree already holds.

## Covers and copyright

This project stores publication metadata and its own notes, nothing else. No
cover images are hosted or hot-linked. Each issue links out to Marvel Database,
League of Comic Geeks, Marvel.com and Comic Vine, where the artwork lives.

Only Marvel Database gets a direct URL — its page titles are exactly
`<Series Title> Vol N <number>`, which is why every series carries a
`wikiTitle`. The other three key their URLs on internal numeric ids, so they get
site search URLs instead.

Notes in `data/` are original one-line framings. Do not paste synopses from
other sources into them.

## Not built (yet)

The reader is one page at a time: no two-page spreads.

Not every point issue is listed. Avenging Spider-Man #15.1 is a known gap; it
needs only an `extras` entry in `series.js`, plus a file on the shelf.
