import models from '../models/index'

function index(ctx, next) {
  ctx.body = 'this a users response!' + ctx.session.userId;
}

async function signIn(ctx, next) {
  await ctx.render('users/signIn', {})
}

export default {
  index: index,
  signIn: signIn
}