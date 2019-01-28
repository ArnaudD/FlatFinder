const puppeteer = require('puppeteer');

const writeFile = require('../writeFile');

const TIMEOUT = 10 * 1000; // 10 seconds

const { CHROME_HOST = 'localhost', CHROME_PORT = 3000 } = process.env;

const hidePuppeteer = async page => {
  await page.emulate(require('puppeteer/DeviceDescriptors')['iPhone 6']);

  await page.setExtraHTTPHeaders({
    'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
  });

  await page.evaluateOnNewDocument(require('./preload'));
};

const logBody = async page => {
  const bodyHandle = await page.evaluateHandle(() => document.body);
  const resultHandle = await page.evaluateHandle(body => body.innerHTML, bodyHandle);
  console.log('aaaaa', await resultHandle.jsonValue());
  await resultHandle.dispose();
};

const noop = () => {};

const defaultFilter = () => true;

const defaultScraper = ({ parent, items }) => {
  artoo.jquery.force = false;
  artoo.$ = window.jQuery;
  return artoo.scrape(parent, items);
};

module.exports = async function scrapOne(url, options) {
  const {
    debug,
    waitForSelector,
    evaluate,
    mapResults,
    sourceName,
    outputDir,
    waitForNavigation,
    filter,
  } = options;

  const log = debug ? console.log : noop;

  let results = [];
  let page;
  let browser;

  const timeout = setTimeout(() => {
    throw new Error('TIMEOUT');
  }, options.timeout || TIMEOUT);

  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `ws://${CHROME_HOST}:${CHROME_PORT}`,
      ignoreHTTPSErrors: true,
    });

    if (debug) {
      log(`loading url "${url}"`);
    }

    page = await browser.newPage();
    await hidePuppeteer(page);

    page.goto(url, { timeout: 0 }).catch(noop);

    if (waitForSelector) {
      log(`waiting for selector`);
      await page.waitForSelector(waitForSelector);
    } else if (waitForNavigation) {
      await page.waitForNavigation({
        waitUntil: 'networkidle0',
      });
    } else {
      log(`waiting for load event`);
      await new Promise(resolve => page.once('domcontentloaded', resolve));
    }

    if (debug) {
      await writeFile(`${outputDir}/${sourceName}.html`, await page.content());
    }

    log(`injecting artoo + jquery`);
    await page.addScriptTag({ path: require.resolve('jquery/dist/jquery.min.js') });
    await page.addScriptTag({ path: require.resolve('artoo-js/build/artoo.chrome.js') });

    results = await page.evaluate(evaluate ? evaluate : defaultScraper, options);
  } finally {
    clearTimeout(timeout);
    if (page) await page.close();
    if (browser) await browser.close();
  }

  return results.filter(filter || defaultFilter).map(mapResults);
};