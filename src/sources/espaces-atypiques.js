const _ = require('lodash');

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
  mapResults: result => ({
    ...result,
    id: result.id.replace(/[^0-9]/g, ''),
    title: _.trim(result.title).replace(/( |\n|\t|\r)+/gi, ' '),
    price: result.price.replace(/€(.|\n)*/gm, '').replace(/[^0-9]/g, ''),
  }),
};
