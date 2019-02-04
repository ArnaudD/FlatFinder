const h = require('../helpers');

module.exports = {
  waitForSelector: '.liste_resultat',
  parent: '.liste_resultat .c-pa-list.c-pa-sl.cartouche',
  items: {
    title: { sel: '.c-pa-criterion' },
    url: { sel: '.c-pa-link', attr: 'href' },
    image: { sel: '.c-pa-imgs .slideContent > a > div', attr: 'data-lazy' },
    price: { sel: '.c-pa-price' },
  },
  mapItem: {
    url: h.removeQueryParams,
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
    image: value => value && JSON.parse(value).url,
  },
};
