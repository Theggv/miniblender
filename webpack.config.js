const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: path.resolve(__dirname, './src/index.ts'),
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	target: 'web',
	mode: 'development',
	// webpack-dev-server configuration
	devServer: {
		historyApiFallback: true,
		host: 'localhost',
		contentBase: path.resolve(__dirname, './dist'),
		watchContentBase: true,
		compress: true,
		open: true,
		hot: true,
		port: 9001,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
};
