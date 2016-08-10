import React, { Component }   from 'react'
import Article from './article.jsx'

class Articles extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let articles = this.props.articles.map((item, key) => {
      return (
        <Article title={ item.title } key={ key } />
      )
    })
    return(
      <div className="articles">
        { articles }
      </div>
    )
  }
}

Articles.propTypes = {
  articles: React.PropTypes.array.isRequired,
}

export default Articles