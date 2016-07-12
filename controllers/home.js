import models from '../models/index'

async function index(ctx, next) {
  const articles = await models.Article.findAll({
    include: [ models.User ]
  })
  // ctx.session.userId = 4;
  const locals = {
    title: 'Kails',
    nav: 'index',
    articles: articles
  }
  await ctx.render('home/index', locals)
}

async function about(ctx, next) {
  const locals = {
    title: 'About | Kails',
    nav: 'about'
  }
  console.log('haha')
  await ctx.render('home/about', locals)
}

export default {
  index: index,
  about: about
}
