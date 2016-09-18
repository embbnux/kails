import Koa from 'koa';
import session from 'koa-generic-session';
import csrf from 'koa-csrf';
import views from 'koa-views';
import convert from 'koa-convert';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import logger from 'koa-logger';

import config from '../config/config';
import helpers from './helpers/index';
import router from './routes/index';
import koaRedis from 'koa-redis';
import models from './models/index';

const redisStore = koaRedis({
  url: config.redisUrl
});

const app = new Koa();

app.keys = [config.secretKeyBase];

app.use(convert(session({
  store: redisStore,
  prefix: 'kails:sess:',
  key: 'kails.sid'
})));

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

// not serve static when deploy
if(config.serveStatic){
  app.use(convert(require('koa-static')(__dirname + '/../public')));
}

//views with pug
app.use(views(__dirname + '/views', { extension: 'pug' }));

// catch error
app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch(err) {
    let status = err.status || 500;
    // let message = e.message || 'Server Error!'
    ctx.status = status;
    ctx.state = {
      status: status,
      helpers: helpers,
      currentUser: null
    };
    await ctx.render('error/error', {});
    if (status == 500) {
      console.log(err);
      logger.error('server error', err, ctx);
    }
  }
});

// csrf
app.use(convert(csrf()));

// add helpers for views
app.use(async (ctx, next) => {
  let currentUser = null;
  if(ctx.session.userId){
    currentUser = await models.User.findById(ctx.session.userId);
  }
  ctx.state = {
    csrf: ctx.csrf,
    helpers: helpers,
    currentUser: currentUser,
    isUserSignIn: (currentUser != null)
  };
  await next();
});

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes(), router.allowedMethods());

// response
app.on('error', function(err, ctx){
  console.log(err);
  logger.error('server error', err, ctx);
});

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
