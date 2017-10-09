import _ from 'lodash';

import leboncoin from './sources/leboncoin';
import seloger from './sources/seloger';
import fnaim from './sources/fnaim';
import ouestimmo from './sources/ouestimmo';
import pap from './sources/pap';

import urls from './sources.json';

import renderEmail from './renderEmail';

const loaders = { leboncoin, seloger, fnaim, ouestimmo, pap };

let cache;
try {
  cache = require('./cache.json').default;
} catch(e) {
  cache = {};
}

async function loadSource(sourceName) {
  try {
    return await loaders[sourceName](urls[sourceName]);
  } catch(e) {
    console.error(`failed loading ${sourceName}`);
    return [];
  }
}

(async () => {
  const sources = Object.keys(urls);
  const results = _.flatten(await Promise.all(sources.map(loadSource)));
  const html = renderEmail({ results });

  console.log(html);
})();
