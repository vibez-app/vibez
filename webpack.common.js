// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'); // node built-in package


module.exports = {
  entry: './client/index.jsx', // specifies main file of our application
  target: 'web', // specifies where our app will run
  resolve: { // tells webpack the files to consider when building app ??
    extensions: ['.js', '.jsx', '.json'],
  },
  module: { // where to specify rules about how Webpack will handle diff files when building app
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ // generates html files for our bundles usingg index.html as a template
      template: path.join(__dirname, './client', 'index.html'),
    }),
  ],
};

// installed:
