const h = require('../helpers');

module.exports = {
  waitForSelector: '.search-listing-result',
  parent: '.listing-item.search-listing-result__item',
  items: {
    url: { sel: 'a', attr: 'href' },
    title: { sel: '.listing-caracteristic' },
    image: { sel: 'img', attr: 'src' },
    price: { sel: '.listing-price' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: h.prefix('https://www.meilleursagents.com'),
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
  },
};
