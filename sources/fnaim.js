import puppeteer from 'puppeteer';
import _ from 'lodash';

export default async function (url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.goto(url);

  await page.waitForSelector('ul.liste');

  await page.injectFile('node_modules/jquery/dist/jquery.min.js');
  await page.injectFile('node_modules/artoo-js/build/artoo.chrome.js');

  const results = await page.evaluate(() => {
    artoo.jquery.force = false;
    artoo.$ = window.jQuery;
    return artoo.scrape('ul.liste li.item', {
      title: { sel: 'h3 a' },
      url: { sel: 'h3 a', attr: 'href' },
      image: { sel: '.itemImage > a > img', attr: 'src' },
      price: { sel: 'h4' },
      // date: { sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content' },
      // time: { sel: '.item_supp[itemprop="availabilityStarts"]' },
    });
  });

  browser.close();

  return results.map(result => ({
    ...result,
    title: _.trim(result.title),
    id: result.url.match(/\/([0-9]+)\//)[1],
    price: result.price.match(/([0-9]+)/)[1],
    url: `http://www.fnaim.fr${result.url}`,
    // time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }));
};
