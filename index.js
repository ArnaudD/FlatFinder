import _ from 'lodash';
import fs from 'fs';
import { promisify } from 'util';

import * as loaders from './sources/index.js';
import urls from './sources.json';

import { send, render } from './email';
import scrape from './scrape';
import { getCache, saveCache, isInCache } from './cache';

const writeFile = promisify(fs.writeFile);

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
  const cache = getCache();
  const sources = Object.keys(loaders);
  const results = _.flatten(await Promise.all(sources.map(loadSource)));
  const filteredResults = results.filter(r => !isInCache(cache, r.url));

  if (filteredResults.length === 0) {
    console.log('aucune nouvelle offre');
    await saveCache(cache);
    return;
  }

  console.log(`${filteredResults.length} nouvelles offres`);
  await writeFile(`${__dirname}/test.json`, JSON.stringify(filteredResults));

  const html = await render({ results: filteredResults });
  await writeFile(`${__dirname}/test.html`, html);

  const sentMail = await send({
    to: process.env.SEND_TO,
    from: process.env.SEND_FROM,
    subject: `[FlatFinder] Nouveaux Apparts ! (${filteredResults.length})`,
    html,
  });

  await saveCache(cache, filteredResults);
})();
