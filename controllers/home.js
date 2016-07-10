import models from '../models/index'

async function index(ctx, next) {
  const articles = await models.Article.findAll({
    include: [ models.User ]
  })
  ctx.session.user_id = 1;
  const locals = {
    title: 'koa2 title1',
    articles: articles
  }
  await ctx.render('index', locals)
}

export default {
  index: index
}
