import redis from '../config/redis';
import models from '../app/models';

beforeEach('Clean Redis', function () {
  redis.flushdb();
});

beforeEach('Clean Database', function () {
  const sequelize = models.sequelize;
  return sequelize.sync({ force: true });
});

after('Close database', function () {
  const sequelize = models.sequelize;
  sequelize.close();
  redis.quit();
});
