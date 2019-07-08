const _ = require('lodash');

module.exports = {
  evaluate: () => {
    return window.__REDIAL_PROPS__[4].data.ads;
  },
  mapItem: result => ({
    url: result.url,
    title: _.trim(result.subject),
    price: _.get(result, ['price', 0]),
    time: result.first_publication_date,
    image: _.get(result, ['images', 'urls_large', 0]),
  }),
};
