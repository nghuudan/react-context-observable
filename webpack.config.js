const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'src', 'index'),
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
