const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common_config = require('./webpack.common.js');

const postcss = {
	loader: 'postcss-loader',
	options: {
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
		'css-loader',
		postcss
	]
};

const modulesOptions = {
	localIdentName: '[local]--[hash:base64:5]',
};

const scssConfig = (isModule = false) => ({
	test: /\.scss$/i,
	include: path.resolve(__dirname, isModule ? '../src/js' : '../src/styles'),
	use: [
		'style-loader',
		{ 
			loader: 'css-loader', 
			options: {
				modules: isModule ? modulesOptions : false
			} 
		},
		postcss,
		'sass-loader',
	]
});

const scss = scssConfig();

const scssModules = scssConfig(true);

const config = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(__dirname, '../build'),
		publicPath: '/',
		compress: true,
		open: true,
		hot: true,
		historyApiFallback: true,
    port: 8000
  },
	module: {
		rules: [css, scss, scssModules]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = merge(common_config, config);