import wrapper from 'co-redis';
import redis from '../../config/redis';

module.exports = function (options) {
  const middleOptions = options || {};
  const prefix = middleOptions.prefix || 'kails-cache:';
  const expire = middleOptions.expire || 1800;

  let redisAvailable = false;

  const redisClient = wrapper(redis);

  redisClient.on('error', (_error) => {
    redisAvailable = false;
  });

  redisClient.on('end', () => {
    redisAvailable = false;
  });

  redisClient.on('connect', () => {
    redisAvailable = true;
  });

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
    await redisClient.setex(key, tty, value);
  };

  const getCache = async function(key) {
    if(!redisAvailable){
      return null;
    }
    key = prefix + key;
    let data = await redisClient.get(key);
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
