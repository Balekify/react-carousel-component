const path = require('path')

const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },

  entry: ['./examples/index.js'],

  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },

  watch: true,

  devServer: {
    hot: true,
    contentBase: 'dist',
    compress: true,
    port: 7070,
    overlay: {
      warnings: true,
      errors: true
    },
  },

  devtool: 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/style.css'
    }),
    new HtmlWebpackPlugin({
      template: './examples/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintPlugin()
  ]
}
