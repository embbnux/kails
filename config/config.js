var _ = require('lodash');
var development = require('./development');
var test = require('./test');
var production = require('./production');

var env = process.env.NODE_ENV || 'development';
var configs = {
  development: development,
  test: test,
  production: production
};
var defaultConfig = {
  env: env,
  port: Number.parseInt(process.env.PORT, 10) || 3000
};

var config = _.merge(defaultConfig, configs[env]);

module.exports = config;
