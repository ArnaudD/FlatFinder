const fs = require('fs');
const { promisify } = require('util');

module.exports = exports = {};

exports.getCache = function getCache(outputDir) {
  let cache;
  try {
    cache = require(`${outputDir}/cache.json`);
  } catch (e) {
    cache = {};
  }
  cache.urls = cache.urls || [];

  return cache;
};

exports.saveCache = function saveCache(cache, newResults = [], outputDir) {
  cache.urls = cache.urls.concat(newResults.map(r => r.url));
  cache.lastExecution = new Date().toISOString();
  return promisify(fs.writeFile)(`${outputDir}/cache.json`, JSON.stringify(cache, null, 2));
};
