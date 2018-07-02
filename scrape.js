
import puppeteer from 'puppeteer';

export default async function (url, options) {

  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://chromeless:3000' });
  let results = [];

  try {
    console.log(`loading url "${url}"`);
    const page = await browser.newPage();

    try {
      await page.goto(url, { timeout: 0 });
    } catch (e) {
      // no timeout, we will wait in `waitForSelector`
    }

    console.log(`waiting for selector`);
    await page.waitForSelector(options.waitForSelector);

    console.log(`injecting artoo + jquery`);
    await page.injectFile('node_modules/jquery/dist/jquery.min.js');
    await page.injectFile('node_modules/artoo-js/build/artoo.chrome.js');

    console.log(`running artoo`);

    if (options.evaluate) {
      results = await page.evaluate(options.evaluate);
    } else {
      results = await page.evaluate(({ parent, items }) => {
        artoo.jquery.force = false;
        artoo.$ = window.jQuery;
        return artoo.scrape(parent, items);
      }, options);
    }

  } finally {
    await browser.close();
  }

  return results.map(options.mapResults);
};
