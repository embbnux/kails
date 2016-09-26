const edit = async (ctx, _next) => {
  const locals = {
    title: '修改密码'
  };
  await ctx.render('password/edit', locals);
};

const update = async (ctx, _next) => {
  const body = ctx.request.body;
  let currentUser = ctx.state.currentUser;
  if(currentUser.authenticate(body.oldPassword)) {
    currentUser.password = body.password;
    currentUser.passwordConfirmation = body.passwordConfirmation;
    await currentUser.save();
  }
  ctx.redirect('/');
  return;
};

const checkLogin = async (ctx, next) => {
  if(!ctx.state.isUserSignIn){
    ctx.status = 302;
    ctx.redirect('/');
    return;
  }
  await next();
};

export default {
  edit,
  update,
  checkLogin
};
