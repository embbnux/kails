import redis from '../config/redis';
import models from '../app/models';

beforeEach('Clean Redis', async () => {
  await redis.sendCommand(['FLUSHDB']);
});

beforeEach('Clean Database', async () => {
  const sequelize = models.sequelize;
  await sequelize.sync({ force: true });
});

after('Close database', async () => {
  const sequelize = models.sequelize;
  await sequelize.close();
  await redis.quit();
});
