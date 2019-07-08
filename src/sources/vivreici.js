const h = require('../helpers');

module.exports = {
  waitForSelector: '#listing_bien',
  parent: '.grid__item',
  items: {
    url: { sel: 'h3.meta__title a', attr: 'href' },
    title: { sel: 'h3.meta__title a' },
    image: { sel: '.slider__item', attr: 'style' },
    price: { sel: '.meta__price' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: [
      h.prefix('https://www.vivreici.com'),
      value => value.replace('..', ''),
      h.removeQueryParams,
    ],
    title: [h.trim, h.cleanSpaces],
    image: value =>
      (value || '')
        .replace(/.*url\(/, '')
        .replace(/\).*/, '')
        .replace('..', 'https://www.vivreici.com'),
    price: h.cleanPrice,
  },
};
