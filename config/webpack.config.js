var development = require('./webpack/development.js');
var production = require('./webpack/production.js');

var env = require('./config').env
var configs = {
  development: development,
  production: production
};

var config = configs[env];
module.exports = config;
