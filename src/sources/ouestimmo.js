const _ = require('lodash');

module.exports = {
  waitForSelector: '#listAnnonces',
  parent: '#listAnnonces > a',
  items: {
    title: { sel: '.annTitre' },
    address: { sel: '.annAdresse' },
    url: { attr: 'href' },
    image: { sel: '.annPhoto', attr: 'data-original' },
    price: { sel: '.annPrix' },
    // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
    // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
  },
  mapResults: result => ({
    ...result,
    title: _.trim(result.title),
    id: result.url.match(/([0-9]+)\.htm/)[1],
    price: result.price.replace(/[^0-9]/g, ''),
    url: `https://www.ouestfrance-immo.com${result.url}`,
    // time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }),
};
