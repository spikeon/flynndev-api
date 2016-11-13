var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		'polyfills': './src/polyfills.ts',
		'vendor': './src/vendor.ts',
		'app': './src/main.ts'
	},

	resolve: {
		extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
	},

	module: {
		loaders: [
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader', 'angular2-template-loader']
			},
			{
				test: /\.html$/,
				loader: 'html'
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico)$/,
				loader: 'file?name=assets/[name].[hash].[ext]'
			},
			{
				test: /\.css$/,
				exclude: helpers.root('src', 'app'),
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
			},
			{
				test: /\.css$/,
				include: helpers.root('src', 'app'),
				loader: 'raw'
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{
	          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	          // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
	          // loader: "url?limit=10000"
	          loader: "url"
	        },
	        {
	          test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
	          loader: 'file'
	        },
			]
		},

		plugins: [
			new webpack.ProvidePlugin({
				jQuery: 'jquery',
				$: 'jquery',
				jquery: 'jquery',
				"Tether": 'tether',
				"window.Tether": "tether"
			}),

			new webpack.optimize.CommonsChunkPlugin({
				name: ['app', 'vendor', 'polyfills']
			}),

			new HtmlWebpackPlugin({
				template: 'src/index.html'
			}),

		],
		postcss:[autoprefixer],
		sassResources: path.resolve(__dirname, "./node_modules/bootstrap/scss"),
		node: { global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false }

	};
