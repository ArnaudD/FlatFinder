import _ from 'lodash';

export default {
  waitForSelector: '.tabsContent',
  parent: '.tabsContent li',
  items: {
    title: {sel: 'h2.item_title'},
    url: {sel: 'a', attr: 'href'},
    image: {sel: '.item_imagePic > span', attr: 'data-imgSrc' },
    price: {sel: '.item_price', attr:  'content'},
    date: {sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content'},
    time: {sel: '.item_supp[itemprop="availabilityStarts"]'},
  },
  mapResults: result => ({
    ...result,
    url: `https:${result.url}`,
    title: _.trim(result.title),
    id: result.url.match(/locations\/(.*)\./)[1],
    time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }),
};
