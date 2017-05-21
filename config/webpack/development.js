const base = require('./base.js');
// const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const publicPath = path.resolve(__dirname, '../', '../', 'public', 'assets');

const config = _.merge(base, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/assets/'
  }
  // HOT reload
  // devServer: {
  //   contentBase: publicPath,
  //   publicPath: '/assets/',
  //   historyApiFallback: true,
  //   hot: true,
  //   inline: true,
  //   progress: true,
  //   watchOptions: {
  //     aggregateTimeout: 300,
  //     poll: 1000
  //   }
  // }
});

config.plugins.push(
  new ExtractTextPlugin({
    filename: '[name]_bundle.css',
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  })
);

module.exports = config;
