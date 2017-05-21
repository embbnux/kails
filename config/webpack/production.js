const base = require('./base.js');
const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const postcssImport = require('postcss-import');
// const cssnext = require('postcss-cssnext');
// const postcssReporter = require('postcss-reporter');

const config = _.merge({}, base);

config.output = _.merge(config.output, {
  filename: '[name]_bundle-[chunkhash].js'
});

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({ name: 'application', filename: 'application_bundle-[hash].js' }),
  new ExtractTextPlugin({
    filename: '[name]_bundle-[hash].css',
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
);

// config.postcss = function(webpack) {
//   return [
//     postcssImport({addDependencyTo: webpack}),
//     cssnext({autoprefixer: {browsers: 'ie >= 9, ...'}}),
//     postcssReporter({clearMessages: true})
//   ];
// };

module.exports = config;
