var base = require('./base.js');
var _ = require('lodash');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = _.merge({}, base);

config.output = _.merge(config.output, {
  filename: '[name]_bundle-[chunkhash].js'
});

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.CommonsChunkPlugin('application', 'application_bundle-[hash].js'),
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin('[name]_bundle-[hash].css', {
    allChunks: true
  })
);

module.exports = config;
