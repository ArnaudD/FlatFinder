const _ = require('lodash');
module.exports = exports = {};

exports.trim = _.trim;
exports.prefix = prefix => value => value.replace(/^\//, `${prefix}/`);
exports.removeQueryParams = value => value.replace(/\?.*/, '');
exports.cleanSpaces = value => value.replace(/( |\n|\t|\r)+/gi, ' ');
exports.cleanPrice = [
  value => value.replace(/(,|€)(.|\n)*/gm, '').replace(/[^0-9]/g, ''),
  exports.trim,
  exports.cleanSpaces,
];
