import models from '../models/index';

const index = (ctx, _next) => {
  ctx.body = 'this a users response!' + ctx.session.userId;
};

function setLocals(message) {
  return {
    nav: 'signIn',
    message: message
  };
}

const signIn = async (ctx, _next) => {
  if(ctx.state.isUserSignIn){
    ctx.redirect('/');
    return;
  }
  const locals = {
    nav: 'signIn'
  };
  await ctx.render('users/signIn', locals);
};

const LogOut = (ctx, _next) => {
  if(!ctx.state.isUserSignIn){
    ctx.redirect('/');
    return;
  }
  ctx.session.userId = null;
  ctx.redirect('/');
};

const LogIn = async (ctx, _next) => {
  const body = ctx.request.body;
  if (!(body.email && body.password)) {
    const locals = setLocals('params error.');
    await ctx.render('users/signIn', locals);
    return;
  }
  let user = await models.User.findOne({ where: { email: body.email }});
  if(user && user.authenticate(body.password)) {
    ctx.session.userId = user.id;
    ctx.status = 302;
    ctx.redirect('/');
  } else {
    const locals = setLocals('user name or password error.');
    await ctx.render('users/signIn', locals);
  }
};

export default {
  index,
  signIn,
  LogIn,
  LogOut
};
