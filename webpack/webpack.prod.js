const path = require('path');
const { merge } = require('webpack-merge');
const common_config = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
		MiniCssExtractPlugin.loader,
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
		MiniCssExtractPlugin.loader,
		{ 
			loader: 'css-loader', 
			options: {
				modules: isModule ? modulesOptions : false
			}
		},
		postcss,
		'sass-loader'
	]
});

const scss = scssConfig();

const scssModules = scssConfig(true);

const config = {
	mode: 'production',
	devtool: 'source-map',
	module: {
		rules: [css, scss, scssModules]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main_[hash].css',
		})
	]
};

module.exports = merge(common_config, config);