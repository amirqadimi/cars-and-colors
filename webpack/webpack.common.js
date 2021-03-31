const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '../.env')
} );

const files = {
	test: /\.(svg|png|jpe?g|gif|webp)$/i,
	include: path.resolve(__dirname, '../assets/images'),
	use: [
		{
			loader: 'file-loader',
			options: {
				name: '[path][name]_[contenthash].[ext]',
			},
		},
	],
};

const fonts = {
	test: /\.(eot|ttf|woff2?)$/i,
	include: path.resolve(__dirname, '../assets/fonts'),
	use: [
		{
			loader: 'file-loader',
			options: {
				name: '[name]_[contenthash].[ext]',
				outputPath: 'assets/fonts',
			},
		},
	],
};

const svg_sprites = {
	test: /\.(svg)$/i,
	include: path.resolve(__dirname, '../assets/svg-sprites'),
	use: [
		{
			loader: 'svg-sprite-loader',
			options: {
				symbolId: '[name]',
			},
		},
		'svgo-loader'
	],
};

const config = {
	entry: './src/js/index.js',
	output: {
		filename: 'main_[hash].js',
		path: path.resolve(__dirname, '../build'),
		publicPath: process.env.NODE_ENV === 'production' ?  process.env.PUBLIC_PATH : '/'
	},
	target: 'web',
	module: {
		rules: [files, fonts, svg_sprites]
	},
	resolve: {
		alias: {
			js: path.resolve(__dirname, '../src/js'),
			styles: path.resolve(__dirname, '../src/styles'),
			images: path.resolve(__dirname, '../assets/images'),
			svg: path.resolve(__dirname, '../assets/svg-sprites'),
			assets: path.resolve(__dirname, '../assets'),
		},
		extensions: ['.js','.jsx']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			base: '/'
		}),
		new webpack.DefinePlugin({
      "process.env": dotenv.parsed
    }),
	]
};

module.exports = config;