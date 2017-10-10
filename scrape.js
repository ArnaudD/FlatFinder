
import puppeteer from 'puppeteer';

export default async function (url, options) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { timeout: 0 });
  } catch (e) {}

  await page.waitForSelector(options.waitForSelector);

  await page.injectFile('node_modules/jquery/dist/jquery.min.js');
  await page.injectFile('node_modules/artoo-js/build/artoo.chrome.js');

  const results = await page.evaluate(({ parent, items }) => {
    artoo.jquery.force = false;
    artoo.$ = window.jQuery;
    return artoo.scrape(parent, items);
  }, options);

  await browser.close();

  return results.map(options.mapResults);
};
