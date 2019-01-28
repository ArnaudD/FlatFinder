const { send, render } = require('../mailer');
const { getCache, saveCache } = require('../cache');

const writeFile = require('../writeFile');

module.exports = exports = {};

exports.command = 'send';
exports.describe = '';

exports.builder = yargs => {
  require('../options')(yargs);

  yargs.option('dry-run', {
    describe: "bypass cache and don't send emails",
    default: false,
    type: 'boolean',
  });
};

exports.handler = async ({ dryRun, outputDir, debug }) => {
  const results = require(`${outputDir}/results.json`);
  const cache = getCache(outputDir);
  const filteredResults = results.filter(r => !cache.urls.includes(r.url));

  if (filteredResults.length === 0) {
    console.log('aucune nouvelle offre');
    return;
  }

  console.log(`${filteredResults.length} nouvelles offres`);

  const html = await render({ results: filteredResults });
  await writeFile(`${outputDir}/email.html`, html);

  if (!dryRun) {
    const sentMail = await send({
      to: process.env.SEND_TO,
      from: process.env.SEND_FROM,
      subject: `[FlatFinder] Nouveaux Apparts ! (${filteredResults.length})`,
      html,
    });

    await saveCache(cache, filteredResults, outputDir);
  }
};
