const h = require('../helpers');

module.exports = {
  waitForSelector: 'ul.liste',
  parent: 'ul.liste li.item',
  items: {
    title: { sel: 'h3 a' },
    url: { sel: 'h3 a', attr: 'href' },
    image: { sel: '.itemImage > a > img', attr: 'src' },
    price: { sel: 'h4' },
    // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
    // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: h.prefix('http://www.fnaim.fr'),
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
  },
};
