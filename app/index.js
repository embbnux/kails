import Koa from 'koa';
import session from 'koa-session';
import CSRF from 'koa-csrf';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import logger from 'koa-logger';
import flashMessage from 'koa-flash-message';

import config from '../config/config';
import router from './routes';
import models from './models';
import middlewares from './middlewares';
import cacheMiddle from './middlewares/cache';

const app = new Koa();

app.keys = [config.secretKeyBase];

// not serve static when deploy
if(config.serveStatic){
  app.use(require('koa-static')(__dirname + '/../public'));
}

app.use(session({
  prefix: 'kails:sess:',
  key: 'kails.sid',
  httpOnly: true,
  signed: true,
}, app));

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

app.use(logger());

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
