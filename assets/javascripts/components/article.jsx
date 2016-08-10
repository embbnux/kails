import React, { Component }  from 'react'

class Article extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="article">
        <h2 className="article-title">
          <a href="/" className="article-link">
            { this.props.title }
          </a>
        </h2>
        <div className="article-info">
          Jul 21, 2016
        </div>
        <div className="article-content">
          <p>
            网站的流量越来越大后开始使用负载均衡来提高网站的并发数，负载均衡有很多选择，可以使用现成的slb产品，也可以使用nginx进行代理转发流量，使用后发现一个问题，服务器上获取的用户ip变成负载均衡机器的ip了，这里记录一下这个问题的解决。
          </p>
        </div>
        <a className="read-more">...more</a>
      </article>
    )
  }
}

Article.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Article
