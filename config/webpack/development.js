const base = require('./base.js');
// const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
  new MiniCssExtractPlugin({
    filename: '[name]_bundle.css'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  })
);
config.mode = 'development';

module.exports = config;
