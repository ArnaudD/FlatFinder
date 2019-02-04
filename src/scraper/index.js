const puppeteer = require('puppeteer');
const _ = require('lodash');
const compose = require('lodash/fp/compose');

const writeFile = require('../writeFile');

const TIMEOUT = 60 * 1000; // 10 seconds

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
  console.log(await resultHandle.jsonValue());
  await resultHandle.dispose();
};

const noop = () => {};

const defaultFilter = () => true;

const defaultScraper = ({ parent, items }) => {
  artoo.jquery.force = false;
  artoo.$ = window.jQuery;
  return artoo.scrape(parent, items);
};

const disableByDefault = {
  image: true,
  stylesheet: true,
  font: true,
  script: true,
};

module.exports = async function scrapOne(urlOrConfig, options) {
  const {
    debug,
    waitForSelector,
    evaluate,
    mapResults,
    mapItem,
    sourceName,
    outputDir,
    waitForNavigation,
    filter,
    cookies,
    disable,
    prepare,
  } = options;

  const log = debug ? console.log : noop;

  let results = [];
  let page;
  let browser;

  const disabledResources = _.reduce(
    { ...disableByDefault, ...disable },
    (acc, value, key) => {
      if (value) acc.push(key);
      return acc;
    },
    [],
  );

  const timeout = setTimeout(() => {
    throw new Error('TIMEOUT');
  }, options.timeout || TIMEOUT);

  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `ws://${CHROME_HOST}:${CHROME_PORT}`,
      ignoreHTTPSErrors: true,
    });

    if (debug) {
      log(`loading url "${urlOrConfig}"`);
    }

    page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', request => {
      if (disabledResources.indexOf(request.resourceType()) !== -1) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await hidePuppeteer(page);

    if (cookies) {
      await page.setCookie(..._.flattenDeep([cookies]));
    }

    if (typeof urlOrConfig === 'string') {
      page.goto(urlOrConfig, { timeout: 0 }).catch(noop);
    }

    if (prepare) {
      await prepare(page, urlOrConfig);
    }

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

  let itemMapper = item => item;

  if (typeof mapItem === 'function') {
    itemMapper = mapItem;
  } else if (typeof mapItem === 'object') {
    itemMapper = item => {
      Object.keys(mapItem).forEach(key => {
        const func = mapItem[key];
        const value = item[key];
        item[key] = compose(_.flattenDeep([func]))(value);
      });
      return item;
    };
  }

  const resultsMapper = mapResults || (r => r);

  return resultsMapper(results)
    .filter(filter || defaultFilter)
    .map(itemMapper);
};
