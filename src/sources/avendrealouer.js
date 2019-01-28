const _ = require('lodash');

module.exports = {
  timeout: 20 * 1000,
  waitForNavigation: true,
  parent: '#ResultList > div > li',
  items: {
    title: { sel: 'a', attr: 'alt' },
    url: { sel: 'a', attr: 'href' },
    image: { sel: 'div > a > img', attr: 'data-url-img' },
    price: { sel: '.price' },
    // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
    // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
  },
  filter: ({ url }) => !!url,
  mapResults: result => ({
    ...result,
    url: `https://www.avendrealouer.fr${result.url}`,
    id: result.url.match(/-([0-9]+)\.htm/)[1],
    title: _.trim(result.title).replace(/( |\n|\t|\r)+/gi, ' '),
    price: result.price.replace(/[^0-9]/g, ''),
    image: result.image,
    // time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }),
};
