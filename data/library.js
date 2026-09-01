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
  },
  {
    dir: 'Amazing Spider-Man Annuals',
    series: ['amazing-spider-man-annual'],
  },
  {
    dir: 'Amazing Spider-Man Vol 2 (1999)',
    // Filed as "Volume Two" in the filenames, which no title guess would map
    // to vol. 2 on its own — #1–58 here are a different issue from #1–58 of
    // the 1963 run.
    series: ['amazing-spider-man-v2'],
  },
]
