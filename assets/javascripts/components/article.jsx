import React, { Component }  from 'react'

class Article extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let article = this.props.article
    let articleLink = '/articles/' + article.id
    return (
      <article className="article">
        <h2 className="article-title">
          <a href={ articleLink } className="article-link">
            { article.title }
          </a>
        </h2>
        <div className="article-info">
          Jul 21, 2016
        </div>
        <div className="article-content">
          <p>
            { article.content }
          </p>
        </div>
        <a href={ articleLink } className="read-more">...more</a>
      </article>
    )
  }
}

Article.propTypes = {
  article: React.PropTypes.object.isRequired
}

export default Article
