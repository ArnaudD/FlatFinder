const h = require('../helpers');

module.exports = {
  waitForSelector: '.grid.annonces',
  parent: '.grid.annonces article',
  items: {
    title: { sel: 'img', attr: 'alt' },
    id: { sel: '.post-active', attr: 'id' },
    url: { sel: 'a.image-link', attr: 'href' },
    image: { sel: '.post-single-preview > img', attr: 'data-lazy-src' },
    price: { sel: '.price' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
  },
};
