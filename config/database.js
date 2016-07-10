var database = {
  development: {
    username: process.env.DATABASE_USERNAME_DEV || 'kails_dev',
    password: process.env.DATABASE_PASSWORD_DEV || 'kails_dev',
    database: process.env.DATABASE_NAME_DEV || 'kails_dev',
    host: process.env.DATABASE_HOST_DEV || '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DATABASE_USERNAME_TEST || 'kails_tester',
    password: process.env.DATABASE_PASSWORD_TEST || 'kails_tester',
    database: process.env.DATABASE_NAME_TEST || 'kails_test',
    host: process.env.DATABASE_HOST_TEST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DATABASE_USERNAME_PRO,
    password: process.env.DATABASE_PASSWORD_PRO,
    database: process.env.DATABASE_NAME_PRO,
    host: process.env.DATABASE_HOST_PRO,
    dialect: 'postgres'
  }
};

module.exports = database;