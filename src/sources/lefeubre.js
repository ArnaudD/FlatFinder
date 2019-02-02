const _ = require('lodash');

module.exports = {
  waitForSelector: '.immobilier-search-list',
  parent: '.immobilier-search-list > .list-item',
  items: {
    url: { sel: 'h2 > a', attr: 'href' },
    title: { sel: 'h2 > a', attr: 'title' },
    image: { sel: '.thumb img', attr: 'src' },
    price: { sel: '.prix-reference > .prix' },
  },
  // filter: ({ url }) => /^\/annonces\//.test(url),
  mapResults: result => ({
    ...result,
    id: result.url.match(/-ref-(.*)\?/)[1],
    price: result.price.replace(/[^0-9]/g, ''),
    url: `https://www.lefeuvre-immobilier.com/${result.url.replace(/\?.*/, '')}`,
  }),
};
