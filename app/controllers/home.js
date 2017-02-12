import models from '../models/index';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Articles from '../assets/javascripts/components/articles';
import { markdown } from '../helpers/markdown';
import fs from 'fs';

const index = async (ctx, _next) => {
  let page = parseInt(ctx.query.page, 10) || 1;
  page = page > 0 ? page : 1;
  let pageOffset = ( page - 1 ) * 10;
  const articles_query = {
    include: [{
      model: models.User,
      attributes: ['id', 'name']
    }],
    attributes: ['id', 'title', 'description', 'created_at'],
    order: 'created_at DESC',
    offset: pageOffset,
    limit: 10
  };
  const [articleCount, articles] = await Promise.all([
    models.Article.count(),
    models.Article.findAll(articles_query)
  ]);
  const prerenderHtml = await renderToString(
    <Articles articles={ articles } />
  );
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
  const readme = await fs.readFileSync('README.md', 'utf8');
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
