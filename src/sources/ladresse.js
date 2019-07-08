const h = require('../helpers');

module.exports = {
  waitForSelector: '.item-listing',
  parent: '.item-listing',
  items: {
    url: { sel: 'a', attr: 'href' },
    title: { sel: 'a', attr: 'title' },
    image: { sel: '.item-picture', attr: 'style' },
    price: { sel: '.item-price' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: [value => value.replace('..', 'http://www.ladresse.com'), h.removeQueryParams],
    // title: [ h.trim, h.cleanSpaces ],
    price: h.cleanPrice,
    image: value => value.replace(/.*url\('\.\./, 'http://www.ladresse.com').replace(/'.*/, ''),
  },
};
