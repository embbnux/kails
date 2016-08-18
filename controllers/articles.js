import models from '../models/index'

async function show(ctx, next) {
  const article = await models.Article.findById(ctx.params.id)
  if(article == null){
    ctx.redirect('/')
    return
  }
  const locals = {
    title: article.title,
    article: article,
    nav: 'article'
  }
  await ctx.render('articles/show', locals)
}

async function newArticle(ctx, next) {
  const locals = {
    nav: 'articleNew'
  }
  await ctx.render('articles/new', locals)
}

async function create(ctx, next) {
  const currentUser = ctx.state.currentUser
  const article = await currentUser.createArticle(ctx.state.articleParams)
  // await models.Article.create(articleParams)
  ctx.redirect('/articles/' + article.id)
  return
}

async function edit(ctx, next) {
  const locals = {
    title: '编辑',
    nav: 'article'
  }
  await ctx.render('articles/edit', locals)
}

async function update(ctx, next) {
  let article = ctx.state.article
  article = await article.update(ctx.state.articleParams)
  ctx.redirect('/articles/' + article.id)
  return
}

async function checkLogin(ctx, next) {
  if(!ctx.state.isUserSignIn){
    ctx.status = 302
    ctx.redirect('/')
    return
  }
  await next()
}

async function checkArticleOwner(ctx, next) {
  const currentUser = ctx.state.currentUser
  const article = await models.Article.findOne({
    where: {
      id: ctx.params.id,
      userId: currentUser.id
    }
  })
  if(article == null){
    ctx.redirect('/')
    return
  }
  ctx.state.article = article
  await next()
}

async function checkParamsBody(ctx, next) {
  const body = ctx.request.body
  if (!(body.title && body.content)) {
    const locals = {
      nav: 'articleNew',
      message: 'params error'
    }
    if(ctx.params.id){
      await ctx.render('articles/edit', locals)
    } else {
      await ctx.render('articles/new', locals)
    }
    return
  }
  ctx.state.articleParams = {
    title: body.title,
    content: body.content
  }
  await next()
}

export default {
  show: show,
  newArticle: newArticle,
  create: create,
  edit: edit,
  update: update,
  checkLogin: checkLogin,
  checkArticleOwner: checkArticleOwner,
  checkParamsBody: checkParamsBody
}
