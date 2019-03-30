import { promisify } from 'util';
import redis from '../../config/redis';

module.exports = function (options) {
  const middleOptions = options || {};
  const prefix = middleOptions.prefix || 'kails-cache:';
  const expire = middleOptions.expire || 1800;

  let redisAvailable = false;

  const redisClient = redis;

  redisClient.on('error', (_error) => {
    redisAvailable = false;
  });

  redisClient.on('end', () => {
    redisAvailable = false;
  });

  redisClient.on('connect', () => {
    redisAvailable = true;
  });

  const getData = promisify(redisClient.get).bind(redisClient);
  const setData = promisify(redisClient.set).bind(redisClient);

  const setCache = async function(key, value, cacheOptions) {
    if(!redisAvailable){
      return;
    }
    if (value == null) {
      return;
    }
    const currentOptions = cacheOptions || {};
    key = prefix + key;
    const tty = currentOptions.expire || expire;
    value = JSON.stringify(value);
    await setData(key, value, 'EX', tty);
  };

  const getCache = async function(key) {
    if(!redisAvailable){
      return null;
    }
    key = prefix + key;
    let data = await getData(key);
    if(data) {
      data = JSON.parse(data.toString());
    }
    return data;
  };

  const cacheMiddle = async function(ctx, next) {
    ctx.cache = {
      get: getCache,
      set: setCache
    };
    await next();
  };

  return cacheMiddle;
};
