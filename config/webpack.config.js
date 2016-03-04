/*eslint-disable*/
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var DIST_DIR = path.join(__dirname, '../')
var APIS_DIR = path.join(__dirname, '../apis')

module.exports = {
  entry: path.join(APIS_DIR, 'projects.js'),
  output: {
    path: DIST_DIR,
    libraryTarget: 'commonjs2',
    filename: 'dist-[name].js'
  },
  externals: [
    {
      'bluebird': true,
      'node-uuid': true,
      'dynamodb-doc': true,
      'claudia-api-builder': true
    }
  ],
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
}
