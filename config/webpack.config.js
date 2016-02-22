/*eslint-disable*/
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var DIST_DIR = path.join(__dirname, '../dist')
var LAMBDAS_DIR = path.join(__dirname, '../lambdas')

module.exports = {
  entry: fs.readdirSync(LAMBDAS_DIR)
           .filter(filename => /\.js$/.test(filename))
           .map(filename => {
              var entry = {};
              entry[filename.replace('.js', '')] = path.join(__dirname, '../lambdas/', filename);
              return entry;
           })
           .reduce((finalObject, entry) => Object.assign(finalObject, entry), {}),
  output: {
    path: DIST_DIR,
    library: '[name]',
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },
  externals: [
    {
      'aws-sdk': true,
      'node-uuid': true
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
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
}
