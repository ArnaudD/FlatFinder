const h = require('../helpers');

module.exports = {
  waitForSelector: '#listing_bien',
  parent: '#listing_bien .col-vignettes',
  items: {
    url: { sel: 'a', attr: 'href' },
    // TODO...
    // title: { sel: '.descriptif' },
    // image: { sel: '.image img', attr: 'src' },
    // price: { sel: '.price' },
  },
  mapItem: {
    //   url: [
    //     h.prefix('https://www.chambre-loire-atlantique.notaires.fr'),
    //     h.removeQueryParams,
    //   ],
    //   title: [
    //     h.trim,
    //     h.cleanSpaces,
    //     value => value.replace(/^.*\/ /, ''), value => value.slice(0, 60),
    //     value => `${value}...`,
    //   ],
    //   image: h.prefix('https://www.chambre-loire-atlantique.notaires.fr'),
    //   price: h.cleanPrice,
  },
};
