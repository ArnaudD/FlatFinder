const _ = require('lodash');

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
  mapItem: result => ({
    ...result,
    url: `https://www.thierry-immobilier.fr${result.url.replace(/\?.*/, '')}`,
    id: result.url.match(/-([^-]*)\?/)[1],
    title: _.trim(result.title).replace(/( |\n|\t|\r)+/gi, ' '),
    price: result.price.replace(/,(.|\n)*/gm, '').replace(/[^0-9]/g, ''),
  }),
};
