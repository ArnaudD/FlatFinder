const h = require('../helpers');

module.exports = {
  cookies: [
    {
      name: 'SquareHabitat',
      value: 'knm40xz0wc3flwfiohx0gqih',
      domain: 'www.squarehabitat.fr',
    },
  ],
  waitForSelector: '.row.blocs-biens',
  parent: '.row.blocs-biens > div.row > .col-md-4.to-animate',
  items: {
    url: { sel: 'a', attr: 'href' },
    title: { sel: 'h4' },
    image: { sel: 'h3 img', attr: 'src' },
    price: { sel: '.prix-vignette' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: h.prefix('https://www.squarehabitat.fr'),
    price: h.cleanPrice,
  },
};
