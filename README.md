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

* node >= __14.0.0__
* yarn

## Features

* User system
* Post article with markdown editor
* Hacker news middle layer

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
  yarn
  yarn db:migrate
  yarn assets_build
  yarn start
  ```

5. Visit http://localhost:3000/
6. console

  ```
  $ yarn console
  > models.User.create({ name: 'test', email: 'kails@kails.org', password: '12345678', passwordConfirmation: '12345678' }).then(function(user) { console.log(user) })
  > models.User.findOne({ where: { email: 'kails@kails.org' } }).then(function(user) { console.log(user) })
  ```

## Deploy on production

[How to Deploy Kails](https://github.com/embbnux/kails/wiki/How-to-Deploy-Kails)

[How to Deploy Kails With Docker](https://github.com/embbnux/kails/wiki/How-to-Deploy-Kails-with-docker)

## Commands with yarn

```
# migrate database
yarn db:migrate
NODE_ENV=test yarn db:migrate
# run for development. it start app and webpack dev server
yarn start
# run the app
yarn app
# run the lint
yarn lint
# run test
yarn test
# deploy
yarn build
yarn assets_compile
NODE_ENV=production npm run db:migrate
yarn pm2
# console
yarn console
```

## Author

* [Embbnux Ji](https://www.embbnux.com)

## Blog

* [What about Kails](https://www.embbnux.com/2016/09/04/kails_with_koa2_like_ruby_on_rails/)
* [What about Kails (English)](https://developpaper.com/kails-an-open-source-project-of-nodejs-similar-to-rails-based-on-koa2/)
* [What about Kails (Japanese)](https://simple-asta.blogspot.com/2019/08/kails-an-open-source-project-of-nodejs-similar-to-rails-based-on-koa2.html)

## License

[MIT](https://github.com/embbnux/kails/blob/master/LICENSE.txt)
