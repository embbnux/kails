import models from '../models/index';
import { markdown } from '../helpers/markdown';

const show = async (ctx, _next) => {
  const article = await models.Article.findByPk(ctx.params.id);
  if(article == null){
    ctx.redirect('/');
    return;
  }
  const author = await models.User.findByPk(article.userId);
  let canEdit = ctx.state.isUserSignIn && ctx.state.currentUser.id === author.id;
  const articleHtml = await markdown(article.content);
  const locals = {
    nav: 'article',
    title: article.title,
    description: article.description,
    article: article,
    articleHtml: articleHtml,
    canEdit: canEdit,
    author: author
  };
  await ctx.render('articles/show', locals);
};

const newArticle = async (ctx, _next) => {
  const locals = {
    nav: 'articleNew',
    article: {},
    articleFormPath: '/articles',
  };
  await ctx.render('articles/new', locals);
};

const create = async (ctx, _next) => {
  const currentUser = ctx.state.currentUser;
  try {
    const article = await currentUser.createArticle(ctx.state.articleParams);
    ctx.flashMessage.notice = 'Create Article Successfully!';
    ctx.redirect('/articles/' + article.id);
  } catch (error) {
    const locals = {
      nav: 'articleNew',
      article: ctx.state.articleParams,
      articleFormPath: '/articles',
    };
    ctx.flashMessage.warning = error.message;
    await ctx.render('articles/new', locals);
  }
};

const edit = async (ctx, _next) => {
  const locals = {
    title: 'Edit',
    nav: 'article',
    articleFormPath: `/articles/${ctx.state.article.id}`,
  };
  await ctx.render('articles/edit', locals);
};

const update = async (ctx, _next) => {
  let article = ctx.state.article;
  try {
    article = await article.update(ctx.state.articleParams);
    ctx.flashMessage.notice = 'Update Article Successfully!';
    ctx.redirect('/articles/' + article.id);
  } catch (error) {
    article = { ...ctx.state.articleParams, id: article.id };
    const locals = {
      title: 'Edit',
      nav: 'article',
      articleFormPath: `/articles/${article.id}`,
      article
    };
    ctx.flashMessage.warning = error.message;
    await ctx.render('articles/edit', locals);
  }
};

const checkLogin = async (ctx, next) => {
  if(!ctx.state.isUserSignIn){
    ctx.status = 302;
    ctx.redirect('/');
    return;
  }
  await next();
};

const checkArticleOwner = async (ctx, next) => {
  const currentUser = ctx.state.currentUser;
  const article = await models.Article.findOne({
    where: {
      id: ctx.params.id,
      userId: currentUser.id
    }
  });
  if(article == null){
    ctx.redirect('/');
    return;
  }
  ctx.state.article = article;
  await next();
};

const checkParamsBody = async (ctx, next) => {
  const body = ctx.request.body;
  if (!(body.title && body.content && body.description)) {
    const locals = {
      nav: 'articleNew',
      message: 'params error'
    };
    if(ctx.params.id){
      await ctx.render('articles/edit', locals);
    } else {
      await ctx.render('articles/new', locals);
    }
    return;
  }
  ctx.state.articleParams = {
    title: body.title,
    description: body.description,
    content: body.content
  };
  await next();
};

export default {
  show,
  newArticle,
  create,
  edit,
  update,
  checkLogin,
  checkArticleOwner,
  checkParamsBody
};
