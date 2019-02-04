module.exports = {
  waitForSelector: 'main > div.o-container',
  parent: 'main > div.o-container',
  items: 'data-result',
  // filter: ({ url }) => !!url,
  mapResults: data => JSON.parse(data).items,
  mapItem: item => ({
    title: `${item.longAd.slice(0, 60)}...`,
    price: item.price,
    url: `https://www.orpi.com/annonce-vente-${item.slug}`,
    image: item.images[0],
  }),
};
