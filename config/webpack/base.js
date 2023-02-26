const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const assetHost = require('../config').assetHost;

const publicPath = path.resolve(__dirname, '../', '../', 'public', 'assets');

module.exports = {
  context: path.resolve(__dirname, '../', '../'),
  entry: {
    application: './app/assets/javascripts/application.js',
    articles: './app/assets/javascripts/articles.js',
    editor: './app/assets/javascripts/editor.js'
  },
  module: {
    rules: [
    {
      test: /\.js|\.jsx/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              'targets': {
                'browsers': [
                  'Chrome >= 71',
                  'FireFox >= 60',
                  'Safari >= 10',
                ]
              }
            }],
            '@babel/preset-react'
          ]
        }
      }
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
      type: 'asset/resource'
    },
    {
      test: /\.(jpe?g|png|gif|svg)\??.*$/,
      type: 'asset/resource'
    },
    {
      test: /\.css|\.sass|\.scss/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                ],
              ],
            },
          }
        },
        'sass-loader',
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
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
    new WebpackManifestPlugin({
      fileName: 'kails_manifest.json'
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
    }),
  ],
};
