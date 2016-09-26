import urllib from 'urllib';

class HackerNewsService {
  constructor(ctx) {
    this.ctx = ctx;
    this.serverUrl = 'https://hacker-news.firebaseio.com/v0';
    this.pageSize = 20;
  }

  async request(api, options) {
    let data = null;
    if(options.cacheKey) {
      data = await this.ctx.cache.get(options.cacheKey);
      if(data) {
        return data;
      }
    }
    const opts = Object.assign({ dataType: 'json' }, options);
    const url = `${this.serverUrl}/${api}`;
    const request = await urllib.request(url, opts);
    data = request.data;
    if(options.cacheKey && data) {
      await this.ctx.cache.set(options.cacheKey, data, options.cacheExpire);
    }
    return data;
  }

  async getTopStories(page) {
    page = page || 1;
    const result = await this.request('topstories.json', {
      data: {
        orderBy: '"$key"',
        startAt: `"${this.pageSize * (page - 1)}"`,
        endAt: `"${this.pageSize * page - 1}"`
      },
      cacheKey: `news_ids_${page}`,
      cacheExpire: 300
    });
    const ids = Object.keys(result).map(key => result[key]);
    return ids;
  }

  async getItem(id) {
    const item = await this.request(`item/${id}.json`, {
      cacheKey: `news_item_${id}`,
      cacheExpire: 1800
    });
    return item;
  }

  async getUser(id) {
    const result = await this.request(`user/${id}.json`);
    return result;
  }
}

export default HackerNewsService;
