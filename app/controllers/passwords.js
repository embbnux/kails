async function edit(ctx, _next) {
  const locals = {
    title: '修改密码'
  };
  await ctx.render('passwords/edit', locals);
}

async function update(ctx, _next) {
  const currentUser = ctx.state.currentUser;
  const body = ctx.request.body;
  if (currentUser.authenticate(body.oldPassword)) {
    currentUser.password = body.newPassword;
    currentUser.passwordConfirmation = body.newPasswordConfirmation;
    await currentUser.save();
    ctx.redirect('/');
  } else {
    ctx.redirect('/passwords/edit');
  }
  return;
}

async function checkLogin(ctx, next) {
  if(!ctx.state.isUserSignIn){
    ctx.status = 302;
    ctx.redirect('/');
    return;
  }
  await next();
}

export default {
  edit,
  update,
  checkLogin
};
