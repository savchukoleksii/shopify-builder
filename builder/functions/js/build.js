const {
	webpack,
} = builder.packages;
const { entries } 	= builder.helpers;
const webpackConfig = builder.options.webpack;
const files 		= builder.files;

module.exports = (jsFiles = files.js, options = {}) => {
	return new Promise((resolve, reject) => {
		const entryPoints = [
			'src/scripts/*.js',
			'src/scripts/sections/*.js',
			'src/scripts/templates/*.js',
			'src/scripts/layouts/*.js',
		];

		const entryFiles = entryPoints.reduce((entryPoints, entryPoint) => {
			return {
				...entryPoints,
				...entries(entryPoint),
			}
		}, {});

		if (entryFiles && !Object.values(entryFiles).length) {
			return resolve(true);
		}

		const compiler = webpack({
			...webpackConfig,
			entry: entryFiles,
			mode: process.env.NODE_ENV || "production",
		});

		try {
			compiler.run(() => {
				resolve();
			})
		} catch (error) {
			reject(error);
		}
	});
};
