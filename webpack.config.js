const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  stats: {
    children: true,
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '.src/pages'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    watchFiles: ['src/**/*.pug']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index.pug',
      filename: 'index.html',
      // inject: false
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/about.pug',
      filename: 'about.html',
      // inject: false,
      files: {
        js: './src/about.js'
      }
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
    ],
  }
}