const _ = require('lodash');

const loaders = require('../sources/index.js');
const scrape = require('../scraper');
const writeFile = require('../writeFile');

const loadersName = Object.keys(loaders);

const loadSource = async (sourceName, { config, debug, outputDir }) => {
  try {
    const url = config[sourceName];

    if (_.isEmpty(url)) {
      if (url !== undefined) {
        console.log(`!!! Warning !!! "${sourceName}" url is empty, check your config file`);
      }

      return [];
    }

    const sourceResult = await scrape(url, {
      ...loaders[sourceName],
      debug,
      sourceName,
      outputDir,
    });

    if (debug) {
      await writeFile(`${outputDir}/${sourceName}.json`, JSON.stringify(sourceResult));
    }

    return sourceResult;
  } catch (e) {
    console.error(`failed loading ${sourceName}`, e);
  }
  return [];
};

module.exports = exports = {};

exports.command = 'scrape';
exports.describe = '';

exports.builder = yargs => {
  require('../options')(yargs);

  yargs.option('c', {
    alias: 'config',
    describe: 'Path to the config file',
    normalize: true,
    default: './sources.json',
    coerce: value => require(/^(\/|~)/.test(value) ? value : `${process.cwd()}/${value}`),
    type: 'string',
  });

  yargs.option('s', {
    alias: 'sources',
    describe: `Only scrape some sources`,
    default: loadersName,
    coerce: values => {
      const diff = _.difference(values, loadersName);
      if (diff.length > 0) {
        throw new Error(`Source(s) not supported: ${diff.join(',')}`);
      }
      return values;
    },
    type: 'array',
  });
};

exports.handler = async options => {
  const { outputDir, sources } = options;

  let results = sources.map(sourceName => loadSource(sourceName, options));
  results = await Promise.all(results);
  results = _.flatten(results);

  console.log(`${results.length} annonces trouvées`);

  await writeFile(`${outputDir}/results.json`, JSON.stringify(results));
};
