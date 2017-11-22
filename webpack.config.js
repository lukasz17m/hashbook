const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: '@/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'main.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: ['vue-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader!eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          context: './src/',
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src/raw/*'),
        to: path.join(__dirname, 'dist/[name].[ext]'),
      },
    ]),
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
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
