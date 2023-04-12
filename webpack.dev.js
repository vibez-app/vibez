/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path'); // node built-in package
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	output: {
		// specifies where it will put file after bundling
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
		publicPath: '/', // IMPORTANT FOR ROUTING
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	target: 'web', // specifies where our app will run
	devServer: {
		// specifies dev server settings
		port: '8080',
		static: {
			// specifies the directory that webpack will use to serve static files
			directory: path.join(__dirname, './client'),
		},
		open: true, // automatically opens file after bundling
		hot: true,
		// enables Hot module replacement exchanges/adds/removes modules while application is running
		// without full reload
		liveReload: true, // automatically update app as it makes changes
		proxy: {
			'/': 'http://localhost:3000/',
		},
		historyApiFallback: true, // IMPORTANT FOR ROUTING
	},
});

// installed:
