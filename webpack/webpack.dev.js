const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common_config = require('./webpack.common.js');

const js = {
	test: /.jsx?$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader',
		options: {
			sourceMaps: true,
			highlightCode: true,
		}
	}
};

const postcss = {
	loader: 'postcss-loader',
	options: {
		sourceMap: true,
		postcssOptions: {
			plugins: [ 'autoprefixer'],
		},
	},
};

const css = {
	test: /\.css$/i,
	include: path.resolve(__dirname, '../src/styles'),
	use: [
		'style-loader',
		{ loader: 'css-loader', options: { sourceMap: true } },
		postcss
	]
};

const modulesOptions = {
	localIdentName: '[local]--[hash:base64:5]',
};

const cssConfig = (isModule = false) => ({
	test: /\.scss$/i,
	include: path.resolve(__dirname, isModule ? '../src/js' : '../src/styles'),
	use: [
		'style-loader',
		{ 
			loader: 'css-loader', 
			options: { 
				sourceMap: true,
				modules: isModule ? modulesOptions : false
			} 
		},
		postcss,
		{ loader: 'sass-loader', options: { sourceMap: true } },
	]
});

const scss = cssConfig();

const scssModules = cssConfig(true);

const config = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(__dirname, '../dist'),
		publicPath: '/',
		compress: true,
		open: true,
		hot: true,
		historyApiFallback: true,
    port: 8000
  },
	module: {
		rules: [js, css, scss, scssModules]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = merge(common_config, config);