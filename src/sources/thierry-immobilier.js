const h = require('../helpers');

module.exports = {
  waitForSelector: '.immobilier-search-results',
  parent: '.immobilier-search-results article.teaser',
  items: {
    title: { sel: 'h3.teaser__title' },
    id: { sel: '.post-active', attr: 'id' },
    url: { sel: 'a', attr: 'href' },
    image: { sel: 'img', attr: 'src' },
    price: { sel: '.teaser__price' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: [h.prefix('https://www.thierry-immobilier.fr'), h.removeQueryParams],
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
  },
};
