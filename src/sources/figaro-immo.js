const h = require('../helpers');

module.exports = {
  waitForSelector: '.container-items',
  parent: '.container-items .container-item',
  items: {
    url: { sel: '.item-type a', attr: 'href' },
    title: { sel: '.item-type a', attr: 'title' },
    image: { sel: '.item-classified-card img', attr: 'data-src' },
    price: { sel: '.price-label' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: value => value.replace(/^\//, 'https://immobilier.lefigaro.fr/'),
    price: h.cleanPrice,
  },
};
