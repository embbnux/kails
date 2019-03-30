# Kails

[![Build Status](https://travis-ci.org/embbnux/kails.svg?branch=master)](https://travis-ci.org/embbnux/kails)

A Web App like Ruby on Rails with Koa2, Webpack and Postgres.

This project is like Ruby on Rails Project:

* MVC
* Database (postgres), ORM(sequelize)
* migration(sequelize-cli)
* assets compile(webpack)
* Session
* Password with bcrypt
* Testing (mocha)
* Lint (eslint)
* middlewares
* console
* server side render with react
* flash message

## Requirements

* node __^8.0.0__
* npm __^5.0.0__

## Features

* User system
* Post article with markdown editor
* Hacker news middlelayer

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

## Build development environment on localhost

1. install nodejs
2. install redis and postgres
3. create postgres database:
 for development { database: 'kails_dev', owner: 'kails_dev', password: 'kails_dev' }
 for test { database: 'kails_test', owner: 'kails_tester', password: 'kails_tester' }
4. clone and start this project

  ```bash
  git clone https://github.com/embbnux/kails.git
  npm install
  npm run db:migrate
  npm run start
  ```

5. Visit http://localhost:3000/
6. console

  ```
  $ npm run console
  > models.User.create({ name: 'test', email: 'kails@kails.org', password: '12345678', passwordConfirmation: '12345678' }).then(function(user) { console.log(user) })
  > models.User.findOne({ where: { email: 'kails@kails.org' } }).then(function(user) { console.log(user) })
  ```

## Deploy on production

[How to Deploy Kails](https://github.com/embbnux/kails/wiki/How-to-Deploy-Kails)

[How to Deploy Kails With Docker](https://github.com/embbnux/kails/wiki/How-to-Deploy-Kails-with-docker)

## Commands with npm

```
# migrate database
npm run db:migrate
NODE_ENV=test npm run db:migrate
# run for development. it start app and webpack dev server
npm start
# run the app
npm run app
# run the lint
npm run lint
# run test
npm test
# deploy
npm run build
npm run assets_compile
NODE_ENV=production npm run db:migrate
npm run pm2
# console
npm run console
```

## Author

* [Embbnux Ji](https://www.embbnux.com)

## Blog

* [What about Kails](https://www.embbnux.com/2016/09/04/kails_with_koa2_like_ruby_on_rails/)

## License

[MIT](https://github.com/embbnux/kails/blob/master/LICENSE.txt)
