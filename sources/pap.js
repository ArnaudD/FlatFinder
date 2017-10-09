import puppeteer from 'puppeteer';
import _ from 'lodash';

export default async function (url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.goto(url);

  await page.waitForSelector('.search-results-list');

  await page.injectFile('node_modules/jquery/dist/jquery.min.js');
  await page.injectFile('node_modules/artoo-js/build/artoo.chrome.js');

  const results = await page.evaluate(() => {
    artoo.jquery.force = false;
    artoo.$ = window.jQuery;
    return artoo.scrape('.search-results-list > .search-results-item', {
      title: { sel: 'a.title-item > .h1' },
      content: { sel: '.item-description' },
      url: { sel: 'a.title-item', attr: 'href' },
      image: { sel: '.thumb img', attr: 'src' },
      price: { sel: '.price' },
      // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
      // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
    });
  });

  browser.close();

  return results.map(result => ({
    ...result,
    title: _.trim(result.title),
    content: _.trim((result.content || '').replace(/\t/g, '').replace("\n\n", "\n")),
    id: result.url.match(/r([0-9]+)$/)[1],
    price: result.price.match(/([0-9]+)/)[1],
    url: `https://www.pap.fr${result.url}`,
    // time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }));
};
