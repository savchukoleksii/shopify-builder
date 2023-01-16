const {
	webpack,
} = builder.packages;
const { entries } 	= builder.helpers;
const webpackConfig = builder.options.webpack;
const files 		= builder.files;

module.exports = (jsFiles = files.js, options = {}) => {
	return new Promise((resolve, reject) => {
		const entryFiles = entries('src/scripts/**.js');

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
