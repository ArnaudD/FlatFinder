import _ from 'lodash';
import fs from 'fs';

import leboncoin from './sources/leboncoin';
import seloger from './sources/seloger';
import fnaim from './sources/fnaim';
import ouestimmo from './sources/ouestimmo';
import pap from './sources/pap';

import urls from './sources.json';

import renderEmail from './renderEmail';
import scrape from './scrape';

const loaders = { leboncoin, seloger, fnaim, ouestimmo, pap };

let cache;
try {
  cache = require('./cache.json').default;
} catch(e) {
  cache = {};
}

async function loadSource(sourceName) {
  try {
    const sourceConfig = loaders[sourceName];
    const sourceUrl = urls[sourceName];
    return await scrape(sourceUrl, sourceConfig);
  } catch(e) {
    console.error(`failed loading ${sourceName}`, e);
    return [];
  }
}

(async () => {
  const sources = Object.keys(loaders);
  const results = _.flatten(await Promise.all(sources.map(loadSource)));
  const html = renderEmail({ results });

  fs.writeFileSync('test.html', html);
  // console.log(html);
})();
