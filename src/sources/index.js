const fs = require('fs');
const path = require('path');

const basename = path.basename(module.filename);

module.exports = exports = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename)
  .forEach(file => {
    exports[file.replace(/.js$/, '')] = require(path.join(__dirname, file));
  });
