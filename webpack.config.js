/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PugPlugin = require('pug-plugin');

module.exports = {
  entry: {
    index: './src/pug/pages/index/index.pug',
    about: './src/pug/pages/about/about.pug'
  },
  output: {
    filename: 'assets/js/[name].[contenthash:8].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  stats: {
    children: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        scripts: {
          test: /\.(js|scss)$/,
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './dist'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    watchFiles: ['src/pug/**/*.*', 'src/assets/blocks/**/*.*', 'src/assets/common/*.*']
  },
  resolve: {
    alias: {
      Img: path.join(__dirname, './src/assets/img/'),
      Fonts: path.join(__dirname, './src/assets/fonts/'),
      Blocks: path.join(__dirname, './src/assets/blocks/'),
      Common: path.join(__dirname, './src/assets/common/'),
    }
  },
  plugins: [
    new PugPlugin({
      pretty: true,
      modules: [
        PugPlugin.extractCss({
          filename: 'assets/css/[name].[contenthash:8].css'
        })
      ]
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        options: {
          method: 'render',
        }

      },
      {
        test: /\.(png|jpg|jpeg|svg|ico)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['css-loader', 'sass-loader'],
      }
    ],
  }
}