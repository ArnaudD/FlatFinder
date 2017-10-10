import _ from 'lodash';

export default {
  waitForSelector: 'ul.liste',
  parent: 'ul.liste li.item',
  items: {
    title: { sel: 'h3 a' },
    url: { sel: 'h3 a', attr: 'href' },
    image: { sel: '.itemImage > a > img', attr: 'src' },
    price: { sel: 'h4' },
    // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
    // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
  },
  mapResults: result => ({
    ...result,
    title: _.trim(result.title),
    id: result.url.match(/\/([0-9]+)\//)[1],
    price: result.price.match(/([0-9]+)/)[1],
    url: `http://www.fnaim.fr${result.url}`,
    // time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }),
}
