import models from '../models/index';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Articles from '../assets/javascripts/components/articles.jsx';
import { markdown } from '../helpers/markdown';
import fs from 'fs';

const index = async (ctx, _next) => {
  let page = parseInt(ctx.query.page, 10) || 1;
  page = page > 0 ? page : 1;
  let pageOffset = ( page - 1 ) * 10;
  const articleCount = await models.Article.count();
  const articles = await models.Article.findAll({
    include: [{
      model: models.User,
      attributes: ['id', 'name']
    }],
    attributes: ['id', 'title', 'description', 'created_at'],
    order: 'created_at DESC',
    offset: pageOffset,
    limit: 10
  });
  const prerenderHtml = await renderToString(
    <Articles articles={ articles } />
  );
  // ctx.session.userId = 4
  const locals = {
    title: 'Home',
    nav: 'index',
    prerenderHtml: prerenderHtml,
    preloadedState: { articles: articles },
    baseUrl: '/',
    currentPage: page,
    pages: parseInt(articleCount / 10 + 1)
  };
  await ctx.render('home/index', locals);
};

const about = async (ctx, _next) => {
  const readme = fs.readFileSync('README.md', 'utf8');
  const locals = {
    title: 'About',
    nav: 'about',
    content: readme,
    markdown: markdown
  };
  await ctx.render('home/about', locals);
};

export default {
  index,
  about
};
