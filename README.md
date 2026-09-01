# Spider-Man Reading Tree

An interactive visual reading guide to Spider-Man's first three decades in
print, **1962–1990**.

A chronological timeline of every issue he headlined, plus the guest
appearances that carry real story weight. Click any issue to see how it
connects to what came before and after, filter by series, arc, character or
year, or follow one of the curated reading paths.

Built with Vite and React. No tracking, and no runtime dependencies: the site
is a static bundle. Point it at a folder of `.cbz`/`.cbr` files and a small
companion service lets you read those issues in the page as well — see
[The comic reader](#the-comic-reader). Without it, everything else works
unchanged.

## What's in it

**1109 issues · 1106 with verified cover dates · 24 story arcs · 58 characters indexed · 7 reading paths**

Every issue links out to where you can read or look it up, and the guide tells
you which ones have a digital edition — 700 of the 793 issues worth reading do.

| | |
|---|---|
| Titles he headlines | Amazing Fantasy #15, Amazing Spider-Man, Peter Parker/Spectacular, Marvel Team-Up, Web of Spider-Man, and their annuals |
| Guest appearances | 24 curated ones, from the 1963 Human Torch crossovers to the 1990 New Fantastic Four |
| Crossovers mapped | Kraven's Last Hunt, Inferno, Acts of Vengeance, Life in the Mad Dog Ward, Missing in Action, the Alien Costume |
| Also included | Reprints and out-of-continuity material, hidden behind a filter |

Deliberately excluded: single-panel cameos, and anything after 1990.

## Running it

```bash
npm install
npm run dev            # http://localhost:5173
```

Other scripts:

```bash
npm run build:data     # regenerate the dataset skeleton
npm run verify:wiki    # refresh dates and Marvel ids from the wiki (network)
npm run build          # build:data + production build
npm run dev:reader     # the comic reader service, over ./comics
```

The dev server proxies `/api` to `http://localhost:8787`, so `npm run dev` and
`npm run dev:reader` side by side give you the reader too. Set `READER_ORIGIN`
to point at a deployed one instead.

## The comic reader

Any issue with a local file behind it gets a **Read it here** button, and opens
in a reader with zoom, pan, page turns and a resume position.

- Pages arrive one at a time, so a 40 MB archive opens in about 15 ms rather
  than after a 40 MB download. `.cbz` is read in process; `.cbr` is unpacked
  once by `bsdtar` into a disposable cache.
- Zoom with the toolbar, `+`/`-`, ctrl-scroll or a two-finger pinch. Turn pages
  with the arrows, the buttons, or a swipe. `0` fits the page, `w` fits the
  width, `f` goes full screen, `Esc` closes.
- Where you stopped is kept in the browser's own storage — nothing is uploaded,
  and there are no accounts. Cards on the timeline pick up a small mark for
  "on the shelf", "part-read" and "read", and two filters go with it.

Files are matched to issues by the series folder and the number in the
filename; `data/library.js` holds the folder mapping. The service is told
nothing about the reading tree and stores nothing about your files.

## Deploying

A container build and an SSH deploy script are included:

```bash
./scripts/deploy.sh user@host                    # deploy
./scripts/deploy.sh user@host --port 9000        # on a different port
./scripts/deploy.sh user@host --status           # container status
./scripts/deploy.sh user@host --logs             # tail logs
./scripts/deploy.sh user@host --down             # stop and remove

./scripts/deploy.sh user@host --comics /srv/comics   # with a shelf to read
./scripts/deploy.sh user@host --comics ""            # site only, no reader
```

The remote host does the work: it clones or updates this repository, builds a
multi-stage image (Node compiles, nginx serves) and brings the container up
with docker compose. It needs `git`, `docker` and `docker compose`.

To run the container without the script:

```bash
docker compose up -d --build      # http://localhost:8080
SPIDERMAN_PORT=9000 docker compose up -d --build

# with a shelf; it is mounted read-only and never written to
SPIDERMAN_COMICS=/srv/comics docker compose up -d --build
```

## How the data works

Six layers, merged at load time by `src/lib/dataset.js`, plus one the comic
reader uses:

| # | Layer | File | Hand-edited? |
|---|-------|------|--------------|
| 1 | Generated runs | `src/generated/issues.json` | **Never** |
| 2 | Verified cover dates | `data/cover-dates.json` | **Never** |
| 3 | Marvel issue ids | `data/marvel-unlimited.json` | **Never** |
| 4 | Corrections & notes | `data/overrides.js` | Yes |
| 5 | Guest appearances | `data/appearances.js` | Yes |
| 6 | Arcs & crossovers | `data/arcs.js` | Yes |
| 7 | Comic shelf folders | `data/library.js` | Yes |

Layers 1–3 are machine-produced and disposable. Layers 4–7 are hand-curated
and always win. That split means the skeleton can be regenerated or re-verified
at any time without losing written work.

Cover dates are checked against Marvel Database rather than estimated. The
generator interpolates between anchor dates as a fallback, which is accurate to
the month for the main runs but was badly wrong for the reprint title — hence
the verification pass.

See [CLAUDE.md](CLAUDE.md) for the full notes on the data model.

## Covers and copyright

This project stores publication metadata — series, issue numbers, cover dates,
first appearances — and its own short notes. **No cover images are hosted or
hot-linked, and no synopses are reproduced.** The reader displays comics you
already have, from a folder on your own machine; nothing is bundled,
downloaded or redistributed with it. Every issue links out to Marvel
Database, League of Comic Geeks, Marvel.com and Comic Vine, where the artwork
and the story summaries live.

Spider-Man and all related characters are trademarks of Marvel. This is an
unofficial, non-commercial reference index with no affiliation to Marvel.

## Typography

The interface uses **SF Pro**, referenced by family name rather than bundled —
the full family is 137 MB. If it is not installed on the viewing machine, the
page falls back to the system UI font stack and everything still works.
