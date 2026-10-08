// Catalogue for the site, built from the real photographed pieces (assets/js/systems.js)
// and The Polo (assets/js/look.js). Prices are placeholders.
const SYS = window.DOZI.systems;
const LOOK = window.DOZI.look;
const CAT = { outerwear: 'Outerwear', tops: 'Tops', bottoms: 'Trousers', dresses: 'Dresses', footwear: 'Footwear', bags: 'Bags' };
const SWATCH = { navy: 'var(--navy)', burgundy: 'var(--burgundy)', denim: 'var(--denim-500)', indigo: 'var(--denim-800)', olive: 'var(--olive)', mixed: 'var(--ink-900)',
  black: 'var(--ink-900)', oxide: 'var(--oxide)', chocolate: 'var(--chocolate)', cobalt: '#2C468C', cream: 'var(--cream)' };

const POLO = {
  id: 'the-polo', name: 'The Polo', detail: 'Navy / Heavy Cotton Piqué', price: LOOK ? 68000 : 68000, from: true, tag: 'Design it', cat: 'Tops', polo: true,
  image: 'assets/img/studio/base/polo-short-navy-brass.jpg', hover: 'assets/img/studio/base/polo-long-oxide-brass.jpg',
  blurb: 'An oversized, heavyweight polo cut as a base. The collar and sleeves zip off, the side seams take panels, the chest takes a pocket and the hem loop takes a charm or a strap.',
};

const DOZI_DATA = {
  img: { snap: 'assets/img/detail-snap.jpg', zip: 'assets/img/detail-zip.jpg', label: 'assets/img/detail-label.jpg', hangtag: 'assets/img/detail-hangtag.jpg',
    zipSystem: 'assets/img/kit/detail-zip-system.jpg', pocket: 'assets/img/kit/detail-pocket.jpg', signature: 'assets/img/kit/detail-signature.jpg' },
  products: [POLO].concat(SYS.list.map(s => ({
    id: s.id, name: s.name, detail: SYS.COLOURS[s.colours[0]].name + ' / ' + s.material.split(' / ')[0], price: s.price, from: true,
    tag: s.colours.length > 1 ? s.colours.length + ' colours' : s.versions.length + ' versions', cat: CAT[s.cat], system: s,
    image: SYS.img(s, s.colours[0], 0), hover: SYS.img(s, s.colours[0], s.versions.length - 1), blurb: s.blurb,
  }))),
  cats: [['All', 'stitch'], ['Outerwear', 'zip'], ['Tops', 'button'], ['Trousers', 'buckle'], ['Dresses', 'needle'], ['Footwear', 'pin'], ['Bags', 'tag']],
  chapters: [
    { n: '01', name: 'Navy', color: 'var(--navy)', go: ['product', 'the-polo'] },
    { n: '02', name: 'Burgundy', color: 'var(--burgundy)', go: ['product', 'dress'] },
    { n: '03', name: 'Indigo', color: 'var(--denim-800)', go: ['product', 'suit'] },
    { n: '04', name: 'Deep Olive', color: 'var(--olive)', go: ['product', 'jacket'] },
  ],
  verbs: [['Detach', 'zip'], ['Attach', 'button'], ['Swap', 'buckle'], ['Adapt', 'pin'], ['Express', 'needle']],
  swatch: SWATCH,
};
window.DOZI_DATA = DOZI_DATA;
