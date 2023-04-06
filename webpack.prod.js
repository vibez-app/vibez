/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path'); // node built-in package
const { merge } = require("webpack-merge");
const common = require("./webpack.common");



module.exports = merge(common, {
  mode: 'production',
  output: { // specifies where it will put file after bundling
    path: path.resolve(__dirname, './dist'),
    filename: 'main.[contenthash].js',
  },
  target: 'web', // specifies where our app will run
  plugins: [
    new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}), 
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // extract css into files
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
});

// installed:
