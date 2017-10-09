import puppeteer from 'puppeteer';
import _ from 'lodash';

export default async function (url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.goto(url);

  await page.waitForSelector('.liste_resultat');

  await page.injectFile('node_modules/jquery/dist/jquery.min.js');
  await page.injectFile('node_modules/artoo-js/build/artoo.chrome.js');

  const results = await page.evaluate(() => {
    artoo.jquery.force = false;
    artoo.$ = window.jQuery;
    return artoo.scrape('.liste_resultat .c-pa-list.c-pa-sl.cartouche ', {
      title: { sel: '.c-pa-criterion' },
      url: { sel: '.c-pa-link', attr: 'href' },
      image: { sel: '.c-pa-imgs .slideContent > a > div', attr: 'data-lazy' },
      price: { sel: '.c-pa-price' },
      // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
      // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
    });
  });

  browser.close();

  return results.map(result => ({
    ...result,
    id: result.url.match(/\/([0-9]+)\.htm/)[1],
    title: _.trim(result.title).replace(/( |\n|\t|\r)+/gi, ' '),
    price: result.price.match(/([0-9]+)/)[1],
    image: result.image && JSON.parse(result.image).url,
    // time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }));
};
