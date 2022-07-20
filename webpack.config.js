const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
const glob_entries = require('webpack-glob-folder-entries');

//#1: Define the HTML Webpack Plugin:
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  filename: 'index.html',
  inject: 'body',

  // Here is part of the magic, we get the index.njk but we tell
  // webpack to pass it through the nunjucks-html-loader
  template: 'nunjucks-html-loader!./src/pages/index.njk',
});

// Optional, but highly recommended. Create a returnEntries:
// Webpack doesn't support glob paths. For the nunjucks-html-loader
// we need each path to be specified for it to work (YES, even subdirectories!)

function returnEntries(globPath) {
  let entries = glob_entries(globPath, true);
  let folderList = new Array();
  for (let folder in entries) {
    folderList.push(path.join(__dirname, entries[folder]));
  }
  return folderList;
}


module.exports = {
  entry: {
    index_bundle: path.resolve(__dirname, './src/index.js'),
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
    watchFiles: ['src/**/*.html']
  },
  plugins: [
    HtmlWebpackPluginConfig,
    // new HtmlWebpackPlugin({
    //   template: './src/pages/index.html',
    //   filename: 'index.html'
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/pages/about.html',
    //   filename: 'about.html'
    // }),
    // new NunjucksWebpackPlugin({
    //   templates: [
    //     {
    //       from: './src/pages/index.njk',
    //       to: 'index.html',
    //     },
    //     {
    //       from: './src/pages/about.njk',
    //       to: 'about.html',
    //     }
    //   ]
    // }),
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
      // {
      //   test: /\.njk|nunjucks$/,
      //   use: ['nunjucks-loader'],
      // },
      {
        // HTML LOADER
        // Super important: We need to test for the html 
        // as well as the nunjucks files
        test: /\.html$|njk|nunjucks/,
        use: ['html-loader', {
          loader: 'nunjucks-html-loader',
          options: {
            // Other super important. This will be the base
            // directory in which webpack is going to find 
            // the layout and any other file index.njk is calling.
            searchPaths: [...returnEntries('./src/pages/**/')]
            // Use the one below if you want to use a single path.
            // searchPaths: ['./client/templates'],
          }
        }],
      }
    ],
  }
}