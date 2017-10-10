import _ from 'lodash';

export default {
  waitForSelector: '.search-results-list',
  parent: '.search-results-list > .search-results-item',
  items: {
    title: { sel: 'a.title-item > .h1' },
    content: { sel: '.item-description' },
    url: { sel: 'a.title-item', attr: 'href' },
    image: { sel: '.thumb img', attr: 'src' },
    price: { sel: '.price' },
    // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
    // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
  },
  mapResults: result => ({
    ...result,
    title: _.trim(result.title),
    content: _.trim((result.content || '').replace(/\t/g, '').replace("\n\n", "\n")),
    id: result.url.match(/r([0-9]+)$/)[1],
    price: result.price.match(/([0-9]+)/)[1],
    url: `https://www.pap.fr${result.url}`,
    // time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }),
};
