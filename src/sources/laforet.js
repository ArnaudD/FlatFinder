const compose = require('lodash/fp/compose');
const h = require('../helpers');

module.exports = {
  waitForSelector: '.results-compact',
  parent: '.results-compact li',
  items: 'data-json',
  filter: data => data,
  mapItem: data => {
    const json = JSON.parse(data);
    return {
      title: json.title,
      price: compose(h.cleanPrice)(json.price),
      url: `http://www.laforet.com${json.url}`,
      image: json.imageUrl,
    };
  },
};
