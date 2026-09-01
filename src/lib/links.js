/**
 * External links for an issue.
 *
 * Only Marvel Database has a URL we can derive: its page titles are exactly
 * `<Series Title> Vol N <number>`, which is why every series carries a
 * `wikiTitle`. That makes it the primary link, and the one that lands directly
 * on the right page.
 *
 * Marvel.com is direct too wherever `npm run verify:wiki` found the issue's
 * catalogue id; without one it falls back to a site search.
 *
 * League of Comic Geeks and Comic Vine key their URLs on internal ids we cannot
 * derive offline, so they stay searches. Those searches are fuzzy: a query
 * ending in "#1" happily matches #11 or #100, so they are labelled as searches
 * in the UI rather than presented as if they landed on the issue.
 */

const enc = encodeURIComponent

/**
 * `Amazing Spider-Man Vol 1` + 31 → the wiki page title.
 *
 * An issue may carry the page outright, for the runs where the number does not
 * derive it: Marvel Database files the 1996–2001 Spider-Man annuals by year, so
 * annual #31 lives at "Amazing Spider-Man Annual Vol 1 1998".
 */
const wikiPage = (issue) =>
  (issue.wikiPage || `${issue.wikiTitle} ${issue.number}`).replace(/ /g, '_')

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
      key: 'series',
      label: 'The whole run',
      hint: 'Series page on Marvel Database — every issue in one list',
      direct: true,
      url: `https://marvel.fandom.com/wiki/${issue.wikiTitle.replace(/ /g, '_')}`,
    },
    {
      key: 'league',
      label: 'League of Comic Geeks',
      hint: 'Site search',
      direct: false,
      url: `https://leagueofcomicgeeks.com/search?keyword=${q}`,
    },
    issue.marvelId
      ? {
          key: 'marvel',
          label: 'Read on Marvel Unlimited',
          hint: 'Direct link to the issue in Marvel\u2019s digital catalogue',
          direct: true,
          url: `https://www.marvel.com/comics/issue/${issue.marvelId}`,
        }
      : {
          key: 'marvel',
          label: 'Marvel.com',
          hint: 'Site search — no digital edition found for this issue',
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
