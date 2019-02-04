const _ = require('lodash');

module.exports = {
  waitForSelector: '#listing-biens > div:nth-last-of-type(2) .b-lazy.b-loaded',
  parent: '#listing-biens > div.col-sm-6',
  items: {
    title: { sel: 'h4' },
    url: { sel: 'a', attr: 'href' },
    image: { sel: '.container-aper > div', attr: 'style' },
    price: { sel: '.container-prix' },
  },
  mapItem: result => ({
    ...result,
    url: `https://www.citya.com${result.url}`,
    title: _.trim(result.title),
    id: result.url.match(/\/(.*)\./)[1],
    image: (result.image || '').replace(/.*url\("/, '').replace(/"\).*/, ''),
    price: (result.price || '0').match(/([0-9]+)/)[1],
  }),
};
