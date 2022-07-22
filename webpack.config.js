const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PugPlugin = require('pug-plugin');


module.exports = {
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       scripts: {
  //         test: /\\.(js|ts)$/,
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
  entry: {
    index: './src/pug/pages/index/index.pug',
    about: './src/pug/pages/about/about.pug'
  },
  output: {
    filename: 'assets/js/[name].[contenthash:8].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  mode: 'development',
  stats: {
    children: true,
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
    watchFiles: ['src/pug/pages/**/*.*']
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
        loader: PugPlugin.loader,
        options: {
          method: 'render',
        }
        
      },
    ],
  }
}