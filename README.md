# Kails
A Web App like Ruby on Rails with Koa2, Webpack and Postgres.

This project is like Ruby on Rails Project:

* MVC
* Database (postgres), ORM(sequelize)
* migration(sequelize-cli)
* assets compile(webpack)
* Session with redis
* Password with bcrypt
* Testing (mocha)
* Lint (eslint)
* middleware
* console
* server side render with react

## Requirements

* node __^4.0.0__
* npm __^3.0.0__

## How to Install

```bash
 install nodejs
 install redis and postgres
 create postgres database:
 for development { database: 'kails_dev', owner: 'kails_dev', password: 'kails_dev' }
 for test { database: 'kails_test', owner: 'kails_tester', password: 'kails_tester' }
 clone this project
```

## Features

* [koa2](https://github.com/koajs/koa/tree/v2.x)
* [koa-bodyparser](https://github.com/koajs/bodyparser)
* [koa-router](https://github.com/alexmingoia/koa-router)
* [koa-generic-session](https://github.com/koajs/generic-session)
* [koa-logger](https://github.com/koajs/logger)
* [Postgres](https://www.postgresql.org/)
* [Redis](http://redis.io/)
* [Pug](http://jade-lang.com/)
* [Sequelize](http://docs.sequelizejs.com/)
* [Nodemon](http://nodemon.io/)
* [Mocha](https://mochajs.org/)
* [Babel](https://github.com/babel/babel)
* [ES6]
* [ESLint](http://eslint.org/)
* [React](https://facebook.github.io/react/)

## Structure

```
├── app
│   ├── assets
│   │   ├── images
│   │   ├── javascripts
│   │   └── stylesheets
│   ├── controllers
│   ├── helpers
│   ├── models
│   ├── routes
│   ├── services
│   ├── views
│   └── index.js
├── config
│   ├── config.js
│   └── webpack
│       ├── base.js
│       ├── development.js
│       └── production.js
├── db
│   └── migrations
├── index.js
├── package.json
├── public
└── test
```

## Usage

```
npm install
npm run db:migrate
NODE_ENV=test npm run db:migrate
# run for development, it start app and webpack dev server
npm run start
# run the app
npm run app
# run the lint
npm run lint
# run test
npm run test
# deploy
npm run assets_compile
NODE_ENV=production npm run db:migrate
npm run pm2
```

## Go to App console

```
$ npm run console
models.User.create({ name: 'test', email: 'kails@kails.org', password: '12345678', passwordConfirmation: '12345678' }).then(function(user) { console.log(user) })
models.User.findOne({ where: { email: 'kails@kails.org' } }).then(function(user) { console.log(user) })
```

## Start development environtment

```
$ npm run start
# Visit `http://localhost:3000/
```

## Deploy on production

[How to Deploy Kails](https://github.com/embbnux/kails/wiki/How-to-Deploy-Kails)

## Author
* [Embbnux Ji](https://www.embbnux.com)

## Blog
* [What about Kails](https://www.embbnux.com/2016/09/04/kails_with_koa2_like_ruby_on_rails/)

## License
[MIT](https://github.com/embbnux/kails/blob/master/LICENSE.txt)
