/**
 * Where the local comic files live, and which issues they are.
 *
 * A seventh hand-curated layer, and the only one the reading tree does not
 * generate: filenames in a scanned collection carry the series as prose
 * ("Amazing Spider-Man Volume Two 001") and nothing that resolves an issue id.
 *
 * Each folder lists the series keys its files may belong to, **in priority
 * order**. The number parsed out of the filename is appended to each in turn,
 * and the first id that exists in the dataset wins. That ordering is what makes
 * one folder able to hold two series: the 1963 run's directory contains both
 * #1–441 and the post-renumbering #500–700, and only the latter are vol. 2.
 *
 * Anything in a folder that is not listed here still gets indexed and falls
 * back to matching on the series name parsed from the filename — see
 * TITLE_FALLBACK in reader/lib/index.mjs, which derives its map from
 * data/series.js. Add a folder here only when that guess would be wrong.
 */

export const LIBRARY_FOLDERS = [
  {
    dir: 'Amazing Spider-Man (1963)',
    // #1–441 are vol. 1; #500–700 are vol. 2 after Marvel restored the
    // original numbering, and share the directory with them.
    series: ['amazing-spider-man', 'amazing-spider-man-v2'],
    // A number that does not mean what it says. This file is the 1997
    // Flashback issue, #-1: the scene release is named "-001" and whoever
    // organised this folder renamed it to "000" — same inode, same release
    // tag. There is no Amazing Spider-Man #0. Aliasing it here fixes the match
    // without renaming someone's files.
    aliases: { '0': ['amazing-spider-man--1'] },
  },
  {
    dir: 'Amazing Spider-Man Annuals',
    series: ['amazing-spider-man-annual'],
  },
  {
    // Only an alias: everything else here still resolves by its title.
    dir: 'Era del clon y one-shots',
    aliases: {
      // Marvel Database files this under its indicia title, "Osborn Journals",
      // while the scan is named for the cover: "Spider-Man - The Osborn
      // Journal". Nothing derives one from the other.
      'Spider-Man - The Osborn Journal 001 (1997) (Digital) (Shadowcat-Empire).cbz': ['osborn-journals-1'],
    },
  },
  {
    // A third packager, a third set of conventions: most of these are named
    // for an abbreviation ("websm 042") that no series name could ever match,
    // so the folder has to say what it holds.
    dir: 'Web of Spider-Man/Vol 1 (1985)',
    series: ['web-of-spider-man'],
  },
  {
    dir: 'Web of Spider-Man/Annuals',
    series: ['web-of-spider-man-annual'],
    aliases: {
      // Annual #7, named as though it were #3. Keyed by filename because
      // "websm_annual3.cbr" sits in the same folder and parses to the same
      // number — nothing but the name tells the two apart.
      'websm_annual7p_3.cbr': ['web-of-spider-man-annual-7'],
      // Not an annual at all: the 1995 Super Special, filed in with them.
      'websm_1995.cbz': ['web-of-spider-man-super-special-1'],
    },
  },
  {
    // A separate download with its own conventions: the volume is in the
    // filename ("Spectacular Spider-Man V1 042"), and the annuals sit in with
    // the run instead of in their own folder — which is what `titles` is for.
    dir: 'Spectacular Spider-Man/Volume 1 (1976)',
    series: ['peter-parker-spectacular'],
    titles: { annual: ['spectacular-spider-man-annual'] },
  },
  {
    dir: 'Spectacular Spider-Man/Volume 2 (2003)',
    series: ['spectacular-spider-man-v2'],
  },
  {
    // Zdarsky's 2017 run, which numbers #1–6 and then jumps to the legacy
    // #297–313. Both are in this folder, and both belong to the same key.
    dir: 'Spectacular Spider-Man/Volume 3 (2017)',
    series: ['peter-parker-spectacular-2017'],
    titles: { annual: ['peter-parker-spectacular-2017-annual'] },
  },
  {
    dir: 'Spectacular Spider-Man/Magazine (1968)',
    series: ['spectacular-spider-man-magazine'],
  },
  {
    // The odds and ends: the 1997 Flashback #-1 and the 2011 #1000 one-shot,
    // both of which the tree files under the 1976 run.
    dir: 'Spectacular Spider-Man/Extra',
    series: ['peter-parker-spectacular'],
  },
  {
    dir: 'Amazing Spider-Man Vol 2 (1999)',
    // Filed as "Volume Two" in the filenames, which no title guess would map
    // to vol. 2 on its own — #1–58 here are a different issue from #1–58 of
    // the 1963 run.
    series: ['amazing-spider-man-v2'],
  },
]
