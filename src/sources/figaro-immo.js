const _ = require('lodash');

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
  mapItem: result => ({
    ...result,
    url: result.url.replace(/^\//, 'https://immobilier.lefigaro.fr/'),
    price: result.price.replace(/€(.|\n)*/gm, '').replace(/[^0-9]/g, ''),
  }),
};
