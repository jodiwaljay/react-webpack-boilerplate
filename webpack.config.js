const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
	'entry' : {
		'main' : resolve(__dirname,'src/index.js'),
		'vendor' : ['react', 'react-dom', 'redux','react-redux','react-router','react-router-redux','react-jsonschema-form', 'whatwg-fetch', 'es6-promise', 'halogen', 'classnames']
	},
	'output' : {
		'filename' : '[chunkhash].[name].js',
		'path' : resolve(__dirname, 'build')
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
					"presets" : [
						['es2015' , { 'modules' : false} ], 'react', 'stage-2'
					]
				}
			}]
		},
		// For specifying sass, postcss and css module configuration
		{
			'test': /\.s?css$/,
			'use' : ExtractTextPlugin.extract({
					'fallbackLoader' : 'style-loader',
					'loader' : [
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
					]
				}),
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
		new HtmlWebpackPlugin({ template: 'index.template.ejs' }),
		new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new ExtractTextPlugin("styles.css"),
        new CleanWebpackPlugin(['build'], {
			root: resolve(__dirname),
		}),
		// This is done to allow the fetch polyfill and promise support
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
