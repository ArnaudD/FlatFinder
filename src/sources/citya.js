const h = require('../helpers');

module.exports = {
  waitForSelector: '#listing-biens > div:nth-last-of-type(2) .b-lazy.b-loaded',
  parent: '#listing-biens > div.col-sm-6',
  items: {
    title: { sel: 'h4' },
    url: { sel: 'a', attr: 'href' },
    image: { sel: '.container-aper > div', attr: 'style' },
    price: { sel: '.container-prix' },
  },
  mapItem: {
    url: [h.prefix('https://www.citya.com'), h.removeQueryParams],
    title: [h.trim, h.cleanSpaces],
    image: value => (value || '').replace(/.*url\("/, '').replace(/"\).*/, ''),
    price: value => h.cleanPrice(value || '0'),
  },
};
