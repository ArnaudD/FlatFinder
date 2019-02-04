const h = require('../helpers');

module.exports = {
  waitForSelector: '#poulpiquet-index-items',
  parent: '#poulpiquet-index-items article',
  items: {
    url: { sel: 'a', attr: 'href' },
    title: { sel: '.item-text > h2' },
    image: { sel: '.item-top > img', attr: 'src' },
    price: { sel: '.item-text > p > span:nth-child(3)' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    price: h.cleanPrice,
  },
};
