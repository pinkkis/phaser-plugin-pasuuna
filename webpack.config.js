module.exports = (env) => {
	const config = require(`./webpack.config.${env}.js`);
	return config;
};
