import Koa from 'koa'
import session from 'koa-generic-session'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'

import config from './config/config'
import helpers from './helpers/index'
import router from './routes/index'
import koaRedis from 'koa-redis'
import models from './models/index'

const redisStore = koaRedis({
  url: config.redisUrl
})

const app = new Koa()

app.keys = [config.secretKeyBase]

app.use(convert(session({
  store: redisStore,
  prefix: 'kails:sess:',
  key: 'kails.sid'
})))

app.use(bodyParser())
app.use(convert(json()))
app.use(convert(logger()))
app.use(convert(require('koa-static')(__dirname + '/public')))

// add helpers for views
app.use(async (ctx, next) => {
  let currentUser = null
  if(ctx.session.userId){
    currentUser = await models.User.findById(ctx.session.userId)
  }
  ctx.state = {
    assetUrl: helpers.assetUrl,
    isActive: helpers.isActive,
    currentUser: currentUser
  }
  await next()
})

app.use(views('./views', { extension: 'pug' }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(router.routes(), router.allowedMethods())

// response
app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx)
})

app.listen(config.port)

export default app
