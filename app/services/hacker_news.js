import urllib from 'urllib';

class HackerNewsService {
  constructor(ctx) {
    this.ctx = ctx;
    this.serverUrl = 'https://hacker-news.firebaseio.com/v0';
    this.pageSize = 20;
  }

  async request(api, options) {
    const opts = Object.assign({ dataType: 'json' }, options);
    const url = `${this.serverUrl}/${api}`;
    const request = await urllib.request(url, opts);
    const data = request.data;
    return data;
  }

  async getTopStories(page) {
    const cacheItemKey = 'news_ids_' + page;
    let ids = await this.ctx.cache.get(cacheItemKey);
    if(ids) {
      return ids;
    }
    const result = await this.request('topstories.json', {
      data: {
        orderBy: '"$key"',
        startAt: `"${this.pageSize * (page - 1)}"`,
        endAt: `"${this.pageSize * page - 1}"`
      }
    });
    ids = Object.keys(result).map(key => result[key]);
    await this.ctx.cache.set(cacheItemKey, ids);
    return ids;
  }

  async getItem(id) {
    const cacheItemKey = 'news_item_' + id;
    let item = await this.ctx.cache.get(cacheItemKey);
    if(item) {
      return item;
    }
    item = await this.request(`item/${id}.json`);
    await this.ctx.cache.set(cacheItemKey, item);
    return item;
  }

  async getUser(id) {
    const result = await this.request(`user/${id}.json`);
    return result;
  }
}

export default HackerNewsService;
