const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	output: {
		filename: 'pasuunaplugin.js',
		library: 'Pasuuna',
		libraryTarget: 'umd'
	},
	mode: 'development',
	entry: {
		plugin: ['./src/index.js']
	},
	devtool: 'eval-source-map',
	module: {
		rules: []
	},
	plugins: [
		// new CleanPlugin()
	],
	resolve: {
		extensions: ['.js'],
	},
	externals: {
		Phaser: 'Phaser',
	},
	optimization: {
		minimizer: [
			new TerserPlugin(),
		],
	},
	watchOptions: {
		ignored: [
			'node_modules',
		]
	}

};
