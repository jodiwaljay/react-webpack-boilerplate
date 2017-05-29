const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	'entry' : [
		'react-hot-loader/patch',
		// Activates HMR for react
		'webpack-dev-server/client?http://localhost:8080',
		// bundle the client for webpack-dev-server
		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		resolve(__dirname,'src/hot-index.js')
	],
	'output' : {
		'filename' : 'bundle.js',
		'path' : resolve(__dirname, 'hot-build'),
		'publicPath' : '/'
	},
	// Check whether this is correct
	'context' : resolve(__dirname, 'src'),
	'devtool' : 'inline-source-map',
	'devServer' : {
		'hot' : true,
		'contentBase': resolve(__dirname,'hot-build'),
		'publicPath' : '/'
	},
	'module' : {
		'rules': [
		// For specifying babel to load js/jsx, babel settings in .babelrc
		{
			'test' : /\.jsx?$/,
			'include' : [resolve(__dirname, 'src')],
			'use' : [{
				'loader': 'babel-loader',
				'query' : {
					'presets' : [
						['es2015' , { 'modules' : false} ], 'react', 'stage-2'
					],
					'plugins' : ['react-hot-loader/babel']
				}
			}]
		},
		// For specifying sass, postcss and css module configuration
		{
			'test': /\.s?css$/,
			'use' :
			[
				'style-loader',
				{
					'loader' : 'css-loader',
					'options' :
						{
							'modules' : true,
							'importLoaders' : 2
						}
				},
				'postcss-loader',
				'sass-loader'
			],
			'include' : [resolve(__dirname, 'src')]
		},
		// For specifying file-loader and image-webpack-loader to optimize and load images
		{
			'test' : /.*\.(gif|png|jpe?g|svg)$/i,
			'use' : [
				'file-loader',
				{
					'loader' : 'image-webpack-loader',
					'query' : {
						'progressive' : true,
						'gifsicle' : {
							'interlaced' : false
						},
						'optipng' : {
							'optimizationLevel' : 7
						},
						'pngquant' : {
							'quality' : '65-90',
							'speed' : 4
						}
					}
				}
			]
		}]
	},
	'plugins': [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.ProvidePlugin({
			Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
			fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
		})
	],
	'resolve' : {
		'extensions': ['.js', '.jsx', '.scss', '.css'],
		'alias' : {
			'actions' : resolve(__dirname, 'src/actions'),
			'components' : resolve(__dirname, 'src/components'),
			'reducers' : resolve(__dirname, 'src/reducers'),
			'helpers' : resolve(__dirname, 'src/helpers')
		}
	},
	'target' : 'web'
}
