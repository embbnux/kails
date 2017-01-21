import models from '../models/index';

const index = (ctx, _next) => {
  ctx.body = 'this a users response!' + ctx.session.userId;
};

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
  ctx.flashMessage.notice = 'Log Out Successfully!';
  ctx.redirect('/');
};

const LogIn = async (ctx, _next) => {
  const body = ctx.request.body;
  if (!(body.email && body.password)) {
    const locals = { nav: 'signIn' };
    await ctx.render('users/signIn', locals);
    return;
  }
  let user = await models.User.findOne({ where: { email: body.email }});
  if(user && user.authenticate(body.password)) {
    ctx.session.userId = user.id;
    ctx.status = 302;
    ctx.flashMessage.notice = 'Log In Successfully!';
    ctx.redirect('/');
  } else {
    const locals = { nav: 'signIn' };
    ctx.flashMessage.warning = 'User name or Password Error.';
    await ctx.render('users/signIn', locals);
  }
};

export default {
  index,
  signIn,
  LogIn,
  LogOut
};
