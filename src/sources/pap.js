const h = require('../helpers');

module.exports = {
  waitForSelector: '.search-results-list',
  parent: '.search-results-list > .search-list-item',
  items: {
    title: { sel: 'a.item-title > .h1' },
    // content: { sel: '.item-description' },
    url: { sel: 'a.item-title', attr: 'href' },
    image: { sel: '.thumb img', attr: 'src' },
    price: { sel: '.item-price' },
    // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
    // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
  },
  filter: ({ url }) => /^\/annonces\//.test(url),
  mapItem: {
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
    url: h.prefix('https://www.pap.fr'),
  },
};
