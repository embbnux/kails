var base = require('./base.js');
// var path = require('path');
var _ = require('lodash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var publicPath = path.resolve(__dirname, '../', '../', 'public', 'assets');

var config = _.merge(base, {
  debug: true,
  outputPathinfo: true,
  displayErrorDetails: true,
  devtool: 'eval',
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
  new ExtractTextPlugin('[name]_bundle.css', {
    allChunks: true
  })
);

module.exports = config;