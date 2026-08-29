/**
 * External links for an issue.
 *
 * Only Marvel Database has a URL we can derive: its page titles are exactly
 * `<Series Title> Vol N <number>`, which is why every series carries a
 * `wikiTitle`. That makes it the primary link, and the one that lands directly
 * on the right page.
 *
 * The other three sites key their URLs on internal numeric ids we have no way
 * to derive offline, so those get site search URLs instead — one click away
 * from the issue rather than zero. That is a deliberate trade, not an oversight.
 */

const enc = encodeURIComponent

/** `Amazing Spider-Man Vol 1` + 31 → the wiki page title. */
const wikiPage = (issue) =>
  `${issue.wikiTitle} ${issue.number}`.replace(/ /g, '_')

/** Human-readable query used for the search-based links. */
const searchQuery = (issue) =>
  `${issue.seriesName} #${issue.number}`.replace(/\s+/g, ' ').trim()

export const linksFor = (issue) => {
  if (!issue) return []
  const q = enc(searchQuery(issue))

  return [
    {
      key: 'marvel-database',
      label: 'Marvel Database',
      hint: 'Direct link — cover, credits and full appearance list',
      direct: true,
      url: `https://marvel.fandom.com/wiki/${wikiPage(issue)}`,
    },
    {
      key: 'league',
      label: 'League of Comic Geeks',
      hint: 'Site search',
      direct: false,
      url: `https://leagueofcomicgeeks.com/search?keyword=${q}`,
    },
    {
      key: 'marvel',
      label: 'Marvel.com',
      hint: 'Site search — read it on Unlimited if you subscribe',
      direct: false,
      url: `https://www.marvel.com/search?query=${q}`,
    },
    {
      key: 'comicvine',
      label: 'Comic Vine',
      hint: 'Site search',
      direct: false,
      url: `https://comicvine.gamespot.com/search/?q=${q}&i=issue`,
    },
  ]
}
