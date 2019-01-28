const _ = require('lodash');

module.exports = {
  evaluate: () => {
    return window.FLUX_STATE.adSearch.data.ads;
  },
  mapResults: result => ({
    ...result,
    title: _.trim(result.subject),
    price: _.get(result, ['price', 0]),
    id: result.list_id,
    time: result.first_publication_date,
    image: _.get(result, ['images', 'urls_large', 0]),
  }),
};
