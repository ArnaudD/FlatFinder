const _ = require('lodash');

module.exports = {
  waitForSelector: '.liste_resultat',
  parent: '.liste_resultat .c-pa-list.c-pa-sl.cartouche',
  items: {
    title: { sel: '.c-pa-criterion' },
    url: { sel: '.c-pa-link', attr: 'href' },
    image: { sel: '.c-pa-imgs .slideContent > a > div', attr: 'data-lazy' },
    price: { sel: '.c-pa-price' },
    // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
    // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
  },
  mapItem: result => ({
    ...result,
    url: result.url.replace(/\.htm.*/, '.htm'),
    id: result.url.match(/\/([0-9]+)\.htm/)[1],
    title: _.trim(result.title).replace(/( |\n|\t|\r)+/gi, ' '),
    price: result.price.replace(/[^0-9]/g, ''),
    image: result.image && JSON.parse(result.image).url,
    // time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }),
};
