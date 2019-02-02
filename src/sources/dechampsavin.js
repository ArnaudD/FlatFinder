const _ = require('lodash');

module.exports = {
  waitForSelector: '#listing_bien',
  parent: '#listing_bien .grid__item',
  items: {
    url: { sel: '.meta__title a', attr: 'href' },
    title: { sel: '.meta__title a' },
    image: { sel: '.slider__item', attr: 'style' },
    price: { sel: '.meta__price' },
  },
  filter: ({ url }) => !!url,
  mapResults: result => ({
    ...result,
    // id: result.id.replace(/[^0-9]/g, ''),
    url: result.url.replace('..', 'http://www.dechampsavin.net'),
    title: _.trim(result.title).replace(/( |\n|\t|\r)+/gi, ' '),
    price: result.price.replace(/€(.|\n)*/gm, '').replace(/[^0-9]/g, ''),
    image: result.image.replace(/.*url\(\.\./, 'http://www.dechampsavin.net').replace(/\).*/, ''),
  }),
};
