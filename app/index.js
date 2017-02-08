import Koa from 'koa';
import session from 'koa-generic-session';
import CSRF from 'koa-csrf';
import views from 'koa-views';
import convert from 'koa-convert';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import logger from 'koa-logger';
import flashMessage from 'koa-flash-message';

import config from '../config/config';
import router from './routes';
import koaRedis from 'koa-redis';
import models from './models';
import middlewares from './middlewares';
import cacheMiddle from './middlewares/cache';


const redisStore = koaRedis({
  url: config.redisUrl
});

const app = new Koa();

app.keys = [config.secretKeyBase];

// not serve static when deploy
if(config.serveStatic){
  app.use(convert(require('koa-static')(__dirname + '/../public')));
}

app.use(convert(session({
  store: redisStore,
  prefix: 'kails:sess:',
  key: 'kails.sid'
})));

app.use(cacheMiddle());

app.use(bodyParser());
app.use(methodOverride((req, _res) => {
  if (req.body && (typeof req.body === 'object') && ('_method' in req.body)) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(convert(json()));
app.use(convert(logger()));

//views with pug
app.use(views(__dirname + '/views', { extension: 'pug' }));

// catch error
app.use(middlewares.catchError);

// csrf
app.use(new CSRF({
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  disableQuery: false
}));

// add helpers for views
app.use(middlewares.addHelper);
app.use(flashMessage);

app.use(router.routes(), router.allowedMethods());

if (process.argv[2] && process.argv[2][0] == 'c') {
  const repl = require('repl');
  global.models = models;
  repl.start({
    prompt: '> ',
    useGlobal: true
  }).on('exit', () => { process.exit(); });
}
else {
  app.listen(config.port);
}

export default app;
