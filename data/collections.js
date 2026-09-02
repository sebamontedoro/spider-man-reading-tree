/**
 * Collected editions: one file that holds several issues.
 *
 * An eighth hand-curated layer, and the only one that describes the *inside*
 * of a file. Everywhere else the shelf is one file per issue; a Masterworks or
 * an omnibus breaks that, and without this the whole book would sit unmatched
 * while the issues it contains still counted as missing.
 *
 * `from` and `to` are page numbers as the reader serves them — 1-based, over
 * the archive's images in order, front matter included. There is no way to
 * derive them: the boundaries were read off the book itself, cover by cover.
 *
 * A part is a **fallback**. If a standalone file for the same issue is on the
 * shelf it wins, because a file cut to one issue beats a slice of a 332-page
 * book. So listing every issue a collection holds is right even when most of
 * them are already covered — see src/lib/shelf.js.
 */

export const COLLECTIONS = [
  {
    file: 'Collected Editions/Marvel Masterworks - The Spectacular Spider-Man v06 (2023) (Digital-Empire).cbr',
    // The volume's own credits page says "Nos. 67-79". Boundaries found by
    // reading the covers: eight pages of front matter, then each issue, then a
    // gallery of original art from page 324 on.
    //
    // The lengths are not regular — 21 to 24 pages — so they cannot be
    // interpolated, and #75 is a 40-page double-sized issue, which its cover
    // says outright.
    parts: [
      { id: 'peter-parker-spectacular-67', from: 9,   to: 31 },
      { id: 'peter-parker-spectacular-68', from: 32,  to: 54 },
      { id: 'peter-parker-spectacular-69', from: 55,  to: 77 },
      { id: 'peter-parker-spectacular-70', from: 78,  to: 101 },
      { id: 'peter-parker-spectacular-71', from: 102, to: 122 },
      { id: 'peter-parker-spectacular-72', from: 123, to: 144 },
      { id: 'peter-parker-spectacular-73', from: 145, to: 167 },
      { id: 'peter-parker-spectacular-74', from: 168, to: 190 },
      { id: 'peter-parker-spectacular-75', from: 191, to: 230 },
      { id: 'peter-parker-spectacular-76', from: 231, to: 253 },
      { id: 'peter-parker-spectacular-77', from: 254, to: 276 },
      { id: 'peter-parker-spectacular-78', from: 277, to: 299 },
      { id: 'peter-parker-spectacular-79', from: 300, to: 323 },
    ],
  },
]
