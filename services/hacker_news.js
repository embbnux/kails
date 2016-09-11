import urllib from 'urllib'

class HackerNewsService {
  constructor() {
    this.serverUrl = 'https://hacker-news.firebaseio.com/v0'
    this.pageSize = 20
  }

  async request(api, options) {
    const opts = Object.assign({ dataType: 'json' }, options)
    const url = `${this.serverUrl}/${api}`
    const request = await urllib.request(url, opts)
    const data = request.data
    return data
  }

  async getTopStories(page) {
    const result = await this.request('topstories.json', {
      data: {
        orderBy: '"$key"',
        startAt: `"${this.pageSize * (page - 1)}"`,
        endAt: `"${this.pageSize * page - 1}"`
      }
    })
    const ids = Object.keys(result).map(key => result[key])
    return ids
  }

  async getItem(id) {
    const result = await this.request(`item/${id}.json`)
    return result
  }

  async getUser(id) {
    const result = await this.request(`user/${id}.json`)
    return result
  }
}

export default HackerNewsService
