const h = require('../helpers');

module.exports = {
  // waitForSelector: '.offer-list-row',
  parent: '.offer-block',
  items: {
    url: { sel: '.offer-link', attr: 'href' },
    title: { sel: '.offer-link', attr: 'title' },
    image: { sel: '.thumb-link.offer-link.default-picture img', attr: 'data-original' },
    price: { sel: '.offer-price' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    // url: [h.prefix('https://www.chambre-loire-atlantique.notaires.fr'), h.removeQueryParams],
    // title: [
    //   h.trim,
    //   h.cleanSpaces,
    //   value => value.replace(/^.*\/ /, ''),
    //   value => value.slice(0, 60),
    //   value => `${value}...`,
    // ],
    // image: h.prefix('https://www.chambre-loire-atlantique.notaires.fr'),
    // price: h.cleanPrice,
  },
};
