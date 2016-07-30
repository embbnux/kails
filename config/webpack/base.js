var webpack = require('webpack');
var path = require('path');
var publicPath = path.resolve(__dirname, '../', '../', 'public', 'assets');
var ManifestPlugin = require('webpack-manifest-plugin');
var assetHost = require('../config').assetHost;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../', '../'),
  entry: {
    application: './assets/javascripts/application.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: ['babel-loader'],
      query: {
        presets: ['react', 'es2015']
      }
    },{
      test: /\.coffee$/,
      exclude: /node_modules/,
      loader: 'coffee-loader'
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
      loader: 'url-loader?limit=8192&name=[name].[ext]'
    },
    {
      test: /\.(jpe?g|png|gif|svg)\??.*$/,
      loader: 'url-loader?limit=8192&name=[name].[ext]'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee', '.json']
  },
  output: {
    path: publicPath,
    publicPath: assetHost + '/assets/',
    filename: '[name]_bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new ManifestPlugin({
      fileName: 'kails_manifest.json'
    })
  ]
};
