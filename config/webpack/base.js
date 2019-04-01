const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const assetHost = require('../config').assetHost;

const publicPath = path.resolve(__dirname, '../', '../', 'public', 'assets');

module.exports = {
  context: path.resolve(__dirname, '../', '../'),
  entry: {
    application: './app/assets/javascripts/application.js',
    articles: './app/assets/javascripts/articles.js',
    editor: './app/assets/javascripts/editor.js'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [{
      test: /\.js|\.jsx/,
      enforce: 'pre',
      use: 'eslint-loader',
      exclude: /node_modules/
    },
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
                  'Explorer 11',
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
      use: 'url-loader?limit=8192&name=[name].[ext]'
    },
    {
      test: /\.(jpe?g|png|gif|svg)\??.*$/,
      use: 'url-loader?limit=8192&name=[name].[ext]'
    },
    {
      test: /\.css|\.sass|\.scss/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(__dirname, './postcss.config.js')
            }
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
    new ManifestPlugin({
      fileName: 'kails_manifest.json'
    })
  ],
};
