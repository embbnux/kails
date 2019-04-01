const base = require('./base.js');
const _ = require('lodash');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = _.merge({}, base);

config.output = _.merge(config.output, {
  filename: '[name]_bundle-[chunkhash].js'
});

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name]_bundle-[hash].css'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
);
config.optimization = {
  minimize: true
};
config.mode = 'production';

module.exports = config;
