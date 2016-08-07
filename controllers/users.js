import models from '../models/index'

function index(ctx, next) {
  ctx.body = 'this a users response!' + ctx.session.userId;
}

async function signIn(ctx, next) {

  const locals = {
  	nav: 'signIn'
  }

  await ctx.render('users/signIn', locals)
}

export default {
  index: index,
  signIn: signIn
}