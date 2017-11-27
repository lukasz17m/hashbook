const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const HTMLMinify = {
  collapseWhitespace: true,
  minifyCSS: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

const errorPage = code => ({
  template: `./src/${code}.html`,
  filename: `${code}.html`,
  inject: false,
  minify: (process.env.NODE_ENV === 'production') ? HTMLMinify : false,
});

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.vue$/,
        loaders: ['vue-loader', 'eslint-loader'],
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        exclude: /node_modules/,
        test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?v=\d\.\d\.\d)?$/,
        loader: 'file-loader',
        options: {
          context: './src/',
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      minify: (process.env.NODE_ENV === 'production') ? HTMLMinify : false,
    }),
    new HtmlWebpackPlugin(errorPage(500)),
    new HtmlWebpackPlugin(errorPage(404)),
    new HtmlWebpackPlugin(errorPage(403)),
    new WebpackPwaManifest({
      name: 'Hash Book',
      short_name: '#Book',
      description: 'A simple webbook with markdowned and #hashtagged notes.',
      theme_color: '#01161e',
      background_color: '#01161e',
      orientation: 'any',
      icons: [
        {
          destination: path.join('assets', 'icons'),
          src: path.resolve('src/assets/images/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
  ],
  // devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
