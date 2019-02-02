const _ = require('lodash');

module.exports = {
  waitForSelector: '.search-results-list',
  parent: '.search-results-list > .search-list-item',
  items: {
    title: { sel: 'a.item-title > .h1' },
    // content: { sel: '.item-description' },
    url: { sel: 'a.item-title', attr: 'href' },
    image: { sel: '.thumb img', attr: 'src' },
    price: { sel: '.item-price' },
    // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
    // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
  },
  filter: ({ url }) => /^\/annonces\//.test(url),
  mapResults: result => ({
    ...result,
    title: _.trim(result.title),
    // content: _.trim((result.content || '').replace(/\t/g, '').replace('\n\n', '\n')),
    // id: result.url.match(/r([0-9]+)$/)[1],
    price: result.price.replace(/[^0-9]/g, ''),
    url: `https://www.pap.fr${result.url}`,
    // time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }),
};
