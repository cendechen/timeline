var path = require('path')
var webpack = require('webpack')
var HtmlWebpakPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  context: path.resolve('./'),
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'main.js',
    library: 'timeline',
    libraryTarget: 'umd',
    path: path.resolve('./dist')
  },
  module: {
    rules: [{
      test: /.js$/,
      use: ['babel-loader']
    }],
  },
  resolve: {
    extensions: ['.js', '.css', '.less']
  }
}
