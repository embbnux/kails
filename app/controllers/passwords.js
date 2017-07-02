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
    try {
      await currentUser.save();
      ctx.flashMessage.notice = 'Edit Password Successfully!';
      ctx.redirect('/');
    } catch (error) {
      ctx.flashMessage.warning = error.message;
      ctx.redirect('/passwords/edit');
    }
  } else {
    ctx.flashMessage.warning = 'Edit Password Failed!';
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
