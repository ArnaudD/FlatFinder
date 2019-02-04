const h = require('../helpers');

module.exports = {
  waitForSelector: '.immobilier-search-list',
  parent: '.immobilier-search-list > div > article',
  items: {
    url: { sel: 'a', attr: 'href' },
    title: { sel: 'img', attr: 'alt' },
    image: { sel: 'img', attr: 'src' },
    price: { sel: '.price strong' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: [h.prefix('https://www.bras-immobilier.fr'), h.removeQueryParams],
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
  },
};
