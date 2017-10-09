import puppeteer from 'puppeteer';
import _ from 'lodash';

export default async function (url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.goto(url);

  await page.waitForSelector('#listAnnonces');

  await page.injectFile('node_modules/jquery/dist/jquery.min.js');
  await page.injectFile('node_modules/artoo-js/build/artoo.chrome.js');

  const results = await page.evaluate(() => {
    artoo.jquery.force = false;
    artoo.$ = window.jQuery;
    return artoo.scrape('#listAnnonces > a', {
      title: { sel: '.annTitre' },
      address: { sel: '.annAdresse' },
      url: { attr: 'href' },
      image: { sel: '.annPhoto', attr: 'src' },
      price: { sel: '.annPrix' },
      // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
      // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
    });
  });

  browser.close();

  return results.map(result => ({
    ...result,
    title: _.trim(result.title),
    id: result.url.match(/-([0-9]+)\.htm/)[1],
    price: result.price.match(/([0-9]+)/)[1],
    url: `https://www.ouestfrance-immo.com${result.url}`,
    // time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }));
};
