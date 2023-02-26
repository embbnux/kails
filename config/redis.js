const { createClient } = require('redis');
const config = require('./config');

const redisClient = createClient(config.redisUrl, {});
redisClient.connect();

module.exports = redisClient;
