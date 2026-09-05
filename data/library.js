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
  // Los seis volumenes de Amazing Spider-Man se llaman igual en el disco
  // ("Amazing Spider-Man 001"), y el fallback por titulo devuelve los seis en
  // orden de dataset: el #1 de 2018 se resolveria como el #1 de 1963. Cada
  // carpeta tiene que decir de que volumen es.
  {
    dir: 'Amazing Spider-Man Vol 3 (2014)',
    series: ['amazing-spider-man-v3'],
  },
  {
    // #1-32 y, tras el regreso a la numeracion heredada, #789-801: dos tramos
    // del mismo volumen conviviendo en la carpeta.
    dir: 'Amazing Spider-Man Vol 4 (2015)',
    series: ['amazing-spider-man-v4'],
  },
  {
    dir: 'Amazing Spider-Man Vol 5 (2018)',
    series: ['amazing-spider-man-v5'],
  },
  {
    dir: 'Amazing Spider-Man Vol 6 (2022)',
    series: ['amazing-spider-man-v6'],
  },
  {
    // La de 2006 numera #23-41 y la de 1996 llega hasta #33: sin esto, los
    // numeros 23-33 se irian a la serie equivocada.
    dir: 'Sensational Spider-Man (2006)',
    series: ['sensational-spider-man-v2'],
  },
  {
    dir: 'Superior Spider-Man/Vol 2 (2019)',
    series: ['superior-spider-man-v2'],
  },
  {
    dir: 'Superior Spider-Man/Vol 3 (2024)',
    series: ['superior-spider-man-v3'],
  },
  {
    // El titulo en el archivo es "Spider-Man" a secas, que es tambien el de la
    // run de 1990. Es la serie de Miles posterior a Ultimate.
    dir: 'Miles Morales/Spider-Man (2016)',
    series: ['spider-man-miles-v2'],
  },
  {
    dir: 'Miles Morales/Vol 1 (2019)',
    series: ['miles-morales-spider-man'],
  },
  {
    dir: 'Miles Morales/Vol 2 (2023)',
    series: ['miles-morales-spider-man-v2'],
  },
  {
    // El relanzamiento de 2024 vuelve a empezar en #1, encima de la run de
    // Bendis que llego a #133.
    dir: 'Ultimate Spider-Man/Vol 3 (2024)',
    series: ['ultimate-spider-man-2024'],
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
    // The 1990 run, which McFarlane started as "Spider-Man" and which was
    // renamed "Peter Parker: Spider-Man" at #75 -- both names sit in this one
    // folder, and neither would fall back to the right key on its own: the
    // second is the title of the *1999* series, a different book entirely.
    dir: 'Spider-Man (1990)',
    series: ['spider-man-1990'],
    // The two annuals are shelved in with the run and parse to 97 and 98 from
    // their cover years ("Annual '97"), which are real issues of it. The tree
    // does not index this run's annuals, so say so rather than let them claim
    // someone else's number.
    titles: { annual: [] },
  },
  {
    dir: 'Amazing Spider-Man Vol 2 (1999)',
    // Filed as "Volume Two" in the filenames, which no title guess would map
    // to vol. 2 on its own — #1–58 here are a different issue from #1–58 of
    // the 1963 run.
    series: ['amazing-spider-man-v2'],
  },
]
