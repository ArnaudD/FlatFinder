const h = require('../helpers');

module.exports = {
  waitForSelector: '.immobilier-search-list',
  parent: '.immobilier-search-list > .list-item',
  items: {
    url: { sel: 'h2 > a', attr: 'href' },
    title: { sel: 'h2 > a', attr: 'title' },
    image: { sel: '.thumb img', attr: 'src' },
    price: { sel: '.prix-reference > .prix' },
  },
  mapItem: {
    url: [h.prefix('https://www.lefeuvre-immobilier.com/'), h.removeQueryParams],
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
  },
};
