import fs from 'fs';
import { promisify } from 'util';

const cacheFile = `${__dirname}/cache.json`;

export function getCache() {
  let cache;
  try {
    cache = require(cacheFile);
  } catch(e) {
    cache = {};
  }
  cache.urls = cache.urls || [];

  return cache;
}

export function saveCache(cache, newResults = []) {
  cache.urls = cache.urls.concat(newResults.map(r => r.url));
  cache.lastExecution = (new Date()).toISOString();
  return promisify(fs.writeFile)(cacheFile, JSON.stringify(cache, null, 2));
}

export function isInCache(cache, url) {
  return cache.urls.includes(url);
}
