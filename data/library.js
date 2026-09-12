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
    // Sin esto, el #1 de 2013 se ofrecia tambien como el #1 de la vol. 2 y el
    // de la vol. 3: el fallback devuelve todos los volumenes cuyo titulo
    // coincide, y las tres Superior empiezan en 1. Un solo archivo contaba
    // como tres numeros presentes.
    dir: 'Superior Spider-Man/Vol 1 (2013)',
    series: ['superior-spider-man'],
  },
  {
    // La misma colision: la de 1996 llega al #33 y la de 2006 empieza en el
    // #23, asi que once numeros se reclamaban dos veces.
    dir: 'Sensational Spider-Man (1996)',
    series: ['sensational-spider-man'],
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
    // El ultimo tramo de Miles en la linea paralela, antes de cruzar a la
    // principal. Su titulo empieza igual que el de sus dos series propias.
    dir: 'Miles Morales/Ultimate (2014)',
    series: ['miles-morales-ultimate'],
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
    // La tercera carpeta cuyo archivo dice solo "Spider-Man": la de Slott de
    // 2022, que no es ni la de 1990 ni la de Miles de 2016.
    dir: 'Spider-Man (2022)',
    series: ['spider-man-v4'],
  },
  {
    // Dos series con el mismo nombre y la misma numeracion: la de 2000 llega a
    // #133 y el relanzamiento de 2009 vuelve a empezar en #1. El arbol solo
    // indexa la primera, pero la carpeta lo dice igual — el dia que entre la
    // segunda, el fallback las confundiria en silencio.
    dir: 'Ultimate Spider-Man/Vol 1 (2000)',
    series: ['ultimate-spider-man'],
  },
  {
    // El relanzamiento de 2009, que en disco se llama igual que la run de 2000
    // y arranca de nuevo en #1. Esta es exactamente la confusion que la
    // carpeta de arriba anticipaba.
    dir: 'Ultimate Spider-Man/Vol 2 (2009)',
    series: ['ultimate-comics-spider-man-2009'],
  },
  {
    dir: 'Ultimate Spider-Man/Annuals',
    series: ['ultimate-spider-man-annual'],
  },
  {
    // La de Miles. Su titulo es el de la serie de 2009 mas una palabra, y esa
    // palabra es lo unico que las separa.
    dir: 'Ultimate Spider-Man/Ultimate Comics (2011)',
    series: ['ultimate-comics-spider-man'],
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
  // La rama de invitados: numeros de otras series donde Spider-Man aparece.
  // Ninguna de estas carpetas se resuelve sola. El fallback por titulo deriva
  // de data/series.js, y estas no son series del arbol sino apariciones, que
  // viven en data/appearances.js — un archivo que el lector no importa. Sin
  // pinchar la carpeta quedaban indexadas y sin ningun id: presentes en el
  // disco e invisibles para el arbol.
  // Las parejas salen de la tabla de destinos del repartidor, no de conjeturas:
  // cada carpeta tiene exactamente un prefijo.
  { dir: 'Invitados/Absolute Carnage', series: ['absolute-carnage'] },
  { dir: 'Invitados/Avengers vs. X-Men', series: ['avengers-vs-x-men'] },
  { dir: 'Invitados/Civil War', series: ['civil-war'] },
  { dir: 'Invitados/Daredevil', series: ['daredevil'] },
  { dir: 'Invitados/Dark Web', series: ['dark-web'] },
  { dir: 'Invitados/Devil\'s Reign', series: ['devils-reign'] },
  { dir: 'Invitados/Edge of Spider-Verse', series: ['edge-of-spider-verse'] },
  { dir: 'Invitados/FF', series: ['ff'] },
  { dir: 'Invitados/Fantastic Four', series: ['fantastic-four'] },
  { dir: 'Invitados/Fantastic Four Annual', series: ['fantastic-four-annual'] },
  { dir: 'Invitados/Fear Itself', series: ['fear-itself'] },
  { dir: 'Invitados/Infinity Crusade', series: ['infinity-crusade'] },
  { dir: 'Invitados/Infinity War', series: ['infinity-war'] },
  { dir: 'Invitados/King in Black', series: ['king-in-black'] },
  { dir: 'Invitados/Marvel Feature', series: ['marvel-feature'] },
  { dir: 'Invitados/Marvel Super Hero Contest of Champions', series: ['contest-of-champions'] },
  { dir: 'Invitados/Marvel Super Heroes Secret Wars', series: ['secret-wars'] },
  { dir: 'Invitados/Marvel Two-In-One', series: ['marvel-two-in-one'] },
  { dir: 'Invitados/Marvels', series: ['marvels'] },
  { dir: 'Invitados/New Avengers', series: ['new-avengers'] },
  { dir: 'Invitados/Nova', series: ['nova'] },
  { dir: 'Invitados/Original Sin', series: ['original-sin'] },
  { dir: 'Invitados/Secret Invasion', series: ['secret-invasion'] },
  { dir: 'Invitados/Secret Wars (2015)', series: ['secret-wars-2015'] },
  { dir: 'Invitados/Secret Wars II', series: ['secret-wars-ii'] },
  { dir: 'Invitados/Siege', series: ['siege'] },
  { dir: 'Invitados/Spider-Geddon', series: ['spider-geddon'] },
  { dir: 'Invitados/Spider-Man: The Jackal Files', series: ['spider-man-jackal-files'] },
  { dir: 'Invitados/Spider-Men', series: ['spider-men'] },
  { dir: 'Invitados/Spider-Men II', series: ['spider-men-ii'] },
  { dir: 'Invitados/Strange Tales', series: ['strange-tales'] },
  { dir: 'Invitados/Strange Tales Annual', series: ['strange-tales-annual'] },
  { dir: 'Invitados/The Avengers', series: ['avengers'] },
  { dir: 'Invitados/The Infinity Gauntlet', series: ['infinity-gauntlet'] },
  { dir: 'Invitados/The New Warriors', series: ['new-warriors'] },
  { dir: 'Invitados/The Pulse', series: ['the-pulse'] },
  { dir: 'Invitados/The X-Men', series: ['x-men'] },
  { dir: 'Invitados/Ultimate Fallout', series: ['ultimate-fallout'] },
  { dir: 'Invitados/Ultimate Invasion', series: ['ultimate-invasion'] },
  { dir: 'Invitados/Ultimate Six', series: ['ultimate-six'] },
  { dir: 'Invitados/Ultimate Universe', series: ['ultimate-universe'] },
  { dir: 'Invitados/Venom: Lethal Protector', series: ['venom-lethal-protector'] },
  { dir: 'Invitados/World War Hulk', series: ['world-war-hulk'] },

  // --- El arbol de Daredevil, desde 2026-09-12. Una carpeta por serie bajo
  // Daredevil/, y los invitados bajo Invitados/ como en Spider-Man. Todas
  // pinchadas: seis volumenes de "Daredevil 001" comparten nombre de archivo,
  // y el fallback por titulo daria el #1 de uno por el de otro. Generado desde
  // el mapa de carpetas del repartidor (dd_estante.py), asi el estante y esta
  // lista no pueden discrepar. Las carpetas con dos series enrutan por titulo:
  // el vol. 5 guarda los anuales de 2016 y 2018, los dos "#1".
  { dir: 'Daredevil/Vol 1 (1964)', series: ['daredevil'] },
  { dir: 'Daredevil/Annuals (1967)', series: ['daredevil-annual'] },
  { dir: 'Daredevil/Vol 2 (1998)', series: ['daredevil-v2'], titles: { 'annual': ['daredevil-annual-v2'] } },
  { dir: 'Daredevil/Vol 3 (2011)', series: ['daredevil-v3'], titles: { 'annual': ['daredevil-annual-v3'] } },
  { dir: 'Daredevil/Vol 4 (2014)', series: ['daredevil-v4'] },
  { dir: 'Daredevil/Vol 5 (2016)', series: ['daredevil-v5'], titles: { 'annual 2016': ['daredevil-annual-v4'], 'annual 2018': ['daredevil-annual-v5'] } },
  { dir: 'Daredevil/Vol 6 (2019)', series: ['daredevil-v6'], titles: { 'annual': ['daredevil-annual-v6'] } },
  { dir: 'Daredevil/Vol 7 (2022)', series: ['daredevil-v7'] },
  { dir: 'Daredevil/Vol 8 (2023)', series: ['daredevil-v8'] },
  { dir: 'Daredevil/Vol 9 (2026)', series: ['daredevil-v9'] },
  { dir: 'Daredevil/Miniseries/Man Without Fear (2019)', series: ['man-without-fear'] },
  { dir: 'Daredevil/Shadowland', series: ['shadowland'], titles: { 'after the fall': ['shadowland-after-the-fall'] } },
  { dir: "Daredevil/Devil's Reign - Omega", series: ['devils-reign-omega'] },
  { dir: 'Daredevil/Miniseries/The Man Without Fear (1993)', series: ['daredevil-man-without-fear'] },
  { dir: 'Daredevil/Miniseries/Daredevil-Deadpool Annual (1997)', series: ['daredevil-deadpool-annual'] },
  { dir: 'Daredevil/Miniseries/Ninja (2000)', series: ['daredevil-ninja'] },
  { dir: 'Daredevil/Miniseries/Daredevil-Spider-Man (2001)', series: ['daredevil-spider-man'] },
  { dir: 'Daredevil/Miniseries/Yellow (2001)', series: ['daredevil-yellow'] },
  { dir: 'Daredevil/Miniseries/Spider-Man-Daredevil (2002)', series: ['spider-man-daredevil'] },
  { dir: 'Daredevil/Miniseries/The Target (2003)', series: ['daredevil-target'] },
  { dir: 'Daredevil/Miniseries/Father (2004)', series: ['daredevil-father'] },
  { dir: 'Daredevil/Miniseries/Redemption (2005)', series: ['daredevil-redemption'] },
  { dir: 'Daredevil/Miniseries/Daredevil vs. Punisher (2005)', series: ['daredevil-vs-punisher'] },
  { dir: "Daredevil/Miniseries/Battlin' Jack Murdock (2007)", series: ['daredevil-battlin-jack-murdock'] },
  { dir: 'Daredevil/Miniseries/Blood of the Tarantula (2008)', series: ['daredevil-blood-of-the-tarantula'] },
  { dir: 'Daredevil/Miniseries/Dead on Arrival (2008)', series: ['daredevil-captain-america-dead-on-arrival'] },
  { dir: 'Daredevil/Miniseries/Cage Match (2010)', series: ['daredevil-cage-match'] },
  { dir: 'Daredevil/Miniseries/Black & White (2010)', series: ['daredevil-black-and-white'] },
  { dir: 'Daredevil/Miniseries/Reborn (2011)', series: ['daredevil-reborn'] },
  { dir: 'Daredevil/Miniseries/Dark Nights (2013)', series: ['daredevil-dark-nights'] },
  { dir: 'Daredevil/Miniseries/Road Warrior (2014)', series: ['daredevil-road-warrior'] },
  { dir: 'Daredevil/Miniseries/Daredevil-Punisher (2016)', series: ['daredevil-punisher'] },
  { dir: 'Daredevil/Miniseries/Woman Without Fear (2022)', series: ['daredevil-woman-without-fear'] },
  { dir: 'Daredevil/Miniseries/Daredevil & Echo (2023)', series: ['daredevil-echo'] },
  { dir: 'Daredevil/Miniseries/Black Armor (2024)', series: ['daredevil-black-armor'] },
  { dir: 'Daredevil/Miniseries/Gang War (2024)', series: ['daredevil-gang-war'] },
  { dir: 'Daredevil/Miniseries/Woman Without Fear (2024)', series: ['daredevil-woman-without-fear-v2'] },
  { dir: 'Daredevil/Miniseries/Unleash Hell (2025)', series: ['daredevil-unleash-hell'] },
  { dir: "Daredevil/Miniseries/The Devil's Trigger (2026)", series: ['daredevil-punisher-devils-trigger'] },
  { dir: 'Daredevil/Miniseries/Daredevil vs. Vapora (1993)', series: ['daredevil-vs-vapora'] },
  { dir: 'Daredevil/Miniseries/Daredevil-Batman (1997)', series: ['daredevil-batman'] },
  { dir: 'Daredevil/Miniseries/Batman-Daredevil (2000)', series: ['batman-daredevil'] },
  { dir: 'Daredevil/Miniseries/Noir (2009)', series: ['daredevil-noir'] },
  { dir: 'Daredevil/Miniseries/End of Days (2012)', series: ['daredevil-end-of-days'] },
  { dir: 'Daredevil/Miniseries/Cold Day in Hell (2025)', series: ['daredevil-cold-day-in-hell'] },
  { dir: 'Daredevil/Miniseries/Daredevil-Shi (1997)', series: ['daredevil-shi'] },
  { dir: 'Daredevil/Miniseries/The Movie (2003)', series: ['daredevil-the-movie'] },
  { dir: 'Daredevil/Miniseries/Daredevil 2099 (2004)', series: ['daredevil-2099'] },
  { dir: 'Daredevil/Miniseries/Season One (2012)', series: ['daredevil-season-one'] },
  { dir: 'Daredevil/Miniseries/Born Again (2026)', series: ['daredevil-born-again-2026'] },
  { dir: 'Invitados/Marvel Knights (2000)', series: ['marvel-knights'] },
  { dir: 'Invitados/Marvel Knights (2002)', series: ['marvel-knights-v2'] },
  { dir: 'Invitados/Defenders (2017)', series: ['defenders-v5'] },
  { dir: 'Invitados/War of the Realms', series: ['war-of-the-realms'] },
  { dir: 'Invitados/Hunt for Wolverine - Weapon Lost', series: ['hunt-for-wolverine-weapon-lost'] },
  { dir: 'Invitados/Dark Reign - The List - Daredevil', series: ['dark-reign-the-list-daredevil'] },
  { dir: 'Invitados/Marvel Graphic Novel', series: ['marvel-graphic-novel'] },
  { dir: 'Invitados/Elektra Lives Again', series: ['elektra-lives-again'] },
  { dir: 'Invitados/Shadowland - Elektra', series: ['shadowland-elektra'] },
  { dir: 'Invitados/Ghost Rider (1973)', series: ['ghost-rider-v2'] },
  { dir: 'Invitados/New Avengers (2010)', series: ['new-avengers-v2'] },
  // --- El arbol de Venom, desde 2026-09-12. Una carpeta por serie bajo Venom/
  // (Vol N, Annual, Miniseries/, Events/, Web of Venom/, y Carnage/ para su
  // rama). Lethal Protector 1993, Absolute Carnage y King in Black siguen en
  // Invitados/, donde los dejo el arbol de Spider-Man. Los invitados nuevos van
  // en Invitados/; Amazing Spider-Man vol. 7 y Symbiote Spider-Man, en la raiz,
  // como los libros de Spider-Man. Generado desde ~/comics-tools/ve_estante.py.
  { dir: 'Venom/Annual (2018)', series: ['venom-annual'] },
  { dir: 'Venom/Annual (2019)', series: ['venom-annual-v2'] },
  { dir: 'Venom/Annual (2023)', series: ['venom-annual-v3'] },
  { dir: 'Venom/Carnage/Carnage (2010)', series: ['carnage'] },
  { dir: 'Venom/Carnage/Carnage (2016)', series: ['carnage-v2'] },
  { dir: 'Venom/Carnage/Carnage (2022)', series: ['carnage-v3'] },
  { dir: 'Venom/Carnage/Carnage (2024)', series: ['carnage-v4'] },
  { dir: 'Venom/Carnage/Carnage - Black, White & Blood (2021)', series: ['carnage-black-white-and-blood'] },
  { dir: "Venom/Carnage/Carnage - It's a Wonderful Life (1996)", series: ['carnage-its-a-wonderful-life'] },
  { dir: 'Venom/Carnage/Carnage - Mind Bomb (1996)', series: ['carnage-mind-bomb'] },
  { dir: 'Venom/Carnage/Carnage Forever (2022)', series: ['carnage-forever'] },
  { dir: 'Venom/Carnage/Carnage Reigns Alpha (2023)', series: ['carnage-reigns-alpha'] },
  { dir: 'Venom/Carnage/Carnage Reigns Omega (2023)', series: ['carnage-reigns-omega'] },
  { dir: 'Venom/Carnage/Carnage, U.S.A. (2012)', series: ['carnage-usa'] },
  { dir: 'Venom/Carnage/Eddie Brock - Carnage (2025)', series: ['eddie-brock-carnage'] },
  { dir: 'Venom/Carnage/Scream - Curse of Carnage (2020)', series: ['scream-curse-of-carnage'] },
  { dir: 'Venom/Carnage/Superior Carnage (2013)', series: ['superior-carnage'] },
  { dir: 'Venom/Carnage/Superior Carnage Annual (2014)', series: ['superior-carnage-annual'] },
  { dir: 'Venom/Carnage/Toxin (2005)', series: ['toxin'] },
  { dir: 'Venom/Carnage/Web of Carnage (2023)', series: ['web-of-carnage'] },
  { dir: 'Venom/Events/Absolute Carnage - Lethal Protectors (2019)', series: ['absolute-carnage-lethal-protectors'] },
  { dir: 'Venom/Events/Absolute Carnage - Scream (2019)', series: ['absolute-carnage-scream'] },
  { dir: 'Venom/Events/Absolute Carnage - Separation Anxiety (2019)', series: ['absolute-carnage-separation-anxiety'] },
  { dir: 'Venom/Events/Amazing Spider-Man - Venom Inc. Alpha (2018)', series: ['amazing-spider-man-venom-inc-alpha'] },
  { dir: 'Venom/Events/Amazing Spider-Man - Venom Inc. Omega (2018)', series: ['amazing-spider-man-venom-inc-omega'] },
  { dir: 'Venom/Events/Amazing Spider-Man-Venom - Death Spiral (2026)', series: ['amazing-spider-man-venom-death-spiral'] },
  { dir: 'Venom/Events/Death Spiral - Body Count (2026)', series: ['amazing-spider-man-venom-death-spiral-body-count'] },
  { dir: 'Venom/Events/Death of the Venomverse (2023)', series: ['death-of-the-venomverse'] },
  { dir: 'Venom/Events/Edge of Venomverse (2017)', series: ['edge-of-venomverse'] },
  { dir: 'Venom/Events/Edge of Venomverse (2025)', series: ['edge-of-venomverse-v2'] },
  { dir: 'Venom/Events/Extreme Carnage - Agony (2021)', series: ['extreme-carnage-agony'] },
  { dir: 'Venom/Events/Extreme Carnage - Lasher (2021)', series: ['extreme-carnage-lasher'] },
  { dir: 'Venom/Events/Extreme Carnage - Phage (2021)', series: ['extreme-carnage-phage'] },
  { dir: 'Venom/Events/Extreme Carnage - Riot (2021)', series: ['extreme-carnage-riot'] },
  { dir: 'Venom/Events/Extreme Carnage - Scream (2021)', series: ['extreme-carnage-scream'] },
  { dir: 'Venom/Events/Extreme Carnage - Toxin (2021)', series: ['extreme-carnage-toxin'] },
  { dir: 'Venom/Events/Extreme Carnage Alpha (2021)', series: ['extreme-carnage-alpha'] },
  { dir: 'Venom/Events/Extreme Carnage Omega (2021)', series: ['extreme-carnage-omega'] },
  { dir: 'Venom/Events/Extreme Venomverse (2023)', series: ['extreme-venomverse'] },
  { dir: 'Venom/Events/King in Black - Gwenom vs. Carnage (2021)', series: ['king-in-black-gwenom-vs-carnage'] },
  { dir: 'Venom/Events/King in Black - Planet of the Symbiotes (2021)', series: ['king-in-black-planet-of-the-symbiotes'] },
  { dir: 'Venom/Events/King in Black - Scream (2021)', series: ['king-in-black-scream'] },
  { dir: 'Venom/Events/Queen in Black (2026)', series: ['queen-in-black'] },
  { dir: 'Venom/Events/Queen in Black - Venom Unchained (2026)', series: ['queen-in-black-venom-unchained'] },
  { dir: 'Venom/Events/Venom War (2024)', series: ['venom-war'] },
  { dir: 'Venom/Events/Venom War - Carnage (2024)', series: ['venom-war-carnage'] },
  { dir: 'Venom/Events/Venom War - Lethal Protectors (2024)', series: ['venom-war-lethal-protectors'] },
  { dir: 'Venom/Events/Venom War - Venomous (2024)', series: ['venom-war-venomous'] },
  { dir: 'Venom/Events/Venom War - Zombiotes (2024)', series: ['venom-war-zombiotes'] },
  { dir: 'Venom/Events/Venomized (2018)', series: ['venomized'] },
  { dir: 'Venom/Events/Venomverse (2017)', series: ['venomverse'] },
  { dir: 'Venom/Events/Venomverse - War Stories (2017)', series: ['venomverse-war-stories'] },
  { dir: 'Venom/Events/Venomverse Reborn (2024)', series: ['venomverse-reborn'] },
  { dir: 'Venom/Miniseries/All-New Venom (2025)', series: ['all-new-venom'] },
  { dir: 'Venom/Miniseries/Venom - Along Came a Spider (1996)', series: ['venom-along-came-a-spider'] },
  { dir: 'Venom/Miniseries/Venom - Black, White & Blood (2025)', series: ['venom-black-white-and-blood'] },
  { dir: 'Venom/Miniseries/Venom - Carnage Unleashed (1995)', series: ['venom-carnage-unleashed'] },
  { dir: 'Venom/Miniseries/Venom - Dark Origin (2008)', series: ['venom-dark-origin'] },
  { dir: 'Venom/Miniseries/Venom - First Host (2018)', series: ['venom-first-host'] },
  { dir: 'Venom/Miniseries/Venom - Funeral Pyre (1993)', series: ['venom-funeral-pyre'] },
  { dir: 'Venom/Miniseries/Venom - Lethal Protector (2022)', series: ['venom-lethal-protector-v2'] },
  { dir: 'Venom/Miniseries/Venom - Lethal Protector II (2023)', series: ['venom-lethal-protector-ii'] },
  { dir: 'Venom/Miniseries/Venom - License to Kill (1997)', series: ['venom-license-to-kill'] },
  { dir: 'Venom/Miniseries/Venom - Nights of Vengeance (1994)', series: ['venom-nights-of-vengeance'] },
  { dir: 'Venom/Miniseries/Venom - On Trial (1997)', series: ['venom-on-trial'] },
  { dir: 'Venom/Miniseries/Venom - Original Sin (2025)', series: ['venom-original-sin'] },
  { dir: 'Venom/Miniseries/Venom - Seed of Darkness (1997)', series: ['venom-seed-of-darkness'] },
  { dir: 'Venom/Miniseries/Venom - Separation Anxiety (1994)', series: ['venom-separation-anxiety'] },
  { dir: 'Venom/Miniseries/Venom - Separation Anxiety (2024)', series: ['venom-separation-anxiety-v2'] },
  { dir: 'Venom/Miniseries/Venom - Sign of the Boss (1997)', series: ['venom-sign-of-the-boss'] },
  { dir: 'Venom/Miniseries/Venom - Sinner Takes All (1995)', series: ['venom-sinner-takes-all'] },
  { dir: 'Venom/Miniseries/Venom - Space Knight (2016)', series: ['venom-space-knight'] },
  { dir: 'Venom/Miniseries/Venom - The End (2020)', series: ['venom-the-end'] },
  { dir: 'Venom/Miniseries/Venom - The Enemy Within (1994)', series: ['venom-enemy-within'] },
  { dir: 'Venom/Miniseries/Venom - The Finale (1997)', series: ['venom-the-finale'] },
  { dir: 'Venom/Miniseries/Venom - The Hunger (1996)', series: ['venom-the-hunger'] },
  { dir: 'Venom/Miniseries/Venom - The Hunted (1996)', series: ['venom-the-hunted'] },
  { dir: 'Venom/Miniseries/Venom - The Mace (1994)', series: ['venom-the-mace'] },
  { dir: 'Venom/Miniseries/Venom - The Madness (1993)', series: ['venom-the-madness'] },
  { dir: 'Venom/Miniseries/Venom - The Movie Prelude (2018)', series: ['venom-sony'] },
  { dir: 'Venom/Miniseries/Venom - Tooth and Claw (1996)', series: ['venom-tooth-and-claw'] },
  { dir: 'Venom/Miniseries/Venom 2099 (2020)', series: ['venom-2099'] },
  { dir: 'Venom/Miniseries/Venom Super Special (1995)', series: ['venom-super-special'] },
  { dir: 'Venom/Miniseries/Venom vs. Carnage (2004)', series: ['venom-vs-carnage'] },
  { dir: 'Venom/Vol 1 (2003)', series: ['venom'] },
  { dir: 'Venom/Vol 2 (2011)', series: ['venom-v2'] },
  { dir: 'Venom/Vol 3 (2017)', series: ['venom-v3'] },
  { dir: 'Venom/Vol 4 (2018)', series: ['venom-v4'] },
  { dir: 'Venom/Vol 5 (2022)', series: ['venom-v5'] },
  { dir: 'Venom/Vol 6 (2025)', series: ['venom-v6'] },
  { dir: 'Venom/Web of Venom/Carnage Born (2019)', series: ['web-of-venom-carnage-born'] },
  { dir: 'Venom/Web of Venom/Cult of Carnage (2019)', series: ['web-of-venom-cult-of-carnage'] },
  { dir: "Venom/Web of Venom/Empyre's End (2021)", series: ['web-of-venom-empyres-end'] },
  { dir: 'Venom/Web of Venom/Funeral Pyre (2019)', series: ['web-of-venom-funeral-pyre'] },
  { dir: 'Venom/Web of Venom/The Good Son (2020)', series: ['web-of-venom-the-good-son'] },
  { dir: 'Venom/Web of Venom/Unleashed (2019)', series: ['web-of-venom-unleashed'] },
  { dir: "Venom/Web of Venom/Ve'Nam (2018)", series: ['web-of-venom-venam'] },
  { dir: 'Venom/Web of Venom/Wraith (2020)', series: ['web-of-venom-wraith'] },
  { dir: 'Amazing Spider-Man Vol 7 (2025)', series: ['amazing-spider-man-v7'] },
  { dir: 'Invitados/Amazing Spider-Man Super Special (1995)', series: ['amazing-spider-man-super-special'] },
  { dir: 'Invitados/Anti-Venom - New Ways to Live (2009)', series: ['anti-venom-new-ways-to-live'] },
  { dir: 'Invitados/Free Comic Book Day 2019 (Spider-Man-Venom)', series: ['free-comic-book-day-2019-spider-man-venom'] },
  { dir: 'Invitados/Guardians of the Galaxy (2013)', series: ['guardians-of-the-galaxy-v3'] },
  { dir: 'Invitados/Minimum Carnage - Alpha (2012)', series: ['minimum-carnage-alpha'] },
  { dir: 'Invitados/Minimum Carnage - Omega (2013)', series: ['minimum-carnage-omega'] },
  { dir: 'Invitados/Red Goblin (2023)', series: ['red-goblin'] },
  { dir: 'Invitados/Scarlet Spider (2012)', series: ['scarlet-spider-v2'] },
  { dir: 'Invitados/Spectacular Spider-Man Super Special (1995)', series: ['spectacular-spider-man-super-special'] },
  { dir: 'Invitados/Spider-Man Super Special (1995)', series: ['spider-man-super-special'] },
  { dir: 'Invitados/X-Men - Blue (2017)', series: ['x-men-blue'] },
  { dir: 'Invitados/X-Men - Blue Annual (2018)', series: ['x-men-blue-annual'] },
  { dir: 'Symbiote Spider-Man/Symbiote Spider-Man (2019)', series: ['symbiote-spider-man'] },
  { dir: 'Symbiote Spider-Man/Symbiote Spider-Man - Alien Reality (2020)', series: ['symbiote-spider-man-alien-reality'] },
  { dir: 'Symbiote Spider-Man/Symbiote Spider-Man - Crossroads (2021)', series: ['symbiote-spider-man-crossroads'] },
  { dir: 'Symbiote Spider-Man/Symbiote Spider-Man - King in Black (2021)', series: ['symbiote-spider-man-king-in-black'] },
  { dir: 'Symbiote Spider-Man/Symbiote Spider-Man 2099 (2024)', series: ['symbiote-spider-man-2099'] },
]
