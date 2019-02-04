const h = require('../helpers');

module.exports = {
  waitForSelector: '#listAnnonces',
  parent: '#listAnnonces > a',
  items: {
    title: { sel: '.annTitre' },
    address: { sel: '.annAdresse' },
    url: { attr: 'href' },
    image: { sel: '.annPhoto', attr: 'data-original' },
    price: { sel: '.annPrix' },
  },
  mapItem: {
    title: [h.trim, h.cleanSpaces],
    price: h.cleanPrice,
    url: h.prefix('https://www.ouestfrance-immo.com'),
  },
};
