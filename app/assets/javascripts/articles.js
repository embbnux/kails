import React from 'react';
import ReactDOM from 'react-dom';
import Articles from './components/articles.jsx';

const articles = window.__PRELOADED_STATE__.articles;

ReactDOM.render(
  <Articles articles={ articles } />,
  document.getElementById('articles')
);
