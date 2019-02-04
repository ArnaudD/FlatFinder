const h = require('../helpers');

module.exports = {
  waitForSelector: '#listing_bien',
  parent: '#listing_bien .grid__item',
  items: {
    url: { sel: '.meta__title a', attr: 'href' },
    title: { sel: '.meta__title a' },
    image: { sel: '.slider__item', attr: 'style' },
    price: { sel: '.meta__price' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: [
      value => value.replace('..', ''),
      h.prefix('http://www.dechampsavin.net'),
      h.removeQueryParams,
    ],
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
    image: value => value.replace(/.*url\(\.\./, 'http://www.dechampsavin.net').replace(/\).*/, ''),
  },
};
