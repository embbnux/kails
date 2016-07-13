const port = Number.parseInt(process.env.PORT, 10) || 5000
module.exports = {
  port: port,
  hostName: process.env.HOST_NAME_PRO,
  assetHost: process.env.ASSET_HOST_PRO,
  redisUrl: process.env.REDIS_URL_PRO,
  secretKeyBase: process.env.SECRET_KEY_BASE
};
