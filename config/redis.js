var redis = require('redis');
var config = require('./config');

var redisClient = redis.createClient(config.redisUrl, {});

module.exports = redisClient;
