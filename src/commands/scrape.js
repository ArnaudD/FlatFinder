const _ = require('lodash');
const pLimit = require('p-limit');

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

    console.log(`> ${sourceResult.length} annonces trouvées sur ${sourceName}`);
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

  const limit = pLimit(4); // 4 promises en parallèle au max

  let results = sources.map(sourceName => limit(() => loadSource(sourceName, options)));

  results = _.flatten(await Promise.all(results));

  console.log(`\n${results.length} annonces trouvées au total`);

  await writeFile(`${outputDir}/results.json`, JSON.stringify(results));
};
