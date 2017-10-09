import puppeteer from 'puppeteer';
import _ from 'lodash';

export default async function (url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.goto(url);

  await page.waitForSelector('.tabsContent');

  await page.injectFile('node_modules/jquery/dist/jquery.min.js');
  await page.injectFile('node_modules/artoo-js/build/artoo.chrome.js');

  const results = await page.evaluate(() => {
    artoo.jquery.force = false;
    artoo.$ = window.jQuery;
    return artoo.scrape('.tabsContent li', {
      title: {sel: 'h2.item_title'},
      url: {sel: 'a', attr: 'href'},
      image: {sel: '.item_imagePic > span', attr: 'data-imgSrc' },
      price: {sel: '.item_price', attr:  'content'},
      date: {sel: '.item_supp[itemprop="availabilityStarts"]', attr:  'content'},
      time: {sel: '.item_supp[itemprop="availabilityStarts"]'},
    });
  });

  browser.close();

  return results.map(result => ({
    ...result,
    title: _.trim(result.title),
    id: result.url.match(/locations\/(.*)\./)[1],
    time: result.time.match(/([0-9]{2}:[0-9]{2})/)[1],
  }));
};
