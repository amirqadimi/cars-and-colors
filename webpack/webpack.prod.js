const path = require('path');
const { merge } = require('webpack-merge');
const common_config = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
		MiniCssExtractPlugin.loader,
		{ loader: 'css-loader', options: { url: false, sourceMap: true } },
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
				url: false,
				sourceMap: true,
				modules: isModule ? modulesOptions : false
			} 
		},
		postcss,
		{ loader: 'sass-loader', options: { url: false, sourceMap: true } },
	]
});

const scss = scssConfig();

const scssModules = scssConfig(true);

const config = {
	mode: 'production',
	devtool: false,
	module: {
		rules: [js, css, scss, scssModules]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main_[hash].css',
		})
	]
};

module.exports = merge(common_config, config);