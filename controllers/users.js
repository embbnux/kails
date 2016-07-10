function index(ctx, next) {
  ctx.body = 'this a users response!' + ctx.session.userId;
}

export default {
  index: index
}