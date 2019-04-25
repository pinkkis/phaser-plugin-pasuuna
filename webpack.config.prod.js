const TerserPlugin = require('terser-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
	output: {
		filename: 'pasuunaplugin.js',
		library: 'Pasuuna',
		libraryTarget: 'umd'
	},
	entry: {
		plugin: ['./src/index.js']
	},
	mode: 'production',
	module: {
		rules: []
	},
	plugins: [
		new CleanPlugin()
	],
	resolve: {
		extensions: ['.js'],
	},
	optimization: {
		minimizer: [
			new TerserPlugin(),
		],
	},
	externals: {
		Phaser: 'Phaser',
	},
	watchOptions: {
		ignored: [
			'node_modules',
		]
	}

};
