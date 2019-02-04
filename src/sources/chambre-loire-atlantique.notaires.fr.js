const h = require('../helpers');

module.exports = {
  waitForSelector: '.listing-result',
  parent: '.listing-result > div > div > div',
  items: {
    url: { sel: 'a.image-liste', attr: 'href' },
    title: { sel: '.descriptif' },
    image: { sel: '.image img', attr: 'src' },
    price: { sel: '.price' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: [h.prefix('https://www.chambre-loire-atlantique.notaires.fr'), h.removeQueryParams],
    title: [
      h.trim,
      h.cleanSpaces,
      value => value.replace(/^.*\/ /, ''),
      value => value.slice(0, 60),
      value => `${value}...`,
    ],
    image: h.prefix('https://www.chambre-loire-atlantique.notaires.fr'),
    price: h.cleanPrice,
  },
};
