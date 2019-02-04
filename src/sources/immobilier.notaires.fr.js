const h = require('../helpers');

module.exports = {
  waitForSelector: '.prix_bien',
  parent: '.resultats.mode_liste .resultat',
  items: {
    url: { sel: 'h2 a', attr: 'href' },
    title: { sel: '.bloc_visuel img', attr: 'alt' },
    image: { sel: '.bloc_visuel img', attr: 'src' },
    price: { sel: '.prix_bien' },
  },
  filter: ({ url }) => !!url,
  disable: {
    script: false,
  },
  mapItem: {
    url: h.removeQueryParams,
    title: [h.trim, h.cleanSpaces, value => value.replace(/^.*\/ /, '')],
    price: h.cleanPrice,
  },
};
