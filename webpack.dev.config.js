var path = require('path')
var webpack = require('webpack')
var HtmlWebpakPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  context: path.resolve('./'),
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: 'main.js',
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpakPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ],
  devtool: 'cheap-eval-source-map',
  devServer: {
    port: 9000
  }
}
