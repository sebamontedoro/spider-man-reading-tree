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

  // Los tomos de "Worldwide" son la unica forma en que existe el vol. 4 #1-32:
  // getcomics no tiene esos numeros sueltos, y el pack de la run entrega los
  // tomos desarmados en JPG. Empaquetados como .cbz, los siete primeros cubren
  // esos treinta y dos numeros enteros.
  //
  // Los cortes se leyeron tomo por tomo sobre hojas de contacto de todas sus
  // paginas: la tapa de cada numero es inconfundible entre las paginas de
  // historia. Por eso las paginas del .cbz se renombraron a un contador al
  // empaquetarlas — asi el numero que se conto es el que el lector sirve.
  {
    file: 'Collected Editions/Amazing Spider-Man - Worldwide v01 (Digital) (GetComics).cbz',
    // Amazing Spider-Man (vol. 4) #1-5.
    // Empieza con tres paginas de portada y creditos; #1 es doble.
    parts: [
      { id: 'amazing-spider-man-v4-1', from: 4,   to: 34 },
      { id: 'amazing-spider-man-v4-2', from: 35,  to: 53 },
      { id: 'amazing-spider-man-v4-3', from: 54,  to: 74 },
      { id: 'amazing-spider-man-v4-4', from: 75,  to: 95 },
      { id: 'amazing-spider-man-v4-5', from: 96,  to: 115 },
    ],
  },
  {
    file: 'Collected Editions/Amazing Spider-Man - Worldwide v02 (Digital) (GetComics).cbz',
    // Amazing Spider-Man (vol. 4) #6-11.
    parts: [
      { id: 'amazing-spider-man-v4-6', from: 4,   to: 24 },
      { id: 'amazing-spider-man-v4-7', from: 25,  to: 44 },
      { id: 'amazing-spider-man-v4-8', from: 45,  to: 64 },
      { id: 'amazing-spider-man-v4-9', from: 65,  to: 85 },
      { id: 'amazing-spider-man-v4-10', from: 86,  to: 106 },
      { id: 'amazing-spider-man-v4-11', from: 107, to: 124 },
    ],
  },
  {
    file: 'Collected Editions/Amazing Spider-Man - Worldwide v03 (Digital) (GetComics).cbz',
    // Amazing Spider-Man (vol. 4) #12-15.
    // Cada numero abre con su tapa y sigue con una pagina de titulo, y
    // cierra con una de "EXT:". Despues del #15 vienen un articulo, un
    // relato de complemento y un anual de reprints, que no son de la run.
    parts: [
      { id: 'amazing-spider-man-v4-12', from: 3,   to: 24 },
      { id: 'amazing-spider-man-v4-13', from: 25,  to: 46 },
      { id: 'amazing-spider-man-v4-14', from: 47,  to: 66 },
      { id: 'amazing-spider-man-v4-15', from: 67,  to: 87 },
    ],
  },
  {
    file: 'Collected Editions/Amazing Spider-Man - Worldwide v04 (Digital) (GetComics).cbz',
    // Amazing Spider-Man (vol. 4) #16-19.
    // Abre con la historia del Free Comic Book Day 2016, que no es un
    // numero de la run: por eso el #16 no empieza hasta la pagina 12.
    parts: [
      { id: 'amazing-spider-man-v4-16', from: 12,  to: 31 },
      { id: 'amazing-spider-man-v4-17', from: 32,  to: 55 },
      { id: 'amazing-spider-man-v4-18', from: 56,  to: 76 },
      { id: 'amazing-spider-man-v4-19', from: 77,  to: 100 },
    ],
  },
  {
    file: 'Collected Editions/Amazing Spider-Man - Worldwide v05 (Digital) (GetComics).cbz',
    // Amazing Spider-Man (vol. 4) #20-24.
    // Cierra con el Annual #1 de 2016, que el arbol no indexa.
    parts: [
      { id: 'amazing-spider-man-v4-20', from: 3,   to: 23 },
      { id: 'amazing-spider-man-v4-21', from: 24,  to: 46 },
      { id: 'amazing-spider-man-v4-22', from: 47,  to: 67 },
      { id: 'amazing-spider-man-v4-23', from: 68,  to: 89 },
      { id: 'amazing-spider-man-v4-24', from: 90,  to: 110 },
    ],
  },
  {
    file: 'Collected Editions/Amazing Spider-Man - Worldwide v06 (Digital) (GetComics).cbz',
    // Amazing Spider-Man (vol. 4) #25-28.
    // #25 es un numero gigante, de ahi que ocupe 37 paginas.
    parts: [
      { id: 'amazing-spider-man-v4-25', from: 5,   to: 41 },
      { id: 'amazing-spider-man-v4-26', from: 42,  to: 61 },
      { id: 'amazing-spider-man-v4-27', from: 62,  to: 82 },
      { id: 'amazing-spider-man-v4-28', from: 83,  to: 102 },
    ],
  },
  {
    file: 'Collected Editions/Amazing Spider-Man - Worldwide v07 (Digital) (GetComics).cbz',
    // Amazing Spider-Man (vol. 4) #29-32.
    // Trae ademas #789-791, que no se listan: de esos hay archivos
    // sueltos en el estante y un archivo cortado a un numero le gana a una
    // rebanada de un tomo.
    parts: [
      { id: 'amazing-spider-man-v4-29', from: 4,   to: 25 },
      { id: 'amazing-spider-man-v4-30', from: 26,  to: 46 },
      { id: 'amazing-spider-man-v4-31', from: 47,  to: 69 },
      { id: 'amazing-spider-man-v4-32', from: 70,  to: 90 },
    ],
  },
  {
    file: 'Collected Editions/Ultimate Comics Spider-Man - Death of Spider-Man Fallout (Digital) (Kileko-Empire).cbr',
    // Ultimate Fallout #1-6. Ninguno de los seis existe suelto.
    // 142 paginas: dos de tomo y seis numeros de 22 a 24, leidos portada por
    // portada. Lo confirma la historia: en la 92, dentro del #4, aparece Miles.
    parts: [
      { id: 'ultimate-fallout-1', from: 3,   to: 25 },
      { id: 'ultimate-fallout-2', from: 26,  to: 47 },
      { id: 'ultimate-fallout-3', from: 48,  to: 70 },
      { id: 'ultimate-fallout-4', from: 71,  to: 94 },
      { id: 'ultimate-fallout-5', from: 95,  to: 118 },
      { id: 'ultimate-fallout-6', from: 119, to: 142 },
    ],
  },
  {
    file: 'Collected Editions/New Avengers - Breakout v01 (2005) (Digital) (GetComics).cbz',
    // New Avengers #1-6, el arco Breakout. El pack de la run completa son diez
    // piezas de ~2 GB para conseguir estos seis numeros; el tomo pesa 178 MB.
    // Las anclas son los seis creditos \"BREAKOUT! PART N\". Ojo con la del #3:
    // con miniaturas chicas la lei en la 44 y es la 45, lo que daba un #3 de 14
    // paginas y un #4 de 32 — imposibles, y eso fue lo que delato el error.
    parts: [
      { id: 'new-avengers-1', from: 3,   to: 22 },
      { id: 'new-avengers-2', from: 23,  to: 44 },
      { id: 'new-avengers-3', from: 45,  to: 66 },
      { id: 'new-avengers-4', from: 67,  to: 89 },
      { id: 'new-avengers-5', from: 90,  to: 108 },
      { id: 'new-avengers-6', from: 109, to: 132 },
    ],
  },
  {
    file: 'Collected Editions/Original Sin by Aaron & Deodato (2014) (Digital) (GetComics).cbr',
    // Del evento el arbol solo pide el #1. El post traia dos escaneos: uno de
    // 637 paginas con el evento y todos sus tie-ins, y este de 226 que es solo
    // la serie principal. La portada del #2 esta en la 72.
    parts: [
      { id: 'original-sin-1', from: 45, to: 71 },
    ],
  },
  {
    file: 'Collected Editions/Ultimate Invasion (2024) (Digital) (Shan-Empire).cbz',
    // Ultimate Invasion #1. Su post suelto quedo caido en las tres vias que
    // ofrece, asi que este tomo fue la unica fuente; bajo por Pixeldrain.
    //
    // Solo se lista el #1. Del #2 al #4 hay archivos sueltos en el estante, y
    // sus fronteras no se leen con confianza: la distancia entre el divisor
    // numerado de cada numero y su pagina \"CHAPTER\" cambia (0, 3 y 7
    // paginas), asi que interpolarlas seria adivinar. La del #1 si esta leida:
    // la 50 es la variante del #1 y la 51 el divisor del #2.
    parts: [
      { id: 'ultimate-invasion-1', from: 4, to: 50 },
    ],
  },
]
