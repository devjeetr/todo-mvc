const HtmlWebPackPlugin = require('html-webpack-plugin');
// const GoogleFontsPlugin = require('google-fonts-plugin');
const path = require('path')

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: "/todo-mvc"
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: {
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        exclude: [/dist/],
        use: {
          loader: 'html-loader',
          
          options: { minimize: true },
        },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.(ttf|eot|woff|woff2)$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       name: 'fonts/[name].[ext]',
      //     },
      //   },
      // },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/html/index.html',
      filename: 'index.html',
    }),
    // new GoogleFontsPlugin({
    //   fonts: [
    //     { family: 'Source Sans Pro' },
    //     { family: 'Roboto', variants: ['400', '700italic'] },
    //     { family: 'Charmonman' },
    //     { family: 'Rubik' },
    //   ],
    //   path: './dist/',
    // }),
  ],
  devtool: 'source-map',
};
