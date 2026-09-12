# Spider-Man Reading Tree

An interactive visual reading guide to Spider-Man in print, **1962–2026**.

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

**2556 issues, every cover date verified · 102 story arcs · 92 characters indexed · 18 reading paths**

Every issue links out to where you can read or look it up, and the guide tells
you which ones have a digital edition — 2170 of them do.

| | |
|---|---|
| Titles he headlines | 57 series, from Amazing Fantasy #15 to the 2024 Ultimate Spider-Man: Amazing, Spectacular, Sensational, Web, Superior and Miles Morales across their volumes, the team-up books, the Clone Saga miniseries, and their annuals |
| Continuities | The main line, the 2000 Ultimate line and the 2024 one, each drawn as its own branch of the tree |
| Guest appearances | 146 curated ones, from the 1963 Fantastic Four Annual to the 2024 Ultimate Universe — single issues, and whole events where his own book treats the outcome as settled fact: Secret Wars, Civil War, Secret Invasion, Siege, Devil's Reign |
| Crossovers mapped | 35, from the Alien Costume and Kraven's Last Hunt through Maximum Carnage and the Clone Saga to One More Day, Spider-Island, Spider-Verse and Secret Empire |
| Reading paths | The Essentials, the Ditko and Romita eras, the Goblin, Kraven, Osborn and symbiote threads, the Clone Saga, the Ultimate line start to finish, Miles Morales, and more |
| Also included | Out-of-continuity material, hidden behind a filter |

Pick any combination of a series, an arc, a reading path and a character's
first appearance, and the page becomes that selection, in reading order, with
a link you can share. The pickers only offer combinations that contain
something. Two skins, Spider-Man and Venom, or whatever the system prefers.

Deliberately excluded: single-panel cameos, and reprints. Marvel Tales ran 291
issues from 1964 to 1994 republishing stories the tree already holds, and a
reading guide that lists the same story twice is worse than one that does not
list it at all.

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
filename; `data/library.js` holds the folder mapping. A collected edition can
stand in for the issues inside it — `data/collections.js` says which pages are
which issue — and a file of its own always wins over a slice of a book. The
service is told nothing about the reading tree and stores nothing about your
files.

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

To run the containers without the script:

```bash
docker compose up -d --build

# with a shelf; it is mounted read-only and never written to
SPIDERMAN_COMICS=/srv/comics docker compose up -d --build
```

The compose file publishes no host port: it expects a reverse proxy on a
shared Docker network (`SPIDERMAN_NETWORK`, default `docker-services_default`)
to reach the site by container name. Uncomment its `ports:` block to open it
on `SPIDERMAN_PORT` instead.

## How the data works

Two kinds of file. Three are machine-produced and disposable: the issue
skeleton, generated from the run definitions in `data/series.js`, and the
cover dates and Marvel ids crawled from Marvel Database. Everything else in
`data/` — corrections, guest appearances, arcs, milestones, reading paths, arc
colours, and the shelf and collection mappings the reader uses — is written by
hand and always wins. That split means the skeleton can be regenerated or
re-verified at any time without losing written work.

Cover dates are checked against Marvel Database rather than estimated. The
generator interpolates between anchor dates as a fallback, which is accurate to
the month for most runs and badly wrong for a few — hence the verification
pass.

See [CLAUDE.md](CLAUDE.md) for the full notes on the data model, the reader and
the deployment.

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
