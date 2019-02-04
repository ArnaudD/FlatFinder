const h = require('../helpers');

module.exports = {
  timeout: 20 * 1000,
  waitForNavigation: true,
  parent: '#ResultList > div > li',
  items: {
    title: { sel: 'a', attr: 'alt' },
    url: { sel: 'a', attr: 'href' },
    image: { sel: 'div > a > img', attr: 'data-url-img' },
    price: { sel: '.price' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: [h.prefix('https://www.avendrealouer.fr'), h.removeQueryParams],
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
  },
};
