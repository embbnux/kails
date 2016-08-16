import models from '../models/index'

async function show(ctx, next) {
  const article = await models.Article.findById(ctx.params.id)
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
  const body = ctx.request.body
  let articleParams = {
    title: body.title,
    content: body.content
  }
  await ctx.currentUser.createArticle(articleParams)
  // await models.Article.create(articleParams)
  ctx.redirect('/')
  return
}

function edit(ctx, next) {
  ctx.body = 'this a users response!' + ctx.session.userId
}

function update(ctx, next) {
  ctx.body = 'this a users response!' + ctx.session.userId
}

async function checkLogin(ctx, next) {
  if(!ctx.isUserSignIn){
    ctx.status = 302
    ctx.redirect('/')
    return
  }
  await next()
}

async function checkParamsBody(ctx, next) {
  const body = ctx.request.body
  if (!(body.title && body.content)) {
    const locals = {
      nav: 'articleNew',
      message: 'params error'
    }
    await ctx.render('articles/new', locals)
    return
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
  checkParamsBody: checkParamsBody
}
