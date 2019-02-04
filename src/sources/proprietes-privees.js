const h = require('../helpers');

module.exports = {
  waitForSelector: '.annonce',
  parent: '.annonce',
  items: {
    url: { attr: 'href' },
    image: { sel: 'img', attr: 'src' },
    title: { sel: 'img', attr: 'alt' },
    price: { sel: '.price' },
  },
  mapItem: {
    url: h.prefix('http://proprietes-privees.com'),
    price: h.cleanPrice,
  },
};
