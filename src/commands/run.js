const scrape = require('./scrape');
const send = require('./send');

module.exports = exports = {};

exports.command = 'run';
exports.describe = '';

exports.builder = yargs => {
  scrape.builder(yargs);
  send.builder(yargs);
};

exports.handler = async options => {
  await scrape.handler(options);
  await send.handler(options);
};
