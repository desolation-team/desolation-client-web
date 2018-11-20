import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export default {
	entry: {
		index: path.join(__dirname, 'src/index.js'),
		assets: path.join(__dirname, 'assets/index.js')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [{
			test: /\.js/,
			exclude: /(node_modules)/,
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: /\.(s*)css$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
				},
				{
					loader: 'css-loader',
					options: {sourceMap: true}
				},
				{
					loader: 'sass-loader',
					options: {sourceMap: true}
				}
			]
		}, {
			test: /\.(png|jp(e*)g|svg|gif)$/,
			use: [{
				loader: 'file-loader?name=/textures/[name].[ext]'
			}]
		}, {
			test: /\.(mp3|wav)$/,
			use: [{
				loader: 'file-loader?name=/sounds/[name].[ext]'
			}]
		}, {
			test: /\.md2$/,
			use: [{
				loader: 'file-loader?name=/models/[name].[ext]'
			}]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.html')
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new UglifyJSPlugin({
			sourceMap: true
		}),
	],
	stats: {
		colors: true
	},
	devtool: 'source-map',
	devServer: {
		contentBase: './dist'
	}
};
