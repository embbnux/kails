import logger from 'koa-logger';
import helpers from '../helpers';
import models from '../models';

async function catchError(ctx, next) {
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
      logger.error('server error', err, ctx);
    }
  }
}

async function addHelper(ctx, next) {
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
}

export default {
  catchError,
  addHelper
};
