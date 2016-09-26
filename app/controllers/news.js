import HackerNewsService from '../services/hacker_news';

const index = async (ctx, _next) => {
  const page = parseInt(ctx.query.page) || 1;
  const hackerNews = new HackerNewsService(ctx);
  const newsIds = await hackerNews.getTopStories(page);
  const newsList = await Promise.all(
    newsIds.map(async id => await hackerNews.getItem(id))
  );
  const locals = {
    title: 'Hacker News',
    nav: 'news',
    newsList: newsList,
    baseUrl: '/news',
    currentPage: page,
    pages: 20
  };
  await ctx.render('news/index', locals);
};

export default {
  index
};
